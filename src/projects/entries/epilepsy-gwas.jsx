import React from "react";

export const meta = {
  slug: "epilepsy-gwas",
  label: "Epilepsy GWAS Association Analysis",
  subtitle: "Post-GWAS workflow on epilepsy summary statistics",
};

const gold = "#c8a76a";
const accentDark = "#7f5d3b";

const Chip = ({ children }) => (
  <span
    className="rounded-full border px-3 py-1 text-sm bg-white/80"
    style={{ borderColor: gold }}
  >
    {children}
  </span>
);

const FlowSteps = ({ steps }) => (
  <div className="flex flex-wrap items-center gap-2 mt-2">
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        <Chip>{s}</Chip>
        {i < steps.length - 1 && <span aria-hidden>→</span>}
      </React.Fragment>
    ))}
  </div>
);

const ResultFigure = ({ src, alt, caption }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <figure
        className="rounded-2xl border bg-white/90 shadow-sm p-2"
        style={{ borderColor: gold }}
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
            style={{ borderColor: gold }}
          />
        </div>
      )}
    </>
  );
};

export default function ProjectEpilepsyGWAS() {
  return (
    <div>
      <h1 className="font-serif text-2xl mb-2">{meta.label}</h1>
      <p className="opacity-70 mb-6">{meta.subtitle}</p>

      <section className="mb-6">
        <h3 className="font-medium" style={{ color: accentDark }}>
          Research Question
        </h3>
        <p className="mt-2">
          Where are the strongest common-variant associations for epilepsy
          across the genome, and which nearby genes do they point to?
        </p>
      </section>

      <section className="mb-6">
        <h3 className="font-medium" style={{ color: accentDark }}>
          Project Flow
        </h3>
        <FlowSteps
          steps={[
            "📦 Data",
            "🧹 QC",
            "📈 Manhattan Plot",
            "📊 QQ Plot",
            "🎯 Lead SNP Selection",
            "🧬 Gene Mapping",
            "🧠 Interpretation",
          ]}
        />
      </section>

      <section className="mt-8">
        <h3 className="font-serif text-xl mb-3" style={{ color: accentDark }}>
          Results
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <ResultFigure
            src="/projects/gwas/manhattan.png"
            alt="Manhattan plot for epilepsy GWAS"
            caption="Manhattan plot. Genome-wide signals above the threshold (p < 5×10⁻⁸)."
          />
          <ResultFigure
            src="/projects/gwas/qq.png"
            alt="QQ plot for epilepsy GWAS"
            caption="QQ plot. Points closely follow expectation; λGC ≈ 1 suggests well-calibrated background."
          />
        </div>

        <div className="mt-4">
          <ResultFigure
            src="/projects/gwas/lead_snps.png"
            alt="Evidence table with lead SNPs and mapped genes"
            caption="Evidence table summarizing lead SNPs, mapped genes, and key statistics."
          />
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-medium" style={{ color: accentDark }}>
          Concise Summary
        </h3>
        <ul className="list-disc pl-5 leading-7">
          <li>
            I implemented a reproducible post-GWAS workflow on epilepsy summary
            statistics.
          </li>
          <li>
            The analysis identified 5 genome-wide loci, well-calibrated against
            the null expectation, with mapped genes relevant to neurological
            pathways.
          </li>
          <li>
            These results echo findings from the published study, while also
            showing the effect of dataset choice and simplified locus
            definitions.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="font-medium" style={{ color: accentDark }}>
          Limitations &amp; Future Improvements
        </h3>
        <ul className="list-disc pl-5 leading-7">
          <li>
            Clumping method: window-based clumping (±250 kb); future versions
            will apply LD-based clumping with reference panels (e.g., 1000
            Genomes).
          </li>
          <li>
            Gene mapping: Ensembl VEP maps to transcribed genes; regulatory and
            intergenic signals remain to be explored.
          </li>
          <li>
            Tissue context: integrate GTEx v8 to confirm brain-expressed genes.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-medium" style={{ color: accentDark }}>
          Tools &amp; Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Python",
            "pandas",
            "numpy",
            "matplotlib",
            "scipy",
            "Jupyter",
            "Ensembl VEP API",
            "Statistical genetics (GWAS, QQ, λGC)",
          ].map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
        <ul className="list-disc pl-5 leading-7 mt-3">
          <li>
            <a
              className="underline"
              href="https://github.com/harita-bio/epilepsy-gwas-association-analysis"
              target="_blank"
              rel="noreferrer"
            >
              Project notebook →
            </a>
          </li>
          <li>
            <a
              className="underline"
              href="#/blogs/skyscrapers-in-the-genome"
              target="_blank"
              rel="noreferrer"
            >
              Blog (What I Learned From My First GWAS Project) →
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
