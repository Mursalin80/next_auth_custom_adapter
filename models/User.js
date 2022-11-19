import mongoose, { model, models, Schema } from 'mongoose';

let UserSchema = new Schema({
  name: String,
  emailVerified: Date,
  email: {
    type: String,
    required: [true, "Please provide the pet owner's name"],
    unique: true,
  },
  image: String,
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
});

export default models.User || model('User', UserSchema);
