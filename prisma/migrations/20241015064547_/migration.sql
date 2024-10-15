-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE';
