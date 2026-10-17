export type Office = {
  country: string;
  city: string;
  company: string;
  address: string;
  postal: string;
  phones: string[];
  email: string;
  lat: number;
  lng: number;
};

export const OFFICES: Office[] = [
  {
    country: "Ghana",
    city: "Tema, Accra (HQ)",
    company: "Flowitec Group Ghana Limited, Headquarters",
    address: "GT-373-0152 Opp IRS, Comm. 18 Junction, Spintex Road, Tema, Ghana",
    postal: "P. O. Box SK 1369, Sakumono, Greater Accra",
    phones: ["+233 273 300 082", "+233 531 949 028", "+233 598 017 273"],
    email: "sales@flowitec.com",
    lat: 5.6698,
    lng: -0.0166,
  },
  {
    country: "Nigeria",
    city: "Lagos",
    company: "Flowitec Solutions Company Limited",
    address: "T926 Grenadine Estate Sangotedo, Monastery Rd, Lagos, Nigeria",
    postal: "P. O. Box 75825, Victoria Island, Lagos",
    phones: ["+234 903 698 2710", "+234 703 782 5068"],
    email: "salesng@flowitec.com",
    lat: 6.5244,
    lng: 3.3792,
  },
  {
    country: "Kenya",
    city: "Nairobi",
    company: "Flowitec Group Limited",
    address: "403, 4th Floor, NML Towers, Tsavo Road, South B, Nairobi, Kenya",
    postal: "P.O. Box 39007 - 00623, Nairobi",
    phones: ["+254 726 061 760", "+254 742 695 386"],
    email: "sales.ke@flowitec.com",
    lat: -1.2921,
    lng: 36.8219,
  },
  {
    country: "South Africa",
    city: "Johannesburg",
    company: "Flowitec Group (Pty) Ltd",
    address: "No. 1 Sandler Road, Fairmount, Johannesburg 2192, South Africa",
    postal: "P.O. Box 411678 Craighall Park, Gauteng",
    phones: ["+27 786 541 452", "+27 78 696 5394"],
    email: "sales.za@flowitec.com",
    lat: -26.2041,
    lng: 28.0473,
  },
];
