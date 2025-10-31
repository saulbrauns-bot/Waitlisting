import React from "react";

const swatches = [
  { name: "bridge-background", className: "bg-bridge-background" },
  { name: "bridge-surface", className: "bg-bridge-surface" },
  { name: "bridge-border", className: "bg-bridge-border" },
  { name: "bridge-blue", className: "bg-bridge-blue" },
  { name: "bridge-blue-light", className: "bg-bridge-blue-light" },
  { name: "bridge-text", className: "bg-bridge-text" },
  { name: "bridge-text-muted", className: "bg-bridge-text-muted" },
];

export default function PalettePage() {
  return (
    <main className="min-h-dvh bg-bridge-background text-bridge-text p-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-bridge-blue">Bridge Palette</h1>
          <p className="text-bridge-text-muted mt-1">
            Live preview of Bridge tokens. Toggle <code>html.dark</code> to test dark mode.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {swatches.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-bridge-border bg-bridge-surface p-4 shadow-bridge hover:shadow-bridge-hover transition-shadow"
            >
              <div className={`h-20 w-full rounded-xl ${s.className}`} />
              <div className="mt-3">
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-bridge-text-muted">{s.className}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">CTA Example</h2>
          <div className="rounded-2xl border border-bridge-border bg-bridge-surface p-6 shadow-bridge">
            <p className="text-bridge-text mb-4">
              Use <code>text-bridge-blue</code> for emphasis and keep body copy in{" "}
              <code>text-bridge-text</code> with secondary content in{" "}
              <code>text-bridge-text-muted</code>.
            </p>
            <button className="inline-flex items-center justify-center rounded-xl bg-bridge-blue px-4 py-2 text-white hover:opacity-90 transition">
              Join Waitlist
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
