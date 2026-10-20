import { Link } from "react-router-dom";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const updates = [
  {
    id: 7,
    category: "Criminal Procedure & Remedies",
    title: "Section 156(3) CrPC to Section 175(3) BNSS: Police Investigation Remedy",
    date: "20 Oct 2026",
    description: "Police refusing to register an FIR? Learn when to approach the Magistrate, the SP complaint and affidavit requirements, and what this remedy provides.",
    link: "/legal-remedies/section-156-3-crpc-section-175-3-bnss",
    image: "/images/legal-updates/section-175-bnss.svg",
  },
  {
    id: 6,
    category: "Criminal Procedure & Remedies",
    title: "Legal Remedies When Police Refuse to Register an FIR",
    date: "24 Sep 2026",
    description:
      "A citizen's practical route through the Superintendent of Police, Magistrate, private complaint and exceptional High Court relief under the BNSS.",
    link: "/legal-remedies/remedies-when-police-refuse-to-register-fir",
    image: "/images/legal-updates/police-refuse-fir-remedies-v2.jpg",
  },
  {
    id: 5,
    category: "Criminal Procedure",
    title: "Section 200 CrPC and Section 223 BNSS: Private Complaint Before a Magistrate",
    date: "10 Sep 2026",
    description:
      "Understand examination of the complainant, the complaint-case sequence, the difference from a police-investigation request, and the BNSS accused-hearing safeguard.",
    link: "/legal-remedies/section-200-crpc-section-223-bnss-private-complaint",
    image: "/images/legal-updates/section-200-crpc-section-223-bnss.jpg",
  },
  {
    id: 4,
    category: "Technology, AI & Compliance",
    title: "Tech Startups in 2026: Regulatory Compliance Is the Real Challenge",
    date: "10 Sep 2026",
    description:
      "A practical legal-risk guide covering data protection, responsible AI, cybersecurity, consumer claims and compliance-by-design before a technology business scales.",
    link: "/legal-remedies/tech-startup-regulatory-compliance-2026",
    image: "/images/legal-updates/tech-startup-regulatory-compliance-2026.jpg",
  },
  {
    id: 1,
    category: "Supreme Court",
    title: "Important Judgement on Consumer Rights",
    date: "05 Aug 2026",
    description:
      "Landmark Supreme Court judgments have expanded consumer protection across medical treatment, housing, commercial purchases and telecommunications.",
    link: "/legal-remedies/important-judgement-on-consumer-rights",
    image: "/images/legal-updates/consumer-rights-landmark-judgments.jpg",
  },
  {
    id: 2,
    category: "Property Fraud & Remedies",
    title: "Bought a Mortgaged Property by Fraud? Here’s How to Protect Your Home and Money",
    date: "09 Sep 2026",
    description:
      "Understand the urgent legal steps available when a seller conceals an earlier bank mortgage or lien over the property you purchased.",
    link: "/legal-remedies/bought-mortgaged-property-by-fraud",
    image: "/images/legal-updates/mortgaged-property-fraud.jpg",
  },
  {
    id: 3,
    category: "Cybercrime & Remedies",
    title: "Next Steps for Unrecovered Online Fraud Funds",
    date: "09 Sep 2026",
    description:
      "Understand the options available when money remains unrecovered after reporting an online financial fraud to the cybercrime authorities.",
    link: "/legal-remedies/next-steps-unrecovered-online-fraud-funds",
    image: "/images/legal-updates/unrecovered-online-fraud-funds.jpg",
  },
];

const LatestUpdates = () => {
  return (
    <section
      id="legal-remedies"
      style={{
        padding: "90px 20px",
        scrollMarginTop: "88px",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "50px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "42px",
                color: "#0f172a",
                marginBottom: "10px",
              }}
            >
              Legal Remedies
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "18px",
                margin: 0,
              }}
            >
              Stay updated with important legal news and landmark judgments.
            </p>
          </div>

          <Link
            to="/posts"
            style={{
              textDecoration: "none",
              color: "#2563eb",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            View All
            <FaArrowRight />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))",
            gap: "30px",
          }}
        >
          {updates.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#f8fafc",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,.06)",
              }}
            >
              <div
                style={{
                  height: "180px",
                  background: item.image
                    ? `url(${item.image}) center/cover no-repeat`
                    : "linear-gradient(135deg,#1d4ed8,#2563eb,#0f172a)",
                }}
              />

              <div
                style={{
                  padding: "28px",
                }}
              >
                <span
                  style={{
                    background: "#dbeafe",
                    color: "#2563eb",
                    padding: "6px 14px",
                    borderRadius: "30px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {item.category}
                </span>

                <h3
                  style={{
                    marginTop: "18px",
                    color: "#0f172a",
                    lineHeight: "1.5",
                  }}
                >
                  {item.title}
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#64748b",
                    marginBottom: "18px",
                    fontSize: "14px",
                  }}
                >
                  <FaCalendarAlt />
                  {item.date}
                </div>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.8",
                    marginBottom: "25px",
                  }}
                >
                  {item.description}
                </p>

                <Link
                  to={item.link || "/posts"}
                  style={{
                    color: "#2563eb",
                    textDecoration: "none",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Read More
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;
