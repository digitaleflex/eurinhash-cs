-- AlterTable: add ownership column
ALTER TABLE "contact_messages" ADD COLUMN "userId" TEXT;

-- Normalize existing rows: link to the matching account by email (case-insensitive)
UPDATE "contact_messages" cm
SET "userId" = u.id
FROM "users" u
WHERE cm.email = u.email;

-- AddForeignKey
ALTER TABLE "contact_messages"
ADD CONSTRAINT "contact_messages_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "contact_messages_userId_idx" ON "contact_messages"("userId");
