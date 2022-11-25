import { model, models, Schema } from 'mongoose';

let VerificationSchema = new Schema({
  identifier: String,
  token: String,
  expires: Date,
});

export default models.VerificationToken ||
  model('VerificationToken', VerificationSchema);
