export const PERSON = {
  name: "Ing. Godwin Asamoah",
  title: "Technical Director",
  company: "Flowitec",
  tagline: "Our Solution. Your Success.",
  bio: "Solve Rotating and Static Engineering Problems. I help Industries reduce downtime.",
  
  // Contact details
  phones: [
    { label: "Ghana", number: "+233247986652", tel: "tel:+233247986652" },
    { label: "South Africa", number: "+27786965394", tel: "tel:+27786965394" },
  ],
  whatsapp: {
    number: "+233247986652",
    displayNumber: "+233 24 798 6652",
    url: "https://wa.me/233247986652",
  },
  email: "godwin.asamoah@flowitec.com",
  website: "https://www.flowitec.com",
  
  // Services
  services: [
    "Pumps",
    "Valves",
    "Electric Motors",
    "Actuators",
    "Controls",
    "Spares",
  ],
  
  // Location
  location: "Africa Wide",
  addresses: [
    {
      label: "Ghana",
      address: "P.O. Box SK 1369, Sakumono, Greater Accra. GT-373-0152, Opp. GRA Office, Comm. 18 Junction, Spintex Road, Tema, Ghana",
      mapsUrl: "https://maps.google.com/?q=Comm.+18+Junction+Spintex+Road+Tema+Ghana",
    },
    {
      label: "South Africa",
      address: "42 Homestead Road, Edenvale, Johannesburg, South Africa",
      mapsUrl: "https://maps.google.com/?q=42+Homestead+Road+Edenvale+Johannesburg+South+Africa",
    },
  ],
  
  // Social links (empty for now - can be added later)
  social: [] as Array<{ platform: string; url: string }>,
};

export type Person = typeof PERSON;
