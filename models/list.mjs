import mongoose from 'mongoose';

const { Schema } = mongoose;

const ListSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

export const ListModel = mongoose.model('List', ListSchema);
