import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { PERSON } from "@/lib/person";

export default function Home() {
  return (
    <MinimalistHero person={PERSON} />
  );
}
