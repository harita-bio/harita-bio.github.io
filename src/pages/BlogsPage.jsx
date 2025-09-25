import React, { useState } from "react";
import { BLOGS, findBlog } from "../blogs/index.jsx";

const GOLD = "#c8a76a";
const ACCENT_DARK = "#7f5d3b";

function StickyNote({ title, subtitle, rotate = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full h-40 rounded-xl border shadow-md p-4 text-left ${rotate}`}
      style={{
        borderColor: GOLD,
        background:
          "linear-gradient(135deg, rgba(200,167,106,0.18) 0%, #fff7d6 100%)",
      }}
    >
      <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#f5e2a7] rounded-sm shadow" />
      <div className="font-medium" style={{ color: ACCENT_DARK }}>
        {title}
      </div>
      {subtitle && <div className="mt-2 text-sm opacity-80">{subtitle}</div>}
    </button>
  );
}

function BlogModal({ blog, onClose }) {
  if (!blog) return null;

  const Comp = blog.render;
  const hasComp = typeof Comp === "function";
  const hasContent = blog.content != null;

  if (!hasComp && !hasContent) {
    console.error("Blog is missing `render` or `content`:", blog);
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,92vw)] max-h-[85vh] overflow-auto bg-[#fffdf8] rounded-2xl border shadow-xl p-6"
        style={{ borderColor: "#c8a76a" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className="font-serif text-3xl leading-tight pr-4"
            style={{ color: "#7f5d3b" }}
          >
            {blog.title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full border px-3 py-1 text-sm"
            style={{ borderColor: "#c8a76a" }}
          >
            Close
          </button>
        </div>

        <article className="blog-prose mx-auto">
          {hasComp ? (
            <Comp />
          ) : hasContent ? (
            blog.content
          ) : (
            <p>Missing blog content.</p>
          )}
        </article>
      </div>
    </div>
  );
}

export default function BlogsPage({ initialSlug = null }) {
  const [open, setOpen] = useState(() => findBlog(initialSlug) || null);

  const openBlog = (b) => {
    setOpen(b);
    window.location.hash = `/blogs/${b.slug}`;
  };
  const closeBlog = () => {
    setOpen(null);
    window.location.hash = "/blogs";
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h2 className="font-serif text-2xl mb-4">Blogs</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOGS.map((b, i) => (
          <StickyNote
            key={b.slug}
            title={b.title}
            subtitle={b.subtitle}
            rotate={i % 2 === 0 ? "-rotate-1" : "rotate-1"}
            onClick={() => openBlog(b)}
          />
        ))}
      </div>

      <BlogModal blog={open} onClose={closeBlog} />
    </main>
  );
}
