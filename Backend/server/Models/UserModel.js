import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
        required: true,
    },
    lastname: {
      type: String,
        required: true,
      
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
   profilePicture: String,
    
    about: String,
    coverPicture: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

// const UserModel = mongoose.model("UserModel", UserSchema);
const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', UserSchema);
export default UserModel;