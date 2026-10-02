-- CreateEnum
CREATE TYPE "ContactMessageStatus" AS ENUM ('new', 'read', 'replied', 'archived');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('upcoming', 'past', 'canceled');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('pending', 'approved', 'spam');

-- AlterTable: preserve existing values via explicit cast
ALTER TABLE "contact_messages"
  ALTER COLUMN "status" DROP DEFAULT,
  ALTER COLUMN "status" TYPE "ContactMessageStatus" USING "status"::"ContactMessageStatus",
  ALTER COLUMN "status" SET DEFAULT 'new';

ALTER TABLE "events"
  ALTER COLUMN "status" DROP DEFAULT,
  ALTER COLUMN "status" TYPE "EventStatus" USING "status"::"EventStatus",
  ALTER COLUMN "status" SET DEFAULT 'upcoming';

ALTER TABLE "comments"
  ALTER COLUMN "status" DROP DEFAULT,
  ALTER COLUMN "status" TYPE "CommentStatus" USING "status"::"CommentStatus",
  ALTER COLUMN "status" SET DEFAULT 'pending';
