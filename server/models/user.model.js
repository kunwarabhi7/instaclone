import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      sparse: true,
      unique: true, // Enforces uniqueness at the database level
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true, // Allows null values while enforcing uniqueness for non-null values
      match: [
        /^\+91[6-9]\d{9}$/,
        "Invalid Indian phone number format (e.g., +919876543210)",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [3, "Full name must be at least 3 characters long"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
      match: [/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"],
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true, // Enforces uniqueness at the database level
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

//custom validation to ensure atleast one of email or phone number is required
UserSchema.path("email").validate(function (value) {
  if (!value && this.phoneNumber) {
    throw new Error("Either email or phone number is required");
  }
  return true;
}, "Either Phone number or email is required");

UserSchema.path("phoneNumber").validate(function (value) {
  if (!value && this.email) {
    throw new Error("Either email or phone number is required");
  }
  return true;
}, "Either email or phone number is required");

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Hash password before updating
UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

export { User };
