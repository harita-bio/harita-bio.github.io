import React, { useEffect, useState } from "react";

export const meta = {
  slug: "variant-evidence-annotation",
  label: "Variant Evidence Table & Annotation Pipeline",
  subtitle:
    "From rsIDs to a triage-ready table with frequency, consequence, and clinical evidence",
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

const CSVPreview = ({ src, title, maxRows = 8 }) => {
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(src, { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const text = await res.text();

        const lines = text.split(/\r?\n/).filter(Boolean);
        if (lines.length === 0) throw new Error("empty CSV");
        const header = lines[0].split(",").map((h) => h.trim());
        const data = lines
          .slice(1)
          .slice(0, maxRows)
          .map((line) => {
            const parts = line.split(",");
            const obj = {};
            header.forEach((k, i) => (obj[k] = (parts[i] ?? "").trim()));
            return obj;
          });

        if (!cancelled) {
          setCols(header);
          setRows(data);
        }
      } catch (e) {
        if (!cancelled) setMissing(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [src, maxRows]);

  if (missing) {
    return (
      <div
        className="rounded-xl border p-4 bg-white/70"
        style={{ borderColor: gold }}
      >
        <div className="font-medium mb-1" style={{ color: accentDark }}>
          {title}
        </div>
        <div className="opacity-70 text-sm">
          Preview not found. Ensure the CSV exists at <code>{src}</code>.
        </div>
      </div>
    );
  }

  if (!rows.length || !cols.length) return null;

  return (
    <div
      className="rounded-xl border p-4 overflow-auto bg-white/80"
      style={{ borderColor: gold }}
    >
      <div className="font-medium mb-2" style={{ color: accentDark }}>
        {title}
      </div>
      <table className="min-w-[640px] text-sm">
        <thead>
          <tr className="text-left">
            {cols.map((c) => (
              <th key={c} className="pr-4 pb-2 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="align-top">
              {cols.map((c) => (
                <td key={c} className="pr-4 py-1">
                  {r[c]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-xs opacity-70 mt-2">
        Showing first {rows.length} rows for preview.
      </div>
    </div>
  );
};

export default function ProjectVariantEvidenceAnnotation() {
  return (
    <div>
      <h1 className="font-serif text-2xl mb-2">{meta.label}</h1>
      <p className="opacity-70 mb-6">{meta.subtitle}</p>

      <section className="mb-6">
        <h3 className="font-medium" style={{ color: accentDark }}>
          Research Question
        </h3>
        <p className="mt-2">
          Given a set of human genetic variants (rsIDs), how can we annotate
          them with frequency, consequence, and clinical evidence to quickly
          triage which may be most relevant for disease?
        </p>
      </section>

      <section className="mb-6">
        <h3 className="font-medium" style={{ color: accentDark }}>
          Project Flow
        </h3>
        <FlowSteps
          steps={[
            "📥 Input rsIDs",
            "🧬 Ensembl Variation / VEP",
            "📊 gnomAD frequencies",
            "🏷 ClinVar significance",
            "📑 Build Evidence Table",
            "✅ Prioritize & Export",
          ]}
        />
      </section>

      <section className="mb-6">
        <h3 className="font-medium" style={{ color: accentDark }}>
          Results (Snippets)
        </h3>
        <ul className="list-disc pl-5 leading-7">
          <li>
            Produced a tidy evidence table for variants like{" "}
            <code>rs429358</code> and <code>rs7412</code>.
          </li>
          <li>
            Each row includes: gene symbol, most severe consequence, impact
            (HIGH / MODERATE / LOW), gnomAD allele frequency, and ClinVar
            significance.
          </li>
          <li>
            Added a simple priority flag: variants that are rare (AF &lt; 1%)
            and protein-altering are flagged <strong>“YES”</strong> for
            follow-up.
          </li>
        </ul>

        <div className="space-y-4 mt-4">
          <CSVPreview
            title="Preview — example evidence table"
            src="/projects/variant-annotation/variant_evidence_table_example.csv"
            maxRows={8}
          />
        </div>

        <div className="mt-4">
          <div className="font-medium mb-1" style={{ color: accentDark }}>
            Downloads
          </div>
          <ul className="list-disc pl-5 leading-7">
            <li>
              <a
                className="underline"
                href="/projects/variant-annotation/variant_evidence_table_example.csv"
                download
              >
                variant_evidence_table_example.csv
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-medium" style={{ color: accentDark }}>
          Concise Summary
        </h3>
        <ul className="list-disc pl-5 leading-7">
          <li>
            I built a reproducible Python pipeline that takes raw rsIDs and
            returns an annotated evidence table.
          </li>
          <li>
            By integrating Ensembl VEP, gnomAD, and ClinVar, the pipeline
            highlights which variants are common and likely benign versus rare
            and potentially disease-related.
          </li>
          <li>
            This forms the basis of variant triage, a routine but critical task
            in human genetics.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="font-medium" style={{ color: accentDark }}>
          Limitations &amp; Future Improvements
        </h3>
        <ul className="list-disc pl-5 leading-7">
          <li>
            Transcript choice: VEP often returns multiple transcripts; current
            pipeline selects the first gene symbol, which oversimplifies
            biology.
          </li>
          <li>
            Coverage gaps: Not all variants are found in gnomAD or ClinVar,
            leading to blanks.
          </li>
          <li>
            Triage rule: The flag is conservative (rare + protein-changing);
            future versions could integrate other scores.
          </li>
          <li>
            Biological scope: Current pipeline covers only transcribed regions;
            regulatory/non-coding elements are not yet considered.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="font-medium" style={{ color: accentDark }}>
          Tools &amp; Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Python",
            "pandas",
            "requests",
            "JSON parsing",
            "Ensembl Variation",
            "Ensembl VEP",
            "MyVariant.info (gnomAD + ClinVar)",
            "Data wrangling",
            "Reproducible pipelines",
          ].map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-medium" style={{ color: accentDark }}>
          Access
        </h3>
        <ul className="list-disc pl-5 leading-7">
          <li>
            <a
              className="underline"
              href="https://github.com/harita-bio/variant-triage-pipeline"
              target="_blank"
              rel="noreferrer"
            >
              Repository with notebook →
            </a>
          </li>
          <li>
            <a
              className="underline"
              href="#/blogs/rsids-to-meaning"
              target="_blank"
              rel="noreferrer"
            >
              Blog (What I Learned Annotating Variants, from DNA Basics to
              ClinVar) →
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
