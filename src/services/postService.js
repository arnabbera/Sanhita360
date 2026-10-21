import { ALIPORE_BOMB_CASE_POST } from "../features/public/posts/data/aliporeBombCasePost";
import { KANAILAL_DUTTA_POST } from "../features/public/posts/data/kanailalDuttaPost";
import { DIGITAL_DEFAMATION_POST } from "../features/public/posts/data/digitalDefamationPost";
import {
  createPostModel,
} from "../models/PostModel";

import postRepository from "../repositories/PostRepository";

import {
  MASTERDA_SURYA_SEN_POST,
} from "../features/public/posts/data/masterdaSuryaSenPost";
import { BENOY_BADAL_DINESH_POST } from "../features/public/posts/data/benoyBadalDineshPost";
import { PRAFULLA_CHAKI_POST } from "../features/public/posts/data/prafullaChakiPost";
import { BINA_DAS_POST } from "../features/public/posts/data/binaDasPost";
import { BAGHA_JATIN_POST } from "../features/public/posts/data/baghaJatinPost";
import { ULLASKAR_DUTTA_POST } from "../features/public/posts/data/ullaskarDuttaPost";

// =========================================================
// HELPERS
// =========================================================

const normalizeSlug = (
  value = "",
) =>
  value
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9\s-]/g,
      "",
    )
    .replace(
      /\s+/g,
      "-",
    )
    .replace(
      /-+/g,
      "-",
    );

const bundledPosts = [
  ALIPORE_BOMB_CASE_POST,
  KANAILAL_DUTTA_POST,
  DIGITAL_DEFAMATION_POST,
  ULLASKAR_DUTTA_POST,
  BAGHA_JATIN_POST,
  BINA_DAS_POST,
  PRAFULLA_CHAKI_POST,
  BENOY_BADAL_DINESH_POST,
  MASTERDA_SURYA_SEN_POST,
];

const getBundledPostById = (
  id,
) =>
  bundledPosts.find(
    (post) => post.id === id,
  ) || null;

const mergePostsBySlug = (
  primaryPosts = [],
  fallbackPosts = [],
) =>
  [
    ...primaryPosts,
    ...fallbackPosts,
  ].filter(
    (post, index, posts) =>
      posts.findIndex(
        (candidate) =>
          candidate.slug === post.slug,
      ) === index,
  );

// =========================================================
// ADMIN - ALL POSTS
// =========================================================

export const getAllPosts =
  async () => {
    const repositoryPosts =
      await postRepository.getAllPosts();

    return mergePostsBySlug(
      repositoryPosts,
      bundledPosts,
    ).sort(
      (first, second) =>
        Number(first.displayOrder || 0) -
        Number(second.displayOrder || 0),
    );
  };

// =========================================================
// PUBLIC - PUBLISHED POSTS
// =========================================================

export const getPublishedPosts =
  async (
    options = {},
  ) => {
    let repositoryPosts = [];

    try {
      repositoryPosts =
        await postRepository.getPublished(
          options,
        );
    } catch (
      repositoryError
    ) {
      console.error(
        "Unable to load Firebase posts; showing bundled posts:",
        repositoryError,
      );
    }

    const mergedPosts = mergePostsBySlug(
      Array.isArray(repositoryPosts)
        ? repositoryPosts
        : [],
      bundledPosts,
    );

    return mergedPosts
      .filter((post) =>
        options.featured === null ||
        options.featured === undefined
          ? true
          : Boolean(post.featured) === Boolean(options.featured),
      )
      .filter((post) =>
        options.category
          ? post.category === options.category
          : true,
      )
      .sort(
        (first, second) =>
          Number(first.displayOrder || 0) -
          Number(second.displayOrder || 0),
      )
      .slice(0, options.pageSize || 50);
  };

// =========================================================
// PUBLIC - POST BY SLUG
// =========================================================

export const getPostBySlug =
  async (
    slug,
  ) => {
    if (!slug) {
      return null;
    }

    const normalizedSlug =
      normalizeSlug(
        slug,
      );

    const repositoryPost =
      await postRepository.getBySlug(
        normalizedSlug,
      );

    if (repositoryPost) {
      return repositoryPost;
    }

    return bundledPosts.find(
      (post) =>
        post.slug === normalizedSlug,
    ) || null;
  };

// =========================================================
// POST BY ID
// =========================================================

export const getPostById =
  async (
    id,
  ) => {
    if (!id) {
      return null;
    }

    return postRepository.getById(
      id,
    );
  };

// =========================================================
// CREATE POST
// =========================================================

export const createPost =
  async (
    postData,
    createdBy = "system",
  ) => {
    if (
      !postData
        ?.title
        ?.trim()
    ) {
      throw new Error(
        "Post title is required.",
      );
    }

    const slug =
      normalizeSlug(
        postData.slug ||
          postData.title,
      );

    if (!slug) {
      throw new Error(
        "A valid post slug is required.",
      );
    }

    const allPosts =
      await postRepository.getAllPosts();

    const duplicate =
      allPosts.find(
        (
          post,
        ) =>
          !post.deleted &&
          post.slug ===
            slug,
      );

    if (
      duplicate
    ) {
      throw new Error(
        "A post with this slug already exists.",
      );
    }

    const documentId =
      postData.id ||
      slug;

    const post =
      createPostModel({
        ...postData,

        id:
          documentId,

        slug,

        createdBy,

        updatedBy:
          createdBy,
      });

    return postRepository.create(
      documentId,
      post,
    );
  };

// =========================================================
// UPDATE POST
// =========================================================

export const updatePost =
  async (
    postId,
    postData,
    updatedBy = "system",
  ) => {
    if (
      !postId
    ) {
      throw new Error(
        "Post ID is required.",
      );
    }

    const repositoryExisting =
      await postRepository.getById(
        postId,
      );

    const existing =
      repositoryExisting ||
      getBundledPostById(postId);

    if (
      !existing
    ) {
      throw new Error(
        "Post not found.",
      );
    }

    const slug =
      normalizeSlug(
        postData.slug ||
          postData.title ||
          existing.slug,
      );

    if (!slug) {
      throw new Error(
        "A valid post slug is required.",
      );
    }

    const allPosts =
      await postRepository.getAllPosts();

    const duplicate =
      allPosts.find(
        (
          post,
        ) =>
          !post.deleted &&
          post.id !==
            postId &&
          post.slug ===
            slug,
      );

    if (
      duplicate
    ) {
      throw new Error(
        "Another post already uses this slug.",
      );
    }

    const {
      desktopImageUrl =
        existing
          ?.media
          ?.desktop
          ?.url ||
        "",

      desktopImagePublicId =
        existing
          ?.media
          ?.desktop
          ?.publicId ||
        "",

      desktopImageStoragePath =
        existing
          ?.media
          ?.desktop
          ?.storagePath ||
        "",

      desktopImageFileName =
        existing
          ?.media
          ?.desktop
          ?.fileName ||
        "",

      desktopImageSize =
        existing
          ?.media
          ?.desktop
          ?.size ||
        0,

      mobileImageUrl =
        existing
          ?.media
          ?.mobile
          ?.url ||
        "",

      mobileImagePublicId =
        existing
          ?.media
          ?.mobile
          ?.publicId ||
        "",

      mobileImageStoragePath =
        existing
          ?.media
          ?.mobile
          ?.storagePath ||
        "",

      mobileImageFileName =
        existing
          ?.media
          ?.mobile
          ?.fileName ||
        "",

      mobileImageSize =
        existing
          ?.media
          ?.mobile
          ?.size ||
        0,

      ...postFields
    } = postData;

    const media = {
      desktop: {
        ...existing
          ?.media
          ?.desktop,

        url:
          desktopImageUrl,

        publicId:
          desktopImagePublicId,

        storagePath:
          desktopImageStoragePath,

        fileName:
          desktopImageFileName,

        size:
          Number(
            desktopImageSize ||
              0,
          ),

        ratio:
          "16:9",
      },

      mobile: {
        ...existing
          ?.media
          ?.mobile,

        url:
          mobileImageUrl,

        publicId:
          mobileImagePublicId,

        storagePath:
          mobileImageStoragePath,

        fileName:
          mobileImageFileName,

        size:
          Number(
            mobileImageSize ||
              0,
          ),

        ratio:
          "9:16",
      },
    };

    const updateData = {
      ...postFields,

      slug,

      media,

      updatedBy,

      version:
        Number(
          existing.version ||
            1,
        ) + 1,
    };

    if (repositoryExisting) {
      return postRepository.update(
        postId,
        updateData,
      );
    }

    return postRepository.create(
      postId,
      createPostModel({
        ...updateData,
        id: postId,
        desktopImageUrl:
          media.desktop.url,
        desktopImagePublicId:
          media.desktop.publicId,
        desktopImageStoragePath:
          media.desktop.storagePath,
        desktopImageFileName:
          media.desktop.fileName,
        desktopImageSize:
          media.desktop.size,
        mobileImageUrl:
          media.mobile.url,
        mobileImagePublicId:
          media.mobile.publicId,
        mobileImageStoragePath:
          media.mobile.storagePath,
        mobileImageFileName:
          media.mobile.fileName,
        mobileImageSize:
          media.mobile.size,
        createdBy:
          existing.createdBy ||
          updatedBy,
      }),
    );
  };

// =========================================================
// PUBLISH POST
// =========================================================

export const publishPost =
  async (
    postId,
  ) =>
    postRepository.publish(
      postId,
    );

// =========================================================
// ARCHIVE POST
// =========================================================

export const archivePost =
  async (
    postId,
  ) =>
    postRepository.archive(
      postId,
    );

// =========================================================
// FEATURE POST
// =========================================================

export const setPostFeatured =
  async (
    postId,
    featured,
  ) =>
    postRepository.setFeatured(
      postId,
      featured,
    );

// =========================================================
// DELETE POST
// =========================================================

export const deletePost =
  async (
    postId,
    deletedBy = "system",
  ) =>
    postRepository.softDelete(
      postId,
      deletedBy,
    );

// =========================================================
// DEFAULT EXPORT
// =========================================================

export default {
  getAllPosts,
  getPublishedPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  publishPost,
  archivePost,
  setPostFeatured,
  deletePost,
};
