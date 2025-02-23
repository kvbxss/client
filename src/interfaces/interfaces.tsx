export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
export interface ICreateTaskInput {
  title: string;
  description?: string;
}
export interface IUpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}
export interface ITaskQuery {
  tasks: ITask[];
}
export interface ITaskMutation {
  createTask: ITask;
}
export interface IDeleteTaskMutation {
  deleteTask: boolean;
}
export interface IUpdateTaskMutation {
  updateTask: ITask;
}
