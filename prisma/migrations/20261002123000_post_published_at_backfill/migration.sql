-- Backfill publishedAt for already-published posts so the public filter is consistent.
UPDATE "posts" SET "publishedAt" = "createdAt" WHERE "published" = true AND "publishedAt" IS NULL;
