import mongoose from 'mongoose';

const { Schema } = mongoose;

const ListSchema = new Schema({
  name: String,
  checked_items: [String],
  unchecked_items: [String],
});

export const ListModel = mongoose.model('List', ListSchema);
