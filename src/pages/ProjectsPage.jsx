import React from "react";
import { PROJECTS } from "../projects";

const gold = "#c8a76a";
const accentDark = "#7f5d3b";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h2 className="font-serif text-2xl mb-4">Projects</h2>
      <ul className="grid sm:grid-cols-2 gap-4">
        {PROJECTS.map((p) => (
          <li key={p.slug}>
            <a
              href={`#/projects/${p.slug}`}
              className="block rounded-2xl border bg-white/70 shadow-sm p-4 h-full"
              style={{ borderColor: gold }}
            >
              <div className="font-medium" style={{ color: accentDark }}>
                {p.label}
              </div>
              {p.subtitle && (
                <div className="opacity-70 text-sm mt-1">{p.subtitle}</div>
              )}
              <div className="mt-2 text-right">→</div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
