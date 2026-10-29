import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";

const menuItems = [
  { to: "/", label: "Home" },
  { to: "/law-courses", label: "Legal Studies" },
  { id: "resources", label: "Free Resources", links: [
    { to: "/qa", label: "Q&A" },
    { to: "/#legal-article", label: "Legal Article" },
    { to: "/#legal-remedies", label: "Legal Remedies" },
    { to: "/#latest-videos", label: "Learning Videos" },
    { to: "/indian-independence", label: "Indian Independence" },
  ] },
  { id: "services", label: "Legal Services", links: [
    { to: "/services/property-registration", label: "Property Registration" },
    { to: "/services/litigation", label: "Litigation" },
  ] },
  { id: "about", label: "About", links: [
    { to: "/about", label: "Sanhita360" },
    { to: "/about/founder", label: "Founder" },
  ] },
];

export default function Header() {
  const { firebaseUser, profile, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const headerRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const dashboardPath = profile?.role === "admin" ? "/admin" : "/student";
  const accountPath = firebaseUser ? dashboardPath : "/login?source=law-courses";
  const accountLabel = loading ? "Checking account…" : firebaseUser ? "My Dashboard" : "Student Login";
  const closeMenu = () => { setMenuOpen(false); setOpenGroup(null); };

  useEffect(() => {
    const outsideClick = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setMenuOpen(false);
        setOpenGroup(null);
      }
    };
    document.addEventListener("pointerdown", outsideClick);
    return () => document.removeEventListener("pointerdown", outsideClick);
  }, []);

  const renderItem = (item, mobile) => {
    if (!item.links) return <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={closeMenu}>{item.label}</NavLink>;
    const expanded = openGroup === item.id;
    const panelId = `ns-${item.id}-${mobile ? "mobile" : "desktop"}`;
    return <div key={item.id} className={mobile ? "ns-mobile-group" : "ns-header-dropdown"}
      onMouseEnter={mobile ? undefined : () => setOpenGroup(item.id)}
      onMouseLeave={mobile ? undefined : () => setOpenGroup(null)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup(null); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          setOpenGroup(null);
          event.currentTarget.querySelector("button")?.focus();
        }
      }}>
      <button type="button" className="ns-dropdown-trigger" aria-expanded={expanded} aria-controls={panelId}
        onClick={(event) => {
          const toggle = mobile || event.detail === 0;
          setOpenGroup((current) => toggle && current === item.id ? null : item.id);
        }}>
        {item.label}<FaChevronDown size={11} className={expanded ? "is-open" : ""} aria-hidden="true" />
      </button>
      {expanded && <div id={panelId} className={mobile ? "ns-mobile-submenu" : "ns-desktop-submenu"}>
        {item.links.map((link) => link.links ? (
          <details key={link.id} className="ns-nested-group">
            <summary>{link.label}<FaChevronDown size={11} aria-hidden="true" /></summary>
            <div className="ns-nested-submenu">
              {link.links.map(({ to, label }) => <Link key={to} to={to} onClick={closeMenu}>{label}</Link>)}
            </div>
          </details>
        ) : <Link key={link.to} to={link.to} onClick={closeMenu}>{link.label}</Link>)}
      </div>}
    </div>;
  };

  return <>
    <header ref={headerRef} className="ns-public-header" onKeyDown={(event) => {
      if (event.key === "Escape") { closeMenu(); mobileToggleRef.current?.focus(); }
    }}>
      <div className="ns-header-container">
        <Link to="/" className="ns-header-brand" onClick={closeMenu}>
          <img className="ns-header-logo" src="/sanhita360-logo.png" alt="Sanhita360 — legal learning and consultation" />
        </Link>
        <nav className="ns-desktop-menu" aria-label="Main navigation">{menuItems.map((item) => renderItem(item, false))}</nav>
        <div className="ns-header-account-actions">
          <Link className="ns-header-login" to={accountPath} aria-disabled={loading || undefined} onClick={(event) => {
            if (loading) event.preventDefault();
            else closeMenu();
          }}>{accountLabel}</Link>
          <button ref={mobileToggleRef} type="button" className="ns-mobile-toggle" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen} aria-controls="ns-mobile-navigation" onClick={() => { setMenuOpen((open) => !open); setOpenGroup(null); }}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuOpen && <nav id="ns-mobile-navigation" className="ns-mobile-menu" aria-label="Mobile navigation">{menuItems.map((item) => renderItem(item, true))}</nav>}
    </header>
    <style>{`
      .ns-public-header,.ns-public-header *{box-sizing:border-box}
      .ns-public-header{position:sticky;top:0;z-index:1000;width:100%;background:#fff;border-bottom:1px solid #e2e8f0;font-family:inherit}
      .ns-header-container{width:100%;max-width:1280px;margin:auto;padding:15px 20px;display:flex;align-items:center;justify-content:space-between;gap:24px;min-width:0}
      .ns-header-brand{display:flex;flex-shrink:0;align-items:center;text-decoration:none}
      .ns-header-logo{width:190px;height:76px;object-fit:contain;display:block}
      .ns-desktop-menu{display:flex;align-items:center;justify-content:flex-end;gap:clamp(16px,1.7vw,28px);margin-left:auto;min-width:0}
      .ns-desktop-menu>a,.ns-dropdown-trigger{color:#1e293b;font-weight:600;font-size:15px;text-decoration:none;white-space:nowrap;padding:10px 0}
      .ns-desktop-menu>a.active,.ns-desktop-menu>a:hover,.ns-dropdown-trigger:hover{color:#2563eb}
      .ns-header-dropdown{position:relative;flex-shrink:0}
      .ns-dropdown-trigger{display:flex;align-items:center;justify-content:space-between;gap:7px;border:0;background:transparent;cursor:pointer;font-family:inherit}
      .ns-dropdown-trigger svg{transition:transform .2s}.ns-dropdown-trigger svg.is-open{transform:rotate(180deg)}
      .ns-desktop-submenu{position:absolute;top:100%;left:0;min-width:240px;max-height:70vh;overflow-y:auto;background:#fff;border:1px solid #e2e8f0;border-radius:10px;box-shadow:0 10px 25px #0f172a20;z-index:1001}
      .ns-header-dropdown:last-child .ns-desktop-submenu{left:auto;right:0}
      .ns-desktop-submenu>a{display:block;padding:12px 18px;color:#1e293b;text-decoration:none;border-bottom:1px solid #f1f5f9;font-size:14px;line-height:1.5}
      .ns-desktop-submenu>a:hover,.ns-desktop-submenu>a:focus-visible{background:#eff6ff;color:#1d4ed8}
      .ns-nested-group>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 18px;min-height:44px;color:#1e293b;font-size:14px;font-weight:650;cursor:pointer;list-style:none}
      .ns-nested-group>summary::-webkit-details-marker{display:none}
      .ns-nested-group>summary:hover,.ns-nested-group>summary:focus-visible{background:#eff6ff;color:#1d4ed8}
      .ns-nested-group>summary:focus-visible{outline:3px solid #2563eb;outline-offset:-3px}
      .ns-nested-group>summary svg{transition:transform .2s}.ns-nested-group[open]>summary svg{transform:rotate(180deg)}
      .ns-nested-submenu{display:flex;flex-direction:column;background:#f8fafc}
      .ns-nested-submenu>a{display:block;padding:12px 18px 12px 30px;min-height:44px;color:#475569;text-decoration:none;border-top:1px solid #e2e8f0;font-size:14px;line-height:1.5}
      .ns-nested-submenu>a:hover,.ns-nested-submenu>a:focus-visible{background:#eff6ff;color:#1d4ed8}
      .ns-header-account-actions{display:flex;align-items:center;gap:10px;flex-shrink:0}
      .ns-header-login{display:flex;align-items:center;justify-content:center;min-height:44px;padding:11px 18px;background:#2563eb;color:white;border-radius:999px;text-decoration:none;font-size:14px;font-weight:700;white-space:nowrap}
      .ns-header-login:hover{background:#1d4ed8}.ns-header-login[aria-disabled=true]{opacity:.65;cursor:wait}
      .ns-public-header a:focus-visible,.ns-public-header button:focus-visible{outline:3px solid #2563eb;outline-offset:4px}
      .ns-mobile-toggle{display:none;align-items:center;justify-content:center;width:44px;height:44px;border:1px solid #e2e8f0;border-radius:10px;background:#fff;color:#1e293b;font-size:22px;cursor:pointer}
      .ns-mobile-menu{display:none}
      @media(max-width:1120px){
        .ns-desktop-menu{display:none}.ns-mobile-toggle{display:flex}
        .ns-mobile-menu{display:flex;flex-direction:column;max-height:calc(100dvh - 106px);overflow-y:auto;padding:8px 18px 20px;background:white;border-top:1px solid #e2e8f0}
        .ns-mobile-menu>a,.ns-mobile-group>.ns-dropdown-trigger{display:flex;width:100%;align-items:center;justify-content:space-between;min-height:48px;padding:11px 4px;color:#1e293b;border-bottom:1px solid #f1f5f9;text-decoration:none;font-size:15px;font-weight:650}
        .ns-mobile-menu>a.active{color:#2563eb}.ns-mobile-submenu{display:flex;flex-direction:column;background:#f8fafc;padding:5px 13px}
        .ns-mobile-submenu>a{display:block;padding:12px 4px;min-height:44px;border-bottom:1px solid #e2e8f0;color:#475569;text-decoration:none;font-size:14px;line-height:1.5}
      }
      @media(max-width:640px){
        .ns-header-container{padding:10px 14px;gap:10px;min-height:74px}.ns-header-logo{width:132px;height:54px}
        .ns-header-login{font-size:12px;padding:10px 12px}.ns-header-account-actions{gap:8px}.ns-mobile-toggle{width:40px;height:40px;font-size:20px}
        .ns-mobile-menu{max-height:calc(100dvh - 74px);padding-left:14px;padding-right:14px}
      }
      @media(max-width:360px){.ns-header-logo{width:112px;height:46px}.ns-header-login{font-size:11px;padding:10px}.ns-header-account-actions{gap:6px}}
    `}</style>
  </>;
}
