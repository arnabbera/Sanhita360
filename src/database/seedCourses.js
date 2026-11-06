import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const courses = [
  {
    id: "three-year-llb",
    title: "Three-Year LL.B Programme",
    slug: "three-year-llb",
    description:
      "Structured learning content covering the complete three-year LL.B syllabus, including notes, videos, quizzes and certification options.",
    duration: "3 Years",
    courseType: "degree-support",
    accessType: "free-learning",
    certificationAvailable: true,
    certificationFee: 0,
    featured: true,
    status: "published",
    order: 1,
    seo: {
      title: "Three-Year LL.B Learning Programme | Sanhita360",
      description:
        "Access structured LL.B notes, subject-wise lessons, quizzes and certification support through Sanhita360.",
      focusKeyword: "three year LLB course",
      secondaryKeywords: [
        "LLB notes",
        "LLB study material",
        "law course online",
        "LLB learning platform",
      ],
      schemaType: "Course",
      robots: {
        index: true,
        follow: true,
      },
    },
  },
  {
    id: "five-year-llb",
    title: "Five-Year Integrated LL.B Programme",
    slug: "five-year-llb",
    description:
      "Structured learning support for integrated five-year LL.B programmes with subject-wise notes, videos, quizzes and resources.",
    duration: "5 Years",
    courseType: "degree-support",
    accessType: "free-learning",
    certificationAvailable: true,
    certificationFee: 0,
    featured: true,
    status: "published",
    order: 2,
    seo: {
      title: "Five-Year Integrated LL.B Learning | Sanhita360",
      description:
        "Study integrated LL.B subjects with structured notes, videos, quizzes and certification support.",
      focusKeyword: "five year LLB course",
      secondaryKeywords: [
        "integrated LLB course",
        "BA LLB notes",
        "BBA LLB notes",
        "LLB learning",
      ],
      schemaType: "Course",
      robots: {
        index: true,
        follow: true,
      },
    },
  },
  {
    id: "constitutional-law",
    title: "Constitutional Law",
    slug: "constitutional-law",
    description:
      "Learn constitutional principles, fundamental rights, directive principles, constitutional remedies and landmark judgments.",
    duration: "Self-paced",
    courseType: "subject-course",
    accessType: "free-learning",
    certificationAvailable: true,
    certificationFee: 0,
    featured: true,
    status: "published",
    order: 3,
    seo: {
      title: "Constitutional Law Course and Notes | Sanhita360",
      description:
        "Study Constitutional Law with notes, videos, quizzes, important cases and certification.",
      focusKeyword: "constitutional law notes",
      secondaryKeywords: [
        "Indian Constitution course",
        "Article 21 notes",
        "fundamental rights notes",
        "constitutional law quiz",
      ],
      schemaType: "Course",
      robots: {
        index: true,
        follow: true,
      },
    },
  },
  {
    id: "law-of-torts",
    title: "Law of Torts",
    slug: "law-of-torts",
    description:
      "Build a clear understanding of Indian tort law through structured LL.B study material on negligence, nuisance, defamation, trespass, vicarious liability, strict and absolute liability, remedies and damages. The course also introduces consumer protection and motor accident compensation, with topic-wise explanations and legal examples.",
    duration: "Self-paced",
    courseType: "subject-course",
    accessType: "free-learning",
    certificationAvailable: true,
    certificationFee: 0,
    featured: true,
    status: "published",
    order: 4,
    seo: {
      title: "Law of Torts Notes & Cases | LL.B Course",
      description:
        "Study Law of Torts for LL.B with notes on negligence, nuisance, defamation, strict and absolute liability, damages, consumer law and motor accident claims.",
      focusKeyword: "law of torts notes for LLB",
      secondaryKeywords: [
        "law of torts cases",
        "Indian law of torts study material",
        "negligence and nuisance notes",
        "strict and absolute liability",
        "vicarious liability in tort",
        "law of torts questions and answers",
        "consumer protection and motor accident claims",
        "LLB law of torts course",
      ],
      schemaType: "Course",
      robots: {
        index: true,
        follow: true,
      },
    },
  },
  {
    id: "family-law",
    title: "Family Law",
    slug: "family-law",
    description:
      "Learn marriage, divorce, maintenance, adoption, guardianship and succession under major personal laws.",
    duration: "Self-paced",
    courseType: "subject-course",
    accessType: "free-learning",
    certificationAvailable: true,
    certificationFee: 0,
    featured: false,
    status: "published",
    order: 5,
    seo: {
      title: "Family Law Notes and Course | Sanhita360",
      description:
        "Study Family Law with structured notes, cases, quizzes and certification support.",
      focusKeyword: "family law notes",
      secondaryKeywords: [
        "Hindu law notes",
        "Muslim law notes",
        "divorce law notes",
        "family law MCQ",
      ],
      schemaType: "Course",
      robots: {
        index: true,
        follow: true,
      },
    },
  },
  {
    id: "consumer-protection-law",
    title: "Consumer Protection Law",
    slug: "consumer-protection-law",
    description:
      "Learn the Consumer Protection Act, consumer rights, complaint procedure, unfair trade practices and compensation.",
    duration: "Self-paced",
    courseType: "subject-course",
    accessType: "free-learning",
    certificationAvailable: true,
    certificationFee: 0,
    featured: false,
    status: "published",
    order: 6,
    seo: {
      title: "Consumer Protection Law Course | Sanhita360",
      description:
        "Learn consumer rights, complaint procedure and Consumer Protection Act provisions.",
      focusKeyword: "consumer protection law course",
      secondaryKeywords: [
        "consumer law notes",
        "consumer complaint procedure",
        "consumer rights India",
        "consumer law MCQ",
      ],
      schemaType: "Course",
      robots: {
        index: true,
        follow: true,
      },
    },
  },
];

export async function seedCourses() {
  const results = {
    created: 0,
    skipped: 0,
    failed: 0,
  };

  for (const course of courses) {
    try {
      const courseRef = doc(db, "courses", course.id);
      const courseSnapshot = await getDoc(courseRef);

      if (courseSnapshot.exists()) {
        results.skipped += 1;
        continue;
      }

      await setDoc(courseRef, {
        title: course.title,
        slug: course.slug,
        description: course.description,
        duration: course.duration,
        courseType: course.courseType,
        accessType: course.accessType,
        certificationAvailable:
          course.certificationAvailable,
        certificationFee: course.certificationFee,
        featured: course.featured,
        status: course.status,
        order: course.order,
        imageUrl: "",
        thumbnailUrl: "",
        desktopImageUrl: "",
        mobileImageUrl: "",
        seo: course.seo,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      results.created += 1;
    } catch (error) {
      console.error(
        `Failed to seed course: ${course.id}`,
        error,
      );

      results.failed += 1;
    }
  }

  return {
    status: results.failed > 0 ? "partial" : "success",
    message: `Courses completed. Created: ${results.created}, Skipped: ${results.skipped}, Failed: ${results.failed}.`,
    ...results,
  };
}