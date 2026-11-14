import { FaArrowLeft, FaBalanceScale, FaExternalLinkAlt, FaFileAlt, FaGavel, FaTrain, FaShieldAlt, FaFacebookF, FaShareAlt, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../home/components/Header";
import Footer from "../../home/components/Footer";
import SEO from "../../../shared/seo/SEO";

const sources = [
  { name: "Bar & Bench", date: "27 May 2026", url: "https://www.barandbench.com/news/consumer-court-orders-railways-to-pay-20000-compensation-after-passengers-denied-seats-despite-confirmed-tickets", note: "Original legal-news report identifying the case as Ravi Shanker Pandey v. North Central Railway & Ors." },
  { name: "LiveLaw", date: "4 June 2026", url: "https://www.livelaw.in/consumer-cases/passengers-forced-to-travel-standing-despite-confirmed-tickets-bhojpur-consumer-commission-holds-railways-liable-for-deficiency-in-service-536792", note: "Reports the Commission's findings, case number, relief and provides a reported order-download facility." },
  { name: "NDTV", date: "28 May 2026", url: "https://www.ndtv.com/travel/railways-ordered-to-pay-rs-20-000-to-passengers-for-denying-seats-despite-confirmed-tickets-11558419", note: "Explains the journey, complaints and consumer commission award." },
  { name: "The Times of India – Legal", date: "29 May 2026", url: "https://timesofindia.indiatimes.com/legal/news/bihar-court-orders-railways-to-pay-rs-35000-after-passengers-forced-to-travel-standing-despite-confirmed-tickets/articleshow/131384186.cms", note: "Detailed report on the four tickets, occupied berths, evidence and directions." },
  { name: "Business Today", date: "28 May 2026", url: "https://www.businesstoday.in/amp/india/story/confirmed-tickets-seats-taken-by-railway-staff-court-orders-railways-to-pay-rs20000-after-passengers-travel-standing-533717-2026-05-28", note: "Reports the passengers' account and the Railways' defence." },
  { name: "The Economic Times", date: "28 May 2026", url: "https://economictimes.indiatimes.com/news/new-updates/why-railways-had-to-pay-10-times-the-ticket-price-as-compensation-to-4-passengers-travelling-mental-physical-economic-harassment-/articleshow/131369073.cms", note: "Further coverage of the confirmed-ticket dispute and compensation." },
  { name: "Moneylife", date: "27 May 2026", url: "https://www.moneylife.in/article/railway-staff-occupied-reserved-seats-passengers-forced-to-stand-consumer-panel-orders-20000-compensation/80589.html", note: "Reports the Consumer Case No. 296/2022 and order date of 12 May 2026." },
  { name: "The Times of India – Patna", date: "30 May 2026", url: "https://timesofindia.indiatimes.com/city/patna/consumer-panel-orders-rly-to-compensate-passenger-denied-berth/articleshow/131397851.cms", note: "Local report on the Bhojpur Commission's decision." },
];

export default function RailwaysDeniedConfirmedBerthsCaseStudyPage() {
  return <>
    <SEO title="Confirmed Train Tickets, No Seats: Railways Ordered to Pay ₹20,000 | Sanhita360 Case Study" description="Bhojpur District Consumer Commission held North Central Railway and the Ministry of Railways liable after four passengers were forced to travel standing despite confirmed berths. Case No. 296/2022." canonical="/case-studies/railways-denied-confirmed-berths-compensation" keywords={["confirmed railway ticket seat denied", "Railways consumer court compensation", "Ravi Shanker Pandey v North Central Railway", "deficiency in service railway", "Consumer Case 296/2022"]} />
    <Header />
    <main className="ns-rail-case">
      <section className="ns-rail-hero"><div className="ns-rail-wrap">
        <Link to="/#case-studies" className="ns-rail-back"><FaArrowLeft /> Case Studies</Link>
        <span className="ns-rail-kicker"><FaTrain /> Sanhita360 · Consumer Law Case Study</span>
        <h1>Confirmed Train Tickets, But No Seats: Consumer Commission Orders Railways to Pay ₹20,000</h1>
        <p>Four passengers reportedly had to complete their journey standing after finding their confirmed berths occupied on the LTT–Patna Express. The Bhojpur District Consumer Commission held the railway authorities liable for deficiency in service.</p>
        <div className="ns-rail-facts"><span><strong>Case:</strong> Ravi Shanker Pandey v. North Central Railway & Ors.</span><span><strong>Case No.:</strong> Consumer Case No. 296/2022</span><span><strong>Order date:</strong> 12 May 2026</span><span><strong>Compensation:</strong> ₹20,000</span></div>
      </div></section>
      <article className="ns-rail-wrap ns-rail-article">
        <div className="ns-rail-notice"><FaShieldAlt /><p><strong>Important source note:</strong> This educational case study is based on published reports by Bar & Bench, LiveLaw and other news organisations. LiveLaw provides a reported “Read/Download Order” facility. The article is not a substitute for reading the Commission's complete order. The parties' allegations and the Commission's reported findings are identified separately below.</p></div>
        <section>
          <span className="ns-rail-label">The incident · LTT–Patna Express</span>
          <h2>What happened to the four passengers?</h2>
          <p>The dispute arose from a journey by four passengers, including complainant Ravi Shanker Pandey, from Vindhyachal in Uttar Pradesh to Ara in Bihar on Train No. 13202, the LTT–Patna Express. According to the reports, they held confirmed reservations in coach B4, with allotted berths 58, 62, 63 and 68. The ticket amount was ₹1,876.80.</p>
          <p>When the passengers boarded the train, which was reportedly running nearly an hour late, they found their reserved berths occupied by other persons. The passengers alleged that those persons identified themselves as railway employees and refused to vacate the seats when requested.</p>
          <p>The passengers reportedly tried to locate the Travelling Ticket Examiner (TTE) and Railway Protection Force personnel for assistance. They also attempted to raise the issue through railway helpline and grievance channels, including Railway Seva and the Rail Ministry's social-media channel. The reports state that a complaint reference was generated, but the passengers did not receive effective assistance during the journey.</p>
          <p>When a TTE was reportedly approached at Buxar station, the passengers said they were told to “manage” because of the rush. They ultimately completed the journey standing, despite having paid for confirmed reserved berths.</p>
        </section>
        <section>
          <span className="ns-rail-label">Proceedings before the Commission</span>
          <h2>What did the Railways argue?</h2>
          <p>North Central Railway and the Ministry of Railways contested the complaint. As summarised in the news reports, they questioned the maintainability of the consumer complaint and argued that the dispute concerned law and order, which fell within the jurisdiction of the Government Railway Police (GRP), rather than the railway administration. They also denied deficiency in service and stated that action had been taken on the complaint.</p>
          <p>East Central Railway was also reported to have sought deletion from the proceedings on the ground that the journey originated within the North Central Railway zone. The Commission did not accept the objections as a reason to reject the complainant's case.</p>
        </section>
        <section>
          <span className="ns-rail-label">The reported findings · 12 May 2026</span>
          <h2>Why was this treated as deficiency in service?</h2>
          <p>The District Consumer Disputes Redressal Commission, Bhojpur at Ara, comprising President Krishna Pratap Singh and Member Kamal Kishore Singh, considered the tickets, complaint records, text messages and photographs submitted by the complainant.</p>
          <p>The Commission reportedly found that the complainant and his three companions had confirmed reservations but were unable to occupy their allotted berths despite approaching railway authorities through different channels. It described the passengers as having suffered “mental, physical and economical harassment” and held that the failure to provide the reserved accommodation amounted to deficiency in service.</p>
          <p>The case is a practical reminder that a confirmed reservation is not merely a booking acknowledgement: the service provider is expected to provide the reserved accommodation, subject to applicable railway rules and the facts of the particular journey.</p>
        </section>
        <section>
          <span className="ns-rail-label">Relief granted</span>
          <h2>What exactly did the Commission order?</h2>
          <div className="ns-rail-award"><div><strong>₹20,000</strong><span>Compensation</span></div><div><strong>₹15,000</strong><span>Litigation costs</span></div><div><strong>₹1,876.80</strong><span>Ticket refund + 8% annual interest</span></div></div>
          <p>According to the published reports, the Commission directed North Central Railway and the Ministry of Railways (Railway Board) to:</p>
          <ul>
            <li>Refund the booking amount of ₹1,876.80 with 8% annual interest;</li>
            <li>Pay ₹20,000 as compensation for the harassment suffered by the passengers; and</li>
            <li>Pay ₹15,000 towards litigation costs.</li>
          </ul>
          <p>The reported direction required payment within 60 days. If the amount was not paid within that period, the complainant was reportedly entitled to recover it through legal process with interest at 10% per annum.</p>
          <p><strong>Do not confuse the figures:</strong> ₹20,000 is the compensation component. The reported additional litigation cost is ₹15,000, apart from the ticket refund and interest.</p>
        </section>
        <section>
          <span className="ns-rail-label">Consumer-law lessons</span>
          <h2>What should passengers do if confirmed berths are occupied?</h2>
          <ol>
            <li><strong>Keep the confirmed ticket:</strong> Preserve the e-ticket or printed ticket showing PNR, train number, coach and berth details.</li>
            <li><strong>Approach the TTE promptly:</strong> Ask the TTE to verify the reservation chart and take steps to restore access to the allotted berth. Note the coach, time and station.</li>
            <li><strong>Use official grievance channels:</strong> Make a complaint through the railway's official grievance mechanism or helpline while the journey is in progress, and save the complaint reference number and acknowledgement.</li>
            <li><strong>Document what happened:</strong> Keep lawful photographs, messages, complaint acknowledgements and details of witnesses. Avoid confrontation and do not put yourself at risk to obtain evidence.</li>
            <li><strong>Complain in writing after the journey:</strong> Send a clear complaint to the railway authorities, identifying the train, date, PNR, coach, berth and the assistance sought.</li>
            <li><strong>Assess consumer remedies:</strong> If the service failure is not resolved, consider obtaining legal advice on the appropriate forum, limitation period, parties and evidence before filing a consumer complaint.</li>
          </ol>
        </section>
        <section>
          <span className="ns-rail-label">Legal framework</span>
          <h2>Can denial of a confirmed berth amount to deficiency in service?</h2>
          <p>The Consumer Protection Act, 2019 provides remedies for consumers where a service suffers from a legally recognised deficiency. Whether a particular railway incident qualifies depends on the evidence, the service obligation, applicable railway rules, the parties involved and the facts established before the Commission.</p>
          <p>This reported decision illustrates that a consumer forum may examine whether railway authorities took reasonable steps to ensure that confirmed passengers could use their reserved accommodation. It should not be read as saying that every seat-related disagreement automatically results in compensation; each complaint must be assessed on its own evidence and legal merits.</p>
        </section>
        <section>
          <span className="ns-rail-label">Evidence checklist</span>
          <h2>Documents that may support a passenger's complaint</h2>
          <ul>
            <li>Confirmed e-ticket or printed ticket and payment receipt;</li>
            <li>PNR details, reservation chart and allotted coach/berth information;</li>
            <li>Railway Seva, helpline or other grievance reference numbers;</li>
            <li>SMS messages, emails and written responses from railway officials;</li>
            <li>Lawfully obtained photographs or videos and witness details;</li>
            <li>Written complaint submitted after the journey and any response; and</li>
            <li>Receipts or records supporting any additional loss claimed.</li>
          </ul>
        </section>
        <section>
          <span className="ns-rail-label">Case details</span>
          <h2>Case title and reported order</h2>
          <p><strong>Ravi Shanker Pandey v. North Central Railway & Ors.</strong><br />Consumer Case No. 296/2022<br />District Consumer Disputes Redressal Commission, Bhojpur, Ara<br />Reported order date: 12 May 2026</p>
          <p>For legal research, consult the full order itself rather than relying only on news summaries. The LiveLaw report below includes a “Click Here To Read/Download Order” facility.</p>
        </section>
        <div className="ns-rail-sources">
          <h2>News reports and reference links</h2>
          <p>The following reports cover the incident, Commission's findings and relief. The Bar & Bench report is the initial legal-news report; LiveLaw provides case-number details and an order-download facility.</p>
          {sources.map((source) => <div className="ns-rail-source" key={source.name}><div><strong>{source.name}</strong><small>{source.date}</small><p>{source.note}</p></div><a href={source.url} target="_blank" rel="noreferrer">Read report <FaExternalLinkAlt /></a></div>)}
        </div>
        <div className="ns-rail-disclaimer"><FaBalanceScale /><p><strong>Disclaimer:</strong> This case study is for public legal education and is based on secondary reporting. It does not reproduce the complete Commission order and is not legal advice. Verify the certified or downloaded order, applicable rules and current law before relying on this decision in a legal proceeding.</p></div>
        <section className="ns-rail-forward">
          <h2><FaShareAlt /> Share / Forward This Case Study</h2>
          <p>Help other passengers understand their consumer rights by sharing this case study.</p>
          <div className="ns-rail-forward-actions">
            <a href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href)} target="_blank" rel="noreferrer"><FaFacebookF /> Facebook</a>
            <a href={"https://twitter.com/intent/tweet?url=" + encodeURIComponent(window.location.href) + "&text=" + encodeURIComponent("Confirmed train tickets, but no seats: Railways ordered to pay compensation — Sanhita360 case study")} target="_blank" rel="noreferrer">𝕏 Share on X</a>
            <button type="button" onClick={() => navigator.share ? navigator.share({ title: document.title, url: window.location.href }) : navigator.clipboard.writeText(window.location.href)}><FaShareAlt /> Share / Forward</button>
            <button type="button" onClick={() => navigator.clipboard.writeText(window.location.href)}><FaLink /> Copy Link</button>
          </div>
        </section>
        <Link to="/#case-studies" className="ns-rail-back-bottom"><FaArrowLeft /> Back to all Case Studies</Link>
      </article>
    </main>
    <Footer />
    <style>{`
      .ns-rail-case{font-family:inherit;color:#1e293b}.ns-rail-wrap{width:min(100% - 40px,960px);margin:auto}
      .ns-rail-hero{padding:64px 0 58px;background:linear-gradient(135deg,#0f172a,#164e63);color:#fff}
      .ns-rail-back,.ns-rail-back-bottom{display:inline-flex;align-items:center;gap:8px;color:inherit;text-decoration:none;font-weight:700}
      .ns-rail-kicker{display:flex;align-items:center;gap:9px;margin-top:30px;color:#bae6fd;font-weight:800;text-transform:uppercase;letter-spacing:.06em;font-size:13px}
      .ns-rail-hero h1{max-width:880px;margin:16px 0;font-size:clamp(32px,5vw,48px);line-height:1.15}
      .ns-rail-hero>div>p{max-width:820px;color:#e0f2fe;font-size:18px;line-height:1.7}
      .ns-rail-facts{display:flex;flex-wrap:wrap;gap:12px 25px;margin-top:25px;color:#e2e8f0;font-size:13px}
      .ns-rail-article{padding:42px 0 75px}.ns-rail-notice,.ns-rail-disclaimer{display:flex;gap:14px;padding:18px 20px;border:1px solid #bae6fd;border-radius:12px;background:#f0f9ff;color:#0c4a6e}
      .ns-rail-notice>svg,.ns-rail-disclaimer>svg{flex-shrink:0;margin-top:4px}.ns-rail-article section{margin:38px 0}
      .ns-rail-label{color:#0369a1;font-size:12px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}
      .ns-rail-article h2{margin:8px 0 14px;color:#0f172a;font-size:clamp(24px,3vw,30px)}
      .ns-rail-article p,.ns-rail-article li{color:#475569;font-size:16px;line-height:1.85}
      .ns-rail-article ul,.ns-rail-article ol{padding-left:23px}.ns-rail-article li{margin:9px 0}
      .ns-rail-award{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:22px 0}
      .ns-rail-award>div{padding:18px;border-radius:12px;background:#eff6ff;border:1px solid #bfdbfe;display:flex;flex-direction:column;gap:5px}
      .ns-rail-award strong{font-size:clamp(22px,3vw,30px);color:#1d4ed8}.ns-rail-award span{font-size:13px;color:#475569}
      .ns-rail-sources{margin:46px 0}.ns-rail-sources>p{margin-bottom:22px}
      .ns-rail-source{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:17px 0;border-bottom:1px solid #e2e8f0}
      .ns-rail-source small{display:block;color:#64748b;margin-top:3px}.ns-rail-source p{margin:5px 0 0;font-size:14px}
      .ns-rail-source a{display:inline-flex;align-items:center;gap:7px;white-space:nowrap;color:#0369a1;font-weight:750;text-decoration:none}
      .ns-rail-disclaimer{background:#fffbeb;border-color:#fde68a;color:#92400e;margin:25px 0}.ns-rail-disclaimer p{color:#78350f;margin:0}
      .ns-rail-back-bottom{color:#0369a1;margin-top:20px}
      .ns-rail-forward{margin:32px 0;padding:24px;border:1px solid #dbe5ef;border-radius:15px;background:#fff;box-shadow:0 8px 24px #0f172a0a}
      .ns-rail-forward h2{display:flex;align-items:center;gap:10px;margin:0;color:#0f172a;font-size:23px}
      .ns-rail-forward h2 svg{color:#0369a1}.ns-rail-forward>p{margin:8px 0 0}
      .ns-rail-forward-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
      .ns-rail-forward-actions a,.ns-rail-forward-actions button{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:42px;padding:0 16px;border:0;border-radius:9px;background:#0369a1;color:#fff;text-decoration:none;font:inherit;font-size:14px;font-weight:750;cursor:pointer}
      .ns-rail-forward-actions a:first-child{background:#1877f2}.ns-rail-forward-actions a:nth-child(2){background:#111827}
      .ns-rail-forward-actions button:last-child{background:#e9eef4;color:#18324b}
      @media(max-width:640px){.ns-rail-forward{padding:18px}.ns-rail-forward-actions{display:grid;grid-template-columns:1fr 1fr}.ns-rail-forward-actions a,.ns-rail-forward-actions button{padding:0 8px;font-size:12px}}
      @media(max-width:640px){.ns-rail-wrap{width:min(100% - 30px,960px)}.ns-rail-hero{padding:42px 0}.ns-rail-facts{display:grid;gap:9px}.ns-rail-article{padding-top:28px}.ns-rail-article p,.ns-rail-article li{font-size:15px}.ns-rail-award{grid-template-columns:1fr}.ns-rail-source{align-items:flex-start;flex-direction:column;gap:8px}}
    `}</style>
  </>;
}
