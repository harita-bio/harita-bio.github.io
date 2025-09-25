import React from "react";
import { getProjectBySlug } from "../projects";

const gold = "#c8a76a";

export default function ProjectDetail({ slug: propSlug }) {
  const slug =
    propSlug ||
    (window.location.hash.split("/")[2]
      ? window.location.hash.split("/")[2]
      : "");

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <article
          className="rounded-2xl border bg-white/70 shadow-sm p-6"
          style={{ borderColor: gold }}
        >
          <h1 className="font-serif text-2xl mb-2">Project not found</h1>
          <p className="opacity-70">
            The requested project does not exist or the URL is incorrect.
          </p>
        </article>
      </main>
    );
  }

  const P = project.Component;
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <article
        className="rounded-2xl border bg-white/70 shadow-sm p-6"
        style={{ borderColor: gold }}
      >
        <P />
      </article>
    </main>
  );
}
const theme = {
  gold: "#c8a76a",
  accentDark: "#7f5d3b",
};

function ResultFigure({ src, alt, caption }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <figure
        className="rounded-2xl border bg-white/90 shadow-sm p-2"
        style={{ borderColor: theme.gold }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full rounded-lg cursor-zoom-in"
          onClick={() => setOpen(true)}
        />
        {caption && (
          <figcaption className="mt-2 text-sm opacity-80">{caption}</figcaption>
        )}
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[92vw] rounded-xl border shadow-2xl"
            style={{ borderColor: theme.gold }}
          />
        </div>
      )}
    </>
  );
}
