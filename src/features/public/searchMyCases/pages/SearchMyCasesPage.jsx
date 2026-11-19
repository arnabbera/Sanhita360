import { useMemo, useState } from "react";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const districtsByState = {
  "West Bengal": [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur",
    "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong",
    "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas",
    "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman",
    "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur",
  ],
};

// Initial West Bengal court-complex directory. Names are grouped by the selected
// administrative district; judicial-establishment boundaries can differ, so this
// is a discovery aid rather than a claim that the list is exhaustive.
const courtComplexesByDistrict = {
  "Alipurduar": ["Alipurduar District Court Complex"],
  "Bankura": ["Bankura District Court Complex", "Bishnupur Court Complex", "Khatra Court Complex"],
  "Birbhum": ["Suri Court Complex", "Bolpur Court Complex", "Rampurhat Court Complex", "Dubrajpur Court Complex"],
  "Cooch Behar": ["Cooch Behar District Court Complex", "Dinhata Court Complex", "Mathabhanga Court Complex", "Mekhliganj Court Complex"],
  "Dakshin Dinajpur": ["Balurghat District Court Complex", "Buniadpur Court Complex"],
  "Darjeeling": ["Darjeeling District Court Complex", "Siliguri Court Complex", "Kurseong Court Complex", "Gorubathan Court Complex"],
  "Hooghly": ["Chinsurah District Court Complex", "Serampore Court Complex", "Chandannagar Court Complex", "Arambagh Court Complex"],
  "Howrah": ["Howrah Court Complex", "Uluberia Court Complex", "Amta Court Complex"],
  "Jalpaiguri": ["Jalpaiguri District Court Complex"],
  "Jhargram": ["Jhargram Court Complex"],
  "Kalimpong": ["Kalimpong District Court Complex"],
  "Kolkata": ["City Civil Court Complex, Calcutta", "City Sessions Court Complex, Calcutta", "Metropolitan Magistrate Court Complex, Calcutta", "Municipal Magistrates Court Complex, Calcutta", "Presidency Small Causes Court Complex, Calcutta", "Commercial Courts at Calcutta", "Sealdah Criminal Court Complex"],
  "Malda": ["Malda District Court Complex"],
  "Murshidabad": ["Berhampore Civil Court Complex", "Berhampore Criminal Court Complex", "Lalbagh Civil Court Complex", "Lalbagh Criminal Court Complex", "Jangipur Court Complex", "Kandi Court Complex"],
  "Nadia": ["Krishnanagar Court Complex", "Kalyani Court Complex", "Ranaghat Court Complex", "Nabadwip Court Complex", "Tehatta Court Complex"],
  "North 24 Parganas": ["Barasat District Court Complex", "Bongaon Court Complex", "Basirhat Court Complex", "Barrackpore Court Complex", "Bidhannagar Court Complex"],
  "Paschim Bardhaman": ["Asansol Court Complex", "Durgapur Court Complex"],
  "Paschim Medinipur": ["Medinipur District Court Complex", "Kharagpur Court Complex", "Dantan Court Complex"],
  "Purba Bardhaman": ["Purba Bardhaman District Court Complex", "Kalna Court Complex", "Katwa Court Complex"],
  "Purba Medinipur": ["Tamluk District Court Complex", "Haldia Court Complex", "Contai Court Complex"],
  "Purulia": ["Purulia District Court Complex"],
  "South 24 Parganas": ["Alipore Civil Court Complex", "Alipore Criminal Court Complex", "Baruipur Court Complex", "Diamond Harbour Court Complex", "Kakdwip Court Complex"],
  "Uttar Dinajpur": ["Raiganj District Court Complex", "Islampur Court Complex"],
};

const years = Array.from({ length: 76 }, (_, i) => String(new Date().getFullYear() - i));

const districtCourtUnits = [
  { id: "bankura", label: "Bankura District Court" },
  { id: "purbaBardhaman", label: "Purba Bardhaman District Court" },
  { id: "birbhum", label: "Birbhum District Court" },
  { id: "coochBehar", label: "Cooch Behar District Court" },
  { id: "darjeeling", label: "Darjeeling District Court" },
  { id: "eastMedinipur", label: "East Medinipur (Purba Medinipur) District Court" },
  { id: "hooghly", label: "Hooghly District Court" },
  { id: "howrah", label: "Howrah District Court" },
  { id: "jalpaiguri", label: "Jalpaiguri District Court" },
  { id: "malda", label: "Malda District Court" },
  { id: "murshidabad", label: "Murshidabad District Court" },
  { id: "nadia", label: "Nadia District Court" },
  { id: "north24Parganas", label: "North 24 Parganas District Court" },
  { id: "northDinajpur", label: "North Dinajpur (Uttar Dinajpur) District Court" },
  { id: "purulia", label: "Purulia District Court" },
  { id: "south24Parganas", label: "South 24 Parganas District Court" },
  { id: "southDinajpur", label: "South Dinajpur (Dakshin Dinajpur) District Court" },
  { id: "westMedinipur", label: "West Medinipur (Paschim Medinipur) District Court" },
  { id: "kolkataCityCivil", label: "Kolkata – City Civil Court" },
  { id: "kolkataCitySessions", label: "Kolkata – City Sessions Court" },
  { id: "kolkataPresidencySmallCauses", label: "Kolkata – Presidency Small Causes Court" },
  { id: "kalimpong", label: "Kalimpong District Court" },
  { id: "paschimBardhaman", label: "Paschim Bardhaman District Court" },
  { id: "jhargram", label: "Jhargram District Court" },
  { id: "alipurduar", label: "Alipurduar District Court" },
];

const highCourtSources = [
  { id: "calcuttaHighCourtOriginal", label: "Calcutta High Court – Original Side", detail: "Original-side civil, commercial, company and other jurisdiction matters" },
  { id: "calcuttaHighCourtAppellate", label: "Calcutta High Court – Appellate Side", detail: "Appellate, civil, criminal, writ, revisional and other appellate-side matters" },
  { id: "jalpaiguriCircuitBench", label: "Calcutta High Court – Jalpaiguri Circuit Bench", detail: "Circuit Bench case status, orders and cause lists" },
];

const searchSources = [
  ...districtCourtUnits.map(source => ({ ...source, group: "district", detail: "Official eCourts district-court portal" })),
  ...highCourtSources.map(source => ({ ...source, group: "highCourt" })),
  { id: "drtKolkata", label: "DRT Kolkata", group: "tribunals", detail: "Securitisation applications, original applications and interlocutory applications" },
  { id: "dratKolkata", label: "DRAT Kolkata", group: "tribunals", detail: "Appeals and connected applications" },
  { id: "connectedCases", label: "Connected proceedings", group: "connected", detail: "Appeals, revisions, writ petitions, execution and subsequent applications" },
];

const searchSourceGroups = [
  { id: "district", label: "All 25 West Bengal district court portals", description: "Every district-court portal listed in the official eCourts West Bengal directory.", sources: searchSources.filter(source => source.group === "district") },
  { id: "highCourt", label: "Calcutta High Court and Circuit Bench", description: "Original Side, Appellate Side and Jalpaiguri Circuit Bench are selected separately.", sources: searchSources.filter(source => source.group === "highCourt") },
  { id: "tribunals", label: "Debt recovery tribunals", description: "DRT Kolkata and DRAT Kolkata.", sources: searchSources.filter(source => source.group === "tribunals") },
  { id: "connected", label: "Connected proceedings", description: "Trace related proceedings across supported court systems.", sources: searchSources.filter(source => source.group === "connected") },
];

const preliminaryRecords = [
  {
    court: "DRT Kolkata",
    number: "SA/594/2021",
    title: "Arnab Bera & Others vs. Indian Bank",
    category: "Securitisation Application",
    confidence: "Strong candidate — identity verification required",
    note: "Previously identified tribunal matter. Verify party details and current status against the official case record.",
    url: "https://cis.drt.gov.in/drtlive/order/pdf/pdf1.php?file=L3VwbG9hZHMvZHJ0L2RydGNvdXJ0L2RhaWx5X29yZGVyLzIwMjQvRGVjZW1iZXIvMTkwMTMwMDEwMjAyMDIxXzA1ODdmOTViNDg4NWVlZTRlY2IzNzY3ZTJjOGNmMWI5LnBkZioqKjY0MzI4IzEja29sa2F0YTM%3D"
  },
  {
    court: "DRAT Kolkata",
    number: "Misc. Appeal 75/2025",
    title: "Arnab Bera vs. Indian Bank",
    category: "Appeal",
    confidence: "Strong candidate — identity verification required",
    note: "Previously identified cause-list entry associated with SA/594/2021. Cause-list appearance is not proof of final disposal or current status.",
    url: "https://cis.drt.gov.in/drtlive/order/generate_causelist.php?filing_no=MTEtMjYvMDgvMjAyNS0xLWtvbGthdGFkcmF0&id=1681966180"
  },
  {
    court: "Calcutta High Court",
    number: "CO/3499/2024",
    title: "Samadrita Pratihar vs. Arnab Bera",
    category: "Civil revisional matter",
    confidence: "Possible name match — not verified",
    note: "Same-name respondent reference. Do not attribute this matter to the search subject without independent identity evidence.",
    url: "https://www.calcuttahighcourt.gov.in/downloads/old_cause_lists/AS/cla05122024.pdf"
  },
  {
    court: "Calcutta High Court",
    number: "Judgment dated 8 October 2021",
    title: "Arnab Bera & Another vs. State of West Bengal & Others",
    category: "SARFAESI-related proceeding",
    confidence: "Possible match — verify full judgment and party identity",
    note: "Previously surfaced judgment reference concerning SARFAESI proceedings and South 24 Parganas.",
    url: "https://indiankanoon.org/docfragment/111717883/?formInput=section+14+of+sarfeasi+act++benchid:+r-mantha"
  },
];


const initialForm = {
  firstName: "", middleName: "", lastName: "",
  fatherFirstName: "", fatherMiddleName: "", fatherLastName: "",
  spouseFirstName: "", spouseMiddleName: "", spouseLastName: "",
  dob: "", gender: "", country: "India", state: "West Bengal", districts: [],
  courtComplexes: [], alternativeNames: "", fromYear: "", toYear: "",
  searchSources: searchSources.map(source => source.id),
};


function MultiSelectDropdown({ label, options, value, onChange, placeholder, disabled = false, required = false, allowCustom = false, hint }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = options.filter(option => option.toLowerCase().includes(query.trim().toLowerCase()) && !value.includes(option));
  const add = item => {
    const clean = item.trim();
    if (clean && !value.includes(clean)) onChange([...value, clean]);
    setQuery("");
  };
  return (
    <div className="smc-field smc-multiselect">
      <label>{label} {required && <span className="smc-required">*</span>}</label>
      <div className={"smc-multi-control " + (disabled ? "is-disabled" : "")}>
        <div className="smc-chips">
          {value.map(item => <span className="smc-chip" key={item}>{item}<button type="button" aria-label={"Remove " + item} onClick={() => onChange(value.filter(v => v !== item))}>×</button></span>)}
          <input value={query} disabled={disabled} placeholder={value.length ? "Add another…" : placeholder} onFocus={() => setOpen(true)} onChange={e => {setQuery(e.target.value);setOpen(true);}} onKeyDown={e => {if(e.key === "Enter"){e.preventDefault();if(filtered.length)add(filtered[0]);else if(allowCustom)add(query);}}} />
        </div>
        <button className="smc-chevron" type="button" disabled={disabled} onClick={() => setOpen(v => !v)}>▾</button>
      </div>
      {open && !disabled && <div className="smc-options">
        {filtered.length ? filtered.map(option => <button type="button" key={option} onClick={() => add(option)}>{option}<span>+</span></button>) : <div className="smc-no-options">{allowCustom && query.trim() ? <button type="button" onClick={() => add(query)}>Add “{query.trim()}” <span>+</span></button> : "No more matches found."}</div>}
        <button className="smc-done" type="button" onClick={() => {setOpen(false);setQuery("");}}>Done</button>
      </div>}
      {hint && <span className="smc-hint">{hint}</span>}
      {required && value.length === 0 && <span className="smc-hint">Select at least one option.</span>}
    </div>
  );
}

const css = `
.smc-page{min-height:100vh;background:#f5f7fb;color:#182338;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.smc-top{background:#101d35;color:white;padding:22px max(22px,calc((100vw - 1120px)/2));display:flex;align-items:center;justify-content:space-between;gap:16px}
.smc-brand{font-size:19px;font-weight:800;letter-spacing:-.4px}.smc-brand span{color:#8bb7ff}
.smc-back{color:#d8e5fb;text-decoration:none;font-size:13px}
.smc-hero{background:linear-gradient(120deg,#142746,#1b4778);color:#fff;padding:46px 22px 58px}
.smc-hero-inner{max-width:1120px;margin:auto}.smc-eyebrow{font-size:11px;font-weight:800;letter-spacing:1.8px;color:#a9c9ff;text-transform:uppercase}
.smc-hero h1{font-size:clamp(30px,5vw,46px);line-height:1.1;letter-spacing:-1.5px;margin:12px 0}
.smc-hero p{max-width:690px;color:#d8e5f7;font-size:15px;line-height:1.7;margin:0}
.smc-wrap{max-width:1120px;margin:-24px auto 0;padding:0 20px 60px;position:relative}
.smc-card{background:white;border:1px solid #e4eaf2;border-radius:18px;box-shadow:0 16px 45px #172b4910;padding:clamp(20px,4vw,34px)}
.smc-section{margin-bottom:28px}.smc-section-head{display:flex;align-items:center;gap:12px;margin-bottom:17px}
.smc-step{height:30px;width:30px;border-radius:9px;background:#eaf2ff;color:#245ba8;display:grid;place-items:center;font-weight:800;font-size:13px}
.smc-section h2{font-size:17px;margin:0;letter-spacing:-.2px}.smc-section small{display:block;color:#738096;font-size:12px;margin-top:3px}
.smc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}
.smc-field{display:flex;flex-direction:column;gap:7px;min-width:0}.smc-field label{font-size:12px;font-weight:700;color:#39465b}
.smc-field input,.smc-field select{height:44px;border:1px solid #d9e1ec;border-radius:9px;padding:0 12px;background:#fff;color:#1c2a40;font:inherit;font-size:13px;min-width:0;width:100%;box-sizing:border-box;outline:none}
.smc-field input:focus,.smc-field select:focus{border-color:#4c83cf;box-shadow:0 0 0 3px #4c83cf18}
.smc-field input::placeholder{color:#a1aaba}
.smc-multiselect{position:relative}.smc-multi-control{min-height:44px;border:1px solid #d9e1ec;border-radius:9px;background:#fff;display:flex;align-items:center;padding:5px 8px 5px 10px;gap:6px;box-sizing:border-box}.smc-multi-control:focus-within{border-color:#4c83cf;box-shadow:0 0 0 3px #4c83cf18}.smc-multi-control.is-disabled{background:#f4f6f9}.smc-chips{display:flex;align-items:center;gap:5px;flex-wrap:wrap;flex:1;min-width:0}.smc-chips input{border:0!important;box-shadow:none!important;outline:none;height:30px!important;padding:0 3px!important;flex:1;min-width:115px}.smc-chip{display:inline-flex;align-items:center;gap:5px;background:#eaf2ff;color:#245ba8;border-radius:6px;padding:5px 7px;font-size:11px;font-weight:700}.smc-chip button{border:0;background:transparent;color:#245ba8;font-size:15px;line-height:12px;cursor:pointer;padding:0}.smc-chevron{border:0;background:transparent;color:#66758b;cursor:pointer;padding:5px}.smc-options{position:absolute;z-index:20;top:calc(100% + 4px);left:0;right:0;background:white;border:1px solid #d9e1ec;border-radius:10px;box-shadow:0 12px 28px #172b4920;max-height:230px;overflow:auto;padding:5px}.smc-options>button:not(.smc-done),.smc-no-options button{width:100%;display:flex;justify-content:space-between;align-items:center;text-align:left;border:0;background:white;padding:10px;border-radius:6px;font:inherit;font-size:12px;color:#26364e;cursor:pointer}.smc-options>button:hover,.smc-no-options button:hover{background:#f1f6ff}.smc-options button span{color:#2a69b5;font-weight:800}.smc-no-options{font-size:12px;color:#8490a2;padding:6px}.smc-done{width:100%;border:0;border-top:1px solid #edf0f5;background:white;color:#245ba8;font-weight:800;padding:9px;cursor:pointer;margin-top:4px}.smc-required{color:#d44b4b}.smc-hint{font-size:11px;color:#8490a2;line-height:1.5}
.smc-divider{height:1px;background:#edf0f5;margin:25px 0}
.smc-note{border:1px solid #dce9fb;background:#f4f8ff;border-radius:10px;padding:12px 14px;color:#526987;font-size:12px;line-height:1.6;margin:5px 0 22px}
.smc-actions{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap}
.smc-submit{border:0;border-radius:10px;background:#215ca8;color:white;padding:14px 24px;font-size:14px;font-weight:800;cursor:pointer;box-shadow:0 7px 16px #215ca82b}
.smc-submit:disabled{opacity:.55;cursor:not-allowed}.smc-reset{border:0;background:transparent;color:#52647d;font-size:13px;font-weight:700;cursor:pointer}
.smc-consent{font-size:11px;color:#8a95a6;line-height:1.5;max-width:490px}
.smc-alert{border-radius:9px;padding:11px 13px;font-size:12px;margin:0 0 16px}.smc-error{background:#fff1f0;color:#a3322c;border:1px solid #ffd7d3}
.smc-results{margin-top:22px;border:1px solid #dce6f3;background:#fff;border-radius:14px;padding:20px}.smc-results h3{margin:0 0 8px;font-size:17px}.smc-results p{font-size:13px;line-height:1.65;color:#64738a;margin:5px 0}
.smc-badge{display:inline-block;background:#fff5dc;color:#8a6210;padding:5px 9px;border-radius:20px;font-size:10px;font-weight:800;letter-spacing:.5px}
.smc-source-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.smc-source-group{margin:16px 0 20px}.smc-source-group-heading{margin:0 0 9px}.smc-source-group-heading strong{display:block;font-size:13px;color:#29384f}.smc-source-group-heading small{display:block;font-size:11px;color:#78869a;margin-top:3px}.smc-source-actions{display:flex;gap:18px;flex-wrap:wrap;margin:0 0 8px}.smc-source-actions button{text-decoration:underline}
.smc-source-option{display:flex;gap:10px;align-items:flex-start;border:1px solid #e1e8f1;border-radius:10px;padding:12px;background:#fff;cursor:pointer}
.smc-source-option input{width:16px;height:16px;margin:2px 0 0;accent-color:#245ba8;flex:0 0 auto}
.smc-source-option strong{display:block;font-size:12px;color:#29384f}
.smc-source-option small{display:block;color:#78869a;font-size:11px;line-height:1.45;margin-top:3px}
.smc-records{display:grid;gap:12px;margin-top:16px}
.smc-record{border:1px solid #e1e8f1;border-radius:11px;padding:15px}
.smc-record-top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:7px}
.smc-record-top span{font-size:11px;color:#5b6e88;font-weight:700}
.smc-record h4{margin:5px 0;font-size:14px;color:#24344c}
.smc-record p{margin:5px 0;font-size:12px;line-height:1.55;color:#65748a}
.smc-record a{display:inline-block;margin-top:8px;color:#245ba8;font-size:12px;font-weight:800;text-decoration:none}
.smc-record a:hover{text-decoration:underline}
.smc-warning{border:1px solid #f0dfb3;background:#fff9e9;color:#775a1b;border-radius:10px;padding:12px 14px;font-size:12px;line-height:1.6;margin:12px 0}
@media(max-width:600px){.smc-source-list{grid-template-columns:1fr}}

.smc-footer{text-align:center;color:#8b96a7;font-size:11px;padding:20px}
@media(max-width:760px){.smc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.smc-top{padding:18px 20px}.smc-hero{padding:36px 20px 52px}}
@media(max-width:520px){.smc-grid{grid-template-columns:1fr}.smc-actions{align-items:stretch;flex-direction:column}.smc-submit{width:100%}.smc-consent{max-width:none}}
`;

export default function SearchMyCasesPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const districts = useMemo(() => districtsByState[form.state] || [], [form.state]);
  const availableCourtComplexes = useMemo(
    () => [...new Set(form.districts.flatMap(district => courtComplexesByDistrict[district] || []))].sort((a, b) => a.localeCompare(b)),
    [form.districts]
  );
  const update = (key, value) => {
    setForm(current => ({ ...current, [key]: value }));
    setError("");
    setSubmitted(false);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.fatherFirstName.trim() || !form.fatherLastName.trim() ||
        !form.dob || !form.gender || !form.country || !form.state || !form.districts.length || !form.searchSources.length || form.districts.some(d => !districts.includes(d))) {
      setError("Please complete all mandatory fields marked with * and select at least one valid district from the list.");
      return;
    }
    if (form.fromYear && form.toYear && Number(form.fromYear) > Number(form.toYear)) {
      setError("Search From Year cannot be later than Search To Year.");
      return;
    }
    setSubmitted(true);
    setError("");
  };

  return (
    <div className="smc-page">
      <style>{css}</style>
      <header className="smc-top">
        <div className="smc-brand">Sanhita<span>360</span></div>
        <a className="smc-back" href="/">← Back to Sanhita360</a>
      </header>
      <section className="smc-hero">
        <div className="smc-hero-inner">
          <div className="smc-eyebrow">Sanhita360 Legal Intelligence</div>
          <h1>SearchMyCases</h1>
          <p>AI-powered legal case discovery. Search for court matters associated with a person using identity details and preferred court location.</p>
        </div>
      </section>

      <main className="smc-wrap">
        <form className="smc-card" onSubmit={submit}>
          {error && <div className="smc-alert smc-error" role="alert">{error}</div>}

          <section className="smc-section">
            <div className="smc-section-head"><span className="smc-step">01</span><div><h2>Personal identity</h2><small>Enter the person's details as accurately as possible.</small></div></div>
            <div className="smc-grid">
              <div className="smc-field"><label>First Name <span className="smc-required">*</span></label><input value={form.firstName} onChange={e=>update("firstName",e.target.value)} placeholder="First name" autoComplete="given-name" required /></div>
              <div className="smc-field"><label>Middle Name</label><input value={form.middleName} onChange={e=>update("middleName",e.target.value)} placeholder="Middle name (optional)" autoComplete="additional-name" /></div>
              <div className="smc-field"><label>Last Name <span className="smc-required">*</span></label><input value={form.lastName} onChange={e=>update("lastName",e.target.value)} placeholder="Last name" autoComplete="family-name" required /></div>
              <div className="smc-field"><label>Father's First Name <span className="smc-required">*</span></label><input value={form.fatherFirstName} onChange={e=>update("fatherFirstName",e.target.value)} placeholder="Father's first name" required /></div>
              <div className="smc-field"><label>Father's Middle Name</label><input value={form.fatherMiddleName} onChange={e=>update("fatherMiddleName",e.target.value)} placeholder="Father's middle name (optional)" /></div>
              <div className="smc-field"><label>Father's Last Name <span className="smc-required">*</span></label><input value={form.fatherLastName} onChange={e=>update("fatherLastName",e.target.value)} placeholder="Father's last name" required /></div>
              <div className="smc-field"><label>Spouse's First Name</label><input value={form.spouseFirstName} onChange={e=>update("spouseFirstName",e.target.value)} placeholder="Spouse's first name" /></div>
              <div className="smc-field"><label>Spouse's Middle Name</label><input value={form.spouseMiddleName} onChange={e=>update("spouseMiddleName",e.target.value)} placeholder="Spouse's middle name (optional)" /></div>
              <div className="smc-field"><label>Spouse's Last Name</label><input value={form.spouseLastName} onChange={e=>update("spouseLastName",e.target.value)} placeholder="Spouse's last name" /></div>
              <div className="smc-field"><label>Date of Birth <span className="smc-required">*</span></label><input type="date" value={form.dob} onChange={e=>update("dob",e.target.value)} required max={new Date().toISOString().slice(0,10)} /></div>
              <div className="smc-field"><label>Gender <span className="smc-required">*</span></label><select value={form.gender} onChange={e=>update("gender",e.target.value)} required><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></div>
              <div className="smc-field" style={{gridColumn:"span 2"}}><label>Alternative Names</label><input value={form.alternativeNames} onChange={e=>update("alternativeNames",e.target.value)} placeholder="Aliases, maiden name, initials or spelling variants" /><span className="smc-hint">Separate multiple names with commas.</span></div>
            </div>
          </section>

          <div className="smc-divider" />
          <section className="smc-section">
            <div className="smc-section-head"><span className="smc-step">02</span><div><h2>Preferred search location</h2><small>Select one or more districts. Court complexes are optional and support multiple selections.</small></div></div>
            <div className="smc-grid">
              <div className="smc-field"><label>Country <span className="smc-required">*</span></label><select value={form.country} onChange={e=>update("country",e.target.value)}><option>India</option></select></div>
              <div className="smc-field"><label>State / Union Territory <span className="smc-required">*</span></label><select value={form.state} onChange={e=>{setForm(f=>({...f,state:e.target.value,districts:[],courtComplexes:[]}));setSubmitted(false);setError("");}}>{states.map(s=><option key={s}>{s}</option>)}</select></div>
              <MultiSelectDropdown label="District" options={districts} value={form.districts} onChange={v=>setForm(f=>({...f,districts:v,courtComplexes:[]}))} placeholder={districts.length ? "Search and select districts" : "District list not configured yet"} required disabled={!districts.length} hint="You can select more than one district." />
              <MultiSelectDropdown label="Court Complex / Establishment" options={availableCourtComplexes} value={form.courtComplexes} onChange={v=>update("courtComplexes",v)} placeholder={form.districts.length ? "Click to view or search court complexes" : "Select district(s) first"} disabled={!form.districts.length} allowCustom hint={form.districts.length ? `${availableCourtComplexes.length} listed option(s) for selected district(s). Select multiple; type to add another establishment if needed.` : "Select one or more districts to load court complexes."} />
            </div>
            <div className="smc-note">Your selected districts are the preferred starting locations. Where records and supported sources allow, related appeals or connected proceedings in other districts, the High Court or appellate courts may also be relevant.</div>
          </section>

          <div className="smc-divider" />
          <section className="smc-section">
            <div className="smc-section-head"><span className="smc-step">03</span><div><h2>Expanded search coverage</h2><small>Choose the court systems and connected-proceeding categories to include in the search plan.</small></div></div>
            <div className="smc-source-actions">
              <button type="button" className="smc-reset" onClick={() => update("searchSources", searchSources.map(source => source.id))}>Select all listed sources</button>
              <button type="button" className="smc-reset" onClick={() => update("searchSources", [])}>Clear selection</button>
            </div>
            {searchSourceGroups.map(group => <div className="smc-source-group" key={group.id}>
              <div className="smc-source-group-heading"><strong>{group.label}</strong><small>{group.description}</small></div>
              <div className="smc-source-list">
                {group.sources.map(source => <label className="smc-source-option" key={source.id}>
                  <input type="checkbox" checked={form.searchSources.includes(source.id)} onChange={e => update("searchSources", e.target.checked ? [...form.searchSources, source.id] : form.searchSources.filter(id => id !== source.id))} />
                  <span><strong>{source.label}</strong><small>{source.detail}</small></span>
                </label>)}
              </div>
            </div>)}
            <div className="smc-note">Kolkata coverage includes the three separate district-court portals and the six listed Kolkata court complexes: City Civil, City Sessions, Metropolitan Magistrate, Municipal Magistrates, Presidency Small Causes and Commercial Courts. The Sealdah Criminal Court Complex is also included in the court-complex selector. Special courts operating within these establishments are covered only where their records are exposed by the relevant official portal.</div>
            <div className="smc-note">Official directory: <a href="https://ecourts.gov.in/ecourts2.0/?p=dist_court%2Fwb" target="_blank" rel="noreferrer">West Bengal District Courts on eCourts</a> · <a href="https://www.calcuttahighcourt.gov.in/Cause-Lists" target="_blank" rel="noreferrer">Calcutta High Court cause lists and sides</a></div>
            {!form.searchSources.length && <div className="smc-alert smc-error">Select at least one search source.</div>}
          </section>

          <div className="smc-divider" />
          <section className="smc-section">
            <div className="smc-section-head"><span className="smc-step">04</span><div><h2>Search period</h2><small>Both years are optional. Leave blank for all available years.</small></div></div>
            <div className="smc-grid">
              <div className="smc-field"><label>Search From Year</label><select value={form.fromYear} onChange={e=>update("fromYear",e.target.value)}><option value="">Any year</option>{years.map(y=><option key={y}>{y}</option>)}</select></div>
              <div className="smc-field"><label>Search To Year</label><select value={form.toYear} onChange={e=>update("toYear",e.target.value)}><option value="">Present</option>{years.map(y=><option key={y}>{y}</option>)}</select></div>
            </div>
          </section>

          <div className="smc-note">Privacy reminder: enter personal information only when you are authorised to do so. This prototype does not send the details to a court database or store them for a search.</div>
          <div className="smc-actions">
            <div className="smc-consent">By continuing, you confirm that the information is provided for a legitimate case-discovery purpose. A full privacy notice and consent workflow will be required before public launch.</div>
            <div style={{display:"flex",gap:12,alignItems:"center"}}><button className="smc-reset" type="button" onClick={()=>{setForm(initialForm);setError("");setSubmitted(false);}}>Reset</button><button className="smc-submit" type="submit">Continue to Search →</button></div>
          </div>
        </form>

        {submitted && <section className="smc-results" aria-live="polite">
          <span className="smc-badge">VERSION 1.1 · EXPANDED SEARCH TEST</span>
          <h3>Search profile validated</h3>
          <p><strong>Person:</strong> {[form.firstName,form.middleName,form.lastName].filter(Boolean).join(" ")}</p>
          <p><strong>Preferred districts:</strong> {form.districts.join(", ")}, {form.state}</p>
          <p><strong>Period:</strong> {form.fromYear || "Any year"}–{form.toYear || "Present"}</p>
          <p><strong>Selected search coverage:</strong> {searchSources.filter(source => form.searchSources.includes(source.id)).length} of {searchSources.length} listed court/tribunal sources</p>
          <div className="smc-warning"><strong>Important:</strong> Live automated court-record searching is not connected yet. The records below are previously identified public-record leads included to test the expanded results layout. They have not been freshly queried or independently identity-verified in this form submission. A name match is not proof that a case belongs to the search subject.</div>
          <h3>Previously identified records for verification</h3>
          <div className="smc-records">
            {preliminaryRecords.filter(record => {
              if (record.court.includes("DRAT")) return form.searchSources.includes("dratKolkata");
              if (record.court.includes("DRT")) return form.searchSources.includes("drtKolkata");
              return form.searchSources.includes("calcuttaHighCourtOriginal") || form.searchSources.includes("calcuttaHighCourtAppellate") || form.searchSources.includes("jalpaiguriCircuitBench");
            }).map(record => <article className="smc-record" key={record.number + record.title}>
              <div className="smc-record-top"><span>{record.court}</span><span>{record.category}</span></div>
              <h4>{record.number} · {record.title}</h4>
              <p><strong>Assessment:</strong> {record.confidence}</p>
              <p>{record.note}</p>
              <a href={record.url} target="_blank" rel="noreferrer">Open source record ↗</a>
            </article>)}
          </div>
          <p>The selector now lists all 25 district-court portals, both Calcutta High Court sides, the Jalpaiguri Circuit Bench, DRT Kolkata and DRAT Kolkata. This is a coverage configuration only: live searching for these sources remains pending until authorised court-record connectors are integrated. Search coverage and results must be reported separately for each source.</p>
        </section>}
      </main>
      <footer className="smc-footer">SearchMyCases · A Sanhita360 legal discovery prototype · Not legal advice</footer>
    </div>
  );
}
