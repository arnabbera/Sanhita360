import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCourseBySlug } from "../../../../services/courseService";
import { payForGuestCourse } from "../../../../services/razorpayPaymentService";
import useCoursePricing, { formatINR } from "../../../../hooks/useCoursePricing";

export default function GuestCheckoutPage() {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const pricing = useCoursePricing();
  const [course, setCourse] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    let active = true;
    getCourseBySlug(courseSlug).then((result) => {
      if (active) setCourse(result?.status === "published" ? result : null);
    }).catch(() => { if (active) setError("Unable to load this course."); });
    return () => { active = false; };
  }, [courseSlug]);

  const pay = async (event) => {
    event.preventDefault();
    if (!course || paying) return;
    setPaying(true);
    setError("");
    try {
      await payForGuestCourse({ courseId: course.id, courseTitle: course.title,
        name: name.trim(), email: email.trim().toLowerCase() });
      navigate("/claim-purchase");
    } catch (paymentError) {
      setError(paymentError.message || "Checkout could not be completed.");
    } finally { setPaying(false); }
  };

  return (
    <main className="guest-page">
      <section className="guest-card">
        <Link to={`/courses/${courseSlug}`}>← Back to course</Link>
        <h1>Enroll without signing in</h1>
        {course ? <p><strong>{course.title}</strong></p> : <p>Loading course…</p>}
        <p>Enter your email for the payment contact details. The final price is confirmed before you pay
          ({pricing ? formatINR(pricing.amount) : "₹99 for the first 100 checkout reservations, then ₹299"}).</p>
        <form onSubmit={pay}>
          <label>Your name<input required maxLength={120} autoComplete="name" value={name}
            onChange={(event) => setName(event.target.value)} /></label>
          <label>Email address<input required type="email" maxLength={254} autoComplete="email" value={email}
            onChange={(event) => setEmail(event.target.value)} /></label>
          <button disabled={!course || paying} type="submit">{paying ? "Opening checkout…" : "Continue to secure payment"}</button>
        </form>
        <p>After payment, sign in with the same email address to access your course. Save the private
          purchase code as a backup. The email must be verified before course access is granted.</p>
        {error && <p className="guest-error" role="alert">{error} If you paid, use <Link to="/claim-purchase">Recover a purchase</Link>.</p>}
        <p>Already have an account? <Link to={`/login?next=${encodeURIComponent(`/student/courses/${courseSlug}`)}`}>Sign in and enroll</Link>.</p>
      </section>
      <style>{`
        .guest-page { min-height: 100vh; padding: 56px 20px; background: #eff6ff; color: #0f172a; font-family: Arial, sans-serif; }
        .guest-card { max-width: 580px; margin: auto; padding: 32px; border-radius: 18px; background: #fff; box-shadow: 0 15px 40px #1d4ed81c; }
        .guest-card h1 { margin: 24px 0 14px; font-size: 30px; }
        .guest-card p { line-height: 1.6; }
        .guest-card a { color: #1d4ed8; }
        .guest-card form { display: grid; gap: 16px; margin: 26px 0; }
        .guest-card label { display: grid; gap: 6px; font-weight: 700; }
        .guest-card input { width: 100%; padding: 12px; border: 1px solid #94a3b8; border-radius: 8px; font: inherit; }
        .guest-card button { padding: 14px; border: 0; border-radius: 9px; background: #1d4ed8; color: white; font: inherit; font-weight: 700; cursor: pointer; }
        .guest-card button:disabled { opacity: .6; cursor: wait; }
        .guest-error { padding: 12px; background: #fef2f2; color: #991b1b; }
      `}</style>
    </main>
  );
}
