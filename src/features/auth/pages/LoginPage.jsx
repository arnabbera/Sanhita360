import { trackFunnelEvent } from "../../../services/funnelAnalyticsService";
import { criminalCourseId, freeLessonPath, freeEntryPath } from "../../public/courses/components/CriminalLawEnrollment";
import { useEffect, useRef, useState } from "react";
import {
  FaGoogle,
  FaInfoCircle,
} from "react-icons/fa";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import { emailLinkOnCurrentPage, emailLinkPendingKey } from "../../../services/authService";

const signupNamePendingKey = "sanhita360-signup-pending-name";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { signIn, signInWithEmail, requestEmailSignInLink } = useAuth();
  const isSignUp = location.pathname === "/signup";
  const isCourseLogin = !isSignUp && (searchParams.get("source") === "law-courses" || searchParams.get("next")?.startsWith("/student/courses/") || searchParams.get("next") === "/student/free-preview/law-of-torts-mv-and-cp-laws");
  const simplifiedEntry = isSignUp || isCourseLogin;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState(() => window.localStorage.getItem(emailLinkPendingKey) || "");
  const [fullName, setFullName] = useState(() => window.localStorage.getItem(signupNamePendingKey) || "");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailOpen, setEmailOpen] = useState(() => emailLinkOnCurrentPage() || window.location.pathname === "/signup");
  const [linkSent, setLinkSent] = useState(false);
  const completionStarted = useRef(false);
  const completingEmailLink = emailLinkOnCurrentPage();
  const next = searchParams.get("next");
  const isCriminalTrial = next === freeLessonPath || searchParams.get("source") === "criminal-law-free";
  const safeNext = (next === "/student/free-preview/law-of-torts-mv-and-cp-laws" || next === freeLessonPath || next === "/claim-purchase" || next?.startsWith("/student/courses/")) &&
    !next.startsWith("//") && !next.includes("\\") &&
    !next.includes("?") && !next.includes("#") ? next : "/student";
  const destination = isCriminalTrial ? freeLessonPath : isCourseLogin ? safeNext : window.localStorage.getItem("sanhita360-guest-latest")
    ? "/claim-purchase" : safeNext;

  useEffect(() => {
    if (isCriminalTrial) void trackFunnelEvent("signup_view", criminalCourseId);
  }, [isCriminalTrial]);

  const continueAfterLogin = async ({ firebaseUser, profile, isNewUser }) => {
    if (isCriminalTrial) {
      void trackFunnelEvent("auth_success", criminalCourseId);
      if (isNewUser) void trackFunnelEvent("signup_complete", criminalCourseId);
      navigate(freeLessonPath, { replace: true });
      return;
    }
    if (profile?.role === "admin") {
      navigate("/admin", { replace: true });
      return;
    }
    if (firebaseUser.emailVerified) {
      try {
        const response = await fetch("/api/guest/claim-email", {
          method: "POST",
          headers: { "content-type": "application/json",
            authorization: `Bearer ${await firebaseUser.getIdToken()}` },
          body: "{}",
        });
        if (response.ok) {
          const { claimed = [] } = await response.json();
          if (claimed.length && destination === "/claim-purchase") {
            window.localStorage.removeItem("sanhita360-guest-latest");
            for (const courseId of claimed) {
              window.localStorage.removeItem(`sanhita360-guest-${courseId}`);
            }
            navigate("/student/enrolled-courses", { replace: true });
            return;
          }
        }
      } catch (claimError) {
        console.warn("Unable to check purchases on sign-in", claimError);
      }
    }
    navigate(destination, { replace: true });
  };

  const describeEmailError = (authError) => {
    if (authError.code === "auth/operation-not-allowed") {
      return "Email sign-in is not enabled yet. Please contact Sanhita360 support.";
    }
    if (authError.code === "auth/invalid-action-code" || authError.code === "auth/expired-action-code") {
      return "This email link has expired or was already used. Request a new one.";
    }
    return authError.message || "Email sign-in failed. Please try again.";
  };

  const finishEmailSignIn = async (address) => {
    if (completionStarted.current) return;
    completionStarted.current = true;
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithEmail(address, isSignUp ? { fullName } : undefined);
      if (isSignUp) window.localStorage.removeItem(signupNamePendingKey);
      await continueAfterLogin(result);
    } catch (loginError) {
      if (isCriminalTrial) void trackFunnelEvent("signup_error", criminalCourseId);
      setError(describeEmailError(loginError));
      completionStarted.current = false;
    } finally { setIsLoading(false); }
  };

  useEffect(() => {
    if (!isSignUp && completingEmailLink && email && !completionStarted.current) {
      void finishEmailSignIn(email);
    }
    // An email link is handled once, even when React runs effects twice in development.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEmail = async (event) => {
    event.preventDefault();
    if (isSignUp && fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (completingEmailLink) {
      await finishEmailSignIn(email);
      return;
    }
    setIsLoading(true);
    setError("");
    if (isCriminalTrial) void trackFunnelEvent("signup_attempt", criminalCourseId);
    try {
      await requestEmailSignInLink(email, destination, {
        signUp: isSignUp,
        source: isCourseLogin ? "law-courses" : "",
      });
      if (isSignUp) window.localStorage.setItem(signupNamePendingKey, fullName.trim());
      setLinkSent(true);
      if (isCriminalTrial) void trackFunnelEvent("email_link_sent", criminalCourseId);
    } catch (emailError) {
      if (isCriminalTrial) void trackFunnelEvent("signup_error", criminalCourseId);
      setError(describeEmailError(emailError));
    }
    finally { setIsLoading(false); }
  };

  const handleGoogleLogin = async () => {
    if (isSignUp && !isCriminalTrial && !termsAccepted) {
      setError("Please agree to the Terms and Conditions and Privacy Policy to continue.");
      return;
    }
    try {
      setIsLoading(true);
      setError("");

      if (isCriminalTrial) void trackFunnelEvent("signup_attempt", criminalCourseId);
      await continueAfterLogin(await signIn());
    } catch (loginError) {
      console.error(loginError);
      if (isCriminalTrial) void trackFunnelEvent("signup_error", criminalCourseId);

      if (loginError.code === "auth/popup-closed-by-user") {
        setError("Google login was cancelled.");
      } else if (loginError.code === "auth/popup-blocked") {
        setError("Please allow pop-ups and try again.");
      } else {
        setError("Google login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const googleButton = (
    <button type="button" onClick={handleGoogleLogin} disabled={isLoading} className="student-login-google">
      <FaGoogle />
      {isLoading ? "Signing in..." : "Continue with Google"}
    </button>
  );

  return (
    <main className="student-login-page">
      <section className={`student-login-card${isSignUp ? " is-signup" : ""}`}>
        <div className="student-login-brand" aria-hidden="true">
          <img src="/sanhita360-logo.png" alt="Sanhita360" style={{ width: 175, maxWidth: "100%", height: "auto" }} />
        </div>

        <div className="student-login-heading">
          {!isCriminalTrial && <p className="student-login-eyebrow">Sanhita360</p>}

          <h1>{isCriminalTrial ? "Start Criminal Law I free" : isSignUp ? "Sign Up" : isCourseLogin ? "Log In" : "Student Login"}</h1>

          {!isCriminalTrial && <p>
            {isCriminalTrial ? "Get the complete introductory lesson and a five-question practice test with explanations. No payment or phone number needed." : isSignUp
              ? "Create your account to access courses, tests and learning materials. No phone number is needed."
              : isCourseLogin
                ? "Access your courses, tests and more under your account."
                : "Sign in with Google or your email address to access courses, learning materials, mock tests and certificates."}
          </p>}
        </div>

        {error && (
          <div className="student-login-error" role="alert">
            {error}
          </div>
        )}

        {isSignUp && !isCriminalTrial && (
          <form className="student-signup-form" onSubmit={handleEmail}>
            <label htmlFor="student-signup-name">Full name</label>
            <input id="student-signup-name" type="text" autoComplete="name" minLength={2} maxLength={120} required
              value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Enter your full name" />
            <label htmlFor="student-signup-email">Email</label>
            <input id="student-signup-email" type="email" autoComplete="email" required
              value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" />
            <label className="student-signup-consent">
              <input type="checkbox" required checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)} />
              <span>By continuing, I agree to the <Link to="/terms" target="_blank" rel="noreferrer">Terms and Conditions</Link> and <Link to="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</Link>.</span>
            </label>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Please wait..." : completingEmailLink ? "Complete sign up" : linkSent ? "Resend link" : "Continue"}
            </button>
            {linkSent && <p role="status">Check your inbox for a secure sign-up link. Open it, then confirm your details to finish.</p>}
            {completingEmailLink && <p>Confirm the full name and email address used to request this link.</p>}
            {completingEmailLink && <Link to={isCriminalTrial ? freeEntryPath : "/signup?source=law-courses"}>Request a new link</Link>}
          </form>
        )}

        {isSignUp && !isCriminalTrial && <div className="student-signup-divider">OR</div>}
        {googleButton}

        {!isSignUp && <div className="student-login-email">
          <button type="button" className="student-login-email-toggle" onClick={() => setEmailOpen((open) => !open)}>
            Continue with email instead
          </button>
          {emailOpen && (
            <form onSubmit={handleEmail}>
              {!completingEmailLink && <p>We will email you a secure link to sign in to your student account.</p>}
              <label htmlFor="student-login-email-address">Email address</label>
              <input id="student-login-email-address" type="email" autoComplete="email" required
                value={email} onChange={(event) => setEmail(event.target.value)} />
              <button type="submit" disabled={isLoading}>
                {completingEmailLink ? "Complete email sign-in" : "Send sign-in link"}
              </button>
              {linkSent && <p role="status">Check your inbox for a secure sign-in link. Open it to enter your student dashboard.</p>}
              {completingEmailLink && <p>Enter the same email address that received the link.</p>}
            </form>
          )}
        </div>}

        {isSignUp && !isCriminalTrial && <p className="student-login-return">Already have an account? <Link to={isCriminalTrial ? `/login?next=${encodeURIComponent(freeLessonPath)}` : "/login"}>Log in</Link></p>}

        {!simplifiedEntry && !isCriminalTrial && <>
        <p className="student-login-role-note">
          Students and administrators use the same secure sign-in. You will
          automatically be directed to the correct dashboard.
        </p>

        <div className="student-login-benefits">
          <h2>What you get with a course</h2>
          <ul>
            <li>Chapter-wise learning materials and downloadable PDFs</li>
            <li>Practice mock tests and progress in your student portal</li>
            <li>A digital Certificate of Completion</li>
          </ul>
        </div>

        <aside className="student-login-disclaimers" aria-label="Terms and disclaimer">
          <details>
            <summary className="student-login-disclaimer-title">
              <FaInfoCircle aria-hidden="true" />
              <span>
                <strong>Terms &amp; Disclaimer</strong>
                <small>Independent portal; certificate is for personal learning, not an accredited qualification. Read before enrolling.</small>
              </span>
              <span className="student-login-disclaimer-toggle" aria-hidden="true">⌄</span>
            </summary>

            <div className="student-login-disclaimer-section">
              <h3>1. Independent Entity Disclaimer</h3>
              <p>
                Sanhita360 is an independent, private educational portal.
                We are <strong>not</strong> affiliated with, endorsed by,
                accredited by, or connected to any government agency,
                university, or official educational board.
              </p>
            </div>

            <div className="student-login-disclaimer-section">
              <h3>2. Individual Course Enrollment</h3>
              <p>
                Each course requires a one-time <strong>₹99 introductory fee for the first 100 checkout reservations, then ₹299</strong>.
                After successful payment, that course and its learning materials
                become available under Enrolled Courses in the student portal.
              </p>
            </div>

            <div className="student-login-disclaimer-section">
              <h3>3. Certification Included</h3>
              <p>
                The <strong>individual course fee</strong> covers course access,
                access to downloadable course PDFs, practice mock tests, and a
                digital Certificate of Completion.
              </p>

              <p className="student-login-important-notice">
                <strong>Important Notice:</strong> The certificate issued by
                Sanhita360 is an appreciation/completion document for
                personal learning only. It <strong>does not</strong> constitute
                an accredited academic degree, official diploma, professional
                licence, or government qualification.
              </p>
            </div>
            <p className="student-login-legal-links">
              <Link to="/terms">Full Terms</Link>
              <Link to="/disclaimer">Full Disclaimer</Link>
            </p>
          </details>
        </aside>
        </>}
      </section>

      <style>{`
        .student-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background:
            radial-gradient(circle at top right, rgba(37, 99, 235, 0.18), transparent 34%),
            linear-gradient(145deg, #0f172a 0%, #173376 58%, #2563eb 100%);
          font-family: Georgia, "Times New Roman", serif;
        }

        .student-login-card {
          width: min(100%, 680px);
          padding: 42px;
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 28px 70px rgba(15, 23, 42, 0.28);
        }

        .student-login-brand {
          width: 190px;
          height: 78px;
          display: grid;
          place-items: center;
          margin: 0 auto 18px;
          border-radius: 18px;
          background: #dbeafe;
          color: #2563eb;
          font-size: 28px;
        }

        .student-login-heading {
          text-align: center;
        }

        .student-login-eyebrow {
          margin: 0;
          color: #2563eb;
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .student-login-heading h1 {
          margin: 10px 0 0;
          color: #0f172a;
          font-size: clamp(32px, 6vw, 44px);
          line-height: 1.1;
        }

        .student-login-heading > p:last-child {
          max-width: 460px;
          margin: 14px auto 0;
          color: #64748b;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.65;
        }

        .student-login-error {
          margin-top: 22px;
          padding: 12px 14px;
          border: 1px solid #fecaca;
          border-radius: 12px;
          background: #fef2f2;
          color: #b91c1c;
          font-family: Arial, sans-serif;
          font-size: 14px;
        }

        .student-login-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 28px;
          padding: 15px 20px;
          border: 0;
          border-radius: 12px;
          background: #2563eb;
          color: #ffffff;
          cursor: pointer;
          font-family: Arial, sans-serif;
          font-size: 16px;
          font-weight: 700;
          box-shadow: 0 12px 24px rgba(37, 99, 235, 0.24);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .student-login-google:hover:not(:disabled) {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .student-login-google:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .student-login-card.is-signup .student-login-google { margin-top: 16px; }

        .student-signup-form {
          display: grid;
          gap: 9px;
          margin-top: 26px;
          color: #0f172a;
          font-family: Arial, sans-serif;
        }

        .student-signup-form > label:not(.student-signup-consent) {
          font-size: 14px;
          font-weight: 700;
        }

        .student-signup-form > input {
          width: 100%;
          min-height: 46px;
          margin-bottom: 8px;
          padding: 11px 13px;
          border: 1px solid #94a3b8;
          border-radius: 9px;
          background: #fff;
          color: #0f172a;
          font: inherit;
        }

        .student-signup-consent {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 5px 0 9px;
          color: #475569;
          font-size: 13px;
          line-height: 1.5;
        }

        .student-signup-consent input { margin-top: 3px; flex: none; }
        .student-signup-consent a { color: #1d4ed8; font-weight: 700; }

        .student-signup-form > button {
          min-height: 48px;
          border: 0;
          border-radius: 10px;
          background: #2563eb;
          color: #fff;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .student-signup-form > button:disabled { cursor: wait; opacity: .7; }
        .student-signup-form p { margin: 7px 0 0; color: #475569; font-size: 13px; line-height: 1.5; }

        .student-signup-divider {
          margin-top: 22px;
          color: #64748b;
          font-family: Arial, sans-serif;
          font-size: 14px;
          text-align: center;
        }

        .student-signup-form > input:focus-visible,
        .student-signup-form > button:focus-visible,
        .student-login-google:focus-visible {
          outline: 3px solid #93c5fd;
          outline-offset: 2px;
        }

        .student-login-role-note {
          margin: 16px 0 0;
          color: #64748b;
          font-family: Arial, sans-serif;
          font-size: 13px;
          line-height: 1.55;
          text-align: center;
        }

        .student-login-email {
          margin-top: 16px;
          font-family: Arial, sans-serif;
        }

        .student-login-email h2 {
          margin: 24px 0 0;
          color: #0f172a;
          font-size: 17px;
        }

        .student-login-return {
          margin: 20px 0 10px;
          color: #475569;
          font-family: Arial, sans-serif;
          text-align: center;
        }

        .student-login-return a { color: #1d4ed8; font-weight: 700; }

        .student-login-email-toggle,
        .student-login-email form button {
          width: 100%;
          padding: 13px 16px;
          border: 1px solid #2563eb;
          border-radius: 10px;
          background: #fff;
          color: #1d4ed8;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .student-login-email form {
          display: grid;
          gap: 10px;
          margin-top: 14px;
          color: #0f172a;
        }

        .student-login-email input {
          width: 100%;
          padding: 12px;
          border: 1px solid #94a3b8;
          border-radius: 8px;
          font: inherit;
        }

        .student-login-email form p {
          margin: 0;
          color: #475569;
          font-size: 13px;
          line-height: 1.5;
        }

        .student-login-disclaimers {
          margin-top: 26px;
          padding: 20px;
          border: 1px solid #bfdbfe;
          border-radius: 16px;
          background: #eff6ff;
        }

        .student-login-benefits {
          margin-top: 26px;
          font-family: Arial, sans-serif;
        }

        .student-login-benefits h2 {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 17px;
        }

        .student-login-benefits ul {
          margin: 0;
          padding-left: 21px;
          color: #475569;
          font-size: 14px;
          line-height: 1.8;
        }

        .student-login-disclaimer-title {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #1d4ed8;
          cursor: pointer;
          list-style: none;
        }

        .student-login-disclaimer-title::-webkit-details-marker {
          display: none;
        }

        .student-login-disclaimer-title:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 5px;
        }

        .student-login-disclaimer-title strong {
          display: block;
          font-family: Arial, sans-serif;
          font-size: 16px;
        }

        .student-login-disclaimer-title small {
          display: block;
          margin-top: 5px;
          color: #475569;
          font-family: Arial, sans-serif;
          font-size: 12px;
          line-height: 1.5;
        }

        .student-login-disclaimer-title svg {
          flex-shrink: 0;
        }

        .student-login-disclaimer-toggle {
          margin-left: auto;
          font-size: 25px;
          line-height: 1;
          transition: transform .2s ease;
        }

        .student-login-disclaimers details[open] .student-login-disclaimer-toggle {
          transform: rotate(180deg);
        }

        .student-login-disclaimer-section {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #bfdbfe;
          color: #334155;
          font-family: Arial, sans-serif;
        }

        .student-login-disclaimer-section h3 {
          margin: 0 0 7px;
          color: #0f172a;
          font-size: 14px;
          line-height: 1.45;
        }

        .student-login-disclaimer-section p {
          margin: 0;
          font-size: 13px;
          line-height: 1.65;
        }

        .student-login-important-notice {
          margin-top: 12px !important;
          padding: 12px 14px;
          border-left: 4px solid #f59e0b;
          border-radius: 8px;
          background: #fffbeb;
          color: #78350f;
        }

        .student-login-legal-links {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin: 18px 0 0;
          font-family: Arial, sans-serif;
          font-size: 13px;
        }

        .student-login-legal-links a {
          color: #1d4ed8;
          font-weight: 700;
        }

        @media (max-width: 640px) {
          .student-login-page {
            align-items: flex-start;
            padding: 22px 14px;
          }

          .student-login-card {
            padding: 28px 20px;
            border-radius: 18px;
          }

          .student-login-brand {
            width: 54px;
            height: 54px;
            font-size: 24px;
          }

          .student-login-disclaimers {
            padding: 16px;
          }
        }
      `}</style>
    </main>
  );
}
