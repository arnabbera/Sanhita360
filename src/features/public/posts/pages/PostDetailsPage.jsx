import {
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaFacebookF,
  FaInstagram,
  FaLink,
  FaNewspaper,
  FaShareAlt,
  FaTag,
} from "react-icons/fa";

import {
  Link,
  useParams,
} from "react-router-dom";

import Header from "../../../home/components/Header";
import Footer from "../../../home/components/Footer";

import SEO from "../../../../shared/seo/SEO";

import {
  SEO_CONFIG,
} from "../../../../constants/seoConfig";

import {
  getPostBySlug,
} from "../../../../services/postService";

// =========================================================
// HELPERS
// =========================================================

const hasText = (
  value,
) =>
  Boolean(
    String(
      value || "",
    ).trim(),
  );

const toDate = (
  value,
) => {
  if (!value) {
    return null;
  }

  try {
    if (
      typeof value?.toDate ===
      "function"
    ) {
      return value.toDate();
    }

    if (value?.seconds) {
      return new Date(
        value.seconds * 1000,
      );
    }

    const date =
      new Date(value);

    return Number.isNaN(
      date.getTime(),
    )
      ? null
      : date;
  } catch {
    return null;
  }
};

const formatDate = (
  value,
) => {
  const date =
    toDate(value);

  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  ).format(date);
};

const toIsoDate = (
  value,
) => {
  const date =
    toDate(value);

  return date
    ? date.toISOString()
    : undefined;
};

const absoluteUrl = (
  value,
) => {
  if (!value) {
    return SEO_CONFIG.siteUrl;
  }

  if (
    /^https?:\/\//i.test(
      value,
    )
  ) {
    return value;
  }

  return `${SEO_CONFIG.siteUrl}${
    value.startsWith("/")
      ? value
      : `/${value}`
  }`;
};

const renderInlineContent = (text) => {
  const normalized = String(text || "").replace(/\s*\n\s*/g, " ");
  const tokenPattern = /(\[[\s\S]*?\]\(https?:\/\/[^)]+\)|\*\*[\s\S]*?\*\*)/g;

  return normalized.split(tokenPattern).filter(Boolean).map((part, index) => {
    const linkMatch = part.match(/^\[([\s\S]*?)\]\((https?:\/\/[^)]+)\)$/);

    if (linkMatch) {
      return (
        <a
          key={`${index}-${linkMatch[2]}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderInlineContent(linkMatch[1])}
        </a>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${index}-${part.slice(2, 20)}`}>
          {part.slice(2, -2).replace(/\s*\n\s*/g, " ")}
        </strong>
      );
    }

    return part;
  });
};

const renderContent = (
  content,
) => {
  const text =
    String(content || "")
      .trim();

  if (!text) {
    return null;
  }

  return text.split(/\n{2,}/).map((block, index) => {
    const lines = block.split("\n");

    const heading = block.match(/^(#{2,3})\s+([^\n]+)$/);
    if (heading) {
      const Heading = heading[1].length === 2 ? "h2" : "h3";
      return <Heading key={`${index}-${heading[2]}`}>{renderInlineContent(heading[2])}</Heading>;
    }

    if (lines.every((line) => line.trim().startsWith("> "))) {
      return (
        <blockquote key={`${index}-${block.slice(0, 24)}`}>
          {lines.map((line, lineIndex) => (
            <Fragment key={line}>
              {lineIndex > 0 && <br />}
              {renderInlineContent(line.trim().slice(2))}
            </Fragment>
          ))}
        </blockquote>
      );
    }

    if (lines.every((line) => line.trim().startsWith("- "))) {
      return (
        <ul key={`${index}-${block.slice(0, 24)}`}>
          {lines.map((line) => (
            <li key={line.slice(0, 48)}>
              {renderInlineContent(line.trim().slice(2))}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={`${index}-${block.slice(0, 24)}`}>
        {renderInlineContent(block)}
      </p>
    );
  });
};


const copyToClipboard = async (
  value,
) => {
  if (!value) {
    return false;
  }

  try {
    if (
      navigator?.clipboard &&
      window?.isSecureContext
    ) {
      await navigator.clipboard.writeText(
        value,
      );

      return true;
    }

    const textarea =
      document.createElement(
        "textarea",
      );

    textarea.value =
      value;

    textarea.setAttribute(
      "readonly",
      "",
    );

    textarea.style.position =
      "fixed";

    textarea.style.opacity =
      "0";

    document.body.appendChild(
      textarea,
    );

    textarea.select();

    const copied =
      document.execCommand(
        "copy",
      );

    document.body.removeChild(
      textarea,
    );

    return copied;
  } catch (
    copyError
  ) {
    console.error(
      "Unable to copy post link:",
      copyError,
    );

    return false;
  }
};

// =========================================================
// PAGE
// =========================================================

export default function PostDetailsPage() {
  const {
    postSlug,
  } = useParams();

  const [
    post,
    setPost,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    shareMessage,
    setShareMessage,
  ] = useState("");

  useEffect(() => {
    let active = true;

    const loadPost =
      async () => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getPostBySlug(
              postSlug,
            );

          if (!active) {
            return;
          }

          if (!data) {
            setPost(null);
            setError(
              "Post not found.",
            );
            return;
          }

          setPost(data);
        } catch (loadError) {
          console.error(
            "Unable to load public post:",
            loadError,
          );

          if (active) {
            setError(
              "Unable to load this post.",
            );
          }
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      };

    loadPost();

    return () => {
      active = false;
    };
  }, [postSlug]);

  const seo =
    useMemo(() => {
      if (!post) {
        return null;
      }

      const title =
        post?.seo?.title ||
        post.title;

      const description =
        post?.seo?.description ||
        post.excerpt ||
        `Read ${post.title} on Sanhita360.`;

      const canonical =
        post?.seo?.canonicalUrl ||
        `/posts/${post.slug}`;

      const keywords = [
        post?.seo?.focusKeyword,
        ...(Array.isArray(
          post?.seo
            ?.secondaryKeywords,
        )
          ? post.seo
              .secondaryKeywords
          : []),
        ...(Array.isArray(
          post?.tags,
        )
          ? post.tags
          : []),
        post.category,
        post.title,
        "Sanhita360",
      ].filter(Boolean);

      const image =
        post?.seo?.ogImageUrl ||
        post?.media?.desktop?.url ||
        "";

      const robotsIndex =
        post?.seo?.robots?.index !==
        false;

      const robotsFollow =
        post?.seo?.robots?.follow !==
        false;

      return {
        title,
        description,
        canonical,
        keywords,
        image,
        robots:
          `${
            robotsIndex
              ? "index"
              : "noindex"
          }, ${
            robotsFollow
              ? "follow"
              : "nofollow"
          }, max-image-preview:large, max-snippet:-1`,
      };
    }, [post]);

  const structuredData =
    useMemo(() => {
      if (
        !post ||
        !seo
      ) {
        return null;
      }

      const postUrl =
        absoluteUrl(
          seo.canonical,
        );

      const datePublished =
        toIsoDate(
          post.publishedAt ||
            post.createdAt,
        );

      const dateModified =
        toIsoDate(
          post.updatedAt ||
            post.publishedAt ||
            post.createdAt,
        );

      return {
        "@context":
          "https://schema.org",
        "@graph": [
          {
            "@type":
              "Article",
            "@id":
              `${postUrl}#article`,
            headline:
              post.title,
            description:
              seo.description,
            url:
              postUrl,
            mainEntityOfPage: {
              "@id":
                postUrl,
            },
            image:
              seo.image ||
              undefined,
            datePublished,
            dateModified,
            author: {
              "@type":
                "Organization",
              "@id":
                `${SEO_CONFIG.siteUrl}/#organization`,
            },
            publisher: {
              "@id":
                `${SEO_CONFIG.siteUrl}/#organization`,
            },
            articleSection:
              post.category ||
              undefined,
            keywords:
              seo.keywords.join(
                ", ",
              ),
            inLanguage:
              "en-IN",
          },
          {
            "@type":
              "BreadcrumbList",
            "@id":
              `${postUrl}#breadcrumb`,
            itemListElement: [
              {
                "@type":
                  "ListItem",
                position: 1,
                name: "Home",
                item:
                  `${SEO_CONFIG.siteUrl}/`,
              },
              {
                "@type":
                  "ListItem",
                position: 2,
                name: "Posts",
                item:
                  `${SEO_CONFIG.siteUrl}/posts`,
              },
              {
                "@type":
                  "ListItem",
                position: 3,
                name:
                  post.title,
                item:
                  postUrl,
              },
            ],
          },
        ],
      };
    }, [post, seo]);

  if (loading) {
    return (
      <>
        <Header />

        <main className="ns-post-detail-status">
          <div className="ns-post-detail-spinner" />
          <p>
            Loading post...
          </p>
          <StatusStyles />
        </main>

        <Footer />
      </>
    );
  }

  if (
    error ||
    !post
  ) {
    return (
      <>
        <SEO
          title="Post Not Found | Sanhita360"
          description="The requested Sanhita360 post could not be found."
          canonical={`/posts/${postSlug}`}
          robots="noindex, follow"
        />

        <Header />

        <main className="ns-post-detail-status">
          <FaNewspaper />
          <h1>
            Post Not Found
          </h1>
          <p>
            {error ||
              "The requested post is not available."}
          </p>
          <Link to="/posts">
            <FaArrowLeft />
            Browse Posts
          </Link>
          <StatusStyles />
        </main>

        <Footer />
      </>
    );
  }

  const desktopImage =
    post?.media?.desktop?.url ||
    seo?.image ||
    "";

  const mobileImage =
    post?.media?.mobile?.url ||
    desktopImage;

  const publishedDate =
    formatDate(
      post.publishedAt ||
        post.createdAt,
    );

  const tags =
    Array.isArray(
      post.tags,
    )
      ? post.tags
      : [];

  const shareUrl =
    `${SEO_CONFIG.siteUrl}/posts/${encodeURIComponent(
      post.slug,
    )}`;

  // A new share URL makes X fetch the updated card after it cached the
  // original URL before this post's thumbnail was available.
  const socialShareUrl = `${shareUrl}?share=post-card-20261001`;

  const shareTitle =
    post.title ||
    "Sanhita360";

  const shareText =
    post.excerpt ||
    seo.description ||
    post.title ||
    "Read this post on Sanhita360.";

  const showShareMessage = (
    message,
  ) => {
    setShareMessage(
      message,
    );

    window.setTimeout(
      () => {
        setShareMessage(
          "",
        );
      },
      2500,
    );
  };

  const openShareWindow = (
    url,
  ) => {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer,width=760,height=650",
    );
  };

  const shareOnFacebook =
    () => {
      openShareWindow(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          socialShareUrl,
        )}`,
      );
    };

  const shareOnX =
    () => {
      const text =
        `${shareTitle} - Sanhita360`;

      openShareWindow(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text,
        )}&url=${encodeURIComponent(
          socialShareUrl,
        )}`,
      );
    };

  const shareNative =
    async () => {
      if (
        typeof navigator !==
          "undefined" &&
        typeof navigator.share ===
          "function"
      ) {
        try {
          await navigator.share({
            title:
              shareTitle,
            text:
              shareText,
            url:
              socialShareUrl,
          });

          return;
        } catch (
          shareError
        ) {
          if (
            shareError?.name ===
            "AbortError"
          ) {
            return;
          }

          console.error(
            "Native sharing failed:",
            shareError,
          );
        }
      }

      const copied =
        await copyToClipboard(
          socialShareUrl,
        );

      showShareMessage(
        copied
          ? "Post link copied. Open Instagram and paste/share the link."
          : "Unable to open sharing. Please copy the browser URL manually.",
      );
    };

  const copyPostLink =
    async () => {
      const copied =
        await copyToClipboard(
          socialShareUrl,
        );

      showShareMessage(
        copied
          ? "Post link copied."
          : "Unable to copy the post link.",
      );
    };

  return (
    <>
      <SEO
        title={seo.title}
        description={
          seo.description
        }
        canonical={
          seo.canonical
        }
        keywords={
          seo.keywords
        }
        image={seo.image}
        type="article"
        robots={
          seo.robots
        }
        structuredData={
          structuredData
        }
      />

      <Header />

      <main className="ns-post-detail-page">
        <div className="ns-post-detail-container">
          <nav
            className="ns-post-detail-breadcrumb"
            aria-label="Breadcrumb"
          >
            <Link to="/">
              Home
            </Link>
            <span>/</span>
            <Link to="/posts">
              Posts
            </Link>
            <span>/</span>
            <span>
              {post.title}
            </span>
          </nav>
        </div>

        <section className="ns-post-detail-hero">
          <div className="ns-post-detail-container">
            <div className="ns-post-detail-meta">
              {post.category && (
                <span>
                  <FaTag />
                  {post.category}
                </span>
              )}

              {publishedDate && (
                <span>
                  <FaCalendarAlt />
                  {publishedDate}
                </span>
              )}
            </div>

            <h1>
              {post.title}
            </h1>

            {hasText(
              post.excerpt,
            ) && (
              <p>
                {post.excerpt}
              </p>
            )}

            <ShareBar
              onFacebook={
                shareOnFacebook
              }
              onX={
                shareOnX
              }
              onNativeShare={
                shareNative
              }
              onCopy={
                copyPostLink
              }
              message={
                shareMessage
              }
              tone="hero"
            />

            <Link
              to="/posts"
              className="ns-post-detail-back"
            >
              <FaArrowLeft />
              All Posts
            </Link>
          </div>
        </section>

        <section className="ns-post-detail-content-section">
          <div className="ns-post-detail-container ns-post-detail-layout">
            <article className="ns-post-detail-article">
              {desktopImage && (
                <picture className="ns-post-detail-picture">
                  {mobileImage && (
                    <source
                      media="(max-width: 640px)"
                      srcSet={
                        mobileImage
                      }
                    />
                  )}

                  <img
                    src={
                      desktopImage
                    }
                    alt={
                      post.title
                    }
                  />
                </picture>
              )}

              <div className="ns-post-detail-body">
                {renderContent(
                  post.content,
                )}

                {!hasText(
                  post.content,
                ) &&
                  hasText(
                    post.excerpt,
                  ) && (
                    <p>
                      {post.excerpt}
                    </p>
                  )}
              </div>

              {tags.length > 0 && (
                <div className="ns-post-detail-tags">
                  <strong>
                    Tags
                  </strong>

                  <div>
                    {tags.map(
                      (tag) => (
                        <span
                          key={tag}
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

              <div className="ns-post-detail-share-footer">
                <ShareBar
                  onFacebook={
                    shareOnFacebook
                  }
                  onX={
                    shareOnX
                  }
                  onNativeShare={
                    shareNative
                  }
                  onCopy={
                    copyPostLink
                  }
                  message={
                    shareMessage
                  }
                />
              </div>
            </article>

            <aside className="ns-post-detail-sidebar">
              <div className="ns-post-detail-sidebar-card">
                <FaNewspaper />

                <h2>
                  More Legal Posts
                </h2>

                <p>
                  Browse other public legal
                  awareness articles and law
                  explainers from Sanhita360.
                </p>

                <Link to="/posts">
                  Browse All Posts
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <PostDetailStyles />
      </main>

      <Footer />
    </>
  );
}


// =========================================================
// SHARE BAR
// =========================================================

function ShareBar({
  onFacebook,
  onX,
  onNativeShare,
  onCopy,
  message = "",
  tone = "",
}) {
  return (
    <div
      className={`ns-post-share ${
        tone === "hero"
          ? "hero"
          : ""
      }`}
    >
      <div className="ns-post-share-heading">
        <FaShareAlt />

        <span>
          Share this post
        </span>
      </div>

      <div className="ns-post-share-actions">
        <button
          type="button"
          className="facebook"
          onClick={
            onFacebook
          }
          aria-label="Share this post on Facebook"
        >
          <FaFacebookF />
          Facebook
        </button>

        <button
          type="button"
          className="x"
          onClick={
            onX
          }
          aria-label="Share this post on X"
        >
          <span className="ns-x-icon">
            X
          </span>
          X
        </button>

        <button
          type="button"
          className="instagram"
          onClick={
            onNativeShare
          }
          aria-label="Share this post using Instagram or another installed app"
        >
          <FaInstagram />
          Instagram / Share
        </button>

        <button
          type="button"
          className="copy"
          onClick={
            onCopy
          }
          aria-label="Copy post link"
        >
          <FaLink />
          Copy Link
        </button>
      </div>

      {message && (
        <div
          className="ns-post-share-message"
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      )}
    </div>
  );
}

// =========================================================
// STATUS STYLES
// =========================================================

function StatusStyles() {
  return (
    <style>
      {`
        .ns-post-detail-status {
          display: flex;
          min-height: 65vh;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 30px;
          background: #f8fafc;
          text-align: center;
          color: #64748b;
        }

        .ns-post-detail-status > svg {
          margin-bottom: 12px;
          color: #2563eb;
          font-size: 42px;
        }

        .ns-post-detail-status h1 {
          margin: 0;
          color: #0f172a;
        }

        .ns-post-detail-status p {
          margin: 8px 0 17px;
        }

        .ns-post-detail-status a {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 15px;
          border-radius: 8px;
          background: #2563eb;
          color: #ffffff;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
        }

        .ns-post-detail-spinner {
          width: 40px;
          height: 40px;
          margin-bottom: 12px;
          border: 3px solid #dbeafe;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation:
            ns-post-detail-spin .8s linear infinite;
        }

        @keyframes ns-post-detail-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
  );
}

// =========================================================
// PAGE STYLES
// =========================================================

function PostDetailStyles() {
  return (
    <style>
      {`
        .ns-post-detail-page,
        .ns-post-detail-page * {
          box-sizing: border-box;
        }

        .ns-post-detail-page {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          background: #ffffff;
          color: #0f172a;
        }

        .ns-post-detail-container {
          width: min(1180px,calc(100% - 40px));
          margin: 0 auto;
        }

        .ns-post-detail-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          padding: 14px 0;
          color: #64748b;
          font-size: 11px;
        }

        .ns-post-detail-breadcrumb a {
          color: #2563eb;
          text-decoration: none;
        }

        .ns-post-detail-hero {
          padding: 58px 0;
          background:
            radial-gradient(
              circle at 90% 15%,
              rgba(96,165,250,.22),
              transparent 30%
            ),
            linear-gradient(135deg,#0f172a,#1e3a8a);
          color: #ffffff;
        }

        .ns-post-detail-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 13px;
        }

        .ns-post-detail-meta span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #bfdbfe;
          font-size: 11px;
          font-weight: 700;
        }

        .ns-post-detail-hero h1 {
          max-width: 950px;
          margin: 0;
          color: #ffffff;
          font-size: clamp(34px,5vw,54px);
          line-height: 1.12;
        }

        .ns-post-detail-hero p {
          max-width: 820px;
          margin: 16px 0 0;
          color: #dbeafe;
          font-size: 15px;
          line-height: 1.75;
        }

        .ns-post-detail-back {
          display: inline-flex;
          min-height: 40px;
          align-items: center;
          gap: 7px;
          margin-top: 22px;
          padding: 0 14px;
          border: 1px solid rgba(255,255,255,.32);
          border-radius: 8px;
          color: #ffffff;
          text-decoration: none;
          font-size: 11px;
          font-weight: 800;
        }

        .ns-post-detail-content-section {
          padding: 55px 0 75px;
          background: #f8fafc;
        }

        .ns-post-detail-layout {
          display: grid;
          grid-template-columns:
            minmax(0,1fr) 300px;
          gap: 35px;
          align-items: start;
        }

        .ns-post-detail-article {
          min-width: 0;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
          box-shadow:
            0 8px 28px rgba(15,23,42,.06);
        }

        .ns-post-detail-picture {
          display: block;
          width: 100%;
          background: #e2e8f0;
        }

        .ns-post-detail-picture img {
          display: block;
          width: 100%;
          max-height: 620px;
          object-fit: cover;
        }

        .ns-post-detail-body {
          padding: 34px;
          color: #334155;
          font-size: 15px;
          line-height: 1.9;
          overflow-wrap: anywhere;
        }

        .ns-post-detail-body h2,
        .ns-post-detail-body h3 {
          color: #102448;
          font-weight: 750;
          line-height: 1.35;
          margin: 30px 0 16px;
        }

        .ns-post-detail-body h2 { font-size: clamp(23px, 3vw, 29px); }
        .ns-post-detail-body h3 { font-size: clamp(19px, 2.5vw, 23px); }
        .ns-post-detail-body ul { list-style: disc; padding-left: 24px; margin: 0 0 24px; }
        .ns-post-detail-body li { margin: 10px 0; }

        .ns-post-detail-body p {
          margin: 0 0 20px;
          white-space: pre-wrap;
        }

        .ns-post-detail-body p:last-child {
          margin-bottom: 0;
        }

        .ns-post-detail-body blockquote {
          margin: 0 0 28px;
          padding: 16px 20px;
          border-left: 4px solid #d6a329;
          background: #f8f4e9;
          color: #102448;
          font-size: 17px;
          line-height: 1.8;
        }

        .ns-post-detail-tags {
          padding: 0 34px 34px;
        }

        .ns-post-detail-tags strong {
          display: block;
          margin-bottom: 10px;
          color: #0f172a;
          font-size: 12px;
        }

        .ns-post-detail-tags > div {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ns-post-detail-tags span {
          padding: 6px 10px;
          border-radius: 999px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 10px;
          font-weight: 700;
        }

        .ns-post-detail-sidebar {
          position: sticky;
          top: 95px;
        }

        .ns-post-detail-sidebar-card {
          padding: 22px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
          box-shadow:
            0 7px 22px rgba(15,23,42,.05);
        }

        .ns-post-detail-sidebar-card > svg {
          margin-bottom: 12px;
          color: #2563eb;
          font-size: 28px;
        }

        .ns-post-detail-sidebar-card h2 {
          margin: 0;
          color: #0f172a;
          font-size: 18px;
        }

        .ns-post-detail-sidebar-card p {
          color: #64748b;
          font-size: 12px;
          line-height: 1.7;
        }

        .ns-post-detail-sidebar-card a {
          display: inline-flex;
          margin-top: 8px;
          color: #2563eb;
          text-decoration: none;
          font-size: 11px;
          font-weight: 800;
        }

        .ns-post-share {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ns-post-share.hero {
          margin-top: 22px;
        }

        .ns-post-share-heading {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #0f172a;
          font-size: 11px;
          font-weight: 800;
        }

        .ns-post-share.hero
        .ns-post-share-heading {
          color: #dbeafe;
        }

        .ns-post-share-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ns-post-share-actions button {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0 13px;
          border: 1px solid transparent;
          border-radius: 9px;
          cursor: pointer;
          font-family: inherit;
          font-size: 10px;
          font-weight: 800;
          transition:
            transform .18s ease,
            opacity .18s ease,
            box-shadow .18s ease;
        }

        .ns-post-share-actions button:hover {
          transform: translateY(-1px);
          box-shadow:
            0 6px 15px rgba(15,23,42,.12);
        }

        .ns-post-share-actions button:active {
          transform: translateY(0);
        }

        .ns-post-share-actions
        button.facebook {
          background: #1877f2;
          color: #ffffff;
        }

        .ns-post-share-actions
        button.x {
          background: #000000;
          color: #ffffff;
        }

        .ns-post-share-actions
        button.instagram {
          background:
            linear-gradient(
              135deg,
              #833ab4,
              #e1306c,
              #f77737
            );
          color: #ffffff;
        }

        .ns-post-share-actions
        button.copy {
          border-color: #cbd5e1;
          background: #ffffff;
          color: #334155;
        }

        .ns-post-share.hero
        .ns-post-share-actions
        button.copy {
          border-color:
            rgba(255,255,255,.35);
          background:
            rgba(255,255,255,.12);
          color: #ffffff;
        }

        .ns-x-icon {
          display: inline-flex;
          width: 14px;
          height: 14px;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 900;
          line-height: 1;
        }

        .ns-post-share-message {
          width: fit-content;
          max-width: 100%;
          padding: 7px 10px;
          border-radius: 7px;
          background: #ecfdf5;
          color: #047857;
          font-size: 10px;
          font-weight: 700;
          line-height: 1.4;
        }

        .ns-post-share.hero
        .ns-post-share-message {
          background:
            rgba(255,255,255,.14);
          color: #ffffff;
        }

        .ns-post-detail-share-footer {
          padding: 0 34px 34px;
          border-top: 1px solid #f1f5f9;
          padding-top: 25px;
        }

        @media (max-width: 900px) {
          .ns-post-detail-layout {
            grid-template-columns: 1fr;
          }

          .ns-post-detail-sidebar {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .ns-post-detail-container {
            width: min(100% - 28px,1180px);
          }

          .ns-post-detail-hero {
            padding: 42px 0;
          }

          .ns-post-detail-hero h1 {
            font-size: 31px;
          }

          .ns-post-detail-hero p {
            font-size: 13px;
          }

          .ns-post-detail-content-section {
            padding: 38px 0 52px;
          }

          .ns-post-detail-body {
            padding: 21px;
            font-size: 14px;
          }

          .ns-post-detail-tags {
            padding: 0 21px 24px;
          }

          .ns-post-detail-share-footer {
            padding:
              22px 21px 24px;
          }

          .ns-post-share-actions {
            display: grid;
            grid-template-columns:
              repeat(
                2,
                minmax(0,1fr)
              );
          }

          .ns-post-share-actions button {
            width: 100%;
          }
        }
      `}
    </style>
  );
}
