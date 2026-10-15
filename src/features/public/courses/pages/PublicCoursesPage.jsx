import { trackFunnelEvent } from "../../../../services/funnelAnalyticsService";
import {
  useEffect,
  useState,
} from "react";




import {
  FaArrowRight,
  FaBookOpen,
  FaCertificate,
  FaGraduationCap,
  FaScaleBalanced,
} from "react-icons/fa6";

import {
  FaCheckCircle,
  FaFacebookF,
  FaHeart,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

import {
  Link,
} from "react-router-dom";

import Footer from "../../../home/components/Footer";
import SEO from "../../../../shared/seo/SEO";

import {
  SEO_CONFIG,
} from "../../../../constants/seoConfig";

import {
  getPublishedCourses,
} from "../../../../services/courseService";

import {
  getPublishedChaptersForCourse,
} from "../../../../services/chapterService";
import useCoursePricing, { formatINR } from "../../../../hooks/useCoursePricing";

const CERTIFICATE_COURSES_URL =
  "https://www.sanhita360.com/share/certificate-courses-card-v3";

const SHARE_MESSAGE =
  "Explore Certificate Courses in Legal Studies from Sanhita360.";

// =========================================================
// HELPERS
// =========================================================

const getCourseImage = (
  course,
) =>
  course?.thumbnailUrl ||
  course?.desktopImageUrl ||
  course?.imageUrl ||
  course?.media?.thumbnailUrl ||
  course?.media?.desktopImageUrl ||
  course?.media?.imageUrl ||
  "";

const getCourseUrl = (
  course,
) =>
  `/courses/${
    course?.slug ||
    course?.id ||
    ""
  }`;

// =========================================================
// STRUCTURED DATA
// =========================================================

const createStructuredData = (
  courses,
  pricing,
) => ({
  "@context":
    "https://schema.org",

  "@type":
    "ItemList",

  name:
    "Law Courses and Study Materials",

  description:
    "Explore LL.B courses, law notes, legal study materials and certification preparation from Sanhita360.",

  url:
    `${SEO_CONFIG.siteUrl}/law-courses`,

  numberOfItems:
    courses.length,

  itemListElement:
    courses.map(
      (
        course,
        index,
      ) => ({
        "@type":
          "ListItem",

        position:
          index + 1,

        url:
          `${SEO_CONFIG.siteUrl}${getCourseUrl(
            course,
          )}`,

        name:
          course.title,
        item: {
          "@type": "Course",
          name: course.title,
          url: `${SEO_CONFIG.siteUrl}${getCourseUrl(course)}`,
          provider: { "@type": "EducationalOrganization", name: "Sanhita360" },
          ...(pricing ? { offers: {
            "@type": "Offer", price: (pricing.amount / 100).toFixed(2),
            priceCurrency: "INR", availability: "https://schema.org/InStock",
          } } : {}),
        },
      }),
    ),
});

// =========================================================
// COMPONENT
// =========================================================

export default function PublicCoursesPage() {
  const pricing = useCoursePricing();
  const [
    courses,
    setCourses,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [likes, setLikes] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likePending, setLikePending] = useState(false);
  const [likeError, setLikeError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/law-courses/likes?post=%2Flaw-courses", { credentials: "same-origin" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Unable to load likes.");
        return result;
      })
      .then((result) => {
        if (active) {
          setLikes(result.count);
          setLiked(result.liked);
        }
      })
      .catch(() => { if (active) setLikeError("Likes are temporarily unavailable."); });
    return () => { active = false; };
  }, []);

  const handleLike = async () => {
    if (likePending || liked || likes === null) return;
    setLikePending(true);
    setLikeError("");
    try {
      const response = await fetch("/api/law-courses/likes", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ post: "/law-courses" }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save your like.");
      setLikes(result.count);
      setLiked(result.liked);
    } catch (cause) {
      setLikeError(cause.message);
    } finally {
      setLikePending(false);
    }
  };

  // =======================================================
  // LOAD PUBLISHED COURSES
  // =======================================================

  useEffect(() => {
    let active =
      true;

    const loadCourses =
      async () => {
        try {
          setLoading(true);
          setError("");

          const result =
            await getPublishedCourses();

          const coursesWithChapterCounts =
            await Promise.all(
              (Array.isArray(result)
                ? result
                : []
              ).map(async (course) => {
                const storedTotal = Number(
                  course?.totals?.chapters || 0,
                );

                try {
                  const chapters =
                    await getPublishedChaptersForCourse(
                      course,
                    );

                  return {
                    ...course,
                    previewChapters: Array.isArray(chapters)
                      ? chapters.slice(0, 3).map((chapter) => chapter.title).filter(Boolean)
                      : [],
                    publishedChapterCount:
                      Array.isArray(chapters) &&
                      chapters.length > 0
                        ? chapters.length
                        : storedTotal,
                  };
                } catch (chapterError) {
                  console.warn(
                    `Unable to count chapters for ${course.id}:`,
                    chapterError,
                  );

                  return {
                    ...course,
                    publishedChapterCount: storedTotal,
                  };
                }
              }),
            );

          if (!active) {
            return;
          }

          setCourses(
            coursesWithChapterCounts,
          );
        } catch (loadError) {
          console.error(
            "Unable to load public courses:",
            loadError,
          );

          if (active) {
            setError(
              "Unable to load courses at the moment.",
            );
          }
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      };

    loadCourses();

    return () => {
      active =
        false;
    };
  }, []);

  const structuredData =
    createStructuredData(
      courses,
      pricing,
    );

  return (
    <>
      <SEO
        title="Certificate Courses in Legal Studies | Sanhita360"
        description="Explore chapter-wise certificate courses in legal studies with study materials, mock tests and certification pathways at Sanhita360."
        canonical="/law-courses"
        image="/certificate-courses-hero.jpg"
        keywords={[
          "LLB courses",
          "LLB course online",
          "law courses",
          "law study material",
          "LLB study material",
          "law notes",
          "online law learning",
          "law exam preparation",
          "law certification course",
        ]}
        structuredData={
          structuredData
        }
      />

      <main className="public-courses-page">
        {/* HERO */}

        <section className="courses-hero">
          <div className="courses-container">
            <div className="courses-hero-content">
              <span className="courses-eyebrow">
                <FaScaleBalanced />
                Sanhita360 Legal Learning
              </span>

              <h1>
                Certificate Courses in Legal
                Studies
              </h1>

              <p>
                Build your legal knowledge with
                structured chapter-wise courses,
                study materials, important legal
                concepts, mock-test preparation
                and certification pathways.
              </p>

              <div className="hero-benefits">
                <span>
                  <FaCheckCircle />
                  Chapter-wise learning
                </span>

                <span>
                  <FaCheckCircle />
                  Law study materials
                </span>

                <span>
                  <FaCheckCircle />
                  Mock-test preparation
                </span>

                <span>
                  <FaCheckCircle />
                  Certification options
                </span>
              </div>


            </div>

            <div className="courses-hero-visual">
              <Link className="courses-login-link" to="/login?source=law-courses">
                Log in to your student account <FaArrowRight aria-hidden="true" />
              </Link>
              <img className="courses-hero-image" src="/certificate-courses-hero.jpg" alt="Certificate Courses in Legal Studies at Sanhita360" />
            </div>
          </div>
        </section>

        {/* INTRO */}

        <section className="courses-intro">
          <div className="courses-container">
            <span className="section-label">
              Legal Education
            </span>

            <h2>
              Learn Law Through Structured
              Courses
            </h2>

            <p>
              Sanhita360 provides
              structured learning resources
              designed to help law students
              understand important legal
              principles, prepare for academic
              examinations and test their
              knowledge through assessments.
            </p>
          </div>
        </section>

        {/* COURSES */}

        <section className="courses-section">
          <div className="courses-container">
            <div className="section-heading">
              <div>
                <span className="section-label">
                  Available Courses
                </span>

                <h2>
                  Explore Law Courses
                </h2>
              </div>

              {!loading && (
                <span className="course-count">
                  {courses.length}{" "}
                  {courses.length === 1
                    ? "course"
                    : "courses"}
                </span>
              )}
            </div>

            {loading && (
              <div className="courses-state">
                <div className="course-spinner" />

                <p>
                  Loading courses...
                </p>
              </div>
            )}

            {!loading &&
              error && (
                <div className="courses-error">
                  {error}
                </div>
              )}

            {!loading &&
              !error &&
              courses.length === 0 && (
                <div className="courses-state">
                  <FaBookOpen />

                  <h3>
                    Courses are being
                    prepared
                  </h3>

                  <p>
                    Published law courses will
                    appear here.
                  </p>
                </div>
              )}

            {!loading &&
              !error &&
              courses.length > 0 && (
                <div className="course-grid">
                  {courses.map(
                    (course) => {
                      const image =
                        getCourseImage(
                          course,
                        );

                      const assessmentInformation =
                        course?.assessments ||
                        course?.certification?.assessments ||
                        {};

                      const chapterCount = Number(
                        course?.publishedChapterCount ??
                        course?.totals?.chapters ??
                        0,
                      );

                      const mockTestCount = Number(
                        assessmentInformation?.mockTests?.count ||
                        assessmentInformation?.mockTestCount ||
                        3,
                      );

                      const certificationIncluded =
                        course?.certification?.available ??
                        course?.certificationAvailable ??
                        true;

                      return (
                        <article
                          className="public-course-card"
                          key={
                            course.id
                          }
                        >
                          {image ? (
                            <Link
                              className="course-image"
                              to={getCourseUrl(
                                course,
                              )}
                              aria-label={`View ${course.title}`}
                            >
                              <img
                                src={
                                  image
                                }
                                alt={`${course.title} LL.B course and law study materials`}
                                loading="lazy"
                              />
                            </Link>
                          ) : (
                            <div className="course-image course-image-placeholder">
                              <FaGraduationCap />
                            </div>
                          )}

                          <div className="course-card-content">
                            <div className="course-meta">
                              <span>
                                <FaBookOpen />

                                {chapterCount}{" "}
                                Chapters
                              </span>

                              <span>
                                <FaCheckCircle />

                                {mockTestCount}{" "}
                                Mock Tests
                              </span>

                              <span>
                                <FaCertificate />

                                {certificationIncluded
                                  ? "Certification Included"
                                  : "No Certification"}
                              </span>
                            </div>

                            <h3>
                              <Link
                                to={getCourseUrl(
                                  course,
                                )}
                              >
                                {
                                  course.title
                                }
                              </Link>
                            </h3>

                            <p>
                              {course
                                .shortDescription ||
                                course
                                  .description ||
                                "Explore this structured law course from Sanhita360."}
                            </p>

                            {course.previewChapters?.length > 0 && (
                              <p>
                                <strong>Topics you’ll study:</strong>{" "}
                                {course.previewChapters.join(" · ")}
                              </p>
                            )}

                            <p>{pricing ? `${formatINR(pricing.amount)} per course${pricing.remaining > 0 ? " introductory offer for the first 100 checkout reservations" : ""}` : "₹99 for the first 100 checkout reservations, then ₹299"} · Chapters, study materials and mock tests included.{certificationIncluded ? " Completion certificate available after meeting course requirements." : " No completion certificate for this course."}</p>

                            <Link className="course-link" to={`/checkout/${course.slug}`} onClick={() => { void trackFunnelEvent("enrollment_click", course.id); }}>
                              {pricing ? `Enroll for ${formatINR(pricing.amount)}` : "Enroll — check current price"}
                              <FaArrowRight />
                            </Link>
                            <Link
                              className="course-link"
                              to={getCourseUrl(
                                course,
                              )}
                            >
                              View Course
                              <FaArrowRight />
                            </Link>
                          </div>
                        </article>
                      );
                    },
                  )}
                </div>
              )}
          </div>
        </section>

        {/* SEO CONTENT */}

        <section className="seo-learning-section">
          <div className="courses-container seo-learning-grid">
            <div>
              <span className="section-label">
                LL.B Study Materials
              </span>

              <h2>
                Law Notes and Study
                Resources for Students
              </h2>

              <p>
                Our legal learning resources
                are organized around subjects
                and chapters so students can
                study individual legal topics
                as well as complete courses.
              </p>

              <p>
                Course material may include
                chapter notes, important legal
                principles, case references,
                study resources, mock tests and
                certification assessments,
                depending on the course.
              </p>
            </div>

            <div className="learning-feature-list">
              <div>
                <FaBookOpen />

                <span>
                  <strong>
                    Chapter-wise Notes
                  </strong>

                  Learn important concepts in
                  manageable chapters.
                </span>
              </div>

              <div>
                <FaScaleBalanced />

                <span>
                  <strong>
                    Legal Topics
                  </strong>

                  Understand principles,
                  statutes and important areas
                  of law.
                </span>
              </div>

              <div>
                <FaGraduationCap />

                <span>
                  <strong>
                    Exam Preparation
                  </strong>

                  Reinforce learning through
                  structured assessments.
                </span>
              </div>

              <div>
                <FaCertificate />

                <span>
                  <strong>
                    Certification
                  </strong>

                  Eligible courses may offer a
                  certification pathway.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SHARE AT THE BOTTOM OF THE PAGE */}

        <section className="courses-share-section">
          <div className="courses-container">
            <div className="courses-share" aria-label="Share Certificate Courses">
              <strong>Share this page</strong>
              <div>
                <a className="is-facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CERTIFICATE_COURSES_URL)}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook"><FaFacebookF /> Facebook</a>
                <a className="is-twitter" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(CERTIFICATE_COURSES_URL)}&text=${encodeURIComponent(SHARE_MESSAGE)}`} target="_blank" rel="noreferrer" aria-label="Share on Twitter"><FaTwitter /> Twitter</a>
                <a className="is-whatsapp" href={`https://wa.me/?text=${encodeURIComponent(`${SHARE_MESSAGE}\n${CERTIFICATE_COURSES_URL}`)}`} target="_blank" rel="noreferrer" aria-label="Share on WhatsApp"><FaWhatsapp /> WhatsApp</a>
                <button type="button" className="is-like" onClick={handleLike} disabled={likes === null || liked || likePending} aria-label={liked ? `Liked, ${likes} likes` : `Like this page, ${likes ?? 0} likes`} aria-pressed={liked}><FaHeart /> {liked ? "Liked" : "Like"} · {likes ?? "…"}</button>
              </div>
              {likeError && <p className="courses-share-error" role="status">{likeError}</p>}
            </div>
          </div>
        </section>

        <style>
          {`
            .public-courses-page,
            .public-courses-page * {
              box-sizing: border-box;
            }

            .public-courses-page {
              width: 100%;
              overflow-x: hidden;
              background: #f8fafc;
              color: #0f172a;
            }

            .courses-container {
              width: min(1180px, calc(100% - 40px));
              margin: 0 auto;
            }

            .courses-hero {
              padding: 75px 0;
              background:
                radial-gradient(
                  circle at 85% 20%,
                  rgba(96,165,250,.28),
                  transparent 30%
                ),
                linear-gradient(
                  135deg,
                  #0f172a,
                  #1e3a8a 55%,
                  #2563eb
                );
              color: white;
            }

            .courses-hero .courses-container {
              display: grid;
              grid-template-columns: minmax(0, 1.05fr) minmax(360px, .95fr);
              align-items: center;
              gap: 44px;
            }

            .courses-hero-content {
              min-width: 0;
            }

            .courses-hero-visual {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              align-self: start;
              min-width: 0;
              gap: 18px;
            }

            .courses-hero-image {
              display: block;
              width: 100%;
              border: 2px solid rgba(223,165,69,.8);
              border-radius: 18px;
              box-shadow: 0 24px 55px rgba(0,0,0,.35);
            }

            .courses-eyebrow {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 14px;
              color: #bfdbfe;
              font-size: 12px;
              font-weight: 800;
              letter-spacing: .08em;
              text-transform: uppercase;
            }

            .courses-hero h1 {
              margin: 0;
              max-width: 850px;
              font-size: clamp(34px, 5vw, 58px);
              line-height: 1.08;
              color: white;
            }

            .courses-hero p {
              max-width: 720px;
              margin: 18px 0 0;
              color: #dbeafe;
              font-size: 17px;
              line-height: 1.75;
            }

            .courses-login-link {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              padding: 13px 18px;
              border-radius: 10px;
              background: #fff;
              color: #173376;
              font-weight: 800;
              text-decoration: none;
              transition: transform .2s ease, background .2s ease;
            }

            .courses-login-link:hover { background: #eff6ff; transform: translateY(-2px); }
            .courses-login-link:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }

            .hero-benefits {
              display: flex;
              flex-wrap: wrap;
              gap: 10px 22px;
              margin-top: 25px;
            }

            .hero-benefits span {
              display: inline-flex;
              align-items: center;
              gap: 7px;
              color: #e0f2fe;
              font-size: 13px;
              font-weight: 600;
            }

            .hero-benefits svg {
              color: #4ade80;
            }

            .courses-share-section {
              padding: 32px 0 48px;
            }

            .courses-share {
              display: inline-block;
              margin-top: 0;
              padding: 15px 17px;
              border: 1px solid #e2b15f;
              border-radius: 14px;
              background: #fff;
              box-shadow: 0 12px 30px rgba(0,0,0,.2);
            }

            .courses-share > strong { display: block; margin-bottom: 10px; color: #10243e; font-size: .9rem; }
            .courses-share > div { display: flex; flex-wrap: wrap; gap: 9px; }
            .courses-share a, .courses-share button { display: inline-flex; align-items: center; justify-content: center; gap: 7px; min-height: 39px; padding: 8px 12px; border: 1px solid transparent; border-radius: 9px; color: #fff; background: #d99a39; font: inherit; font-size: .8rem; font-weight: 800; text-decoration: none; cursor: pointer; }
            .courses-share a:hover, .courses-share button:hover { transform: translateY(-1px); filter: brightness(1.08); }
            .courses-share .is-facebook { background: #1877f2; }
            .courses-share .is-twitter { background: #17202a; }
            .courses-share .is-whatsapp { background: #198b47; }
            .courses-share .is-like { background: #a72646; }
            .courses-share .is-like[aria-pressed="true"] { background: #6f1d36; }
            .courses-share button:disabled { cursor: default; opacity: .8; }
            .courses-share-error { color: #a52132; font-size: .8rem; margin: 9px 0 0; }

            .courses-intro {
              padding: 55px 0 25px;
              background: white;
            }

            .courses-intro .courses-container {
              max-width: 850px;
              text-align: center;
            }

            .section-label {
              display: block;
              margin-bottom: 7px;
              color: #2563eb;
              font-size: 11px;
              font-weight: 800;
              letter-spacing: .1em;
              text-transform: uppercase;
            }

            .courses-intro h2,
            .section-heading h2,
            .seo-learning-section h2 {
              margin: 0;
              color: #0f172a;
              font-size: clamp(24px, 3vw, 34px);
            }

            .courses-intro p {
              margin: 13px auto 0;
              color: #64748b;
              font-size: 15px;
              line-height: 1.75;
            }

            .courses-section {
              padding: 45px 0 70px;
              background: white;
            }

            .section-heading {
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              gap: 20px;
              margin-bottom: 25px;
            }

            .course-count {
              color: #64748b;
              font-size: 13px;
              font-weight: 700;
            }

            .course-grid {
              display: grid;
              grid-template-columns:
                repeat(3, minmax(0, 1fr));
              gap: 22px;
            }

            .public-course-card {
              display: flex;
              min-width: 0;
              overflow: hidden;
              flex-direction: column;
              border: 1px solid #e2e8f0;
              border-radius: 17px;
              background: white;
              box-shadow:
                0 8px 25px rgba(15,23,42,.06);
              transition:
                transform .2s ease,
                box-shadow .2s ease;
            }

            .public-course-card:hover {
              transform: translateY(-4px);
              box-shadow:
                0 15px 35px rgba(15,23,42,.10);
            }

            .course-image {
              display: block;
              width: 100%;
              aspect-ratio: 16 / 9;
              overflow: hidden;
              background: #e2e8f0;
            }

            .course-image img {
              display: block;
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform .3s ease;
            }

            .public-course-card:hover
            .course-image img {
              transform: scale(1.035);
            }

            .course-image-placeholder {
              display: flex;
              align-items: center;
              justify-content: center;
              color: #2563eb;
              font-size: 45px;
              background:
                linear-gradient(
                  135deg,
                  #eff6ff,
                  #dbeafe
                );
            }

            .course-card-content {
              display: flex;
              flex: 1;
              flex-direction: column;
              padding: 20px;
            }

            .course-meta {
              display: grid;
              grid-template-columns:
                repeat(3, minmax(0, 1fr));
              gap: 7px;
              margin-bottom: 13px;
              font-size: 11px;
              font-weight: 700;
            }

            .course-meta span {
              display: flex;
              align-items: center;
              gap: 6px;
              min-width: 0;
              border: 1px solid #dbeafe;
              border-radius: 9px;
              background: #eff6ff;
              color: #1e40af;
              padding: 7px 8px;
              line-height: 1.35;
            }

            .course-meta span svg {
              flex-shrink: 0;
              color: #2563eb;
            }

            .course-card-content h3 {
              margin: 0;
              font-size: 19px;
              line-height: 1.35;
            }

            .course-card-content h3 a {
              color: #0f172a;
              text-decoration: none;
            }

            .course-card-content h3 a:hover {
              color: #2563eb;
            }

            .course-card-content > p {
              display: -webkit-box;
              overflow: hidden;
              margin: 10px 0 15px;
              color: #64748b;
              font-size: 13px;
              line-height: 1.65;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 4;
            }

            .course-link {
              display: inline-flex;
              align-items: center;
              gap: 7px;
              align-self: flex-start;
              margin-top: 15px;
              color: #2563eb;
              text-decoration: none;
              font-size: 12px;
              font-weight: 800;
            }

            .courses-state {
              display: flex;
              min-height: 260px;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              text-align: center;
              color: #64748b;
            }

            .courses-state > svg {
              margin-bottom: 10px;
              color: #2563eb;
              font-size: 35px;
            }

            .courses-state h3 {
              margin: 0;
              color: #0f172a;
            }

            .courses-state p {
              margin: 6px 0 0;
            }

            .course-spinner {
              width: 38px;
              height: 38px;
              margin-bottom: 12px;
              border: 3px solid #dbeafe;
              border-top-color: #2563eb;
              border-radius: 50%;
              animation: course-spin .8s linear infinite;
            }

            @keyframes course-spin {
              to {
                transform: rotate(360deg);
              }
            }

            .courses-error {
              padding: 16px;
              border: 1px solid #fecaca;
              border-radius: 10px;
              background: #fef2f2;
              color: #b91c1c;
            }

            .seo-learning-section {
              padding: 70px 0;
              background: #f8fafc;
            }

            .seo-learning-grid {
              display: grid;
              grid-template-columns:
                minmax(0, 1.1fr)
                minmax(320px, .9fr);
              gap: 55px;
              align-items: center;
            }

            .seo-learning-section p {
              margin: 14px 0 0;
              color: #64748b;
              font-size: 14px;
              line-height: 1.75;
            }

            .learning-feature-list {
              display: grid;
              gap: 11px;
            }

            .learning-feature-list > div {
              display: flex;
              align-items: flex-start;
              gap: 12px;
              padding: 15px;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              background: white;
              color: #2563eb;
            }

            .learning-feature-list > div > svg {
              flex-shrink: 0;
              margin-top: 3px;
            }

            .learning-feature-list span {
              color: #64748b;
              font-size: 12px;
              line-height: 1.5;
            }

            .learning-feature-list strong {
              display: block;
              margin-bottom: 2px;
              color: #0f172a;
              font-size: 13px;
            }

            @media (max-width: 980px) {
              .courses-hero .courses-container {
                grid-template-columns: 1fr;
              }

              .courses-hero-image {
                width: min(760px, 100%);
              }

              .course-grid {
                grid-template-columns:
                  repeat(2, minmax(0, 1fr));
              }

              .seo-learning-grid {
                grid-template-columns: 1fr;
                gap: 30px;
              }
            }

            @media (max-width: 640px) {
              .courses-container {
                width: min(
                  100% - 28px,
                  1180px
                );
              }

              .courses-hero {
                padding: 48px 0;
              }

              .courses-hero h1 {
                font-size: 34px;
              }

              .courses-hero p {
                font-size: 14px;
              }

              .hero-benefits {
                display: grid;
                grid-template-columns: 1fr;
              }

              .courses-share {
                display: block;
              }

              .courses-share > div {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }

              .courses-intro {
                padding: 38px 0 15px;
              }

              .courses-section {
                padding: 35px 0 50px;
              }

              .section-heading {
                align-items: flex-start;
                flex-direction: column;
                gap: 6px;
              }

              .course-grid {
                grid-template-columns: 1fr;
              }

              .course-meta {
                grid-template-columns: 1fr;
              }

              .seo-learning-section {
                padding: 50px 0;
              }
            }
          `}
        </style>
      </main>
      <Footer />
    </>
  );
}
