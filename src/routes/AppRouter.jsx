import LitigationPage from "../features/public/services/pages/LitigationPage";
import QAPage from "../features/public/qa/QAPage";
import PropertyTitleVerificationPage from "../features/public/legal/pages/PropertyTitleVerificationPage";
import WestBengalTenantEvictionPage from "../features/public/legal/pages/WestBengalTenantEvictionPage";
import Section175BnssPage from "../features/public/legal/pages/Section175BnssPage";
import TortsFreeChapter from "../features/student/learning/pages/TortsFreeChapter";
import { CriminalLawFreeLesson } from "../features/public/courses/components/CriminalLawEnrollment";
import { useEffect } from "react";

import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

// =========================================================
// ADMIN
// =========================================================

import Courses from "../features/admin/pages/Courses";
import Dashboard from "../features/admin/pages/Dashboard";
import HomepageCms from "../features/admin/pages/HomepageCms";

import ChapterManagement from "../features/admin/chapters/pages/ChapterManagement";

import ResourceManagement from "../features/admin/resources/pages/ResourceManagement";

import CourseBookManagement from "../features/admin/books/pages/CourseBookManagement";

import ExamManagement from "../features/admin/exams/pages/ExamManagement";

import PostManagement from "../features/admin/posts/pages/PostManagement";

// =========================================================
// LAW NOTES - ADMIN
// =========================================================

import LawNoteManagement from "../features/admin/law-notes/pages/LawNoteManagement";

// =========================================================
// AUTH
// =========================================================

import LoginPage from "../features/auth/pages/LoginPage";

// =========================================================
// PUBLIC SEO PAGES
// =========================================================

import AboutPage from "../features/public/about/pages/AboutPage";
import FounderPage from "../features/public/about/pages/FounderPage";
import RecognitionPage from "../features/public/about/pages/RecognitionPage";

import PublicCoursesPage from "../features/public/courses/pages/PublicCoursesPage";

import PublicCourseDetailsPage from "../features/public/courses/pages/PublicCourseDetailsPage";
import GuestCheckoutPage from "../features/public/courses/pages/GuestCheckoutPage";
import ClaimPurchasePage from "../features/public/courses/pages/ClaimPurchasePage";
import LiveOnlineClassesPage from "../features/public/courses/pages/LiveOnlineClassesPage";

import PropertyRegistrationPage from "../features/public/services/pages/PropertyRegistrationPage";
import LegalServiceDetailsPage from "../features/public/services/pages/LegalServiceDetailsPage";

import DisclaimerPage from "../features/public/legal/pages/DisclaimerPage";
import PrivacyPolicyPage from "../features/public/legal/pages/PrivacyPolicyPage";
import TermsPage from "../features/public/legal/pages/TermsPage";
import ConsumerRightsJudgmentsPage from "../features/public/legal/pages/ConsumerRightsJudgmentsPage";
import UnrecoveredOnlineFraudFundsPage from "../features/public/legal/pages/UnrecoveredOnlineFraudFundsPage";
import MortgagedPropertyFraudPage from "../features/public/legal/pages/MortgagedPropertyFraudPage";
import TechStartupCompliancePage from "../features/public/legal/pages/TechStartupCompliancePage";
import Section200CrpcSection223BnssPage from "../features/public/legal/pages/Section200CrpcSection223BnssPage";
import PoliceRefuseFIRPage from "../features/public/legal/pages/PoliceRefuseFIRPage";

// =========================================================
// PUBLIC LAW NOTES
// =========================================================

import LawNotesIndexPage from "../features/public/lawNotes/pages/LawNotesIndexPage";

import LawNoteDetailsPage from "../features/public/lawNotes/pages/LawNoteDetailsPage";

// =========================================================
// PUBLIC POSTS
// =========================================================

import PostsPage from "../features/public/posts/pages/PostsPage";

import PostDetailsPage from "../features/public/posts/pages/PostDetailsPage";

// =========================================================
// STUDENT
// =========================================================

import StudentDashboard from "../features/student/pages/StudentDashboard";

import MyCourses from "../features/student/courses/pages/MyCourses";

import CourseDetails from "../features/student/courses/pages/CourseDetails";

import ChapterLearning from "../features/student/learning/pages/ChapterLearning";

import MockTestPage from "../features/student/exams/pages/MockTestPage";

import FinalExamPage from "../features/student/exams/pages/FinalExamPage";
import CourseAssessmentPage from "../features/student/exams/pages/CourseAssessmentPage";

import StudentCertificatesPage from "../features/student/certificates/pages/StudentCertificatesPage";
import StudentProfilePage from "../features/student/profile/pages/StudentProfilePage";

// =========================================================
// LAYOUTS
// =========================================================

import AdminLayout from "../shared/layouts/AdminLayout";
import PublicLayout from "../shared/layouts/PublicLayout";
import StudentLayout from "../shared/layouts/StudentLayout";

// =========================================================
// ROUTER
// =========================================================

export default function AppRouter() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        document
          .getElementById(hash === "#legal-updates" ? "legal-remedies" : hash.slice(1))
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });

      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return undefined;
  }, [pathname, hash]);

  return (
    <Routes>
      {/* =====================================================
          PUBLIC HOMEPAGE
      ====================================================== */}

      <Route
        path="/"
        element={<PublicLayout />}
      />

      {/* =====================================================
          ABOUT
      ====================================================== */}

      <Route
        path="/about"
        element={<AboutPage />}
      />

      <Route path="/qa" element={<QAPage />} />
      <Route path="/qa/:slug" element={<QAPage />} />
      <Route path="/about/founder" element={<FounderPage />} />

      <Route path="/recognition" element={<RecognitionPage />} />

      {/* =====================================================
          PUBLIC LEGAL INFORMATION
      ====================================================== */}

      <Route
        path="/disclaimer"
        element={<DisclaimerPage />}
      />

      <Route
        path="/privacy-policy"
        element={<PrivacyPolicyPage />}
      />

      <Route
        path="/terms"
        element={<TermsPage />}
      />

      <Route
        path="/legal-remedies/important-judgement-on-consumer-rights"
        element={<ConsumerRightsJudgmentsPage />}
      />

      <Route
        path="/legal-remedies/next-steps-unrecovered-online-fraud-funds"
        element={<UnrecoveredOnlineFraudFundsPage />}
      />

      <Route
        path="/legal-remedies/bought-mortgaged-property-by-fraud"
        element={<MortgagedPropertyFraudPage />}
      />

      <Route
        path="/legal-remedies/tech-startup-regulatory-compliance-2026"
        element={<TechStartupCompliancePage />}
      />

      <Route
        path="/legal-remedies/section-200-crpc-section-223-bnss-private-complaint"
        element={<Section200CrpcSection223BnssPage />}
      />

      <Route
        path="/legal-remedies/remedies-when-police-refuse-to-register-fir"
        element={<PoliceRefuseFIRPage />}
      />

      <Route path="/legal-remedies/verify-property-title-avoid-fraud-before-buying-home" element={<PropertyTitleVerificationPage />} />
      <Route path="/legal-remedies/west-bengal-tenant-eviction-section-6" element={<WestBengalTenantEvictionPage />} />
      <Route path="/legal-remedies/section-156-3-crpc-section-175-3-bnss" element={<Section175BnssPage />} />

      {/* =====================================================
          PUBLIC SEO COURSE PAGES
      ====================================================== */}

      <Route path="/llb-courses" element={<Navigate to="/law-courses" replace />} />

      <Route
        path="/law-courses"
        element={
          <PublicCoursesPage />
        }
      />

      <Route
        path="/courses/:courseSlug"
        element={
          <PublicCourseDetailsPage />
        }
      />

      <Route path="/checkout/:courseSlug" element={<GuestCheckoutPage />} />
      <Route path="/claim-purchase" element={<ClaimPurchasePage />} />

      <Route
        path="/live-online-classes"
        element={<LiveOnlineClassesPage />}
      />

      <Route
        path="/share/live-online-classes-card-v3"
        element={<LiveOnlineClassesPage />}
      />

      <Route
        path="/share/certificate-courses-card-v3"
        element={<PublicCoursesPage />}
      />

      {/* =====================================================
          PUBLIC LEGAL SERVICES
      ====================================================== */}

      <Route path="/services/litigation" element={<LitigationPage />} />
      <Route path="/services/property-registration" element={<PropertyRegistrationPage />} />
      <Route
        path="/services/:serviceSlug"
        element={
          <LegalServiceDetailsPage />
        }
      />

      {/* =====================================================
          PUBLIC LAW NOTES
      ====================================================== */}

      <Route
        path="/law-notes"
        element={
          <LawNotesIndexPage />
        }
      />

      <Route
        path="/law-notes/:noteSlug"
        element={
          <LawNoteDetailsPage />
        }
      />

      {/* =====================================================
          PUBLIC POSTS
      ====================================================== */}

      <Route
        path="/indian-independence"
        element={<PostsPage independenceOnly />}
      />

      <Route
        path="/posts"
        element={
          <PostsPage />
        }
      />

      <Route
        path="/articles"
        element={
          <PostsPage />
        }
      />

      <Route
        path="/posts/:postSlug"
        element={
          <PostDetailsPage />
        }
      />

      {/* =====================================================
          LOGIN
      ====================================================== */}

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/signup"
        element={<LoginPage />}
      />

      {/* =====================================================
          STUDENT PORTAL
      ====================================================== */}

      <Route
        path="/student"
        element={<StudentLayout />}
      >
        <Route
          index
          element={<StudentDashboard />}
        />

        <Route
          path="courses"
          element={<Navigate to="/student/available-courses" replace />}
        />

        <Route path="free-preview/family-law-i" element={<TortsFreeChapter courseSlug="family-law-i" />} />
        <Route path="free-preview/media-law" element={<TortsFreeChapter courseSlug="media-law" />} />
        <Route path="free-preview/human-rights-law-and-practice" element={<TortsFreeChapter courseSlug="human-rights-law-and-practice" />} />
        <Route path="free-preview/indian-constitutional-law-i" element={<TortsFreeChapter courseSlug="indian-constitutional-law-i" />} />
        <Route path="free-preview/environmental-law" element={<TortsFreeChapter courseSlug="environmental-law" />} />
        <Route path="free-preview/general-principles-of-contract-and-specific-relief" element={<TortsFreeChapter courseSlug="general-principles-of-contract-and-specific-relief" />} />
        <Route path="free-preview/public-international-law" element={<TortsFreeChapter courseSlug="public-international-law" />} />
        <Route path="free-preview/code-of-civil-procedure-and-limitation" element={<TortsFreeChapter courseSlug="code-of-civil-procedure-and-limitation" />} />
        <Route path="free-preview/law-of-torts-mv-and-cp-laws" element={<TortsFreeChapter />} />
        <Route path="free-preview/criminal-law-i-transitioning-from-ipc-to-bns" element={<CriminalLawFreeLesson />} />

        <Route
          path="available-courses"
          element={<MyCourses view="available" />}
        />

        <Route
          path="enrolled-courses"
          element={<MyCourses view="enrolled" />}
        />

        <Route
          path="courses/:courseId"
          element={<CourseDetails />}
        />

        <Route
          path="learn/:courseId/:chapterId"
          element={<ChapterLearning />}
        />

        <Route
          path="mock-test/torts/:testNumber"
          element={<MockTestPage />}
        />

        <Route
          path="final-exam/torts"
          element={<FinalExamPage />}
        />

        <Route
          path="courses/:courseId/mock-tests/:testNumber"
          element={<CourseAssessmentPage examType="mock" />}
        />

        <Route
          path="courses/:courseId/final-exam"
          element={<CourseAssessmentPage examType="final" />}
        />

        <Route
          path="certification"
          element={<StudentCertificatesPage />}
        />

        <Route
          path="certificates"
          element={
            <Navigate
              to="/student/certification"
              replace
            />
          }
        />

        <Route
          path="downloads"
          element={
            <h2>
              Downloads
            </h2>
          }
        />

        <Route
          path="notifications"
          element={
            <h2>
              Notifications
            </h2>
          }
        />

        <Route
          path="profile"
          element={<StudentProfilePage />}
        />
      </Route>

      {/* =====================================================
          ADMIN PORTAL
      ====================================================== */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="homepage"
          element={<HomepageCms />}
        />

        {/* =================================================
            CONTENT MANAGER - POSTS
        ================================================== */}

        <Route
          path="posts"
          element={<PostManagement />}
        />

        {/* =================================================
            COURSES
        ================================================== */}

        <Route
          path="courses"
          element={<Courses />}
        />

        <Route
          path="chapters"
          element={<ChapterManagement />}
        />

        {/* =================================================
            LAW NOTES
        ================================================== */}

        <Route
          path="law-notes"
          element={<LawNoteManagement />}
        />

        {/* =================================================
            RESOURCES / BOOKS
        ================================================== */}

        <Route
          path="resources"
          element={<ResourceManagement />}
        />

        <Route
          path="books"
          element={<CourseBookManagement />}
        />

        {/* =================================================
            EXAMINATION
        ================================================== */}

        <Route
          path="exams"
          element={<ExamManagement />}
        />

        <Route
          path="exams/torts/mock/:testNumber"
          element={<MockTestPage />}
        />

        <Route
          path="exams/torts/final"
          element={<FinalExamPage />}
        />
      </Route>

      {/* =====================================================
          404
      ====================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}
