import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile",
        required: true
    },
    recipientIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile",
        required: true
    }],
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Critical", "Non-Critical"],
        
    },
    status: {
        type: String,
        enum: ["Delivered", "Queued"],
        default: "Queued"
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    deliveredAt: {
        type: Date
    }
});

export default mongoose.model("Notification", notificationSchema);