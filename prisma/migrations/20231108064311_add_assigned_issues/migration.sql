-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assignedToUsersId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUsersId_fkey` FOREIGN KEY (`assignedToUsersId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
