/**
 * The handful of settings somebody changes without touching a component.
 */

/**
 * Where the contact form posts. Takes a Formspree, Web3Forms or EmailJS
 * endpoint URL; the recipient address is configured in that service, not here
 * — a service that needs a private key does not belong in a page the browser
 * downloads. While this is empty the form falls back to a prefilled mailto.
 */
export const FORM_ENDPOINT = "";

/** Where the form writes when there is no endpoint, and the backup address. */
export const CONTACT_EMAIL = "alinahom@me.com";

/**
 * The CV itself: where the file sits inside `public/`, and the name a browser
 * saves it under.
 *
 * The page used to DRAW its own PDF out of the DOM, which meant the file a
 * reader got was a picture of this page rather than the document that was
 * written. The download now hands over the real one, so there is a file to
 * keep at this path and the two constants below are the only place that says
 * so. Replacing the CV is replacing that file.
 */
export const CV_FILE = "cv/Alina-Khomenker-CV.pdf";
export const CV_FILENAME = "CV Senior FullStack Engineer Alina Khomenker.pdf";

/** A submission sooner than this after the page opened is a robot. */
export const SPAM_GUARD_MS = 2000;
