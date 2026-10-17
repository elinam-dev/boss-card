import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { ActionDock } from "@/components/action-dock";
import { Services } from "@/components/sections/services";
import { Offices } from "@/components/sections/offices";
import { ContactSection } from "@/components/sections/contact-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { PERSON } from "@/lib/person";

export default function Home() {
  return (
    <>
      <MinimalistHero person={PERSON} />
      <Services person={PERSON} />
      <Offices person={PERSON} />
      <ContactSection person={PERSON} />
      <SiteFooter person={PERSON} />
      <ActionDock />
    </>
  );
}
