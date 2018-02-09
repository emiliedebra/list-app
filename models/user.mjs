import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  list_id: [Number],
});

export const UserModel = mongoose.model('User', UserSchema);
