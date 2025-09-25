/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        typography: {
          DEFAULT: {
            css: {
              color: "#2b2b2b",
              maxWidth: "65ch",
              a: { color: "#7f5d3b", textDecoration: "underline" },
              "a:hover": { color: "#5f432b" },
              strong: { color: "#2b2b2b" },
              h1: { color: "#7f5d3b", fontFamily: "ui-serif, Georgia, serif" },
              h2: { color: "#7f5d3b", fontFamily: "ui-serif, Georgia, serif" },
              h3: { color: "#7f5d3b", fontFamily: "ui-serif, Georgia, serif" },
              blockquote: { borderLeftColor: "#c8a76a" },
              hr: { borderColor: "#e7dcc7" },
              "ul > li::marker": { color: "#b08968" },
              "ol > li::marker": { color: "#b08968" },
              code: { color: "#5f432b" },
            },
          },
        },
      },
    },
    plugins: [require("@tailwindcss/typography")],
  };
  