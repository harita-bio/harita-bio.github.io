// src/App.jsx
import React, { useMemo, useState, useEffect } from "react";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";

const theme = {
  bg: "bg-[#faf6f0]", // nude paper
  ink: "text-[#2b2b2b]", // deep ink
  accent: "#b08968", // warm brown
  accentDark: "#7f5d3b", // darker brown
  gold: "#c8a76a", // muted gold
};

const DEFAULT_SETTINGS = {
  name: "Harita Anbuvelan",
  tagline: "Omics • Software • Cloud",
  heroStatement: `Hello,

I’m on a path to help shape what’s ahead by studying what’s within. My passion for helping people and the skills I’ve deliberately honed across computing and biology are two sides of the same coin—one I use to bridge biology and innovation with clear, reproducible software. If this resonates with your work, let’s build that bridge together.`,
  bioTagline: "The 0.1% that makes me",
  degrees:
    " M.S. Computer Science — Purdue University;  B.E. Computer Science — Visvesvaraya Technological University",
  experiences:
    "Bioinformatics (Genomics), Cloud engineering, Data platforms, Web technology, Software Development",
  headshotUrl: "/headshot.jpeg",

  resumeLines: `2025 — Software Engineer Intern, NextWaveSTEM | I designed and built classroom-ready drone simulations with React and Three.js. I extended the Blockly interface with new commands and event-driven flight behaviors so students could code and immediately see motion in 3D. I worked with educators to tune the experience and shipped features from prototype to production.
2023–2024 — Technical Consultant, Indiana University UITS | I supported campus research and teaching across Windows, macOS, iOS, and Android, plus core services like email, LMS, and storage thereby keeping data and tools reliably accessible. I managed identity and access (SSO/MFA and CrimsonCard) with strict verification and policy compliance, reinforcing privacy and data integrity. I also backed Student Technology Centers and residence-hall networking, turning complex issues into clear, reproducible steps and documentation.
2020–2022 — Cloud Engineer, L&T Infotech | I engineered AWS and Azure infrastructure for Linux and Windows workloads that were codified with Terraform and shipped through CI/CD for reliable, repeatable environments. I automated provisioning and operations with Bash and PowerShell, enforced security with IAM/RBAC and encryption (KMS/Key Vault), and instrumented CloudWatch/Azure Monitor for clear visibility. I kept platforms efficient and resilient with autoscaling, right-sizing, and Spot/Reserved strategies, backed by concise runbooks and standards.
2019 — Research Intern, National Aerospace Laboratories (NAL) | I built Python automation to analyze TCP sequence/ack patterns and surface threats, reducing response times by 25%. I contributed backend and UI to a Django traffic-monitoring app, integrated live network data for real-time dashboards, and improved troubleshooting speed and overall efficiency by 15%.`,

  pastProjectLines: `Forest Fires Prediction | ML model that forecasts forest-fire risk from weather and terrain signals for early action | https://github.com/Harita30/forest_fires
WannaGo | Android app to plan and share outings—save places, build quick itineraries, and navigate with one tap | https://github.com/Harita30/WannaGo
Slack Bot | Django-backed Slack agent that verifies requests and responds to commands for quick, reliable workflows | https://github.com/Harita30/Slack_Bot
Voice Assistant | Lightweight NLP assistant that turns speech into clean text and structured notes for study or tasks | https://github.com/Harita30/Voice-Assistant`,

  publicationLines: `Parallel SVM Model for Forest Fire Prediction | https://doi.org/10.1016/j.socl.2021.100014
A Comparison of Different Methodologies for Predicting Forest Fires | https://doi.org/10.1007/978-981-16-1056-1_14`,

  skills:
    "Python, Linux, BASH, PowerShell, Java, JavaScript, React, HTML, CSS, SQL, Django, AWS, Azure, Docker, Terraform, Git, CI/CD, Three.js",

  skillsByCategory:
    "Languages: Python, Java, JavaScript; Frontend: React, HTML, CSS, Three.js, React Three Fiber, Tailwind; Cloud: AWS, Azure, GCP; Data/Ops: SQL, MySQL, PostgreSQL, Docker, Kubernetes, Terraform, Git, CI/CD, Linux, Tableau",
};

function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("notebook.portfolio.settings.v2");
      if (raw) setSettings(JSON.parse(raw));
    } catch {}
  }, []);
  const save = (next) => {
    setSettings(next);
    try {
      localStorage.setItem(
        "notebook.portfolio.settings.v2",
        JSON.stringify(next)
      );
    } catch {}
  };
  return [settings, save];
}

// hash router
function useHashRoute() {
  const [route, setRoute] = useState(
    () => window.location.hash.replace("#", "") || "/"
  );
  useEffect(() => {
    const onHashChange = () =>
      setRoute(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return { route };
}

// Background
const Paper = ({ children }) => (
  <div
    className={`${theme.bg} ${theme.ink} min-h-screen w-full`}
    style={{
      backgroundImage:
        "linear-gradient(to bottom, rgba(200,167,106,0.12) 1px, transparent 1px)",
      backgroundSize: "100% 36px",
    }}
  >
    {children}
  </div>
);

// Header
const Header = () => (
  <header className="sticky top-0 z-20 backdrop-blur bg-[#faf6f0]/80 border-b border-[#e3d7c7]">
    <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
      <div
        className="font-serif text-xl tracking-wide"
        style={{ color: theme.accent }}
      >
        Harita's journey
      </div>
      <nav className="flex flex-wrap items-center gap-4">
        <a href="#/" className="hover:underline">
          About
        </a>
        <a href="#/resume" className="hover:underline">
          Resume
        </a>
        <a href="#/projects" className="hover:underline">
          Projects
        </a>
        <a href="#/blogs" className="hover:underline">
          Blogs
        </a>
      </nav>
    </div>
  </header>
);

// UI used by About/Resume
const GoldQuote = ({ children }) => (
  <blockquote
    className="relative rounded-2xl border overflow-hidden"
    style={{
      borderColor: theme.gold,
      background: "linear-gradient(135deg, #fffaf0 0%, #f6ead3 100%)",
    }}
  >
    <div
      className="absolute -top-3 -left-2 text-6xl opacity-20 select-none"
      style={{ color: theme.accent }}
    >
      “
    </div>
    <div className="p-4 md:p-5 leading-7">{children}</div>
  </blockquote>
);

const SectionTitle = ({ icon, children }) => (
  <div
    className="flex items-center gap-2 font-medium"
    style={{ color: theme.accentDark }}
  >
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full border"
      style={{
        borderColor: theme.gold,
        background:
          "linear-gradient(135deg, rgba(200,167,106,0.25) 0%, #fff5cc 100%)",
      }}
    >
      {icon}
    </span>
    <span className="uppercase tracking-wide text-sm">{children}</span>
  </div>
);

const MortarboardIcon = (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M22 10L12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c4 3 8 3 12 0v-5" />
  </svg>
);

const BriefcaseIcon = (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M3 12h18" />
  </svg>
);

const NoteCard = ({ children }) => (
  <div
    className="rounded-2xl border bg-white/80 p-4 shadow-sm"
    style={{ borderColor: theme.gold }}
  >
    {children}
  </div>
);

const GoldFadeCard = ({ children }) => (
  <div
    className="rounded-2xl border p-4 shadow-sm"
    style={{
      borderColor: theme.gold,
      background:
        "linear-gradient(135deg, rgba(200,167,106,0.20) 0%, rgba(200,167,106,0.08) 40%, rgba(255,255,255,0.95) 100%)",
    }}
  >
    {children}
  </div>
);

const ProjectLightCard = ({ children }) => (
  <div
    className="rounded-2xl border p-4 shadow-sm"
    style={{
      borderColor: theme.gold,
      background: "linear-gradient(135deg, #fffef9 0%, #fbf3e4 100%)",
    }}
  >
    {children}
  </div>
);

const PastFadeCard = ({ children }) => (
  <div
    className="rounded-2xl border p-4 shadow-sm"
    style={{
      borderColor: theme.gold,
      background:
        "linear-gradient(135deg, rgba(200,167,106,0.07) 0%, rgba(200,167,106,0.03) 40%, rgba(255,255,255,1) 100%)",
    }}
  >
    {children}
  </div>
);

const PubFadeCard = ({ children }) => (
  <div
    className="rounded-2xl border p-4 shadow-sm"
    style={{
      borderColor: theme.gold,
      background:
        "linear-gradient(135deg, rgba(200,167,106,0.10) 0%, rgba(200,167,106,0.04) 40%, rgba(255,255,255,1) 100%)",
    }}
  >
    {children}
  </div>
);

const Timeline = ({ items }) => (
  <div className="relative pl-6">
    <div
      className="absolute left-2 top-0 bottom-0 w-px"
      style={{ background: theme.gold }}
    />
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span
            className="absolute -left-0.5 top-1.5 -right-1.5 w-2 h-2 rounded-full"
            style={{ background: theme.gold }}
          />
          <div className="ml-2">{it}</div>
        </li>
      ))}
    </ul>
  </div>
);

const ChipList = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((it, i) => (
      <span
        key={i}
        className="rounded-full border px-3 py-1 text-sm bg-white/80"
        style={{ borderColor: theme.gold }}
      >
        {it}
      </span>
    ))}
  </div>
);

// About
const PhotoBlock = ({ url, tagline }) => (
  <div className="space-y-2">
    <div
      className="relative w-full max-w-[300px] md:max-w-[300px] aspect-[3/4] rounded-2xl border shadow-sm overflow-hidden"
      style={{ borderColor: theme.gold }}
    >
      {url ? (
        <img src={url} className="w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <div className="font-medium" style={{ color: theme.accentDark }}>
              Your Photo Here
            </div>
            <p className="text-sm opacity-70 mt-1">
              Set a headshot URL via Customize. Suggested: 900×1200px.
            </p>
          </div>
        </div>
      )}
    </div>
    {tagline && (
      <div
        className="text-[18px] leading-snug text-center italic -mt-1"
        style={{
          color: theme.accentDark,
          fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", serif',
        }}
      >
        {tagline}
      </div>
    )}
  </div>
);

const AboutPage = ({ settings }) => {
  const degreeItems = settings.degrees
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
  const experienceChips = settings.experiences
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <main className="mx-auto max-w-5xl px-4 pt-2 pb-8">
      <div className="mx-auto md:w-[95%] lg:w-[92%]">
        <section className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 items-start">
          {/* Row 1 — centered name + tagline */}
          <div className="md:col-span-2 text-center">
            <h1 className="font-serif text-3xl md:text-4xl">{settings.name}</h1>
            <div
              className="mx-auto mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 bg-white/60 shadow-sm uppercase tracking-wide text-[11px]"
              style={{ borderColor: theme.gold, color: theme.accentDark }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: theme.gold }}
              />
              {settings.tagline}
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: theme.gold }}
              />
            </div>
          </div>

          {/* HERO */}
          <div className="md:col-span-2">
            <GoldQuote>
              <div className="whitespace-pre-line">
                {settings.heroStatement}
              </div>
            </GoldQuote>
          </div>

          {/* Row 3 — LEFT column: Education + Experience Focus */}
          <div className="space-y-6 mt-4 md:mt-8">
            <div className="mb-2">
              <SectionTitle icon={MortarboardIcon}>Education</SectionTitle>
            </div>
            <PastFadeCard>
              <Timeline items={degreeItems} />
            </PastFadeCard>

            <div className="mb-2">
              <SectionTitle icon={BriefcaseIcon}>Experience Focus</SectionTitle>
            </div>
            <NoteCard>
              <div className="grid grid-cols-2 gap-4">
                {experienceChips.map((x, i) => (
                  <span
                    key={i}
                    className="w-full text-center rounded-full border px-3 py-1 text-sm bg-white/80"
                    style={{ borderColor: theme.gold }}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </NoteCard>
          </div>

          {/* Row 3 — RIGHT column: Photo */}
          <div className="flex md:justify-end">
            <div className="md:-translate-x-2 md:-translate-y-2">
              <PhotoBlock
                url={settings.headshotUrl}
                tagline={settings.bioTagline}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

// Helper parsers
function parseResumeLines(text) {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|");
      const left = (parts[0] || "").trim();
      const body = (parts[1] || "").trim();
      let dashIdx = left.indexOf("—");
      if (dashIdx < 0) dashIdx = left.indexOf("–");
      if (dashIdx < 0) dashIdx = left.indexOf("-");
      const dates = dashIdx >= 0 ? left.slice(0, dashIdx).trim() : "";
      const title = dashIdx >= 0 ? left.slice(dashIdx + 1).trim() : left;
      return { dates, title, body };
    });
}
function parseProjects(text) {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|");
      const name = (parts[0] || "").trim();
      const desc = (parts[1] || "").trim();
      const url = (parts[2] || "").trim();
      return { name, desc, url };
    });
}
function parsePublications(text) {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|");
      const title = (parts[0] || "").trim();
      const url = (parts[1] || "").trim();
      return { title, url };
    });
}

// Resume Page

// Experience vertical timeline
const ArrowCard = ({ side, children, className = "" }) => (
  <div className={`relative ${className}`}>
    <GoldFadeCard>{children}</GoldFadeCard>
    <span
      className="hidden md:block absolute top-1/2 -translate-y-1/2"
      style={
        side === "left"
          ? {
              left: "-12px",
              width: 0,
              height: 0,
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
              borderRight: `12px solid ${theme.gold}`,
            }
          : {
              right: "-12px",
              width: 0,
              height: 0,
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
              borderLeft: `12px solid ${theme.gold}`,
            }
      }
    />
  </div>
);

const ExperienceTimeline = ({ items }) => (
  <section className="mb-8">
    <div className="mb-2">
      <SectionTitle icon={BriefcaseIcon}>Experience</SectionTitle>
    </div>

    <div className="relative">
      {/* Center vertical spine */}
      <div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
        style={{ background: theme.accentDark }}
      />
      <ul className="space-y-12 md:space-y-14">
        {items.map((it, i) => {
          const leftSide = i % 2 !== 0;
          return (
            <li
              key={i}
              className="grid grid-cols-1 md:grid-cols-[1fr,48px,1fr] items-start gap-4"
            >
              {/* LEFT COLUMN */}
              <div className="md:flex md:justify-end">
                {leftSide && (
                  <ArrowCard side="left" className="md:max-w-[520px] md:-mr-10">
                    <div
                      className="text-lg font-medium"
                      style={{ color: "#000" }}
                    >
                      {it.title}
                    </div>
                    {it.body && (
                      <div className="mt-2 leading-7 whitespace-pre-line">
                        {it.body}
                      </div>
                    )}
                  </ArrowCard>
                )}
              </div>

              {/* CENTER – date badge */}
              <div className="order-2 md:self-stretch md:flex md:items-center md:justify-center md:py-3 relative">
                <div
                  className="hidden md:block rounded-full border px-2 py-1 text-sm bg-white/90 shadow-sm pointer-events-none"
                  style={{ borderColor: theme.gold, color: theme.accentDark }}
                >
                  {it.dates}
                </div>
                <div
                  className="md:hidden inline-block rounded-full w-2 h-2 ml-2"
                  style={{ background: theme.gold }}
                />
              </div>

              {/* RIGHT COLUMN */}
              <div className="md:flex md:justify-start">
                {!leftSide && (
                  <ArrowCard
                    side="right"
                    className="md:max-w-[520px] md:-ml-10"
                  >
                    <div
                      className="text-lg font-medium"
                      style={{ color: "#000" }}
                    >
                      {it.title}
                    </div>
                    {it.body && (
                      <div className="mt-2 leading-7 whitespace-pre-line">
                        {it.body}
                      </div>
                    )}
                  </ArrowCard>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

// Publications
const ScrollPaper = ({ children }) => (
  <div
    className="relative rounded-lg border p-4 pt-6 pb-7 shadow-sm"
    style={{
      borderColor: theme.gold,
      background:
        "linear-gradient(135deg, rgba(200,167,106,0.07) 0%, rgba(200,167,106,0.03) 40%, #ffffff 100%)",
    }}
  >
    <div
      className="absolute -top-2 left-4 right-4 h-3 rounded-full border"
      style={{
        background:
          "linear-gradient(180deg, rgba(231,212,166,0.7), rgba(210,183,123,0.7))",
        borderColor: theme.gold,
      }}
    />
    <div
      className="absolute -bottom-2 left-4 right-4 h-3 rounded-full border"
      style={{
        background:
          "linear-gradient(0deg, rgba(231,212,166,0.7), rgba(210,183,123,0.7))",
        borderColor: theme.gold,
      }}
    />
    {children}
  </div>
);

const ResumePage = ({ settings }) => {
  const exp = parseResumeLines(settings.resumeLines);
  const projects = parseProjects(settings.pastProjectLines);
  const pubs = parsePublications(settings.publicationLines);
  const skills = settings.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* EXPERIENCE */}
      <ExperienceTimeline items={exp} />

      <div className="my-8 h-[2px]" style={{ background: theme.accentDark }} />

      {/* PAST PROJECTS */}
      <section className="mb-8">
        <div className="mb-2">
          <SectionTitle icon={<span>∎</span>}>Past Projects</SectionTitle>
        </div>
        <ul className="grid md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <li key={i}>
              <ProjectLightCard>
                <div className="font-medium" style={{ color: "#241A0E" }}>
                  {p.name}
                </div>
                <p className="mt-1 opacity-80">{p.desc}</p>
                {p.url && (
                  <a
                    className="inline-block mt-2 underline"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                )}
              </ProjectLightCard>
            </li>
          ))}
        </ul>
      </section>

      <div className="my-8 h-[2px]" style={{ background: theme.accentDark }} />

      {/* PUBLICATIONS */}
      <section className="mb-8">
        <div className="mb-2">
          <SectionTitle icon={<span>¶</span>}>Publications</SectionTitle>
        </div>
        <ul className="space-y-3">
          {pubs.map((p, i) => (
            <li key={i}>
              <ScrollPaper>
                <div className="flex items-center justify-between">
                  <div className="font-medium" style={{ color: "#3B2F2F" }}>
                    {p.title}
                  </div>
                  {p.url && (
                    <a
                      className="underline"
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link
                    </a>
                  )}
                </div>
              </ScrollPaper>
            </li>
          ))}
        </ul>
      </section>

      <div className="my-8 h-[2px]" style={{ background: theme.accentDark }} />

      {/* SKILLS */}
      <section>
        <div className="mb-2">
          <SectionTitle icon={<span>★</span>}>Skills</SectionTitle>
        </div>
        <NoteCard>
          <ChipList items={skills} />
        </NoteCard>
      </section>
    </main>
  );
};

const Footer = () => (
  <footer className="mt-8 border-t" style={{ borderColor: "#e3d7c7" }}>
    <div className="mx-auto max-w-5xl px-4 py-6 text-sm opacity-70">
      © {new Date().getFullYear()} Harita Anbuvelan • Portfolio
    </div>
  </footer>
);

export default function App() {
  const { route } = useHashRoute();
  const [settings] = useSettings();

  useEffect(() => {
    try {
      console.assert(
        parseResumeLines("2024 — Role, Co | Did X").length === 1,
        "resume parser ok"
      );
      const dashVar = parseResumeLines("2020-2021 - Title | Body")[0];
      console.assert(
        dashVar.dates === "2020-2021" && dashVar.title.startsWith("Title"),
        "resume dash variant ok"
      );
      console.assert(
        parseProjects("Name | Desc | http://x")[0].url.includes("http"),
        "projects parser ok"
      );
      console.assert(
        parsePublications("Paper | http://x")[0].title === "Paper",
        "pubs parser ok"
      );
    } catch {}
  }, []);

  const page = useMemo(() => {
    if (route === "/") return <AboutPage settings={settings} />;
    if (route === "/resume") return <ResumePage settings={settings} />;

    // Projects
    if (route === "/projects") return <ProjectsPage />;
    if (route.startsWith("/projects/")) {
      const slug = route.split("/")[2] || "";
      return <ProjectDetail slug={slug} />;
    }

    // Blogs
    if (route === "/blogs") return <BlogsPage />;
    if (route.startsWith("/blogs/")) {
      const slug = route.split("/")[2] || "";
      return <BlogsPage initialSlug={slug} />;
    }

    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center">Page not found.</div>
      </main>
    );
  }, [route, settings]);

  return (
    <Paper>
      <Header />
      {page}
      <Footer />
    </Paper>
  );
}
