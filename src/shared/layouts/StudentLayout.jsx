import { useState } from "react";
import {
  FaBars,
  FaBook,
  FaCertificate,
  FaHome,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const menuItems = [
  { label: "Free Criminal Law Lesson", path: "/student/free-preview/criminal-law-i-transitioning-from-ipc-to-bns", icon: FaBook },
  {
    label: "Dashboard",
    path: "/student",
    icon: FaHome,
    end: true,
  },
  {
    label: "Available Courses",
    path: "/student/available-courses",
    icon: FaBook,
  },
  {
    label: "Enrolled Courses",
    path: "/student/enrolled-courses",
    icon: FaBook,
  },
  {
    label: "Certification",
    path: "/student/certification",
    icon: FaCertificate,
  },
  {
    label: "Profile",
    path: "/student/profile",
    icon: FaUser,
  },
];

const StudentLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isTortsPage = /^\/student\/(?:learn|courses|free-preview)\/law-of-torts-mv-and-cp-laws(?:\/|$)/.test(pathname);
  const isCpcPage = /^\/student\/(?:learn|courses|free-preview)\/code-of-civil-procedure-and-limitation(?:\/|$)/.test(pathname);
  const isInternationalLawPage = /^\/student\/(?:learn|courses|free-preview)\/public-international-law(?:\/|$)/.test(pathname);
  const courseMenuItems = menuItems.map((item, index) =>
    index === 0 && isTortsPage
      ? { ...item, label: "Free Torts Lesson", path: "/student/free-preview/law-of-torts-mv-and-cp-laws" }
      : index === 0 && isCpcPage
        ? { ...item, label: "Free CPC Lesson", path: "/student/free-preview/code-of-civil-procedure-and-limitation" }
        : index === 0 && isInternationalLawPage
          ? { ...item, label: "Free International Law Lesson", path: "/student/free-preview/public-international-law" }
          : item,
  );
  const {
    firebaseUser,
    profile,
    signOut,
  } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] =
    useState(false);

  const displayName =
    profile?.displayName ||
    firebaseUser?.displayName ||
    "Student";

  const email =
    profile?.email ||
    firebaseUser?.email ||
    "";

  const photoURL =
    profile?.photoURL ||
    firebaseUser?.photoURL ||
    "";

  const enrollmentId =
    profile?.enrollmentId || "Not assigned";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await signOut();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Student logout failed:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="ns-student-shell">
      {menuOpen && (
        <button
          type="button"
          aria-label="Close student menu overlay"
          className="ns-student-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`ns-student-sidebar ${
          menuOpen ? "is-open" : ""
        }`}
      >
        <div className="ns-student-sidebar-header">
          <div>
            <img src="/sanhita360-logo.png" alt="Sanhita360" style={{ width: 175, maxWidth: "100%", height: "auto", background: "#fff", borderRadius: 8 }} />
            <p>Student Portal</p>
          </div>

          <button
            type="button"
            className="ns-student-close"
            aria-label="Close student menu"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <div className="ns-student-account-card">
          {photoURL ? (
            <img
              src={photoURL}
              alt={displayName}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="ns-student-account-initials">
              {initials || "S"}
            </div>
          )}

          <div>
            <strong>{displayName}</strong>
            <span>{email}</span>
            <small>{enrollmentId}</small>
          </div>
        </div>

        <nav className="ns-student-navigation">
          {courseMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `ns-student-nav-link ${
                    isActive ? "is-active" : ""
                  }`
                }
              >
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="ns-student-sidebar-footer">
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            <FaSignOutAlt />
            {logoutLoading
              ? "Signing out..."
              : "Logout"}
          </button>
        </div>
      </aside>

      <div className="ns-student-main">
        <header className="ns-student-topbar">
          <div className="ns-student-topbar-left">
            <button
              type="button"
              aria-label="Open student menu"
              className="ns-student-menu-button"
              onClick={() => setMenuOpen(true)}
            >
              <FaBars />
            </button>

            <div>
              <p>Learning Portal</p>
              <h1>Sanhita360</h1>
            </div>
          </div>

          <div className="ns-student-topbar-user">
            {photoURL ? (
              <img
                src={photoURL}
                alt={displayName}
                referrerPolicy="no-referrer"
              />
            ) : (
              <span>{initials || "S"}</span>
            )}

            <div>
              <strong>{displayName}</strong>
              <small>{enrollmentId}</small>
            </div>
          </div>
        </header>

        <main className="ns-student-content">
          <div className="ns-student-content-inner">
            <Outlet />
          </div>
        </main>
      </div>

      <style>
        {`
          .ns-student-shell {
            min-height: 100vh;
            background: #f8fafc;
            color: #0f172a;
          }

          .ns-student-sidebar {
            position: fixed;
            inset: 0 auto 0 0;
            z-index: 50;
            display: flex;
            width: 280px;
            flex-direction: column;
            border-right: 1px solid #dbeafe;
            background:
              linear-gradient(
                180deg,
                #eff6ff 0%,
                #ffffff 45%,
                #f8fafc 100%
              );
            box-shadow:
              12px 0 34px rgba(15, 23, 42, 0.08);
          }

          .ns-student-sidebar-header {
            display: flex;
            min-height: 80px;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #dbeafe;
            padding: 18px 20px;
          }

          .ns-student-sidebar-header h2 {
            margin: 0;
            color: #1d4ed8;
            font-size: 19px;
          }

          .ns-student-sidebar-header p {
            margin: 4px 0 0;
            color: #64748b;
            font-size: 12px;
          }

          .ns-student-close {
            display: none;
            border: none;
            background: transparent;
            color: #64748b;
            cursor: pointer;
            font-size: 18px;
          }

          .ns-student-account-card {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 18px 16px;
            border: 1px solid #dbeafe;
            border-radius: 16px;
            background: #ffffff;
            padding: 14px;
          }

          .ns-student-account-card img,
          .ns-student-account-initials {
            width: 48px;
            height: 48px;
            flex-shrink: 0;
            border-radius: 14px;
          }

          .ns-student-account-card img {
            object-fit: cover;
          }

          .ns-student-account-initials {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #2563eb;
            color: #ffffff;
            font-size: 14px;
            font-weight: 700;
          }

          .ns-student-account-card strong,
          .ns-student-account-card span,
          .ns-student-account-card small {
            display: block;
            max-width: 170px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .ns-student-account-card strong {
            color: #0f172a;
            font-size: 14px;
          }

          .ns-student-account-card span {
            margin-top: 4px;
            color: #64748b;
            font-size: 11px;
          }

          .ns-student-account-card small {
            margin-top: 5px;
            color: #2563eb;
            font-size: 11px;
            font-weight: 700;
          }

          .ns-student-navigation {
            display: flex;
            flex: 1;
            flex-direction: column;
            gap: 6px;
            padding: 0 14px 18px;
          }

          .ns-student-nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            border-radius: 12px;
            color: #475569;
            padding: 12px 14px;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.2s ease;
          }

          .ns-student-nav-link:hover {
            background: #eff6ff;
            color: #2563eb;
          }

          .ns-student-nav-link.is-active {
            background: #2563eb;
            color: #ffffff;
            box-shadow:
              0 10px 24px rgba(37, 99, 235, 0.2);
          }

          .ns-student-sidebar-footer {
            border-top: 1px solid #dbeafe;
            padding: 14px;
          }

          .ns-student-sidebar-footer button {
            display: flex;
            width: 100%;
            align-items: center;
            gap: 10px;
            border: none;
            border-radius: 12px;
            background: #fff1f2;
            color: #dc2626;
            cursor: pointer;
            padding: 12px 14px;
            font-size: 14px;
            font-weight: 700;
          }

          .ns-student-sidebar-footer button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
          }

          .ns-student-main {
            min-height: 100vh;
            margin-left: 280px;
          }

          .ns-student-topbar {
            position: sticky;
            top: 0;
            z-index: 30;
            display: flex;
            min-height: 80px;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            border-bottom: 1px solid #e2e8f0;
            background: rgba(255, 255, 255, 0.96);
            padding: 14px 24px;
            backdrop-filter: blur(12px);
          }

          .ns-student-topbar-left {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .ns-student-topbar-left p {
            margin: 0;
            color: #64748b;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .ns-student-topbar-left h1 {
            margin: 4px 0 0;
            color: #0f172a;
            font-size: 21px;
          }

          .ns-student-menu-button {
            display: none;
            width: 42px;
            height: 42px;
            align-items: center;
            justify-content: center;
            border: 1px solid #dbeafe;
            border-radius: 12px;
            background: #ffffff;
            color: #2563eb;
            cursor: pointer;
          }

          .ns-student-topbar-user {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .ns-student-topbar-user img,
          .ns-student-topbar-user > span {
            width: 42px;
            height: 42px;
            border-radius: 12px;
          }

          .ns-student-topbar-user img {
            object-fit: cover;
          }

          .ns-student-topbar-user > span {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #2563eb;
            color: #ffffff;
            font-size: 13px;
            font-weight: 700;
          }

          .ns-student-topbar-user strong,
          .ns-student-topbar-user small {
            display: block;
          }

          .ns-student-topbar-user strong {
            color: #0f172a;
            font-size: 13px;
          }

          .ns-student-topbar-user small {
            margin-top: 3px;
            color: #64748b;
            font-size: 11px;
          }

          .ns-student-content {
            min-height: calc(100vh - 80px);
            padding: 26px;
          }

          .ns-student-content-inner {
            width: 100%;
            max-width: 1500px;
            margin: 0 auto;
          }

          .ns-student-overlay {
            position: fixed;
            inset: 0;
            z-index: 40;
            border: none;
            background: rgba(15, 23, 42, 0.55);
          }

          @media (max-width: 1023px) {
            .ns-student-sidebar {
              transform: translateX(-100%);
              transition: transform 0.25s ease;
            }

            .ns-student-sidebar.is-open {
              transform: translateX(0);
            }

            .ns-student-close {
              display: inline-flex;
            }

            .ns-student-main {
              margin-left: 0;
            }

            .ns-student-menu-button {
              display: inline-flex;
            }
          }

          @media (max-width: 640px) {
            .ns-student-topbar {
              min-height: 72px;
              padding: 12px 14px;
            }

            .ns-student-topbar-left p {
              display: none;
            }

            .ns-student-topbar-left h1 {
              margin: 0;
              font-size: 17px;
            }

            .ns-student-topbar-user div {
              display: none;
            }

            .ns-student-content {
              padding: 16px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default StudentLayout;
