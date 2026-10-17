// All English copy and links live here. Edit this file, not the components.
// The Hebrew version is he.ts, same shape; src/i18n.ts picks one per page.

// a lab card: a screenshot (image, 4:3, in public/lab/) or an embedded player (video: src, title
// and the size baked into its URL; the card scales it). where: shown in place of the site's host.
// aka: the name in its other language, if it has one. behind: optional behind-the-scenes bullets
export type Project = {
  name: string;
  aka: { text: string; lang: string } | null;
  url: string;
  image?: string;
  video?: { src: string; title: string; width: number; height: number };
  where?: string;
  sticker: string;
  cta: string;
  line: string;
  how: string;
  behind?: string[];
};

export const site = {
  lang: { code: "en", dir: "ltr", name: "English", short: "EN", label: "Language" },
  name: "Avrik",
  fullName: "Avrik Berman",
  role: "AI process integrator",
  domain: "avrik.com",
  // the page title and meta description: what search results and link previews show
  title: "Avrik Berman — AI automation for dev and business teams",
  description:
    "AI process integrator. I build AI into how your team already works: AI code review, agentic workflows, document automation and draft replies.",
  ogImage: "/og.png", // the 1200×630 share card, in public/
  ga: "G-MY005Y2GEJ",

  // ── contact ──
  email: "avrik.work@gmail.com",
  calendar: "https://cal.com/avrik",
  linkedin: "https://www.linkedin.com/in/avrik-berman-3643a77/",
  github: "https://github.com/meavrik",

  // home-page sections are linked as /#id so the nav also works from /lab/
  nav: [
    { label: "For you", href: "/#who" },
    { label: "Services", href: "/#what" },
    { label: "Process", href: "/#how" },
    { label: "About", href: "/#bio" },
  ],
  navLabel: "Sections",
  contact: { label: "Contact", href: "#talk" },

  hero: {
    // the headline cycles through these every few seconds; the first one is what the server renders.
    // one entry per line. style: "outline" draws the line hollow, "mark" squiggles under it
    headlines: [
      [{ text: "AI that" }, { text: "fits your", style: "outline" }, { text: "process.", style: "mark" }],
      [{ text: "Automate" }, { text: "the boring", style: "outline" }, { text: "parts.", style: "mark" }],
      [{ text: "Your work," }, { text: "minus the", style: "outline" }, { text: "busywork.", style: "mark" }],
      [{ text: "AI, built" }, { text: "into how", style: "outline" }, { text: "you work.", style: "mark" }],
    ],
    kicker: ["The boring parts", "of your business,", "automated."],
    badge: "AI process integrator ✦ human in the loop ✦ ",
    sub: "Plug AI into how your team already works. Dev pipelines or the office.",
    primary: { label: "Book a call", href: "https://cal.com/avrik" },
    secondary: { label: "See how", href: "#how" },
  },

  lanesTitle: "Choose your lane.",
  lanes: [
    {
      id: "dev",
      title: "Dev teams",
      line: "Agents in the pipeline, not in the way.",
      sticker: "Ship it!",
    },
    {
      id: "biz",
      title: "Business teams",
      line: "The repetitive work, off your plate.",
      sticker: "Finally!",
    },
  ],

  // ── road maps: opened from each lane's call to action ──
  roadmap: {
    label: "Road map",
    cta: { show: "See the road map", hide: "Close road map" },
    close: "Close the road map",
    outcomeLabel: "What you get",
    dev: {
      title: "Dev teams",
      intro: "Friction we see in most design-system and delivery work, and the road out of it.",
      problems: [
        {
          title: "Design system drifts from the code",
          pain: "Figma says one thing, the CSS says another. Tokens get hand-copied and go stale.",
          road: [
            { title: "Map the drift", line: "Audit where values are hard-coded instead of taken from tokens." },
            { title: "One source of truth", line: "Tokens flow from design to code through one pipeline." },
            { title: "Review catches regressions", line: "AI code review flags off-system colours, spacing and type." },
            { title: "Hand over", line: "Your team owns the rules; the bot only enforces them." },
          ],
          outcome: "Design and code agree, without anyone policing it.",
        },
        {
          title: "Pull requests wait days for review",
          pain: "Reviewers are the bottleneck. Small PRs queue behind big ones.",
          road: [
            { title: "Measure the queue", line: "Where PRs stall, and why." },
            { title: "AI first pass", line: "Conventions, tests and risky diffs get flagged before a human looks." },
            { title: "Humans review logic only", line: "Reviewers spend their time where judgement matters." },
            { title: "Hand over", line: "Rules live in the repo. Your team tunes them." },
          ],
          outcome: "Faster merges, and reviewers who aren't exhausted.",
        },
        {
          title: "New components reinvent old ones",
          pain: "Nobody knows what already exists, so it gets built again, slightly differently.",
          road: [
            { title: "Index what you have", line: "Every component, prop and pattern in one place." },
            { title: "Agent-ready docs", line: "People and agents find the existing part before writing a new one." },
            { title: "Scaffold, don't copy", line: "New work starts from the system, not from a blank file." },
            { title: "Hand over", line: "Docs update with the code, not after it." },
          ],
          outcome: "One component per job. Smaller bundle, fewer surprises.",
        },
        {
          title: "Onboarding takes weeks",
          pain: "The knowledge is in people's heads and in Slack threads from 2022.",
          road: [
            { title: "Capture the context", line: "Setup, conventions and gotchas written down once." },
            { title: "Agent-ready repo", line: "AGENTS.md, scripts and checks that newcomers and agents can both run." },
            { title: "Ask the codebase", line: "Questions get answered from the code, not from a busy senior." },
            { title: "Hand over", line: "First PR on day one, with a reviewer who isn't blocked." },
          ],
          outcome: "New people ship in days. Seniors keep their focus.",
        },
      ],
    },
    biz: {
      title: "Business teams",
      intro: "The repetitive, day-to-day work that eats your team's week, and the road out of it.",
      problems: [
        {
          title: "The inbox eats the morning",
          pain: "Requests arrive by email, WhatsApp and forms. Someone sorts them by hand.",
          road: [
            { title: "Map the requests", line: "What comes in, how often, and who should handle it." },
            { title: "Triage, not inbox zero", line: "AI tags, routes and files each request to the right person and folder." },
            { title: "Draft replies for approval", line: "Routine answers arrive pre-written. You press send." },
            { title: "Hand over", line: "A weekly check-in, then it's yours." },
          ],
          outcome: "Mornings back. Nothing falls through.",
        },
        {
          title: "The same document, retyped every time",
          pain: "Quotes, forms, invoices, follow-up letters: the same fields, typed again.",
          road: [
            { title: "Collect the templates", line: "The five documents you produce most." },
            { title: "Fill from intake", line: "Client details flow into the document, not through the keyboard." },
            { title: "One review step", line: "A human checks, signs, sends." },
            { title: "Hand over", line: "Templates stay yours; the filling is automatic." },
          ],
          outcome: "Minutes instead of an afternoon, with fewer typos.",
        },
        {
          title: "Where's that file? What did we tell them?",
          pain: "The answer exists, in a folder, somewhere, known to someone who's on holiday.",
          road: [
            { title: "Connect the folders", line: "Drive, email, the tools you already use." },
            { title: "Your files, answered", line: "A private assistant that answers from your documents and shows the source." },
            { title: "Permissions and audit", line: "Who can ask what, and a log of every answer." },
            { title: "Hand over", line: "Runs in your accounts, under your control." },
          ],
          outcome: "Answers in seconds, from your own records.",
        },
        {
          title: "Chasing clients for missing info",
          pain: "Jobs stall waiting for one document. Someone has to remember to ask again.",
          road: [
            { title: "List what's missing", line: "Per client, per job: what's still needed." },
            { title: "Polite, automatic follow-ups", line: "Reminders in your tone, on a schedule you set." },
            { title: "A status board", line: "One screen: who's waiting on what." },
            { title: "Hand over", line: "Your team adjusts the tone and the timing." },
          ],
          outcome: "Fewer stalled jobs, no nagging by hand.",
        },
      ],
    },
  },

  what: {
    title: "Find the friction. Automate it.",
    sub: "I map where your business loses time: the repetitive, manual, copy-paste work. Then I build AI that takes it over and is simple enough that your team actually uses it.",
    hint: "Pick a card",
  },

  // the service cards: one hand per lane. detail is the back of the card, one short line
  tiles: [
    {
      icon: "review",
      label: "AI code review",
      lane: "dev",
      detail: "Every PR gets a first pass. People review the logic, not the lint.",
    },
    {
      icon: "agent",
      label: "Agentic workflows",
      lane: "dev",
      detail: "Agents run the multi-step chores in your pipeline, then hand off to a person.",
    },
    {
      icon: "system",
      label: "Design-system alignment",
      lane: "dev",
      detail: "Tokens flow from design to code. Off-system values get flagged in review.",
    },
    {
      icon: "merge",
      label: "Unified agent rules",
      lane: "dev",
      detail: "One rulebook in the repo that Claude, Cursor and Copilot all follow.",
    },
    {
      icon: "heal",
      label: "Self-healing E2E tests",
      lane: "dev",
      detail: "End-to-end tests that adapt when the UI changes, instead of breaking.",
    },
    {
      icon: "doc",
      label: "Document automation",
      lane: "biz",
      detail: "Client details flow into your templates. You check, sign, send.",
    },
    {
      icon: "ask",
      label: "Answers from your files",
      lane: "biz",
      detail: "A private assistant that answers from your documents and shows the source.",
    },
    {
      icon: "reply",
      label: "Draft replies",
      lane: "biz",
      detail: "Routine emails and WhatsApps arrive pre-written. You press send.",
    },
    {
      icon: "bell",
      label: "Client follow-ups",
      lane: "biz",
      detail: "Polite reminders for missing info, in your tone, on your schedule.",
    },
    {
      icon: "invoice",
      label: "Quotes & invoices",
      lane: "biz",
      detail: "Built from the request, priced from your list, waiting for your OK.",
    },
  ],

  marquee: [
    "code review",
    "design systems",
    "agents",
    "contracts",
    "pipelines",
    "e2e tests",
    "invoices",
    "docs",
    "follow-ups",
    "training",
    "hand-over",
  ],

  stepsTitle: "Three steps. Stop after any.",
  steps: [
    { icon: "ear", title: "Listen", line: "Your team already knows what hurts." },
    { icon: "flask", title: "Pilot", line: "One workflow, two weeks, measured." },
    { icon: "hand", title: "Hand over", line: "Your people keep the context." },
  ],

  // ── bio: who's behind this ──
  bio: {
    label: "Avrik Berman",
    title: "Hi, I'm Avrik.",
    // one entry per paragraph; closer is the sign-off line under them
    about: [
      "I find the work that eats your team's week: the repetitive, manual, copy-paste parts. Then I hand it to AI.",
      "For business teams, that means requests that sort themselves, documents that fill themselves in, and answers pulled straight from your own files. For dev teams, it's AI code review, agentic workflows, and repos that agents can actually work in.",
      "Every solution is fitted to how you already work, measured in time and money saved, and yours to keep. Behind it are 16+ years of building large web products and leading the teams that ship them.",
    ],
    closer: "Hand me the busywork. I'll take it from there.", //   keeps the last two words together
    // the CSS cartoon above the bio (Portrait.astro). sticker: the tag on its corner
    portrait: {
      alt: "Cartoon of Avrik: curly hair on top with short sides, big eyes, stubble, a hint of a smile, a plain T-shirt, and a small yellow bird nesting in his hair.",
      sticker: "Actual photo",
    },
  },

  // ── faq: plain questions and answers, for people and for search and AI answer engines.
  // The answers only promise what the rest of the site already does ──
  faq: {
    label: "FAQ",
    title: "Fair questions.",
    items: [
      {
        q: "What does an AI process integrator do?",
        a: "I find the repetitive, manual work in how your team operates, then build AI into the tools you already use to take it over. You keep the people, the judgement and the final say.",
      },
      {
        q: "Who is this for?",
        a: "Dev teams that want agents in their pipeline, and business teams that want the busywork gone. Company size doesn't matter; the repetitive work does.",
      },
      {
        q: "How soon will we see results?",
        a: "The pilot is one workflow over two weeks, measured in time and money saved. You know whether it works before you commit to more.",
      },
      {
        q: "Will AI replace my team?",
        a: "No. AI drafts, sorts and checks; a person reviews and approves. On anything that matters, a human stays in the loop.",
      },
      {
        q: "Which AI tools do you use?",
        a: "Whatever fits your stack. For dev teams that's usually Claude, Cursor or Copilot inside your repo; for business teams, AI wired into the email, files and tools you already have.",
      },
      {
        q: "Is our data safe?",
        a: "It runs in your own accounts, under your control, with permissions for who can ask what and a log of every answer.",
      },
      {
        q: "Do we keep what you build?",
        a: "Yes. The automations, rules and templates live in your accounts and repos, and your team learns to tune them. No lock-in.",
      },
    ],
  },

  talk: {
    headline: "Let's talk.",
    sub: "Thirty minutes. No deck.",
    cta: "Book a call",
  },

  // ── /lab/: side projects. Not linked from the home page for now; the route stays live.
  // One Project per card, see the type at the top ──
  lab: {
    title: "Built after hours.",
    sub: "Side projects. Things I make on my own time, live and in use.",
    metaTitle: "Lab — Avrik",
    metaDescription: "Side projects by Avrik Berman:", // the project names follow
    screenshot: "Screenshot of", // alt text prefix, the project name follows
    projects: [
      {
        name: "Wayback News",
        aka: { text: "מעתמול", lang: "he" },
        url: "https://wayback.news",
        image: "/lab/wayback-news.webp",
        sticker: "Est. 1926",
        cta: "Read today's issue",
        line: "A Hebrew daily newspaper from exactly 100 years ago. A new issue every morning, dated one century back to the day.",
        how: "AI working over digitised archives. Real events only, every claim traced to a source.",
        behind: [
          "A newsroom of 40 AI agents puts out a new issue every day, built from real archive sources.",
          "An AI-based control panel to run and manage the pipelines, social media and more.",
        ],
      },
      {
        name: "TerraTale",
        aka: null,
        url: "https://bridge-town.netlify.app",
        image: "/lab/terratale.webp",
        sticker: "Play!",
        cta: "Play it",
        line: "A merge-three puzzle game. Match three, grow the wilds, one day per move.",
        how: "Pixel art, made for your phone.",
      },
    ] as Project[],
  },

  // the bird that peeps out of the clouds now and then says one of these
  birdSays: ["peep!", "hi!", "psst!", "boo!"],

  footer: { text: "Avrik Berman · built with Astro" },
};

export type Site = typeof site;
