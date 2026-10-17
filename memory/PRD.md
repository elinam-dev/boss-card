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

## Backlog
- P1: Email notifications for new booking requests (Resend or SendGrid)
- P1: Calendar invite (.ics) or Google Calendar booking
- P2: Testimonials and case studies; QR code for the card; social links
