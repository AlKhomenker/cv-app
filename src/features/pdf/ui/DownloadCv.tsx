import { Button } from "@/components/ui/button";
import { CV_FILENAME } from "@/config";
import { useLocale } from "@/i18n";
import { CV_URL } from "../utils/cvFile";

/**
 * The download, as a LINK and not as a button that goes away and works.
 *
 * There is a file at the other end of it, so the browser's own download is the
 * whole mechanism: no library, no busy state to show and nothing to fail
 * halfway. It also gets the things a link gets for free that a handler never
 * does — the address on hover, "save link as" under the right button, and a
 * middle click that opens the CV in a tab instead of saving it.
 *
 * `download` names the saved file so the reader ends up with the CV's name
 * rather than the server's path. It is same-origin — the file ships in
 * `public/` — which is the condition under which browsers honour it at all.
 */
export function DownloadCv() {
  const { content } = useLocale();

  return (
    <Button asChild>
      <a href={CV_URL} download={CV_FILENAME}>
        {content.opening.download}
      </a>
    </Button>
  );
}
