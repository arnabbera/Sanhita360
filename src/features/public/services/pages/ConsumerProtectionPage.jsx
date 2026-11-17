import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaFileAlt, FaBalanceScale, FaShoppingCart, FaRupeeSign, FaShieldAlt, FaTwitter } from "react-icons/fa";
import Header from "../../../home/components/Header";
import Footer from "../../../home/components/Footer";
import SEO from "../../../../shared/seo/SEO";
import { Styles } from "./LegalServiceDetailsPage";

const title = "Consumer Protection & Consumer Dispute Legal Guidance";
const description = "Understand consumer rights and complaint procedures under the Consumer Protection Act, 2019. Sanhita360 shares legal information and guidance on defective goods, deficient services, online shopping, refunds, banking, insurance and consumer disputes in Kolkata and West Bengal.";
const assistance = [
  { title: "Defective Goods & Product Issues", description: "Review disputes involving defective, damaged, unsafe, counterfeit or misdescribed products and assess remedies such as repair, replacement, refund or compensation." },
  { title: "Online Shopping & E-commerce", description: "Assistance with undelivered orders, wrong products, rejected returns, withheld refunds, misleading listings and unresolved marketplace complaints." },
  { title: "Deficiency in Services", description: "Assess complaints concerning poor or incomplete services, unreasonable delays and service failures, subject to applicable law and exclusions." },
  { title: "Unfair Trade Practices", description: "Review misleading representations, hidden charges, deceptive offers, false claims and other alleged unfair trade practices." },
  { title: "Complaint Documentation Guidance", description: "Understand how to organise a grievance, prepare an event chronology and identify the supporting documents commonly needed for a consumer complaint." },
  { title: "Consumer Commission Process", description: "Understand the general roles of District, State and National Consumer Commissions, filing steps, responses, appeals and available remedies." },
];
const documents = ["Invoice, bill, receipt or proof of payment","Order confirmation, booking details or service agreement","Warranty, guarantee and product or service description","Emails, chats, SMS messages and complaint-ticket numbers","Photographs, videos, inspection reports or proof of defect","Refund, return, cancellation or rejection communications","A dated chronology of events and the relief sought"];

export default function ConsumerProtectionPage() {
  const [copyStatus, setCopyStatus] = useState("");
  const shareUrl = "https://www.sanhita360.com/services/consumer-protection";
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); setCopyStatus("Link copied"); }
    catch { setCopyStatus("Please copy the link below"); }
  };
  const contact = "https://wa.me/919830015487?text=" + encodeURIComponent("Hello Sanhita360, I need legal assistance with a consumer dispute. The issue concerns: ");
  return <>
    <SEO title="Consumer Protection Act 2019: Consumer Rights & Complaint Guidance in Kolkata" description={description} canonical="/services/consumer-protection" image="/images/Legal-services/consumer-protection.png" keywords={["Consumer Protection Act 2019 Kolkata","consumer rights Kolkata","consumer complaint procedure West Bengal","consumer commission Kolkata","consumer dispute guidance","online shopping refund complaint India","deficiency in service consumer complaint","banking insurance consumer grievance"]} />
    <Header />
    <main className="ns-service-page">
      <section className="ns-service-hero"><div className="ns-service-wrap">
        <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Legal Services</span><span>/</span><span>Consumer Protection</span></nav>
        <p className="eyebrow">Sanhita360 · Consumer Protection</p>
        <h1>{title}</h1><p>{description}</p>
        <div className="ns-consumer-hero-points"><span><FaShoppingCart /> Online shopping disputes</span><span><FaRupeeSign /> Refund & compensation claims</span><span><FaBalanceScale /> Consumer Commission support</span></div>
        <img src="/images/Legal-services/consumer-protection.png" alt="Consumer protection and legal guidance for consumer complaints" width="1200" height="675" fetchPriority="high" style={{display:"block",width:"100%",height:"auto",marginTop:28,borderRadius:16}} />
      </div></section>
      <section className="ns-service-body"><div className="ns-service-wrap ns-service-grid"><article>
        <div className="ns-service-card"><h2><FaShieldAlt /> Protecting Your Consumer Rights</h2><p>When a seller, manufacturer or service provider does not resolve a genuine grievance, you may have remedies under the Consumer Protection Act, 2019 and other applicable laws. Sanhita360 helps you understand the issue, organise the evidence and identify a practical legal route based on the facts.</p><p>Sanhita360 currently offers this support free of charge as consumer-awareness information and general grievance guidance. We focus on clear documentation, understanding the appropriate forum and identifying practical next steps. A refund or compensation is not automatic; available relief depends on the evidence, applicable law and decision of the competent authority or Commission.</p></div>
        <div className="ns-service-card ns-service-assistance"><h2><FaCheckCircle /> Consumer Matters We Assist With</h2><p className="ns-service-intro">Our consumer protection service can assist with:</p><div className="ns-assistance-grid">{assistance.map((item) => <section key={item.title}><FaCheckCircle /><div><h3>{item.title}</h3><p>{item.description}</p></div></section>)}</div></div>
        <div className="ns-service-card"><h2><FaFileAlt /> Documents to Keep Ready</h2><p>The exact checklist depends on the product, service and relief sought.</p><ul>{documents.map((item) => <li key={item}><FaFileAlt />{item}</li>)}</ul></div>
        <div className="ns-service-card"><h2>How the Process Works</h2><ol><li><strong>Share your grievance:</strong> Explain what you purchased or which service you used, when the problem arose and what response you received.</li><li><strong>Review the evidence:</strong> We review invoices, agreements, communications, complaint records and relevant documents.</li><li><strong>Identify the route:</strong> Options may include a seller or platform grievance, the National Consumer Helpline, mediation where available, or a complaint before the competent Consumer Commission.</li><li><strong>Prepare the case:</strong> We provide general information on organising supporting documents and understanding filing requirements. We do not prepare pleadings as legal representatives or appear for consumers.</li><li><strong>Plan next steps:</strong> We discuss responses, hearing preparation, settlement options and further remedies that may be available.</li></ol></div>
        <div className="ns-service-card"><h2>Possible Consumer Remedies</h2><p>Depending on the facts and the forum’s powers, relief may include removal of a defect, replacement, refund, compensation, discontinuance of an unfair trade practice, withdrawal of hazardous goods or costs. The Consumer Commission decides what relief, if any, is justified on the evidence.</p></div>
        <div className="ns-service-card"><h2>Service Area & Consultation</h2><p>Free initial consumer-awareness consultations are available for consumer matters from Kolkata and other locations in India. We can explain general complaint procedures, document organisation and publicly available resources. Forum, territorial and pecuniary jurisdiction, limitation and representation requirements depend on the individual facts and should be independently verified.</p></div>
      </article><aside>
        <div className="ns-service-cta"><h2>Need Help Understanding a Consumer Dispute?</h2><p>Ask for free consumer-awareness guidance. Share a short summary of the issue and we can help you understand general procedures, documents and official grievance-redressal options.</p><a href={contact} target="_blank" rel="noopener noreferrer">Request Free Guidance <FaArrowRight /></a></div>
        <div className="ns-service-note"><strong>Scope of Free Support</strong><p>Sanhita360 currently provides free consumer-awareness information and general grievance-procedure guidance. This is an educational support service, not formal legal advice or legal representation. Sanhita360 is not a law firm and does not act as an advocate or appear for consumers before any court or Consumer Commission. Users remain responsible for verifying applicable law, limitation periods, filing requirements and taking their own legal decisions. No outcome is guaranteed.</p></div>
        <div className="ns-service-note"><strong>Useful Official Resource</strong><p>Consumers may also approach the National Consumer Helpline for official grievance-redressal support. Sanhita360 guidance is free at present.</p><a href="https://consumerhelpline.gov.in/" target="_blank" rel="noopener noreferrer">National Consumer Helpline <FaArrowRight /></a></div>
      </aside></div></section>
      <section className="ns-service-wrap ns-property-share"><h2>Share this page</h2><p>Help someone understand the legal options available in a consumer dispute.</p><div className="ns-property-share-actions"><a href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer">Facebook</a><a className="ns-share-x-button" aria-label="Share this Consumer Protection service page on X" title="Share on X" href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(title + " — Sanhita360") + "&url=" + encodeURIComponent(shareUrl + "?share=consumer-protection-card-v1")} target="_blank" rel="noopener noreferrer"><FaTwitter aria-hidden="true" /> Share on X</a><button type="button" onClick={copyLink}>Copy Link</button></div><p role="status" aria-live="polite">{copyStatus}</p>{copyStatus === "Please copy the link below" && <input aria-label="Page link to copy" readOnly value={shareUrl} onFocus={(event) => event.target.select()} style={{width:"100%"}} />}</section>
    </main><Footer /><Styles />
  </>;
}
