import { FaArrowLeft, FaBalanceScale, FaExternalLinkAlt, FaFileAlt, FaPhone, FaShieldAlt, FaFacebookF, FaShareAlt, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../home/components/Header";
import Footer from "../../home/components/Footer";
import SEO from "../../../shared/seo/SEO";

const sources = [
  { name: "LiveLaw", date: "9 November 2026", url: "https://www.livelaw.in/consumer-cases/bsnl-liable-for-deficiency-in-service-as-landline-remained-non-functional-for-18-days-thrissur-consumer-commission-557844", note: "Primary news report on the facts, BSNL's defence, findings and relief." },
  { name: "24Law", date: "November 2026", url: "https://www.24law.in/story/bsnl-liable-for-deficiency-in-service-after-landline-remained-non-functional-for-18-days-thrissur", note: "Additional report with case title, case number, reasoning and operative directions." },
  { name: "Thrissur Consumer Commission – Final Order (PDF)", date: "30 September 2026", url: "https://www.livelaw.in/pdf_upload/2026/11/09/tr-pushpangadhan-v-divisional-engineer-bsnl-anr-710539.pdf", note: "Copy of the Commission's final order hosted by LiveLaw; the decision is dated 30 September 2026." },
  { name: "Supreme Court of India – Vodafone Idea Cellular Ltd. v. Ajay Kumar Agarwal", date: "16 February 2022", url: "https://api.sci.gov.in/supremecourt/2014/22439/22439_2014_4_4_33472_Judgement_16-Feb-2022.pdf", note: "Supreme Court judgment on consumer forum jurisdiction despite the arbitration remedy under Section 7B of the Telegraph Act." },
];

const shareUrl = () => `${window.location.origin}${window.location.pathname}?share=bsnl-landline-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function BsnlLandlineDeficiencyCaseStudyPage() {
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl())}`, "_blank", "noopener,noreferrer");
  const shareX = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("BSNL held liable after a landline remained non-functional for 18 days — Thrissur Consumer Commission | Sanhita360")}&url=${encodeURIComponent(shareUrl())}`, "_blank", "noopener,noreferrer");
  const shareNative = async () => { const url = shareUrl(); try { if (navigator.share) await navigator.share({ title: document.title, text: "Read this Sanhita360 consumer-law case study.", url }); else await navigator.clipboard.writeText(url); } catch (error) { if (error?.name !== "AbortError") window.prompt("Copy this case study link:", url); } };
  const copyLink = async () => { const url = shareUrl(); try { await navigator.clipboard.writeText(url); window.alert("Case study link copied."); } catch { window.prompt("Copy this case study link:", url); } };

  return <>
    <SEO title="BSNL Landline Down for 18 Days: Thrissur Consumer Commission Awards ₹10,000 | Sanhita360" description="Thrissur Consumer Commission held BSNL liable after a landline remained non-functional for 18 days. Read the facts, legal reasoning, ₹5,000 compensation, ₹5,000 costs and relevant judgments." canonical="/case-studies/bsnl-landline-non-functional-18-days-thrissur" keywords={["BSNL deficiency in service", "landline not working consumer complaint", "Thrissur Consumer Commission BSNL", "T R Pushpangadhan BSNL", "Vodafone Idea Ajay Kumar Agarwal"]} />
    <Header />
    <main className="ns-bsnl-case">
      <section className="ns-bsnl-hero"><div className="ns-bsnl-wrap">
        <Link to="/#case-studies" className="ns-bsnl-back"><FaArrowLeft /> Case Studies</Link>
        <span className="ns-bsnl-kicker"><FaPhone /> Sanhita360 · Consumer Law Case Study</span>
        <h1>BSNL Landline Remained Non-Functional for 18 Days: Thrissur Consumer Commission Holds It Liable</h1>
        <p>A subscriber's landline remained out of service for approximately 18 days during optical-fibre cable work. The Commission held that the disruption and failure to restore service within a reasonable time amounted to deficiency in service.</p>
        <div className="ns-bsnl-facts"><span><strong>Case:</strong> T.R. Pushpangadhan v. Divisional Engineer, BSNL & Anr.</span><span><strong>Case No.:</strong> C.C. No. 336 of 2017</span><span><strong>Order date:</strong> 30 September 2026</span><span><strong>Reported award:</strong> ₹5,000 compensation + ₹5,000 costs</span></div>
      </div></section>
      <article className="ns-bsnl-wrap ns-bsnl-article">
        <div className="ns-bsnl-notice"><FaShieldAlt /><p><strong>Source note:</strong> This case study is based on the final order hosted by LiveLaw and the news reports listed below. It is an educational summary, not a substitute for reading the full order and applicable law.</p></div>
        <section><span className="ns-bsnl-label">The service disruption</span><h2>What happened to the subscriber?</h2>
          <p>T.R. Pushpangadhan, a resident of Anthikkad in Thrissur, subscribed to BSNL's landline service. His telephone connection became non-functional on 24 March 2017 and remained out of service until 11 April 2017—approximately 18 days.</p>
          <p>He alleged that the disruption was connected with cable-laying work in his locality and that BSNL did not restore the connection within a reasonable period. He approached the Thrissur Consumer Disputes Redressal Commission under Section 12(1) of the Consumer Protection Act, 1986, seeking compensation and litigation costs.</p>
        </section>
        <section><span className="ns-bsnl-label">BSNL's defence</span><h2>Why did BSNL say the complaint should not succeed?</h2>
          <p>BSNL admitted that the connection remained non-functional during the relevant period. It explained that optical-fibre cable-laying work had affected approximately 300 telephone connections in the locality. It also stated that proportionate rental reductions had been granted to 11 subscribers who submitted written requests.</p>
          <p>BSNL denied wilful deficiency, arguing that the complainant was only an occasional user of the landline and also had a mobile phone. It further contended that the dispute should be referred to arbitration under Section 7B of the Indian Telegraph Act, 1885.</p>
        </section>
        <section><span className="ns-bsnl-label">The Commission's findings</span><h2>Why was BSNL held liable?</h2>
          <p>The Commission held that the complaint was maintainable notwithstanding the arbitration provision in Section 7B. It relied on the Supreme Court's decision in <em>Vodafone Idea Cellular Ltd. v. Ajay Kumar Agarwal</em> (2022), which clarified that the statutory arbitration remedy under the Telegraph Act does not oust the jurisdiction of consumer fora.</p>
          <p>On the service issue, the Commission found that the fact that the interruption arose during optical-fibre cable work did not, by itself, absolve BSNL of responsibility. The provider was expected to restore the service within a reasonable time. The approximately 18-day failure to do so amounted to deficiency in service.</p>
          <p>The Commission also rejected the argument that the subscriber's limited outgoing calls or possession of a mobile phone reduced his entitlement. A landline may be used to receive incoming calls as well; the value of the service cannot be assessed only by counting outgoing calls.</p>
          <p>The Commission observed that a proportionate rental reduction was appropriate for the period when service was unavailable. However, it did not order a specific refund because the exact amount had not been quantified or established by evidence.</p>
        </section>
        <section><span className="ns-bsnl-label">The order</span><h2>What did the Consumer Commission direct?</h2>
          <div className="ns-bsnl-award"><div><strong>₹5,000</strong><span>Compensation</span></div><div><strong>₹5,000</strong><span>Litigation costs</span></div><div><strong>4.5%</strong><span>Default interest per annum</span></div></div>
          <p>The complaint was allowed. The Divisional Engineer and General Manager of BSNL were directed to pay jointly and severally:</p>
          <ul><li>₹5,000 as compensation for inconvenience and mental agony; and</li><li>₹5,000 towards litigation costs.</li></ul>
          <p>Payment was directed within 30 days of receipt of the order. In case of default, both amounts would carry interest at 4.5% per annum from the date of filing the complaint until realisation.</p>
          <p><strong>Rental adjustment:</strong> Although the Commission recognised the entitlement to proportionate rental reduction, it declined to quantify or direct a refund because the precise amount was not proved. The reported order therefore totals ₹10,000 in compensation and costs, apart from the unquantified rental issue.</p>
        </section>
        <section><span className="ns-bsnl-label">Legal principle</span><h2>Can a telecom subscriber approach a Consumer Commission despite Section 7B arbitration?</h2>
          <p>Yes. In <em>Vodafone Idea Cellular Ltd. v. Ajay Kumar Agarwal</em>, Civil Appeal No. 923 of 2017, decided on 16 February 2022, the Supreme Court held that the existence of an arbitration remedy under Section 7B of the Indian Telegraph Act does not, by itself, exclude consumer forum jurisdiction. A consumer may pursue the remedy under consumer protection law.</p>
          <p>The Thrissur Commission relied on this ruling to reject BSNL's preliminary objection. The decision is relevant to consumer disputes involving telecom services, although the facts and evidence in each complaint must still be established independently.</p>
        </section>
        <section><span className="ns-bsnl-label">Practical steps</span><h2>What should consumers do when a landline stops working?</h2>
          <ol><li>Register a fault complaint with the service provider and preserve the docket/reference number.</li><li>Keep records of the date and time the service stopped and when it was restored.</li><li>Save bills, payment receipts, complaint acknowledgements, emails and written replies.</li><li>Send a written grievance seeking restoration and an appropriate rental adjustment for the outage period.</li><li>Record the actual period of non-availability and calculate the refund sought, supported by bills and tariff details.</li><li>If the issue remains unresolved, consider the appropriate consumer grievance and legal remedies after checking limitation and jurisdiction.</li></ol>
        </section>
        <section><span className="ns-bsnl-label">Case identification</span><h2>Reported case details</h2>
          <p><strong>Cause title:</strong> T.R. Pushpangadhan v. Divisional Engineer, BSNL & Another<br/><strong>Case number:</strong> C.C. No. 336 of 2017<br/><strong>Forum:</strong> Consumer Disputes Redressal Commission, Thrissur<br/><strong>Coram:</strong> President C.T. Sabu and Member Ram Mohan R.<br/><strong>Order date:</strong> 30 September 2026</p>
        </section>
        <div className="ns-bsnl-sources"><h2>News reports and legal references</h2><p>Read the reporting and the underlying decisions. The Commission's order and Supreme Court judgment are included separately from secondary news coverage.</p>
          {sources.map(source => <div className="ns-bsnl-source" key={source.name}><div><strong>{source.name}</strong><small>{source.date}</small><p>{source.note}</p></div><a href={source.url} target="_blank" rel="noopener noreferrer">Open reference <FaExternalLinkAlt /></a></div>)}
        </div>
        <div className="ns-bsnl-disclaimer"><FaBalanceScale /><p><strong>Disclaimer:</strong> This case study is for public legal education and is not legal advice. The result does not mean every service interruption automatically entitles a subscriber to compensation. Outcomes depend on the evidence, applicable law and findings of the competent forum.</p></div>
        <section className="ns-bsnl-forward"><h2><FaShareAlt /> Share / Forward This Case Study</h2><p>Share this consumer-law decision to spread awareness about reliable telecom services and consumer remedies.</p><div className="ns-bsnl-actions"><button onClick={shareFacebook}><FaFacebookF /> Facebook</button><button onClick={shareX}>𝕏 Share on X</button><button onClick={shareNative}><FaShareAlt /> Share / Forward</button><button onClick={copyLink}><FaLink /> Copy Link</button></div></section>
        <Link to="/#case-studies" className="ns-bsnl-back-bottom"><FaArrowLeft /> Back to all Case Studies</Link>
      </article>
    </main>
    <Footer />
    <style>{`
      .ns-bsnl-case{color:#1e293b}.ns-bsnl-wrap{width:min(100% - 40px,960px);margin:auto}.ns-bsnl-hero{padding:64px 0 58px;background:linear-gradient(135deg,#111827,#164e63);color:#fff}.ns-bsnl-back,.ns-bsnl-back-bottom{display:inline-flex;align-items:center;gap:8px;color:inherit;text-decoration:none;font-weight:700}.ns-bsnl-kicker{display:flex;align-items:center;gap:9px;margin-top:30px;color:#bae6fd;font-weight:800;text-transform:uppercase;letter-spacing:.06em;font-size:13px}.ns-bsnl-hero h1{max-width:900px;margin:16px 0;font-size:clamp(32px,5vw,48px);line-height:1.15}.ns-bsnl-hero>div>p{max-width:820px;color:#e0f2fe;font-size:18px;line-height:1.7}.ns-bsnl-facts{display:flex;flex-wrap:wrap;gap:12px 25px;margin-top:25px;color:#e2e8f0;font-size:13px}.ns-bsnl-article{padding:42px 0 75px}.ns-bsnl-notice,.ns-bsnl-disclaimer{display:flex;gap:14px;padding:18px 20px;border:1px solid #bae6fd;border-radius:12px;background:#f0f9ff;color:#0c4a6e}.ns-bsnl-notice>svg,.ns-bsnl-disclaimer>svg{flex-shrink:0;margin-top:4px}.ns-bsnl-article section{margin:38px 0}.ns-bsnl-label{color:#0369a1;font-size:12px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.ns-bsnl-article h2{margin:8px 0 14px;color:#0f172a;font-size:clamp(24px,3vw,30px)}.ns-bsnl-article p,.ns-bsnl-article li{color:#475569;font-size:16px;line-height:1.85}.ns-bsnl-article ul,.ns-bsnl-article ol{padding-left:23px}.ns-bsnl-article li{margin:9px 0}.ns-bsnl-award{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:22px 0}.ns-bsnl-award div{padding:22px;border-radius:12px;background:#ecfeff;text-align:center}.ns-bsnl-award strong{display:block;color:#0e7490;font-size:30px}.ns-bsnl-award span{color:#475569;font-size:13px}.ns-bsnl-sources{margin:45px 0;padding:26px;border:1px solid #e2e8f0;border-radius:16px}.ns-bsnl-source{display:flex;justify-content:space-between;gap:20px;padding:18px 0;border-top:1px solid #e2e8f0}.ns-bsnl-source small{display:block;margin-top:4px;color:#64748b}.ns-bsnl-source p{margin:7px 0 0;font-size:14px}.ns-bsnl-source a{display:flex;align-items:center;gap:7px;flex-shrink:0;color:#0369a1;text-decoration:none;font-weight:700;font-size:13px}.ns-bsnl-disclaimer{margin:28px 0;background:#fff7ed;border-color:#fed7aa;color:#9a3412}.ns-bsnl-forward{padding:24px;border-radius:16px;background:#f1f5f9}.ns-bsnl-forward h2{display:flex;align-items:center;gap:10px}.ns-bsnl-actions{display:flex;flex-wrap:wrap;gap:10px}.ns-bsnl-actions button{display:inline-flex;align-items:center;gap:8px;padding:11px 15px;border:0;border-radius:8px;background:#0f172a;color:#fff;font-weight:700;cursor:pointer}.ns-bsnl-back-bottom{margin-top:20px;color:#0369a1}@media(max-width:640px){.ns-bsnl-award{grid-template-columns:1fr}.ns-bsnl-source{flex-direction:column}.ns-bsnl-hero{padding:45px 0}.ns-bsnl-article{padding-top:28px}}
    `}</style>
  </>;
}
