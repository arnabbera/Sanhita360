import { Link } from "react-router-dom";
import Header from "../../../home/components/Header";
import Footer from "../../../home/components/Footer";
import SEO from "../../../../shared/seo/SEO";
import LegalUpdateShare from "../components/LegalUpdateShare";

const path = "/legal-remedies/section-156-3-crpc-section-175-3-bnss";
export default function Section175BnssPage() {
  return <>
    <SEO title="Section 156(3) CrPC to Section 175(3) BNSS: Police Investigation Remedy" description="Police refusing to register an FIR? Understand the Magistrate's investigation power, prior SP complaint, affidavit and safeguards under Section 175(3) BNSS." canonical={path} image="/images/legal-updates/section-175-bnss-v2.jpg" />
    <Header />
    <main className="ns-investigation-post">
      <header className="ns-investigation-hero"><div>
        <Link to="/#legal-remedies">← Legal Remedies</Link>
        <p>CRIMINAL PROCEDURE · 20 OCTOBER 2026</p>
        <h1>Police Refusing to Register an FIR? Understanding Section 175(3) BNSS</h1>
        <p>Section 156(3) CrPC corresponds to Section 175(3) BNSS: a route to seek a Magistrate’s direction for police investigation, with additional safeguards.</p>
      </div></header>
      <article>
        <img className="ns-investigation-banner" src="/images/legal-updates/section-175-bnss-v2.jpg" alt="Section 156(3) CrPC to Section 175(3) BNSS: police complaint, Superintendent of Police, Judicial Magistrate" />
        <p>When a complaint discloses a cognizable offence but the police fail to act, the complainant can approach the jurisdictional Judicial Magistrate for an investigation order.</p>
        <p>This remedy, familiar as <strong>Section 156(3) of the Code of Criminal Procedure, 1973</strong>, now corresponds to <strong>Section 175(3) of the Bharatiya Nagarik Suraksha Sanhita, 2023</strong>, with additional procedural safeguards.</p>
        <h2>What remedy does this section provide?</h2>
        <p>Its central benefit is <strong>access to judicial scrutiny when the police do not act on a criminal complaint</strong>.</p>
        <p>Under Section 156(3) CrPC, an empowered Magistrate could order police investigation into a cognizable case. Section 175(3) BNSS continues that remedy. However, the Magistrate must examine the application and relevant material; an investigation order is not automatic merely because an application has been filed.</p>
        <h2>How can this help a complainant?</h2>
        <p>An investigation can bring police powers and resources to bear on matters that a private individual cannot effectively investigate alone—for example, tracing transactions, obtaining relevant records and examining witnesses.</p>
        <aside><strong>Illustrative situation:</strong> A property buyer discovers documents suggesting that a seller used forged records to obtain payment. The police decline to register the complaint. After taking the required steps before the police authorities, the buyer can ask the Magistrate to consider ordering investigation.</aside>
        <p>The application should explain both <strong>what alleged cognizable offence the facts disclose</strong> and <strong>why police investigation is needed</strong>. A disagreement over money or property should not be presented as a criminal offence without supporting facts.</p>
        <h2>What steps should you take?</h2>
        <ol>
          <li><strong>Submit a clear complaint to the police station.</strong> Set out the events chronologically, identify the alleged wrongdoing and attach relevant documents. Keep proof of submission.</li>
          <li><strong>Approach the Superintendent of Police under Section 173(4) BNSS.</strong> If the police station refuses to record the information, send the substance of the complaint in writing and by post to the concerned Superintendent of Police. Preserve the complaint and delivery records.</li>
          <li><strong>Apply to the jurisdictional Magistrate under Section 175(3).</strong> If the grievance remains unresolved, submit an application supported by an affidavit, enclosing the earlier complaints, submission records and supporting evidence. The Supreme Court has emphasised the prior approach to the Superintendent of Police and the affidavit requirement.</li>
        </ol>
        <h2>What will the Magistrate consider?</h2>
        <p>The BNSS framework requires consideration of the affidavit-supported application, such inquiry as the Magistrate considers necessary, and the police officer’s submissions. These safeguards encourage a reasoned decision rather than a mechanical direction to investigate.</p>
        <p>Complaints against public servants concerning acts connected with their official duties may also attract the additional procedure under <strong>Section 175(4)</strong>. That requirement depends on the connection between the alleged conduct and official duty, rather than the person’s employment alone.</p>
        <h2>What does this section not guarantee?</h2>
        <p>An investigation order is <strong>not a finding of guilt</strong>. It does not itself guarantee arrest, prosecution, conviction, repayment or compensation. Its purpose is to secure investigation where legally justified; the evidence and subsequent proceedings determine the outcome.</p>
        <p><strong>Keep your application factual:</strong> include dates, documents, witnesses, previous complaints and the specific investigative assistance required.</p>
        <h2>Sources and further reading</h2>
        <ul>
          <li><a href="https://www.indiacode.nic.in/handle/123456789/20099" target="_blank" rel="noopener noreferrer">Bharatiya Nagarik Suraksha Sanhita, 2023 — Sections 173 and 175</a></li>
          <li><a href="https://api.sci.gov.in/supremecourt/2019/42365/42365_2019_14_105_58524_Judgement_16-Jan-2025.pdf" target="_blank" rel="noopener noreferrer">Om Prakash Ambadkar v. State of Maharashtra — Supreme Court, 16 January 2025</a></li>
          <li><a href="https://api.sci.gov.in/supremecourt/2025/8626/8626_2025_7_1501_67795_Judgement_27-Jan-2026.pdf" target="_blank" rel="noopener noreferrer">XXX v. State of Kerala — 2026 INSC 88, concerning Sections 175(3) and 175(4)</a></li>
        </ul>
        <p><em>Published for legal awareness by Sanhita360. The procedure applicable to an individual case should be checked before filing.</em></p>
        <Link to="/legal-remedies/remedies-when-police-refuse-to-register-fir">Read more: Legal remedies when police refuse to register an FIR →</Link>
        <LegalUpdateShare canonicalPath={path} shareVersion="section-175-bnss-v2" message="Police refusing to register an FIR? Understand the remedy under Section 175(3) BNSS, corresponding to Section 156(3) CrPC." />
      </article>
    </main><Footer />
    <style>{`
      .ns-investigation-post{background:#f8fafc;color:#172640}.ns-investigation-post *{box-sizing:border-box}
      .ns-investigation-hero{background:linear-gradient(135deg,#0c1c39,#204783);color:white;padding:48px 24px}.ns-investigation-hero>div{max-width:1000px;margin:auto}.ns-investigation-hero a{color:#fde68a}.ns-investigation-hero h1{font-size:clamp(30px,4vw,48px);line-height:1.2}.ns-investigation-hero p{line-height:1.8;max-width:850px}
      .ns-investigation-post article{max-width:920px;margin:auto;padding:32px 24px 64px;line-height:1.85}.ns-investigation-post article h2{font-size:26px;line-height:1.35;margin-top:32px}.ns-investigation-post article a{color:#1d4ed8;overflow-wrap:anywhere}.ns-investigation-post li{margin:14px 0}.ns-investigation-post aside{padding:20px;background:#eff6ff;border-left:4px solid #2563eb;border-radius:8px}.ns-investigation-banner{width:100%;height:auto;border-radius:14px;margin-bottom:22px}
      @media(max-width:600px){.ns-investigation-post article{padding:24px 18px 48px}.ns-investigation-hero{padding:32px 18px}}
    `}</style>
  </>;
}
