import mongoose, { model, models, Schema } from 'mongoose';

let UserSchema = new Schema(
  {
    name: String,
    password: String,
    emailVerified: Date,
    email: {
      type: String,
      required: [true, "Please provide the pet owner's name"],
      unique: true,
    },
    image: String,
    username: String,
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
  },
  { timestamps: true }
);

export default models.User || model('User', UserSchema);
