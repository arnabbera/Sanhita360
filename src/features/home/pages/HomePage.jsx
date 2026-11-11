import Header from "../components/Header";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import WhyChooseUs from "../components/WhyChooseUs";
import LearningSection from "../components/LearningSection";
import LatestUpdates from "../components/LatestUpdates";
import VideosSection from "../components/VideosSection";
import LatestPosts from "../components/LatestPosts";
import FAQ from "../components/FAQ";
import ContactCTA from "../components/ContactCTA";
import Footer from "../components/Footer";

import SEO from "../../../shared/seo/SEO";

import {
  HOME_SEO,
  SEO_CONFIG,
} from "../../../constants/seoConfig";

// =========================================================
// HOMEPAGE STRUCTURED DATA
// =========================================================

const homepageStructuredData = {
  "@context":
    "https://schema.org",

  "@graph": [
    {
      "@type":
        "EducationalOrganization",

      "@id":
        `${SEO_CONFIG.siteUrl}/#organization`,

      name:
        "Sanhita360",

      url:
        `${SEO_CONFIG.siteUrl}/`,

      description:
        "Sanhita360 provides LL.B courses, law notes, study materials, mock tests, legal awareness resources and certification preparation.",

      areaServed: {
        "@type":
          "Country",

        name:
          "India",
      },

      knowsAbout: [
        "LL.B",
        "Legal Education",
        "Law of Torts",
        "Constitutional Law",
        "Family Law",
        "Contract Law",
        "Consumer Protection Law",
        "Motor Vehicles Law",
        "Law Notes",
        "Law Mock Tests",
      ],
    },

    {
      "@type":
        "WebSite",

      "@id":
        `${SEO_CONFIG.siteUrl}/#website`,

      url:
        `${SEO_CONFIG.siteUrl}/`,

      name:
        "Sanhita360",

      publisher: {
        "@id":
          `${SEO_CONFIG.siteUrl}/#organization`,
      },

      inLanguage:
        "en-IN",
    },

    {
      "@type":
        "WebPage",

      "@id":
        `${SEO_CONFIG.siteUrl}/#webpage`,

      url:
        `${SEO_CONFIG.siteUrl}/`,

      name:
        "Sanhita360 - LL.B Courses, Law Notes, Study Materials & Mock Tests",

      description:
        HOME_SEO.description,

      isPartOf: {
        "@id":
          `${SEO_CONFIG.siteUrl}/#website`,
      },

      about: {
        "@id":
          `${SEO_CONFIG.siteUrl}/#organization`,
      },

      inLanguage:
        "en-IN",
    },
  ],
};

// =========================================================
// HOMEPAGE
// =========================================================

const HomePage = () => {
  return (
    <>
      <SEO
        title={
          HOME_SEO.title
        }
        description={
          HOME_SEO.description
        }
        keywords={
          HOME_SEO.keywords
        }
        canonical={
          HOME_SEO.canonical
        }
        structuredData={
          homepageStructuredData
        }
      />

      <Header />

      <main>
        <Hero />

        <LearningSection />

        <WhyChooseUs />

        <ServicesSection />

        <LatestUpdates />

        <VideosSection />

        <LatestPosts />


        <FAQ />

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
