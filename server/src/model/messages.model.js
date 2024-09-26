import mongoose, { Schema } from "mongoose";

const messagesSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    messageType: {
        type: String,
        enum: ["text", "file"],
        required: true 
    },
    content: {
        type: String,
        validate: {
            validator: function() {
                return this.messageType === "text" ? this.content && this.content.length > 0 : true;
            },
            message: "Content is required when the messageType is 'text'"
        }
    },
    fileUrl: {
        type: String,
        validate: {
            validator: function() {
                return this.messageType === "file" ? this.fileUrl && this.fileUrl.length > 0 : true;
            },
            message: "File URL is required when the messageType is 'file'"
        }
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Message = mongoose.model("Messages", messagesSchema);

export default Message;
