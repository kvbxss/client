import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GET_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from "./graphql";
import {
  ICreateTaskInput,
  IUpdateTaskInput,
  ITask,
  ITaskQuery,
} from "../interfaces/interfaces";
import { createTaskSchema, updateTaskSchema } from "../interfaces/schemas";

class TaskService {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  async getTasks(): Promise<ITask[]> {
    const { data } = await this.client.query<ITaskQuery>({ query: GET_TASKS });
    return data.tasks;
  }

  async createTask(input: ICreateTaskInput): Promise<ITask> {
    createTaskSchema.parse(input);
    const { data } = await this.client.mutate({
      mutation: CREATE_TASK,
      variables: { input },
      update: (cache, { data: { createTask } }) => {
        const existingTasks = cache.readQuery<ITaskQuery>({ query: GET_TASKS });
        if (existingTasks) {
          cache.writeQuery({
            query: GET_TASKS,
            data: { tasks: [...existingTasks.tasks, createTask] },
          });
        }
      },
    });
    return data.createTask;
  }

  async updateTask(id: string, completed: boolean): Promise<ITask> {
    const input: IUpdateTaskInput = { id, completed };
    updateTaskSchema.parse(input);
    const { data } = await this.client.mutate({
      mutation: UPDATE_TASK,
      variables: { input },
      update: (cache, { data: { updateTask } }) => {
        const existingTasks = cache.readQuery<ITaskQuery>({ query: GET_TASKS });
        if (existingTasks) {
          cache.writeQuery({
            query: GET_TASKS,
            data: {
              tasks: existingTasks.tasks.map((task: ITask) =>
                task.id === updateTask.id ? updateTask : task
              ),
            },
          });
        }
      },
    });
    return data.updateTask;
  }

  async deleteTask(id: string): Promise<string> {
    const { data } = await this.client.mutate({
      mutation: DELETE_TASK,
      variables: { id },
      update: (cache) => {
        const existingTasks = cache.readQuery<ITaskQuery>({ query: GET_TASKS });
        if (existingTasks) {
          cache.writeQuery({
            query: GET_TASKS,
            data: {
              tasks: existingTasks.tasks.filter(
                (task: ITask) => task.id !== id
              ),
            },
          });
        }
      },
    });
    return data.deleteTask;
  }
}

export default TaskService;
