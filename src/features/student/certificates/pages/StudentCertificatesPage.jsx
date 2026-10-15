import {
  FaArrowRight,
  FaBookOpen,
  FaCheckCircle,
  FaClipboardCheck,
  FaDownload,
  FaFilePdf,
  FaGraduationCap,
  FaLock,
  FaTrophy,
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { getStudentEnrollments, hasPaidCourseAccess } from "../../../../services/studentEnrollmentService";
import { isAdministrator } from "../../../../utils/adminCourseAccess";

const certificationSteps = [
  {
    number: "01",
    icon: <FaBookOpen />,
    title: "Complete the Course",
    description:
      "Go through the selected course and complete all of its chapters before starting the certification process.",
  },
  {
    number: "02",
    icon: <FaLock />,
    title: "Subscribe to That Course",
    description:
      "Certification subscription is separate for each course. Subscribe only to the course for which you want to appear in the examination.",
  },
  {
    number: "03",
    icon: <FaClipboardCheck />,
    title: "Take Three Mock Tests",
    description:
      "After activation, complete all three course-wise mock tests to prepare for and become eligible for the final examination.",
  },
  {
    number: "04",
    icon: <FaTrophy />,
    title: "Appear for the Final Test",
    description:
      "After completing the required mock tests, appear for the course-wise final examination to qualify for a Certificate of Completion.",
  },
];

const subscriptionBenefits = [
  {
    icon: <FaFilePdf />,
    title: "Downloadable Study Materials",
    description:
      "Download the PDF study materials provided within the chapters of your subscribed course.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Three Mock Tests",
    description:
      "Attempt three structured, course-wise mock tests before the final examination.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Final Examination",
    description:
      "Appear for the final course examination after completing the required mock tests.",
  },
  {
    icon: <FaTrophy />,
    title: "Completion Certificate",
    description:
      "Receive a digital Certificate of Completion after meeting the applicable examination requirements.",
  },
];

export default function StudentCertificatesPage() {
  const navigate = useNavigate();
  const { firebaseUser, profile, role, loading: authLoading } = useAuth();
  const [checkingCourses, setCheckingCourses] = useState(false);
  const [courseError, setCourseError] = useState("");

  const browseMyCourses = async () => {
    if (checkingCourses || authLoading) return;
    const studentId = firebaseUser?.uid || profile?.uid;
    if (!studentId) {
      navigate("/login?next=%2Fstudent%2Fcourses");
      return;
    }
    setCheckingCourses(true);
    setCourseError("");
    try {
      const enrollments = isAdministrator({ role, profile }) ? [] : await getStudentEnrollments(studentId);
      const enrolled = isAdministrator({ role, profile }) || enrollments.some(hasPaidCourseAccess);
      navigate(enrolled ? "/student/enrolled-courses" : "/student/available-courses");
    } catch {
      setCourseError("Unable to check your enrollments. Please try again.");
    } finally {
      setCheckingCourses(false);
    }
  };

  return (
    <div className="ns-certificates-page">
      <section className="ns-certificates-hero">
        <div className="ns-certificates-hero-copy">
          <span className="ns-certificates-eyebrow">
            <FaGraduationCap />
            Course-wise Certification
          </span>

          <h1>Earn a Certificate After Completing Your Course</h1>

          <p>
            Learning all course content is free. If you want to appear for the
            examination and obtain a certificate, you must separately subscribe
            to the certification track for the individual course.
          </p>

          <button type="button" className="ns-certificates-primary-action" onClick={browseMyCourses} disabled={checkingCourses || authLoading}>
            {checkingCourses ? "Checking your courses…" : "Browse My Courses"}
            <FaArrowRight />
          </button>
          {courseError && <p role="alert">{courseError}</p>}
        </div>

        <div className="ns-certificates-hero-card">
          <div className="ns-certificates-hero-icon">
            <FaTrophy />
          </div>

          <strong>Your certification journey</strong>
          <span>Complete chapters</span>
          <FaArrowRight />
          <span>Subscribe per course</span>
          <FaArrowRight />
          <span>Pass 3 mock tests</span>
          <FaArrowRight />
          <span>Take the final exam</span>
        </div>
      </section>

      <section className="ns-certificates-section">
        <div className="ns-certificates-heading">
          <span>HOW IT WORKS</span>
          <h2>Four steps to course certification</h2>
          <p>
            Each certification is linked to one individual course and its
            examination requirements.
          </p>
        </div>

        <div className="ns-certificates-step-grid">
          {certificationSteps.map((step) => (
            <article className="ns-certificates-step" key={step.number}>
              <div className="ns-certificates-step-top">
                <span className="ns-certificates-step-icon">{step.icon}</span>
                <span className="ns-certificates-step-number">
                  {step.number}
                </span>
              </div>

              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ns-certificates-section ns-certificates-benefits">
        <div className="ns-certificates-heading">
          <span>SUBSCRIPTION BENEFITS</span>
          <h2>What is unlocked for a subscribed course?</h2>
        </div>

        <div className="ns-certificates-benefit-grid">
          {subscriptionBenefits.map((benefit) => (
            <article className="ns-certificates-benefit" key={benefit.title}>
              <div>{benefit.icon}</div>

              <section>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </section>

              <FaCheckCircle />
            </article>
          ))}
        </div>
      </section>

      <aside className="ns-certificates-notice">
        <FaDownload />

        <div>
          <strong>Important certification information</strong>
          <p>
            Course reading remains free. PDF downloads, three mock tests, the
            final examination and certificate access apply only to the
            individually subscribed course. The certificate is an
            appreciation/completion document for personal learning; it is not
            an accredited academic degree, professional licence or government
            qualification.
          </p>
        </div>
      </aside>

      <style>{`
        .ns-certificates-page,
        .ns-certificates-page * {
          box-sizing: border-box;
        }

        .ns-certificates-page {
          display: grid;
          gap: 24px;
          color: #0f172a;
        }

        .ns-certificates-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.55fr);
          gap: 28px;
          overflow: hidden;
          border-radius: 24px;
          background:
            radial-gradient(circle at 82% 18%, rgba(147, 197, 253, 0.26), transparent 32%),
            linear-gradient(135deg, #0f172a 0%, #1e3a8a 58%, #2563eb 100%);
          padding: 42px;
          color: #ffffff;
          box-shadow: 0 18px 44px rgba(30, 58, 138, 0.18);
        }

        .ns-certificates-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: #bfdbfe;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .ns-certificates-hero h1 {
          max-width: 760px;
          margin: 16px 0 14px;
          color: #ffffff;
          font-size: clamp(30px, 4vw, 48px);
          line-height: 1.1;
        }

        .ns-certificates-hero-copy > p {
          max-width: 760px;
          margin: 0;
          color: #dbeafe;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.75;
        }

        .ns-certificates-primary-action {
          border: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 11px;
          margin-top: 24px;
          border-radius: 12px;
          background: #ffffff;
          color: #1d4ed8;
          padding: 13px 18px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .ns-certificates-primary-action:disabled { opacity: .7; cursor: wait; }
        .ns-certificates-primary-action:focus-visible { outline: 3px solid #fbbf24; outline-offset: 4px; }

        .ns-certificates-primary-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(15, 23, 42, 0.22);
        }

        .ns-certificates-hero-card {
          display: grid;
          align-content: center;
          justify-items: center;
          gap: 8px;
          border: 1px solid rgba(191, 219, 254, 0.3);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
          padding: 24px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .ns-certificates-hero-icon {
          display: grid;
          width: 62px;
          height: 62px;
          place-items: center;
          margin-bottom: 4px;
          border-radius: 18px;
          background: #facc15;
          color: #1e3a8a;
          font-size: 26px;
        }

        .ns-certificates-hero-card strong {
          margin-bottom: 5px;
          font-size: 17px;
        }

        .ns-certificates-hero-card span {
          color: #dbeafe;
          font-family: Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
        }

        .ns-certificates-hero-card > svg {
          color: #93c5fd;
          font-size: 12px;
          transform: rotate(90deg);
        }

        .ns-certificates-section {
          border: 1px solid #e2e8f0;
          border-radius: 22px;
          background: #ffffff;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
        }

        .ns-certificates-heading span {
          color: #2563eb;
          font-family: Arial, sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
        }

        .ns-certificates-heading h2 {
          margin: 8px 0 7px;
          font-size: 27px;
        }

        .ns-certificates-heading p {
          margin: 0;
          color: #64748b;
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1.6;
        }

        .ns-certificates-step-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-top: 24px;
        }

        .ns-certificates-step {
          min-height: 230px;
          border: 1px solid #dbeafe;
          border-radius: 17px;
          background: linear-gradient(180deg, #eff6ff 0%, #ffffff 100%);
          padding: 20px;
        }

        .ns-certificates-step-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ns-certificates-step-icon {
          display: grid;
          width: 46px;
          height: 46px;
          place-items: center;
          border-radius: 13px;
          background: #2563eb;
          color: #ffffff;
          font-size: 18px;
        }

        .ns-certificates-step-number {
          color: #bfdbfe;
          font-family: Arial, sans-serif;
          font-size: 27px;
          font-weight: 900;
        }

        .ns-certificates-step h3 {
          margin: 22px 0 10px;
          font-size: 18px;
        }

        .ns-certificates-step p,
        .ns-certificates-benefit p,
        .ns-certificates-notice p {
          margin: 0;
          color: #64748b;
          font-family: Arial, sans-serif;
          font-size: 13px;
          line-height: 1.65;
        }

        .ns-certificates-benefits {
          background: #f8fafc;
        }

        .ns-certificates-benefit-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 13px;
          margin-top: 22px;
        }

        .ns-certificates-benefit {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr) 20px;
          align-items: center;
          gap: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: #ffffff;
          padding: 17px;
        }

        .ns-certificates-benefit > div {
          display: grid;
          width: 48px;
          height: 48px;
          place-items: center;
          border-radius: 13px;
          background: #dbeafe;
          color: #2563eb;
          font-size: 19px;
        }

        .ns-certificates-benefit h3 {
          margin: 0 0 5px;
          font-size: 16px;
        }

        .ns-certificates-benefit > svg {
          color: #16a34a;
        }

        .ns-certificates-notice {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          border: 1px solid #fde68a;
          border-radius: 18px;
          background: #fffbeb;
          padding: 22px;
        }

        .ns-certificates-notice > svg {
          flex: 0 0 auto;
          margin-top: 2px;
          color: #d97706;
          font-size: 24px;
        }

        .ns-certificates-notice strong {
          display: block;
          margin-bottom: 7px;
          color: #92400e;
          font-size: 16px;
        }

        .ns-certificates-notice p {
          color: #78350f;
        }

        @media (max-width: 1100px) {
          .ns-certificates-step-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 780px) {
          .ns-certificates-hero {
            grid-template-columns: 1fr;
            padding: 28px;
          }

          .ns-certificates-hero-card {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            align-items: center;
            justify-items: center;
          }

          .ns-certificates-hero-icon,
          .ns-certificates-hero-card strong {
            grid-column: 1 / -1;
          }

          .ns-certificates-hero-card > svg {
            transform: none;
          }

          .ns-certificates-benefit-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .ns-certificates-page {
            gap: 15px;
          }

          .ns-certificates-hero {
            gap: 20px;
            border-radius: 17px;
            padding: 22px 18px;
          }

          .ns-certificates-hero h1 {
            font-size: 29px;
          }

          .ns-certificates-hero-copy > p {
            font-size: 14px;
          }

          .ns-certificates-primary-action {
            width: 100%;
            justify-content: center;
          }

          .ns-certificates-hero-card {
            display: grid;
            grid-template-columns: 1fr;
          }

          .ns-certificates-hero-card > svg {
            transform: rotate(90deg);
          }

          .ns-certificates-section {
            border-radius: 17px;
            padding: 20px 16px;
          }

          .ns-certificates-heading h2 {
            font-size: 22px;
          }

          .ns-certificates-step-grid {
            grid-template-columns: 1fr;
          }

          .ns-certificates-step {
            min-height: 0;
          }

          .ns-certificates-benefit {
            grid-template-columns: 42px minmax(0, 1fr);
            padding: 14px;
          }

          .ns-certificates-benefit > div {
            width: 42px;
            height: 42px;
          }

          .ns-certificates-benefit > svg {
            display: none;
          }

          .ns-certificates-notice {
            padding: 18px;
          }
        }
      `}</style>
    </div>
  );
}
