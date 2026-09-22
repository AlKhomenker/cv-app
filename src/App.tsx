import { STAGE_SECTIONS } from "@/sections";
import { BlobField, Header, Loader, Stage, usePageReady, useShell } from "@/shell";

/**
 * The page: the canvas, the bar across the top, and the stage every section is
 * pinned to.
 *
 * The rewrite is finished here. There were two halves for most of it — the
 * stage above and an ordinary scrolling document below, sections moving up one
 * at a time — and the recommendations were the last thing down there. With
 * them on the stage the document has nothing left in it, so it is gone, and
 * `<main>` is the stage itself.
 *
 * Over all of it until the page has arrived: the loader. Nothing above lights
 * up before `ready`, so the opening makes its entrance into a blank page
 * rather than over a half-drawn one.
 */
export function App() {
  const { ready, onLoaded } = usePageReady();
  const { stage, links, navigate } = useShell();

  return (
    <>
      {!ready && <Loader onLoaded={onLoaded} />}

      <BlobField calm={stage.calm} />
      <Header links={links} shown={ready} onPick={navigate} />

      {/* The landmark and the skip link's target. It carries no styles of its
          own on purpose: the stage inside it is `fixed`, and a transform or a
          filter on an ancestor would make this element its containing block
          and pin the stage to a box instead of to the screen. */}
      <main id="main" tabIndex={-1}>
        <Stage
          sections={STAGE_SECTIONS}
          index={stage.index}
          ready={ready}
          progress={stage.progress}
          onSeek={stage.seek}
          onNavigate={navigate}
        />
      </main>
    </>
  );
}
