import { FaArrowLeft, FaBalanceScale, FaExternalLinkAlt, FaFileAlt, FaTrain, FaShieldAlt, FaFacebookF, FaShareAlt, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../home/components/Header";
import Footer from "../../home/components/Footer";
import SEO from "../../../shared/seo/SEO";

const sources = [
  { name: "LiveLaw", date: "10 November 2026", url: "https://www.livelaw.in/consumer-cases/shivamogga-consumer-commission-holds-railway-station-masters-liable-train-water-shortage-557955", note: "Detailed legal report covering the parties, rival contentions, Commission's reasoning and directions." },
  { name: "24Law", date: "10 November 2026", url: "https://24law.in/story/no-water-in-train-washrooms-forces-24-passengers-to-abandon-journey-railway-station-masters-held", note: "Reports the case title, Consumer Case No. 3 of 2026, complaint acknowledgement number and the date correction." },
  { name: "The Times of India – Legal", date: "28 October 2026", url: "https://timesofindia.indiatimes.com/legal/news/family-of-24-forced-to-get-off-a-train-over-washrooms-without-water-paid-extra-to-reach-shivamogga-after-railway-staff-failed-to-resolve-their-complaint-yet-railways-denied-the-problem-until-a-consumer-commission-ordered-a-rs-16000-payout/amp_articleshow/135254695.cms", note: "Detailed account of the evidence, Railways' defence, findings and relief." },
  { name: "The Times of India – Bengaluru", date: "October 2026", url: "https://timesofindia.indiatimes.com/city/bengaluru/man-travelling-from-bengaluru-to-shivamogga-with-family-of-24-finds-no-water-in-train-toilets-gets-off-at-tumakuru-after-station-master-fails-to-respond-and-spends-extra-rs-1760-on-tickets-for-another-train-consumer-court-orders-railways-to-pay-rs-15000-and-refund-fare-with-interest/articleshow/135250939.cms", note: "Reports the family's interrupted journey, additional ticket expense and consumer relief." },
  { name: "The New Indian Express", date: "27 October 2026", url: "https://www.newindianexpress.com/amp/story/states/karnataka/2026/Oct/27/consumer-redressal-commission-in-shivamogga-fines-railways-for-lack-of-water-on-train", note: "Early regional coverage of the complaint and compensation order." },
  { name: "The Economic Times", date: "28 October 2026", url: "https://economictimes.indiatimes.com/industry/transportation/railways/no-water-in-train-toilets-no-help-from-station-master-railways-told-to-pay-rs-15000-to-passenger-travelling-from-bengaluru-to-shivamogga-with-23-relatives/articleshow/135254512.cms", note: "Summarises the journey, failure to resolve the water issue and the ₹15,000 award plus fare refund." },
  { name: "Mirror Now", date: "28 October 2026", url: "https://www.mirrornow.in/bengaluru-news/consumer-court-orders-south-western-railway-compensation-for-toilet-water-failure-article-156419750", note: "Additional coverage of the consumer commission's directions." },
  { name: "LawChakra", date: "November 2026", url: "https://lawchakra.in/other-courts/ganga-pollution-bihar-ngt-chief-secretary/", note: "Further report discussing the complaint acknowledgement and consumer-law reasoning; the URL title appears unrelated, so verify the article content before relying on it." },
];

const shareUrl = () => `${window.location.origin}${window.location.pathname}?share=railway-washroom-water-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function TrainWashroomWaterShortageCaseStudyPage() {
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl())}`, "_blank", "noopener,noreferrer");
  const shareX = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("No water in train washrooms: Shivamogga Consumer Commission holds railway station masters liable — Sanhita360 case study")}&url=${encodeURIComponent(shareUrl())}`, "_blank", "noopener,noreferrer");
  const shareNative = async () => {
    const url = shareUrl();
    try {
      if (navigator.share) await navigator.share({ title: document.title, text: "Read this Sanhita360 consumer-law case study.", url });
      else await navigator.clipboard.writeText(url);
    } catch (error) {
      if (error?.name !== "AbortError") window.prompt("Copy this case study link:", url);
    }
  };
  const copyLink = async () => {
    const url = shareUrl();
    try { await navigator.clipboard.writeText(url); window.alert("Case study link copied."); }
    catch { window.prompt("Copy this case study link:", url); }
  };

  return <>
    <SEO title="No Water in Train Washrooms: Shivamogga Consumer Commission Holds Railways Liable | Sanhita360 Case Study" description="A family of 24 discontinued its journey after finding no water in train washrooms. The Shivamogga District Consumer Commission held railway station masters liable and awarded ₹15,000 plus ticket refund with interest." canonical="/case-studies/railway-washroom-water-shortage-shivamogga" keywords={["train toilet water shortage consumer case", "Shivamogga Consumer Commission railway", "T Nagendra v Station Master", "railway deficiency in service", "Consumer Case No. 3 of 2026"]} />
    <Header />
    <main className="ns-water-case">
      <section className="ns-water-hero"><div className="ns-water-wrap">
        <Link to="/#case-studies" className="ns-water-back"><FaArrowLeft /> Case Studies</Link>
        <span className="ns-water-kicker"><FaTrain /> Sanhita360 · Consumer Law Case Study</span>
        <h1>No Water in Train Washrooms: Shivamogga Consumer Commission Holds Railway Station Masters Liable</h1>
        <p>A family of 24 reportedly had to abandon its original train journey after finding no water in the coach washrooms. The Commission held the concerned railway station masters liable for deficiency in service.</p>
        <div className="ns-water-facts"><span><strong>Case:</strong> T. Nagendra v. The Station Master, Yashwanthpura Railway Station & Anr.</span><span><strong>Case No.:</strong> C.C. No. 3 of 2026</span><span><strong>Commission:</strong> District Consumer Disputes Redressal Commission, Shivamogga</span><span><strong>Reported relief:</strong> ₹15,000 + ₹1,000 refund with interest</span></div>
      </div></section>
      <article className="ns-water-wrap ns-water-article">
        <div className="ns-water-notice"><FaShieldAlt /><p><strong>Source and verification note:</strong> This educational case study is based on the news reports listed below, particularly LiveLaw's report dated 10 November 2026. We have not independently examined a certified copy of the Commission's order. Published reports differ on some details, including the order date; where the reports do not align, this article avoids presenting the disputed detail as settled.</p></div>

        <section><span className="ns-water-label">The journey · 15 April 2025</span><h2>What happened to the family of 24?</h2>
          <p>According to LiveLaw, T. Nagendra travelled with 23 family members—20 adults and four children—from Yashwanthpura, Bengaluru, towards Shivamogga on Train No. 66575. The family had purchased tickets at Yashwanthpura on 15 April 2025 for a total fare of ₹1,000.</p>
          <p>Shortly after the train departed, passengers, particularly women and children, reportedly found that the washrooms in their coach had no water supply. The complainant raised the issue with Railway Police personnel on board, but the problem was not resolved.</p>
          <p>On the Railway Police's advice, the family got down at Tumakuru and submitted a complaint to the Station Master. The complaint was acknowledged as No. 028948 on 15 April 2025. As the water problem remained unresolved, the family discontinued the original journey and bought fresh tickets worth ₹1,760 to continue to Shivamogga on another train.</p>
        </section>

        <section><span className="ns-water-label">The consumer complaint</span><h2>What happened after the journey?</h2>
          <p>Nagendra reportedly issued a legal notice to the railway authorities on 28 August 2025, seeking refund of the original ticket fare and compensation for the inconvenience and hardship. The reports state that the authorities did not provide a satisfactory response, following which he approached the Shivamogga District Consumer Disputes Redressal Commission.</p>
          <p>The Railways denied the allegation that the coach washrooms lacked water. As summarised by LiveLaw, the railway authorities argued that coaches were watered before departure and that no passenger complaint had been registered through the channels they referred to. The Commission considered the written complaint acknowledged at Tumakuru along with the travel documents.</p>
        </section>

        <section><span className="ns-water-label">The Commission's reasoning</span><h2>Why did the Commission find deficiency in service?</h2>
          <p>The Commission reportedly noted that the complainant had produced the original tickets, additional tickets purchased after leaving the train and the acknowledged complaint made to the Tumakuru Station Master. The railway authorities, according to the reports, did not produce evidence establishing that water was available in the relevant coach washrooms or adequately address the complaint lodged at Tumakuru.</p>
          <p>The initial complaint and legal notice reportedly contained an incorrect travel year—15 April 2024 instead of 15 April 2025. The Commission treated this as a typographical error in light of the tickets and the acknowledged station complaint. 24Law reports that an amendment correcting the date was allowed on 14 May 2026.</p>
          <blockquote>“Whether a complaint by the Passenger/s is of much gravity and grave concern or even a trivial matter, the concerned Railway Authorities are duty bound to address/resolve the complaint in a suitable manner and a compliance/reply to be communicated to the complainant along with the details of the action taken on the complaint”</blockquote>
          <p>This observation is reproduced in LiveLaw's report as a passage from paragraph 27 of the Commission's decision. It underlines the importance of responding to passenger complaints and communicating what action has been taken.</p>
        </section>

        <section><span className="ns-water-label">Relief reported in the news coverage</span><h2>What did the Commission direct?</h2>
          <div className="ns-water-award"><div><strong>₹10,000</strong><span>Compensation for inconvenience, hardship and mental agony</span></div><div><strong>₹5,000</strong><span>Litigation costs</span></div><div><strong>₹1,000</strong><span>Original ticket fare refund + interest</span></div></div>
          <p>The reports state that the Station Masters of Yashwanthpura and Tumakuru Railway Stations were held jointly and severally liable. The directions, as reported, were:</p>
          <ul><li>Refund ₹1,000 towards the original ticket fare, with interest at 6% per annum from 15 April 2025;</li><li>Pay ₹10,000 as compensation for inconvenience, hardship and mental agony; and</li><li>Pay ₹5,000 towards litigation expenses.</li></ul>
          <p>The amounts were reportedly payable within 45 days. In case of default, the reported order provides for 10% annual interest: on the fare refund from 15 April 2025, and on compensation and litigation costs from the date of the order until realisation.</p>
          <p><strong>Important:</strong> The additional ₹1,760 spent on replacement train tickets is part of the reported facts. The published summaries reviewed here do not say that this amount was separately awarded. The reported relief is the ₹1,000 original fare refund, ₹10,000 compensation and ₹5,000 litigation costs, with applicable interest.</p>
        </section>

        <section><span className="ns-water-label">Practical lessons for passengers</span><h2>What should you do if basic facilities fail during a train journey?</h2>
          <ol><li><strong>Report the issue promptly:</strong> Inform the TTE, on-board railway staff or Railway Police and ask that the complaint be recorded.</li><li><strong>Use official complaint channels:</strong> If possible, raise the issue through Rail Madad or the railway helpline and save the reference number.</li><li><strong>Make a written complaint at the station:</strong> If advised to get down, submit a written complaint to the Station Master and obtain an acknowledgement with date and reference number.</li><li><strong>Preserve travel records:</strong> Keep the original ticket, PNR, coach details, additional tickets and receipts for alternative travel.</li><li><strong>Document the service failure:</strong> Note the train number, coach, time, station and staff approached. Preserve lawful photographs or videos where appropriate.</li><li><strong>Send a written grievance:</strong> Identify the journey, complaint acknowledgement, assistance sought and relief requested. Keep proof of delivery and any response.</li><li><strong>Consider consumer remedies:</strong> If the grievance remains unresolved, obtain advice on the appropriate Consumer Commission, limitation, parties and supporting evidence.</li></ol>
        </section>

        <section><span className="ns-water-label">Consumer-law significance</span><h2>Why this decision matters beyond a water shortage</h2>
          <p>The reported decision is significant not merely because an essential facility was unavailable, but because the passenger's complaint at the intermediate station was allegedly not resolved or answered. The Commission's reported observation is that railway authorities must address passenger grievances and communicate the action taken—even where the complaint may appear minor.</p>
          <p>The case does not mean that every complaint about a train facility automatically results in compensation. The outcome depends on the evidence, the service obligation, the response of the railway authorities and the findings of the competent Commission in each case.</p>
        </section>

        <section><span className="ns-water-label">Case identification</span><h2>Reported case details</h2>
          <p><strong>Cause title:</strong> T. Nagendra v. The Station Master, Yashwanthpura Railway Station & Anr.<br/><strong>Case number:</strong> C.C. No. 3 of 2026 (as reported by 24Law)<br/><strong>Forum:</strong> District Consumer Disputes Redressal Commission, Shivamogga<br/><strong>Coram:</strong> President T. Shivanna (Retired District Judge) and Member B. D. Yogananda (names/spelling as reported)<br/><strong>Train:</strong> No. 66575<br/><strong>Journey date:</strong> 15 April 2025</p>
          <p>News reports refer to the decision as having been passed in October 2026, but they do not consistently state the same date. Check the Commission's original order for the authoritative date and exact operative directions.</p>
        </section>

        <div className="ns-water-sources"><h2>All located news reports and references</h2><p>These are the published reports located for this case. They are secondary sources, not substitutes for the Commission's order.</p>
          {sources.filter(s => !s.name.includes("LawChakra")).map(source => <div className="ns-water-source" key={source.name}><div><strong>{source.name}</strong><small>{source.date}</small><p>{source.note}</p></div><a href={source.url} target="_blank" rel="noopener noreferrer">Read report <FaExternalLinkAlt /></a></div>)}
        </div>
        <div className="ns-water-disclaimer"><FaBalanceScale /><p><strong>Disclaimer:</strong> This case study is for public legal education and is based on secondary news reporting. Sanhita360 has not independently verified the certified order. The article is not legal advice. Please read the original Commission order and applicable law before relying on the decision in a legal proceeding.</p></div>

        <section className="ns-water-forward"><h2><FaShareAlt /> Share / Forward This Case Study</h2><p>Share this case study to raise awareness about passenger rights and railway service obligations.</p><div className="ns-water-forward-actions"><button type="button" onClick={shareFacebook}><FaFacebookF /> Facebook</button><button type="button" onClick={shareX}>𝕏 Share on X</button><button type="button" onClick={shareNative}><FaShareAlt /> Share / Forward</button><button type="button" onClick={copyLink}><FaLink /> Copy Link</button></div></section>
        <Link to="/#case-studies" className="ns-water-back-bottom"><FaArrowLeft /> Back to all Case Studies</Link>
      </article>
    </main>
    <Footer />
    <style>{`
      .ns-water-case{color:#1e293b}.ns-water-wrap{width:min(100% - 40px,960px);margin:auto}.ns-water-hero{padding:64px 0 58px;background:linear-gradient(135deg,#0f172a,#164e63);color:#fff}
      .ns-water-back,.ns-water-back-bottom{display:inline-flex;align-items:center;gap:8px;color:inherit;text-decoration:none;font-weight:700}.ns-water-kicker{display:flex;align-items:center;gap:9px;margin-top:30px;color:#bae6fd;font-weight:800;text-transform:uppercase;letter-spacing:.06em;font-size:13px}
      .ns-water-hero h1{max-width:900px;margin:16px 0;font-size:clamp(32px,5vw,48px);line-height:1.15}.ns-water-hero>div>p{max-width:820px;color:#e0f2fe;font-size:18px;line-height:1.7}
      .ns-water-facts{display:flex;flex-wrap:wrap;gap:12px 25px;margin-top:25px;color:#e2e8f0;font-size:13px}.ns-water-article{padding:42px 0 75px}
      .ns-water-notice,.ns-water-disclaimer{display:flex;gap:14px;padding:18px 20px;border:1px solid #bae6fd;border-radius:12px;background:#f0f9ff;color:#0c4a6e}.ns-water-notice>svg,.ns-water-disclaimer>svg{flex-shrink:0;margin-top:4px}
      .ns-water-article section{margin:38px 0}.ns-water-label{color:#0369a1;font-size:12px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}
      .ns-water-article h2{margin:8px 0 14px;color:#0f172a;font-size:clamp(24px,3vw,30px)}.ns-water-article p,.ns-water-article li{color:#475569;font-size:16px;line-height:1.85}
      .ns-water-article ul,.ns-water-article ol{padding-left:23px}.ns-water-article li{margin:9px 0}.ns-water-article blockquote{margin:22px 0;padding:18px 22px;border-left:4px solid #0e7490;background:#ecfeff;color:#164e63;font-size:16px;line-height:1.85}
      .ns-water-award{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:22px 0}.ns-water-award>div{padding:18px;border-radius:12px;background:#eff6ff;border:1px solid #bfdbfe;display:flex;flex-direction:column;gap:5px}
      .ns-water-award strong{font-size:clamp(22px,3vw,30px);color:#1d4ed8}.ns-water-award span{font-size:13px;color:#475569;line-height:1.5}
      .ns-water-sources{margin:46px 0}.ns-water-source{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:17px 0;border-bottom:1px solid #e2e8f0}
      .ns-water-source small{display:block;color:#64748b;margin-top:3px}.ns-water-source p{margin:5px 0 0;font-size:14px}.ns-water-source a{display:inline-flex;align-items:center;gap:7px;white-space:nowrap;color:#0369a1;font-weight:750;text-decoration:none}
      .ns-water-disclaimer{background:#fffbeb;border-color:#fde68a;color:#92400e;margin:25px 0}.ns-water-disclaimer p{color:#78350f;margin:0}.ns-water-back-bottom{color:#0369a1;margin-top:20px}
      .ns-water-forward{margin:32px 0;padding:24px;border:1px solid #dbe5ef;border-radius:15px;background:#fff;box-shadow:0 8px 24px #0f172a0a}.ns-water-forward h2{display:flex;align-items:center;gap:10px;margin:0;color:#0f172a;font-size:23px}.ns-water-forward h2 svg{color:#0369a1}
      .ns-water-forward>p{margin:8px 0 0}.ns-water-forward-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.ns-water-forward-actions button{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:42px;padding:0 16px;border:0;border-radius:9px;background:#0369a1;color:#fff;font:inherit;font-size:14px;font-weight:750;cursor:pointer}
      .ns-water-forward-actions button:first-child{background:#1877f2}.ns-water-forward-actions button:nth-child(2){background:#111827}.ns-water-forward-actions button:last-child{background:#e9eef4;color:#18324b}
      @media(max-width:640px){.ns-water-wrap{width:min(100% - 30px,960px)}.ns-water-hero{padding:42px 0}.ns-water-facts{display:grid;gap:9px}.ns-water-article{padding-top:28px}.ns-water-article p,.ns-water-article li{font-size:15px}.ns-water-award{grid-template-columns:1fr}.ns-water-source{align-items:flex-start;flex-direction:column;gap:8px}.ns-water-forward{padding:18px}.ns-water-forward-actions{display:grid;grid-template-columns:1fr 1fr}.ns-water-forward-actions button{padding:0 8px;font-size:12px}}
    `}</style>
  </>;
}
