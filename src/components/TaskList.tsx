import { useQuery } from "@apollo/client";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ITask, ITaskQuery } from "../interfaces/interfaces";
import TaskService from "../service/TaskService";
import client from "../service/apollo-client";
import { GET_TASKS } from "../service/graphql";

const taskService = new TaskService(client);

export default function TaskList() {
  const { loading, error, data } = useQuery<ITaskQuery>(GET_TASKS);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading tasks</p>;

  const handleDelete = async (id: string) => {
    await taskService.deleteTask(id);
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    await taskService.updateTask(id, !completed);
  };

  return (
    <ul className="task-list">
      {data?.tasks.map((task: ITask) => (
        <ListItem key={task.id}>
          <Checkbox
            checked={task.completed}
            onChange={() => toggleComplete(task.id, task.completed)}
          />
          <ListItemText primary={task.title} secondary={task.description} />
          <IconButton onClick={() => handleDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </ul>
  );
}
