import { BENOY_BADAL_DINESH_POST } from "../src/features/public/posts/data/benoyBadalDineshPost.js";
import { BINA_DAS_POST } from "../src/features/public/posts/data/binaDasPost.js";
import { BAGHA_JATIN_POST } from "../src/features/public/posts/data/baghaJatinPost.js";
import { ULLASKAR_DUTTA_POST } from "../src/features/public/posts/data/ullaskarDuttaPost.js";
import { MASTERDA_SURYA_SEN_POST } from "../src/features/public/posts/data/masterdaSuryaSenPost.js";
import { PRAFULLA_CHAKI_POST } from "../src/features/public/posts/data/prafullaChakiPost.js";

const INTRO_COURSE_FEE_PAISE = 9900;
const REGULAR_COURSE_FEE_PAISE = 29900;
const INTRO_OFFER_LIMIT = 100;
const LIVE_CLASS_FEE_PAISE = 49900;
const LIVE_CLASS_COURSE_IDS = new Set([
  "criminal-law-i-transitioning-from-ipc-to-bns",
  "code-of-civil-procedure-and-limitation",
  "law-of-torts-mv-and-cp-laws",
  "indian-constitutional-law-i",
  "human-rights-law-and-practice",
  "family-law-i",
  "public-international-law",
  "environmental-law",
  "media-law",
]);
const CURRENCY = "INR";
const FIREBASE_PROJECT_ID = "nagariksuraksha-60adb";
const FIREBASE_ISSUER = `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;
const FIREBASE_JWKS_URL = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";
const FIRESTORE_SCOPE = "https://www.googleapis.com/auth/datastore";

const LEGAL_UPDATE_SOCIAL_META = {
  "/legal-remedies/remedies-when-police-refuse-to-register-fir": {
    title: "When Police Refuse to Register an FIR: Legal Remedies | Sanhita360",
    description: "Practical remedies under BNSS sections 173(4), 175(3) and 223, plus exceptional High Court relief and records to preserve.",
    image: "/images/legal-updates/police-refuse-fir-remedies-v2.jpg",
  },
  "/posts/masterda-surya-sen-chittagong-armoury-raid": {
    title: "Masterda Surya Sen and the Chittagong Armoury Raid | Sanhita360",
    description: "Remembering the schoolteacher and revolutionary organiser who led the historic Chittagong Armoury Raid of 18 April 1930.",
    image: "/images/freedom-fighters/masterda-surya-sen.jpg",
  },
  "/legal-remedies/section-200-crpc-section-223-bnss-private-complaint": {
    title: "Section 200 CrPC and Section 223 BNSS Explained | Sanhita360",
    description: "Understand private complaints before a Magistrate, the CrPC-to-BNSS procedure, accused-hearing safeguard and difference from a police-investigation request.",
    image: "/images/legal-updates/section-200-crpc-section-223-bnss.jpg",
  },
  "/legal-remedies/tech-startup-regulatory-compliance-2026": {
    title: "Tech Startup Regulatory Compliance in 2026 | Sanhita360",
    description: "An India-focused startup guide to data protection, responsible AI, cybersecurity, consumer law and compliance-by-design before scaling.",
    image: "/images/legal-updates/tech-startup-regulatory-compliance-2026.jpg",
  },
  "/legal-remedies/important-judgement-on-consumer-rights": {
    title: "Important Judgments on Consumer Rights | Sanhita360",
    description: "Understand consumer rights in India and landmark Supreme Court judgments concerning medical services, homebuyers, commercial purpose and telecom disputes.",
    image: "/images/legal-updates/consumer-rights-landmark-judgments.jpg",
  },
  "/legal-remedies/bought-mortgaged-property-by-fraud": {
    title: "Bought a Mortgaged Property by Fraud? | Sanhita360",
    description: "Practical legal steps in Kolkata when a seller conceals an earlier mortgage: lender notice, police complaint, SARFAESI and DRT remedies, and civil recovery.",
    image: "/images/legal-updates/mortgaged-property-fraud.jpg",
  },
  "/legal-remedies/next-steps-unrecovered-online-fraud-funds": {
    title: "Next Steps for Unrecovered Online Fraud Funds | Sanhita360",
    description: "Options available when money remains unrecovered after an online financial-fraud complaint, including MRM, police escalation, banking and consumer remedies.",
    image: "/images/legal-updates/unrecovered-online-fraud-funds.jpg",
  },
};

const BUNDLED_POST_SOCIAL_META = Object.fromEntries(
  [ULLASKAR_DUTTA_POST, BAGHA_JATIN_POST, BINA_DAS_POST, BENOY_BADAL_DINESH_POST, MASTERDA_SURYA_SEN_POST, PRAFULLA_CHAKI_POST].map((post) => [
    post.slug,
    {
      title: post.seo.title,
      description: post.seo.description,
      image: post.seo.ogImageUrl || post.media.desktop.url,
    },
  ]),
);

let firebaseKeysCache = null;
let googleAccessTokenCache = null;
const courseSocialMetaCache = new Map();

const json = (body, init = {}) => Response.json(body, {
  ...init,
  headers: { "cache-control": "no-store", ...init.headers },
});

const fail = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

const base64UrlToBytes = (value) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
};

const bytesToBase64Url = (value) => {
  let binary = "";
  for (const byte of new Uint8Array(value)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

const encodeJson = (value) => bytesToBase64Url(
  new TextEncoder().encode(JSON.stringify(value)),
);
const decodeJson = (value) => JSON.parse(
  new TextDecoder().decode(base64UrlToBytes(value)),
);

const getFirebaseKeys = async () => {
  if (firebaseKeysCache?.expiresAt > Date.now()) return firebaseKeysCache.keys;
  const response = await fetch(FIREBASE_JWKS_URL);
  if (!response.ok) fail("Unable to validate your login session.", 503);
  const maxAge = Number(
    (response.headers.get("cache-control") || "").match(/max-age=(\d+)/)?.[1] || 3600,
  );
  const keys = await response.json();
  firebaseKeysCache = { keys, expiresAt: Date.now() + Math.max(300, maxAge) * 1000 };
  return keys;
};

const verifyFirebaseUser = async (request) => {
  const authorization = request.headers.get("authorization") || "";
  const token = authorization.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) fail("Please sign in to access this feature.", 401);
  const parts = token.split(".");
  if (parts.length !== 3) fail("Your login session is invalid. Please sign in again.", 401);

  let header;
  let payload;
  try {
    header = decodeJson(parts[0]);
    payload = decodeJson(parts[1]);
  } catch {
    fail("Your login session is invalid. Please sign in again.", 401);
  }

  const now = Math.floor(Date.now() / 1000);
  if (
    header.alg !== "RS256" || !header.kid || payload.aud !== FIREBASE_PROJECT_ID ||
    payload.iss !== FIREBASE_ISSUER || typeof payload.sub !== "string" ||
    !payload.sub || payload.sub.length > 128 || Number(payload.exp) <= now ||
    Number(payload.iat) > now + 300
  ) fail("Your login session has expired. Please sign in again.", 401);

  const keys = await getFirebaseKeys();
  const jwk = keys.keys?.find((candidate) => candidate.kid === header.kid);
  if (!jwk) {
    firebaseKeysCache = null;
    fail("Unable to validate your login session. Please sign in again.", 401);
  }
  const publicKey = await crypto.subtle.importKey(
    "jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"],
  );
  const verified = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5", publicKey, base64UrlToBytes(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
  );
  if (!verified) fail("Your login session is invalid. Please sign in again.", 401);
  return payload;
};

const requireStudent = async (request) => (await verifyFirebaseUser(request)).sub;

const requireAdmin = async (request) => {
  const user = await verifyFirebaseUser(request);
  if (user.email?.toLowerCase() !== "beraarnab@gmail.com" || user.email_verified !== true) {
    fail("Administrator access required.", 403);
  }
  return user.sub;
};

const getFirebaseServiceAccountJson = (env) =>
  env.FIREBASE_SERVICE_ACCOUNT_JSON ||
  env.FIREBASE_SERVICE_ACCOUNT ||
  env.FIREBASE_SERVICE_ACCOUNT_;

const getRazorpayCredentials = (env) => ({
  keyId: env.RAZORPAY_KEY_ID || env.key_id,
  keySecret: env.RAZORPAY_KEY_SECRET || env.key_secret,
});

const parseServiceAccount = (env) => {
  const serviceAccountJson = getFirebaseServiceAccountJson(env);
  if (!serviceAccountJson) {
    fail("Firebase backend credentials are not configured.", 503);
  }
  try {
    const account = JSON.parse(serviceAccountJson);
    if (!account.client_email || !account.private_key) throw new Error();
    if (account.project_id && account.project_id !== FIREBASE_PROJECT_ID) throw new Error();
    return account;
  } catch {
    fail("Firebase backend credentials are invalid.", 503);
  }
};

const importPrivateKey = (privateKey) => {
  const encoded = privateKey.replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "").replace(/\s/g, "");
  return crypto.subtle.importKey(
    "pkcs8", Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0)),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"],
  );
};

const getGoogleAccessToken = async (env) => {
  if (googleAccessTokenCache?.expiresAt > Date.now() + 60_000) {
    return googleAccessTokenCache.token;
  }
  const account = parseServiceAccount(env);
  const now = Math.floor(Date.now() / 1000);
  const encodedHeader = encodeJson({ alg: "RS256", typ: "JWT" });
  const encodedPayload = encodeJson({
    iss: account.client_email,
    scope: FIRESTORE_SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  });
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5", await importPrivateKey(account.private_key),
    new TextEncoder().encode(unsignedToken),
  );
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsignedToken}.${bytesToBase64Url(signature)}`,
    }),
  });
  const result = await response.json();
  if (!response.ok || !result.access_token) {
    console.error("Unable to obtain Firestore access token", result.error);
    fail("Unable to connect to enrollment storage.", 503);
  }
  googleAccessTokenCache = {
    token: result.access_token,
    expiresAt: Date.now() + Number(result.expires_in || 3600) * 1000,
  };
  return result.access_token;
};

const LIKE_COOKIE = "__Host-sanhita_like_id";
const likesRoot = `projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/legalRemedyLikes`;
const pageLikesRoot = `projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/pageLikes`;
const firestoreDocumentsUrl = "https://firestore.googleapis.com/v1";

const getLikeVisitor = (request) => {
  const value = request.headers.get("cookie")?.match(/(?:^|;\s*)__Host-sanhita_like_id=([a-f0-9]{64})(?:;|$)/)?.[1];
  return value || null;
};

const readLikeDocument = async (token, name) => {
  const response = await fetch(`${firestoreDocumentsUrl}/${name}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    console.error("Unable to read legal remedy likes", response.status);
    fail("Unable to load likes right now.", 503);
  }
  return response.json();
};

const likeCount = async (token, counter, visitorHash) => {
  const [document, visitor] = await Promise.all([
    readLikeDocument(token, counter),
    readLikeDocument(token, `${counter}/visitors/${visitorHash}`),
  ]);
  return {
    count: Math.max(0, Number(document?.fields?.count?.integerValue || 0)),
    liked: Boolean(visitor),
  };
};

const handleLegalLikes = async (request, env, url) => {
  if (request.method !== "GET" && request.method !== "POST") fail("Method not allowed.", 405);
  const isWrite = request.method === "POST";
  if (isWrite && request.headers.get("origin") !== url.origin) {
    fail("Likes must come from this site.", 403);
  }
  const rawPost = isWrite ? (await readBody(request))?.post : url.searchParams.get("post");
  const isCoursesPage = url.pathname === "/api/law-courses/likes";
  const post = !isCoursesPage && typeof rawPost === "string"
    ? rawPost.replace(/^\/legal-updates\//, "/legal-remedies/")
    : rawPost;
  if (isCoursesPage ? post !== "/law-courses" :
    typeof post !== "string" || !Object.hasOwn(LEGAL_UPDATE_SOCIAL_META, post) ||
    !post.startsWith("/legal-remedies/")) fail("Unknown page.", 404);

  const postId = isCoursesPage ? "law-courses" : post.slice("/legal-remedies/".length);
  const counter = `${isCoursesPage ? pageLikesRoot : likesRoot}/${postId}`;
  let visitorId = getLikeVisitor(request);
  if (!visitorId && isWrite) fail("Reload the post before liking it.", 409);
  const newVisitor = !visitorId;
  if (newVisitor) {
    visitorId = [...crypto.getRandomValues(new Uint8Array(32))]
      .map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${postId}:${visitorId}`));
  const visitorHash = [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const token = await getGoogleAccessToken(env);

  if (isWrite) {
    const response = await fetch(
      `${firestoreDocumentsUrl}/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:commit`,
      {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ writes: [
          {
            update: {
              name: `${counter}/visitors/${visitorHash}`,
              fields: { createdAt: { timestampValue: new Date().toISOString() } },
            },
            currentDocument: { exists: false },
          },
          {
            transform: {
              document: counter,
              fieldTransforms: [{ fieldPath: "count", increment: { integerValue: "1" } }],
            },
          },
        ] }),
      },
    );
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      // Two tabs may try to create the same visitor marker at once. The
      // atomic commit rejects the second write without incrementing count.
      if (!["ALREADY_EXISTS", "FAILED_PRECONDITION"].includes(result.error?.status)) {
        console.error("Unable to store legal remedy like", response.status, result.error?.status);
        fail("Unable to save your like. Please try again.", 503);
      }
    }
  }

  const result = await likeCount(token, counter, visitorHash);
  return json(result, {
    headers: {
      "cache-control": "no-store",
      ...(newVisitor ? { "set-cookie": `${LIKE_COOKIE}=${visitorId}; Path=/; Max-Age=31536000; Secure; HttpOnly; SameSite=Lax` } : {}),
    },
  });
};

const enrollmentUrl = (studentId, courseId) =>
  `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/studentEnrollments/${encodeURIComponent(`${studentId}_${courseId}`)}`;

const getEnrollment = async (env, studentId, courseId) => {
  const token = await getGoogleAccessToken(env);
  const response = await fetch(enrollmentUrl(studentId, courseId), {
    headers: { authorization: `Bearer ${token}` },
  });
  if (response.status === 404) {
    fail("Start the course enrollment before continuing to payment.", 409);
  }
  if (!response.ok) {
    console.error("Unable to load enrollment", response.status, await response.text());
    fail("Unable to load your course enrollment.", 503);
  }
  const enrollment = await response.json();
  const fields = enrollment.fields || {};
  if (
    fields.studentId?.stringValue !== studentId ||
    fields.courseId?.stringValue !== courseId || fields.deleted?.booleanValue === true
  ) fail("This enrollment does not belong to your account.", 403);
  return { enrollment, token };
};

const firestoreValueToJs = (value) => {
  if (!value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("booleanValue" in value) return value.booleanValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("nullValue" in value) return null;
  if (value.arrayValue) return (value.arrayValue.values || []).map(firestoreValueToJs);
  if (value.mapValue) {
    return Object.fromEntries(
      Object.entries(value.mapValue.fields || {}).map(([key, child]) => [key, firestoreValueToJs(child)]),
    );
  }
  return null;
};

const getLiveSessions = async (request, env, url) => {
  if (request.method !== "GET") fail("Method not allowed.", 405);
  const studentId = await requireStudent(request);
  const courseId = String(url.searchParams.get("courseId") || "").trim();
  if (!LIVE_CLASS_COURSE_IDS.has(courseId)) fail("Live classes are not available for this course.", 404);

  const { enrollment, token } = await getEnrollment(env, studentId, courseId);
  const fields = enrollment.fields || {};
  const hasAccess =
    getFirestoreValue(fields, "liveClasses.hasAccess")?.booleanValue === true &&
    getFirestoreValue(fields, "liveClasses.payment.status")?.stringValue === "paid";
  if (!hasAccess) fail("Upgrade to the Premium Live Plan to view live-class details.", 403);

  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "liveSessions" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "courseId" },
              op: "EQUAL",
              value: { stringValue: courseId },
            },
          },
        },
      }),
    },
  );
  if (!response.ok) fail("Unable to load live-class schedules.", 503);
  const rows = await response.json();
  const sessions = rows
    .filter((row) => row.document?.fields?.published?.booleanValue !== false)
    .map((row) => {
      const session = Object.fromEntries(
        Object.entries(row.document.fields || {}).map(([key, value]) => [key, firestoreValueToJs(value)]),
      );
      return {
        id: row.document.name.split("/").at(-1),
        courseId: session.courseId,
        chapterId: session.chapterId,
        chapterNumber: session.chapterNumber,
        title: session.title,
        scheduledAt: session.scheduledAt,
        durationMinutes: session.durationMinutes,
        meetingLink: session.meetingLink,
      };
    })
    .sort((first, second) => Number(first.chapterNumber || 0) - Number(second.chapterNumber || 0));

  return { sessions };
};

const ensureMapFields = (value) => {
  value.mapValue ||= { fields: {} };
  value.mapValue.fields ||= {};
  return value.mapValue.fields;
};

const setFirestoreValue = (root, path, value) => {
  const parts = path.split(".");
  let fields = root;
  for (let index = 0; index < parts.length - 1; index += 1) {
    fields[parts[index]] ||= { mapValue: { fields: {} } };
    fields = ensureMapFields(fields[parts[index]]);
  }
  fields[parts.at(-1)] = value;
};

const getFirestoreValue = (root, path) => {
  const parts = path.split(".");
  let value = null;
  for (let index = 0; index < parts.length; index += 1) {
    const fields = index === 0 ? root : value?.mapValue?.fields;
    value = fields?.[parts[index]];
    if (!value) return null;
  }
  return value;
};

const getFirestoreString = (fields, paths) => {
  for (const path of paths) {
    const value = getFirestoreValue(fields, path)?.stringValue;
    if (value) return value;
  }
  return "";
};

const loadCourseSocialMeta = async (env, slug) => {
  const cached = courseSocialMetaCache.get(slug);
  if (cached?.expiresAt > Date.now()) return cached.value;

  const token = await getGoogleAccessToken(env);
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "courses" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "slug" },
              op: "EQUAL",
              value: { stringValue: slug },
            },
          },
          limit: 1,
        },
      }),
    },
  );

  if (!response.ok) {
    console.error("Unable to load course social metadata", response.status);
    return null;
  }

  const result = await response.json();
  const fields = result.find((entry) => entry.document)?.document?.fields;
  if (!fields && slug === "media-law") {
    return { title: "Media Law | Sanhita360", description: "Study media law, broadcasting, digital media and advertising law with Sanhita360.", image: "" };
  }
  if (!fields || fields.status?.stringValue !== "published" || fields.deleted?.booleanValue === true) return null;

  const title = getFirestoreString(fields, ["seo.title", "title"]);
  const description = getFirestoreString(fields, [
    "seo.description",
    "shortDescription",
    "description",
  ]);
  const image = getFirestoreString(fields, [
    "seo.ogImageUrl",
    "desktopImageUrl",
    "thumbnailUrl",
    "imageUrl",
    "media.desktopImageUrl",
    "media.thumbnailUrl",
    "media.imageUrl",
  ]);

  if (!title) return null;

  const value = {
    title: /Sanhita360/i.test(title)
      ? title
      : `${title} | Sanhita360`,
    description: description || `Explore ${title} on Sanhita360.`,
    image,
  };

  courseSocialMetaCache.set(slug, {
    value,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  return value;
};

const loadPostSocialMeta = async (env, slug) => {
  const token = await getGoogleAccessToken(env);
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "posts" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "slug" },
              op: "EQUAL",
              value: { stringValue: slug },
            },
          },
          limit: 1,
        },
      }),
    },
  );

  if (!response.ok) return null;
  const result = await response.json();
  const fields = result.find((entry) => entry.document)?.document?.fields;
  if (!fields || fields.status?.stringValue !== "published" || fields.deleted?.booleanValue === true) return null;

  const rawTitle = getFirestoreString(fields, ["seo.title", "title"]);
  if (!rawTitle) return null;
  const title = rawTitle.replace(/NagarikSuraksha/gi, "Sanhita360");
  const description = getFirestoreString(fields, ["seo.description", "excerpt"])
    .replace(/NagarikSuraksha/gi, "Sanhita360");
  const image = getFirestoreString(fields, [
    "seo.ogImageUrl", "media.desktop.url", "desktopImageUrl",
  ]);
  return {
    title: /Sanhita360/i.test(title) ? title : `${title} | Sanhita360`,
    description: description || `Read ${title} on Sanhita360.`,
    image,
  };
};

const rewriteCourseSocialMetadata = (response, metadata, canonicalUrl, socialUrl) => {
  const rewriter = new HTMLRewriter()
    .on("title", {
      element(element) {
        element.setInnerContent(metadata.title);
      },
    })
    .on('meta[name="description"]', {
      element(element) {
        element.setAttribute("content", metadata.description);
      },
    })
    .on('link[rel="canonical"]', {
      element(element) {
        element.setAttribute("href", canonicalUrl);
      },
    })
    .on('meta[property="og:type"]', {
      element(element) {
        element.setAttribute("content", "website");
      },
    })
    .on('meta[property="og:title"]', {
      element(element) {
        element.setAttribute("content", metadata.title);
      },
    })
    .on('meta[property="og:description"]', {
      element(element) {
        element.setAttribute("content", metadata.description);
      },
    })
    .on('meta[property="og:url"]', {
      element(element) {
        element.setAttribute("content", socialUrl);
      },
    })
    .on('meta[name="twitter:card"]', {
      element(element) {
        element.setAttribute("content", "summary_large_image");
      },
    })
    .on('meta[name="twitter:title"]', {
      element(element) {
        element.setAttribute("content", metadata.title);
      },
    })
    .on('meta[name="twitter:description"]', {
      element(element) {
        element.setAttribute("content", metadata.description);
      },
    });

  if (Number.isSafeInteger(metadata.coursePricePaise)) {
    rewriter.on("head", {
      element(element) {
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "Course",
          name: metadata.title,
          description: metadata.description,
          url: canonicalUrl,
          provider: { "@type": "EducationalOrganization", name: "Sanhita360" },
          offers: {
            "@type": "Offer", url: canonicalUrl,
            price: (metadata.coursePricePaise / 100).toFixed(2),
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        };
        element.append(`<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`, { html: true });
      },
    });
  }

  if (metadata.image) {
    rewriter.on("head", {
      element(element) {
        const image = metadata.image.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
        const imageType = /\.jpe?g(?:[?#]|$)/i.test(metadata.image)
          ? "image/jpeg"
          : "image/png";
        const imageWidth = metadata.imageWidth || 1200;
        const imageHeight = metadata.imageHeight || 675;
        element.append(
          `<meta property="og:image" content="${image}" />` +
          `<meta property="og:image:url" content="${image}" />` +
          `<meta property="og:image:secure_url" content="${image}" />` +
          `<meta property="og:image:type" content="${imageType}" />` +
          `<meta property="og:image:width" content="${imageWidth}" />` +
          `<meta property="og:image:height" content="${imageHeight}" />` +
          `<meta property="og:image:alt" content="${metadata.title}" />` +
          `<meta name="twitter:image" content="${image}" />` +
          `<meta name="twitter:image:alt" content="${metadata.title}" />`,
          { html: true },
        );
      },
    });
  }

  return rewriter.transform(response);
};

const courseSitemap = async (request, env) => {
  const response = await env.ASSETS.fetch(request);
  if (!response.ok) return response;
  const token = await getGoogleAccessToken(env);
  const courses = await fetch(`${firestoreDocumentsUrl}/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ structuredQuery: {
      from: [{ collectionId: "courses" }],
      limit: 500,
    } }),
  });
  if (!courses.ok) return response;
  const rows = await courses.json();
  const slugs = new Set();
  let storedMediaLaw = false;
  for (const row of rows) {
    const fields = row.document?.fields;
    const slug = fields?.slug?.stringValue;
    if (slug === "media-law") storedMediaLaw = true;
    if (fields?.status?.stringValue === "published" && fields?.deleted?.booleanValue !== true &&
        /^[a-z0-9-]{1,160}$/.test(slug || "")) slugs.add(slug);
  }
  if (!storedMediaLaw) slugs.add("media-law");
  const urls = [...slugs].sort().map((slug) =>
    `  <url><loc>https://www.sanhita360.com/courses/${slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
  ).join("\n");
  const xml = (await response.text()).replace("</urlset>", `${urls}\n</urlset>`);
  return new Response(xml, {
    headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=300" },
  });
};

const updateEnrollment = async ({ enrollment, token, topLevelFields }) => {
  const query = new URLSearchParams();
  for (const fieldPath of Object.keys(topLevelFields)) {
    query.append("updateMask.fieldPaths", fieldPath);
  }
  if (enrollment.updateTime) query.set("currentDocument.updateTime", enrollment.updateTime);
  const url = enrollment.name.replace(
    "projects/", "https://firestore.googleapis.com/v1/projects/",
  );
  const response = await fetch(`${url}?${query}`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ name: enrollment.name, fields: topLevelFields }),
  });
  if (!response.ok) {
    console.error("Unable to update enrollment", response.status, await response.text());
    fail("Unable to update your course enrollment. Please try again.", 409);
  }
  return response.json();
};

const razorpayRequest = async (env, path, init = {}) => {
  const { keyId, keySecret } = getRazorpayCredentials(env);
  if (!keyId || !keySecret) {
    fail("Razorpay is not configured yet.", 503);
  }
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    ...init,
    headers: {
      authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
      "content-type": "application/json",
      ...init.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error("Razorpay request failed", response.status, result.error?.code);
    fail(result.error?.description || "Razorpay is temporarily unavailable.", 502);
  }
  return result;
};

const readBody = async (request) => {
  if (request.method !== "POST") fail("Method not allowed.", 405);
  try {
    return await request.json();
  } catch {
    fail("Invalid request.");
  }
};

const pricingDocument = `projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/coursePricing/introductory-2026`;
const pricingReservations = `projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/coursePricingReservations`;

const readPricing = async (env) => {
  const token = await getGoogleAccessToken(env);
  const response = await fetch(`${firestoreDocumentsUrl}/${pricingDocument}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (response.status === 404) return { token, reserved: 0, updateTime: null };
  if (!response.ok) fail("Unable to check the current course price.", 503);
  const document = await response.json();
  const reserved = Number(document.fields?.reserved?.integerValue || 0);
  if (!Number.isSafeInteger(reserved) || reserved < 0) fail("Course pricing is unavailable.", 503);
  return { token, reserved, updateTime: document.updateTime };
};

const coursePricing = async (env) => {
  const { reserved } = await readPricing(env);
  return {
    amount: reserved < INTRO_OFFER_LIMIT ? INTRO_COURSE_FEE_PAISE : REGULAR_COURSE_FEE_PAISE,
    currency: CURRENCY,
    remaining: Math.max(0, INTRO_OFFER_LIMIT - reserved),
    regularAmount: REGULAR_COURSE_FEE_PAISE,
    introLimit: INTRO_OFFER_LIMIT,
  };
};

// A quoted introductory order reserves one of the 100 places atomically.
// This is a sitewide pool across courses; a repeated checkout reuses its order.
const reserveIntroOrder = async (env, { orderId, studentId, courseId, purchaseType }) => {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const state = await readPricing(env);
    if (state.reserved >= INTRO_OFFER_LIMIT) return false;
    const response = await fetch(`${firestoreDocumentsUrl}/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:commit`, {
      method: "POST",
      headers: { authorization: `Bearer ${state.token}`, "content-type": "application/json" },
      body: JSON.stringify({ writes: [
        {
          update: { name: pricingDocument, fields: {
            reserved: { integerValue: String(state.reserved + 1) },
            limit: { integerValue: String(INTRO_OFFER_LIMIT) },
          } },
          currentDocument: state.updateTime
            ? { updateTime: state.updateTime }
            : { exists: false },
        },
        {
          update: { name: `${pricingReservations}/${orderId}`, fields: {
            studentId: { stringValue: studentId },
            courseId: { stringValue: courseId },
            purchaseType: { stringValue: purchaseType },
            amount: { integerValue: String(INTRO_COURSE_FEE_PAISE) },
            reservedAt: { timestampValue: new Date().toISOString() },
          } },
          currentDocument: { exists: false },
        },
      ] }),
    });
    if (response.ok) return true;
    const result = await response.json().catch(() => ({}));
    if (!["ABORTED", "FAILED_PRECONDITION"].includes(result.error?.status)) {
      console.error("Unable to reserve introductory course price", response.status, result.error?.status);
      fail("Unable to reserve the course price. Please try again.", 503);
    }
  }
  fail("Course pricing is busy. Please try again.", 503);
};

const releaseIntroOrder = async (env, orderId) => {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const state = await readPricing(env);
    const response = await fetch(`${firestoreDocumentsUrl}/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:commit`, {
      method: "POST",
      headers: { authorization: `Bearer ${state.token}`, "content-type": "application/json" },
      body: JSON.stringify({ writes: [
        {
          delete: `${pricingReservations}/${orderId}`,
          currentDocument: { exists: true },
        },
        {
          update: { name: pricingDocument, fields: {
            reserved: { integerValue: String(Math.max(0, state.reserved - 1)) },
            limit: { integerValue: String(INTRO_OFFER_LIMIT) },
          } },
          currentDocument: { updateTime: state.updateTime },
        },
      ] }),
    });
    if (response.ok) return;
    const result = await response.json().catch(() => ({}));
    if (!["ABORTED", "FAILED_PRECONDITION"].includes(result.error?.status)) {
      console.error("Unable to release introductory price", response.status, result.error?.status);
      return;
    }
  }
};

const FUNNEL_COOKIE = "__Host-sanhita_funnel_id";
const FUNNEL_METRICS = {
  course_visit: "visits",
  enrollment_click: "enrollmentClicks",
  checkout_open: "checkoutOpens",
  payment: "payments",
  signup_click: "signupClicks",
  signup_view: "signupViews",
  signup_attempt: "signupAttempts",
  email_link_sent: "emailLinksSent",
  signup_error: "signupErrors",
  signup_complete: "signupsCompleted",
  auth_success: "authSuccesses",
  free_lesson_open: "freeLessonOpens",
  free_quiz_complete: "freeQuizCompletions",
  checkout_view: "checkoutViews",
  payment_attempt: "paymentAttempts",
  payment_error: "paymentErrors",
  checkout_closed: "checkoutClosed",
  source_search: "sourceSearchVisits",
  source_social: "sourceSocialVisits",
  source_referral: "sourceReferralVisits",
  source_direct: "sourceDirectVisits",
};
const funnelRoot = `projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;
const validCourseId = (value) => typeof value === "string" && /^[a-zA-Z0-9_-]{1,160}$/.test(value);
const hashValue = async (value) => {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

// The marker and increment share one atomic commit. A retry, another tab or a
// repeated payment verification cannot increment the same event twice.
const recordFunnelEvent = async (env, { courseId, event, dedupeKey, amount = 0 }) => {
  const metric = FUNNEL_METRICS[event];
  if (!validCourseId(courseId) || !metric) fail("Invalid funnel event.");
  const date = new Date().toISOString().slice(0, 10);
  const marker = await hashValue(`${date}:${courseId}:${event}:${dedupeKey}`);
  const token = await getGoogleAccessToken(env);
  const daily = `${funnelRoot}/courseFunnelDaily/${date}`;
  const transforms = [
    { fieldPath: metric, increment: { integerValue: "1" } },
    { fieldPath: `courses.\`${courseId}\`.${metric}`, increment: { integerValue: "1" } },
  ];
  if (event === "payment" && Number.isSafeInteger(amount) && amount > 0) {
    transforms.push(
      { fieldPath: "revenuePaise", increment: { integerValue: String(amount) } },
      { fieldPath: `courses.\`${courseId}\`.revenuePaise`, increment: { integerValue: String(amount) } },
    );
  }
  const response = await fetch(`${firestoreDocumentsUrl}/${funnelRoot}:commit`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ writes: [
      {
        update: {
          name: `${funnelRoot}/courseFunnelMarkers/${marker}`,
          fields: { date: { stringValue: date } },
        },
        currentDocument: { exists: false },
      },
      {
        update: { name: daily, fields: { date: { stringValue: date } } },
        updateMask: { fieldPaths: ["date"] },
        updateTransforms: transforms,
      },
    ] }),
  });
  if (response.ok) return;
  const result = await response.json().catch(() => ({}));
  if (["ALREADY_EXISTS", "FAILED_PRECONDITION"].includes(result.error?.status)) return;
  console.error("Unable to store funnel event", response.status, result.error?.status);
  fail("Unable to record funnel event.", 503);
};

const handleFunnelEvent = async (request, env, url) => {
  const body = await readBody(request);
  if (request.headers.get("origin") !== url.origin) fail("Invalid event origin.", 403);
  const { courseId, event } = body;
  if (!validCourseId(courseId) || (typeof event !== "string" || !Object.hasOwn(FUNNEL_METRICS, event) || event === "payment" || event.startsWith("source_"))) {
    fail("Invalid funnel event.");
  }
  if (["signup_complete", "auth_success", "free_lesson_open", "free_quiz_complete"].includes(event)) {
    const studentId = await requireStudent(request);
    await recordFunnelEvent(env, { courseId, event, dedupeKey: studentId });
    return { ok: true };
  }
  if (event === "checkout_open") {
    const orderId = String(body.orderId || "").trim();
    if (!/^order_[a-zA-Z0-9]{8,80}$/.test(orderId)) fail("Invalid checkout order.");
    let pending;
    if (body.purchaseCode) {
      const { document } = await guestDocument(env, String(body.purchaseCode));
      pending = document?.fields?.orderId?.stringValue === orderId &&
        document?.fields?.courseId?.stringValue === courseId;
    } else {
      const studentId = await requireStudent(request);
      const { enrollment } = await getEnrollment(env, studentId, courseId);
      const fields = enrollment.fields || {};
      pending = ["certification", "liveClasses"].some((root) =>
        getFirestoreValue(fields, `${root}.payment.orderId`)?.stringValue === orderId,
      );
    }
    if (!pending) fail("Checkout order does not belong to this enrollment.", 403);
    await recordFunnelEvent(env, { courseId, event, dedupeKey: orderId });
    return { ok: true };
  }
  const existing = request.headers.get("cookie")
    ?.match(/(?:^|;\s*)__Host-sanhita_funnel_id=([a-f0-9]{64})(?:;|$)/)?.[1];
  const visitorId = existing || [...crypto.getRandomValues(new Uint8Array(32))]
    .map((byte) => byte.toString(16).padStart(2, "0")).join("");
  await recordFunnelEvent(env, { courseId, event, dedupeKey: visitorId });
  if (event === "course_visit" && ["search", "social", "referral", "direct"].includes(body.source)) {
    await recordFunnelEvent(env, { courseId, event: `source_${body.source}`, dedupeKey: visitorId });
  }
  return json({ ok: true }, {
    headers: {
      ...(!existing ? { "set-cookie": `${FUNNEL_COOKIE}=${visitorId}; Path=/; Max-Age=2592000; Secure; HttpOnly; SameSite=Lax` } : {}),
    },
  });
};

const getFunnelReport = async (request, env) => {
  if (request.method !== "GET") fail("Method not allowed.", 405);
  await requireAdmin(request);
  const start = new Date(Date.now() - 29 * 86400_000).toISOString().slice(0, 10);
  const token = await getGoogleAccessToken(env);
  const response = await fetch(`${firestoreDocumentsUrl}/${funnelRoot}:runQuery`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ structuredQuery: {
      from: [{ collectionId: "courseFunnelDaily" }],
      where: { fieldFilter: {
        field: { fieldPath: "date" }, op: "GREATER_THAN_OR_EQUAL", value: { stringValue: start },
      } },
      orderBy: [{ field: { fieldPath: "date" }, direction: "ASCENDING" }],
      limit: 31,
    } }),
  });
  if (!response.ok) fail("Unable to load funnel analytics.", 503);
  const rows = await response.json();
  const number = (field) => Number(field?.integerValue || 0);
  const metrics = [...new Set(Object.values(FUNNEL_METRICS)), "revenuePaise"];
  const days = rows.filter((row) => row.document).map(({ document }) => {
    const fields = document.fields || {};
    const courses = Object.fromEntries(Object.entries(fields.courses?.mapValue?.fields || {}).map(
      ([id, value]) => [id, Object.fromEntries(metrics.map(
        (metric) => [metric, number(value.mapValue?.fields?.[metric])],
      ))],
    ));
    return {
      date: fields.date?.stringValue,
      ...Object.fromEntries(metrics.map((metric) => [metric, number(fields[metric])])),
      courses,
    };
  });
  return { days, since: start, through: new Date().toISOString().slice(0, 10) };
};

const createOrder = async (request, env) => {
  const studentId = await requireStudent(request);
  const { courseId: rawCourseId, purchaseType: rawPurchaseType } = await readBody(request);
  const courseId = String(rawCourseId || "").trim();
  const purchaseType = String(rawPurchaseType || "certification").trim();
  if (!courseId || courseId.length > 160) fail("Course ID is required.");
  if (!["certification", "live-classes", "premium"].includes(purchaseType)) {
    fail("Invalid enrollment plan.");
  }
  if (purchaseType !== "certification" && !LIVE_CLASS_COURSE_IDS.has(courseId)) {
    fail("Live classes are not available for this course yet.", 409);
  }
  const { enrollment, token } = await getEnrollment(env, studentId, courseId);
  const fields = structuredClone(enrollment.fields || {});
  const certificationPaid =
    getFirestoreValue(fields, "certification.payment.status")?.stringValue === "paid";
  const liveClassesPaid =
    getFirestoreValue(fields, "liveClasses.payment.status")?.stringValue === "paid";
  if (purchaseType === "certification" && certificationPaid) {
    fail("This course is already paid and enrolled.", 409);
  }
  if (purchaseType === "live-classes" && !certificationPaid) {
    fail("Choose the Premium Live Plan to enroll in the course and live classes together.", 409);
  }
  if (purchaseType !== "certification" && liveClassesPaid) {
    fail("Live-class access is already active for this course.", 409);
  }
  const pendingPath = purchaseType === "certification" ? "certification" : "liveClasses";
  const existingOrderId = getFirestoreValue(fields, `${pendingPath}.payment.orderId`)?.stringValue;
  const existingAmount = Number(getFirestoreValue(fields, `${pendingPath}.payment.amount`)?.integerValue);
  const existingType = getFirestoreValue(fields, `${pendingPath}.payment.purchaseType`)?.stringValue;
  if (existingOrderId && existingType === purchaseType &&
      getFirestoreValue(fields, `${pendingPath}.payment.status`)?.stringValue === "pending" &&
      Number.isSafeInteger(existingAmount) && existingAmount > 0) {
    const previous = await razorpayRequest(env, `/orders/${encodeURIComponent(existingOrderId)}`);
    if (previous.id === existingOrderId && previous.amount === existingAmount &&
        previous.notes?.studentId === studentId && previous.notes?.courseId === courseId &&
        previous.notes?.purchaseType === purchaseType && previous.currency === CURRENCY) {
      return { keyId: getRazorpayCredentials(env).keyId, orderId: previous.id,
        amount: previous.amount, currency: CURRENCY, courseId, purchaseType };
    }
  }
  const makeOrder = (amount) => razorpayRequest(env, "/orders", {
    method: "POST",
    body: JSON.stringify({
      amount, currency: CURRENCY,
      receipt: `ns_${Date.now()}_${studentId.slice(0, 8)}`,
      notes: { studentId, courseId, purchaseType, enrollmentId: `${studentId}_${courseId}` },
    }),
  });
  let introReserved = false;
  let courseFee = 0;
  let orderAmount = LIVE_CLASS_FEE_PAISE;
  let order;
  if (purchaseType === "live-classes") {
    order = await makeOrder(orderAmount);
  } else {
    const quote = await coursePricing(env);
    courseFee = quote.amount;
    orderAmount = courseFee + (purchaseType === "premium" ? LIVE_CLASS_FEE_PAISE : 0);
    order = await makeOrder(orderAmount);
    if (courseFee === INTRO_COURSE_FEE_PAISE) {
      introReserved = await reserveIntroOrder(env, { orderId: order.id, studentId, courseId, purchaseType });
      if (!introReserved) {
        courseFee = REGULAR_COURSE_FEE_PAISE;
        orderAmount = courseFee + (purchaseType === "premium" ? LIVE_CLASS_FEE_PAISE : 0);
        order = await makeOrder(orderAmount);
      }
    }
  }
  const now = new Date().toISOString();
  setFirestoreValue(fields, `${pendingPath}.status`, { stringValue: "pending-payment" });
  setFirestoreValue(fields, `${pendingPath}.fee`, {
    integerValue: String(purchaseType === "certification" ? courseFee / 100 : purchaseType === "premium" ? orderAmount / 100 : 499),
  });
  setFirestoreValue(fields, `${pendingPath}.payment.status`, { stringValue: "pending" });
  setFirestoreValue(fields, `${pendingPath}.payment.provider`, { stringValue: "razorpay" });
  setFirestoreValue(fields, `${pendingPath}.payment.orderId`, { stringValue: order.id });
  setFirestoreValue(fields, `${pendingPath}.payment.amount`, { integerValue: String(orderAmount) });
  setFirestoreValue(fields, `${pendingPath}.payment.currency`, { stringValue: CURRENCY });
  setFirestoreValue(fields, `${pendingPath}.payment.purchaseType`, { stringValue: purchaseType });
  setFirestoreValue(fields, `${pendingPath}.payment.createdAt`, { timestampValue: now });
  if (purchaseType === "premium") {
    setFirestoreValue(fields, "certification.fee", { integerValue: String(courseFee / 100) });
  }
  try {
    await updateEnrollment({ enrollment, token, topLevelFields: {
      [pendingPath]: fields[pendingPath],
      ...(purchaseType === "premium" ? { certification: fields.certification } : {}),
      updatedAt: { timestampValue: now },
      updatedBy: { stringValue: studentId },
    } });
  } catch (error) {
    if (introReserved) {
      try { await releaseIntroOrder(env, order.id); } catch (releaseError) {
        console.error("Unable to release introductory price", releaseError.message);
      }
    }
    throw error;
  }
  return {
    keyId: getRazorpayCredentials(env).keyId,
    orderId: order.id,
    amount: orderAmount,
    currency: CURRENCY,
    courseId,
    purchaseType,
  };
};

const hexToBytes = (value) => {
  if (!/^[a-f0-9]+$/i.test(value) || value.length % 2 !== 0) return new Uint8Array();
  return Uint8Array.from(value.match(/.{2}/g), (byte) => Number.parseInt(byte, 16));
};

const signaturesMatch = async (secret, message, suppliedHex) => {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const expected = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message)),
  );
  const supplied = hexToBytes(suppliedHex);
  if (expected.length !== supplied.length) return false;
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected[index] ^ supplied[index];
  }
  return difference === 0;
};

const verifyPayment = async (request, env) => {
  const studentId = await requireStudent(request);
  const body = await readBody(request);
  const courseId = String(body.courseId || "").trim();
  const orderId = String(body.razorpayOrderId || "").trim();
  const paymentId = String(body.razorpayPaymentId || "").trim();
  const signature = String(body.razorpaySignature || "").trim();
  const purchaseType = String(body.purchaseType || "certification").trim();
  if (!courseId || !orderId || !paymentId || !signature) {
    fail("Incomplete Razorpay payment details.");
  }
  const { enrollment, token } = await getEnrollment(env, studentId, courseId);
  const fields = structuredClone(enrollment.fields || {});
  const paymentRoot = purchaseType === "certification" ? "certification" : "liveClasses";
  if (getFirestoreValue(fields, `${paymentRoot}.payment.status`)?.stringValue === "paid") {
    return { enrollmentId: `${studentId}_${courseId}`, status: "paid" };
  }
  if (getFirestoreValue(fields, `${paymentRoot}.payment.orderId`)?.stringValue !== orderId) {
    fail("Payment order does not match this enrollment.", 403);
  }
  const { keySecret } = getRazorpayCredentials(env);
  if (!keySecret) fail("Razorpay is not configured yet.", 503);
  if (!(await signaturesMatch(keySecret, `${orderId}|${paymentId}`, signature))) {
    fail("Payment verification failed.", 403);
  }
  const [order, payment] = await Promise.all([
    razorpayRequest(env, `/orders/${encodeURIComponent(orderId)}`),
    razorpayRequest(env, `/payments/${encodeURIComponent(paymentId)}`),
  ]);
  const expectedAmount = Number(getFirestoreValue(fields, `${paymentRoot}.payment.amount`)?.integerValue);
  const validAmount = Number.isSafeInteger(expectedAmount) && (
    purchaseType === "live-classes" ? expectedAmount === LIVE_CLASS_FEE_PAISE :
      purchaseType === "certification" ? [4900, INTRO_COURSE_FEE_PAISE, REGULAR_COURSE_FEE_PAISE].includes(expectedAmount) :
        [INTRO_COURSE_FEE_PAISE + LIVE_CLASS_FEE_PAISE, REGULAR_COURSE_FEE_PAISE + LIVE_CLASS_FEE_PAISE].includes(expectedAmount)
  );
  const validPayment = order.status === "paid" && payment.status === "captured" &&
    payment.order_id === orderId &&
    validAmount &&
    Number(payment.amount) === expectedAmount && Number(order.amount) === expectedAmount &&
    order.currency === CURRENCY &&
    payment.currency === CURRENCY && order.notes?.studentId === studentId &&
    order.notes?.courseId === courseId && order.notes?.purchaseType === purchaseType;
  if (!validPayment) {
    fail("Payment is not captured yet. Please wait briefly and try again.", 409);
  }
  if (purchaseType !== "live-classes" &&
      expectedAmount - (purchaseType === "premium" ? LIVE_CLASS_FEE_PAISE : 0) === INTRO_COURSE_FEE_PAISE) {
    const reservationToken = await getGoogleAccessToken(env);
    const reservationResponse = await fetch(`${firestoreDocumentsUrl}/${pricingReservations}/${orderId}`, {
      headers: { authorization: `Bearer ${reservationToken}` },
    });
    const reservation = reservationResponse.ok ? await reservationResponse.json() : null;
    if (reservation?.fields?.studentId?.stringValue !== studentId ||
        reservation?.fields?.courseId?.stringValue !== courseId ||
        reservation?.fields?.purchaseType?.stringValue !== purchaseType) {
      fail("The introductory order could not be verified. Please contact support.", 409);
    }
  }
  const now = new Date().toISOString();
  if (purchaseType === "certification" || purchaseType === "premium") {
    setFirestoreValue(fields, "certification.status", { stringValue: "active" });
    setFirestoreValue(fields, "certification.activatedAt", { timestampValue: now });
    setFirestoreValue(fields, "certification.payment.status", { stringValue: "paid" });
    setFirestoreValue(fields, "certification.fee", {
      integerValue: String((expectedAmount - (purchaseType === "premium" ? LIVE_CLASS_FEE_PAISE : 0)) / 100),
    });
    setFirestoreValue(fields, "certification.payment.provider", { stringValue: "razorpay" });
    setFirestoreValue(fields, "certification.payment.paymentId", { stringValue: paymentId });
    setFirestoreValue(fields, "certification.payment.reference", { stringValue: orderId });
    setFirestoreValue(fields, "certification.payment.paidAt", { timestampValue: now });
    setFirestoreValue(fields, "certification.access.pdfDownload", { booleanValue: true });
    setFirestoreValue(fields, "certification.access.mockTests", { booleanValue: true });
    setFirestoreValue(fields, "certification.access.finalExam", { booleanValue: false });
    setFirestoreValue(fields, "certification.mockTests.test1.status", { stringValue: "available" });
  }
  if (purchaseType === "live-classes" || purchaseType === "premium") {
    setFirestoreValue(fields, "liveClasses.hasAccess", { booleanValue: true });
    setFirestoreValue(fields, "liveClasses.status", { stringValue: "active" });
    setFirestoreValue(fields, "liveClasses.activatedAt", { timestampValue: now });
    setFirestoreValue(fields, "liveClasses.fee", { integerValue: "499" });
    setFirestoreValue(fields, "liveClasses.payment.status", { stringValue: "paid" });
    setFirestoreValue(fields, "liveClasses.payment.provider", { stringValue: "razorpay" });
    setFirestoreValue(fields, "liveClasses.payment.paymentId", { stringValue: paymentId });
    setFirestoreValue(fields, "liveClasses.payment.reference", { stringValue: orderId });
    setFirestoreValue(fields, "liveClasses.payment.paidAt", { timestampValue: now });
  }
  await updateEnrollment({ enrollment, token, topLevelFields: {
    accessType: { stringValue: "certification" },
    certification: fields.certification,
    ...(fields.liveClasses ? { liveClasses: fields.liveClasses } : {}),
    updatedAt: { timestampValue: now },
    updatedBy: { stringValue: "razorpay-verification" },
  } });
  try {
    await recordFunnelEvent(env, {
      courseId, event: "payment", dedupeKey: orderId, amount: expectedAmount,
    });
  } catch (error) {
    // The completed payment and course access must not depend on analytics.
    console.error("Verified payment analytics failed", error.message);
  }
  return { enrollmentId: `${studentId}_${courseId}`, status: "paid" };
};

// Guest receipts are bearer secrets. Only a verified Razorpay payment can
// turn one into course access; an email supplied at checkout grants no access.
const guestRoot = `projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/guestPurchases`;
const guestCodePattern = /^[a-f0-9]{64}$/;
const guestDocument = async (env, code) => {
  if (!guestCodePattern.test(code)) fail("Invalid purchase code.", 400);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(code));
  const id = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const token = await getGoogleAccessToken(env);
  const name = `${guestRoot}/${id}`;
  const response = await fetch(`${firestoreDocumentsUrl}/${name}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (response.status === 404) return { name, token, document: null };
  if (!response.ok) fail("Unable to load the purchase. Please try again.", 503);
  return { name, token, document: await response.json() };
};

const guestCheckout = async (request, env, url) => {
  if (request.headers.get("origin") !== url.origin) fail("Invalid checkout origin.", 403);
  const body = await readBody(request);
  const courseId = String(body.courseId || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const name = String(body.name || "").trim().slice(0, 120);
  if (!validCourseId(courseId) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    fail("Enter a valid course and email address.");
  }
  const existingCode = String(body.purchaseCode || "").trim();
  if (existingCode) {
    const existing = await guestDocument(env, existingCode);
    const fields = existing.document?.fields;
    if (fields?.courseId?.stringValue === courseId && fields?.email?.stringValue === email &&
        fields?.status?.stringValue === "pending") {
      const order = await razorpayRequest(env, `/orders/${encodeURIComponent(fields.orderId.stringValue)}`);
      if (order.status === "created" || order.status === "attempted") {
        return { keyId: getRazorpayCredentials(env).keyId, orderId: order.id,
          amount: order.amount, currency: CURRENCY, purchaseCode: existingCode };
      }
    }
  }
  const token = await getGoogleAccessToken(env);
  const courseResponse = await fetch(`${firestoreDocumentsUrl}/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/courses/${courseId}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!courseResponse.ok) fail("This course is not available for checkout.", 404);
  const course = await courseResponse.json();
  if (course.fields?.status?.stringValue !== "published" || course.fields?.deleted?.booleanValue === true) {
    fail("This course is not available for checkout.", 404);
  }
  const code = [...crypto.getRandomValues(new Uint8Array(32))]
    .map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const guest = await guestDocument(env, code);
  const makeOrder = (amount) => razorpayRequest(env, "/orders", {
    method: "POST",
    body: JSON.stringify({ amount, currency: CURRENCY, receipt: `guest_${Date.now()}_${code.slice(0, 8)}`,
      notes: { guestId: guest.name.split("/").at(-1), courseId, purchaseType: "certification" } }),
  });
  const quote = await coursePricing(env);
  let order = await makeOrder(quote.amount);
  let reserved = false;
  if (quote.amount === INTRO_COURSE_FEE_PAISE) {
    reserved = await reserveIntroOrder(env, {
      orderId: order.id, studentId: `guest_${guest.name.split("/").at(-1)}`,
      courseId, purchaseType: "certification",
    });
    if (!reserved) order = await makeOrder(REGULAR_COURSE_FEE_PAISE);
  }
  const response = await fetch(`${firestoreDocumentsUrl}/${guest.name}?currentDocument.exists=false`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ name: guest.name, fields: {
      courseId: { stringValue: courseId }, email: { stringValue: email },
      buyerName: { stringValue: name }, orderId: { stringValue: order.id },
      amount: { integerValue: String(order.amount) }, status: { stringValue: "pending" },
      createdAt: { timestampValue: new Date().toISOString() },
    } }),
  });
  if (!response.ok) {
    if (reserved) await releaseIntroOrder(env, order.id);
    fail("Unable to save checkout. Please try again.", 503);
  }
  return { keyId: getRazorpayCredentials(env).keyId, orderId: order.id,
    amount: order.amount, currency: CURRENCY, purchaseCode: code };
};

const guestVerify = async (request, env, url) => {
  if (request.headers.get("origin") !== url.origin) fail("Invalid checkout origin.", 403);
  const body = await readBody(request);
  const code = String(body.purchaseCode || "").trim();
  const { name, token, document } = await guestDocument(env, code);
  if (!document) fail("Purchase not found.", 404);
  const fields = document.fields;
  const orderId = fields.orderId?.stringValue;
  if (body.razorpayOrderId && body.razorpayOrderId !== orderId) {
    fail("Payment does not match this purchase.", 403);
  }
  const paymentId = String(body.razorpayPaymentId || "");
  if (paymentId) {
    const { keySecret } = getRazorpayCredentials(env);
    if (!/^pay_[a-zA-Z0-9]+$/.test(paymentId) || !keySecret ||
        !(await signaturesMatch(keySecret, `${orderId}|${paymentId}`,
          String(body.razorpaySignature || "")))) fail("Payment verification failed.", 403);
  }
  const [order, payment] = await Promise.all([
    razorpayRequest(env, `/orders/${encodeURIComponent(orderId)}`),
    paymentId ? razorpayRequest(env, `/payments/${encodeURIComponent(paymentId)}`) :
      razorpayRequest(env, `/orders/${encodeURIComponent(orderId)}/payments`),
  ]);
  const capturedPayment = paymentId ? payment : payment.items?.find((item) =>
    item.status === "captured" && item.order_id === orderId);
  const amount = Number(fields.amount?.integerValue);
  if (order.status !== "paid" || capturedPayment?.status !== "captured" ||
      capturedPayment.order_id !== orderId || capturedPayment.amount !== amount || order.amount !== amount ||
      capturedPayment.currency !== CURRENCY || order.currency !== CURRENCY ||
      order.notes?.guestId !== name.split("/").at(-1) || order.notes?.courseId !== fields.courseId?.stringValue ||
      ![INTRO_COURSE_FEE_PAISE, REGULAR_COURSE_FEE_PAISE].includes(amount)) {
    fail("Payment is not captured yet. Please try again shortly.", 409);
  }
  if (fields.status?.stringValue !== "paid") {
    if (fields.status?.stringValue !== "pending") fail("This purchase was already claimed.", 409);
    if (amount === INTRO_COURSE_FEE_PAISE) {
      const reservation = await fetch(`${firestoreDocumentsUrl}/${pricingReservations}/${orderId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (!reservation.ok || (await reservation.json()).fields?.studentId?.stringValue !==
          `guest_${name.split("/").at(-1)}`) fail("Introductory price reservation is missing.", 409);
    }
    const response = await fetch(`${firestoreDocumentsUrl}/${name}?updateMask.fieldPaths=status&updateMask.fieldPaths=paymentId&updateMask.fieldPaths=paidAt&currentDocument.updateTime=${encodeURIComponent(document.updateTime)}`, {
      method: "PATCH", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ name, fields: {
        status: { stringValue: "paid" }, paymentId: { stringValue: capturedPayment.id },
        paidAt: { timestampValue: new Date().toISOString() },
      } }),
    });
    if (!response.ok) fail("Payment captured. Please use your purchase code to recover access.", 409);
    try { await recordFunnelEvent(env, { courseId: fields.courseId.stringValue,
      event: "payment", dedupeKey: orderId, amount }); } catch (error) {
      console.error("Guest payment analytics failed", error.message);
    }
  }
  return { status: "paid", courseId: fields.courseId.stringValue };
};

const claimGuestRecord = async (env, user, { name, token, document }) => {
  const fields = document?.fields;
  if (!fields) fail("Purchase not found.", 404);
  const courseId = fields.courseId?.stringValue;
  if (fields.status?.stringValue === "claimed" && fields.claimedBy?.stringValue === user.sub) {
    return { courseId, status: "claimed" };
  }
  if (fields.status?.stringValue !== "paid") fail("This purchase is not ready to claim.", 409);
  const enrollmentName = `projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/studentEnrollments/${user.sub}_${courseId}`;
  const existingResponse = await fetch(`${firestoreDocumentsUrl}/${enrollmentName}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!existingResponse.ok && existingResponse.status !== 404) fail("Unable to check course access.", 503);
  const existing = existingResponse.ok ? await existingResponse.json() : null;
  if (existing?.fields?.certification?.mapValue?.fields?.payment?.mapValue?.fields?.status?.stringValue === "paid") {
    fail("This account already owns this course. Contact support with your purchase code.", 409);
  }
  const now = new Date().toISOString();
  const amount = Number(fields.amount.integerValue);
  const enrollmentFields = structuredClone(existing?.fields || {});
  Object.assign(enrollmentFields, {
    studentId: { stringValue: user.sub }, courseId: { stringValue: courseId },
    deleted: { booleanValue: false }, status: { stringValue: "active" },
    accessType: { stringValue: "certification" }, updatedAt: { timestampValue: now },
    updatedBy: { stringValue: "guest-claim" },
    ...(!existing ? { enrolledAt: { timestampValue: now }, createdAt: { timestampValue: now },
      createdBy: { stringValue: "guest-claim" } } : {}),
  });
  setFirestoreValue(enrollmentFields, "certification.status", { stringValue: "active" });
  setFirestoreValue(enrollmentFields, "certification.activatedAt", { timestampValue: now });
  setFirestoreValue(enrollmentFields, "certification.fee", { integerValue: String(amount / 100) });
  setFirestoreValue(enrollmentFields, "certification.payment.status", { stringValue: "paid" });
  setFirestoreValue(enrollmentFields, "certification.payment.amount", { integerValue: String(amount) });
  setFirestoreValue(enrollmentFields, "certification.payment.provider", { stringValue: "razorpay" });
  setFirestoreValue(enrollmentFields, "certification.payment.paymentId", fields.paymentId);
  setFirestoreValue(enrollmentFields, "certification.payment.reference", fields.orderId);
  setFirestoreValue(enrollmentFields, "certification.payment.paidAt", fields.paidAt);
  setFirestoreValue(enrollmentFields, "certification.access.pdfDownload", { booleanValue: true });
  setFirestoreValue(enrollmentFields, "certification.access.mockTests", { booleanValue: true });
  setFirestoreValue(enrollmentFields, "certification.access.finalExam", { booleanValue: false });
  setFirestoreValue(enrollmentFields, "certification.mockTests.test1.status", { stringValue: "available" });
  const response = await fetch(`${firestoreDocumentsUrl}/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:commit`, {
    method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ writes: [
      { update: { name: enrollmentName, fields: enrollmentFields },
        currentDocument: existing ? { updateTime: existing.updateTime } : { exists: false } },
      { update: { name, fields: { status: { stringValue: "claimed" },
        claimedBy: { stringValue: user.sub }, claimedAt: { timestampValue: now } } },
        updateMask: { fieldPaths: ["status", "claimedBy", "claimedAt"] },
        currentDocument: { updateTime: document.updateTime } },
    ] }),
  });
  if (!response.ok) fail("Unable to claim this purchase. Please try again.", 409);
  return { courseId, status: "claimed" };
};

const claimGuestPurchase = async (request, env, url) => {
  if (request.headers.get("origin") !== url.origin) fail("Invalid claim origin.", 403);
  const user = await verifyFirebaseUser(request);
  if (!user.email || user.email_verified !== true) fail("Sign in with a verified email to claim your course.", 403);
  const { purchaseCode } = await readBody(request);
  return claimGuestRecord(env, user, await guestDocument(env, String(purchaseCode || "").trim()));
};

const claimGuestPurchasesByEmail = async (request, env, url) => {
  if (request.headers.get("origin") !== url.origin) fail("Invalid claim origin.", 403);
  const user = await verifyFirebaseUser(request);
  if (!user.email || user.email_verified !== true) fail("Sign in with a verified email to find your purchases.", 403);
  await readBody(request);
  const token = await getGoogleAccessToken(env);
  const response = await fetch(`${firestoreDocumentsUrl}/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`, {
    method: "POST", headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ structuredQuery: {
      from: [{ collectionId: "guestPurchases" }],
      where: { fieldFilter: { field: { fieldPath: "email" }, op: "EQUAL",
        value: { stringValue: user.email.toLowerCase() } } },
      limit: 100,
    } }),
  });
  if (!response.ok) fail("Unable to find purchases for this email.", 503);
  const rows = await response.json();
  const claimed = [];
  for (const row of rows) {
    const document = row.document;
    if (!document || document.fields?.status?.stringValue !== "paid") continue;
    try {
      const result = await claimGuestRecord(env, user, { name: document.name, token, document });
      claimed.push(result.courseId);
    } catch (error) {
      // One duplicate purchase must not prevent other paid courses from being claimed.
      console.error("Unable to claim paid guest purchase", error.message);
    }
  }
  return { claimed };
};

const handleApi = async (request, env, url) => {
  if (url.pathname === "/api/health") {
    if (request.method !== "GET") fail("Method not allowed.", 405);
    const { keyId, keySecret } = getRazorpayCredentials(env);
    return {
      ok: true,
      service: "nagariksuraksha",
      runtime: "cloudflare-worker",
      configuration: {
        razorpay: Boolean(keyId && keySecret),
        firebaseAdmin: Boolean(getFirebaseServiceAccountJson(env)),
      },
      features: { liveClasses: true },
    };
  }
  if (url.pathname === "/api/razorpay/create-order") return createOrder(request, env);
  if (url.pathname === "/api/razorpay/verify-payment") return verifyPayment(request, env);
  if (url.pathname === "/api/guest/create-order") return guestCheckout(request, env, url);
  if (url.pathname === "/api/guest/verify-payment") return guestVerify(request, env, url);
  if (url.pathname === "/api/guest/claim") return claimGuestPurchase(request, env, url);
  if (url.pathname === "/api/guest/claim-email") return claimGuestPurchasesByEmail(request, env, url);
  if (url.pathname === "/api/course-pricing") {
    if (request.method !== "GET") fail("Method not allowed.", 405);
    return coursePricing(env);
  }
  if (url.pathname === "/api/funnel/event") return handleFunnelEvent(request, env, url);
  if (url.pathname === "/api/admin/funnel") return getFunnelReport(request, env);
  if (url.pathname === "/api/live-classes") return getLiveSessions(request, env, url);
  fail("API endpoint not found.", 404);
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try {
        if (["/api/legal-remedies/likes", "/api/legal-updates/likes", "/api/law-courses/likes"].includes(url.pathname)) {
          return await handleLegalLikes(request, env, url);
        }
        const result = await handleApi(request, env, url);
        return result instanceof Response ? result : json(result);
      } catch (error) {
        console.error("API request failed", url.pathname, error.message);
        return json(
          { error: error.message || "Unexpected payment service error." },
          { status: Number(error.status) || 500 },
        );
      }
    }
    const legacyLegalPath = url.pathname.match(/^\/legal-updates\/([^/]+)\/?$/);
    if (legacyLegalPath && Object.hasOwn(LEGAL_UPDATE_SOCIAL_META, `/legal-remedies/${legacyLegalPath[1]}`)) {
      url.pathname = `/legal-remedies/${legacyLegalPath[1]}`;
      return Response.redirect(url.toString(), 301);
    }
    if (/^\/llb-courses\/?$/.test(url.pathname)) {
      url.pathname = "/law-courses";
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === "/sitemap.xml") {
      try {
        return await courseSitemap(request, env);
      } catch (error) {
        console.error("Unable to extend course sitemap", error.message);
        return env.ASSETS.fetch(request);
      }
    }
    const assetResponse = await env.ASSETS.fetch(request);

    if (
      /^\/(?:live-online-classes|share\/live-online-classes-card-v3)\/?$/.test(url.pathname) &&
      assetResponse.headers.get("content-type")?.includes("text/html")
    ) {
      const canonicalUrl = `${url.origin}/live-online-classes`;
      const socialUrl = url.pathname.startsWith("/share/")
        ? `${url.origin}${url.pathname}`
        : canonicalUrl;

      return rewriteCourseSocialMetadata(
        assetResponse,
        {
          title: "Live Online Law Classes | Sanhita360",
          description: "Join approximately eight chapter-wise, 45-minute interactive online law classes. Ask questions live and strengthen your legal studies.",
          image: `${url.origin}/live-online-classes-og.jpg`,
          imageWidth: 1200,
          imageHeight: 675,
        },
        canonicalUrl,
        socialUrl,
      );
    }

    if (
      /^\/(?:law-courses|share\/certificate-courses-card-v3)\/?$/.test(url.pathname) &&
      assetResponse.headers.get("content-type")?.includes("text/html")
    ) {
      const canonicalUrl = `${url.origin}/law-courses`;
      const socialUrl = url.pathname.startsWith("/share/")
        ? `${url.origin}${url.pathname}`
        : canonicalUrl;

      let priceDescription = "";
      try {
        const quote = await coursePricing(env);
        priceDescription = ` Current course enrollment price: ₹${quote.amount / 100}${quote.remaining > 0 ? " for the first 100 checkout reservations; then ₹299" : ""}.`;
      } catch (error) {
        console.error("Unable to add current catalogue price metadata", error.message);
      }
      return rewriteCourseSocialMetadata(
        assetResponse,
        {
          title: "Certificate Courses in Legal Studies | Sanhita360",
          description: `Explore chapter-wise certificate courses in legal studies with study materials, mock tests and certification pathways at Sanhita360.${priceDescription}`,
          image: `${url.origin}/certificate-courses-hero.jpg`,
          imageWidth: 1200,
          imageHeight: 675,
        },
        canonicalUrl,
        socialUrl,
      );
    }

    const legalUpdatePath = url.pathname.replace(/\/$/, "");
    const legalUpdateMeta = LEGAL_UPDATE_SOCIAL_META[legalUpdatePath];
    if (
      legalUpdateMeta &&
      assetResponse.headers.get("content-type")?.includes("text/html")
    ) {
      const canonicalUrl = `${url.origin}${legalUpdatePath}`;
      const shareVersion = url.searchParams.get("share");
      const socialUrl = shareVersion
        ? `${canonicalUrl}?share=${encodeURIComponent(shareVersion)}`
        : canonicalUrl;

      return rewriteCourseSocialMetadata(
        assetResponse,
        {
          ...legalUpdateMeta,
          image: `${url.origin}${legalUpdateMeta.image}`,
          imageWidth: 1200,
          imageHeight: 675,
        },
        canonicalUrl,
        socialUrl,
      );
    }

    const courseMatch = url.pathname.match(/^\/courses\/([^/]+)\/?$/);
    if (
      courseMatch &&
      assetResponse.headers.get("content-type")?.includes("text/html")
    ) {
      try {
        const slug = decodeURIComponent(courseMatch[1]).trim().toLowerCase();
        const canonicalUrl = `${url.origin}/courses/${encodeURIComponent(slug)}`;
        const shareVersion = url.searchParams.get("share");
        const socialUrl = shareVersion
          ? `${canonicalUrl}?share=${encodeURIComponent(shareVersion)}`
          : canonicalUrl;
        const [metadataResult, pricingResult] = await Promise.allSettled([
          loadCourseSocialMeta(env, slug), coursePricing(env),
        ]);
        const metadata = metadataResult.status === "fulfilled" ? metadataResult.value : null;
        const price = pricingResult.status === "fulfilled" ? pricingResult.value.amount : null;
        if (metadata) {
          return rewriteCourseSocialMetadata(
            assetResponse,
            { ...metadata, coursePricePaise: price },
            canonicalUrl,
            socialUrl,
          );
        }
      } catch (error) {
        console.error("Unable to prepare course social preview", error.message);
      }
    }

    const postMatch = url.pathname.match(/^\/posts\/([^/]+)\/?$/);
    if (
      postMatch &&
      assetResponse.headers.get("content-type")?.includes("text/html")
    ) {
      try {
        const slug = decodeURIComponent(postMatch[1]).trim();
        const canonicalUrl = `${url.origin}/posts/${encodeURIComponent(slug)}`;
        const shareVersion = url.searchParams.get("share");
        const socialUrl = shareVersion
          ? `${canonicalUrl}?share=${encodeURIComponent(shareVersion)}`
          : canonicalUrl;
        const bundledMetadata = BUNDLED_POST_SOCIAL_META[slug];
        let metadata;
        try {
          metadata = await loadPostSocialMeta(env, slug);
        } catch (error) {
          console.error("Unable to load post social metadata", slug, error.message);
        }
        metadata ||= bundledMetadata;
        if (metadata && !metadata.image && bundledMetadata) {
          metadata = { ...metadata, image: bundledMetadata.image };
        }
        if (metadata) {
          return rewriteCourseSocialMetadata(
            assetResponse,
            { ...metadata, image: metadata.image ? new URL(metadata.image, url.origin).href : "" },
            canonicalUrl,
            socialUrl,
          );
        }
      } catch (error) {
        console.error("Unable to prepare post social preview", error.message);
      }
    }

    return assetResponse;
  },
};
