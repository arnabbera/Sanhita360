import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { trackFunnelEvent } from "../../../../services/funnelAnalyticsService";
import study from "../../../../data/courses/criminalLawI/introductionStudy.json";
import provisions from "../../../../data/courses/criminalLawI/introductionProvisions.json";

export const criminalCourseId = "criminal-law-i-transitioning-from-ipc-to-bns";
export const freeLessonPath = `/student/free-preview/${criminalCourseId}`;
export const freeSignupPath = `/signup?source=criminal-law-free&next=${encodeURIComponent(freeLessonPath)}`;
const coursePath = `/courses/${criminalCourseId}`;
const checkoutPath = `/checkout/${criminalCourseId}`;
const signupClick = () => { void trackFunnelEvent("signup_click", criminalCourseId); };

export function CriminalLawBrandCard() {
  return <div className="criminal-brand-card">
    <img src="/sanhita360-logo.png" alt="Sanhita360" />
    <span>CRIMINAL LAW I · SELF-PACED</span><strong>Understand IPC.<br />Connect it to BNS.</strong>
    <p>26 chapters · Statutory comparisons · Exam revision</p>
    <div>Read. Compare. Practise.</div>
  </div>;
}

export default function CriminalLawEnrollment({ priceLabel, onEnroll, certificationAvailable }) {
  const { firebaseUser, loading: authLoading } = useAuth();
  const trialPath = firebaseUser ? freeLessonPath : freeSignupPath;
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://www.sanhita360.com${coursePath}?utm_source=whatsapp&utm_campaign=criminal-law-free-lesson`;
  const shareText = `Try Criminal Law I: IPC to BNS on Sanhita360. Create a free account for the complete introductory lesson and a five-question practice test. No payment needed for the free lesson. ${shareUrl}`;
  return <section className="criminal-conversion" aria-labelledby="criminal-start-heading">
    <div className="course-page-container">
      <div className="criminal-free-card">
        <div><span className="content-label">Try the teaching before you enroll</span>
          <h2 id="criminal-start-heading">Start Criminal Law I free</h2>
          <p>Create a free account for the complete Chapter I introduction: IPC Sections 1–5, BNS comparisons, revision notes and a five-question practice test with explanations.</p>
          <p><strong>No payment or phone number needed.</strong> The free lesson does not enroll you in the paid course.</p>
          <Link className="criminal-button" to={trialPath} onClick={firebaseUser ? undefined : signupClick}>{authLoading ? "Checking account…" : firebaseUser ? "Continue free lesson →" : "Start learning free →"}</Link>
          <a className="criminal-text-link" href="#criminal-sample">Read a short sample first</a>
        </div>
        <div className="criminal-inclusions"><h3>What the full course offers</h3><dl>
          <div><dt>Learning format</dt><dd>Self-paced, chapter-wise written study materials in English</dd></div>
          <div><dt>Coverage</dt><dd>26 chapters following the IPC sequence with BNS comparisons</dd></div>
          <div><dt>Assessments</dt><dd>Three mock tests and a final assessment</dd></div>
          <div><dt>Certificate</dt><dd>{certificationAvailable ? "Digital completion certificate after meeting assessment requirements; not an accredited qualification" : "Not available for this course"}</dd></div>
          <div><dt>Access</dt><dd>Sign in with your purchase email after payment to access the course in your student portal</dd></div>
        </dl><p>Check chapter resources for available PDFs. Self-paced checkout does not include live classes. <Link to="/live-online-classes">See live-class options</Link>.</p>
          <Link className="criminal-button" to={checkoutPath} onClick={onEnroll}>{priceLabel} →</Link>
          <p>Need help with access, resources or course suitability? <a href="mailto:beraarnab@gmail.com?subject=Criminal%20Law%20I%20course%20enquiry">Email course support</a>. <Link to="/terms">Read course terms</Link>.</p>
        </div>
      </div>
      <article id="criminal-sample" className="criminal-sample"><span className="content-label">A sample from Chapter I</span>
        <h2>Does criminal law apply only to Indian citizens?</h2>
        <p>{study.practice[2].answer}</p>
        <p>See how the full lesson connects statutory wording, the corresponding BNS provision and a problem-based answer.</p>
        <Link to={trialPath} onClick={firebaseUser ? undefined : signupClick}>Get the complete free lesson and practice test →</Link>
      </article>
      <div className="criminal-founder"><img src="/arnab-founder.jpg" alt="Arnab Bera, founder of Sanhita360" loading="lazy" />
        <div><span className="content-label">The person behind Sanhita360</span><h2>Meet Arnab Bera</h2>
          <p>Founder of Sanhita360, an ICT professional with over 20 years of experience, pursuing an LL.B. at Bankura University. Explore the free lesson to assess whether the learning approach suits you.</p>
          <Link to="/about/founder">Read the founder’s background →</Link>
        </div>
      </div>
      {certificationAvailable && <details className="criminal-sample"><summary>Preview an illustrative completion certificate</summary>
        <div className="criminal-certificate"><img src="/sanhita360-logo.png" alt="Sanhita360" /><p>ILLUSTRATIVE SAMPLE · NOT AN ISSUED CERTIFICATE</p><h3>Certificate of Completion</h3><p>[Learner’s name]</p><strong>Criminal Law I · IPC to BNS</strong><p>Issued only after meeting the applicable course and assessment requirements.</p><small>Private learning certificate; not an accredited degree, diploma or professional licence. Final issued layout may differ.</small></div>
      </details>}
      <article className="criminal-sample"><h2>Know someone studying criminal law?</h2><p>Share the free introductory lesson with a fellow student.</p>
        <a className="criminal-button" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer">Share on WhatsApp</a>{" "}
        <button className="criminal-share-copy" type="button" onClick={async () => { try { await navigator.clipboard.writeText(shareText); setCopied(true); } catch { setCopied(false); } }}>Copy course invitation</button>
        {copied && <p role="status">Invitation copied.</p>}
      </article>
      <details className="criminal-sample"><summary>Who is this course for, and what happens after signup?</summary>
        <p>Designed for LL.B students revising substantive criminal law and learners comparing IPC with BNS. It is a private learning resource, not a degree or a promise of exam results.</p>
        <p>Free signup opens Chapter I and its practice test. Paid enrollment opens the full course through your student account. Use the same verified email for payment and sign-in. <Link to="/claim-purchase">Recover an existing purchase</Link>.</p>
      </details>
    </div>
    <div className="criminal-mobile-bar"><Link to={trialPath} onClick={firebaseUser ? undefined : signupClick}>{firebaseUser ? "Free lesson" : "Start free"}</Link><Link to={checkoutPath} onClick={onEnroll}>{priceLabel}</Link></div>
    <style>{criminalStyles}</style>
  </section>;
}

const quiz = [
  { question: "The territorial rule in IPC 2 / BNS 1(3) refers to:", options: ["Only Indian citizens", "Every person, subject to the applicable legal rules", "Only public servants"], answer: 1, explanation: study.practice[2].answer },
  { question: "Which provision corresponds to IPC Section 4’s extra-territorial application?", options: ["BNS 1(5)", "BNS 1(1)", "BNS 1(6)"], answer: 0, explanation: study.practice[1].answer },
  { question: "Does IPC Section 3 create unrestricted worldwide jurisdiction?", options: ["Yes, for every foreign act", "Only when the complaint is filed in India", "No; a legal basis for Indian trial must be identified"], answer: 2, explanation: study.practice[3].answer },
  { question: "For the Indian-registered ship/aircraft limb, must the person also be an Indian citizen?", options: ["Yes, always", "No; that limb says any person", "Only for an aircraft"], answer: 1, explanation: study.practice[5].answer },
  { question: "Does a later complaint alone determine whether IPC or BNS applies?", options: ["No; analyse the conduct date and applicable savings", "Yes, always", "Only the place of complaint matters"], answer: 0, explanation: study.practice[7].answer },
];

export function CriminalLawFreeLesson() {
  const { firebaseUser, loading } = useAuth();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { if (firebaseUser) void trackFunnelEvent("free_lesson_open", criminalCourseId); }, [firebaseUser]);
  if (loading) return <p role="status">Loading your free lesson…</p>;
  if (!firebaseUser) return <Navigate to={freeSignupPath} replace />;
  const score = quiz.reduce((total, item, index) => total + Number(answers[index] === item.answer), 0);
  return <main className="criminal-lesson"><Link to={`/student/courses/${criminalCourseId}`}>← Back to Criminal Law I</Link>
    <span className="content-label">Your free complete introductory lesson</span><h1>Chapter I — Introduction: IPC to BNS</h1>
    <p>Read the lesson, then try the five-question practice test. No paid enrollment is required. This practice score does not count towards certification.</p>
    <h2>Learning objectives</h2><ul>{study.objectives.map((text) => <li key={text}>{text}</li>)}</ul>
    <h2>Historical introduction</h2><p>{study.enactmentDate}</p><p>{study.preamble}</p>
    <h2>Transition and application</h2><p>{study.transition}</p>
    {study.groups.map((group) => <section key={group.title}><h2>{group.title}</h2><p className="criminal-preserve">{group.explanation}</p>
      {provisions.filter((row) => group.sections.includes(row.ipc)).map((row) => <article className="criminal-sample" key={row.ipc}><h3>IPC {row.ipc} — {row.title}</h3><p>{row.statusNote}</p><blockquote>{row.statutoryText}</blockquote><p><strong>BNS comparison:</strong> {row.bns}</p><p>{row.note}</p></article>)}
    </section>)}
    <h2>Revision notes</h2><ul>{study.keyPoints.map((text) => <li key={text}>{text}</li>)}</ul><h2>Exam focus</h2><p>{study.examFocus}</p>
    <h2>Practice questions and model answers</h2>{study.practice.map((item) => <details key={item.question} className="criminal-sample"><summary>{item.question}</summary><p>{item.answer}</p></details>)}
    <h2>Official reading</h2><ul>{study.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul>
    <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); void trackFunnelEvent("free_quiz_complete", criminalCourseId); }}>
      <h2>Check your understanding</h2><p>Answer all five questions to see your score and explanations.</p>
      {quiz.map((item, index) => <fieldset key={item.question}><legend>{index + 1}. {item.question}</legend>{item.options.map((option, optionIndex) => <label key={option}><input type="radio" name={`question-${index}`} required checked={answers[index] === optionIndex} disabled={submitted} onChange={() => setAnswers({ ...answers, [index]: optionIndex })} /> {option}</label>)}
        {submitted && <p><strong>{answers[index] === item.answer ? "Correct." : `Correct answer: ${item.options[item.answer]}.`}</strong> {item.explanation}</p>}
      </fieldset>)}
      {submitted ? <div role="status"><h3>Your score: {score} / {quiz.length}</h3><button type="button" onClick={() => { setAnswers({}); setSubmitted(false); }}>Try again</button></div> : <button type="submit">Check my answers</button>}
    </form>
    <section className="criminal-sample"><h2>Continue with the full 26-chapter course</h2><p>Explore the full curriculum, current price and assessment requirements before enrolling.</p><Link to={`/student/courses/${criminalCourseId}`}>View full course and current price →</Link></section>
    <style>{criminalStyles}</style>
  </main>;
}

const criminalStyles = `
.criminal-conversion,.criminal-lesson,.criminal-conversion *,.criminal-lesson *{box-sizing:border-box}
.criminal-conversion{padding:42px 0;background:#f1f5f9;color:#172640}
.criminal-free-card{display:grid;grid-template-columns:1fr 1fr;gap:32px;padding:30px;background:white;border:1px solid #cbd5e1;border-radius:18px}
.criminal-conversion h2{font-size:clamp(24px,3vw,32px);line-height:1.25;margin:8px 0 16px;color:#12243c}
.criminal-conversion p,.criminal-conversion dd{line-height:1.75;color:#475569;font-size:15px}
.criminal-conversion a,.criminal-lesson a{color:#1d4ed8}
.criminal-conversion .criminal-button,.criminal-lesson button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:12px 20px;border-radius:9px;background:#1d4ed8;color:#fff;text-decoration:none;font-weight:750;border:0;font:inherit;cursor:pointer}
.criminal-text-link{display:block;margin-top:16px}
.criminal-inclusions{padding:22px;background:#eff6ff;border-radius:12px}
.criminal-inclusions h3{margin-top:0}.criminal-inclusions dl{margin:0}.criminal-inclusions dl>div{padding:10px 0;border-bottom:1px solid #dbeafe}.criminal-inclusions dt{font-weight:750}.criminal-inclusions dd{margin:3px 0 0}
.criminal-sample{margin:24px 0;padding:24px;background:#fff;border:1px solid #cbd5e1;border-radius:12px;scroll-margin-top:24px}
.criminal-sample summary{cursor:pointer;font-weight:700;line-height:1.6}
.criminal-founder{display:flex;align-items:center;gap:26px;padding:24px;background:white;border-radius:14px}.criminal-founder img{width:140px;height:170px;object-fit:cover;border-radius:10px}.criminal-founder>div{min-width:0}
.criminal-share-copy{padding:12px 18px;min-height:46px;background:white;border:1px solid #1d4ed8;color:#1d4ed8;border-radius:9px;font:inherit;cursor:pointer}
.criminal-certificate{padding:32px;margin-top:20px;border:5px double #b79a57;background:#fffcf4;text-align:center}.criminal-certificate img{width:150px;height:auto}.criminal-certificate h3{font-family:Georgia,serif;font-size:30px;color:#12243c}.criminal-certificate small{display:block;margin-top:20px;line-height:1.7}
.criminal-mobile-bar{display:none}
.public-course-page .course-hero-media:has(.criminal-brand-card){aspect-ratio:auto;min-height:360px;width:100%;min-width:0}
.criminal-brand-card{display:flex;flex-direction:column;justify-content:center;gap:18px;padding:30px;height:100%;background:linear-gradient(145deg,#0b1833,#204a88);color:white}
.course-hero-media .criminal-brand-card img{width:165px;height:auto;object-fit:contain;background:white;padding:8px;border-radius:8px}
.criminal-brand-card>span{font-size:11px;letter-spacing:.13em;color:#bfdbfe}.criminal-brand-card>strong{font-size:clamp(26px,3vw,40px);line-height:1.1}.criminal-brand-card p{margin:0;line-height:1.6;color:#dbeafe;font-size:13px}.criminal-brand-card>div{font-size:13px;color:#fde68a}
.criminal-lesson{max-width:950px;margin:auto;padding:30px 24px;color:#172640;line-height:1.8}.criminal-lesson .content-label{display:block;margin-top:25px;color:#1d4ed8}.criminal-lesson h1{font-size:clamp(28px,4vw,42px);line-height:1.25}.criminal-lesson h2{margin-top:32px;font-size:24px}.criminal-preserve{white-space:pre-line}.criminal-lesson blockquote{border-left:4px solid #2563eb;padding-left:18px;margin-left:0}.criminal-lesson fieldset{margin:22px 0;border:1px solid #cbd5e1;border-radius:12px;padding:18px}.criminal-lesson legend{font-weight:700;padding:0 8px}.criminal-lesson label{display:block;padding:10px;cursor:pointer}.criminal-lesson input{accent-color:#1d4ed8}
@media(max-width:700px){.criminal-free-card{grid-template-columns:1fr;padding:20px;gap:22px}.criminal-founder{align-items:flex-start;flex-direction:column}.criminal-founder img{width:100px;height:120px}.criminal-mobile-bar{display:flex;position:fixed;bottom:0;left:0;right:0;z-index:40;gap:10px;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:white;box-shadow:0 -4px 20px #0f172a20}.criminal-mobile-bar a{flex:1;display:flex;align-items:center;justify-content:center;min-height:44px;text-decoration:none;border:1px solid #1d4ed8;border-radius:8px;font-weight:700;font-size:13px}.criminal-mobile-bar a:last-child{background:#1d4ed8;color:white}.public-course-page:has(.criminal-conversion){padding-bottom:80px}.criminal-brand-card{padding:22px;gap:12px}.criminal-lesson{padding:24px 16px}}
`;
