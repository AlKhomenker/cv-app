import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The class merger every component in `components/ui` is built on.
 *
 * It is shadcn's, unchanged, and it earns its place here for one reason: a
 * caller's `className` has to be able to WIN. Two Tailwind utilities for the
 * same property are one rule whose winner is decided by the order Tailwind
 * happened to emit them in, not by the order they are written — which is why
 * this app used to answer that with a prop per look. `twMerge` drops the
 * loser, so `<Button className="rounded-none">` means rounded-none.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
