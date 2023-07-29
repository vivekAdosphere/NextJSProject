import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 48,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 56,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    tokens: {
      refreshToken: {
        type: String,
        required: false,
        default: null,
      },
      accessToken: {
        type: String,
        required: false,
        default: null,
      },
      forgotPasswordToken: String,
      forgotPasswordTokenExpiry: Date,
      verifyToken: String,
      verifyTokenExpiry: Date,
    },
    connectedPlatforms: [
      {
        type: Schema.Types.ObjectId,
        ref: "ConnectedPlatform",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
