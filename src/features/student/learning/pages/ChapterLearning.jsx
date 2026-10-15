import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Document,
  Page,
  pdfjs,
} from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import {
  FaBalanceScale,
  FaBookOpen,
  FaCheck,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaFileAlt,
  FaFilePdf,
  FaGraduationCap,
  FaLandmark,
  FaLightbulb,
  FaLink,
  FaListUl,
  FaLock,
} from "react-icons/fa";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAuth } from "../../../../hooks/useAuth";

import {
  getPublishedChaptersByCourse,
} from "../../../../services/chapterService";

import {
  getCourseBySlug,
} from "../../../../services/courseService";

import {
  getPublishedChapterResources,
} from "../../../../services/chapterResourceService";

import {
  getStudentEnrollment,
} from "../../../../services/studentEnrollmentService";

import {
  getStudentChapterProgress,
  markChapterComplete,
  markResourceComplete,
  startChapter,
} from "../../../../services/studentProgressService";

import Card from "../../../../shared/components/Card";
import Button from "../../../../shared/components/Button";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";
import PageHeader from "../../../../shared/components/PageHeader";
import {
  getChapterLearningPath,
  getChapterPathSegment,
  resolveChapterPathSegment,
} from "../../../../utils/chapterUrl";

import ChapterNavigation from "../components/ChapterNavigation";

// =========================================================
// PDF.JS WORKER
// =========================================================

pdfjs.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

// =========================================================
// HELPERS
// =========================================================

const getYouTubeEmbedUrl = (
  videoId,
  youtubeUrl,
) => {
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  try {
    const url =
      new URL(
        youtubeUrl,
      );

    if (
      url.hostname.includes(
        "youtu.be",
      )
    ) {
      return `https://www.youtube.com/embed/${url.pathname.replace(
        "/",
        "",
      )}`;
    }

    const id =
      url.searchParams.get(
        "v",
      );

    return id
      ? `https://www.youtube.com/embed/${id}`
      : "";
  } catch {
    return "";
  }
};

const formatFileSize = (
  bytes = 0,
) => {
  const size =
    Number(
      bytes || 0,
    );

  if (!size) {
    return "";
  }

  if (
    size <
    1024
  ) {
    return `${size} B`;
  }

  if (
    size <
    1024 * 1024
  ) {
    return `${(
      size /
      1024
    ).toFixed(
      1,
    )} KB`;
  }

  return `${(
    size /
    (
      1024 *
      1024
    )
  ).toFixed(
    2,
  )} MB`;
};

const hasText = (
  value,
) =>
  Boolean(
    String(
      value || "",
    ).trim(),
  );

const isEnrollmentActive = (
  enrollment,
) => {
  if (!enrollment) {
    return false;
  }

  if (
    enrollment.deleted ===
    true
  ) {
    return false;
  }

  return [
    "active",
    "completed",
  ].includes(
    enrollment.status,
  );
};

// =========================================================
// CHAPTER LEARNING
// =========================================================

export default function ChapterLearning() {
  const {
    courseId:
      courseSlug,

    chapterId,
  } = useParams();

  const navigate =
    useNavigate();

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
    profile?.role ===
      "admin";

  const [
    course,
    setCourse,
  ] = useState(null);

  const [
    chapter,
    setChapter,
  ] = useState(null);

  const [
    chapters,
    setChapters,
  ] = useState([]);

  const [
    resources,
    setResources,
  ] = useState([]);

  const [
    enrollment,
    setEnrollment,
  ] = useState(null);

  const [
    progress,
    setProgress,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    completing,
    setCompleting,
  ] = useState(false);

  const [
    resourceCompletingId,
    setResourceCompletingId,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  // =========================================================
  // MAIN PDF STATE
  // =========================================================

  const [
    pdfPageCount,
    setPdfPageCount,
  ] = useState(0);

  const [
    pdfPageNumber,
    setPdfPageNumber,
  ] = useState(1);

  const [
    pdfWidth,
    setPdfWidth,
  ] = useState(900);

  // =========================================================
  // RESPONSIVE PDF WIDTH
  // =========================================================

  useEffect(() => {
    const updatePdfWidth =
      () => {
        const viewport =
          window.innerWidth ||
          1024;

        const horizontalSpace =
          viewport <= 768
            ? 36
            : 100;

        setPdfWidth(
          Math.max(
            270,
            Math.min(
              900,
              viewport -
                horizontalSpace,
            ),
          ),
        );
      };

    updatePdfWidth();

    window.addEventListener(
      "resize",
      updatePdfWidth,
    );

    return () =>
      window.removeEventListener(
        "resize",
        updatePdfWidth,
      );
  }, []);

  // =========================================================
  // LOAD
  // =========================================================

  async function loadLearningPage() {
      try {
        setLoading(
          true,
        );

        setError(
          "",
        );

        setChapter(
          null,
        );

        setChapters(
          [],
        );

        setResources(
          [],
        );

        setProgress(
          null,
        );

        setEnrollment(
          null,
        );

        setPdfPageCount(
          0,
        );

        setPdfPageNumber(
          1,
        );

        // =====================================================
        // COURSE
        // =====================================================

        const courseData =
          await getCourseBySlug(
            courseSlug,
          );

        if (!courseData) {
          setCourse(
            null,
          );

          return;
        }

        const realCourseId =
          courseData.id;

        if (!realCourseId) {
          throw new Error(
            "Course document ID is missing.",
          );
        }

        setCourse(
          courseData,
        );

        // =====================================================
        // ENROLLMENT
        // =====================================================
        //
        // Enrollment is checked, but NOT required merely to
        // read the chapter.
        //
        // It controls:
        //
        // - progress tracking
        // - chapter completion
        // - protected PDF download
        // - certification features
        // =====================================================

        let enrollmentData =
          null;

        if (!isAdmin) {
          try {
            enrollmentData =
              await getStudentEnrollment(
                studentId,
                realCourseId,
              );

            setEnrollment(
              enrollmentData ||
                null,
            );
          } catch (
            enrollmentError
          ) {
            console.warn(
              "Unable to load enrollment:",
              enrollmentError,
            );

            setEnrollment(
              null,
            );
          }
        }

        const enrolled =
          isAdmin ||
          isEnrollmentActive(
            enrollmentData,
          );

        // =====================================================
        // LOAD PUBLISHED CHAPTER CONTENT
        // =====================================================

        const chapterList =
          await getPublishedChaptersByCourse(
            realCourseId,
            courseSlug,
          );

        const chapterData =
          resolveChapterPathSegment(
            chapterList,
            courseSlug,
            chapterId,
          );

        const resolvedChapterId =
          chapterData?.id || "";

        const resourceList =
          resolvedChapterId
            ? await getPublishedChapterResources(
                resolvedChapterId,
              )
            : [];

        // =====================================================
        // VALIDATE CHAPTER
        // =====================================================

        if (
          !chapterData ||
          chapterData.published !==
            true ||
          chapterData.deleted ===
            true ||
          chapterData.courseId !==
            realCourseId
        ) {
          setChapter(
            null,
          );

          return;
        }

        setChapter(
          chapterData,
        );

        const canonicalSegment =
          getChapterPathSegment(
            courseSlug,
            chapterData,
          );

        if (
          canonicalSegment &&
          canonicalSegment !== chapterId
        ) {
          navigate(
            getChapterLearningPath(
              courseSlug,
              chapterData,
            ),
            { replace: true },
          );
        }

        // =====================================================
        // CHAPTER LIST
        // =====================================================

        const safeChapterList =
          Array.isArray(
            chapterList,
          )
            ? chapterList
                .filter(
                  (item) =>
                    item.published ===
                      true &&
                    item.deleted !==
                      true,
                )
                .sort(
                  (
                    first,
                    second,
                  ) => {
                    const firstNumber =
                      Number(
                        first.chapterNumber ||
                          first.displayOrder ||
                          0,
                      );

                    const secondNumber =
                      Number(
                        second.chapterNumber ||
                          second.displayOrder ||
                          0,
                      );

                    return (
                      firstNumber -
                      secondNumber
                    );
                  },
                )
            : [];

        setChapters(
          safeChapterList,
        );

        // =====================================================
        // RESOURCES
        // =====================================================

        setResources(
          Array.isArray(
            resourceList,
          )
            ? resourceList
            : [],
        );

        // =====================================================
        // PROGRESS ONLY FOR ENROLLED STUDENTS / ADMIN
        // =====================================================

        if (enrolled) {
          const existingProgress =
            await getStudentChapterProgress(
              studentId,
              resolvedChapterId,
            );

          if (
            existingProgress
          ) {
            setProgress(
              existingProgress,
            );
          } else {
            const started =
              await startChapter(
                {
                  studentId,

                  courseId:
                    realCourseId,

                  chapterId:
                    resolvedChapterId,
                },

                studentId,
              );

            setProgress(
              started,
            );
          }
        } else {
          setProgress(
            null,
          );
        }
      } catch (
        loadError
      ) {
        console.error(
          "Unable to load chapter:",
          loadError,
        );

        setError(
          loadError?.message ||
            "Unable to load this chapter.",
        );

        setChapter(
          null,
        );
      } finally {
        setLoading(
          false,
        );
      }
    }

  useEffect(() => {
    if (
      !courseSlug ||
      !chapterId ||
      !studentId
    ) {
      return;
    }

    // The loader performs the route-driven asynchronous state transition.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadLearningPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    courseSlug,
    chapterId,
    studentId,
    isAdmin,
  ]);

  // =========================================================
  // ACCESS
  // =========================================================

  const enrolled =
    isAdmin ||
    isEnrollmentActive(
      enrollment,
    );

  const certification =
    enrollment?.certification ||
    null;

  const certificationActive =
    [
      "active",
      "completed",
    ].includes(
      certification?.status,
    );

  const certificationPaid =
    certification
      ?.payment
      ?.status ===
    "paid";

  const certificationPdfAccess =
    certification
      ?.access
      ?.pdfDownload ===
    true;

  // =========================================================
  // READING ACCESS
  //
  // Every authenticated student may read the PDF.
  // =========================================================

  const isFreeFirstChapter = Boolean(firebaseUser) && ["law-of-torts-mv-and-cp-laws", "code-of-civil-procedure-and-limitation"].includes(course?.slug) &&
    Boolean(chapter?.id && chapters[0]?.id === chapter.id);

  const canReadPdf = Boolean(
    isAdmin || isFreeFirstChapter ||
      (enrolled && certificationActive && certificationPaid),
  );

  // =========================================================
  // DOWNLOAD ACCESS
  //
  // Admin:
  // YES
  //
  // Student:
  // Requires active certification + payment + PDF entitlement.
  // =========================================================

  const canDownloadPdf =
    Boolean(
      isAdmin ||
      (
        enrolled &&
        certificationActive &&
        certificationPaid &&
        certificationPdfAccess
      ),
    );

  // =========================================================
  // CONTENT
  // =========================================================

  const content =
    chapter?.content ||
    {};

  const chapterOverview =
    content.overview ||
    chapter
      ?.chapterOverview ||
    "";

  const learningObjectives =
    Array.isArray(
      content
        .learningObjectives,
    )
      ? content
          .learningObjectives
      : [];

  const detailedContent =
    content
      .detailedContent ||
    chapter
      ?.detailedContent ||
    "";

  const keyPoints =
    Array.isArray(
      content.keyPoints,
    )
      ? content
          .keyPoints
      : [];

  const statutoryProvisions =
    Array.isArray(
      content
        .statutoryProvisions,
    )
      ? content
          .statutoryProvisions
      : [];

  const importantCases =
    Array.isArray(
      content
        .importantCases,
    )
      ? content
          .importantCases
      : [];

  const examFocus =
    content.examFocus ||
    chapter?.examFocus ||
    "";

  const revisionNotes =
    content
      .revisionNotes ||
    chapter
      ?.revisionNotes ||
    "";

  const hasAcademicContent =
    Boolean(
      hasText(
        chapter
          ?.shortDescription,
      ) ||
        hasText(
          chapterOverview,
        ) ||
        learningObjectives.length >
          0 ||
        hasText(
          detailedContent,
        ) ||
        keyPoints.length >
          0 ||
        statutoryProvisions.length >
          0 ||
        importantCases.length >
          0 ||
        hasText(
          examFocus,
        ) ||
        hasText(
          revisionNotes,
        ) ||
        hasText(
          chapter?.notes,
        ),
    );

  // =========================================================
  // MAIN PDF
  // =========================================================

  const chapterPdfUrl =
    chapter?.pdf?.url ||
    chapter?.pdfUrl ||
    "";

  const chapterPdfFileName =
    chapter?.pdf
      ?.fileName ||
    chapter
      ?.pdfFileName ||
    "Chapter Study Material.pdf";

  const chapterPdfFileSize =
    chapter?.pdf
      ?.fileSize ||
    chapter
      ?.pdfFileSize ||
    0;

  const hasChapterPdf =
    Boolean(
      chapterPdfUrl,
    );

  // =========================================================
  // CHAPTER POSITION
  // =========================================================

  const currentIndex =
    useMemo(
      () =>
        chapters.findIndex(
          (item) =>
            item.id ===
            chapter?.id,
        ),
      [
        chapters,
        chapter?.id,
      ],
    );

  const previousChapter =
    currentIndex > 0
      ? chapters[
          currentIndex -
            1
        ]
      : null;

  const nextChapter =
    currentIndex >=
      0 &&
    currentIndex <
      chapters.length -
        1
      ? chapters[
          currentIndex +
            1
        ]
      : null;

  // =========================================================
  // COMPLETED RESOURCE IDS
  // =========================================================

  const completedResourceIds =
    Array.isArray(
      progress
        ?.resources
        ?.completedIds,
    )
      ? progress
          .resources
          .completedIds
      : [];

  // =========================================================
  // RESOURCE COMPLETE
  // =========================================================

  const handleResourceComplete =
    async (
      resourceId,
    ) => {
      if (
        !enrolled ||
        !course?.id ||
        !resourceId
      ) {
        return;
      }

      try {
        setResourceCompletingId(
          resourceId,
        );

        setError(
          "",
        );

        const updated =
          await markResourceComplete({
            studentId,

            courseId:
              course.id,

            chapterId:
              chapter.id,

            resourceId,

            totalResources:
              resources.length,

            updatedBy:
              studentId,
          });

        setProgress(
          updated,
        );
      } catch (
        progressError
      ) {
        console.error(
          "Unable to update resource progress:",
          progressError,
        );

        setError(
          progressError
            ?.message ||
            "Unable to update learning progress.",
        );
      } finally {
        setResourceCompletingId(
          "",
        );
      }
    };

  // =========================================================
  // CHAPTER COMPLETE
  // =========================================================

  const handleChapterComplete =
    async () => {
      if (!enrolled) {
        return;
      }

      try {
        setCompleting(
          true,
        );

        setError(
          "",
        );

        const updated =
          await markChapterComplete(
            studentId,
            chapter.id,
            studentId,
          );

        setProgress(
          updated,
        );
      } catch (
        completeError
      ) {
        console.error(
          "Unable to complete chapter:",
          completeError,
        );

        setError(
          completeError
            ?.message ||
            "Unable to complete chapter.",
        );
      } finally {
        setCompleting(
          false,
        );
      }
    };

  // =========================================================
  // NAVIGATION
  // =========================================================

  const navigateChapter = (
    targetChapter,
  ) => {
    if (
      !targetChapter?.id ||
      !course?.slug
    ) {
      return;
    }

    navigate(
      getChapterLearningPath(
        course.slug,
        targetChapter,
      ),
    );
  };

  const backToCourseButton = course?.slug ? (
    <Button
      variant="outline"
      leftIcon={<FaChevronLeft aria-hidden="true" />}
      onClick={() => navigate(`/student/courses/${course.slug}`)}
      aria-label={`Back to Course: ${course.title}`}
    >
      Back to Course
    </Button>
  ) : null;

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <LoadingSpinner
        fullPage
        text="Loading chapter..."
      />
    );
  }

  // =========================================================
  // NOT FOUND
  // =========================================================

  if (
    !chapter ||
    !course
  ) {
    return (
      <div>
        {error && (
          <div className="ns-learning-error">
            {error}
          </div>
        )}

        <Card>
          Chapter not found.
        </Card>
      </div>
    );
  }

  if (!canReadPdf) {
    return (
      <div className="ns-learning-page">
        <div style={{ marginBottom: 18 }}>{backToCourseButton}</div>
        <PageHeader
          title="Course Enrollment Required"
          description={course.title}
          breadcrumbs={["Student", "Available Courses", course.title]}
        />
        <Card>
          <div style={{ textAlign: "center", padding: "28px 16px" }}>
            <FaLock style={{ color: "#d97706", fontSize: 38, marginBottom: 14 }} />
            <h2 style={{ margin: "0 0 10px" }}>Complete payment to unlock this course</h2>
            <p style={{ color: "#64748b", margin: "0 0 20px" }}>
              Chapter content is available only after successful enrollment payment for this individual course.
            </p>
            <Button onClick={() => navigate(`/student/courses/${course.slug}#certification-enrollment`)}>
              Go to Course Enrollment
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="ns-learning-page">
      <div style={{ marginBottom: 18 }}>{backToCourseButton}</div>
      <PageHeader
        title={
          chapter.title
        }
        description={
          course.title
        }
        breadcrumbs={[
          "Student",
          "My Courses",
          course.title,
          chapter.title,
        ]}
      />

      {error && (
        <div className="ns-learning-error">
          {error}
        </div>
      )}

      {/* =====================================================
          ACCESS / PROGRESS
      ====================================================== */}

      <div className="ns-learning-progress-summary">
        <div>
          <span>
            {enrolled
              ? "Chapter Progress"
              : "Learning Access"}
          </span>

          <strong>
            {enrolled
              ? `${Number(
                  progress
                    ?.progressPercentage ||
                    0,
                )}%`
              : "Read Only"}
          </strong>
        </div>

        {enrolled ? (
          <div className="ns-learning-progress-track">
            <div
              style={{
                width:
                  `${Number(
                    progress
                      ?.progressPercentage ||
                      0,
                  )}%`,
              }}
            />
          </div>
        ) : (
          <div className="ns-read-only-message">
            <FaLock />

            <span>
              {isFreeFirstChapter ? "Chapter 1 is free to read. Enroll in the full course for the remaining chapters, eligible downloads, tests and progress tracking." : "You may read this chapter. Enroll in the certification programme to unlock downloads, tests and progress tracking."}
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          ACADEMIC CONTENT
      ====================================================== */}

      {hasAcademicContent && (
        <div className="ns-academic-content">
          {hasText(
            chapter
              .shortDescription,
          ) && (
            <AcademicSection
              icon={
                <FaBookOpen />
              }
              eyebrow="Chapter Introduction"
              title="About This Chapter"
            >
              <ContentText>
                {
                  chapter
                    .shortDescription
                }
              </ContentText>
            </AcademicSection>
          )}

          {hasText(
            chapterOverview,
          ) && (
            <AcademicSection
              icon={
                <FaBookOpen />
              }
              eyebrow="Overview"
              title="Chapter Overview"
            >
              <ContentText>
                {
                  chapterOverview
                }
              </ContentText>
            </AcademicSection>
          )}

          {learningObjectives.length >
            0 && (
            <AcademicSection
              icon={
                <FaGraduationCap />
              }
              eyebrow="What You Will Learn"
              title="Learning Objectives"
            >
              <div className="ns-objective-grid">
                {learningObjectives.map(
                  (
                    objective,
                    index,
                  ) => (
                    <div
                      key={`${objective}-${index}`}
                      className="ns-objective-item"
                    >
                      <span>
                        <FaCheck />
                      </span>

                      <p>
                        {
                          objective
                        }
                      </p>
                    </div>
                  ),
                )}
              </div>
            </AcademicSection>
          )}

          {hasText(
            detailedContent,
          ) && (
            <AcademicSection
              icon={
                <FaFileAlt />
              }
              eyebrow="Study Notes"
              title="Detailed Chapter Content"
            >
              <ContentText
                large
              >
                {
                  detailedContent
                }
              </ContentText>
            </AcademicSection>
          )}

          {keyPoints.length >
            0 && (
            <AcademicSection
              icon={
                <FaLightbulb />
              }
              eyebrow="Remember"
              title="Key Points"
              tone="highlight"
            >
              <div className="ns-key-points">
                {keyPoints.map(
                  (
                    point,
                    index,
                  ) => (
                    <div
                      key={`${point}-${index}`}
                      className="ns-key-point"
                    >
                      <span>
                        {index +
                          1}
                      </span>

                      <p>
                        {
                          point
                        }
                      </p>
                    </div>
                  ),
                )}
              </div>
            </AcademicSection>
          )}

          {statutoryProvisions.length >
            0 && (
            <AcademicSection
              icon={
                <FaLandmark />
              }
              eyebrow="Legal References"
              title="Important Statutory Provisions"
            >
              <div className="ns-provision-list">
                {statutoryProvisions.map(
                  (
                    item,
                    index,
                  ) => (
                    <div
                      key={
                        item.id ||
                        index
                      }
                      className="ns-provision-card"
                    >
                      <div className="ns-provision-number">
                        {index +
                          1}
                      </div>

                      <div>
                        {hasText(
                          item.title,
                        ) && (
                          <h3>
                            {
                              item.title
                            }
                          </h3>
                        )}

                        {hasText(
                          item.provision,
                        ) && (
                          <div className="ns-provision-badge">
                            {
                              item.provision
                            }
                          </div>
                        )}

                        {hasText(
                          item.description,
                        ) && (
                          <p>
                            {
                              item.description
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </AcademicSection>
          )}

          {importantCases.length >
            0 && (
            <AcademicSection
              icon={
                <FaBalanceScale />
              }
              eyebrow="Case Law"
              title="Important Cases & Judgments"
            >
              <div className="ns-case-list">
                {importantCases.map(
                  (
                    item,
                    index,
                  ) => (
                    <article
                      key={
                        item.id ||
                        index
                      }
                      className="ns-case-card"
                    >
                      <div className="ns-case-index">
                        Case{" "}
                        {index +
                          1}
                      </div>

                      {hasText(
                        item.caseName,
                      ) && (
                        <h3>
                          {
                            item.caseName
                          }
                        </h3>
                      )}

                      {hasText(
                        item.citation,
                      ) && (
                        <div className="ns-case-citation">
                          {
                            item.citation
                          }
                        </div>
                      )}

                      {hasText(
                        item.principle,
                      ) && (
                        <div className="ns-case-principle">
                          <strong>
                            Principle
                          </strong>

                          <p>
                            {
                              item.principle
                            }
                          </p>
                        </div>
                      )}

                      {hasText(
                        item.summary,
                      ) && (
                        <div className="ns-case-summary">
                          <strong>
                            Case Summary
                          </strong>

                          <p>
                            {
                              item.summary
                            }
                          </p>
                        </div>
                      )}
                    </article>
                  ),
                )}
              </div>
            </AcademicSection>
          )}

          {hasText(
            examFocus,
          ) && (
            <AcademicSection
              icon={
                <FaGraduationCap />
              }
              eyebrow="Examination Preparation"
              title="Exam Focus"
              tone="exam"
            >
              <ContentText>
                {
                  examFocus
                }
              </ContentText>
            </AcademicSection>
          )}

          {hasText(
            revisionNotes,
          ) && (
            <AcademicSection
              icon={
                <FaListUl />
              }
              eyebrow="Quick Study"
              title="Revision Notes"
              tone="revision"
            >
              <ContentText>
                {
                  revisionNotes
                }
              </ContentText>
            </AcademicSection>
          )}

          {hasText(
            chapter.notes,
          ) && (
            <AcademicSection
              icon={
                <FaFileAlt />
              }
              eyebrow="Additional Notes"
              title="Chapter Notes"
            >
              <ContentText>
                {
                  chapter.notes
                }
              </ContentText>
            </AcademicSection>
          )}
        </div>
      )}

      {/* =====================================================
          STUDY MATERIAL HEADER
      ====================================================== */}

      {(hasChapterPdf ||
        resources.length >
          0) && (
        <div className="ns-study-material-heading">
          <div className="ns-study-material-icon">
            <FaBookOpen />
          </div>

          <div>
            <span>
              Learning Resources
            </span>

            <h2>
              Chapter Study Material
            </h2>

            <p>
              Read the chapter material directly inside Sanhita360.
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          MAIN PDF
      ====================================================== */}

      {hasChapterPdf &&
        canReadPdf && (
          <div className="ns-chapter-pdf-section">
            <div className="ns-chapter-pdf-heading">
              <div className="ns-chapter-pdf-title">
                <div className="ns-chapter-pdf-icon">
                  <FaFilePdf />
                </div>

                <div>
                  <h2>
                    Chapter PDF
                  </h2>

                  <p>
                    Online reading material
                  </p>
                </div>
              </div>

              <div className="ns-chapter-pdf-file">
                <strong>
                  {
                    chapterPdfFileName
                  }
                </strong>

                {chapterPdfFileSize >
                  0 && (
                  <span>
                    {formatFileSize(
                      chapterPdfFileSize,
                    )}
                  </span>
                )}
              </div>
            </div>

            <ProtectedPdfReader
              url={
                chapterPdfUrl
              }
              pageNumber={
                pdfPageNumber
              }
              pageCount={
                pdfPageCount
              }
              width={
                pdfWidth
              }
              onLoadSuccess={({
                numPages,
              }) => {
                setPdfPageCount(
                  numPages,
                );

                setPdfPageNumber(
                  1,
                );
              }}
              onPrevious={() =>
                setPdfPageNumber(
                  (
                    current,
                  ) =>
                    Math.max(
                      1,
                      current - 1,
                    ),
                )
              }
              onNext={() =>
                setPdfPageNumber(
                  (
                    current,
                  ) =>
                    Math.min(
                      pdfPageCount,
                      current + 1,
                    ),
                )
              }
              onNavigate={(pageNumber) =>
                setPdfPageNumber(pageNumber)
              }
            />

            <div className="ns-pdf-access">
              {canDownloadPdf ? (
                <a
                  href={
                    chapterPdfUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="ns-pdf-download"
                >
                  <FaFilePdf />

                  Download PDF
                </a>
              ) : (
                <div className="ns-pdf-locked">
                  <FaLock />

                  <div>
                    <strong>
                      Read-only study material
                    </strong>

                    <span>
                      You can read this PDF online. Download access is available after eligible certification enrollment.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* =====================================================
          ADDITIONAL RESOURCES
      ====================================================== */}

      <div className="ns-learning-resource-list">
        {resources.map(
          (
            resource,
          ) => {
            const completed =
              completedResourceIds.includes(
                resource.id,
              );

            const embedUrl =
              resource.type ===
                "video"
                ? getYouTubeEmbedUrl(
                    resource.video
                      ?.youtubeVideoId,

                    resource.video
                      ?.youtubeUrl,
                  )
                : "";

            const resourceBusy =
              resourceCompletingId ===
              resource.id;

            return (
              <Card
                key={
                  resource.id
                }
                title={
                  resource.title
                }
                subtitle={
                  resource.description
                }
                actions={
                  completed ? (
                    <span className="ns-resource-completed">
                      <FaCheckCircle />
                      Completed
                    </span>
                  ) : null
                }
              >
                {resource.type ===
                  "video" &&
                  embedUrl && (
                    <div className="ns-video-wrapper">
                      <iframe
                        src={
                          embedUrl
                        }
                        title={
                          resource.title
                        }
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                {resource.type ===
                  "note" && (
                  <div className="ns-resource-text">
                    <FaFileAlt />

                    <div>
                      {
                        resource.content
                      }
                    </div>
                  </div>
                )}

                {resource.type ===
                  "assignment" && (
                  <div className="ns-resource-text">
                    <FaFileAlt />

                    <div>
                      {
                        resource.content
                      }
                    </div>
                  </div>
                )}

                {resource.type ===
                  "pdf" &&
                  resource.file
                    ?.url && (
                  <div className="ns-resource-pdf">
                    <div className="ns-resource-pdf-label">
                      <FaFilePdf />

                      <span>
                        Online PDF Resource
                      </span>

                      {!canDownloadPdf && (
                        <FaLock />
                      )}
                    </div>

                    <ProtectedResourcePdf
                      url={
                        resource.file
                          .url
                      }
                      title={
                        resource.title
                      }
                    />
                  </div>
                )}

                {resource.type ===
                  "link" &&
                  resource.file
                    ?.url && (
                  <a
                    href={
                      resource.file
                        .url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="ns-learning-link"
                  >
                    <FaLink />
                    Open Resource
                  </a>
                )}

                {resource.type ===
                  "download" &&
                  resource.file
                    ?.url && (
                  canDownloadPdf ? (
                    <a
                      href={
                        resource.file
                          .url
                      }
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="ns-learning-link"
                    >
                      <FaFileAlt />
                      Download Resource
                    </a>
                  ) : (
                    <div className="ns-protected-download">
                      <FaLock />

                      <div>
                        <strong>
                          Protected download
                        </strong>

                        <span>
                          Enrollment is required to download this material.
                        </span>
                      </div>
                    </div>
                  )
                )}

                {!completed &&
                  enrolled && (
                  <button
                    type="button"
                    className="ns-mark-resource-complete"
                    disabled={
                      resourceBusy
                    }
                    onClick={() =>
                      handleResourceComplete(
                        resource.id,
                      )
                    }
                  >
                    <FaCheckCircle />

                    {resourceBusy
                      ? "Saving..."
                      : "Mark Resource Complete"}
                  </button>
                )}
              </Card>
            );
          },
        )}
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <ChapterNavigation
        previousChapter={
          previousChapter
        }
        nextChapter={
          nextChapter
        }
        completed={
          Boolean(
            progress?.completed,
          )
        }
        completing={
          completing
        }
        onPrevious={() =>
          navigateChapter(
            previousChapter,
          )
        }
        onNext={() =>
          navigateChapter(
            nextChapter,
          )
        }
        onComplete={
          enrolled
            ? handleChapterComplete
            : undefined
        }
      />

      <div style={{ marginTop: 18 }}>{backToCourseButton}</div>

      <LearningStyles />
    </div>
  );
}

// =========================================================
// PROTECTED MAIN PDF READER
// =========================================================

function ProtectedPdfReader({
  url,
  pageNumber,
  pageCount,
  width,
  onLoadSuccess,
  onPrevious,
  onNext,
  onNavigate,
}) {
  return (
    <div
      className="ns-pdf-reader"
      onContextMenu={(
        event,
      ) =>
        event.preventDefault()
      }
    >
      <div className="ns-pdf-reader-toolbar">
        <div>
          <FaLock />

          <span>
            Online Reader
          </span>
        </div>

        <strong>
          {pageCount
            ? `Page ${pageNumber} of ${pageCount}`
            : "Loading..."}
        </strong>
      </div>

      <div className="ns-pdf-document">
        <Document
          file={
            url
          }
          onLoadSuccess={
            onLoadSuccess
          }
          onItemClick={({ pageNumber }) =>
            onNavigate(pageNumber)
          }
          loading={
            <div className="ns-pdf-status">
              Loading study material...
            </div>
          }
          error={
            <div className="ns-pdf-status error">
              Unable to display this PDF.
            </div>
          }
        >
          <Page
            pageNumber={
              pageNumber
            }
            width={
              width
            }
            renderAnnotationLayer
            renderTextLayer
          />
        </Document>
      </div>

      {pageCount >
        1 && (
        <div className="ns-pdf-pagination">
          <button
            type="button"
            disabled={
              pageNumber <=
              1
            }
            onClick={
              onPrevious
            }
          >
            <FaChevronLeft />
            Previous
          </button>

          <strong>
            {pageNumber} /{" "}
            {pageCount}
          </strong>

          <button
            type="button"
            disabled={
              pageNumber >=
              pageCount
            }
            onClick={
              onNext
            }
          >
            Next
            <FaChevronRight />
          </button>
        </div>
      )}

      <div className="ns-pdf-reader-notice">
        <FaLock />

        <span>
          This material is provided for online reading. Download access is controlled separately.
        </span>
      </div>
    </div>
  );
}

// =========================================================
// RESOURCE PDF READER
// =========================================================

function ProtectedResourcePdf({
  url,
  title,
}) {
  const [
    pageCount,
    setPageCount,
  ] = useState(0);

  const [
    pageNumber,
    setPageNumber,
  ] = useState(1);

  const [
    width,
    setWidth,
  ] = useState(760);

  useEffect(() => {
    const updateWidth =
      () => {
        const viewport =
          window.innerWidth ||
          1024;

        setWidth(
          Math.max(
            260,
            Math.min(
              760,
              viewport - 80,
            ),
          ),
        );
      };

    updateWidth();

    window.addEventListener(
      "resize",
      updateWidth,
    );

    return () =>
      window.removeEventListener(
        "resize",
        updateWidth,
      );
  }, []);

  return (
    <div
      className="ns-resource-pdf-reader"
      onContextMenu={(
        event,
      ) =>
        event.preventDefault()
      }
    >
      <Document
        file={
          url
        }
        onLoadSuccess={({
          numPages,
        }) => {
          setPageCount(
            numPages,
          );

          setPageNumber(
            1,
          );
        }}
        loading={
          <div className="ns-pdf-status">
            Loading{" "}
            {title}...
          </div>
        }
        error={
          <div className="ns-pdf-status error">
            Unable to display this PDF resource.
          </div>
        }
      >
        <Page
          pageNumber={
            pageNumber
          }
          width={
            width
          }
          renderAnnotationLayer
          renderTextLayer
        />
      </Document>

      {pageCount >
        1 && (
        <div className="ns-pdf-pagination">
          <button
            type="button"
            disabled={
              pageNumber <=
              1
            }
            onClick={() =>
              setPageNumber(
                (
                  current,
                ) =>
                  Math.max(
                    1,
                    current -
                      1,
                  ),
              )
            }
          >
            <FaChevronLeft />
            Previous
          </button>

          <strong>
            {pageNumber} /{" "}
            {pageCount}
          </strong>

          <button
            type="button"
            disabled={
              pageNumber >=
              pageCount
            }
            onClick={() =>
              setPageNumber(
                (
                  current,
                ) =>
                  Math.min(
                    pageCount,
                    current +
                      1,
                  ),
              )
            }
          >
            Next
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

// =========================================================
// ACADEMIC SECTION
// =========================================================

function AcademicSection({
  icon,
  eyebrow,
  title,
  tone = "",
  children,
}) {
  return (
    <section
      className={`ns-academic-section ${tone}`}
    >
      <div className="ns-academic-header">
        <div className="ns-academic-icon">
          {icon}
        </div>

        <div className="ns-academic-heading">
          <span>
            {eyebrow}
          </span>

          <h2>
            {title}
          </h2>
        </div>
      </div>

      <div className="ns-academic-body">
        {children}
      </div>
    </section>
  );
}

// =========================================================
// TEXT
// =========================================================

function ContentText({
  children,
  large = false,
}) {
  return (
    <div
      className={`ns-content-text ${
        large
          ? "large"
          : ""
      }`}
    >
      {children}
    </div>
  );
}

// =========================================================
// STYLES
// =========================================================

function LearningStyles() {
  return (
    <style>
      {`
        .ns-learning-page {
          width: 100%;
          min-width: 0;
          overflow-x: hidden;
        }

        .ns-learning-error {
          margin-bottom: 18px;
          border: 1px solid #fecaca;
          border-radius: 10px;
          background: #fef2f2;
          color: #b91c1c;
          padding: 12px;
        }

        /* PROGRESS */

        .ns-learning-progress-summary {
          margin-bottom: 24px;
          border: 1px solid #dbeafe;
          border-radius: 14px;
          background: #eff6ff;
          padding: 16px 20px;
        }

        .ns-learning-progress-summary > div:first-child {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          color: #475569;
          font-size: 13px;
          font-weight: 700;
        }

        .ns-learning-progress-summary strong {
          color: #2563eb;
        }

        .ns-learning-progress-track {
          height: 9px;
          margin-top: 10px;
          overflow: hidden;
          border-radius: 999px;
          background: #dbeafe;
        }

        .ns-learning-progress-track div {
          height: 100%;
          border-radius: inherit;
          background: #2563eb;
        }

        .ns-read-only-message {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 11px;
          border-radius: 9px;
          background: #ffffff;
          color: #475569;
          padding: 10px 12px;
          font-size: 11px;
          line-height: 1.55;
        }

        .ns-read-only-message svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: #64748b;
        }

        /* ACADEMIC */

        .ns-academic-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }

        .ns-academic-section {
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
        }

        .ns-academic-section.highlight {
          border-color: #fde68a;
          background: #fffbeb;
        }

        .ns-academic-section.exam {
          border-color: #bfdbfe;
          background: #f8fbff;
        }

        .ns-academic-section.revision {
          border-color: #c7d2fe;
          background: #fafaff;
        }

        .ns-academic-header {
          display: flex;
          align-items: center;
          gap: 13px;
          border-bottom: 1px solid #e2e8f0;
          padding: 17px 20px;
        }

        .ns-academic-icon {
          display: flex;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 18px;
        }

        .ns-academic-heading span {
          display: block;
          margin-bottom: 2px;
          color: #2563eb;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .09em;
          text-transform: uppercase;
        }

        .ns-academic-heading h2 {
          margin: 0;
          color: #0f172a;
          font-size: 17px;
        }

        .ns-academic-body {
          padding: 20px;
        }

        .ns-content-text {
          color: #334155;
          font-size: 14px;
          line-height: 1.85;
          white-space: pre-line;
        }

        .ns-content-text.large {
          line-height: 1.95;
        }

        .ns-objective-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .ns-objective-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          border: 1px solid #dbeafe;
          border-radius: 11px;
          background: #f8fbff;
          padding: 12px;
        }

        .ns-objective-item > span {
          display: flex;
          width: 23px;
          height: 23px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #2563eb;
          color: #ffffff;
          font-size: 9px;
        }

        .ns-objective-item p {
          margin: 1px 0 0;
          color: #334155;
          font-size: 13px;
          line-height: 1.55;
        }

        .ns-key-points {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .ns-key-point {
          display: flex;
          align-items: flex-start;
          gap: 11px;
        }

        .ns-key-point > span {
          display: flex;
          width: 25px;
          height: 25px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          background: #f59e0b;
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
        }

        .ns-key-point p {
          margin: 2px 0 0;
          color: #334155;
          font-size: 13px;
          line-height: 1.6;
        }

        .ns-provision-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ns-provision-card {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #f8fafc;
          padding: 14px;
        }

        .ns-provision-number {
          display: flex;
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: #0f172a;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
        }

        .ns-provision-card h3 {
          margin: 0 0 6px;
          color: #0f172a;
          font-size: 14px;
        }

        .ns-provision-badge {
          display: inline-flex;
          margin-bottom: 7px;
          border-radius: 999px;
          background: #dbeafe;
          color: #1d4ed8;
          padding: 4px 9px;
          font-size: 10px;
          font-weight: 800;
        }

        .ns-provision-card p {
          margin: 0;
          color: #475569;
          font-size: 12px;
          line-height: 1.7;
        }

        .ns-case-list {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .ns-case-card {
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #f8fafc;
          padding: 16px;
        }

        .ns-case-index {
          margin-bottom: 8px;
          color: #64748b;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .ns-case-card h3 {
          margin: 0;
          color: #0f172a;
          font-size: 15px;
        }

        .ns-case-citation {
          margin-top: 5px;
          color: #2563eb;
          font-size: 11px;
          font-weight: 700;
        }

        .ns-case-principle,
        .ns-case-summary {
          margin-top: 12px;
        }

        .ns-case-principle strong,
        .ns-case-summary strong {
          display: block;
          margin-bottom: 4px;
          color: #334155;
          font-size: 10px;
          text-transform: uppercase;
        }

        .ns-case-principle p,
        .ns-case-summary p {
          margin: 0;
          color: #475569;
          font-size: 12px;
          line-height: 1.65;
        }

        /* STUDY MATERIAL */

        .ns-study-material-heading {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 35px 0 16px;
        }

        .ns-study-material-icon {
          display: flex;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background: #dbeafe;
          color: #2563eb;
          font-size: 20px;
        }

        .ns-study-material-heading span {
          color: #2563eb;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .ns-study-material-heading h2 {
          margin: 2px 0;
          color: #0f172a;
          font-size: 20px;
        }

        .ns-study-material-heading p {
          margin: 0;
          color: #64748b;
          font-size: 12px;
        }

        /* PDF */

        .ns-chapter-pdf-section {
          margin-bottom: 22px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
        }

        .ns-chapter-pdf-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 17px 20px;
          border-bottom: 1px solid #e2e8f0;
        }

        .ns-chapter-pdf-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ns-chapter-pdf-icon {
          display: flex;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #fee2e2;
          color: #dc2626;
          font-size: 21px;
        }

        .ns-chapter-pdf-title h2 {
          margin: 0;
          color: #0f172a;
          font-size: 16px;
        }

        .ns-chapter-pdf-title p {
          margin: 3px 0 0;
          color: #64748b;
          font-size: 12px;
        }

        .ns-chapter-pdf-file {
          display: flex;
          max-width: 45%;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
        }

        .ns-chapter-pdf-file strong {
          overflow: hidden;
          max-width: 100%;
          color: #334155;
          font-size: 11px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ns-chapter-pdf-file span {
          color: #94a3b8;
          font-size: 10px;
        }

        /* CUSTOM PDF READER */

        .ns-pdf-reader {
          width: 100%;
          overflow: hidden;
          background: #e2e8f0;
          user-select: none;
          -webkit-user-select: none;
        }

        .ns-pdf-reader-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: #1e293b;
          color: #ffffff;
          padding: 10px 14px;
          font-size: 11px;
        }

        .ns-pdf-reader-toolbar > div {
          display: flex;
          align-items: center;
          gap: 7px;
          font-weight: 800;
        }

        .ns-pdf-reader-toolbar strong {
          font-size: 10px;
        }

        .ns-pdf-document {
          display: flex;
          justify-content: center;
          overflow: auto;
          padding: 18px;
        }

        .ns-pdf-document .react-pdf__Page,
        .ns-resource-pdf-reader .react-pdf__Page {
          box-shadow:
            0 5px 20px
            rgba(15, 23, 42, .18);
        }

        .ns-pdf-document canvas,
        .ns-resource-pdf-reader canvas {
          display: block;
          max-width: 100%;
          height: auto !important;
        }

        .ns-pdf-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          border-top: 1px solid #cbd5e1;
          background: #f8fafc;
          padding: 11px;
        }

        .ns-pdf-pagination button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #1e293b;
          cursor: pointer;
          padding: 8px 13px;
          font-size: 11px;
          font-weight: 700;
        }

        .ns-pdf-pagination button:disabled {
          cursor: not-allowed;
          opacity: .4;
        }

        .ns-pdf-pagination strong {
          color: #475569;
          font-size: 11px;
        }

        .ns-pdf-reader-notice {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border-top: 1px solid #fed7aa;
          background: #fff7ed;
          color: #9a3412;
          padding: 9px 12px;
          font-size: 10px;
          text-align: center;
        }

        .ns-pdf-status {
          padding: 55px 20px;
          color: #475569;
          text-align: center;
          font-size: 12px;
        }

        .ns-pdf-status.error {
          color: #b91c1c;
        }

        .ns-pdf-access {
          padding: 13px 18px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .ns-pdf-locked {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #64748b;
        }

        .ns-pdf-locked div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ns-pdf-locked strong {
          color: #334155;
          font-size: 11px;
        }

        .ns-pdf-locked span {
          font-size: 10px;
          line-height: 1.5;
        }

        .ns-pdf-download {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border-radius: 9px;
          background: #2563eb;
          color: #ffffff;
          padding: 9px 13px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }

        /* RESOURCES */

        .ns-learning-resource-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .ns-video-wrapper {
          position: relative;
          overflow: hidden;
          padding-top: 56.25%;
          border-radius: 14px;
          background: #020617;
        }

        .ns-video-wrapper iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .ns-resource-text {
          display: flex;
          gap: 14px;
          color: #334155;
          line-height: 1.8;
          white-space: pre-line;
        }

        .ns-resource-text > svg {
          flex-shrink: 0;
          margin-top: 5px;
          color: #2563eb;
        }

        .ns-learning-link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border-radius: 10px;
          background: #eff6ff;
          color: #2563eb;
          padding: 11px 15px;
          font-weight: 700;
          text-decoration: none;
        }

        .ns-mark-resource-complete {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          border: none;
          border-radius: 10px;
          background: #2563eb;
          color: #ffffff;
          cursor: pointer;
          padding: 10px 14px;
          font-weight: 700;
        }

        .ns-mark-resource-complete:disabled {
          cursor: not-allowed;
          opacity: .65;
        }

        .ns-resource-completed {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          padding: 6px 9px;
          font-size: 11px;
          font-weight: 800;
        }

        .ns-resource-pdf {
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .ns-resource-pdf-label {
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          padding: 10px 12px;
          font-size: 11px;
          font-weight: 700;
        }

        .ns-resource-pdf-label svg:first-child {
          color: #dc2626;
        }

        .ns-resource-pdf-label svg:last-child {
          margin-left: auto;
          color: #64748b;
        }

        .ns-resource-pdf-reader {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          overflow: auto;
          background: #e2e8f0;
          padding-top: 14px;
          user-select: none;
          -webkit-user-select: none;
        }

        .ns-resource-pdf-reader .ns-pdf-pagination {
          box-sizing: border-box;
          width: 100%;
          margin-top: 14px;
        }

        .ns-protected-download {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
          color: #64748b;
          padding: 11px 13px;
        }

        .ns-protected-download div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ns-protected-download strong {
          color: #334155;
          font-size: 11px;
        }

        .ns-protected-download span {
          font-size: 10px;
          line-height: 1.45;
        }

        @media (max-width: 768px) {
          .ns-objective-grid,
          .ns-case-list {
            grid-template-columns: 1fr;
          }

          .ns-academic-header {
            padding: 14px;
          }

          .ns-academic-body {
            padding: 15px;
          }

          .ns-chapter-pdf-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .ns-chapter-pdf-file {
            max-width: 100%;
            align-items: flex-start;
          }

          .ns-pdf-document {
            padding: 8px;
          }

          .ns-pdf-reader-toolbar {
            padding: 9px 10px;
          }

          .ns-pdf-pagination {
            gap: 7px;
          }

          .ns-pdf-pagination button {
            padding: 8px 9px;
          }

          .ns-pdf-reader-notice {
            align-items: flex-start;
          }

          .ns-learning-link,
          .ns-mark-resource-complete {
            box-sizing: border-box;
            width: 100%;
            justify-content: center;
          }
        }
      `}
    </style>
  );
}
