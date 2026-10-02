-- Content Hub project/case-study domain.
-- Additive migration: existing authentication, blog, event and contact data is untouched.

CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');

CREATE TYPE "ProjectSectionType" AS ENUM (
  'CONTEXT',
  'PROBLEM',
  'OBJECTIVES',
  'CONSTRAINTS',
  'ARCHITECTURE',
  'DECISIONS',
  'IMPLEMENTATION',
  'RESULTS',
  'LEARNINGS',
  'EVIDENCE',
  'CUSTOM'
);

CREATE TABLE "Project" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "excerpt" TEXT,
  "description" TEXT,
  "client" TEXT,
  "category" TEXT,
  "role" TEXT,
  "status" "ProjectStatus" NOT NULL DEFAULT 'DRAFT',
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "publishedAt" TIMESTAMP(3),
  "startedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "repositoryUrl" TEXT,
  "demoUrl" TEXT,
  "websiteUrl" TEXT,
  "coverMediaId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProjectSection" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "type" "ProjectSectionType" NOT NULL,
  "title" TEXT,
  "content" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "ProjectSection_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Media" (
  "id" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "filename" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER,
  "alt" TEXT,
  "caption" TEXT,
  "width" INTEGER,
  "height" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProjectMedia" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "mediaId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "caption" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ProjectMedia_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SeoMetadata" (
  "id" TEXT NOT NULL,
  "title" TEXT,
  "description" TEXT,
  "ogImage" TEXT,
  "canonicalUrl" TEXT,
  "projectId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "SeoMetadata_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE INDEX "Project_status_idx" ON "Project"("status");
CREATE INDEX "Project_status_publishedAt_idx" ON "Project"("status", "publishedAt");
CREATE INDEX "Project_featured_sortOrder_idx" ON "Project"("featured", "sortOrder");
CREATE INDEX "Project_category_idx" ON "Project"("category");

CREATE INDEX "ProjectSection_projectId_sortOrder_idx" ON "ProjectSection"("projectId", "sortOrder");
CREATE INDEX "ProjectSection_projectId_type_idx" ON "ProjectSection"("projectId", "type");

CREATE UNIQUE INDEX "ProjectMedia_projectId_mediaId_key" ON "ProjectMedia"("projectId", "mediaId");
CREATE INDEX "ProjectMedia_projectId_sortOrder_idx" ON "ProjectMedia"("projectId", "sortOrder");

CREATE UNIQUE INDEX "SeoMetadata_projectId_key" ON "SeoMetadata"("projectId");

ALTER TABLE "Project"
  ADD CONSTRAINT "Project_coverMediaId_fkey"
  FOREIGN KEY ("coverMediaId") REFERENCES "Media"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ProjectSection"
  ADD CONSTRAINT "ProjectSection_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "Project"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProjectMedia"
  ADD CONSTRAINT "ProjectMedia_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "Project"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProjectMedia"
  ADD CONSTRAINT "ProjectMedia_mediaId_fkey"
  FOREIGN KEY ("mediaId") REFERENCES "Media"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SeoMetadata"
  ADD CONSTRAINT "SeoMetadata_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "Project"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
