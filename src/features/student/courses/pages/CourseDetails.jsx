import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaBook,
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaFilePdf,
  FaGraduationCap,
  FaLock,
  FaPlayCircle,
  FaVideo,
} from "react-icons/fa";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAuth } from "../../../../hooks/useAuth";

import {
  getCourseBySlug,
} from "../../../../services/courseService";

import {
  getPublishedChaptersByCourse,
} from "../../../../services/chapterService";

import {
  getPublishedBooksByCourse,
} from "../../../../services/courseBookService";

import {
  enrollForCertification,
  getStudentEnrollment,
} from "../../../../services/studentEnrollmentService";

import {
  payForCourseWithRazorpay,
} from "../../../../services/razorpayPaymentService";
import { trackFunnelEvent } from "../../../../services/funnelAnalyticsService";
import useCoursePricing, { formatINR } from "../../../../hooks/useCoursePricing";

import {
  canJoinLiveSession,
  getLiveSessions,
} from "../../../../services/liveClassService";

import {
  getStudentCourseProgress,
} from "../../../../services/studentProgressService";

import Button from "../../../../shared/components/Button";
import Card from "../../../../shared/components/Card";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";
import PageHeader from "../../../../shared/components/PageHeader";
import { getChapterLearningPath } from "../../../../utils/chapterUrl";

const LIVE_CLASS_COURSE_SLUGS = new Set([
  "criminal-law-i-transitioning-from-ipc-to-bns",
  "code-of-civil-procedure-and-limitation",
  "law-of-torts-mv-and-cp-laws",
  "indian-constitutional-law-i",
  "human-rights-law-and-practice",
  "family-law-i",
  "public-international-law",
  "environmental-law",
]);

const RECOMMENDED_BOOK_PREVIEW_COUNT = 3;

export default function CourseDetails() {
  const { courseId: courseSlug } =
    useParams();
  const pricing = useCoursePricing();

  const navigate = useNavigate();

  const {
    firebaseUser,
    profile,
    role,
  } = useAuth();

  const studentId =
    firebaseUser?.uid ||
    profile?.uid ||
    "";

  const isAdmin =
    role === "admin" ||
    profile?.role === "admin";

  const [
    course,
    setCourse,
  ] = useState(null);

  const [
    chapters,
    setChapters,
  ] = useState([]);

  const [
    recommendedBooks,
    setRecommendedBooks,
  ] = useState([]);

  const [showAllRecommendedBooks, setShowAllRecommendedBooks] = useState(false);

  const [
    enrollment,
    setEnrollment,
  ] = useState(null);

  const [
    progress,
    setProgress,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    certificationEnrolling,
    setCertificationEnrolling,
  ] = useState(false);

  const [
    liveClassEnrolling,
    setLiveClassEnrolling,
  ] = useState(false);

  const [liveSessions, setLiveSessions] = useState([]);
  const [liveCheckoutAvailable, setLiveCheckoutAvailable] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    imageError,
    setImageError,
  ] = useState(false);

  const [
    showCourseDetails,
    setShowCourseDetails,
  ] = useState(false);

  // =========================================================
  // LOAD COURSE
  // =========================================================

  const loadCourse =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");
        setImageError(false);
        setShowAllRecommendedBooks(false);

        // -----------------------------------------------------
        // STEP 1: FIND COURSE BY URL SLUG
        // -----------------------------------------------------

        const courseData =
          await getCourseBySlug(
            courseSlug,
          );

        if (!courseData) {
          setCourse(null);
          setChapters([]);
          setRecommendedBooks([]);
          setEnrollment(null);
          setProgress([]);
          return;
        }

        setCourse(
          courseData,
        );

        // -----------------------------------------------------
        // STEP 2: ACTUAL FIRESTORE COURSE ID
        // -----------------------------------------------------

        const realCourseId =
          courseData.id;

        if (!realCourseId) {
          throw new Error(
            "Course document ID is missing.",
          );
        }

        // -----------------------------------------------------
        // STEP 3: LOAD STUDENT DATA
        // -----------------------------------------------------

        const [
          chapterData,
          enrollmentData,
          progressData,
        ] =
          await Promise.all([
            getPublishedChaptersByCourse(
              realCourseId,
              courseSlug,
            ),

            isAdmin
              ? Promise.resolve(null)
              : getStudentEnrollment(
                  studentId,
                  realCourseId,
                ),

            getStudentCourseProgress(
              studentId,
              realCourseId,
            ),
          ]);

        // -----------------------------------------------------
        // STEP 4: PUBLISHED CHAPTERS ONLY
        // -----------------------------------------------------

        const publishedChapters =
          Array.isArray(
            chapterData,
          )
            ? chapterData
                .filter(
                  (
                    chapter,
                  ) =>
                    chapter.published ===
                      true &&
                    chapter.deleted !==
                      true,
                )
                .sort(
                  (
                    first,
                    second,
                  ) => {
                    const firstChapterNumber =
                      Number(
                        first.chapterNumber ||
                          first.displayOrder ||
                          0,
                      );

                    const secondChapterNumber =
                      Number(
                        second.chapterNumber ||
                          second.displayOrder ||
                          0,
                      );

                    return (
                      firstChapterNumber -
                      secondChapterNumber
                    );
                  },
                )
            : [];

        setChapters(
          publishedChapters,
        );

        setEnrollment(
          enrollmentData ||
            null,
        );

        setProgress(
          Array.isArray(
            progressData,
          )
            ? progressData
            : [],
        );

        // -----------------------------------------------------
        // STEP 5: LOAD RECOMMENDED BOOKS INDEPENDENTLY
        // -----------------------------------------------------
        //
        // A permissions/query issue in courseBooks must never
        // break the course page itself.
        //
        try {
          const bookData =
            await getPublishedBooksByCourse(
              realCourseId,
            );

          const publishedRecommendedBooks =
            Array.isArray(
              bookData,
            )
              ? bookData.filter(
                  (book) =>
                    book &&
                    book.published ===
                      true &&
                    book.deleted !==
                      true &&
                    book.recommended ===
                      true,
                )
              : [];

          setRecommendedBooks(
            publishedRecommendedBooks,
          );
        } catch (
          bookLoadError
        ) {
          console.error(
            "Unable to load recommended books:",
            bookLoadError,
          );

          setRecommendedBooks([]);
        }
      } catch (
        loadError
      ) {
        console.error(
          "Unable to load course:",
          loadError,
        );

        setError(
          loadError?.message ||
            "Unable to load this course.",
        );

        setCourse(null);
      } finally {
        setLoading(false);
      }
    }, [courseSlug, isAdmin, studentId]);

  useEffect(() => {
    if (
      !courseSlug ||
      !studentId
    ) {
      return undefined;
    }

    const timer = window.setTimeout(
      loadCourse,
      0,
    );

    return () => window.clearTimeout(timer);
  }, [courseSlug, loadCourse, studentId]);

  // =========================================================
  // COURSE IMAGES
  // =========================================================

  const desktopImageUrl =
    course?.media
      ?.desktopImageUrl ||
    course?.desktopImageUrl ||
    course?.media
      ?.thumbnailUrl ||
    course?.thumbnailUrl ||
    "";

  const landscapeImageUrl =
    desktopImageUrl
      ? `${desktopImageUrl}${
          desktopImageUrl.includes("?")
            ? "&"
            : "?"
        }ns-course-landscape=20260916`
      : "";

  const getBookCover = (book) =>
    book?.coverImageUrl ||
    book?.imageUrl ||
    book?.thumbnailUrl ||
    book?.coverUrl ||
    book?.media?.coverImageUrl ||
    "";

  const getBookTitle = (book) =>
    book?.title ||
    book?.bookTitle ||
    "Recommended Book";

  const getBookAuthor = (book) =>
    book?.author ||
    book?.authors ||
    book?.authorName ||
    "";

  const getBookPublisher = (book) =>
    book?.publisher ||
    book?.publisherName ||
    "";

  const getBookLink = (book) =>
    book?.url ||
    book?.purchaseUrl ||
    book?.buyUrl ||
    book?.amazonUrl ||
    "";

  // =========================================================
  // PROGRESS MAP
  // =========================================================

  const progressMap =
    useMemo(
      () =>
        Object.fromEntries(
          progress.map(
            (item) => [
              item.chapterId,
              item,
            ],
          ),
        ),
      [progress],
    );

  // =========================================================
  // COURSE PROGRESS
  // =========================================================

  const completedChapterCount =
    useMemo(
      () =>
        chapters.filter(
          (
            chapter,
          ) =>
            progressMap[
              chapter.id
            ]?.completed ===
            true,
        ).length,
      [
        chapters,
        progressMap,
      ],
    );

  const courseProgressPercentage =
    chapters.length > 0
      ? Math.round(
          (
            completedChapterCount /
            chapters.length
          ) * 100,
        )
      : 0;

  // =========================================================
  // CERTIFICATION
  // =========================================================

  const certificationAvailable = true;

  const courseAmountPaise = Number(enrollment?.certification?.payment?.amount || 0) || pricing?.amount || 0;
  const courseFeeLabel = courseAmountPaise ? formatINR(courseAmountPaise) : "current price";
  const premiumFeeLabel = courseAmountPaise ? formatINR(courseAmountPaise + 49900) : "price at checkout";

  const certification =
    enrollment?.certification ||
    null;

  const certificationStatus =
    certification?.status ||
    "not-enrolled";

  const certificationActive =
    isAdmin ||
    certificationStatus ===
      "active" ||
    certificationStatus ===
      "completed";

  const certificationPendingPayment =
    certificationStatus ===
    "pending-payment";

  const certificationPaymentCompleted =
    isAdmin ||
    certification?.payment?.status ===
    "paid";

  const isCriminalLawCourse =
    course?.slug ===
    "criminal-law-i-transitioning-from-ipc-to-bns";

  const isCivilProcedureCourse =
    course?.slug ===
    "code-of-civil-procedure-and-limitation";

  const hasLiveClasses =
    !isCriminalLawCourse && !["law-of-torts-mv-and-cp-laws", "code-of-civil-procedure-and-limitation", "public-international-law", "general-principles-of-contract-and-specific-relief", "environmental-law"].includes(course?.slug) && LIVE_CLASS_COURSE_SLUGS.has(course?.slug);

  const liveClassAccess =
    isAdmin ||
    enrollment?.liveClasses?.hasAccess === true ||
    enrollment?.liveClasses?.payment?.status === "paid";

  useEffect(() => {
    let active = true;

    if (!liveClassAccess || !hasLiveClasses || !course?.id || isAdmin) {
      return undefined;
    }

    getLiveSessions(course.id)
      .then((sessions) => {
        if (active) setLiveSessions(sessions);
      })
      .catch((sessionError) => {
        console.warn("Unable to load live-class schedule:", sessionError);
        if (active) setLiveSessions([]);
      });

    return () => { active = false; };
  }, [course?.id, hasLiveClasses, isAdmin, liveClassAccess]);

  const liveSessionByChapter = useMemo(
    () => Object.fromEntries(
      liveSessions.map((session) => [
        session.chapterId || String(session.chapterNumber),
        session,
      ]),
    ),
    [liveSessions],
  );

  useEffect(() => {
    let active = true;
    if (!hasLiveClasses) return undefined;

    fetch("/api/health", { cache: "no-store" })
      .then((response) => response.json())
      .then((health) => {
        if (active) setLiveCheckoutAvailable(health?.features?.liveClasses === true);
      })
      .catch(() => {
        if (active) setLiveCheckoutAvailable(false);
      });

    return () => { active = false; };
  }, [hasLiveClasses]);

  const hasCourseAccess =
    isAdmin ||
    certificationPaymentCompleted;

  const allMockTestsCompleted =
    isAdmin ||
    [1, 2, 3].every((number) =>
      ["passed", "failed", "completed"].includes(
        certification?.mockTests?.[`test${number}`]?.status,
      ),
    );

  const isTortsCourse =
    course?.slug ===
    "law-of-torts-mv-and-cp-laws";

  const isConstitutionalLawCourse =
    course?.slug ===
    "indian-constitutional-law-i";

  const isFamilyLawCourse =
    course?.slug ===
    "family-law-i";

  const isPublicInternationalLawCourse =
    course?.slug ===
    "public-international-law";

  const isEnvironmentalCourse = course?.slug === "environmental-law";
  const isContractCourse = course?.slug === "general-principles-of-contract-and-specific-relief";

  const hasExpandableCourseOverview =
    isCivilProcedureCourse ||
    isTortsCourse ||
    isConstitutionalLawCourse ||
    isFamilyLawCourse ||
    isCriminalLawCourse ||
    isPublicInternationalLawCourse;

  const mockTest2Available = hasCourseAccess;
  const mockTest3Available = hasCourseAccess;
  const finalExamAvailable =
    hasCourseAccess &&
    allMockTestsCompleted;

  const handleCertificationPayment =
    async () => {
      if (
        !studentId ||
        !course?.id
      ) {
        return;
      }

      void trackFunnelEvent("enrollment_click", course.id);

      try {
        setCertificationEnrolling(
          true,
        );

        setError("");

        let updatedEnrollment = enrollment;

        if (!certificationPendingPayment) {
          updatedEnrollment =
            await enrollForCertification(
              studentId,
              course.id,
              studentId,
            );

          setEnrollment(
            updatedEnrollment,
          );
        }

        await payForCourseWithRazorpay({
          courseId: course.id,
          courseTitle: course.title,
          studentName:
            profile?.displayName ||
            firebaseUser?.displayName ||
            "",
          studentEmail:
            firebaseUser?.email ||
            profile?.email ||
            "",
        });

        updatedEnrollment =
          await getStudentEnrollment(
            studentId,
            course.id,
          );

        setEnrollment(
          updatedEnrollment,
        );
      } catch (
        certificationError
      ) {
        console.error(
          "Unable to enroll for certification:",
          certificationError,
        );

        setError(
          certificationError?.message ||
            "Unable to start certification enrollment.",
        );
      } finally {
        setCertificationEnrolling(
          false,
        );
      }
    };

  const handleLiveClassPayment = async () => {
    if (!studentId || !course?.id || !hasLiveClasses) return;

    void trackFunnelEvent("enrollment_click", course.id);

    try {
      setLiveClassEnrolling(true);
      setError("");

      if (!enrollment) {
        const createdEnrollment = await enrollForCertification(
          studentId,
          course.id,
          studentId,
        );
        setEnrollment(createdEnrollment);
      }

      await payForCourseWithRazorpay({
        courseId: course.id,
        courseTitle: course.title,
        purchaseType: certificationPaymentCompleted
          ? "live-classes"
          : "premium",
        studentName:
          profile?.displayName || firebaseUser?.displayName || "",
        studentEmail:
          firebaseUser?.email || profile?.email || "",
      });

      setEnrollment(
        await getStudentEnrollment(studentId, course.id),
      );
    } catch (liveClassError) {
      console.error("Unable to activate live classes:", liveClassError);
      setError(
        liveClassError?.message || "Unable to start live-class enrollment.",
      );
    } finally {
      setLiveClassEnrolling(false);
    }
  };

  // =========================================================
  // CHAPTER UNLOCKING
  // =========================================================

  const isChapterUnlocked = (chapter, index) =>
    Boolean(hasCourseAccess || ((isTortsCourse || isCivilProcedureCourse || isPublicInternationalLawCourse || isContractCourse || isEnvironmentalCourse) && index === 0));

  // =========================================================
  // OPEN CHAPTER
  // =========================================================

  const handleOpenChapter = (
    chapter,
  ) => {
    if (
      !course?.slug ||
      !chapter?.id
    ) {
      return;
    }

    navigate(
      getChapterLearningPath(
        course.slug,
        chapter,
      ),
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <LoadingSpinner
        fullPage
        text="Loading course..."
      />
    );
  }

  // =========================================================
  // COURSE NOT FOUND
  // =========================================================

  if (!course) {
    return (
      <div>
        {error && (
          <div className="ns-course-detail-error">
            {error}
          </div>
        )}

        <Card>
          Course not found.
        </Card>
      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div>
      <PageHeader
        title={
          course.title
        }
        description={
          course.shortDescription ||
          "Sanhita360 Learning"
        }
        breadcrumbs={[
          "Student",
          certificationPaymentCompleted
            ? "Enrolled Courses"
            : "Available Courses",
          course.title,
        ]}
      />

      {error && (
        <div className="ns-course-detail-error">
          {error}
        </div>
      )}

      {/* =====================================================
          COURSE HERO
          DESKTOP:
          LEFT  = MODERATE 16:9 THUMBNAIL
          RIGHT = COURSE OVERVIEW

          MOBILE:
          16:9 IMAGE ABOVE OVERVIEW
      ====================================================== */}

      <div className="ns-course-hero">
        {/* LEFT COLUMN: IMAGE + RECOMMENDED BOOKS */}

        <div className="ns-course-left-column">
          {landscapeImageUrl &&
            !imageError && (
              <div className="ns-course-cover">
                <img
                  src={
                    landscapeImageUrl
                  }
                  alt={`${course.title} course banner`}
                  onError={() =>
                    setImageError(
                      true,
                    )
                  }
                />
              </div>
            )}

          <section className="ns-course-books">
            <div className="ns-course-books-heading">
              <FaBook />
              <div>
                <h2>Recommended Books</h2>
                <p>Suggested reading for this course</p>
              </div>
            </div>

            {recommendedBooks.length === 0 ? (
              <div className="ns-course-books-empty">
                Recommended books will be added soon.
              </div>
            ) : (
              <>
                <div className="ns-course-book-list" id="recommended-books-list">
                  {(showAllRecommendedBooks
                    ? recommendedBooks
                    : recommendedBooks.slice(0, RECOMMENDED_BOOK_PREVIEW_COUNT)
                  ).map((book, index) => {
                    const cover = getBookCover(book);
                    const title = getBookTitle(book);
                    const author = getBookAuthor(book);
                    const publisher = getBookPublisher(book);
                    const link = getBookLink(book);

                    const bookContent = (
                      <>
                        <div className="ns-course-book-cover">
                          {cover ? (
                            <img
                              src={cover}
                              alt={`${title} cover`}
                              loading="lazy"
                            />
                          ) : (
                            <FaBook />
                          )}
                        </div>

                        <div className="ns-course-book-info">
                          <h3>{title}</h3>
                          {author && <p>By {author}</p>}
                          {publisher && <small>{publisher}</small>}
                        </div>
                      </>
                    );

                    return link ? (
                      <a
                        key={book.id || `${title}-${index}`}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="ns-course-book-item"
                      >
                        {bookContent}
                      </a>
                    ) : (
                      <article
                        key={book.id || `${title}-${index}`}
                        className="ns-course-book-item"
                      >
                        {bookContent}
                      </article>
                    );
                  })}
                </div>
                {recommendedBooks.length > RECOMMENDED_BOOK_PREVIEW_COUNT && (
                  <button
                    type="button"
                    className="ns-course-books-toggle"
                    aria-expanded={showAllRecommendedBooks}
                    aria-controls="recommended-books-list"
                    onClick={() => setShowAllRecommendedBooks((current) => !current)}
                  >
                    {showAllRecommendedBooks
                      ? "Show fewer books"
                      : `View all ${recommendedBooks.length} recommended books`}
                  </button>
                )}
              </>
            )}
          </section>
        </div>

        {/* COURSE OVERVIEW */}

        <Card>
          <div className="ns-course-intro">
            <h2>
              Course Overview
            </h2>

            {hasExpandableCourseOverview ? (
              <>
                <h3 className="ns-course-overview-title">
                  {isCivilProcedureCourse
                    ? "Code of Civil Procedure and Limitation"
                    : isTortsCourse
                      ? "Law of Torts, MV and CP Laws"
                      : isConstitutionalLawCourse
                        ? "Indian Constitutional Law – I"
                        : isFamilyLawCourse
                          ? "Family Law – I: Hindu Law"
                          : isCriminalLawCourse
                            ? "Criminal Law I (Transitioning from IPC to BNS)"
                            : "Public International Law"}
                </h3>

                {isCivilProcedureCourse ? (
                  <p>
                    The course <strong>Code of Civil Procedure and Limitation</strong>{" "}
                    provides a systematic and practical understanding of the
                    procedural framework governing civil litigation in India. It
                    primarily examines the <strong>Code of Civil Procedure, 1908
                    (CPC)</strong> and the <strong>Limitation Act, 1963</strong>,
                    enabling students to understand how civil rights and remedies
                    are pursued and enforced before courts.
                  </p>
                ) : isTortsCourse ? (
                  <p>
                    The course <strong>Law of Torts, MV and CP Laws</strong>{" "}
                    provides a systematic and practical understanding of the Law
                    of Torts, Motor Vehicles Law, and Consumer Protection Law. It
                    examines fundamental principles, civil liabilities, remedies,
                    compensation, and important statutory provisions, enabling
                    students to understand how legal rights and claims are
                    protected and enforced.
                  </p>
                ) : isConstitutionalLawCourse ? (
                  <p>
                    <strong>Indian Constitutional Law – I</strong> introduces the
                    foundations, principles, fundamental rights, duties and
                    institutions established by the Constitution of India.
                  </p>
                ) : isFamilyLawCourse ? (
                  <p>
                    <strong>Family Law – I: Hindu Law</strong> introduces the
                    sources and principles of Hindu law, family relationships,
                    property, succession, marriage, adoption, maintenance and
                    guardianship.
                  </p>
                ) : isCriminalLawCourse ? (
                  <p>
                    <strong>Criminal Law I</strong> introduces the foundational
                    principles of criminal liability and the transition from the
                    Indian Penal Code, 1860 to the Bharatiya Nyaya Sanhita, 2023.
                  </p>
                ) : (
                  <p>
                    <strong>Public International Law</strong> introduces the
                    rules governing States and other international actors,
                    including sources, recognition, jurisdiction, treaties,
                    dispute settlement and the United Nations.
                  </p>
                )}

                <button
                  type="button"
                  className="ns-course-more-details-button"
                  aria-expanded={showCourseDetails}
                  onClick={() =>
                    setShowCourseDetails(
                      (currentValue) =>
                        !currentValue,
                    )
                  }
                >
                  {showCourseDetails
                    ? "Hide Details"
                    : "More Details"}
                </button>

                {showCourseDetails &&
                  (isTortsCourse ? (
                    <div className="ns-course-expanded-details">
                      <h3>
                        Course Details
                      </h3>

                      <p>
                        This course provides a comprehensive study of civil
                        wrongs, road-accident liability, and consumer protection
                        law in India. It connects legal principles with statutory
                        provisions, important judicial decisions, and practical
                        problem-solving.
                      </p>

                      <h4>
                        Law of Torts
                      </h4>

                      <p>
                        Students examine the nature and essential elements of a
                        tort, general defences, vicarious and State liability,
                        negligence, nuisance, defamation, trespass, strict and
                        absolute liability, and the remedies available to an
                        injured person.
                      </p>

                      <h4>
                        Motor Vehicles Law
                      </h4>

                      <p>
                        The course explains important provisions of the Motor
                        Vehicles Act, 1988, including licensing and registration,
                        compulsory third-party insurance, liability arising from
                        motor accidents, Motor Accident Claims Tribunals,
                        compensation, and claims involving death or bodily injury.
                      </p>

                      <h4>
                        Consumer Protection Law
                      </h4>

                      <p>
                        Students learn the Consumer Protection Act, 2019,
                        consumer rights, defects in goods, deficiency in
                        services, unfair trade practices, product liability,
                        e-commerce transactions, consumer commissions, and the
                        remedies available to consumers.
                      </p>

                      <h4>
                        Learning Approach
                      </h4>

                      <ul>
                        <li>
                          Understand the essential principles and statutory rules.
                        </li>
                        <li>
                          Apply legal concepts to practical situations and
                          problem questions.
                        </li>
                        <li>
                          Study important judicial decisions and their legal
                          reasoning.
                        </li>
                        <li>
                          Prepare systematically for LL.B examinations, mock
                          tests, and the final certification assessment.
                        </li>
                      </ul>
                    </div>
                  ) : (
                    course.description && (
                      <div className="ns-course-expanded-details">
                        <h3>
                          Course Details
                        </h3>

                        <p>
                          {course.description}
                        </p>
                      </div>
                    )
                  ))}
              </>
            ) : (
              <p>
                {course.description ||
                  course.shortDescription ||
                  "Course details will be available soon."}
              </p>
            )}

            {(!hasExpandableCourseOverview ||
              showCourseDetails) && (
              <>
            <div className="ns-course-detail-meta">
              <span>
                <FaClock />

                {course.duration ||
                  "Self-paced"}
              </span>

              <span>
                <FaBookOpen />

                {
                  chapters.length
                }{" "}
                {chapters.length ===
                1
                  ? "Chapter"
                  : "Chapters"}
              </span>

              <span
                className={`ns-course-state-badge ${
                  certificationPaymentCompleted
                    ? "is-active"
                    : "is-inactive"
                }`}
              >
                {certificationPaymentCompleted ? (
                  <FaCheckCircle />
                ) : (
                  <FaLock />
                )}
                Enrolled
              </span>
            </div>

            {/* COURSE PROGRESS */}

            {certificationPaymentCompleted && (
              <div className="ns-course-progress-summary">
                <div className="ns-course-progress-heading">
                  <span>
                    Course Progress
                  </span>

                  <strong>
                    {
                      courseProgressPercentage
                    }
                    %
                  </strong>
                </div>

                <div className="ns-course-progress-track">
                  <div
                    className="ns-course-progress-fill"
                    style={{
                      width: `${courseProgressPercentage}%`,
                    }}
                  />
                </div>

                <small>
                  {
                    completedChapterCount
                  }{" "}
                  of{" "}
                  {
                    chapters.length
                  }{" "}
                  {chapters.length ===
                  1
                    ? "chapter"
                    : "chapters"}{" "}
                  completed
                </small>
              </div>
            )}

            {!certificationPaymentCompleted && (
              <div className="ns-course-enroll-action">
                <p>Pay the one-time course fee to unlock all chapters, study PDFs, mock tests and the final examination. Introductory price {formatINR(9900)} for the first 100 checkout reservations, then {formatINR(29900)}.</p>
              </div>
            )}
              </>
            )}
          </div>
        </Card>
      </div>

      {/* =====================================================
          CERTIFICATION PROGRAM
      ====================================================== */}

      {certificationAvailable && (
        <section
          id="certification-enrollment"
          className="ns-certification-section"
        >
          <div className="ns-certification-card">
            <div className="ns-certification-heading">
              <div className="ns-certification-icon">
                <FaGraduationCap />
              </div>

              <div>
                <h2>
                  Course Enrollment
                </h2>

                <p>
                  Join this individual course to access its complete learning and certification track.
                </p>
              </div>

              <div className="ns-certification-fee">
                {isAdmin
                  ? "Admin Access"
                  : courseFeeLabel}
              </div>
            </div>

            <div className="ns-certification-benefits">
              <div>
                <FaFilePdf />
                <span>
                  Download chapter PDFs
                </span>
              </div>

              <div>
                <FaCheckCircle />
                <span>
                  3 mandatory mock tests
                </span>
              </div>

              <div>
                <FaCheckCircle />
                <span>
                  Sanhita360 Admin-conducted final online examination
                </span>
              </div>

              <div>
                <FaCheckCircle />
                <span>
                  Digital certificate after passing
                </span>
              </div>

              <div>
                <FaCheckCircle />
                <span>
                  Unique Certificate ID and online verification
                </span>
              </div>
            </div>

            {!isCriminalLawCourse && !isTortsCourse && !isCivilProcedureCourse && !isPublicInternationalLawCourse && !isContractCourse && !isEnvironmentalCourse && !certificationActive &&
              !certificationPendingPayment && (
                <div className="ns-certification-action">
                  <Button
                    loading={
                      certificationEnrolling
                    }
                    onClick={
                      handleCertificationPayment
                    }
                  >
                    Enroll and Pay {courseFeeLabel}
                  </Button>
                </div>
              )}

            {certificationPendingPayment && (
              <div className="ns-certification-status is-pending">
                <strong>
                  Payment Pending
                </strong>

                <span>
                  Your course enrollment request has been created. Complete the {courseFeeLabel} payment to unlock this course.
                </span>

                {!isCriminalLawCourse && !isTortsCourse && !isCivilProcedureCourse && !isPublicInternationalLawCourse && !isContractCourse && !isEnvironmentalCourse && <Button
                  loading={
                    certificationEnrolling
                  }
                  onClick={
                    handleCertificationPayment
                  }
                  style={{ marginTop: "12px" }}
                >
                  Continue Payment {courseFeeLabel}
                </Button>}
              </div>
            )}

            {certificationActive && (
              <div className="ns-certification-active">
                <div className="ns-certification-status is-active">
                  <strong>
                    Course Enrolled
                  </strong>

                  <span>
                    Full learning and certification access is enabled for this course.
                  </span>
                </div>

                <div className="ns-certification-access-grid">
                  <div className="is-unlocked">
                    <FaCheckCircle />
                    <span>
                      PDF Downloads Unlocked
                    </span>
                  </div>

                  <button
                    type="button"
                    className="is-unlocked"
                    onClick={() => navigate(`/student/courses/${course.slug}/mock-tests/1`)}
                  >
                    <FaCheckCircle />
                    <span>
                      Start Mock Test 1
                    </span>
                  </button>

                  <button
                    type="button"
                    className={mockTest2Available ? "is-unlocked" : ""}
                    disabled={!mockTest2Available}
                    onClick={() => navigate(`/student/courses/${course.slug}/mock-tests/2`)}
                  >
                    {mockTest2Available ? <FaCheckCircle /> : <FaLock />}
                    <span>
                      {mockTest2Available ? "Start Mock Test 2" : "Mock Test 2 Locked"}
                    </span>
                  </button>

                  <button
                    type="button"
                    className={mockTest3Available ? "is-unlocked" : ""}
                    disabled={!mockTest3Available}
                    onClick={() => navigate(`/student/courses/${course.slug}/mock-tests/3`)}
                  >
                    {mockTest3Available ? <FaCheckCircle /> : <FaLock />}
                    <span>
                      {mockTest3Available ? "Start Mock Test 3" : "Mock Test 3 Locked"}
                    </span>
                  </button>

                  <button
                    type="button"
                    className={finalExamAvailable ? "is-unlocked" : ""}
                    disabled={!finalExamAvailable}
                    onClick={() => navigate(`/student/courses/${course.slug}/final-exam`)}
                  >
                    {finalExamAvailable ? <FaCheckCircle /> : <FaLock />}
                    <span>
                      {finalExamAvailable
                        ? "Start Final Examination"
                        : "Complete All 3 Mock Tests First"}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          COURSE CHAPTERS
          FULL WIDTH BELOW HERO
      ====================================================== */}

      <div className="ns-course-chapters-section">
        <Card
          title="Course Chapters"
          subtitle={(isTortsCourse || isCivilProcedureCourse || isPublicInternationalLawCourse || isContractCourse || isEnvironmentalCourse) ? "Chapter 1 is free to read. Enroll to unlock the remaining chapters." : "Complete chapters in sequence to progress through the course."}
        >
          {chapters.length ===
          0 ? (
            <div className="ns-no-course-chapters">
              No published
              chapters are
              currently
              available for
              this course.
            </div>
          ) : (
            <div className="ns-learning-chapter-list">
              {chapters.map(
                (
                  chapter,
                  index,
                ) => {
                  const chapterProgress =
                    progressMap[
                      chapter.id
                    ];

                  const unlocked =
                    isChapterUnlocked(
                      chapter,
                      index,
                    );

                  const percentage =
                    Number(
                      chapterProgress
                        ?.progressPercentage ||
                        0,
                    );

                  const liveSession =
                    liveSessionByChapter[chapter.id] ||
                    liveSessionByChapter[String(chapter.chapterNumber || index + 1)];

                  const joinAvailable = canJoinLiveSession(liveSession);

                  return (
                    <article
                      key={
                        chapter.id
                      }
                      className={`ns-learning-chapter ${
                        unlocked
                          ? ""
                          : "locked"
                      }`}
                    >
                      <div className="ns-learning-chapter-number">
                        {chapter.chapterNumber ||
                          index +
                            1}
                      </div>

                      <div className="ns-learning-chapter-info">
                        <h3>
                          {
                            chapter.title
                          }
                        </h3>

                        {hasLiveClasses && (
                          <div className="ns-chapter-live-class">
                            <div className={`ns-live-class-badge ${liveClassAccess ? "is-active" : "is-locked"}`}>
                              {liveClassAccess ? <FaVideo /> : <FaLock />}
                              Live Class {index + 1}: {liveClassAccess
                                ? liveSession?.scheduledAt
                                  ? new Date(liveSession.scheduledAt).toLocaleString("en-IN", {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    })
                                  : "Schedule to be announced"
                                : "Premium access"}
                            </div>

                            {liveClassAccess && liveSession?.meetingLink && (
                              <a
                                className={`ns-live-session-link ${joinAvailable ? "" : "is-disabled"}`}
                                href={joinAvailable ? liveSession.meetingLink : undefined}
                                target="_blank"
                                rel="noreferrer"
                                aria-disabled={!joinAvailable}
                              >
                                Join Meeting {joinAvailable ? "" : "(opens 10 minutes before)"}
                              </a>
                            )}

                          </div>
                        )}

                        <p>
                          {chapter.shortDescription ||
                            chapter.description ||
                            "Course chapter"}
                        </p>

                        {chapterProgress && (
                          <div className="ns-chapter-progress">
                            <div className="ns-chapter-progress-text">
                              <span>
                                {
                                  percentage
                                }
                                % Complete
                              </span>

                              {chapterProgress.completed && (
                                <strong>
                                  <FaCheckCircle />
                                  Completed
                                </strong>
                              )}
                            </div>

                            <div className="ns-chapter-progress-track">
                              <div
                                className="ns-chapter-progress-fill"
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        disabled={
                          !unlocked
                        }
                        onClick={() =>
                          handleOpenChapter(
                            chapter,
                          )
                        }
                      >
                        {unlocked ? (
                          <>
                            <FaPlayCircle />

                            {chapterProgress
                              ?.completed
                              ? "Review"
                              : (isTortsCourse || isCivilProcedureCourse || isPublicInternationalLawCourse || isContractCourse || isEnvironmentalCourse) && index === 0 && !hasCourseAccess ? "Read free chapter" : "Open"}
                          </>
                        ) : (
                          <>
                            <FaLock />
                            Locked
                          </>
                        )}
                      </button>
                    </article>
                  );
                },
              )}
            </div>
          )}
        </Card>
      </div>

      {(isCriminalLawCourse || isTortsCourse || isCivilProcedureCourse || isPublicInternationalLawCourse || isContractCourse || isEnvironmentalCourse) && (
        <section className="ns-live-class-section" aria-labelledby="course-full-access-heading">
          <div className="ns-live-class-card">
            <div className="ns-live-class-heading">
              <div className="ns-live-class-icon"><FaBookOpen /></div>
              <div>
                <h2 id="course-full-access-heading">Get access to all {chapters.length} chapters</h2>
                <p>Enroll in {isCriminalLawCourse ? "Criminal Law I: IPC to BNS" : course.title} to unlock the complete course and its assessment track.</p>
              </div>
              <strong>{certificationPaymentCompleted ? "Access Active" : courseFeeLabel}</strong>
            </div>
            <div className="ns-live-class-benefits">
              <span><FaCheckCircle /> Access all {chapters.length} chapters listed above</span>
              <span><FaFilePdf /> Download available chapter PDFs</span>
              <span><FaCheckCircle /> Practise with all 3 mock tests</span>
              <span><FaGraduationCap /> Become eligible for the final certification examination after completing the required mock tests</span>
            </div>
            <p>Earn a digital Certificate of Completion after passing the final examination and meeting the course requirements. This is a private learning certificate, not an accredited qualification.</p>
            {certificationPaymentCompleted ? (
              <div className="ns-live-class-active"><FaCheckCircle /> Your complete course access is active. Continue learning through the chapters above.</div>
            ) : (
              <>
                <p>One-time course fee. The current price is confirmed before payment.</p>
                <Button loading={certificationEnrolling} onClick={handleCertificationPayment}>
                  Enroll and Pay {courseFeeLabel}
                </Button>
              </>
            )}
          </div>
        </section>
      )}

      {hasLiveClasses && (
        <section className="ns-live-class-section">
          <div className="ns-live-class-card">
            <div className="ns-live-class-heading">
              <div className="ns-live-class-icon"><FaVideo /></div>
              <div>
                <h2>Live Online Classes</h2>
                <p>Eight interactive Google Meet classes—one class for each chapter.</p>
              </div>
              <strong>{certificationPaymentCompleted ? "₹499 Upgrade" : `${premiumFeeLabel} Premium`}</strong>
            </div>

            <div className="ns-live-class-benefits">
              <span><FaCheckCircle /> 8 chapter-wise interactive classes</span>
              <span><FaCheckCircle /> Upcoming schedules and protected meeting access</span>
              <span><FaCheckCircle /> Includes the complete certification track</span>
            </div>

            {liveClassAccess ? (
              <div className="ns-live-class-active">
                <FaCheckCircle /> Live-class access is active. Schedules will appear with each chapter.
              </div>
            ) : (
              <Button
                loading={liveClassEnrolling}
                disabled={!liveCheckoutAvailable}
                onClick={handleLiveClassPayment}
              >
                {!liveCheckoutAvailable
                  ? "Live Plan Activation in Progress"
                  : certificationPaymentCompleted
                    ? "Upgrade to 8 Live Classes — ₹499"
                    : `Choose Premium Live Plan — ${premiumFeeLabel}`}
              </Button>
            )}
          </div>
        </section>
      )}

      <style>
        {`
          /* ==================================================
             COURSE HERO
          ================================================== */

          .ns-course-hero {
            display: grid;

            /*
             * Moderate image on the left.
             * Overview receives more horizontal space.
             */
            grid-template-columns:
              minmax(300px, 40%)
              minmax(0, 1fr);

            gap: 24px;

            align-items: start;

            margin-bottom: 24px;
          }

          .ns-live-class-section { margin: 0 0 24px; }
          .ns-live-class-card {
            padding: 24px;
            border: 1px solid #d8b365;
            border-radius: 16px;
            background: linear-gradient(135deg, #071b31, #0d3150);
            color: #fff;
          }
          .ns-live-class-heading {
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            gap: 16px;
          }
          .ns-live-class-heading h2 { margin: 0 0 4px; }
          .ns-live-class-heading p { margin: 0; color: #d7e2ec; }
          .ns-live-class-heading strong { color: #f1bd60; font-size: 1.15rem; }
          .ns-live-class-icon {
            display: grid;
            place-items: center;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #d79a36;
            color: #071b31;
            font-size: 1.25rem;
          }
          .ns-live-class-benefits {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px 18px;
            margin: 20px 0;
          }
          .ns-live-class-benefits span,
          .ns-live-class-active,
          .ns-live-class-badge { display: flex; align-items: center; gap: 8px; }
          .ns-live-class-benefits svg,
          .ns-live-class-active svg { color: #f1bd60; }
          .ns-live-class-active {
            padding: 12px 14px;
            border-radius: 10px;
            background: rgba(34, 197, 94, 0.15);
          }
          .ns-live-class-badge {
            width: fit-content;
            margin-top: 10px;
            padding: 6px 10px;
            border-radius: 999px;
            font-size: 0.78rem;
            font-weight: 700;
          }
          .ns-live-class-badge.is-active { background: #dcfce7; color: #166534; }
          .ns-live-class-badge.is-locked { background: #fff7e6; color: #8a5800; }
          .ns-chapter-live-class { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
          .ns-live-session-link {
            margin-top: 10px;
            color: #174ea6;
            font-size: 0.8rem;
            font-weight: 700;
            text-decoration: underline;
          }
          .ns-live-session-link.is-disabled { color: #8290a0; cursor: not-allowed; text-decoration: none; }
          @media (max-width: 700px) {
            .ns-live-class-heading { grid-template-columns: auto 1fr; }
            .ns-live-class-heading strong { grid-column: 1 / -1; }
            .ns-live-class-benefits { grid-template-columns: 1fr; }
          }

          .ns-course-hero > * {
            min-width: 0;
          }

          .ns-course-left-column {
            display: flex;
            min-width: 0;
            flex-direction: column;
            gap: 18px;
          }

          .ns-course-books {
            overflow: hidden;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
          }

          .ns-course-books-heading {
            display: flex;
            align-items: center;
            gap: 11px;
            border-bottom: 1px solid #e2e8f0;
            color: #2563eb;
            padding: 15px 16px;
          }

          .ns-course-books-heading h2 {
            margin: 0;
            color: #0f172a;
            font-size: 15px;
          }

          .ns-course-books-heading p {
            margin: 3px 0 0;
            color: #64748b;
            font-size: 10px;
          }

          .ns-course-book-list {
            display: flex;
            flex-direction: column;
          }

          .ns-course-books-toggle {
            width: 100%;
            border: 0;
            border-top: 1px solid #e2e8f0;
            background: #fff;
            color: #2563eb;
            cursor: pointer;
            padding: 12px 16px;
            text-align: left;
            font: inherit;
            font-size: 12px;
            font-weight: 600;
          }

          .ns-course-books-toggle:hover,
          .ns-course-books-toggle:focus-visible {
            background: #eff6ff;
            text-decoration: underline;
          }

          .ns-course-book-item {
            display: flex;
            min-width: 0;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid #f1f5f9;
            color: inherit;
            padding: 12px 16px;
            text-decoration: none;
          }

          .ns-course-book-item:last-child {
            border-bottom: 0;
          }

          a.ns-course-book-item:hover {
            background: #f8fafc;
          }

          .ns-course-book-cover {
            display: flex;
            width: 48px;
            height: 64px;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            border-radius: 7px;
            background: #f8fafc;
            color: #94a3b8;
          }

          .ns-course-book-cover img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .ns-course-book-info {
            min-width: 0;
            flex: 1;
          }

          .ns-course-book-info h3 {
            margin: 0;
            color: #0f172a;
            font-size: 12px;
            line-height: 1.45;
          }

          .ns-course-book-info p {
            margin: 4px 0 0;
            color: #64748b;
            font-size: 10px;
          }

          .ns-course-book-info small {
            display: block;
            margin-top: 3px;
            color: #94a3b8;
            font-size: 9px;
          }

          .ns-course-books-empty {
            color: #64748b;
            padding: 18px 16px;
            font-size: 11px;
          }

          /* ==================================================
             COURSE COVER
             DESKTOP = 16:9
          ================================================== */

          .ns-course-cover {
            width: 100%;

            overflow: hidden;

            aspect-ratio: 16 / 9;

            border:
              1px solid #e2e8f0;

            border-radius: 16px;

            background: #ffffff;

            box-shadow:
              0 8px 24px
              rgba(
                15,
                23,
                42,
                0.06
              );
          }

          .ns-course-cover picture {
            display: block;

            width: 100%;
            height: 100%;
          }

          .ns-course-cover img {
            display: block;

            width: 100%;
            height: 100%;

            /*
             * Show complete artwork.
             * Do not crop the thumbnail.
             */
            object-fit: contain;

            object-position: center;

            background: #ffffff;
          }

          /* ==================================================
             COURSE OVERVIEW
          ================================================== */

          .ns-course-intro {
            display: flex;

            min-height: 100%;

            flex-direction: column;
          }

          .ns-course-intro h2 {
            margin:
              0 0 12px;

            color: #0f172a;

            font-size: 20px;
          }

          .ns-course-intro p {
            margin:
              0 0 18px;

            color: #64748b;

            font-size: 13px;

            line-height: 1.75;

            white-space: pre-line;
          }

          .ns-course-overview-title {
            margin:
              2px 0 10px;

            color: #0f172a;

            font-size: 17px;
          }

          .ns-course-more-details-button {
            align-self: flex-start;

            margin-bottom: 18px;

            border: none;

            border-radius: 10px;

            background: #2563eb;

            color: #ffffff;

            cursor: pointer;

            padding:
              10px 16px;

            font-size: 12px;

            font-weight: 800;
          }

          .ns-course-more-details-button:hover {
            background: #1d4ed8;
          }

          .ns-course-expanded-details {
            margin-bottom: 18px;

            border-top:
              1px solid #e2e8f0;

            padding-top: 18px;
          }

          .ns-course-expanded-details h3 {
            margin:
              0 0 10px;

            color: #0f172a;

            font-size: 16px;
          }

          .ns-course-expanded-details p {
            margin: 0;
          }

          .ns-course-expanded-details h4 {
            margin:
              18px 0 7px;

            color: #1e3a8a;

            font-size: 14px;
          }

          .ns-course-expanded-details ul {
            margin:
              8px 0 0;

            padding-left: 20px;

            color: #64748b;

            font-size: 13px;

            line-height: 1.7;
          }

          .ns-course-expanded-details li + li {
            margin-top: 5px;
          }

          /* ==================================================
             COURSE META
          ================================================== */

          .ns-course-detail-meta {
            display: flex;

            flex-wrap: wrap;

            gap: 10px;

            margin-top: 4px;
          }

          .ns-course-detail-meta span {
            display: inline-flex;

            align-items: center;

            gap: 6px;

            border-radius: 999px;

            background: #f1f5f9;

            color: #475569;

            padding: 7px 10px;

            font-size: 11px;

            font-weight: 700;
          }

          .ns-course-detail-meta
            .ns-course-state-badge {
            border: 1px solid #cbd5e1;

            background: #f8fafc;

            color: #64748b;
          }

          .ns-course-detail-meta
            .ns-course-state-badge.is-active {
            border-color: #86efac;

            background: #dcfce7;

            color: #166534;
          }

          .ns-course-detail-meta
            .ns-course-state-badge.is-inactive {
            border-color: #cbd5e1;

            background: #f8fafc;

            color: #64748b;
          }

          /* ==================================================
             COURSE PROGRESS
          ================================================== */

          .ns-course-progress-summary {
            margin-top: 18px;

            border-radius: 12px;

            background: #f8fafc;

            padding: 14px;
          }

          .ns-course-progress-heading {
            display: flex;

            align-items: center;

            justify-content:
              space-between;

            margin-bottom: 9px;

            color: #334155;

            font-size: 12px;

            font-weight: 700;
          }

          .ns-course-progress-heading strong {
            color: #2563eb;
          }

          .ns-course-progress-track,
          .ns-chapter-progress-track {
            overflow: hidden;

            width: 100%;

            height: 8px;

            border-radius: 999px;

            background: #e2e8f0;
          }

          .ns-course-progress-fill,
          .ns-chapter-progress-fill {
            height: 100%;

            border-radius: inherit;

            background: #2563eb;

            transition:
              width .25s ease;
          }

          .ns-course-progress-summary small {
            display: block;

            margin-top: 8px;

            color: #64748b;

            font-size: 10px;
          }

          .ns-course-enroll-action {
            margin-top: 18px;
          }

          /* ==================================================
             CERTIFICATION PROGRAM
          ================================================== */

          .ns-certification-section {
            margin-bottom: 24px;
            scroll-margin-top: 104px;
          }

          .ns-certification-card {
            overflow: hidden;
            border: 1px solid #dbeafe;
            border-radius: 16px;
            background: #ffffff;
            box-shadow:
              0 8px 24px
              rgba(
                15,
                23,
                42,
                0.05
              );
          }

          .ns-certification-heading {
            display: flex;
            align-items: center;
            gap: 14px;
            border-bottom: 1px solid #e2e8f0;
            padding: 18px 20px;
          }

          .ns-certification-icon {
            display: flex;
            width: 46px;
            height: 46px;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            background: #eff6ff;
            color: #2563eb;
            font-size: 21px;
          }

          .ns-certification-heading h2 {
            margin: 0;
            color: #0f172a;
            font-size: 18px;
          }

          .ns-certification-heading p {
            margin: 4px 0 0;
            color: #64748b;
            font-size: 12px;
          }

          .ns-certification-fee {
            margin-left: auto;
            border-radius: 999px;
            background: #ecfdf5;
            color: #047857;
            padding: 8px 12px;
            font-size: 14px;
            font-weight: 800;
          }

          .ns-certification-benefits {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 10px 18px;
            padding: 18px 20px;
          }

          .ns-certification-benefits > div {
            display: flex;
            align-items: flex-start;
            gap: 9px;
            color: #334155;
            font-size: 12px;
            line-height: 1.5;
          }

          .ns-certification-benefits svg {
            flex-shrink: 0;
            margin-top: 2px;
            color: #16a34a;
          }

          .ns-certification-action {
            border-top: 1px solid #e2e8f0;
            padding: 16px 20px;
          }

          .ns-certification-status {
            display: flex;
            flex-direction: column;
            gap: 4px;
            margin: 0 20px 18px;
            border-radius: 12px;
            padding: 13px 14px;
          }

          .ns-certification-status strong {
            font-size: 13px;
          }

          .ns-certification-status span {
            font-size: 11px;
            line-height: 1.5;
          }

          .ns-certification-status.is-pending {
            border: 1px solid #fde68a;
            background: #fffbeb;
            color: #92400e;
          }

          .ns-certification-status.is-active {
            border: 1px solid #bbf7d0;
            background: #f0fdf4;
            color: #166534;
          }

          .ns-certification-active {
            border-top: 1px solid #e2e8f0;
            padding-top: 18px;
          }

          .ns-certification-access-grid {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 10px;
            padding: 0 20px 20px;
          }

          .ns-certification-access-grid > div,
          .ns-certification-access-grid > button {
            display: flex;
            align-items: center;
            gap: 8px;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            background: #f8fafc;
            color: #64748b;
            padding: 10px 12px;
            font-size: 11px;
            font-weight: 700;
            text-align: left;
          }

          .ns-certification-access-grid > button:not(:disabled) {
            cursor: pointer;
          }

          .ns-certification-access-grid > button:disabled {
            cursor: not-allowed;
          }

          .ns-certification-access-grid
            > .is-unlocked {
            border-color: #bbf7d0;
            background: #f0fdf4;
            color: #166534;
          }

          /* ==================================================
             CHAPTER SECTION
          ================================================== */

          .ns-course-chapters-section {
            width: 100%;
          }

          .ns-learning-chapter-list {
            display: flex;

            flex-direction: column;

            gap: 12px;
          }

          .ns-learning-chapter {
            display: flex;

            align-items: center;

            gap: 15px;

            border:
              1px solid #e2e8f0;

            border-radius: 14px;

            background: #ffffff;

            padding: 15px;

            transition:
              border-color .2s ease,
              box-shadow .2s ease;
          }

          .ns-learning-chapter:not(.locked):hover {
            border-color: #bfdbfe;

            box-shadow:
              0 5px 18px
              rgba(
                37,
                99,
                235,
                0.07
              );
          }

          .ns-learning-chapter.locked {
            background: #f8fafc;

            opacity: .72;
          }

          .ns-learning-chapter-number {
            display: flex;

            width: 44px;
            height: 44px;

            flex-shrink: 0;

            align-items: center;

            justify-content: center;

            border-radius: 12px;

            background: #eff6ff;

            color: #2563eb;

            font-weight: 800;
          }

          .ns-learning-chapter.locked
            .ns-learning-chapter-number {
            background: #e2e8f0;

            color: #64748b;
          }

          .ns-learning-chapter-info {
            min-width: 0;

            flex: 1;
          }

          .ns-learning-chapter-info h3 {
            margin: 0;

            color: #0f172a;

            font-size: 15px;
          }

          .ns-learning-chapter-info p {
            margin:
              5px 0 0;

            color: #64748b;

            font-size: 12px;

            line-height: 1.5;
          }

          /* ==================================================
             CHAPTER PROGRESS
          ================================================== */

          .ns-chapter-progress {
            margin-top: 10px;

            max-width: 430px;
          }

          .ns-chapter-progress-text {
            display: flex;

            align-items: center;

            justify-content:
              space-between;

            gap: 10px;

            margin-bottom: 6px;
          }

          .ns-chapter-progress-text span {
            color: #2563eb;

            font-size: 11px;

            font-weight: 700;
          }

          .ns-chapter-progress-text strong {
            display: flex;

            align-items: center;

            gap: 5px;

            color: #15803d;

            font-size: 11px;
          }

          /* ==================================================
             CHAPTER BUTTON
          ================================================== */

          .ns-learning-chapter button {
            display: flex;

            min-width: 92px;

            align-items: center;

            justify-content: center;

            gap: 7px;

            border: none;

            border-radius: 10px;

            background: #2563eb;

            color: #ffffff;

            cursor: pointer;

            padding:
              10px 14px;

            font-weight: 700;
          }

          .ns-learning-chapter
            button:hover:not(:disabled) {
            background: #1d4ed8;
          }

          .ns-learning-chapter
            button:disabled {
            background: #cbd5e1;

            cursor: not-allowed;
          }

          /* ==================================================
             EMPTY / ERROR
          ================================================== */

          .ns-no-course-chapters {
            border:
              1px dashed #cbd5e1;

            border-radius: 12px;

            color: #64748b;

            padding: 24px;

            text-align: center;
          }

          .ns-course-detail-error {
            margin-bottom: 18px;

            border:
              1px solid #fecaca;

            border-radius: 10px;

            background: #fef2f2;

            color: #b91c1c;

            padding: 12px;
          }

          /* ==================================================
             TABLET
          ================================================== */

          @media (
            max-width: 900px
          ) {
            .ns-course-hero {
              grid-template-columns:
                1fr;

              gap: 18px;
            }

            .ns-course-cover {
              width: 100%;

              max-width: 640px;

              margin:
                0 auto;
            }

            .ns-course-left-column {
              display: contents;
            }

            .ns-course-cover {
              order: 1;
            }

            .ns-course-hero > .ns-course-left-column + * {
              order: 2;
            }

            .ns-course-books {
              order: 3;
            }
          }

          /* ==================================================
             MOBILE
             MOBILE IMAGE = 16:9
          ================================================== */

          @media (
            max-width: 640px
          ) {
            .ns-course-hero {
              gap: 16px;
            }

            .ns-course-cover {
              width: 100%;

              max-width: 420px;

              aspect-ratio:
                16 / 9;

              margin:
                0 auto;

              border-radius: 14px;

              background: #ffffff;
            }

            .ns-course-cover img {
              object-fit: contain;

              object-position: center;
            }

            .ns-course-intro h2 {
              font-size: 18px;
            }

            .ns-course-detail-meta {
              gap: 6px;
            }

            .ns-certification-heading {
              align-items: flex-start;
              flex-wrap: wrap;
            }

            .ns-certification-fee {
              margin-left: 0;
            }

            .ns-certification-benefits,
            .ns-certification-access-grid {
              grid-template-columns:
                1fr;
            }

            .ns-certification-action {
              display: flex;
              flex-direction: column;
            }

            .ns-learning-chapter {
              align-items: stretch;

              flex-direction: column;
            }

            .ns-learning-chapter-number {
              width: 38px;

              height: 38px;
            }

            .ns-learning-chapter button {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}
