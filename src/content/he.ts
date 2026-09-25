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
    tagline: "מעל 6 שנות ניסיון, עם התמחות בפרונטאנד"
  },
  ui: {
    skip: "דילוג לתוכן",
    menu: "תפריט",
    loading: "טוען",
    close: "סגירה",
    present: "כיום",
    rating: "{label}: {rating} מתוך 5"
  },
  opening: { write: "כתבו לי", download: "הורדת קורות חיים" },
  summary: {
    title: "תקציר",
    share: "80%",
    blocks: [
      {
        id: "craft",
        text: "Senior Full-Stack Engineer עם למעלה מ-6 שנות ניסיון בבניית אפליקציות Web בעלות ביצועים גבוהים ב-React וב-TypeScript, לצד פיתוח Backend מעשי ב-.NET / C# וב-Node.js."
      },
      {
        id: "impact",
        text: "מובילה טכנית: סוקרת כ-80% מה-Client-Side Pull Requests בחברה, הובילה Refactoring של כ-70% מה-Frontend בפרודקשן ואחראית על מוצרי Greenfield מקצה לקצה."
      },
      {
        id: "ai",
        text: "עובדת לפי ה-Agentic Development Lifecycle (ADLC): בנתה Claude Skills ו-Rules ייעודיים ל-Loop Engineering, Analytics, Performance Review ו-Security Guards מבוססי Compliance, וקבעה סטנדרטים לפיתוח Client-Side בעזרת AI ברמת החברה."
      },
      {
        id: "lead",
        text: "בעלת ניסיון בניהול פרויקטים במקביל ובחניכת מפתחים ג'וניורים."
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
        label: "בקאנד ו-APIs",
        items: [".NET", "C#", "Node.js", "REST APIs", "GraphQL", "Python", "Java", "SQL", "OpenAPI/Swagger", "Postman"]
      },
      {
        id: "cloud",
        label: "ענן ונתונים",
        items: ["Azure", "AWS", "Docker", "CI/CD", "MySQL", "PostgreSQL", "MongoDB", "Redis"]
      },
      {
        id: "testing",
        label: "בדיקות ואיכות",
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
        label: "בינה מלאכותית, ארכיטקטורה וכלים",
        items: [
          "ADLC System",
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
          "אחראית צד הלקוח של מוצר Transperra: הכיוון הטכנולוגי של הפרונטאנד, המימוש והאספקה לאורך כל מחזור חיי המוצר.",
          "עבודה בצד הלקוח ובצד השרת ובניית פונקציונליות מקצה לקצה, ולא רק שכבת ה-UI.",
          "מימוש תקשורת Twilio בשני הצדדים, כולל תהליכי OTP וההודעות שמאחורי מערכת האימות.",
          "פיתוח מודול Announcements חדש בצד השרת — API, לוגיקה עסקית, שמירת נתונים ואחסון תמונות ב-AWS S3.",
          "בניית פיצ'רים פול-סטאק שמחברים ממשקי React/TypeScript ל-API ב-.NET ולשירותים משותפים.",
          "פלטפורמת בריאות מרובת לקוחות: בסיס קוד אחד שמשרת לקוחות שונים דרך הגדרות, תהליכים וקליטת נתונים לכל לקוח."
        ],
        stack:
          "React, TypeScript, Vite, TanStack Query, Zustand, Tailwind CSS, .NET 10, ASP.NET Core, REST APIs, OpenAPI, generated TypeScript API clients"
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
          "Tailwind CSS",
          "Playwright",
          "React Testing Library (Vitest)",
          "Storybook",
          "Code review"
        ],
        bullets: [
          "הובלת ריפקטורינג של כ-70% מהפרונטאנד בייצור, ושיפור איכות הקוד, תחזוקתיות וביצועים.",
          "החלפת Recoil ב-Zustand וב-React Query, והפרדת מצב הלקוח מנתוני השרת.",
          "מימוש מנגנון לוגים מערכתי שמספק תיעוד עקבי ואמין של האפליקציה.",
          "הכנסת תקשורת זמן אמת ב-WebSocket, לאספקת נתונים מיידית ולעדכוני ממשק ריאקטיביים.",
          "פיתוח פיצ'רים מורכבים ב-React 18, ב-TypeScript וב-React Hooks, עם בדיקות יחידה ובדיקות E2E ב-Vitest וב-Playwright.",
          "קומפוננטות לשימוש חוזר ב-Storybook וב-Tailwind CSS; החלטות ארכיטקטורה, code review וחניכת מפתחים צעירים בקליטה."
        ],
        stack: "React 18, TypeScript, Zustand, React Query, Vitest, Playwright, Storybook, Tailwind CSS"
      },
      {
        id: "varonis",
        role: "מהנדסת פרונטאנד",
        company: "GoTech / Varonis",
        companyUrl: "https://www.linkedin.com/company/varonis/",
        place: "הרצליה",
        start: { year: 2022, month: 6 },
        end: { year: 2022, month: 12 },
        tech: ["React", "TypeScript", "Zustand", "Storybook", "SCSS", "MUI", "GraphQL", "MySQL"],
        bullets: [
          "בניית 5 דשבורדים ייעודיים שמציגים תועלת, סיכון, שימוש, עלות וביצועים של AWS, Azure, Salesforce ו-Slack.",
          "ממשקי הצגת נתונים שמשלבים גרפים אינטראקטיביים, ווידג'טים ורכיבי דשבורד הניתנים להגדרה, מעל כמויות נתונים גדולות.",
          "קומפוננטות ברורות לשימוש חוזר, שמאפשרות ללקוחות לעקוב אחרי השימוש בשירותים ולזהות הזדמנויות לייעול.",
          "חיבור הפרונטאנד ל-GraphQL APIs ולשירותים מבוססי MySQL."
        ],
        stack: "React, TypeScript, Zustand, Storybook, SCSS, MUI, GraphQL APIs, MySQL services"
      },
      {
        id: "exposebox",
        role: "מהנדסת פרונטאנד",
        company: "GoTech / Exposebox",
        companyUrl: "https://www.linkedin.com/company/exposebox/",
        place: "פתח תקווה",
        start: { year: 2021, month: 9 },
        end: { year: 2022, month: 6 },
        tech: ["React", "TypeScript", "MobX", "Context API", "REST APIs", "MUI"],
        bullets: [
          "פיתוח פלטפורמת SaaS לאוטומציית שיווק מותאם אישית, שנועדה לחוויות לקוח ממוקדות.",
          "פאנלים בדשבורד, חלונות קופצים, התראות ותהליכים אינטראקטיביים לניהול מסעות לקוח מותאמים.",
          "קומפוננטות לשימוש חוזר וניהול מצב ב-React, ב-TypeScript, ב-MobX וב-Context API.",
          "חיבור ל-REST APIs, ועבודה עם MUI וערכת נושא מותאמת לשמירה על חוויית מוצר אחידה."
        ],
        stack: "React, TypeScript, MobX, Context API, REST, MUI עם ערכת נושא מותאמת"
      },
      {
        id: "lomda",
        role: "מהנדסת תוכנה",
        company: "Elpisor / Lomda",
        companyUrl: "https://www.linkedin.com/company/elpisor/",
        place: "רחובות",
        start: { year: 2020, month: 10 },
        end: { year: 2021, month: 9 },
        tech: ["React", "Node.js", "Redux"],
        bullets: [
          "פלטפורמת למידה מקוונת בינלאומית ללמידה מרחוק, עם שיעורים אינטראקטיביים, דיונים ווידאו.",
          "סוגי שיעור מרובים, הערכה אוטומטית, תהליכי למידה מקוונים ובניית קורסים מותאמים.",
          "ממשקים אינטראקטיביים שנבנו ללמידה מותאמת אישית ולהשתתפות פעילה של התלמידים.",
          "עבודה בצד הלקוח ובצד השרת ב-React וב-Node.js, עם ניהול מצב ב-Redux."
        ],
        stack: "React, Node.js, Redux"
      },
      {
        id: "pillstate",
        role: "מהנדסת תוכנה Angular",
        company: "Elpisor / Pillstate",
        companyUrl: "https://www.linkedin.com/company/elpisor/",
        place: "רחובות",
        start: { year: 2020, month: 6 },
        end: { year: 2020, month: 10 },
        tech: ["Angular", "TypeScript", "RxJS", "Node.js", "Java", "MongoDB"],
        bullets: [
          "פתרון ווב ואנדרואיד לייעול חלוקת ציוד רפואי לאנשים עם מוגבלות.",
          "פיתוח פונקציונליות ותהליכי משתמש בפלטפורמת הווב ב-Angular וב-TypeScript.",
          "תהליכים ריאקטיביים וטיפול בנתונים ב-RxJS, בחיבור לשירותי Node.js בצד השרת.",
          "עבודה גם בווב וגם במובייל, עם Java, אנדרואיד ו-MongoDB לצד סטאק הווב."
        ],
        stack: "Angular, TypeScript, RxJS, Node.js, Java, MongoDB"
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
      { kind: "place", label: "מיקום", value: "חדרה, ישראל", href: "" }
    ]
  },
  closing: { thanks: "תודה על הזמן", references: "המלצות יינתנו לפי בקשה" }
};
