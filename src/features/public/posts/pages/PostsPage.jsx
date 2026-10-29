import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaNewspaper,
  FaTag,
} from "react-icons/fa";

import {
  Link,
} from "react-router-dom";

import { isFreedomFighterPost } from "../../../../utils/postCategories";

import Header from "../../../home/components/Header";
import Footer from "../../../home/components/Footer";

import SEO from "../../../../shared/seo/SEO";

import {
  SEO_CONFIG,
} from "../../../../constants/seoConfig";

import {
  getPublishedPosts,
} from "../../../../services/postService";

// =========================================================
// HELPERS
// =========================================================

const formatDate = (
  value,
) => {
  if (!value) {
    return "";
  }

  try {
    let date;

    if (
      typeof value?.toDate ===
      "function"
    ) {
      date = value.toDate();
    } else if (
      value?.seconds
    ) {
      date = new Date(
        value.seconds * 1000,
      );
    } else {
      date = new Date(value);
    }

    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {
      return "";
    }

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    ).format(date);
  } catch {
    return "";
  }
};

const getPostImage = (
  post,
) =>
  post?.media?.desktop?.url ||
  post?.seo?.ogImageUrl ||
  "";

// =========================================================
// PAGE
// =========================================================

export default function PostsPage({ independenceOnly = false }) {
  const pageTitle = independenceOnly ? "Indian Independence: Stories of Freedom Fighters" : "Legal Posts & Articles";
  const pageDescription = independenceOnly
    ? "Explore the people, courage and stories of India’s independence movement through Sanhita360’s freedom-fighter articles."
    : "Explore legal awareness posts, constitutional topics, practical law explainers and important legal updates from Sanhita360.";
  const canonical = independenceOnly ? "/indian-independence" : "/posts";
  const [
    posts,
    setPosts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    let active = true;

    const loadPosts =
      async () => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getPublishedPosts({
              pageSize: 50,
            });

          if (!active) {
            return;
          }

          setPosts(
            Array.isArray(data)
              ? data
              : [],
          );
        } catch (loadError) {
          console.error(
            "Unable to load public posts:",
            loadError,
          );

          if (active) {
            setError(
              "Unable to load posts at the moment.",
            );
          }
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      };

    loadPosts();

    return () => {
      active = false;
    };
  }, []);

  const visiblePosts = independenceOnly ? posts.filter(isFreedomFighterPost) : posts;

  const structuredData =
    useMemo(
      () => ({
        "@context":
          "https://schema.org",
        "@type":
          "CollectionPage",
        name: pageTitle,
        description: pageDescription,
        url:
          `${SEO_CONFIG.siteUrl}${canonical}`,
        isPartOf: {
          "@id":
            `${SEO_CONFIG.siteUrl}/#website`,
        },
      }),
      [pageTitle, pageDescription, canonical],
    );

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonical}
        keywords={independenceOnly ? ["Indian independence", "Indian freedom fighters", "independence movement"] : [
          "legal posts",
          "law articles India",
          "legal awareness",
          "Indian Constitution articles",
          "Sanhita360 posts",
        ]}
        robots="index, follow, max-image-preview:large"
        structuredData={
          structuredData
        }
      />

      <Header />

      <main className="ns-posts-page">
        <section className="ns-posts-hero">
          <div className="ns-posts-container">
            <span className="ns-posts-eyebrow">
              <FaNewspaper />
              {independenceOnly ? "India’s Freedom Movement" : "Public Legal Content"}
            </span>

            <h1>
              {pageTitle}
            </h1>

            <p>
              {pageDescription}
            </p>
          </div>
        </section>

        <section className="ns-posts-content">
          <div className="ns-posts-container">
            {loading && (
              <div className="ns-posts-status">
                <div className="ns-posts-spinner" />
                <p>
                  Loading published posts...
                </p>
              </div>
            )}

            {!loading && error && (
              <div className="ns-posts-status error">
                <FaNewspaper />
                <h2>
                  Posts could not be loaded
                </h2>
                <p>
                  {error}
                </p>
              </div>
            )}

            {!loading &&
              !error &&
              visiblePosts.length === 0 && (
                <div className="ns-posts-status">
                  <FaNewspaper />
                  <h2>
                    No published posts yet
                  </h2>
                  <p>
                    Published posts will appear
                    here automatically.
                  </p>
                </div>
              )}

            {!loading &&
              !error &&
              visiblePosts.length > 0 && (
                <div className="ns-posts-grid">
                  {visiblePosts.map(
                    (post) => {
                      const image =
                        getPostImage(
                          post,
                        );

                      const date =
                        formatDate(
                          post.publishedAt ||
                            post.createdAt,
                        );

                      return (
                        <article
                          key={post.id}
                          className="ns-post-card"
                        >
                          {image && (
                            <Link
                              to={`/posts/${post.slug}`}
                              className="ns-post-card-image-link"
                              aria-label={`Read ${post.title}`}
                            >
                              <img
                                src={image}
                                alt={
                                  post.title ||
                                  "Sanhita360 legal post"
                                }
                                loading="lazy"
                              />
                            </Link>
                          )}

                          <div className="ns-post-card-body">
                            <div className="ns-post-card-meta">
                              {post.category && (
                                <span>
                                  <FaTag />
                                  {post.category}
                                </span>
                              )}

                              {date && (
                                <span>
                                  <FaCalendarAlt />
                                  {date}
                                </span>
                              )}
                            </div>

                            <h2>
                              <Link
                                to={`/posts/${post.slug}`}
                              >
                                {post.title}
                              </Link>
                            </h2>

                            {post.excerpt && (
                              <p>
                                {post.excerpt}
                              </p>
                            )}

                            <Link
                              to={`/posts/${post.slug}`}
                              className="ns-post-read-more"
                            >
                              Read Full Post
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

        <PostsPageStyles />
      </main>

      <Footer />
    </>
  );
}

// =========================================================
// STYLES
// =========================================================

function PostsPageStyles() {
  return (
    <style>
      {`
        .ns-posts-page,
        .ns-posts-page * {
          box-sizing: border-box;
        }

        .ns-posts-page {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          background: #f8fafc;
          color: #0f172a;
        }

        .ns-posts-container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .ns-posts-hero {
          padding: 70px 0;
          background:
            radial-gradient(
              circle at 90% 15%,
              rgba(96,165,250,.22),
              transparent 30%
            ),
            linear-gradient(135deg,#0f172a,#1e3a8a);
          color: #ffffff;
        }

        .ns-posts-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: #bfdbfe;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .ns-posts-hero h1 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(34px,5vw,54px);
          line-height: 1.1;
        }

        .ns-posts-hero p {
          max-width: 760px;
          margin: 16px 0 0;
          color: #dbeafe;
          font-size: 16px;
          line-height: 1.75;
        }

        .ns-posts-content {
          padding: 55px 0 75px;
        }

        .ns-posts-grid {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 26px;
        }

        .ns-post-card {
          display: flex;
          min-width: 0;
          overflow: hidden;
          flex-direction: column;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          background: #ffffff;
          box-shadow:
            0 10px 30px rgba(15,23,42,.07);
          transition:
            transform .2s ease,
            box-shadow .2s ease;
        }

        .ns-post-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 16px 38px rgba(15,23,42,.11);
        }

        .ns-post-card-image-link {
          display: block;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #e2e8f0;
        }

        .ns-post-card-image-link img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .25s ease;
        }

        .ns-post-card:hover
        .ns-post-card-image-link img {
          transform: scale(1.025);
        }

        .ns-post-card-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 22px;
        }

        .ns-post-card-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-bottom: 13px;
        }

        .ns-post-card-meta span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #64748b;
          font-size: 11px;
          font-weight: 600;
        }

        .ns-post-card-meta span:first-child {
          color: #2563eb;
        }

        .ns-post-card h2 {
          margin: 0;
          font-size: 21px;
          line-height: 1.35;
        }

        .ns-post-card h2 a {
          color: #0f172a;
          text-decoration: none;
        }

        .ns-post-card h2 a:hover {
          color: #2563eb;
        }

        .ns-post-card p {
          margin: 12px 0 20px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.7;
        }

        .ns-post-read-more {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          gap: 7px;
          margin-top: auto;
          color: #2563eb;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
        }

        .ns-posts-status {
          display: flex;
          min-height: 320px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 30px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
          text-align: center;
          color: #64748b;
        }

        .ns-posts-status > svg {
          margin-bottom: 12px;
          color: #2563eb;
          font-size: 42px;
        }

        .ns-posts-status h2 {
          margin: 0;
          color: #0f172a;
        }

        .ns-posts-status p {
          margin: 8px 0 0;
        }

        .ns-posts-status.error {
          border-color: #fecaca;
          background: #fef2f2;
        }

        .ns-posts-spinner {
          width: 40px;
          height: 40px;
          margin-bottom: 12px;
          border: 3px solid #dbeafe;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: ns-posts-spin .8s linear infinite;
        }

        @keyframes ns-posts-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 950px) {
          .ns-posts-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }
        }

        @media (max-width: 640px) {
          .ns-posts-container {
            width: min(100% - 28px,1180px);
          }

          .ns-posts-hero {
            padding: 48px 0;
          }

          .ns-posts-hero p {
            font-size: 14px;
          }

          .ns-posts-content {
            padding: 38px 0 52px;
          }

          .ns-posts-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }
      `}
    </style>
  );
}
