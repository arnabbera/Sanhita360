import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaFileAlt, FaFacebookF, FaTwitter, FaWhatsapp, FaLink } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Header from "../../../home/components/Header";
import Footer from "../../../home/components/Footer";
import SEO from "../../../../shared/seo/SEO";
import { getLegalServiceBySlug } from "../data/legalServices";

export default function LegalServiceDetailsPage() {
  const { serviceSlug } = useParams();
  const service = getLegalServiceBySlug(serviceSlug);

  if (!service) return <><Header /><main className="ns-service-missing"><h1>Legal Service Not Found</h1><Link to="/"><FaArrowLeft /> Return Home</Link></main><Footer /><Styles /></>;

  return <>
    <SEO title={`${service.title} Services`} description={service.description} canonical={`/services/${service.slug}`} keywords={[service.title, "legal consultancy", "Sanhita360"]} />
    <Header />
    <main className="ns-service-page">
      <section className="ns-service-hero"><div className="ns-service-wrap"><nav><Link to="/">Home</Link><span>/</span><span>Legal Services</span><span>/</span><span>{service.title}</span></nav><p className="eyebrow">Sanhita360 Legal Services</p><h1>{service.title}</h1><p>{service.description}</p></div></section>
      <ServiceShare key={service.slug} service={service} />
      <section className="ns-service-body"><div className="ns-service-wrap ns-service-grid"><article>
        <div className="ns-service-card"><h2>Service Overview</h2><p>Receive practical guidance on the available remedies, required documents and appropriate legal process for your {service.title.toLowerCase()} matter.</p></div>
        <div className="ns-service-card ns-service-assistance"><h2><FaCheckCircle /> How We Can Assist</h2><p className="ns-service-intro">Every matter is different. We first understand your concern and review the available records, then help you identify practical next steps.</p><div className="ns-assistance-grid">{service.assistance.map((item) => <section key={item.title}><FaCheckCircle /><div><h3>{item.title}</h3><p>{item.description}</p></div></section>)}</div></div>
        <div className="ns-service-card"><h2><FaFileAlt /> Documents to Keep Ready</h2><ul>{service.documents.map((item) => <li key={item}><FaFileAlt />{item}</li>)}</ul></div>
      </article><aside><div className="ns-service-cta"><h2>Need Guidance?</h2><p>Share a brief summary and the available documents for an initial consultation.</p><a href="https://wa.me/919830015487?text=Hello%20Sanhita360%2C%20I%20would%20like%20to%20request%20a%20free%20legal%20consultation." target="_blank" rel="noopener noreferrer">Request a Free Consultation <FaArrowRight /></a></div><div className="ns-service-note"><strong>Important</strong><p>This page provides general information. Advice depends on the facts, documents and applicable law in each matter.</p></div></aside></div></section>
    </main>
    <Footer /><Styles />
  </>;
}

export function Styles() { return <style>{`
  .ns-service-page *{box-sizing:border-box}.ns-service-wrap{width:min(100% - 40px,1180px);margin:auto}.ns-service-hero{padding:28px 0 70px;background:linear-gradient(135deg,#0f172a,#1e3a8a);color:#fff}.ns-service-hero nav{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:40px;color:#bfdbfe;font-size:12px}.ns-service-hero nav a{color:#fff;text-decoration:none}.ns-service-hero .eyebrow{margin:0 0 10px;color:#93c5fd;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.12em}.ns-service-hero h1{margin:0;font-size:clamp(38px,6vw,62px)}.ns-service-hero>div>p:last-child{max-width:760px;color:#dbeafe;font-size:18px;line-height:1.7}.ns-service-body{padding:65px 0 85px;background:#f8fafc}.ns-service-grid{display:grid;grid-template-columns:minmax(0,1fr)330px;gap:32px;align-items:start}.ns-service-card,.ns-service-cta,.ns-service-note{margin-bottom:22px;padding:28px;border:1px solid #e2e8f0;border-radius:18px;background:#fff;box-shadow:0 10px 30px rgba(15,23,42,.06)}.ns-service-card h2,.ns-service-cta h2{display:flex;align-items:center;gap:10px;margin:0 0 16px;color:#0f172a}.ns-service-card h2 svg{color:#2563eb}.ns-service-card p,.ns-service-cta p,.ns-service-note p{color:#64748b;line-height:1.8}.ns-service-intro{margin:0 0 22px}.ns-assistance-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.ns-assistance-grid section{display:flex;gap:12px;padding:18px;border:1px solid #dbeafe;border-radius:14px;background:#f8fbff}.ns-assistance-grid section>svg{flex:none;margin-top:4px;color:#2563eb}.ns-assistance-grid h3{margin:0 0 7px;color:#0f172a;font-size:16px;line-height:1.45}.ns-assistance-grid p{margin:0;font-size:14px;line-height:1.7}.ns-service-card ul{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:0;padding:0;list-style:none}.ns-service-card li{display:flex;gap:9px;color:#334155;line-height:1.6}.ns-service-card li svg{flex:none;margin-top:4px;color:#2563eb}.ns-service-grid aside{position:sticky;top:98px}.ns-service-cta a{display:inline-flex;margin-top:10px;padding:12px 17px;border-radius:9px;background:#2563eb;color:#fff;text-decoration:none;font-weight:800}.ns-service-note strong{color:#0f172a}.ns-service-missing{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center}.ns-service-missing a{display:flex;gap:8px;color:#2563eb;text-decoration:none}@media(max-width:850px){.ns-service-grid{grid-template-columns:1fr}.ns-service-grid aside{position:static}}@media(max-width:640px){.ns-service-wrap{width:min(100% - 28px,1180px)}.ns-service-body{padding:40px 0 55px}.ns-service-card ul,.ns-assistance-grid{grid-template-columns:1fr}.ns-service-card{padding:22px}.ns-assistance-grid section{padding:16px}}
`}</style>; }

function ServiceShare({ service }) {
  const [status, setStatus] = useState("");
  const url = "https://www.sanhita360.com/services/" + service.slug;
  const message = service.title + " — Sanhita360";
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setStatus("Link copied"); }
    catch { setStatus("Please copy the link below"); }
  };
  return <section className="ns-service-share-strip" aria-label="Share this service">
    <div className="ns-service-wrap">
      <div className="ns-service-share-actions"><strong>Share this page</strong>
        <a href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url)} target="_blank" rel="noopener noreferrer"><FaFacebookF aria-hidden="true" /> Facebook</a>
        <a href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(message) + "&url=" + encodeURIComponent(url)} target="_blank" rel="noopener noreferrer"><FaTwitter aria-hidden="true" /> X</a>
        <a href={"https://wa.me/?text=" + encodeURIComponent(message + "\n" + url)} target="_blank" rel="noopener noreferrer"><FaWhatsapp aria-hidden="true" /> WhatsApp</a>
        <button type="button" onClick={copy}><FaLink aria-hidden="true" /> Copy Link</button>
      </div>
      <p role="status" aria-live="polite">{status}</p>
      {status === "Please copy the link below" && <input aria-label="Service page link" readOnly value={url} onFocus={(event) => event.target.select()} />}
    </div>
    <style>{`
      .ns-service-share-strip{background:#f8fafc;padding:18px 0 0}
      .ns-service-share-actions{display:flex;justify-content:flex-end;align-items:center;gap:9px;flex-wrap:wrap}.ns-service-share-actions strong{font-size:14px;margin-right:5px;color:#475569}
      .ns-service-share-actions a,.ns-service-share-actions button{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:42px;padding:9px 13px;border:0;border-radius:8px;background:#1877f2;color:white;text-decoration:none;font:inherit;font-size:13px;font-weight:700;cursor:pointer}
      .ns-service-share-actions a:nth-of-type(2){background:#17202b}.ns-service-share-actions a:nth-of-type(3){background:#168c45}.ns-service-share-actions button{background:#334155}
      .ns-service-share-actions a:focus-visible,.ns-service-share-actions button:focus-visible{outline:3px solid #2563eb;outline-offset:3px}
      .ns-service-share-strip p{margin:6px 0 0;text-align:right;font-size:13px;color:#475569}.ns-service-share-strip input{display:block;width:100%;padding:10px;margin-top:8px}
      @media(max-width:640px){.ns-service-share-actions{justify-content:flex-start}.ns-service-share-actions strong{width:100%}}
    `}</style>
  </section>;
}
