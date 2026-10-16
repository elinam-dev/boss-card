import { MinimalistHero } from "@/components/ui/minimalist-hero";

export default function Home() {
  return (
    <>
      <MinimalistHero
        logoText="Ing. Godwin Asamoah"
        imageSrc="/boss.png"
        imageAlt="Portrait of a professional in profile"
        socialLinks={[
          { icon: "facebook", href: "#", label: "Facebook" },
          { icon: "instagram", href: "#", label: "Instagram" },
          { icon: "twitter", href: "#", label: "Twitter" },
          { icon: "linkedin", href: "#", label: "LinkedIn" },
        ]}
      />
    </>
  );
}
