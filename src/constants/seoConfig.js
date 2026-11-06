// =========================================================
// SANHITA360 SEO CONFIGURATION
// =========================================================
//
// Central SEO configuration.
//
// Public pages should reuse these values instead of
// hardcoding Sanhita360 branding repeatedly.
//
// =========================================================

export const SEO_CONFIG = Object.freeze({
  siteName:
    "Sanhita360",

  siteUrl:
    "https://www.sanhita360.com",

  locale:
    "en_IN",

  language:
    "en-IN",

  defaultTitle:
    "Sanhita360 | LL.B Courses, Law Notes, Study Materials & Mock Tests",

  titleTemplate:
    "%s | Sanhita360",

  defaultDescription:
    "Sanhita360 provides LL.B learning, chapter-wise law notes, law study materials, legal topics, mock tests, case law resources and certification preparation for law students.",

  defaultKeywords: [
    "LLB course",
    "LLB courses",
    "LLB study material",
    "LLB study materials",
    "law study material",
    "law study materials",
    "law notes",
    "LLB notes",
    "law mock test",
    "law mock tests",
    "LLB mock test",
    "LLB mock tests",
    "online law course",
    "legal education",
    "law exam preparation",
    "law of torts notes",
    "constitutional law notes",
    "family law notes",
    "contract law notes",
    "consumer protection law",
  ],

  organization: {
    name:
      "Sanhita360",

    type:
      "EducationalOrganization",

    id:
      "https://www.sanhita360.com/#organization",
  },

  social: {
    twitterCard:
      "summary_large_image",
  },
});

// =========================================================
// HOMEPAGE SEO
// =========================================================

export const HOME_SEO = Object.freeze({
  title:
    "LL.B Courses, Law Notes & Study Materials in India",

  description:
    "Learn law with Sanhita360. Explore online LL.B courses, chapter-wise law notes, case references, study materials and mock tests for law students in India.",

  canonical:
    "/",

  keywords: [
    "LLB courses India",
    "online LLB courses",
    "LLB study material",
    "law notes",
    "law study materials",
    "law mock test",
    "LLB mock test",
    "online law learning",
    "legal education India",
    "law exam preparation",
    "law of torts notes",
  ],
});

// =========================================================
// PRIVATE PAGE SEO
// =========================================================

export const PRIVATE_PAGE_SEO =
  Object.freeze({
    robots:
      "noindex, nofollow, noarchive",
  });

export default SEO_CONFIG;