const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/hello");

// Define the user schema
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  contact: Number,
  boards: {
    type: Array,
    default: [],
  },
  posts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"post",
    }
  ]
});

// Add the passport-local-mongoose plugin to the user schema
userSchema.plugin(plm);

// Export the user model
module.exports = mongoose.model("user", userSchema);

