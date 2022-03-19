const root = {
  tasks: async (_, { Task }) => await Task.find(),
  addTask: async ({ task }, { Task }) => await new Task(task).save(),
  updateTask: async ({ id, task }, { Task }) =>
    await Task.findByIdAndUpdate(id, task, { new: true }),
  deleteTask: async ({ id }, { Task }) => await Task.findByIdAndDelete(id),
};

export default root;
