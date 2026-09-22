import type { LocaleContent } from "./types";

/**
 * English — the CONTRACT. Every other locale is typed against
 * {@link LocaleContent}, so a line missing from one of them is a type error
 * rather than a sentence a reader finds in the wrong language.
 */
export const en: LocaleContent = {
  docTitle: "Alina Khomenker — Senior Full-Stack Engineer",
  toggle: { glyph: "עב", label: "עבור לעברית" },
  theme: { toLight: "Switch to the light theme", toDark: "Switch to the dark theme" },
  sections: {
    opening: "Opening",
    summary: "Summary",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    strengths: "Strengths",
    recommendations: "Recommendations",
    faq: "Questions",
    contacts: "Contacts",
    closing: "Closing"
  },
  person: {
    name: "Alina Khomenker",
    role: "Senior Full-Stack Engineer",
    tagline: "6+ years, frontend oriented"
  },
  ui: {
    skip: "Skip to content",
    menu: "Menu",
    loading: "Loading",
    close: "Close",
    present: "Present",
    rating: "{label}: {rating} out of 5"
  },
  opening: { write: "Contact me", download: "Download CV" },
  summary: {
    title: "Summary",
    share: "80%",
    blocks: [
      {
        id: "craft",
        text: "I'm a Senior Full-Stack Engineer, Frontend Oriented with 6+ years of experience, specializing in React, TypeScript, and modern frontend architecture, with strong .NET and C# backend expertise."
      },
      {
        id: "ownership",
        text: "Owns frontend architecture across the full product lifecycle, from technical design and implementation to delivery, maintenance and continuous improvement."
      },
      {
        id: "impact",
        text: "Reviews around 80% of the company's client pull requests and led the refactoring of approximately 70% of the production frontend, significantly improving code quality, maintainability and performance."
      },
      {
        id: "platform",
        text: "Works with a Turborepo-based monorepo and contributes to a multi-client healthcare platform where one codebase supports different clients through configuration and client-specific workflows."
      },
      {
        id: "ai",
        text: "Developed AI-assisted engineering workflows by defining AI skills, coding guidelines, and reusable rules for Claude agents to improve consistency, automation, and development efficiency."
      },
      {
        id: "security",
        text: "Implemented PostHog analytics while working with healthcare data and considering HIPAA and PHI compliance requirements."
      },
      {
        id: "lead",
        text: "Coordinates technical tasks across multiple teams, breaks down complex requirements, aligns implementation efforts, and drives end-to-end delivery."
      },
      {
        id: "ui",
        text: "Built a reusable UI kit with React, TypeScript, Tailwind CSS, and Storybook, establishing consistent components, design patterns, and frontend standards across products."
      }
    ]
  },

  skills: {
    title: "Skills",
    filter: {
      label: "Filter skills",
      chosen: "{count} chosen",
      empty: "No tool by that name",
      clear: "Clear"
    },
    groups: [
      {
        id: "frontend",
        label: "Frontend",
        items: [
          "React",
          "TypeScript",
          "Next.js",
          "React Hooks",
          "React Router",
          "Zustand",
          "TanStack Query",
          "Zod",
          "Redux Toolkit",
          "RTK Query",
          "MobX",
          "RxJS",
          "React Hook Form",
          "Tailwind CSS",
          "HTML",
          "CSS",
          "SCSS"
        ]
      },
      {
        id: "backend",
        label: "Backend and APIs",
        items: [".NET", "C#", "Node.js", "REST APIs", "GraphQL", "Python", "Java", "SQL", "OpenAPI/Swagger", "Postman"]
      },
      {
        id: "cloud",
        label: "Cloud and data",
        items: ["Azure", "AWS", "Docker", "CI/CD", "MySQL", "PostgreSQL", "MongoDB", "Redis"]
      },
      {
        id: "testing",
        label: "Testing and quality",
        items: [
          "Playwright",
          "React Testing Library (Vitest)",
          "Unit testing",
          "Integration testing",
          "E2E testing",
          "Code review"
        ]
      },
      {
        id: "craft",
        label: "AI, architecture and tooling",
        items: [
          "ADLS System",
          "Claude",
          "AI agents",
          "Custom AI skills",
          "Agentic workflows",
          "Clean Architecture",
          "SOLID",
          "Design patterns",
          "Modular architecture",
          "Performance",
          "Git",
          "GitHub",
          "Atlassian Suite"
        ]
      }
    ]
  },
  strengths: {
    title: "Strengths",
    items: [
      { label: "Stress resilience", rating: 5 },
      { label: "Communication", rating: 5 },
      { label: "Ownership and responsibility", rating: 5 },
      { label: "Mentoring and knowledge sharing", rating: 4 },
      { label: "Attention to detail", rating: 5 },
      { label: "Fast learner", rating: 4 },
      { label: "Managing parallel projects", rating: 4 }
    ]
  },
  experience: {
    title: "Experience",
    stackLabel: "Stack",
    open: "Show more",
    companyLink: "{company} on LinkedIn",
    items: [
      {
        id: "transperra",
        role: "Senior Full-Stack Engineer, client-side owner",
        company: "Wotch / Transperra",
        companyUrl: "https://www.linkedin.com/company/wotch-health/",
        place: "Tel Aviv",
        start: { year: 2025, month: 1 },
        end: null,
        tech: [
          "Turborepo",
          "Vite",
          "React",
          "TypeScript",
          "TanStack Query",
          "Zustand",
          "React Routing",
          "Tailwind CSS",
          ".NET",
          "C#",
          "REST APIs",
          "OpenAPI/Swagger",
          "AWS"
        ],
        bullets: [
          "Client-side owner for the Transperra product: frontend technical direction, implementation and delivery across the full product lifecycle.",
          "Worked across frontend and backend, building end-to-end product functionality rather than only the UI layer.",
          "Implemented Twilio communication on both sides, including OTP flows and the messaging behind the authentication system.",
          "Developed a new backend Announcements module — APIs, business logic, persistence and AWS S3 image storage for its media.",
          "Built and integrated full-stack features, connecting React/TypeScript interfaces with .NET APIs and shared services.",
          "Multi-client healthcare platform: one codebase serving different clients through per-client configuration, workflows and data ingestion."
        ],
        stack:
          "Turborepo, Vite, React, TypeScript, TanStack Query, Zustand, Tailwind CSS, .NET, C#, REST APIs, OpenAPI/Swagger, AWS, Redis, Posthog, Twilio"
      },
      {
        id: "maccabi",
        role: "Senior Frontend Engineer",
        company: "Wotch / Maccabi",
        companyUrl: "https://www.linkedin.com/company/maccabi-health-services/",
        place: "Tel Aviv",
        start: { year: 2022, month: 12 },
        end: { year: 2025, month: 1 },
        tech: [
          "React",
          "TypeScript",
          "Zustand",
          "TanStack Query",
          "Recoil",
          "MUI",
          "Tailwind CSS",
          "Playwright",
          "React Testing Library (Vitest)",
          "Storybook",
          "MySQL",
          "Kafka",
          "RabbitMQ",
          "WebSocket",
          ".NET",
          "C#",
          "REST APIs",
          "OpenAPI/Swagger"
        ],
        bullets: [
          "Led the refactoring of roughly 70% of the production frontend, improving code quality, maintainability and performance.",
          "Replaced Recoil with Zustand and React Query, separating client state from server data.",
          "Implemented a system-wide logging mechanism giving consistent and reliable application logging.",
          "Introduced WebSocket real-time communication for instant data delivery and reactive UI updates.",
          "Built complex features on React 18, TypeScript and React Hooks, with unit and E2E tests in Vitest and Playwright.",
          "Reusable components in Storybook and Tailwind CSS; architecture decisions, code review, and mentoring juniors through onboarding."
        ],
        stack: "React 18, TypeScript, Zustand, React Query, Vitest, Playwright, Storybook, Tailwind CSS"
      },
      {
        id: "varonis",
        role: "Frontend Engineer",
        company: "GoTech / Varonis",
        companyUrl: "https://www.linkedin.com/company/varonis/",
        place: "Herzliya",
        start: { year: 2022, month: 6 },
        end: { year: 2022, month: 12 },
        tech: ["React", "TypeScript", "Zustand", "Storybook", "SCSS", "MUI", "GraphQL", "MySQL"],
        bullets: [
          "Built 5 specialised data dashboards visualising the benefit, risk, usage, cost and performance of AWS, Azure, Salesforce and Slack.",
          "Data visualisation interfaces combining interactive charts, widgets and configurable dashboard components over large volumes of data.",
          "Clear, reusable UI components that let clients monitor service usage and spot optimisation opportunities.",
          "Integrated the frontend with GraphQL APIs and MySQL-backed services."
        ],
        stack: "React, TypeScript, Zustand, Storybook, SCSS, MUI, GraphQL APIs, MySQL services"
      },
      {
        id: "exposebox",
        role: "Frontend Engineer",
        company: "GoTech / Exposebox",
        companyUrl: "https://www.linkedin.com/company/exposebox/",
        place: "Petah Tikva",
        start: { year: 2021, month: 9 },
        end: { year: 2022, month: 6 },
        tech: ["React", "TypeScript", "MobX", "Context API", "REST APIs", "MUI"],
        bullets: [
          "Worked on a SaaS platform for personalised marketing automation, aimed at highly targeted customer experiences.",
          "Dashboard panels, pop-ups, notifications and interactive flows supporting customer journey personalisation.",
          "Reusable components and application state with React, TypeScript, MobX and the Context API.",
          "Integrated with REST APIs, and worked with MUI and custom theming for a consistent product experience."
        ],
        stack: "React, TypeScript, MobX, Context API, REST, MUI with custom theming"
      },
      {
        id: "lomda",
        role: "Software Engineer",
        company: "Elpisor / Lomda",
        companyUrl: "https://www.linkedin.com/company/elpisor/",
        place: "Rehovot",
        start: { year: 2020, month: 10 },
        end: { year: 2021, month: 9 },
        tech: ["React", "Node.js", "Redux, javascript", "REST APIs"],
        bullets: [
          "International e-learning platform for remote education, with interactive lessons, debates and video conferencing.",
          "Multiple lesson types, automatic assessment, online learning workflows and custom course creation.",
          "Interactive interfaces built for personalised learning and active student participation.",
          "Worked across the frontend and the backend with React and Node.js, with application state in Redux."
        ],
        stack: "React, Node.js, Redux"
      },
      {
        id: "pillstate",
        role: "Angular Software Engineer",
        company: "Elpisor / Pillstate",
        companyUrl: "https://www.linkedin.com/company/elpisor/",
        place: "Rehovot",
        start: { year: 2020, month: 6 },
        end: { year: 2020, month: 10 },
        tech: ["Angular", "TypeScript", "RxJS", "Java", "MongoDB"],
        bullets: [
          "Web and Android solution for streamlining the distribution of medical supplies to people with disabilities.",
          "Frontend functionality and user workflows for the web platform in Angular and TypeScript.",
          "Reactive application flows and data handling with RxJS, integrated with Node.js backend services.",
          "Contributed to both web and mobile, working with Java, Android and MongoDB alongside the web stack."
        ],
        stack: "Angular, TypeScript, RxJS, Node.js, Java, MongoDB"
      }
    ]
  },
  languages: { title: "Languages", items: ["Hebrew", "English", "Russian"] },
  education: {
    title: "Education and awards",
    prev: "Previous card",
    next: "Next card",
    studiesTitle: "Education",
    studies: [
      {
        id: "telran",
        glyph: "code",
        school: "Tel-Ran Computer",
        degree: "Software engineering, frontend and backend",
        body: "A full engineering course covering client and server, from language fundamentals to shipping real applications."
      },
      {
        id: "msuce",
        glyph: "compass",
        school: "Moscow State University of Civil Engineering",
        degree: "Industrial and civil engineering, Russia",
        body: "Structural thinking, drawing, and tolerance for very large systems."
      }
    ],
    awardsTitle: "Awards",
    awards: [
      {
        id: "moscow",
        glyph: "crown",
        name: "Moscow youth art competition",
        result: "Third place",
        body: "A city-level competition, judged on original work."
      },
      {
        id: "spain",
        glyph: "brush",
        name: "International art competition, Spain",
        result: "Diploma",
        body: "Participated and was awarded a diploma."
      },
      {
        id: "theatre",
        glyph: "mask",
        name: "Theatre studio website",
        result: "Design tender won",
        body: "Competed against other submissions and delivered the winning design."
      }
    ]
  },
  recommendations: {
    title: "People who recommend me",
    lede: "Ask them directly — each card links to LinkedIn.",
    cta: "View on LinkedIn",
    items: [
      {
        id: "manager",
        initials: "SL",
        role: "VP R&D, Wotch",
        relation: "Worked together on Maccabi and Transperra",
        url: "https://www.linkedin.com/in/sagi-levanon/"
      },
      {
        id: "head",
        initials: "TA",
        role: "Head of Pod, Wotch",
        relation: "Worked together on Maccabi and Transperra",
        url: "https://www.linkedin.com/in/tamaramir/"
      },
      {
        id: "lead-v",
        initials: "OS",
        role: "Lead of Frontend, Varonis",
        relation: "Worked together on Varonis",
        url: "https://www.linkedin.com/in/ori-swid-a53248210/"
      },
      {
        id: "lead-g",
        initials: "RZ",
        role: "Head of Team, GoTech",
        relation: "Worked together on GoTech",
        url: "https://www.linkedin.com/in/raz-mantzur/"
      }
    ]
  },
  contact: {
    title: "Contact me",
    lede: "Leave your details and I will get back to you.",
    submit: "Save",
    sending: "Sending",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autocomplete: "name" },
      { name: "company", label: "Company", type: "text", required: true, autocomplete: "organization" },
      {
        name: "phone",
        label: "Phone for callback",
        type: "tel",
        required: true,
        inputmode: "tel",
        autocomplete: "tel"
      },
      {
        name: "linkedin",
        label: "Your LinkedIn profile",
        type: "url",
        required: false,
        inputmode: "url",
        autocomplete: "url"
      },
      { name: "message", label: "What is this about", type: "textarea", required: true, rows: 4 }
    ],
    errors: {
      name: "Enter your first and last name, at least 2 characters.",
      company: "Enter the company you are writing from, at least 2 characters.",
      phone: "Enter a phone number we can call back on.",
      linkedin: "Paste a LinkedIn profile address, or leave this empty.",
      message: "Say what this is about, at least 10 characters."
    },
    mailtoNotice: "Opening your mail app with what you filled in.",
    mailtoSubject: "Message from your CV page",
    success: "Got it — I will get back to you. The email below works as a backup: alinahom@me.com.",
    failure: "Sending failed and nothing was lost — everything you typed is still here. Send it by email instead:",
    failureLink: "Open the mail app"
  },
  faq: {
    title: "Questions people ask me",
    items: [
      {
        q: "What kind of role are you looking for?",
        a: "A senior frontend or full-stack role, where I focus on the client-side architecture and can keep working close to the backend. Product teams that ship often suit me best."
      },
      {
        q: "What are you strongest at?",
        a: "Client-side architecture in React and TypeScript, untangling legacy code, and raising the quality bar through code review."
      },
      {
        q: "Have you led people?",
        a: "I mentor junior engineers through onboarding and their first tasks, coordinate technical work across multiple teams, and have established client-side AI architecture standards used across the company."
      },
      {
        q: "What kind of company or team are you looking for?",
        a: "A team where I can contribute technically, take ownership of meaningful features, work alongside experienced engineers, and keep growing while having an impact on the product."
      },
      {
        q: "Which areas or locations are you considering?",
        a: "I am based in Hadera and open to opportunities in the Haifa and northern area, and in the Tel Aviv and central area."
      },
      {
        q: "Are you open to hybrid or remote work?",
        a: "I am open to a hybrid format. I am comfortable working both from the office and remotely, and I have experience collaborating effectively in both."
      },
      {
        q: "Are you looking for a full-time or part-time position?",
        a: "I am currently looking for a full-time position."
      },
      {
        q: "When are you available to start?",
        a: "I would be available to start after my notice period."
      },
      {
        q: "Are you open to working with international teams?",
        a: "Yes. I am comfortable working with international and distributed teams, and communicating across time zones when needed."
      },
      {
        q: "Which languages do you work in?",
        a: "Hebrew, English and Russian, all comfortably in a working environment."
      },
      { q: "How do I reach you?", a: "Use the form above, or call (058) 442-2701. I usually answer within a day." }
    ]
  },
  contacts: {
    title: "Let's talk",
    copied: "Copied",
    call: "Call",
    mail: "Mail",
    profile: "Open profile",
    qr: "QR code for the LinkedIn profile",
    items: [
      { kind: "phone", label: "Phone", value: "(058) 442-2701", href: "tel:+972584422701" },
      { kind: "email", label: "Email", value: "alinahom@me.com", href: "mailto:alinahom@me.com" },
      {
        kind: "linkedin",
        label: "LinkedIn",
        value: "My LinkedIn",
        href: "https://www.linkedin.com/in/alina-khomenker-0a2532137/"
      },
      { kind: "place", label: "Location", value: "Hadera, Israel", href: "" }
    ]
  },
  closing: { thanks: "Thank you for your time", references: "References available on request" }
};
