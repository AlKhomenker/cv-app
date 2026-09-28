/**
 * A QR code, drawn from a string, with nothing behind it.
 *
 * It is here rather than taken from a package because a package is the wrong
 * trade for one code of one URL. The whole of this file is smaller than the
 * smallest QR library's bundle, it has no dependency to keep current, and the
 * code it makes is drawn as a handful of SVG rectangles rather than a canvas
 * that has to be re-rasterised every time the theme changes.
 *
 * It does BYTE mode at error-correction level L, versions 1 to 6 — up to 134
 * bytes, which is every URL this page will ever hold. Six is the last version
 * that carries no version-information block, so the matrix is finder patterns,
 * timing, alignment, format and data, and nothing else.
 */

/** The last version with no version-information block, and what it holds. */
const MAX_VERSION = 6;

/** How many bytes fit, at level L, per version. Index is the version. */
const CAPACITY = [0, 17, 32, 53, 78, 106, 134];

/** Total codewords, and how they are split into blocks, per version at level L. */
const TOTAL = [0, 26, 44, 70, 100, 134, 172];
const BLOCKS = [0, 1, 1, 1, 1, 1, 2];
const EC_PER_BLOCK = [0, 7, 10, 15, 20, 26, 18];

/** Where the alignment patterns sit. Their pairs make the centres. */
const ALIGN = [[], [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34]];

/** Galois field 256 under the QR polynomial, as a pair of lookup tables. */
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
for (let i = 0, x = 1; i < 255; i += 1) {
  EXP[i] = x;
  LOG[x] = i;
  x <<= 1;
  if (x & 0x100) x ^= 0x11d;
}
for (let i = 255; i < 512; i += 1) EXP[i] = EXP[i - 255] ?? 0;

function mul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP[((LOG[a] ?? 0) + (LOG[b] ?? 0)) % 255] ?? 0;
}

/** The generator polynomial for `count` error-correction codewords. */
function generator(count: number): number[] {
  let poly = [1];
  for (let i = 0; i < count; i += 1) {
    const next = new Array<number>(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j += 1) {
      next[j] = (next[j] ?? 0) ^ mul(poly[j] ?? 0, 1);
      next[j + 1] = (next[j + 1] ?? 0) ^ mul(poly[j] ?? 0, EXP[i] ?? 0);
    }
    poly = next;
  }
  return poly;
}

/** The remainder of the data divided by the generator: the check codewords. */
function remainder(data: readonly number[], count: number): number[] {
  const gen = generator(count);
  const out = new Array<number>(count).fill(0);
  for (const byte of data) {
    const factor = byte ^ (out[0] ?? 0);
    out.shift();
    out.push(0);
    for (let i = 0; i < count; i += 1) out[i] = (out[i] ?? 0) ^ mul(gen[i + 1] ?? 0, factor);
  }
  return out;
}

/** The smallest version this text fits in, or 0 for text that fits in none. */
function versionFor(text: string): number {
  const length = new TextEncoder().encode(text).length;
  for (let version = 1; version <= MAX_VERSION; version += 1) {
    if (length <= (CAPACITY[version] ?? 0)) return version;
  }
  return 0;
}

/** The data codewords: mode, length, the bytes, a terminator and the padding. */
function codewords(text: string, version: number): number[] {
  const bytes = new TextEncoder().encode(text);
  const capacity = (TOTAL[version] ?? 0) - (BLOCKS[version] ?? 0) * (EC_PER_BLOCK[version] ?? 0);
  const bits: number[] = [];
  const push = (value: number, width: number) => {
    for (let i = width - 1; i >= 0; i -= 1) bits.push((value >> i) & 1);
  };

  push(0b0100, 4);
  push(bytes.length, 8);
  for (const byte of bytes) push(byte, 8);
  push(0, Math.min(4, capacity * 8 - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);

  const out: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j += 1) byte = (byte << 1) | (bits[i + j] ?? 0);
    out.push(byte);
  }
  // The two pad bytes the standard names, alternating to the end.
  for (let i = 0; out.length < capacity; i += 1) out.push(i % 2 === 0 ? 0xec : 0x11);
  return out;
}

/** The blocks interleaved, data first and then the check codewords. */
function interleave(data: readonly number[], version: number): number[] {
  const blocks = BLOCKS[version] ?? 1;
  const per = data.length / blocks;
  const ecCount = EC_PER_BLOCK[version] ?? 0;
  const dataBlocks: number[][] = [];
  const ecBlocks: number[][] = [];

  for (let b = 0; b < blocks; b += 1) {
    const slice = data.slice(b * per, (b + 1) * per);
    dataBlocks.push(slice);
    ecBlocks.push(remainder(slice, ecCount));
  }

  const out: number[] = [];
  for (let i = 0; i < per; i += 1) for (const block of dataBlocks) out.push(block[i] ?? 0);
  for (let i = 0; i < ecCount; i += 1) for (const block of ecBlocks) out.push(block[i] ?? 0);
  return out;
}

/** -1 where nothing has been written yet, so the reserved areas are known. */
type Grid = number[][];

function blank(size: number): Grid {
  return Array.from({ length: size }, () => new Array<number>(size).fill(-1));
}

function finder(grid: Grid, row: number, col: number): void {
  for (let r = -1; r <= 7; r += 1) {
    for (let c = -1; c <= 7; c += 1) {
      const y = row + r;
      const x = col + c;
      if (y < 0 || x < 0 || y >= grid.length || x >= grid.length) continue;
      const edge = r === 0 || r === 6 || c === 0 || c === 6;
      const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
      const outside = r < 0 || r > 6 || c < 0 || c > 6;
      (grid[y] as number[])[x] = outside ? 0 : edge || core ? 1 : 0;
    }
  }
}

function patterns(grid: Grid, version: number): void {
  const size = grid.length;
  finder(grid, 0, 0);
  finder(grid, 0, size - 7);
  finder(grid, size - 7, 0);

  for (let i = 8; i < size - 8; i += 1) {
    const bit = i % 2 === 0 ? 1 : 0;
    (grid[6] as number[])[i] = bit;
    (grid[i] as number[])[6] = bit;
  }

  const centres = ALIGN[version] ?? [];
  for (const row of centres) {
    for (const col of centres) {
      if ((grid[row] as number[])[col] !== -1) continue;
      for (let r = -2; r <= 2; r += 1) {
        for (let c = -2; c <= 2; c += 1) {
          const ring = Math.max(Math.abs(r), Math.abs(c));
          (grid[row + r] as number[])[col + c] = ring === 1 ? 0 : 1;
        }
      }
    }
  }

  // The one module that is always dark, and the format areas held open.
  (grid[size - 8] as number[])[8] = 1;
  for (let i = 0; i < 9; i += 1) {
    if ((grid[8] as number[])[i] === -1) (grid[8] as number[])[i] = -2;
    if ((grid[i] as number[])[8] === -1) (grid[i] as number[])[8] = -2;
  }
  for (let i = 0; i < 8; i += 1) {
    if ((grid[8] as number[])[size - 1 - i] === -1) (grid[8] as number[])[size - 1 - i] = -2;
    if ((grid[size - 1 - i] as number[])[8] === -1) (grid[size - 1 - i] as number[])[8] = -2;
  }
}

/** The eight masks, by their number. */
const MASKS: ((row: number, col: number) => boolean)[] = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (_r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0
];

/**
 * Lays the codewords out, up the two-module columns, turning at each end.
 *
 * The timing column is STEPPED OVER, not paired around: the pairs run 28-27,
 * 26-25 … 8-7, and then 5-4, 3-2, 1-0. Shifting only the pair that meets
 * column 6 and then carrying on from 6 is the near-miss version — it visits
 * column 4 twice, never visits column 0, and flips the up/down turn for
 * everything left of the timing column. The symbol still decodes, because the
 * data codewords are long since placed by then and only the tail of the error
 * correction lands over there; it decodes by being CORRECTED, which spends the
 * budget that is meant to survive a fingerprint on the screen.
 */
function place(grid: Grid, bytes: readonly number[], mask: number): Grid {
  const size = grid.length;
  const out = grid.map((row) => [...row]);
  const bits: number[] = [];
  for (const byte of bytes) for (let i = 7; i >= 0; i -= 1) bits.push((byte >> i) & 1);

  let at = 0;
  let upward = true;
  let column = size - 1;
  while (column >= 1) {
    if (column === 6) column = 5;
    for (let step = 0; step < size; step += 1) {
      const row = upward ? size - 1 - step : step;
      for (const col of [column, column - 1]) {
        if ((out[row] as number[])[col] !== -1) continue;
        const bit = bits[at] ?? 0;
        at += 1;
        (out[row] as number[])[col] = (MASKS[mask] as (r: number, c: number) => boolean)(row, col) ? bit ^ 1 : bit;
      }
    }
    upward = !upward;
    column -= 2;
  }
  return out;
}

/** The fifteen format bits for level L and one mask, BCH-coded and scrambled. */
function formatBits(mask: number): number[] {
  let value = (0b01 << 3) | mask;
  let bch = value << 10;
  for (let i = 4; i >= 0; i -= 1) {
    if (bch & (1 << (i + 10))) bch ^= 0b10100110111 << i;
  }
  value = ((value << 10) | bch) ^ 0b101010000010010;
  return Array.from({ length: 15 }, (_, i) => (value >> (14 - i)) & 1);
}

/**
 * The format bits, twice: round the top-left finder, and split between the
 * other two.
 *
 * Both copies carry the same fifteen bits in the same order, most significant
 * first, and the first copy used to carry them BACKWARDS. A scanner reads that
 * copy first, finds the BCH check fails, and falls back to the second one — so
 * the symbol read, on most readers, while the copy that is meant to be the
 * fallback was the only one that worked.
 */
function writeFormat(grid: Grid, mask: number): void {
  const size = grid.length;
  const bits = formatBits(mask);
  const at = (i: number) => bits[i] ?? 0;

  // Round the top-left finder: along the row, over the timing module, then up
  // the column.
  for (let i = 0; i <= 5; i += 1) (grid[8] as number[])[i] = at(i);
  (grid[8] as number[])[7] = at(6);
  (grid[8] as number[])[8] = at(7);
  (grid[7] as number[])[8] = at(8);
  for (let i = 0; i <= 5; i += 1) (grid[5 - i] as number[])[8] = at(9 + i);

  // The second copy: the low bits up from the bottom-left, the high bits along
  // the top-right.
  for (let i = 0; i <= 7; i += 1) (grid[8] as number[])[size - 1 - i] = at(i);
  for (let i = 0; i <= 6; i += 1) (grid[size - 7 + i] as number[])[8] = at(8 + i);
}

/** The four penalties the standard scores a mask by. Lowest wins. */
function penalty(grid: Grid): number {
  const size = grid.length;
  const at = (r: number, c: number) => (grid[r] as number[])[c] ?? 0;
  let score = 0;

  for (let a = 0; a < size; a += 1) {
    for (const read of [(i: number) => at(a, i), (i: number) => at(i, a)]) {
      let run = 1;
      for (let i = 1; i < size; i += 1) {
        if (read(i) === read(i - 1)) {
          run += 1;
          if (run === 5) score += 3;
          else if (run > 5) score += 1;
        } else {
          run = 1;
        }
      }
      const line = Array.from({ length: size }, (_, i) => read(i)).join("");
      for (const shape of ["10111010000", "00001011101"]) {
        let from = line.indexOf(shape);
        while (from !== -1) {
          score += 40;
          from = line.indexOf(shape, from + 1);
        }
      }
    }
  }

  for (let r = 0; r < size - 1; r += 1) {
    for (let c = 0; c < size - 1; c += 1) {
      const first = at(r, c);
      if (first === at(r, c + 1) && first === at(r + 1, c) && first === at(r + 1, c + 1)) score += 3;
    }
  }

  let dark = 0;
  for (let r = 0; r < size; r += 1) for (let c = 0; c < size; c += 1) dark += at(r, c);
  score += Math.floor(Math.abs((dark * 100) / (size * size) - 50) / 5) * 10;
  return score;
}

/**
 * The code, as rows of 0 and 1.
 *
 * Every one of the eight masks is laid out and scored, and the best is kept.
 * The mask is not cosmetic: it is what stops the data drawing something a
 * scanner would mistake for a finder pattern, and picking one without scoring
 * is how a code that works on one phone fails on another.
 *
 * Returns an empty array for text too long to fit, which the caller draws as
 * nothing at all rather than as a code that cannot be read.
 */
export function qrMatrix(text: string): number[][] {
  const version = versionFor(text);
  if (version === 0) return [];

  const size = version * 4 + 17;
  const base = blank(size);
  patterns(base, version);
  const bytes = interleave(codewords(text, version), version);

  let best: Grid | null = null;
  let bestScore = Number.POSITIVE_INFINITY;
  for (let mask = 0; mask < 8; mask += 1) {
    const grid = place(base, bytes, mask);
    writeFormat(grid, mask);
    const score = penalty(grid);
    if (score < bestScore) {
      bestScore = score;
      best = grid;
    }
  }
  return (best ?? base).map((row) => row.map((cell) => (cell === 1 ? 1 : 0)));
}
