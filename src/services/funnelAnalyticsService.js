import { APP_CONFIG } from "../constants/appConfig";
import { auth } from "../firebase/firebase";

// Analytics failures never interrupt course navigation or a payment.
export const trackFunnelEvent = async (event, courseId, extra = {}) => {
  if (!courseId || auth.currentUser?.email?.toLowerCase() === APP_CONFIG.ADMIN_EMAIL.toLowerCase()) return;
  try { if (window.localStorage.getItem("sanhita360-exclude-analytics") === "1") return; } catch { /* Storage may be disabled. */ }
  try {
    const token = await auth.currentUser?.getIdToken();
    let source;
    if (event === "course_visit") {
      const campaign = new URLSearchParams(window.location.search).get("utm_source") || "";
      const referrer = document.referrer ? new URL(document.referrer).hostname : "";
      source = /google|bing|duckduckgo/i.test(referrer) ? "search" :
        /facebook|instagram|youtube|whatsapp|linkedin|twitter|^x\.com/i.test(`${campaign} ${referrer}`) ? "social" :
        referrer && referrer !== window.location.hostname ? "referral" : "direct";
      try {
        const firstSource = window.sessionStorage.getItem("sanhita360-arrival-source");
        if (["search", "social", "referral", "direct"].includes(firstSource)) source = firstSource;
        else window.sessionStorage.setItem("sanhita360-arrival-source", source);
      } catch { /* Attribution still works when storage is unavailable. */ }
    }
    const response = await fetch("/api/funnel/event", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ event, courseId, ...(source ? { source } : {}), ...extra }),
    });
    if (!response.ok) console.warn("Funnel event could not be saved", event, response.status);
  } catch (error) {
    console.warn("Funnel event could not be saved", event, error);
  }
};

export const getFunnelReport = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Please sign in as the administrator.");
  const response = await fetch("/api/admin/funnel", {
    headers: { authorization: `Bearer ${await user.getIdToken()}` },
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Unable to load funnel analytics.");
  return result;
};
