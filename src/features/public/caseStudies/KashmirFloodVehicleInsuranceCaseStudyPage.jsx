import { FaArrowLeft, FaBalanceScale, FaExternalLinkAlt, FaShieldAlt, FaFacebookF, FaShareAlt, FaLink, FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../home/components/Header";
import Footer from "../../home/components/Footer";
import SEO from "../../../shared/seo/SEO";

const sources = [
  { name: "LiveLaw", date: "11 November 2026", url: "https://www.livelaw.in/consumer-cases/vehicle-washed-away-in-floods-jk-state-commission-directs-national-insurance-to-pay-785-lakh-558060", note: "News report on the J&K State Commission's decision, facts, reasoning and award." },
  { name: "24Law", date: "11 November 2026", url: "https://24law.in/story/vehicle-washed-away-in-2014-kashmir-floods-j-k-state-commission-holds-national-insurance-liable-for", note: "Additional report detailing the insurer's claim note, RTO inspection and calculation stated in the report." },
  { name: "LawChakra", date: "11 November 2026", url: "https://lawchakra.in/other-courts/non-registration-defence/", note: "Further report discussing the Commission's reasoning, prior flood-related orders and reported order date." },
];

const shareUrl = () => `${window.location.origin}${window.location.pathname}?share=kashmir-flood-insurance-case`;

export default function KashmirFloodVehicleInsuranceCaseStudyPage() {
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl())}`, "_blank", "noopener,noreferrer");
  const shareX = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Vehicle washed away in 2014 Kashmir floods: J&K State Commission directs National Insurance to pay ₹7.85 lakh | Sanhita360")}&url=${encodeURIComponent(shareUrl())}`, "_blank", "noopener,noreferrer");
  const shareNative = async () => { const url = shareUrl(); try { if (navigator.share) await navigator.share({ title: document.title, text: "Read this Sanhita360 consumer-law case study.", url }); else await navigator.clipboard.writeText(url); } catch (error) { if (error?.name !== "AbortError") window.prompt("Copy this case study link:", url); } };
  const copyLink = async () => { const url = shareUrl(); try { await navigator.clipboard.writeText(url); window.alert("Case study link copied."); } catch { window.prompt("Copy this case study link:", url); } };

  return <>
    <SEO title="Car Washed Away in Kashmir Floods: National Insurance Ordered to Pay ₹7.85 Lakh | Sanhita360" description="J&K State Consumer Commission holds National Insurance guilty of deficiency in service after a Wagon R was washed away in the 2014 floods. Understand the non-registration defence, RTO delay and consumer-law lessons." canonical="/case-studies/kashmir-flood-vehicle-insurance-claim-national-insurance" keywords={["National Insurance flood claim consumer case","vehicle insurance claim repudiation non-registration","Mohammad Yahya Khan National Insurance","J&K State Consumer Commission insurance claim","motor insurance deficiency in service","Consumer Protection Act insurance dispute"]} />
    <Header />
    <main className="ns-flood-case">
      <section className="ns-flood-hero"><div className="ns-flood-wrap">
        <Link to="/#case-studies" className="ns-flood-back"><FaArrowLeft /> Case Studies</Link>
        <span className="ns-flood-kicker"><FaCar /> Sanhita360 · Consumer Law Case Study</span>
        <h1>Vehicle Washed Away in 2014 Kashmir Floods: J&amp;K State Commission Directs National Insurance to Pay ₹7.85 Lakh</h1>
        <p>A new car was lost in devastating floods before its permanent registration certificate was issued. The State Consumer Commission reportedly found that the insurer could not rely solely on non-registration when the owner had already initiated the registration process and the vehicle was not being driven on a public road.</p>
        <div className="ns-flood-facts"><span><strong>Case:</strong> Mohammad Yahya Khan v. National Insurance Company Ltd. &amp; Anr.</span><span><strong>Case No.:</strong> C.C. No. 715 A of 2015</span><span><strong>Reported order date:</strong> 15 October 2026</span><span><strong>Reported award:</strong> ₹7,85,963</span></div>
      </div></section>
      <article className="ns-flood-wrap ns-flood-article">
        <div className="ns-flood-notice"><FaShieldAlt /><p><strong>Source and verification note:</strong> This educational case study is based on the news reports listed below. The original Commission order was not independently available for review while preparing this article. The reports contain a numerical inconsistency in the stated award components; that discrepancy is flagged below rather than silently reconciled.</p></div>
        <section><span className="ns-flood-label">Background</span><h2>What happened to the vehicle?</h2>
          <p>According to the reports, Mohammad Yahya Khan purchased a Maruti Suzuki Wagon R Stingray VXI from Jamkash Vehicleades (Kashmir) Pvt. Ltd. on 28 July 2014. The vehicle was insured with National Insurance Company Ltd. for an Insured Declared Value (IDV) of ₹4,55,767. The policy period was reported as 28 July 2014 to 27 July 2015.</p>
          <p>During the devastating Kashmir floods in September 2014, the vehicle was washed away and could not be traced. The loss occurred during the stated policy period.</p>
        </section>
        <section><span className="ns-flood-label">The insurance dispute</span><h2>Why did National Insurance reject the claim?</h2>
          <p>The complainant lodged an insurance claim. National Insurance repudiated it by letter dated 8 July 2015, stating that the vehicle had not been permanently registered with the concerned Regional Transport Office (RTO) when the loss occurred.</p>
          <p>The insurer's internal claim note reportedly recorded that the loss had been investigated and found genuine, and that the vehicle had been washed away in the floods. Nevertheless, the claim was recommended for closure as a “No Claim” because the permanent Registration Certificate (RC) had not been furnished after expiry of the temporary registration.</p>
          <p>The complainant's position, as reflected in the reports, was that he had submitted the required documents and fee to the RTO, but the permanent registration had not been completed before the floods.</p>
        </section>
        <section><span className="ns-flood-label">Evidence considered</span><h2>Why was the RTO inspection important?</h2>
          <p>The Commission reportedly relied on a vehicle inspection report issued by the Chief Inspector, Board of Inspection, Srinagar. It showed that RTO officials had inspected the vehicle on 30 August 2014—before the floods. The Commission treated this as support for the complainant's case that the registration process had already been initiated.</p>
          <p>The reports also state that the insurer did not lead evidence or file written arguments despite opportunities. It had been directed to place the complete policy terms and conditions on record but did not produce them.</p>
        </section>
        <section><span className="ns-flood-label">Commission's reasoning</span><h2>Could the insurer rely on non-registration alone?</h2>
          <p><strong>1. The owner should not bear an administrative delay.</strong> The Commission reportedly observed that the complainant had applied for registration before the loss and could not be penalised for delay attributable to the RTO.</p>
          <p><strong>2. The vehicle was parked, not being driven.</strong> The vehicle was reportedly parked when the floods occurred. The Commission therefore found that Section 39 of the Motor Vehicles Act, 1988—which concerns the requirement of registration for use of a motor vehicle in a public place—did not establish a contravention on these facts.</p>
          <p><strong>3. A statutory breach does not automatically establish a policy exclusion.</strong> The Commission reportedly reasoned that even an alleged contravention of another statute would not, by itself, give an insurer an automatic right to repudiate a claim unless the insurance policy contained a corresponding condition. The insurer's failure to produce the complete policy terms was therefore significant.</p>
          <p><strong>4. Earlier similar decisions were relevant.</strong> The Commission referred to a common order dated 30 June 2015 in four similar flood-related matters, including two involving National Insurance, where the non-registration objection had reportedly been rejected.</p>
        </section>
        <section><span className="ns-flood-label">The reported outcome</span><h2>What amount was National Insurance directed to pay?</h2>
          <div className="ns-flood-award"><div><strong>₹7,85,963</strong><span>Reported total award</span></div><div><strong>30 days</strong><span>Reported time for payment</span></div><div><strong>6% p.a.</strong><span>Further interest on default</span></div></div>
          <p>The complaint was allowed and National Insurance Company Ltd. was directed to pay the complainant ₹7,85,963 within 30 days. The reports describe the award as including the vehicle's IDV after policy excess, compensation for delay calculated at 6% per annum, and ₹50,000 towards mental agony and litigation expenses.</p>
          <p><strong>Important arithmetic discrepancy in the news reports:</strong> 24Law describes ₹4,27,175 as the IDV after policy excess, ₹3,09,788 as delay compensation and ₹50,000 as mental-agony and litigation expenses. Those figures add up to ₹7,86,963, not the reported total of ₹7,85,963. LawChakra also describes the components in a way that does not clearly reconcile the total. The exact component-wise award should therefore be confirmed from the signed Commission order before being quoted in any legal filing or relied upon for enforcement.</p>
          <p>In case of non-payment within the stipulated period, the reports state that additional interest at 6% per annum would apply to the awarded amount from 16 October 2026 until payment.</p>
        </section>
        <section><span className="ns-flood-label">Consumer-law learning</span><h2>Practical lessons for motor insurance policyholders</h2>
          <ol>
            <li><strong>Complete registration promptly.</strong> Apply for permanent registration as soon as possible and retain the application acknowledgement, fee receipt and all communications with the RTO.</li>
            <li><strong>Preserve proof of administrative steps.</strong> Keep inspection reports, forms, tax receipts, dealer correspondence and any evidence showing when the registration process began.</li>
            <li><strong>Read the complete policy wording.</strong> Do not rely only on the policy schedule. Check exclusions, conditions, duties after an accident or loss, and the applicable excess.</li>
            <li><strong>Notify the insurer immediately.</strong> Report the loss within the policy's required time, obtain a claim reference and preserve all surveyor or investigator communications.</li>
            <li><strong>Document total loss.</strong> Keep police reports, missing-vehicle records, flood-related evidence, photographs, witness details and the insurer's investigation correspondence, as applicable.</li>
            <li><strong>Challenge a repudiation with reasons and records.</strong> Ask the insurer for the precise policy clause relied upon and a reasoned repudiation letter. Use the insurer's grievance process and appropriate external remedies where necessary.</li>
            <li><strong>Check limitation and forum jurisdiction.</strong> Obtain case-specific advice promptly. A consumer complaint is subject to statutory limitation and jurisdictional requirements; this reported outcome does not guarantee the same result in another case.</li>
          </ol>
        </section>
        <section><span className="ns-flood-label">Case identification</span><h2>Reported case details</h2>
          <p><strong>Cause title:</strong> Mohammad Yahya Khan v. National Insurance Company Ltd. &amp; Another<br/><strong>Case number:</strong> C.C. No. 715 A of 2015<br/><strong>Forum:</strong> Jammu and Kashmir State Consumer Disputes Redressal Commission, Srinagar<br/><strong>Coram:</strong> Nighat Sultana, President (Officiating), and Maheep Gupta, Member<br/><strong>Reported order date:</strong> 15 October 2026<br/><strong>Insurer's repudiation letter:</strong> 8 July 2015</p>
        </section>
        <div className="ns-flood-sources"><h2>News reports and references</h2><p>These are independent news reports about the same consumer decision. They are secondary sources, not substitutes for the signed order or the insurance policy.</p>
          {sources.map(source => <div className="ns-flood-source" key={source.name}><div><strong>{source.name}</strong><small>{source.date}</small><p>{source.note}</p></div><a href={source.url} target="_blank" rel="noopener noreferrer">Read report <FaExternalLinkAlt /></a></div>)}
        </div>
        <div className="ns-flood-disclaimer"><FaBalanceScale /><p><strong>Disclaimer:</strong> This case study is for public legal education and consumer awareness. It is a summary of secondary news reporting, not legal advice or a certified reproduction of the Commission's order. The decision turns on its own evidence and policy wording; it does not mean every vehicle-insurance claim involving an unregistered vehicle must be accepted. Verify the original order, current law, policy terms and limitation requirements before taking action.</p></div>
        <section className="ns-flood-forward"><h2><FaShareAlt /> Share / Forward This Case Study</h2><p>Share this consumer-law decision to spread awareness about motor insurance claims and fair claim settlement.</p><div className="ns-flood-actions"><button onClick={shareFacebook}><FaFacebookF /> Facebook</button><button onClick={shareX}>𝕏 Share on X</button><button onClick={shareNative}><FaShareAlt /> Share / Forward</button><button onClick={copyLink}><FaLink /> Copy Link</button></div></section>
        <Link to="/#case-studies" className="ns-flood-back-bottom"><FaArrowLeft /> Back to all Case Studies</Link>
      </article>
    </main>
    <Footer />
    <style>{`
      .ns-flood-case{color:#1e293b}.ns-flood-wrap{width:min(100% - 40px,960px);margin:auto}.ns-flood-hero{padding:64px 0 58px;background:linear-gradient(135deg,#111827,#164e63);color:#fff}.ns-flood-back,.ns-flood-back-bottom{display:inline-flex;align-items:center;gap:8px;color:inherit;text-decoration:none;font-weight:700}.ns-flood-kicker{display:flex;align-items:center;gap:9px;margin-top:30px;color:#bae6fd;font-weight:800;text-transform:uppercase;letter-spacing:.06em;font-size:13px}.ns-flood-hero h1{max-width:900px;margin:16px 0;font-size:clamp(32px,5vw,48px);line-height:1.15}.ns-flood-hero>div>p{max-width:820px;color:#e0f2fe;font-size:18px;line-height:1.7}.ns-flood-facts{display:flex;flex-wrap:wrap;gap:12px 25px;margin-top:25px;color:#e2e8f0;font-size:13px}.ns-flood-article{padding:42px 0 75px}.ns-flood-notice,.ns-flood-disclaimer{display:flex;gap:14px;padding:18px 20px;border:1px solid #bae6fd;border-radius:12px;background:#f0f9ff;color:#0c4a6e}.ns-flood-notice>svg,.ns-flood-disclaimer>svg{flex-shrink:0;margin-top:4px}.ns-flood-article section{margin:38px 0}.ns-flood-label{color:#0369a1;font-size:12px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.ns-flood-article h2{margin:8px 0 14px;color:#0f172a;font-size:clamp(24px,3vw,30px)}.ns-flood-article p,.ns-flood-article li{color:#475569;font-size:16px;line-height:1.85}.ns-flood-article ol{padding-left:23px}.ns-flood-article li{margin:9px 0}.ns-flood-award{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:22px 0}.ns-flood-award div{padding:22px;border-radius:12px;background:#ecfeff;text-align:center}.ns-flood-award strong{display:block;color:#0e7490;font-size:30px}.ns-flood-award span{color:#475569;font-size:13px}.ns-flood-sources{margin:45px 0;padding:26px;border:1px solid #e2e8f0;border-radius:16px}.ns-flood-source{display:flex;justify-content:space-between;gap:20px;padding:18px 0;border-top:1px solid #e2e8f0}.ns-flood-source small{display:block;margin-top:4px;color:#64748b}.ns-flood-source p{margin:7px 0 0;font-size:14px}.ns-flood-source a{display:flex;align-items:center;gap:7px;flex-shrink:0;color:#0369a1;text-decoration:none;font-weight:700;font-size:13px}.ns-flood-disclaimer{margin:28px 0;background:#fff7ed;border-color:#fed7aa;color:#9a3412}.ns-flood-forward{padding:24px;border-radius:16px;background:#f1f5f9}.ns-flood-forward h2{display:flex;align-items:center;gap:10px}.ns-flood-actions{display:flex;flex-wrap:wrap;gap:10px}.ns-flood-actions button{display:inline-flex;align-items:center;gap:8px;padding:11px 15px;border:0;border-radius:8px;background:#0f172a;color:#fff;font-weight:700;cursor:pointer}.ns-flood-back-bottom{margin-top:20px;color:#0369a1}@media(max-width:640px){.ns-flood-award{grid-template-columns:1fr}.ns-flood-source{flex-direction:column}.ns-flood-hero{padding:45px 0}.ns-flood-article{padding-top:28px}}
    `}</style>
  </>;
}
