import mongoose, { model, models, Schema } from 'mongoose';
let SessionSchema = new Schema({
  sessionToken: String,
  expires: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default models.Session || model('Session', SessionSchema);
