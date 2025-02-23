import { useQuery, useMutation } from "@apollo/client";
import { GET_TASKS, DELETE_TASK, UPDATE_TASK } from "../service/graphql";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskList() {
  const { loading, error, data, refetch } = useQuery(GET_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading tasks</p>;

  const handleDelete = async (id: string) => {
    await deleteTask({ variables: { id } });
    refetch();
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    await updateTask({ variables: { input: { id, completed: !completed } } });
    refetch();
  };

  return (
    <List>
      {data.tasks.map((task: any) => (
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
    </List>
  );
}
