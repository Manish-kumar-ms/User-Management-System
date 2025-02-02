import Notification from "../Models/Notification.js";
import userAdminModel from "../Models/userAdmin.js";
import profileModel from "../Models/userprofile.js";
import { checkAvailability } from "../utils/checkAvailability.js";

export const sendNotification = async (req, res) => {
    try {
      const { recipientIds, message, type } = req.body;
      const senderId = req.user._id.toString(); // Get sender ID from authentication middleware
  
      // Check if required fields are present
      if (!recipientIds || recipientIds.length === 0 || !message) {
        return res.status(400).json({ message: "Recipient IDs and message are required" });
      }
  
      // Fetch the sender's profile and populate the role from the usersAdmin collection
      const senderProfile = await profileModel
        .findOne({ userId: senderId })
        .populate("userId", "role");  // Populate the role from the usersAdmin collection
  
      if (!senderProfile) {
        return res.status(404).json({ message: "Sender profile not found" });
      }
  
      let notifications = [];
  
      // Check if sender is Admin or User, and handle accordingly
      const isAdmin = senderProfile.userId.role === "Admin";  // Access role from populated userId
  
      // If sender is Admin, `type` is required, otherwise no need for type
      if (isAdmin && !type) {
        return res.status(400).json({ message: "Type is required when sender is Admin" });
      }
  
      // Loop through recipientIds and create notifications
      for (const recipientId of recipientIds) {
        const recipientProfile = await profileModel.findById(recipientId);
        if (!recipientProfile) {
          return res.status(404).json({ message: `Profile not found for user ${recipientId}` });
        }
  
        let status = "Queued";
        let deliveredAt = null;
        const now = new Date();
  
        // Admin specific logic: If sender is Admin and type is Critical, deliver immediately
        if (isAdmin && type === "Critical") {
          status = "Delivered";
          deliveredAt = now;
        } else {
          // User specific logic: If sender is User, check recipient's availability
          if (checkAvailability(recipientProfile.availabilityTime)) {
            status = "Delivered";
            deliveredAt = now;
          }
        }
  
        // Store type only if sender is Admin
        const notification = await Notification.create({
          senderId: senderProfile._id,
          recipientIds: [recipientId],
          message,
          type: isAdmin ? type : undefined,
          status,
          sentAt: now,
          deliveredAt
        });
  
        notifications.push(notification);
      }
  
      return res.status(201).json({
        message: "Notification(s) processed successfully",
        notifications
      });
  
    } catch (error) {
      res.status(500).json({ message: "Problem sending notification", error: error.message });
    }
  };
  