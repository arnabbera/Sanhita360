import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getCourseBySlug } from "../../../../services/courseService";
import { getPublishedChaptersByCourse } from "../../../../services/chapterService";
import { getChapterLearningPath } from "../../../../utils/chapterUrl";
import { useAuth } from "../../../../hooks/useAuth";
import { trackFunnelEvent } from "../../../../services/funnelAnalyticsService";

export default function TortsFreeChapter({ courseSlug = "law-of-torts-mv-and-cp-laws" }) {
  const { firebaseUser, loading } = useAuth();
  const [path, setPath] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (!firebaseUser) return;
    let active = true;
    (async () => {
      try {
        const course = await getCourseBySlug(courseSlug);
        if (!course) throw new Error("Course unavailable.");
        const chapters = await getPublishedChaptersByCourse(course.id, courseSlug);
        const first = chapters.filter(chapter => chapter.published === true && chapter.deleted !== true)
          .sort((a, b) => Number(a.chapterNumber || a.displayOrder || 0) - Number(b.chapterNumber || b.displayOrder || 0))[0];
        if (!first) throw new Error("The first chapter is not available yet.");
        if (active) {
          void trackFunnelEvent("free_lesson_open", courseSlug);
          setPath(getChapterLearningPath(courseSlug, first));
        }
      } catch (err) {
        if (active) setError(err.message || "Unable to open the free chapter. Please try again.");
      }
    })();
    return () => { active = false; };
  }, [firebaseUser, courseSlug]);
  if (loading) return <p role="status">Checking your account…</p>;
  if (!firebaseUser) return <Navigate to={`/login?next=${encodeURIComponent(`/student/free-preview/${courseSlug}`)}`} replace />;
  if (path) return <Navigate to={path} replace />;
  return <div style={{ padding: 24 }}><p role="status">{error || "Opening your free first chapter…"}</p>
    {error && <Link to={`/student/courses/${courseSlug}`}>Back to course</Link>}</div>;
}
