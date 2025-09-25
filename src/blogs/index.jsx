import Blog1 from "./entries/rsids-to-meaning.jsx";
import Blog2 from "./entries/skyscrapers-in-the-genome.jsx";
import Blog3 from "./entries/why-genomics-journey.jsx";

export const BLOGS = [
  {
    slug: "rsids-to-meaning",
    title: "From rsIDs to Meaning: My First Step into Genomics",
    subtitle: "Turning rsIDs into an evidence table",
    render: Blog1,
  },
  {
    slug: "skyscrapers-in-the-genome",
    title: "Skyscrapers in the Genome: My First GWAS Journey",
    subtitle: "Signals, calibration, and better questions",
    render: Blog2,
  },
  {
    slug: "why-genomics-journey",
    title: "From Curiosity to Genomics: Why I Started This Journey",
    subtitle: "A path toward bioinformatics",
    render: Blog3,
  },
];

export function findBlog(slug) {
  return BLOGS.find((b) => b.slug === slug) || null;
}
