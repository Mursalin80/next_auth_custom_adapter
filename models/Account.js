import mongoose, { model, models, Schema } from 'mongoose';
let AccountSchema = new Schema({
  provider: String,
  expires: Date,
  type: String,
  providerAccountId: String,
  access_token: String,
  token_type: String,
  scope: String,
  expires_at: Number,
  refresh_token: String,
  token_type: String,
  id_token: String,
  session_state: String,
  oauth_token_secret: String,
  oauth_token: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default models.Account || model('Account', AccountSchema);
