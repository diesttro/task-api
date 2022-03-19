import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
  description: String,
  status: { type: String, default: 'TO_DO' },
});

export { taskSchema };
