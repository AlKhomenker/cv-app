import { useId } from "react";
import { SITE_URL } from "@/config";
import { Icon } from "@/common/ui/Icon";
import { QrCode } from "@/common/ui/QrCode";
import { useLocale } from "@/i18n";
import { TOGGLE_CLASS } from "../../utils/classes";
import { useSiteQr } from "./hooks/useSiteQr";
import { shortAddress } from "./utils/address";

/** The header's QR toggle: a press shows a code for this page under it. See `README.md`. */
export function SiteQr() {
  const { content } = useLocale();
  const { rootRef, triggerRef, open, toggle } = useSiteQr();
  const popoverId = useId();

  return (
    <div ref={rootRef} className="relative flex-none">
      <button
        ref={triggerRef}
        type="button"
        className={TOGGLE_CLASS}
        aria-label={content.siteQr.open}
        aria-expanded={open}
        aria-controls={popoverId}
        onClick={toggle}>
        <Icon name="qr" />
      </button>

      <div
        id={popoverId}
        className="absolute top-full inset-e-0 z-10 mt-2 flex flex-col items-center gap-1.5 rounded-glass
          border border-hair bg-page p-2 shadow-(--glass-drop) opacity-0
          transition-opacity duration-(--dur-fast) ease-page shown:opacity-100"
        data-shown={open}
        inert={!open}>
        <QrCode className="size-36 text-ink" text={SITE_URL} label={content.siteQr.code} />
        <p className="whitespace-nowrap text-[0.72rem] text-soft" dir="ltr">
          {shortAddress(SITE_URL)}
        </p>
      </div>
    </div>
  );
}
