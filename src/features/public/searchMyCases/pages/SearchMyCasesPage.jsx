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

const years = Array.from({ length: 76 }, (_, i) => String(new Date().getFullYear() - i));

const initialForm = {
  firstName: "", middleName: "", lastName: "", fatherName: "", spouseName: "",
  dob: "", gender: "", country: "India", state: "West Bengal", district: "",
  courtComplex: "", alternativeNames: "", fromYear: "", toYear: "",
};

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
.smc-field input::placeholder{color:#a1aaba}.smc-required{color:#d44b4b}.smc-hint{font-size:11px;color:#8490a2;line-height:1.5}
.smc-divider{height:1px;background:#edf0f5;margin:25px 0}
.smc-note{border:1px solid #dce9fb;background:#f4f8ff;border-radius:10px;padding:12px 14px;color:#526987;font-size:12px;line-height:1.6;margin:5px 0 22px}
.smc-actions{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap}
.smc-submit{border:0;border-radius:10px;background:#215ca8;color:white;padding:14px 24px;font-size:14px;font-weight:800;cursor:pointer;box-shadow:0 7px 16px #215ca82b}
.smc-submit:disabled{opacity:.55;cursor:not-allowed}.smc-reset{border:0;background:transparent;color:#52647d;font-size:13px;font-weight:700;cursor:pointer}
.smc-consent{font-size:11px;color:#8a95a6;line-height:1.5;max-width:490px}
.smc-alert{border-radius:9px;padding:11px 13px;font-size:12px;margin:0 0 16px}.smc-error{background:#fff1f0;color:#a3322c;border:1px solid #ffd7d3}
.smc-results{margin-top:22px;border:1px solid #dce6f3;background:#fff;border-radius:14px;padding:20px}.smc-results h3{margin:0 0 8px;font-size:17px}.smc-results p{font-size:13px;line-height:1.65;color:#64738a;margin:5px 0}
.smc-badge{display:inline-block;background:#fff5dc;color:#8a6210;padding:5px 9px;border-radius:20px;font-size:10px;font-weight:800;letter-spacing:.5px}
.smc-footer{text-align:center;color:#8b96a7;font-size:11px;padding:20px}
@media(max-width:760px){.smc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.smc-top{padding:18px 20px}.smc-hero{padding:36px 20px 52px}}
@media(max-width:520px){.smc-grid{grid-template-columns:1fr}.smc-actions{align-items:stretch;flex-direction:column}.smc-submit{width:100%}.smc-consent{max-width:none}}
`;

export default function SearchMyCasesPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const districts = useMemo(() => districtsByState[form.state] || [], [form.state]);
  const update = (key, value) => {
    setForm(current => ({ ...current, [key]: value }));
    setError("");
    setSubmitted(false);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.fatherName.trim() ||
        !form.dob || !form.gender || !form.country || !form.state || !form.district || !districts.includes(form.district)) {
      setError("Please complete all mandatory fields marked with * and select a valid district from the list.");
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
              <div className="smc-field"><label>Father's Name <span className="smc-required">*</span></label><input value={form.fatherName} onChange={e=>update("fatherName",e.target.value)} placeholder="Father's full name" required /></div>
              <div className="smc-field"><label>Spouse's Name</label><input value={form.spouseName} onChange={e=>update("spouseName",e.target.value)} placeholder="Husband's / wife's name (optional)" /></div>
              <div className="smc-field"><label>Date of Birth <span className="smc-required">*</span></label><input type="date" value={form.dob} onChange={e=>update("dob",e.target.value)} required max={new Date().toISOString().slice(0,10)} /></div>
              <div className="smc-field"><label>Gender <span className="smc-required">*</span></label><select value={form.gender} onChange={e=>update("gender",e.target.value)} required><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></div>
              <div className="smc-field" style={{gridColumn:"span 2"}}><label>Alternative Names</label><input value={form.alternativeNames} onChange={e=>update("alternativeNames",e.target.value)} placeholder="Aliases, maiden name, initials or spelling variants" /><span className="smc-hint">Separate multiple names with commas.</span></div>
            </div>
          </section>

          <div className="smc-divider" />
          <section className="smc-section">
            <div className="smc-section-head"><span className="smc-step">02</span><div><h2>Preferred search location</h2><small>District is mandatory. Court complex is optional.</small></div></div>
            <div className="smc-grid">
              <div className="smc-field"><label>Country <span className="smc-required">*</span></label><select value={form.country} onChange={e=>update("country",e.target.value)}><option>India</option></select></div>
              <div className="smc-field"><label>State / Union Territory <span className="smc-required">*</span></label><select value={form.state} onChange={e=>{setForm(f=>({...f,state:e.target.value,district:"",courtComplex:""}));setSubmitted(false);setError("");}}>{states.map(s=><option key={s}>{s}</option>)}</select></div>
              <div className="smc-field"><label>District <span className="smc-required">*</span></label><input list="smc-district-options" value={form.district} onChange={e=>update("district",e.target.value)} placeholder={districts.length ? "Type or select district" : "District list not configured yet"} required disabled={!districts.length} /><datalist id="smc-district-options">{districts.map(d=><option key={d} value={d}/>)}</datalist>{!districts.length && <span className="smc-hint">District directory for this state will be added in a later release. West Bengal is available in this first version.</span>}</div>
              <div className="smc-field" style={{gridColumn:"span 2"}}><label>Court Complex / Establishment</label><input value={form.courtComplex} onChange={e=>update("courtComplex",e.target.value)} placeholder={form.district ? "Optional — leave blank to include all supported establishments" : "Select a district first"} disabled={!form.district} /><span className="smc-hint">Court establishment directory and district-wise suggestions will be connected in a later release.</span></div>
            </div>
            <div className="smc-note">Your selected district is the preferred starting location. Where records and supported sources allow, related appeals or connected proceedings in other districts, the High Court or appellate courts may also be relevant.</div>
          </section>

          <div className="smc-divider" />
          <section className="smc-section">
            <div className="smc-section-head"><span className="smc-step">03</span><div><h2>Search period</h2><small>Both years are optional. Leave blank for all available years.</small></div></div>
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
          <span className="smc-badge">VERSION 1 · FORM TEST</span>
          <h3>Details validated successfully</h3>
          <p>The form is working. Live court-record discovery has not been connected yet, so no case search has been performed and no results are being represented as real.</p>
          <p><strong>Search profile:</strong> {[form.firstName,form.middleName,form.lastName].filter(Boolean).join(" ")} · {form.district}, {form.state} · {form.fromYear || "Any year"}–{form.toYear || "Present"}</p>
          <p>Next development stage: connect approved court-record sources, build identity matching, and return verifiable case records with official source links.</p>
        </section>}
      </main>
      <footer className="smc-footer">SearchMyCases · A Sanhita360 legal discovery prototype · Not legal advice</footer>
    </div>
  );
}
