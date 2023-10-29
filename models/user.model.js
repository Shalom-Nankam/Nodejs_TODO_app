const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const shortId = require("shortid");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortId.generate,
      allowNull: false,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

UserSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);

  this.password = hashedPassword;

  next();
});

// Never use arrow functions to define methods for instances
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const validPassword = await bcrypt.compare(password, user.password);

  return validPassword;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
