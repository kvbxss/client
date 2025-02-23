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
  completed?: boolean;
}
export interface ITaskQuery {
  tasks: ITask[];
}
