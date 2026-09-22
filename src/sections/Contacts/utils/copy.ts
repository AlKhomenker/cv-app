/**
 * Puts a string on the clipboard, and says whether it got there.
 *
 * Two ways, because the first one is not always allowed: `navigator.clipboard`
 * needs a secure context and a user gesture, and a page opened over plain HTTP
 * or inside some in-app browsers has neither. The fallback is the old
 * `execCommand` route through a textarea nobody can see.
 *
 * Failure is silent by design. A reader who pressed a phone number and got a
 * dialog explaining a permissions model has been given a problem instead of a
 * number; the row simply does not change, and the number is still written on
 * it to be read.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Falls through to the older route below.
  }

  try {
    const box = document.createElement("textarea");
    box.value = text;
    box.setAttribute("readonly", "");
    // Off screen rather than hidden: a field with no layout cannot be selected.
    box.style.cssText = "position:fixed;top:-1000px;opacity:0";
    document.body.appendChild(box);
    box.select();
    const done = document.execCommand("copy");
    document.body.removeChild(box);
    return done;
  } catch {
    return false;
  }
}
