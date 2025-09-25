export default function Blog2() {
  return (
    <>
      <p>
        When I first opened the epilepsy GWAS summary statistics file, it looked
        endless with millions of rows, each holding a p-value, a chromosome, a
        SNP ID. At first glance, it felt impossible to see meaning in the noise.
        But slowly, layer by layer, like peeling an onion, I started uncovering
        how each part mattered.
      </p>

      <p>
        The Manhattan plot was my first view:{" "}
        <i>
          a skyline of peaks across chromosomes. It struck me that every
          “skyscraper” rising above the threshold line (–log10 p of 5×10⁻⁸) was
          not just a data point but a potential biological story.{" "}
        </i>{" "}
        Then came the QQ plot —{" "}
        <i>
          and my puzzling over its shape. Why was it diagonal at first, then
          bending upward, and finally flattening? Understanding that taught me
          how calibration, polygenicity, and true signals all leave their
          fingerprints on the curve.{" "}
        </i>
      </p>

      <p>But the questions didn’t stop there.</p>

      <p className="text-[#7f5d3b] font-merriweather">
        What does λGC really mean? I learned it’s a single number summarizing
        whether test statistics are inflated - ideally near 1.
      </p>

      <p>
        Why do I only see 5 loci when the paper said 26? I realized dataset
        differences, thresholds, and my simple window-based clumping all
        contribute.
      </p>

      <p>
        What exactly is clumping? My quick ±250 kb approach avoids
        double-counting, but true LD clumping accounts for variant correlations
        in a population, something I need to add later.
      </p>

      <p>
        When mapping to genes with VEP, why do I only get certain results?
        Because I was only capturing transcribed genes, leaving out non-coding
        regulation, enhancers, and intergenic regions that also matter.
      </p>

      <h3>Limitations I Noticed</h3>
      <ul>
        <li>
          Clumping: window-based, not LD-aware → merges nearby but distinct
          signals.
        </li>
        <li>
          Dataset: I have been using only one subset, not the meta-analysis that
          produced 26 loci.
        </li>
        <li>
          Thresholds: 5×10⁻⁸ is the convention, but lowering to 1×10⁻⁶ shows
          “suggestive” peaks that I need to explore
        </li>
        <li>
          Gene mapping: only nearest/overlapping transcribed genes were
          considered, ignoring regulatory context.
        </li>
        <li>
          Biological interpretation: I didn’t yet integrate tissue expression so
          I couldn’t check if the mapped genes were active in the brain.
        </li>
      </ul>

      <h3>The Next Step</h3>
      <p>
        If I had to pick one clear next step, it would be to bring in GTEx brain
        expression. Why? Because epilepsy is a neurological condition. Seeing
        whether the genes at my lead loci are actually expressed in brain
        tissues would connect the statistical peaks back to biological
        plausibility. It would turn abstract signals into something that feels
        real.
      </p>

      <h3>Growth Reflected</h3>
      <p>
        This project was less about producing perfect plots and more about
        learning to ask better questions. Each time I wondered why - I grew a
        little closer to thinking like a researcher. It taught me that GWAS is
        not just about skyscrapers on a plot, but about peeling layers until the
        signals tell a biological story.
      </p>
      <p>
        I leave this project not with final answers, but with clarity about my
        next steps, and with a deepening awe for how much a single variant can
        ripple through biology.
      </p>

      <div className="mt-8">
        <a href="#/projects/epilepsy-gwas" className="inline-block underline">
          View Project: Epilepsy GWAS Association Analysis →
        </a>
      </div>
    </>
  );
}
