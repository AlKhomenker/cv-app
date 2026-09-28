import type { LocaleContent } from "./types";

/**
 * Hebrew. Reads right to left — see `dir` in `content/index.ts` — and keeps
 * technology names, dates, the phone number, the email and the LinkedIn URL
 * in Latin script, which the components wrap in `dir="ltr"`.
 */
export const he: LocaleContent = {
  docTitle: "אלינה חומנקר — מהנדסת פול-סטאק בכירה",
  toggle: { glyph: "EN", label: "Switch to English" },
  theme: { toLight: "מעבר לערכה הבהירה", toDark: "מעבר לערכה הכהה" },
  sections: {
    opening: "פתיחה",
    summary: "תקציר",
    experience: "ניסיון",
    skills: "כישורים",
    education: "השכלה",
    strengths: "חוזקות",
    recommendations: "ממליצים",
    faq: "שאלות",
    contacts: "יצירת קשר",
    closing: "סיום"
  },
  person: {
    name: "אלינה חומנקר",
    role: "מהנדסת פול-סטאק בכירה",
    tagline: "7 שנות ניסיון, עם התמחות בפרונטאנד"
  },
  ui: {
    skip: "דילוג לתוכן",
    menu: "תפריט",
    loading: "טוען",
    close: "סגירה",
    present: "כיום",
    rating: "{label}: {rating} מתוך 5"
  },
  siteQr: { open: "הצגת קוד QR לדף הזה", code: "קוד QR לדף הזה" },
  opening: { write: "כתבו לי", download: "הורדת קורות חיים" },
  summary: {
    title: "תקציר",
    share: "80%",
    blocks: [
      {
        id: "craft",
        text: "[[Senior Full-Stack Engineer]] עם התמחות בפרונטאנד ו-7 שנות ניסיון בבניית אפליקציות Web בעלות ביצועים גבוהים ב-React וב-TypeScript, לצד פיתוח פול-סטאק ב-[[.NET / C#]] וב-[[Node.js]]."
      },
      {
        id: "impact",
        text: "אחראית צד הלקוח בפלטפורמת בריאות מרובת לקוחות. סוקרת כ-{share} מה-Pull Requests בצד הלקוח בחברה, והובילה Refactoring של כ-[[70%]] מה-Frontend בפרודקשן."
      },
      {
        id: "ai",
        text: "פיתחה Rules, Skills ו-Plugins ל-Claude בהתאם לסטנדרטים של החברה, שהביאו כ-[[80%]] מבסיס הקוד לסטנדרטי האיכות של החברה, האיצו את אספקת הפיצ'רים, שיפרו את שקיפות התהליכים ואת כיסוי הבדיקות, והפכו את אימוץ ה-AI ליציב ובטוח."
      },
      {
        id: "lead",
        text: "חונכת מפתחים ג'וניורים, מובילה תכנון טכני ומנהלת פרויקטים במקביל, מהחלטות ארכיטקטורה ועד אספקה."
      }
    ]
  },
  skills: {
    title: "כישורים",
    filter: {
      label: "סינון כישורים",
      chosen: "{count} נבחרו",
      empty: "אין כלי בשם הזה",
      clear: "ניקוי"
    },
    groups: [
      {
        id: "frontend",
        label: "פרונטאנד",
        items: [
          "React 19",
          "TypeScript",
          "JavaScript",
          "Next.js",
          "Vite",
          "Zustand",
          "TanStack Query",
          "Redux Toolkit",
          "MobX",
          "RxJS",
          "React Hook Form",
          "Zod",
          "React Router",
          "Ky",
          "Orval",
          "Angular",
          "Tailwind CSS",
          "SCSS",
          "MUI",
          "HTML",
          "CSS"
        ]
      },
      {
        id: "backend",
        label: "בקאנד ו-APIs",
        items: [
          ".NET",
          "C#",
          "ASP.NET Core",
          "Node.js",
          "REST APIs",
          "GraphQL",
          "Modular Monolith",
          "Temporal",
          "Kafka",
          "WebSocket",
          "Server-Sent Events (SSE)",
          "OpenAPI / Swagger",
          "Python",
          "Java Spring"
        ]
      },
      {
        id: "cloud",
        label: "ענן ומסדי נתונים",
        items: ["AWS S3", "Docker", "CI/CD", "PostgreSQL", "MongoDB", "Redis"]
      },
      {
        id: "testing",
        label: "בדיקות",
        items: ["Playwright", "Storybook", "Vitest", "Unit testing", "Integration testing", "E2E testing"]
      },
      {
        id: "craft",
        label: "בינה מלאכותית, ארכיטקטורה ומוצר",
        items: [
          "Claude",
          "MCP",
          "Custom Claude skills, rules and plugins",
          "AI agents",
          "Agentic workflows",
          "System prompts",
          "AI code governance",
          "Performance optimization",
          "Clean Architecture",
          "SOLID",
          "Design patterns",
          "Code review",
          "Technical debt reduction",
          "Git",
          "GitHub",
          "Jira",
          "Confluence",
          "Figma",
          "Design systems",
          "UI Kit",
          "Component-driven development",
          "Accessibility",
          "Product thinking"
        ]
      }
    ]
  },
  strengths: {
    title: "חוזקות",
    items: [
      { label: "עמידות בלחץ", rating: 5 },
      { label: "תקשורת בין-אישית", rating: 5 },
      { label: "אחריות ובעלות", rating: 5 },
      { label: "חניכה ושיתוף ידע", rating: 5 },
      { label: "Code review ותשומת לב לפרטים", rating: 5 },
      { label: "למידה מהירה", rating: 4 },
      { label: "ניהול פרויקטים במקביל", rating: 4 }
    ]
  },
  experience: {
    title: "ניסיון",
    stackLabel: "טכנולוגיות",
    open: "הצג עוד",
    companyLink: "{company} בלינקדאין",
    items: [
      {
        id: "transperra",
        role: "מהנדסת פול-סטאק בכירה, אחראית צד הלקוח",
        company: "Wotch / Transperra",
        companyUrl: "https://www.linkedin.com/company/wotch-health/",
        place: "תל אביב",
        start: { year: 2025, month: 1 },
        end: null,
        tech: [
          "React 19",
          "TypeScript",
          "Vite",
          "TanStack Query",
          "Zustand",
          "Tailwind CSS",
          ".NET",
          "C#",
          "ASP.NET Core",
          "Temporal",
          "Kafka",
          "Redis",
          "Server-Sent Events (SSE)",
          "OpenAPI / Swagger",
          "AWS S3",
          "Claude",
          "MCP"
        ],
        bullets: [
          "אחריות על הארכיטקטורה והאספקה בצד הלקוח של פלטפורמת בריאות שבה בסיס קוד אחד משרת כמה לקוחות, דרך הגדרות, תהליכים וקליטת נתונים לכל לקוח.",
          "פיתוח Rules, Skills ו-Plugins ל-Claude בהתאם לסטנדרטים של החברה לאיכות קוד, בדיקות, סקירת ביצועים, אנליטיקה ואבטחה מבוססת Compliance; הבאת כ-80% מבסיס הקוד לסטנדרטים של החברה, האצת אספקת פיצ'רים חדשים ושיפור שקיפות התהליכים וכיסוי הבדיקות.",
          "הגדרת סטנדרטים לפיתוח צד לקוח בעזרת AI ברמת החברה, כולל הגדרות MCP, Skills, Plugins והגדרות Agents, כך שאימוץ ה-AI יציב ובטוח; סקירה ואימות של קוד שנכתב על ידי AI.",
          "סקירת כ-80% מה-Pull Requests בצד הלקוח בחברה.",
          "אספקת פיצ'רים מקצה לקצה שמחברים ממשקי React 19 / TypeScript ל-REST APIs ב-.NET 10 / ASP.NET Core, עם TypeScript clients שנוצרים מ-OpenAPI.",
          "פיתוח פיצ'רים ב-Modular Monolith ב-.NET, עם Temporal workflows לתהליכים ארוכים, Kafka להזרמת אירועים ו-Redis ל-caching.",
          "בניית עדכוני UI בזמן אמת עם Server-Sent Events (SSE) ו-polling.",
          "מימוש אימות OTP מבוסס Twilio ותהליכי תקשורת עם משתמשים, בצד הלקוח ובצד השרת.",
          "בניית מודול Announcements בצד השרת: REST APIs, לוגיקה עסקית, שמירת נתונים ואחסון מדיה ב-AWS S3."
        ],
        stack:
          "React 19, TypeScript, Vite, TanStack Query, Zustand, Tailwind CSS, .NET 10, C#, ASP.NET Core, REST APIs, OpenAPI, Temporal, Kafka, Redis, SSE, AWS S3, Twilio, Claude, MCP"
      },
      {
        id: "maccabi",
        role: "מהנדסת פרונטאנד בכירה",
        company: "Wotch / Maccabi",
        companyUrl: "https://www.linkedin.com/company/maccabi-health-services/",
        place: "תל אביב",
        start: { year: 2022, month: 12 },
        end: { year: 2025, month: 1 },
        tech: [
          "React",
          "TypeScript",
          "Zustand",
          "TanStack Query",
          "Recoil",
          "WebSocket",
          "Tailwind CSS",
          "Storybook",
          "Vitest",
          "Playwright"
        ],
        bullets: [
          "הובלת Refactoring של כ-70% מהפרונטאנד בפרודקשן, ושיפור איכות הקוד, התחזוקתיות והביצועים.",
          "החלפת Recoil ב-Zustand וב-TanStack Query, והפרדת מצב הלקוח מנתוני השרת.",
          "הכנסת תקשורת זמן אמת ב-WebSocket ומנגנון לוגים מערכתי.",
          "הקמת בדיקות יחידה ובדיקות E2E ב-Vitest וב-Playwright; בניית UI Kit לשימוש חוזר ב-Storybook וב-Tailwind CSS.",
          "חניכת מפתחים ג'וניורים, קבלת החלטות ארכיטקטורה, code review והובלת תכנון טכני."
        ],
        stack: "React, TypeScript, Zustand, TanStack Query, WebSocket, Vitest, Playwright, Storybook, Tailwind CSS"
      },
      {
        id: "varonis",
        role: "מהנדסת פרונטאנד",
        company: "GoTech / Varonis",
        companyUrl: "https://www.linkedin.com/company/varonis/",
        place: "הרצליה",
        start: { year: 2022, month: 6 },
        end: { year: 2022, month: 12 },
        tech: ["React", "TypeScript", "Zustand", "GraphQL", "SCSS", "MUI", "D3", "Python"],
        bullets: [
          "בניית דשבורדים מותאמים לשימוש חוזר שמציגים שימוש, עלות, סיכון וביצועים של שירותי AWS, Azure, Salesforce ו-Slack.",
          "בניית מערכת הגרפים ב-D3, על React, TypeScript, Zustand, GraphQL, SCSS ו-MUI, עם Python בצד הנתונים."
        ],
        stack: "React, TypeScript, Zustand, GraphQL, SCSS, MUI, D3, Python"
      },
      {
        id: "exposebox",
        role: "מהנדסת פרונטאנד",
        company: "GoTech / Exposebox",
        companyUrl: "https://www.linkedin.com/company/exposebox/",
        place: "פתח תקווה",
        start: { year: 2021, month: 9 },
        end: { year: 2022, month: 6 },
        tech: ["React", "TypeScript", "MobX", "REST APIs", "MUI", "PostgreSQL", "Java"],
        bullets: [
          "פיתוח דשבורדים, חלונות קופצים, התראות ותהליכים אינטראקטיביים לפלטפורמת SaaS לאוטומציית שיווק, ב-React, TypeScript, MobX, REST APIs, PostgreSQL ו-Java.",
          "תכנון מערכות דשבורד לשימוש חוזר עם ערכת נושא מותאמת ב-MUI, לחוויית מוצר אחידה."
        ],
        stack: "React, TypeScript, MobX, REST APIs, MUI עם ערכת נושא מותאמת, PostgreSQL, Java"
      },
      {
        id: "lomda",
        role: "מהנדסת תוכנה",
        company: "Elpisor / Lomda",
        companyUrl: "https://www.linkedin.com/company/elpisor/",
        place: "רחובות",
        start: { year: 2020, month: 10 },
        end: { year: 2021, month: 9 },
        tech: ["React", "Redux", "MUI", "MySQL", "Node.js"],
        bullets: [
          "בניית פלטפורמת למידה מקוונת בינלאומית עם שיעורים אינטראקטיביים, הערכה אוטומטית, שיחות וידאו ובניית קורסים, ב-React, Redux, MUI, MySQL ו-Node.js."
        ],
        stack: "React, Redux, MUI, MySQL, Node.js"
      },
      {
        id: "pillstate",
        role: "מהנדסת תוכנה",
        company: "Elpisor / Pillstate",
        companyUrl: "https://www.linkedin.com/company/elpisor/",
        place: "רחובות",
        start: { year: 2020, month: 6 },
        end: { year: 2020, month: 10 },
        tech: ["Angular", "TypeScript", "RxJS", "Node.js", "MongoDB"],
        bullets: ["פיתוח תהליכי Web לפלטפורמת הפצת ציוד רפואי, ב-Angular, TypeScript, RxJS, Node.js ו-MongoDB."],
        stack: "Angular, TypeScript, RxJS, Node.js, MongoDB"
      }
    ]
  },
  languages: { title: "שפות", items: ["עברית", "אנגלית", "רוסית"] },
  education: {
    title: "השכלה ופרסים",
    prev: "הכרטיס הקודם",
    next: "הכרטיס הבא",
    studiesTitle: "השכלה",
    studies: [
      {
        id: "telran",
        glyph: "code",
        school: "Tel-Ran Computer",
        degree: "הנדסת תוכנה — פרונטאנד ובקאנד",
        body: "קורס הנדסי מלא שמכסה צד לקוח וצד שרת, מיסודות השפה ועד אספקת אפליקציות אמיתיות."
      },
      {
        id: "msuce",
        glyph: "compass",
        school: "האוניברסיטה הממלכתית להנדסה אזרחית, מוסקבה",
        degree: "הנדסה תעשייתית ואזרחית, רוסיה",
        body: "חשיבה מבנית, שרטוט, ועמידות מול מערכות גדולות מאוד."
      }
    ],
    awardsTitle: "פרסים",
    awards: [
      {
        id: "moscow",
        glyph: "crown",
        name: "תחרות האמנות לנוער במוסקבה",
        result: "מקום שלישי",
        body: "תחרות ברמה העירונית, שנשפטה על עבודה מקורית."
      },
      {
        id: "spain",
        glyph: "brush",
        name: "תחרות אמנות בינלאומית, ספרד",
        result: "תעודת הצטיינות",
        body: "השתתפות בתחרות וקבלת תעודת הצטיינות."
      },
      {
        id: "theatre",
        glyph: "mask",
        name: "אתר לסטודיו תיאטרון",
        result: "זכייה במכרז העיצוב",
        body: "התמודדות מול הגשות אחרות ואספקת העיצוב הזוכה."
      }
    ]
  },
  recommendations: {
    title: "ממליצים עליי",
    lede: "אפשר לשאול אותם ישירות — כל כרטיס מקשר ל-LinkedIn.",
    cta: "צפייה ב-LinkedIn",
    items: [
      {
        id: "manager",
        initials: "NS",
        role: "מנהל פיתוח, Wotch",
        relation: "עבדנו יחד על Transperra",
        url: "https://www.linkedin.com/in/"
      },
      {
        id: "frontend",
        initials: "NS",
        role: "מהנדס פרונטאנד בכיר, Wotch / Maccabi",
        relation: "עשינו code review משותף",
        url: "https://www.linkedin.com/in/"
      },
      {
        id: "product",
        initials: "NS",
        role: "מנהל מוצר, GoTech / Varonis",
        relation: "בנינו יחד את הדשבורדים",
        url: "https://www.linkedin.com/in/"
      },
      {
        id: "cto",
        initials: "NS",
        role: "CTO, Exposebox",
        relation: "",
        url: "https://www.linkedin.com/in/"
      }
    ]
  },
  contact: {
    title: "כתבו לי",
    lede: "השאירו פרטים ואחזור אליכם.",
    submit: "שמירה",
    sending: "שולחת",
    fields: [
      { name: "name", label: "שם מלא", type: "text", required: true, autocomplete: "name" },
      { name: "company", label: "חברה", type: "text", required: true, autocomplete: "organization" },
      { name: "phone", label: "טלפון לחזרה", type: "tel", required: true, inputmode: "tel", autocomplete: "tel" },
      {
        name: "linkedin",
        label: "פרופיל הלינקדאין שלכם",
        type: "url",
        required: false,
        inputmode: "url",
        autocomplete: "url"
      },
      { name: "message", label: "במה מדובר", type: "textarea", required: true, rows: 4 }
    ],
    errors: {
      name: "כתבו שם פרטי ושם משפחה, לפחות שני תווים.",
      company: "כתבו מאיזו חברה אתם פונים, לפחות שני תווים.",
      phone: "כתבו מספר טלפון שאפשר לחזור אליו.",
      linkedin: "הדביקו כתובת של פרופיל לינקדאין, או השאירו ריק.",
      message: "כתבו במה מדובר, לפחות 10 תווים."
    },
    mailtoNotice: "פותחת את אפליקציית המייל עם מה שמילאתם.",
    mailtoSubject: "פנייה מדף קורות החיים",
    success: "קיבלתי — אחזור אליכם. הכתובת alinahom@me.com עובדת כגיבוי.",
    failure: "השליחה נכשלה, ושום דבר לא אבד — כל מה שכתבתם נשאר כאן. אפשר לשלוח אותו במייל:",
    failureLink: "פתיחת אפליקציית המייל"
  },
  faq: {
    title: "שאלות ששואלים אותי",
    items: [
      {
        q: "איזה תפקיד את מחפשת?",
        a: "תפקיד פרונטאנד או פול-סטאק בכיר שבו אני אחראית על ארכיטקטורת צד הלקוח וממשיכה לעבוד קרוב לבקאנד. הכי מתאימים לי צוותי מוצר שמשחררים גרסאות לעיתים קרובות."
      },
      {
        q: "במה את הכי חזקה?",
        a: "ארכיטקטורת צד לקוח ב-React וב-TypeScript, פירוק קוד ישן והעלאת רף האיכות דרך code review. אני עוברת על כ-80% מבקשות המיזוג בצד הלקוח בחברה."
      },
      {
        q: "הובלת אנשים?",
        a: "אני מלווה מפתחים בתחילת דרכם בתהליך הקליטה ובמשימות הראשונות שלהם, מתאמת משימות טכניות בין מספר צוותים, והגדרתי סטנדרטים ארכיטקטוניים לשימוש ב-AI בצד הלקוח, שמשמשים ברחבי החברה."
      },
      {
        q: "איזו חברה או איזה צוות את מחפשת?",
        a: "צוות שבו אוכל לתרום מקצועית, לקחת אחריות על פיצ'רים משמעותיים, לעבוד לצד מפתחים מנוסים ולהמשיך להתפתח תוך השפעה על המוצר."
      },
      {
        q: "אילו אזורים רלוונטיים עבורך?",
        a: "אני גרה בחדרה ופתוחה להצעות באזור חיפה והצפון וגם באזור תל אביב והמרכז."
      },
      {
        q: "את פתוחה לעבודה היברידית או מרחוק?",
        a: "אני פתוחה לפורמט היברידי. נוח לי לעבוד גם מהמשרד וגם מרחוק, ויש לי ניסיון בשיתוף פעולה יעיל בשתי הצורות."
      },
      { q: "את מחפשת משרה מלאה או חלקית?", a: "כרגע אני מחפשת משרה מלאה." },
      { q: "מתי תוכלי להתחיל?", a: "אוכל להתחיל בתום תקופת ההודעה המוקדמת." },
      {
        q: "את פתוחה לעבודה עם צוותים בינלאומיים?",
        a: "כן. נוח לי לעבוד עם צוותים בינלאומיים ומבוזרים ולתקשר בין אזורי זמן שונים לפי הצורך."
      },
      { q: "איך יוצרים איתך קשר?", a: "דרך הטופס שלמעלה, או בטלפון (058) 442-2701. בדרך כלל אני עונה תוך יום." }
    ]
  },
  contacts: {
    title: "בואו נדבר",
    copied: "הועתק",
    call: "חיוג",
    mail: "מייל",
    profile: "פתיחת הפרופיל",
    qr: "קוד QR לפרופיל הלינקדאין",
    items: [
      { kind: "phone", label: "טלפון", value: "(058) 442-2701", href: "tel:+972584422701" },
      { kind: "email", label: "אימייל", value: "alinahom@me.com", href: "mailto:alinahom@me.com" },
      {
        kind: "linkedin",
        label: "LinkedIn",
        value: "הלינקדאין שלי",
        href: "https://www.linkedin.com/in/alina-khomenker-0a2532137/"
      },
      {
        kind: "behance",
        label: "Behance",
        value: "תיק העבודות שלי בעיצוב",
        href: "https://www.behance.net/alinakhomenker"
      },
      { kind: "place", label: "מיקום", value: "חדרה, ישראל", href: "" }
    ]
  },
  closing: { thanks: "תודה על הזמן", references: "המלצות יינתנו לפי בקשה" }
};
