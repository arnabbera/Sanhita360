import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  browserLocalPersistence,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  setPersistence,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { APP_CONFIG } from "../constants/appConfig";
import { USER_ROLES } from "../constants/enums";
import { auth } from "../firebase/firebase";
import { createUserModel } from "../models/UserModel";
import { userRepository } from "../repositories/UserRepository";
import { generateEnrollmentId } from "./enrollmentService";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

const normalizeEmail = (email = "") =>
  email.trim().toLowerCase();

export const getRoleFromEmail = (email) =>
  normalizeEmail(email) ===
  normalizeEmail(APP_CONFIG.ADMIN_EMAIL)
    ? USER_ROLES.ADMIN
    : USER_ROLES.STUDENT;

export const createAuthenticatedUserProfile = async (
  firebaseUser,
) => {
  if (!firebaseUser?.uid || !firebaseUser?.email) {
    throw new Error(
      "A valid authenticated user is required.",
    );
  }

  const email = normalizeEmail(firebaseUser.email);
  const role = getRoleFromEmail(email);

  const existingUser =
    await userRepository.getByUid(firebaseUser.uid);

  // ==========================================
  // EXISTING USER
  // ==========================================

  if (existingUser) {
    let enrollmentId =
      existingUser.enrollmentId || null;

    /*
     * Existing student accounts created before
     * Enrollment ID support may have:
     *
     * enrollmentId: null
     *
     * Assign an Enrollment ID automatically the
     * next time that student authenticates.
     */
    if (
      role === USER_ROLES.STUDENT &&
      !enrollmentId
    ) {
      enrollmentId =
        await generateEnrollmentId();
    }

    /*
     * Admin accounts do not receive student
     * Enrollment IDs.
     */
    if (role === USER_ROLES.ADMIN) {
      enrollmentId = null;
    }

    return userRepository.update(
      firebaseUser.uid,
      {
        email,

        displayName:
          firebaseUser.displayName ||
          existingUser.displayName ||
          "",

        photoURL:
          firebaseUser.photoURL ||
          existingUser.photoURL ||
          "",

        phone:
          firebaseUser.phoneNumber ||
          existingUser.phone ||
          "",

        emailVerified:
          firebaseUser.emailVerified ??
          existingUser.emailVerified ??
          false,

        role,

        enrollmentId,

        previousLoginAt:
          existingUser.lastLoginAt || null,

        lastLoginAt: new Date(),

        loginCount:
          Number(existingUser.loginCount || 0) + 1,

        updatedBy: firebaseUser.uid,

        version:
          Number(existingUser.version || 1) + 1,
      },
    );
  }

  // ==========================================
  // NEW USER
  // ==========================================

  let enrollmentId = null;

  /*
   * Generate an Enrollment ID only for students.
   */
  if (role === USER_ROLES.STUDENT) {
    enrollmentId =
      await generateEnrollmentId();
  }

  const userModel = createUserModel({
    uid: firebaseUser.uid,

    enrollmentId,

    email,

    displayName:
      firebaseUser.displayName || "",

    photoURL:
      firebaseUser.photoURL || "",

    phone:
      firebaseUser.phoneNumber || "",

    role,

    emailVerified:
      firebaseUser.emailVerified || false,

    loginCount: 1,

    previousLoginAt: null,

    lastLoginAt: new Date(),

    createdBy: firebaseUser.uid,

    updatedBy: firebaseUser.uid,
  });

  return userRepository.create(
    firebaseUser.uid,
    userModel,
  );
};

export const loginWithGoogle = async () => {
  await setPersistence(
    auth,
    browserLocalPersistence,
  );

  const loginResult =
    await signInWithPopup(
      auth,
      googleProvider,
    );

  const profile =
    await createAuthenticatedUserProfile(
      loginResult.user,
    );

  return {
    firebaseUser:
      loginResult.user,

    profile,
    isNewUser: getAdditionalUserInfo(loginResult)?.isNewUser === true,
  };
};

export const emailLinkPendingKey = "sanhita360-email-link-address";

export const emailLinkOnCurrentPage = () =>
  isSignInWithEmailLink(auth, window.location.href);

export const requestEmailSignInLink = async (email, next = "/student", { signUp = false, source = "" } = {}) => {
  const returnUrl = new URL(signUp ? "/signup?source=law-courses" : "/login", window.location.origin);
  returnUrl.searchParams.set("next", next);
  if (!signUp && source === "law-courses") returnUrl.searchParams.set("source", source);
  await sendSignInLinkToEmail(auth, normalizeEmail(email), {
    url: returnUrl.href,
    handleCodeInApp: true,
  });
  window.localStorage.setItem(emailLinkPendingKey, normalizeEmail(email));
};

export const loginWithEmailLink = async (email, { fullName = "" } = {}) => {
  await setPersistence(auth, browserLocalPersistence);
  const result = await signInWithEmailLink(auth, normalizeEmail(email), window.location.href);
  const { user } = result;
  const name = fullName.trim().replace(/\s+/g, " ").slice(0, 120);
  if (name && !user.displayName) {
    try {
      await updateProfile(user, { displayName: name });
    } catch (error) {
      console.warn("Unable to save signup name to Firebase Auth", error);
    }
  }
  window.localStorage.removeItem(emailLinkPendingKey);
  return { firebaseUser: user, profile: await createAuthenticatedUserProfile(user), isNewUser: getAdditionalUserInfo(result)?.isNewUser === true };
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const subscribeToAuthentication = (
  callback,
) => onAuthStateChanged(
  auth,
  callback,
);

export const getCurrentFirebaseUser = () =>
  auth.currentUser;

export const isAdminEmail = (email) =>
  getRoleFromEmail(email) ===
  USER_ROLES.ADMIN;
