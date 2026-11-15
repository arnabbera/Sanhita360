import {
  FaFacebookF,
  FaInstagram,
  FaLink,
  FaShareAlt,
  FaBalanceScale,
  FaBookOpen,
  FaGraduationCap,
  FaHandshake,
  FaLightbulb,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import Header from "../../../home/components/Header";
import Footer from "../../../home/components/Footer";
import SEO from "../../../../shared/seo/SEO";

const pillars = [
  {
    icon: <FaBalanceScale />,
    title: "Legal Awareness",
    description:
      "Clear information that helps citizens understand legal rights, remedies and processes.",
    details: [
      "Plain-language explanations of legal rights and responsibilities.",
      "Awareness of common legal procedures, remedies and important documents.",
      "Educational articles and updates that help citizens make informed decisions.",
    ],
  },
  {
    icon: <FaGraduationCap />,
    title: "Structured Learning",
    description:
      "Organised legal learning resources for students, supported by courses, notes and assessments.",
    details: [
      "Course-wise chapters arranged in a clear learning sequence.",
      "Study notes, chapter resources and revision-focused material.",
      "Quizzes, mock tests and assessments that support self-paced learning.",
    ],
  },
  {
    icon: <FaHandshake />,
    title: "Practical Guidance",
    description:
      "A practical starting point for identifying documents, next steps and suitable professional support.",
    details: [
      "Guidance on preparing relevant facts and supporting documents.",
      "A clearer understanding of possible next steps for common concerns.",
      "Direction towards suitable professional assistance when individual legal advice is required.",
    ],
  },
];

const values = [
  {
    icon: <FaBookOpen />,
    title: "Accessible",
    text: "Legal knowledge should be understandable and available to everyone.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Responsible",
    text: "Information is presented carefully, with respect for facts, documents and applicable law.",
  },
  {
    icon: <FaLightbulb />,
    title: "Practical",
    text: "Learning connects legal principles with real situations and useful next steps.",
  },
];

export default function AboutPage() {
  const createShareUrl = () =>
    `https://www.sanhita360.com/about?share=about-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const shareOnFacebook = () => {
    const url = createShareUrl();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer,width=650,height=550",
    );
  };

  const shareOnX = () => {
    const url = createShareUrl();
    const text = "Learn more about Sanhita360 — legal awareness, structured learning and practical guidance.";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer,width=650,height=550",
    );
  };

  const shareNative = async () => {
    const url = createShareUrl();
    const shareData = {
      title: "About Sanhita360",
      text: "Learn about Sanhita360 — legal awareness, structured legal learning and practical guidance.",
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      window.alert("Page link copied. You can paste it into Instagram or any messaging app.");
    } catch {
      window.prompt("Copy this page link:", url);
    }
  };

  const copyPageLink = async () => {
    const url = createShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      window.alert("Page link copied.");
    } catch {
      window.prompt("Copy this page link:", url);
    }
  };

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Sanhita360, a platform for legal awareness, structured legal learning and practical guidance."
        canonical="/about"
        keywords={[
          "about Sanhita360",
          "legal learning platform",
          "legal awareness India",
        ]}
      />

      <Header />

      <main className="ns-about-page">
        <section className="ns-about-hero">
          <div className="ns-about-wrap ns-about-hero-grid">
            <div className="ns-about-hero-copy">
              <p className="ns-about-eyebrow">About Sanhita360</p>
              <h1>Making legal knowledge clear, practical and accessible</h1>
              <p className="ns-about-intro">
                Sanhita360 brings legal awareness, legal learning and
                practical guidance together on one citizen-focused platform.
              </p>
            </div>
            <img
              className="ns-about-thumbnail"
              src="/images/sanhita360-about-thumbnail.webp"
              alt="About Sanhita360 — legal learning, law notes, study materials and mock tests"
              width="1672"
              height="941"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </section>

        <section className="ns-about-section">
          <div className="ns-about-wrap ns-about-story-grid">
            <div>
              <p className="ns-about-kicker">Our purpose</p>
              <h2>Knowledge is the first step towards protection</h2>
            </div>

            <div className="ns-about-copy">
              <p>
                Legal language and procedures can often feel difficult to
                understand. Sanhita360 is being developed to make reliable
                legal information easier to discover, learn and apply.
              </p>
              <p>
                The platform supports citizens seeking general legal awareness,
                students building their understanding of law, and people who
                need a clearer view of the options available for their concerns.
              </p>
            </div>
          </div>
        </section>

        <section className="ns-about-section ns-about-soft">
          <div className="ns-about-wrap">
            <div className="ns-about-heading">
              <p className="ns-about-kicker">What we do</p>
              <h2>One platform, three connected areas</h2>
            </div>

            <div className="ns-about-cards">
              {pillars.map((pillar) => (
                <article key={pillar.title} className="ns-about-card">
                  <div className="ns-about-icon">{pillar.icon}</div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                  <details className="ns-about-more">
                    <summary>Know More</summary>
                    <ul>
                      {pillar.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ns-about-section">
          <div className="ns-about-wrap">
            <div className="ns-about-heading">
              <p className="ns-about-kicker">Our approach</p>
              <h2>Built around clarity and trust</h2>
            </div>

            <div className="ns-about-values">
              {values.map((value) => (
                <article key={value.title}>
                  <span>{value.icon}</span>
                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ns-about-share-section" aria-label="Share Sanhita360">
          <div className="ns-about-wrap">
            <div className="ns-about-share-copy">
              <p className="ns-about-kicker">Spread the word</p>
              <h2>Share Sanhita360</h2>
              <p>Help others discover accessible legal awareness, learning resources and practical guidance.</p>
            </div>
            <div className="ns-about-share-actions">
              <button type="button" className="facebook" onClick={shareOnFacebook}>
                <FaFacebookF /> Facebook
              </button>
              <button type="button" className="x" onClick={shareOnX}>
                <span className="ns-about-x-icon">X</span> Share on X
              </button>
              <button type="button" className="instagram" onClick={shareNative}>
                <FaInstagram /> Instagram / Share
              </button>
              <button type="button" className="copy" onClick={copyPageLink}>
                <FaLink /> Copy Link
              </button>
            </div>
          </div>
        </section>

        <section className="ns-about-cta">
          <div className="ns-about-wrap">
            <div>
              <p className="ns-about-eyebrow">Explore Sanhita360</p>
              <h2>Learn the law. Understand your options.</h2>
            </div>
            <div className="ns-about-actions">
              <Link to="/law-courses">Explore Courses</Link>
              <a href="https://wa.me/919830015487?text=Hello%20Sanhita360%2C%20I%20would%20like%20to%20request%20a%20free%20legal%20consultation." className="secondary" target="_blank" rel="noopener noreferrer">Request a Free Consultation</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Styles />
    </>
  );
}

function Styles() {
  return (
    <style>{`
      .ns-about-page,.ns-about-page *{box-sizing:border-box}
      .ns-about-wrap{width:min(100% - 40px,1180px);margin:0 auto}
      .ns-about-hero{padding:84px 0 92px;background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 68%,#2563eb 100%);color:#fff}
      .ns-about-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:44px;align-items:center}
      .ns-about-hero-copy{min-width:0}
      .ns-about-thumbnail{display:block;width:100%;height:auto;border-radius:16px;box-shadow:0 20px 48px rgba(0,0,0,.25)}
      .ns-about-eyebrow,.ns-about-kicker{margin:0 0 12px;color:#93c5fd;font-size:12px;font-weight:800;letter-spacing:.13em;text-transform:uppercase}
      .ns-about-hero h1{max-width:850px;margin:0;font-size:clamp(38px,4.2vw,56px);line-height:1.08}
      .ns-about-intro{max-width:760px;margin:24px 0 0;color:#dbeafe;font-size:clamp(17px,2vw,21px);line-height:1.75}
      .ns-about-section{padding:78px 0;background:#fff}
      .ns-about-soft{background:#f8fafc}
      .ns-about-story-grid{display:grid;grid-template-columns:minmax(280px,.8fr) minmax(0,1.2fr);gap:70px;align-items:start}
      .ns-about-section h2{margin:0;color:#0f172a;font-size:clamp(30px,4vw,44px);line-height:1.18}
      .ns-about-kicker{color:#2563eb}
      .ns-about-copy p{margin:0 0 18px;color:#475569;font-size:17px;line-height:1.85}
      .ns-about-heading{max-width:700px;margin:0 auto 42px;text-align:center}
      .ns-about-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
      .ns-about-card{padding:30px;border:1px solid #e2e8f0;border-radius:18px;background:#fff;box-shadow:0 12px 30px rgba(15,23,42,.06)}
      .ns-about-icon{display:flex;width:62px;height:62px;align-items:center;justify-content:center;margin-bottom:22px;border-radius:16px;background:#dbeafe;color:#2563eb;font-size:27px}
      .ns-about-card h3,.ns-about-values h3{margin:0 0 10px;color:#0f172a;font-size:21px}
      .ns-about-card p,.ns-about-values p{margin:0;color:#64748b;line-height:1.75}
      .ns-about-more{margin-top:22px;border-top:1px solid #e2e8f0;padding-top:18px}
      .ns-about-more summary{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border:1px solid #2563eb;border-radius:9px;color:#1d4ed8;font-size:14px;font-weight:800;cursor:pointer;list-style:none;transition:background .2s,color .2s}
      .ns-about-more summary::-webkit-details-marker{display:none}
      .ns-about-more summary::after{content:"+";font-size:18px;line-height:1}
      .ns-about-more[open] summary{background:#2563eb;color:#fff}
      .ns-about-more[open] summary::after{content:"−"}
      .ns-about-more ul{margin:18px 0 0;padding-left:20px;color:#475569}
      .ns-about-more li{margin:0 0 10px;line-height:1.65}
      .ns-about-more li::marker{color:#2563eb}
      .ns-about-values{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
      .ns-about-values article{display:flex;gap:16px;padding:24px;border-radius:16px;background:#f8fafc}
      .ns-about-values article>span{display:flex;width:44px;height:44px;flex:none;align-items:center;justify-content:center;border-radius:12px;background:#dbeafe;color:#2563eb;font-size:19px}
      .ns-about-share-section{padding:48px 0;background:#eff6ff}
      .ns-about-share-section .ns-about-wrap{display:flex;align-items:center;justify-content:space-between;gap:28px}
      .ns-about-share-copy{max-width:520px}
      .ns-about-share-copy h2{margin:0;color:#0f172a;font-size:clamp(26px,3vw,36px)}
      .ns-about-share-copy>p:last-child{margin:10px 0 0;color:#475569;line-height:1.7}
      .ns-about-share-actions{display:flex;flex-wrap:wrap;gap:9px}
      .ns-about-share-actions button{display:inline-flex;min-height:42px;align-items:center;justify-content:center;gap:8px;padding:0 15px;border:1px solid transparent;border-radius:9px;color:#fff;font:800 13px inherit;cursor:pointer}
      .ns-about-share-actions .facebook{background:#1877f2}
      .ns-about-share-actions .x{background:#000}
      .ns-about-share-actions .instagram{background:linear-gradient(135deg,#833ab4,#e1306c,#f77737)}
      .ns-about-share-actions .copy{border-color:#cbd5e1;background:#fff;color:#334155}
      .ns-about-x-icon{font-size:14px;font-weight:900}
      .ns-about-cta{padding:62px 0;background:#1d4ed8;color:#fff}
      .ns-about-cta .ns-about-wrap{display:flex;align-items:center;justify-content:space-between;gap:32px}
      .ns-about-cta h2{margin:0;font-size:clamp(28px,4vw,42px)}
      .ns-about-actions{display:flex;flex-wrap:wrap;gap:12px}
      .ns-about-actions a{display:inline-flex;align-items:center;justify-content:center;padding:13px 20px;border:2px solid #fff;border-radius:10px;background:#fff;color:#1d4ed8;text-decoration:none;font-weight:800;white-space:nowrap}
      .ns-about-actions a.secondary{background:transparent;color:#fff}
      @media(max-width:850px){.ns-about-share-section .ns-about-wrap{align-items:flex-start;flex-direction:column}.ns-about-hero-grid{grid-template-columns:1fr;gap:32px}.ns-about-story-grid{grid-template-columns:1fr;gap:24px}.ns-about-cards,.ns-about-values{grid-template-columns:1fr}.ns-about-cta .ns-about-wrap{align-items:flex-start;flex-direction:column}}
      @media(max-width:640px){.ns-about-share-section{padding:38px 0}.ns-about-share-actions{display:grid;width:100%;grid-template-columns:repeat(2,minmax(0,1fr))}.ns-about-share-actions button{width:100%}.ns-about-wrap{width:min(100% - 28px,1180px)}.ns-about-hero{padding:58px 0 64px}.ns-about-section{padding:56px 0}.ns-about-card{padding:24px}.ns-about-values article{padding:20px}.ns-about-cta{padding:48px 0}}
    `}</style>
  );
}
