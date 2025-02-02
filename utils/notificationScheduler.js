
import cron from "node-cron";
import Notification from "../Models/Notification.js";
import profileModel from "../Models/userprofile.js";
import { checkAvailability } from "./checkAvailability.js";


export const startNotificationScheduler = () => {
  cron.schedule("*/30 * * * * *", async () => {
    console.log(" Checking for pending notifications at", new Date().toLocaleString());

    try {
      // Fetch all notifications that are queued (not delivered yet)
      const notifications = await Notification.find({ status: "Queued" });

      if (!notifications.length) {
        console.log(" No pending notifications.");
        return;
      }

      let isAnyUserAvailable = false;

      // Loop through each queued notification
      for (const notification of notifications) {
        // Fetch sender profile using profile._id (senderId should match profile._id)
        const senderProfile = await profileModel.findById(notification.senderId);

        if (!senderProfile) {
          console.error(" Sender profile not found for notification:", notification._id);
          continue;
        }

        // Loop through each recipientId
        for (const recipientId of notification.recipientIds) {
          // Fetch recipient profile using profile._id (recipientId should match profile._id)
          const recipientProfile = await profileModel.findById(recipientId);

          if (!recipientProfile) {
            console.error(` Recipient profile not found: ${recipientId}`);
            continue;
          }

          let canSendNotification = false;
          const now = new Date();

          // Critical notifications are sent immediately
          if (notification.type === "Critical") {
            canSendNotification = true;
          } else {
            // Non-Critical notifications are sent based on recipient's availability
            if (checkAvailability(recipientProfile.availabilityTime)) {
              canSendNotification = true;
            }
          }

          if (canSendNotification) {
            console.log(` Sending notification from ${senderProfile.name} to ${recipientProfile.name}: ${notification.message}`);

            // Update notification status to 'Delivered'
            notification.status = "Delivered";
            notification.deliveredAt = now;
            await notification.save();

            isAnyUserAvailable = true;
          }
        }
      }

      console.log(isAnyUserAvailable ? " Notifications sent successfully." : " No users available for notifications.");
    } catch (error) {
      console.error(" Error in sending notifications:", error);
    }
  });
};