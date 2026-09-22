import type { StageSection } from "@/shell/Stage";
import { Experience, TRACK_DEPTH } from "./Experience";
import { CLOSING_DEPTH, Closing } from "./Closing";
import { Contacts, ROWS_DEPTH } from "./Contacts";
import { Education, STACK_DEPTH } from "./Education";
import { FAQ_DEPTH, Faq } from "./Faq";
import { PEOPLE_DEPTH, Recommendations } from "./Recommendations";
import { Opening } from "./Opening";
import { SKILLS_DEPTH, Skills } from "./Skills";
import { STRENGTHS_DEPTH, Strengths } from "./Strengths";
import { READING_DEPTH, Summary } from "./Summary";

/**
 * The sections that have been rewritten, in the order the stage steps through
 * them. The last one has landed: every section of the page is here, and the
 * scrolling document that used to sit under the stage has nothing left in
 * it — see `App.tsx`.
 *
 * `depth` and `calm` are what a section asks the stage for: the scroll, and
 * quiet behind it. The summary asks for both — it is four sentences to be
 * read, so it takes the scroll to pace them and asks the light to stop
 * competing with them. The experience asks for twice as much of the first,
 * because it is six roles rather than four sentences, and for the same quiet.
 * The skills ask for two screens: forty-two badges arrive one at a time over
 * the first two thirds of them, and the rest is five finished rows with
 * nothing moving. The education asks for under a screen per panel, because
 * the pan IS the reading there rather than something to get through before
 * it. The strengths ask for two, counting eight ratings in a star at a time.
 * The people, the questions and the contacts each ask for a little under two
 * and all ask for the same shape: everything arrives over the first half and
 * then nothing moves at all, because a reader following a profile, reading an
 * answer or writing a message must not be moving the section while they do
 * it. The closing asks for two screens and for no quiet at all — it is where
 * the light comes back.
 *
 * The closing ends the page, and nothing here has to say so. A gesture past
 * the last section moves nothing because there is no section after it and
 * nothing under the stage to fall through to. The `stop` flag that used to
 * declare this went with the document below: it existed to stop the stage
 * releasing the scroll, and the stage no longer releases it.
 */
export const STAGE_SECTIONS: readonly StageSection[] = [
  { id: "opening", Component: Opening },
  { id: "summary", Component: Summary, depth: READING_DEPTH, calm: 1 },
  { id: "experience", Component: Experience, depth: TRACK_DEPTH, calm: 1 },
  { id: "skills", Component: Skills, depth: SKILLS_DEPTH, calm: 1 },
  { id: "education", Component: Education, depth: STACK_DEPTH, calm: 1 },
  { id: "strengths", Component: Strengths, depth: STRENGTHS_DEPTH, calm: 1 },
  { id: "recommendations", Component: Recommendations, depth: PEOPLE_DEPTH, calm: 1 },
  { id: "faq", Component: Faq, depth: FAQ_DEPTH, calm: 1 },
  { id: "contacts", Component: Contacts, depth: ROWS_DEPTH, calm: 1 },
  { id: "closing", Component: Closing, depth: CLOSING_DEPTH }
];
