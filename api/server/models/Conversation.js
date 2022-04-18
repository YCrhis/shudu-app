const mongoose = require("mongoose");


const ConversationsSchema = new mongoose.Schema(
  {
      members:{
          type:Array,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Conversations || mongoose.model("Conversations", ConversationsSchema);
