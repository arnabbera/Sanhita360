import { FaArrowRight } from "react-icons/fa";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="ns-hero">
      <div className="ns-hero-container">
        {/* LEFT */}

        <motion.div
          className="ns-hero-content"
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div
            className="ns-hero-badge"
            aria-label="Free law notes • LL.B courses • Chapter-wise lessons • Mock tests"
          >
            <div className="ns-hero-badge-track" aria-hidden="true">
              <span>⚖️ Free LL.B Notes • Chapter-wise Lessons • Mock Tests • Legal Learning</span>
              <span>⚖️ Free LL.B Notes • Chapter-wise Lessons • Mock Tests • Legal Learning</span>
            </div>
          </div>

          <h1>
            Learn Law with Clarity
            and <span>Confidence</span>
          </h1>

          <p className="ns-hero-description">
            Explore structured LL.B courses, free legal notes, chapter-wise lessons and practice tests. Build your understanding of Indian law at your own pace.
          </p>

          <div className="ns-hero-actions">
            <Link
              to="/law-courses"
              className="ns-hero-primary"
            >
              Explore LL.B Courses
              <FaArrowRight />
            </Link>

            <Link
              to="/law-notes"
              className="ns-hero-secondary"
            >
              Browse Free Law Notes
              <FaArrowRight />
            </Link>
          </div>
          <p className="ns-hero-trust-note">For LL.B students and lifelong learners · Learn first, explore courses when ready.</p>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          className="ns-hero-panel"
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <img
            className="ns-hero-banner"
            src="/images/sanhita360-home-hero-banner.webp"
            alt="Sanhita360: Know your rights, protect your future. Simplifying law and empowering citizens."
            width="1254"
            height="1254"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </div>

      <style>
        {`
          .ns-hero,
          .ns-hero * {
            box-sizing: border-box;
          }

          .ns-hero {
            width: 100%;
            overflow: hidden;

            background:
              linear-gradient(
                135deg,
                #0f172a 0%,
                #1e3a8a 45%,
                #2563eb 100%
              );

            color: #ffffff;

            padding:
              clamp(55px, 7vw, 90px)
              20px;
          }

          .ns-hero-container {
            width: 100%;
            max-width: 1280px;

            margin: 0 auto;

            display: grid;

            grid-template-columns:
              minmax(0, 1.08fr)
              minmax(380px, 0.92fr);

            gap:
              clamp(35px, 5vw, 65px);

            align-items: center;
          }

          .ns-hero-content,
          .ns-hero-panel {
            min-width: 0;
          }

          /* BADGE */

          .ns-hero-badge {
            display: block;

            width: min(100%, 580px);
            overflow: hidden;

            margin-bottom: 20px;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.14
              );

            border-radius: 999px;

            background:
              rgba(
                255,
                255,
                255,
                0.12
              );

            padding: 9px 0;

            font-size: 14px;
            font-weight: 600;

            line-height: 1.5;
          }

          .ns-hero-badge-track {
            display: flex;
            width: max-content;
            animation: ns-hero-badge-scroll 19s linear infinite;
          }

          .ns-hero-badge-track span {
            flex: none;
            padding: 0 24px;
            white-space: nowrap;
          }

          .ns-hero-badge:hover .ns-hero-badge-track {
            animation-play-state: paused;
          }

          @keyframes ns-hero-badge-scroll {
            to { transform: translateX(-50%); }
          }

          /* HEADING */

          .ns-hero h1 {
            max-width: 720px;

            margin:
              0 0 24px;

            font-size:
              clamp(
                40px,
                4.5vw,
                62px
              );

            line-height: 1.08;

            letter-spacing:
              -1.5px;

            font-weight: 800;

            overflow-wrap:
              anywhere;
          }

          .ns-hero h1 span {
            color: #bfdbfe;
          }

          .ns-hero-description {
            margin:
              0 0 32px;

            color: #dbeafe;

            font-size:
              clamp(
                17px,
                1.6vw,
                20px
              );

            line-height: 1.75;
          }

          /* BUTTONS */

          .ns-hero-actions {
            display: flex;
            flex-wrap: wrap;

            gap: 14px;
          }

          .ns-hero-primary,
          .ns-hero-secondary {
            display:
              inline-flex;

            min-height: 52px;

            align-items: center;
            justify-content: center;

            gap: 9px;

            border-radius: 999px;

            padding:
              13px 24px;

            font-size: 15px;
            font-weight: 700;

            line-height: 1.3;

            text-align: center;
            text-decoration: none;

            transition:
              transform .2s ease,
              background .2s ease;
          }

          .ns-hero-primary {
            background: #ffffff;
            color: #1e3a8a;
          }

          .ns-hero-secondary {
            border:
              2px solid #ffffff;

            color: #ffffff;
          }

          .ns-hero-primary:hover,
          .ns-hero-secondary:hover {
            transform:
              translateY(-2px);
          }

          .ns-hero-trust-note { margin: 18px 0 0; color: #bfdbfe; font-size: 13px; line-height: 1.5; }

          /* RIGHT PANEL */

          .ns-hero-panel {
            width: 100%;
          }

          .ns-hero-banner {
            display: block;
            width: 100%;
            height: auto;
            border-radius: 20px;
            box-shadow: 0 20px 44px rgba(3, 13, 32, 0.24);
          }

          /* ENROLLMENT */

          .ns-hero-enrollment {
            display: flex;

            margin-top: 24px;

            flex-direction: column;

            align-items: center;

            gap: 4px;

            border-radius: 15px;

            background: #ffffff;

            color: #1e3a8a;

            padding: 17px;

            text-align: center;
          }

          .ns-hero-enrollment strong {
            font-size: 14px;
          }

          .ns-hero-enrollment span {
            font-size: 12px;
            font-weight: 700;
          }

          .ns-hero-enrollment small {
            max-width: 100%;

            color: #64748b;

            font-size: 10px;

            overflow-wrap:
              anywhere;
          }

          /* TABLET */

          @media (
            max-width: 1000px
          ) {
            .ns-hero-container {
              grid-template-columns:
                1fr;

              max-width: 760px;
            }

            .ns-hero-content {
              text-align: center;
            }

            .ns-hero h1 {
              margin-left: auto;
              margin-right: auto;
            }

            .ns-hero-actions {
              justify-content:
                center;
            }
          }

          /* MOBILE */

          @media (
            max-width: 640px
          ) {
            .ns-hero {
              padding:
                42px 16px
                48px;
            }

            .ns-hero-container {
              gap: 32px;
            }

            .ns-hero-badge {
              margin-bottom:
                17px;

              border-radius:
                14px;

              padding:
                8px 12px;

              font-size: 11px;
            }

            .ns-hero h1 {
              margin-bottom:
                18px;

              font-size:
                clamp(
                  34px,
                  10vw,
                  44px
                );

              line-height: 1.08;

              letter-spacing:
                -1px;
            }

            .ns-hero-description {
              margin-bottom:
                25px;

              font-size: 15px;
              line-height: 1.65;
            }

            .ns-hero-actions {
              flex-direction:
                column;

              gap: 11px;
            }

            .ns-hero-primary,
            .ns-hero-secondary {
              width: 100%;

              min-height: 50px;

              padding:
                12px 15px;

              font-size: 14px;
            }

            .ns-hero-enrollment {
              margin-top: 14px;

              padding: 14px 10px;
            }
          }

          /* VERY SMALL MOBILE */

          @media (
            max-width: 360px
          ) {
            .ns-hero {
              padding-left: 12px;
              padding-right: 12px;
            }

            .ns-hero h1 {
              font-size: 31px;
            }

          }

          @media (prefers-reduced-motion: reduce) {
            .ns-hero-badge {
              width: auto;
              overflow: visible;
              border-radius: 14px;
              padding: 9px 17px;
            }

            .ns-hero-badge-track {
              display: block;
              width: auto;
              animation: none;
            }

            .ns-hero-badge-track span:first-child {
              display: block;
              padding: 0;
              white-space: normal;
            }

            .ns-hero-badge-track span:last-child {
              display: none;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
