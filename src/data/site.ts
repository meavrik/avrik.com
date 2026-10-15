// All copy and links live here. Edit this file, not the components.

export const site = {
  name: "Avrik",
  domain: "avrik.com",
  title: "Avrik — AI process integrator",
  description:
    "I integrate AI into how your team already works. Dev pipelines or the office. Avrik Berman, AI process integrator.",
  ga: "G-MY005Y2GEJ",

  // ── contact ──
  email: "avrik.work@gmail.com",
  calendar: "https://cal.com/avrik",
  linkedin: "https://www.linkedin.com/in/avrik-berman-3643a77/",
  github: "https://github.com/meavrik",

  // home-page sections are linked as /#id so the nav also works from /lab/
  nav: [
    { label: "Who", href: "/#who" },
    { label: "What", href: "/#what" },
    { label: "How", href: "/#how" },
    { label: "Bio", href: "/#bio" },
    { label: "Lab", href: "/lab/" },
  ],

  hero: {
    // the headline cycles through these every few seconds; the first one is what the server renders.
    // one entry per line. style: "outline" draws the line hollow, "mark" squiggles under it
    headlines: [
      [{ text: "AI that" }, { text: "fits your", style: "outline" }, { text: "process.", style: "mark" }],
      [{ text: "Automate" }, { text: "the boring", style: "outline" }, { text: "parts.", style: "mark" }],
      [{ text: "Your work," }, { text: "minus the", style: "outline" }, { text: "busywork.", style: "mark" }],
      [{ text: "AI, built" }, { text: "into how", style: "outline" }, { text: "you work.", style: "mark" }],
    ],
    kicker: ["Practical.", "Simple.", "Yours to keep."],
    badge: "AI process integrator ✦ Tel Aviv ✦ human in the loop ✦ ",
    sub: "I plug AI into how your team already works. Dev pipelines or the office.",
    primary: { label: "Book a call", href: "https://cal.com/avrik" },
    secondary: { label: "See how", href: "#how" },
  },

  lanesTitle: "Choose your lane.",
  lanes: [
    {
      id: "dev",
      icon: "terminal",
      title: "Dev teams",
      line: "Agents in the pipeline, not in the way.",
      sticker: "Ship it!",
      tags: ["AI code review", "agent workflows", "agent-ready repos"],
    },
    {
      id: "biz",
      icon: "briefcase",
      title: "Small business",
      line: "The repetitive work, off your plate.",
      sticker: "Finally!",
      tags: ["intake & triage", "document automation", "your files, answered"],
    },
  ],

  // ── road maps: opened from each lane's call to action ──
  roadmap: {
    cta: { show: "See the road map", hide: "Close road map" },
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
      title: "Small business",
      intro: "The repetitive, day-to-day work that eats a small team's time, and the road out of it.",
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
  },

  tiles: [
    { icon: "review", label: "Code review", lane: "dev" },
    { icon: "agent", label: "Agent workflows", lane: "dev" },
    { icon: "repo", label: "Agent-ready repos", lane: "dev" },
    { icon: "inbox", label: "Intake & triage", lane: "biz" },
    { icon: "doc", label: "Document automation", lane: "biz" },
    { icon: "book", label: "Knowledge base", lane: "biz" },
  ],

  marquee: [
    "code review",
    "intake",
    "agents",
    "contracts",
    "pipelines",
    "triage",
    "docs",
    "training",
    "hand-over",
  ],

  steps: [
    { icon: "ear", title: "Listen", line: "Your team already knows what hurts." },
    { icon: "flask", title: "Pilot", line: "One workflow, two weeks, measured." },
    { icon: "hand", title: "Hand over", line: "Your people keep the context." },
  ],

  // ── bio: who's behind this. path: the career so far, oldest first; the last stop is today ──
  bio: {
    label: "Avrik Berman · Tel Aviv",
    title: "Hi, I'm Avrik.",
    // one entry per paragraph; closer is the sign-off line under them
    about: [
      "I trained as an animator and have spent 16+ years building large web products: online games, cybersecurity platforms, AI developer tools.",
      "Along the way I've led front-end teams, built design systems and data-visualisation engines from scratch, and set up the reviews, pipelines and standards that keep big codebases healthy.",
      "These days I put AI into the development process itself: code rules, skills and agent workflows that help teams ship faster without cutting corners.",
    ],
    closer: "Hand me your tech debt. I'll own it.", //   keeps "tech debt" on one line
    path: [
      { title: "Animator & designer", line: "Motion, drawing, and an eye for how things feel to use." },
      { title: "Front-end expert", line: "The code between the design and the user, and the teams that ship it." },
      { title: "AI builder", line: "AI that fits how your team already works. Practical, measured, yours to keep." },
    ],
    now: "Now",
    after: { text: "After hours: game jams and side projects.", link: "See the lab", href: "/lab/" },
    // the CSS cartoon above the bio (Portrait.astro). sticker: the tag on its corner
    portrait: {
      alt: "Cartoon of Avrik: curly hair on top with short sides, big eyes, stubble, a hint of a smile, a plain T-shirt, and a small yellow bird nesting in his hair.",
      sticker: "Actual photo",
    },
  },

  talk: {
    headline: "Let's talk.",
    sub: "Thirty minutes. No deck.",
  },

  // ── /lab/: side projects. image: a 4:3 screenshot in public/lab/. behind: optional behind-the-scenes bullets ──
  lab: {
    title: "Built after hours.",
    sub: "Side projects. Things I make on my own time, live and in use.",
    projects: [
      {
        name: "Wayback News",
        native: "מעתמול",
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
        url: "https://bridge-town.netlify.app",
        image: "/lab/terratale.webp",
        sticker: "Play!",
        cta: "Play it",
        line: "A merge-three puzzle game. Match three, grow the wilds, one day per move.",
        how: "Pixel art, made for your phone.",
      },
    ],
  },

  // the bird that peeps out of the clouds now and then says one of these
  birdSays: ["peep!", "hi!", "psst!", "boo!"],

  footer: "Avrik Berman · Tel Aviv · built with Astro",
};

export type Site = typeof site;
