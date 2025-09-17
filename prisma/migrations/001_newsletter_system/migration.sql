-- CreateEnum pour les types de newsletters
CREATE TYPE "NewsletterType" AS ENUM ('GENERAL', 'FORMATION', 'CYBERSECURITY', 'CLOUD', 'EARLY_ACCESS', 'ENTERPRISE', 'DEVELOPER');

-- CreateEnum pour les statuts d'abonnement
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED', 'BOUNCED', 'PENDING_CONFIRMATION');

-- CreateEnum pour les sources d'inscription
CREATE TYPE "SubscriptionSource" AS ENUM ('HOMEPAGE', 'ABOUT_PAGE', 'FORMATION_PAGE', 'ENTERPRISE_PAGE', 'CONTACT_FORM', 'POPUP', 'FOOTER', 'SOCIAL_MEDIA', 'REFERRAL');

-- Modifier la table Subscriber existante
ALTER TABLE "Subscriber" 
ADD COLUMN "firstName" TEXT,
ADD COLUMN "lastName" TEXT,
ADD COLUMN "company" TEXT,
ADD COLUMN "jobTitle" TEXT,
ADD COLUMN "phone" TEXT,
ADD COLUMN "source" "SubscriptionSource" NOT NULL DEFAULT 'HOMEPAGE',
ADD COLUMN "referrer" TEXT,
ADD COLUMN "gdprConsent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "status" "SubscriptionStatus" NOT NULL DEFAULT 'PENDING_CONFIRMATION',
ADD COLUMN "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "verificationToken" TEXT,
ADD COLUMN "lastActiveAt" TIMESTAMP(3),
ADD COLUMN "unsubscribedAt" TIMESTAMP(3);

-- Supprimer les anciennes colonnes
ALTER TABLE "Subscriber" 
DROP COLUMN "interest",
DROP COLUMN "consent";

-- CreateTable NewsletterSubscription
CREATE TABLE "NewsletterSubscription" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "type" "NewsletterType" NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "frequency" TEXT,
    "tags" TEXT[],
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),
    "lastSentAt" TIMESTAMP(3),

    CONSTRAINT "NewsletterSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable SubscriberInteraction
CREATE TABLE "SubscriberInteraction" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubscriberInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable EmailCampaign
CREATE TABLE "EmailCampaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "newsletterType" "NewsletterType" NOT NULL,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "openCount" INTEGER NOT NULL DEFAULT 0,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "unsubscribeCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "scheduledAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable EmailTemplate
CREATE TABLE "EmailTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "textContent" TEXT,
    "newsletterType" "NewsletterType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscription_subscriberId_type_key" ON "NewsletterSubscription"("subscriberId", "type");

-- AddForeignKey
ALTER TABLE "NewsletterSubscription" ADD CONSTRAINT "NewsletterSubscription_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriberInteraction" ADD CONSTRAINT "SubscriberInteraction_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;