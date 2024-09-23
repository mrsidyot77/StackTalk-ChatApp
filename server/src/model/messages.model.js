import mongoose, { Schema } from "mongoose";

const messagesSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false
    },
    messageType: {
        type: String,
        enum: ["text", "file"],
        required: true 
    },
    content: {
        types: String,
        required: function(){
            return this.messageType === "text"
        },
    },
    fileUrl: {
        types: String,
        required: function(){
            return this.messageType === "file"
        },
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
},{timestamps: true})

const Message = mongoose.model("Messages", messagesSchema)

export default Message