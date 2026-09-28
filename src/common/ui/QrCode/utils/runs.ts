/** Modules of clear space each side. Four is what the standard asks for. */
export const QUIET = 4;

export interface Bar {
  row: number;
  from: number;
  length: number;
}

/**
 * Each row's dark modules collapsed into the fewest rectangles that draw them.
 *
 * A 29×29 code is a few dozen shapes this way rather than four hundred — one
 * per RUN of dark modules along a row, not one per module.
 */
export function darkRuns(matrix: number[][]): { size: number; bars: Bar[] } {
  const bars: Bar[] = [];
  matrix.forEach((row, y) => {
    let from = -1;
    row.forEach((cell, x) => {
      if (cell === 1 && from === -1) from = x;
      if (cell === 0 && from !== -1) {
        bars.push({ row: y, from, length: x - from });
        from = -1;
      }
    });
    if (from !== -1) bars.push({ row: y, from, length: row.length - from });
  });
  return { size: matrix.length, bars };
}
