export default function Blog1() {
  return (
    <>
      <p>
        When I first saw a list of rsIDs, they looked like random codes on a
        page. But I couldn’t help wondering: <i>what do they actually mean? </i>
        <br />
        That simple question pulled me into the world of variant annotation,
        where computer science meets biology.
      </p>

      <p>
        To make sense of it, I had to dive back into biology’s fundamentals -
        the structure of DNA, the role of the antisense strand as a template,
        RNA polymerase transcribing into mRNA, capping, splicing out introns,
        and translating codons into amino acids at the ribosome. Concepts I once
        skimmed in textbooks suddenly became real: a single A→G change could
        alter a codon, shift a reading frame, and ripple into a different
        protein.
      </p>

      <p>
        With that grounding, I built a small pipeline. Using APIs like Ensembl
        VEP, gnomAD, and ClinVar, I could turn an rsID into an evidence table:
        allele frequencies, predicted consequences, clinical significance. The
        table included simple triaging of rare, protein-altering variants that
        might deserve follow-up.
      </p>

      <p>
        What surprised me most was how often the answers were incomplete. VEP
        listed multiple transcripts for the same variant. gnomAD revealed many
        variants were common and likely benign. ClinVar reminded me that many
        are still of “uncertain significance.”{" "}
        <b>
          I realized annotation isn’t about absolute answers, it’s about
          gathering evidence systematically, triaging carefully, and
          acknowledging uncertainty.
        </b>
      </p>

      <p>
        What began as “just code” became an adventure into the choreography of a
        single cell. The nucleus, the spliceosome, the ribosome - each step a
        reminder that something so small and so common carries immense
        complexity. A single variant can set off a butterfly effect that ripples
        through our biology and, ultimately, our lives.
      </p>

      <p>
        This first project left me in awe of creation’s intricacy, and it left
        me with a hunger to keep exploring.
      </p>

      <p>
        I’m still a student, still an explorer, still learning how to ask the
        right questions. But each project brings me closer to where I want to
        be: a researcher who builds bridges between computer science and
        biology, and uses those bridges to help others.
      </p>

      <div className="mt-8">
        <a
          href="#/projects/variant-evidence-annotation"
          className="inline-block underline"
        >
          View Project: Variant Evidence Table →
        </a>
      </div>
    </>
  );
}
