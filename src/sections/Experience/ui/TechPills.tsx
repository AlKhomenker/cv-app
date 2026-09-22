import { Badge } from "@/components/ui/badge";
import { Ltr } from "@/common/ui/Ltr";

export interface TechPillsProps {
  names: readonly string[];
  className?: string;
}

/**
 * The technology names a role was built with. Latin in both languages.
 *
 * Each one is a shadcn `Badge` — a LABEL, which is what the component is for.
 * It is deliberately not a control: these are read and never touched, and a
 * 44px button standing in for a word would be the biggest thing on the card.
 *
 * `asChild` is what keeps the list a list. The badge lends its classes to the
 * `<li>` instead of putting a `<span>` inside one, so the markup is still an
 * `<ul>` of `<li>` and a screen reader still counts them.
 */
export function TechPills({ names, className }: TechPillsProps) {
  return (
    <ul className={["flex flex-wrap gap-1.5", className].filter(Boolean).join(" ")}>
      {names.map((name) => (
        <Badge key={name} asChild>
          <li>
            <Ltr>{name}</Ltr>
          </li>
        </Badge>
      ))}
    </ul>
  );
}
