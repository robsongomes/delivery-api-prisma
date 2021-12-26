/*
  Warnings:

  - You are about to drop the column `user_id` on the `deliveries` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `deliveries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryman_id` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "deliveries" DROP CONSTRAINT "deliveries_user_id_fkey";

-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "user_id",
ADD COLUMN     "client_id" TEXT NOT NULL,
ADD COLUMN     "deliveryman_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_deliveryman_id_fkey" FOREIGN KEY ("deliveryman_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
