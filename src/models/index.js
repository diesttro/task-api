import mongoose from 'mongoose';
import { taskSchema } from '../schemas/mongoose';

const Task = mongoose.model('Task', taskSchema);

export { Task };
