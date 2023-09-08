const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  createdBy: { type: "ObjectId", ref: "Users", required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  message: { type: String, required: true },
  comments: [
    {
      sentBy: { type: "ObjectId", ref: "Users" },
      sentAt: { type: String },
      liked: [{ type: "ObjectId", ref: "Users" }],
    },
  ],
},{
    versionKey:false
});


const PostModel= mongoose.model("Posts",PostSchema);


module.exports={
    PostSchema,PostModel
}