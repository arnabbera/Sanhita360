import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaFileAlt } from "react-icons/fa";
import Header from "../../../home/components/Header";
import Footer from "../../../home/components/Footer";
import SEO from "../../../../shared/seo/SEO";
import { Styles } from "./LegalServiceDetailsPage";

const title = "Searching, Sale Agreement and Registration Support in Kolkata";
const description = "We help buyers verify property documents, prepare the Agreement for Sale, complete property registration and coordinate mutation in Kolkata and across serviceable areas of West Bengal.";
const steps = [
  { title: "Property Searching & Document Verification", description: "Review the available title deeds, chain of ownership, land and municipal records, tax receipts and property particulars. Coordinate relevant searches and checks for mortgages, encumbrances and other transaction risks before you commit." },
  { title: "Agreement for Sale", description: "Support preparation and review of the Agreement for Sale, including the property schedule, payment stages, possession, responsibilities of the parties and agreed timelines. Identify missing documents and conditions that need to be resolved before completion." },
  { title: "Registration Support", description: "Coordinate deed preparation, document readiness, the applicable stamp-duty and registration-fee assessment, appointments and execution requirements with the parties and relevant professionals. Help organise the registered documents and transaction records afterward." },
  { title: "Mutation Coordination", description: "Help organise the application and supporting documents for the relevant municipal or land-record authority and coordinate follow-up. Requirements and timelines depend on the property and authority concerned." },
];

export default function PropertyRegistrationPage() {
  const contact = `https://wa.me/919830015487?text=${encodeURIComponent("Hello Sanhita360, I need support with property searching, an Agreement for Sale, registration or mutation. The property is located in: ")}`;
  return <>
    <SEO title="Property Search, Sale Agreement & Registration Support in Kolkata" description={description} canonical="/services/property-registration" />
    <Header />
    <main className="ns-service-page">
      <section className="ns-service-hero"><div className="ns-service-wrap">
        <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Legal Services</span><span>/</span><span>Property Registration</span></nav>
        <p className="eyebrow">Sanhita360 · Property Registration</p>
        <h1>{title}</h1><p>{description}</p>
      </div></section>
      <section className="ns-service-body"><div className="ns-service-wrap ns-service-grid"><article>
        <div className="ns-service-card ns-service-assistance"><h2><FaCheckCircle /> How We Can Help</h2>
          <p className="ns-service-intro">From checking the available documents before purchase to coordinating the steps after registration, we help you keep the transaction organised and understand what needs attention.</p>
          <div className="ns-assistance-grid">{steps.map((step) => <section key={step.title}><FaCheckCircle /><div><h3>{step.title}</h3><p>{step.description}</p></div></section>)}</div>
        </div>
        <div className="ns-service-card"><h2><FaFileAlt /> Documents to Keep Ready</h2><ul>{["Current title deed and earlier chain deeds", "Available mutation and land records", "Recent municipal or property-tax receipts", "Property schedule, sanctioned plan and approvals, where applicable", "Seller’s identity and authority documents", "Existing agreement, loan or mortgage papers, where applicable"].map((item) => <li key={item}><FaFileAlt />{item}</li>)}</ul><p>The final checklist depends on whether the property is a flat, house, land or another type of interest.</p></div>
        <div className="ns-service-card"><h2>How to Get Started</h2><ol><li>Share the property location, type and present stage of the purchase.</li><li>Discuss the available records and the support you require.</li><li>Confirm the scope, serviceability, professional fees and applicable government charges before proceeding.</li></ol></div>
        <div className="ns-service-card"><h2>Service Area</h2><p>Kolkata and serviceable areas of West Bengal. Please confirm availability for the property’s location and the relevant registration or mutation authority.</p></div>
      </article><aside>
        <div className="ns-service-cta"><h2>Planning a Property Purchase?</h2><p>Tell us where the property is located and whether you need searching, agreement, registration or mutation support.</p><a href={contact} target="_blank" rel="noopener noreferrer">Discuss Your Property Requirements <FaArrowRight /></a></div>
        <div className="ns-service-note"><strong>Before You Proceed</strong><p>Checks depend on the records and searches available. Registration does not by itself guarantee clear title, and mutation is not proof of ownership. Government charges and professional fees depend on the transaction; no approval or completion timeline is guaranteed.</p></div>
      </aside></div></section>
    </main><Footer /><Styles />
  </>;
}
