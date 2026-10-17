import { Suspense } from "react";
import type { Metadata } from "next";
import { getDb } from "@/lib/db";

export const metadata: Metadata = { title: "Inbox | Flowitec", robots: { index: false, follow: false } };

type Search = Promise<Record<string, string | string[] | undefined>>;

type Message = { name: string; email: string; phone: string; company: string; date?: string; time?: string; message: string; created_at: string };

export default function InboxPage({ searchParams }: { searchParams: Search }) {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-sora text-3xl font-bold">Contact inbox</h1>
      <Suspense fallback={<p className="mt-6 text-sm text-foreground/60">Loading messages...</p>}>
        <Messages searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Messages({ searchParams }: { searchParams: Search }) {
  const { key } = await searchParams;
  if (!process.env.INBOX_KEY || key !== process.env.INBOX_KEY) {
    return <p data-testid="inbox-locked" className="mt-6 text-sm text-foreground/60">This inbox is private. Open it with your access key: /inbox?key=YOUR_KEY</p>;
  }

  const db = await getDb();
  const messages = await db
    .collection<Message>("contact_messages")
    .find({}, { projection: { _id: 0 } })
    .sort({ created_at: -1 })
    .limit(200)
    .toArray();

  if (!messages.length) return <p data-testid="inbox-empty" className="mt-6 text-sm text-foreground/60">No messages yet.</p>;

  return (
    <ul data-testid="inbox-list" className="mt-8 space-y-4">
      {messages.map((m) => (
        <li key={m.created_at + m.email} data-testid="inbox-item" className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-sora font-semibold">{m.name}{m.company && <span className="font-normal text-foreground/55"> · {m.company}</span>}</p>
            <time className="text-xs text-foreground/50">{new Date(m.created_at).toLocaleString("en-GB")}</time>
          </div>
          <p className="mt-1 text-sm text-brand"><a href={`mailto:${m.email}`}>{m.email}</a>{m.phone && ` · ${m.phone}`}</p>
          {m.date && <p data-testid="inbox-item-meeting" className="mt-2 inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">Meeting: {m.date}{m.time && ` at ${m.time}`}</p>}
          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground/75">{m.message}</p>
        </li>
      ))}
    </ul>
  );
}
