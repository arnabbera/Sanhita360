import { createCourseModel } from "../models/CourseModel";
import courseRepository from "../repositories/CourseRepository";
import { seededCourses } from "../database/seedCourses";
import { generalPrinciplesOfContractCourse } from "../data/courses/generalPrinciplesOfContract";
import { criminalLawICourse, criminalLawIChapters } from "../data/courses/criminalLawI";
import { criminalLawIOverview } from "../data/courses/criminalLawI/overview";
import { lawOfTortsCurriculum } from "../data/courses/lawOfTortsOverview";
import { bnssCourse, bnssChapters } from "../data/courses/bnss";
import { publicInternationalLawCourse } from "../data/courses/publicInternationalLaw";
import { environmentalLawCourse } from "../data/courses/environmentalLaw";
import { humanRightsLawAndPracticeCourse } from "../data/courses/humanRightsLawAndPractice";
import { mediaLawCourse } from "../data/courses/mediaLaw";

const bundledCourses = [
  generalPrinciplesOfContractCourse,
  criminalLawICourse,
  publicInternationalLawCourse,
  environmentalLawCourse,
  humanRightsLawAndPracticeCourse,
  mediaLawCourse,
  bnssCourse,
  ...seededCourses.filter((course) => ["law-of-torts", "constitutional-law"].includes(course.slug)),
];

// Published LL.B. course counts may outgrow older Firestore course records.
// Firestore's legacy course documents can still contain `0` because chapters
// were added after the course record was created. Keep the public catalogue,
// course details and enrollment cards aligned with the published curriculum.
const publishedChapterTotals = {
  "general-principles-of-contract": 8,
  "code-of-civil-procedure-and-limitation": 8,
  "family-law-i": 8,
  "indian-constitutional-law-i": 8,
  "law-of-torts-mv-and-cp-laws": 8,
  "criminal-law-i": criminalLawIChapters.length,
  "criminal-law-i-transitioning-from-ipc-to-bns": criminalLawIChapters.length,
  "public-international-law": 8,
  "environmental-law": 8,
  "human-rights-law-and-practice": 8,
  "media-law": 8,
  [bnssCourse.slug]: bnssChapters.length,
};

const withPublishedChapterTotal = (course) => {
  if (!course) return course;

  const courseKey = course.slug || course.id;
  const publishedTotal = publishedChapterTotals[courseKey];
  const courseSeoOverrides = {
    "law-of-torts": {
      title: "Law of Torts Notes & Cases | LL.B Course",
      description: "Study Law of Torts for LL.B with notes on negligence, nuisance, defamation, strict and absolute liability, damages, consumer law and motor accident claims.",
      focusKeyword: "law of torts notes for LLB",
      secondaryKeywords: ["law of torts cases", "Indian law of torts study material", "negligence and nuisance notes", "strict and absolute liability", "vicarious liability in tort", "law of torts questions and answers", "consumer protection and motor accident claims", "LLB law of torts course"],
    },
    "constitutional-law": {
      title: "Indian Constitutional Law Notes & Cases | LL.B Course",
      description: "Prepare for LL.B Constitutional Law with clear notes on fundamental rights, Article 14, Article 19, Article 21, DPSP, writs, federalism and landmark constitutional cases.",
      focusKeyword: "Indian constitutional law notes for LLB",
      secondaryKeywords: ["Indian Constitution notes for LL.B", "fundamental rights Articles 12 to 35", "Article 14 19 and 21 notes", "Directive Principles of State Policy notes", "constitutional writs and remedies", "landmark Supreme Court constitutional cases", "Indian federalism and separation of powers"],
    },
  };
  const selectedCourseSeo = courseSeoOverrides[courseKey];
  const courseSeoOverride = selectedCourseSeo
    ? { seo: { ...course.seo, ...selectedCourseSeo, canonicalUrl: `/courses/${courseKey}`, robots: { index: true, follow: true } } }
    : {};

  if (!publishedTotal) return { ...course, ...courseSeoOverride };

  return {
    ...course,
    ...courseSeoOverride,
    ...(courseKey === "law-of-torts-mv-and-cp-laws"
      ? { curriculum: lawOfTortsCurriculum }
      : {}),
    ...(["criminal-law-i", "criminal-law-i-transitioning-from-ipc-to-bns"].includes(courseKey)
      ? {
          shortDescription: criminalLawIOverview.shortDescription,
          description: criminalLawIOverview.description,
          learningOutcomes: criminalLawIOverview.learningOutcomes,
          studyApproach: criminalLawIOverview.studyApproach,
          curriculum: criminalLawIChapters.map(({ id, title }) => ({ id, title })),
          seo: {
            ...course.seo,
            title: "IPC to BNS Notes & Criminal Law Course",
            description: criminalLawIOverview.seoDescription,
            ogTitle: "IPC to BNS Notes & Criminal Law Course",
            ogDescription: criminalLawIOverview.seoDescription,
          },
        }
      : {}),
    totals: {
      ...(course.totals || {}),
      chapters: publishedTotal,
    },
  };
};

const mergeCourses = (courses = []) => {
  const courseMap = new Map(
    bundledCourses.map((course) => [course.id, course]),
  );

  for (const course of courses || []) {
    if (course?.id) courseMap.set(course.id, course);
  }

  return [...courseMap.values()].map(withPublishedChapterTotal).sort(
    (first, second) =>
      Number(first.order || 0) - Number(second.order || 0) ||
      String(first.title || "").localeCompare(String(second.title || "")),
  );
};

const normalizeSlug = (value = "") =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const courseSlugAliases = {
  "criminal-law-i": "criminal-law-i-transitioning-from-ipc-to-bns",
};

export const getPublishedCourses = async (options = {}) => {
  const storedCourses = await courseRepository.getPublishedCourses(options);
  const pageSize = Math.max(1, Number(options.pageSize || 20));

  return mergeCourses(storedCourses)
    .filter((course) => course.status === "published" && course.deleted !== true)
    .filter((course) =>
      options.featured === null || options.featured === undefined
        ? true
        : Boolean(course.featured) === Boolean(options.featured),
    )
    .filter((course) =>
      options.courseType ? course.courseType === options.courseType : true,
    )
    .filter((course) =>
      options.accessType ? course.accessType === options.accessType : true,
    )
    .slice(0, pageSize);
};

export const getFeaturedCourses = async (pageSize = 6) =>
  getPublishedCourses({ featured: true, pageSize });

export const getCourseById = async (courseId) => {
  if (!courseId) {
    throw new Error("Course ID is required.");
  }

  const storedCourse = await courseRepository.getById(courseId);

  return withPublishedChapterTotal(
    storedCourse || bundledCourses.find((course) => course.id === courseId) || null,
  );
};

export const getCourseBySlug = async (slug) => {
  if (!slug) {
    return null;
  }

  const normalizedSlug = normalizeSlug(slug);
  const resolvedSlug = courseSlugAliases[normalizedSlug] || normalizedSlug;
  const storedCourse = await courseRepository.getBySlug(resolvedSlug);
  let course =
    storedCourse || bundledCourses.find((item) => item.slug === resolvedSlug) || null;

  // Reuse the established thumbnails on related standalone course pages.
  const thumbnailSourceByCourse = {
    "law-of-torts": "law-of-torts-mv-and-cp-laws",
    "constitutional-law": "indian-constitutional-law-i",
  };
  const thumbnailSourceSlug = thumbnailSourceByCourse[resolvedSlug];

  if (course && thumbnailSourceSlug) {
    const referenceCourse = await courseRepository.getBySlug(thumbnailSourceSlug);
    if (referenceCourse) {
      const referenceImage =
        referenceCourse.thumbnailUrl ||
        referenceCourse.desktopImageUrl ||
        referenceCourse.imageUrl ||
        referenceCourse.media?.thumbnailUrl ||
        referenceCourse.media?.desktopImageUrl ||
        referenceCourse.media?.imageUrl ||
        "";
      if (referenceImage) {
        course = {
          ...course,
          thumbnailUrl: referenceCourse.thumbnailUrl || referenceImage,
          desktopImageUrl: referenceCourse.desktopImageUrl || referenceImage,
          imageUrl: referenceCourse.imageUrl || referenceImage,
          media: { ...(course.media || {}), ...(referenceCourse.media || {}) },
          seo: {
            ...(course.seo || {}),
            ogImageUrl: referenceCourse.seo?.ogImageUrl || referenceImage,
          },
        };
      }
    }
  }

  return withPublishedChapterTotal(course);
};

export const getAllCourses = async () =>
  mergeCourses(await courseRepository.getAll());

export const createCourse = async (
  courseData,
  createdBy = "system",
) => {
  if (!courseData?.title?.trim()) {
    throw new Error("Course title is required.");
  }

  const slug = normalizeSlug(
    courseData.slug || courseData.title,
  );

  if (!slug) {
    throw new Error("A valid course slug is required.");
  }

  const existingCourse =
    await courseRepository.getBySlug(slug);

  if (existingCourse) {
    throw new Error(
      "A course with this slug already exists.",
    );
  }

  const documentId =
    courseData.id || slug;

  const courseModel = createCourseModel({
    ...courseData,
    id: documentId,
    slug,
    createdBy,
    updatedBy: createdBy,
  });

  return courseRepository.create(
    documentId,
    courseModel,
  );
};

export const updateCourse = async (
  courseId,
  courseData,
  updatedBy = "system",
) => {
  if (!courseId) {
    throw new Error("Course ID is required.");
  }

  const storedCourse =
    await courseRepository.getById(courseId);

  const existingCourse =
    storedCourse ||
    bundledCourses.find(
      (course) => course.id === courseId,
    );

  if (!existingCourse) {
    throw new Error("Course not found.");
  }

  const slug = normalizeSlug(
    courseData.slug ||
      courseData.title ||
      existingCourse.slug,
  );

  const courseWithSameSlug =
    await courseRepository.getBySlug(slug);

  if (
    courseWithSameSlug &&
    courseWithSameSlug.id !== courseId
  ) {
    throw new Error(
      "Another course already uses this slug.",
    );
  }

  if (!storedCourse) {
    const persistedDraft = createCourseModel({
      ...courseData,
      id: courseId,
      slug,
      totalSemesters:
        courseData.totalSemesters ??
        existingCourse.totals?.semesters ??
        0,
      totalSubjects:
        courseData.totalSubjects ??
        existingCourse.totals?.subjects ??
        0,
      totalChapters:
        courseData.totalChapters ??
        existingCourse.totals?.chapters ??
        0,
      status: "draft",
      createdBy:
        existingCourse.createdBy || updatedBy,
      updatedBy,
      version:
        Number(existingCourse.version || 1) + 1,
    });

    return courseRepository.create(
      courseId,
      persistedDraft,
    );
  }

  return courseRepository.update(courseId, {
    ...courseData,
    slug,
    updatedBy,
    version:
      Number(existingCourse.version || 1) + 1,
  });
};

export const publishCourse = async (courseId) => {
  const storedCourse =
    await courseRepository.getById(courseId);

  if (!storedCourse) {
    const bundledCourse = bundledCourses.find(
      (course) => course.id === courseId,
    );

    if (bundledCourse) {
      throw new Error(
        "Edit and save this draft course before final approval.",
      );
    }

    throw new Error("Course not found.");
  }

  return courseRepository.publish(courseId);
};

export const archiveCourse = async (courseId) =>
  courseRepository.archive(courseId);

export const setCourseFeatured = async (
  courseId,
  featured,
) =>
  courseRepository.setFeatured(
    courseId,
    Boolean(featured),
  );

export const deleteCourse = async (
  courseId,
  deletedBy = "system",
) =>
  courseRepository.softDelete(
    courseId,
    deletedBy,
  );

export const restoreCourse = async (
  courseId,
  updatedBy = "system",
) =>
  courseRepository.restore(
    courseId,
    updatedBy,
  );

export default {
  getPublishedCourses,
  getFeaturedCourses,
  getCourseById,
  getCourseBySlug,
  getAllCourses,
  createCourse,
  updateCourse,
  publishCourse,
  archiveCourse,
  setCourseFeatured,
  deleteCourse,
  restoreCourse,
};
