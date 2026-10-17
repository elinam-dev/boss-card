# PRD: Ing. Godwin Asamoah, Personal Brand / Digital Business Card (Flowitec)

## Original problem
"now i tried building a personal brand now help improve it but still maintain the same idea". The user chose visual polish and a working contact form.
Follow-up: the thought bubble should lead to his head, the partner logos should move away from the portrait and gear logo, and the Save/WhatsApp/Call/Email buttons should be removed, keeping only "Book a meeting" linked to the booking form below.

## Stack
Next.js 16 (app router, cacheComponents) + Tailwind v4 at repo root /app. A Server Action (app/actions.ts) saves to MongoDB (lib/db.ts, MONGO_URL/DB_NAME/INBOX_KEY in .env.local, collection contact_messages).
The preview runner /app/frontend/package.json runs `next dev` from the root.

## Implemented (2026-06)
- Polished hero: same layout, with a large name, a typing thought bubble whose circle trail rises to the head, the portrait over the gear logo, a cycling "Authorised Distributor for" label, and the partner grid on the right
- Floating "Book a meeting" button that scrolls to the booking form
- Sections: Services (navy, 6 cards and stats), Offices (Ghana and South Africa with phone and map links), Book a meeting form (name, email, phone, company, preferred date and time, message), and footer
- Form validation that keeps typed values and focuses the first invalid field; success state; data saved to Mongo
- Private inbox at /inbox?key=INBOX_KEY

- Removed TM sign from the Flowitec logos (logo1-clean.png, logo-clean.png)
- Replaced the "What I solve" heading and stats with a WorldMap (components/ui/world-map.tsx; dotted-map, framer-motion, next-themes) zoomed on Africa. Arcs run from the Ghana HQ to Nigeria (Lagos), Kenya (Nairobi) and South Africa (Johannesburg), using countries from flowitec.com/contact. The map is client-only to keep the HTML small.

- Clickable map pins and country buttons that open an office card (company, address, phones, email, maps link) for all 4 Flowitec offices (lib/offices.ts)
- Booking email alerts to ALERT_EMAIL (godwin.asamoah@flowitec.com), sent through the Emergent managed email proxy (lib/email.ts, lib/booking-alert.ts) after the response using after(). Env: EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME. Limit of 5 bookings per IP per hour.

- The Africa map is now a collapsible panel: it opens on mouse hover and closes on leave (tap to toggle on touch). The "Where to find us" Offices section was removed.

## Backlog
- P1: Calendar invite (.ics) or Google Calendar booking
- P2: Testimonials and case studies; QR code for the card; social links
