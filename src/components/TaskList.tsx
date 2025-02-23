import { useQuery } from "@apollo/client";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ITask, ITaskQuery } from "../interfaces/interfaces";
import TaskService from "../service/TaskService";
import client from "../service/apollo-client";
import { GET_TASKS } from "../service/graphql";
import { useState } from "react";

const taskService = new TaskService(client);

export default function TaskList() {
  const { loading, error, data } = useQuery<ITaskQuery>(GET_TASKS);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading tasks</p>;

  const handleDelete = async () => {
    if (deleteId) {
      await taskService.deleteTask(deleteId);
      setDeleteId(null);
      setOpen(false);
    }
  };

  return (
    <>
      <ul className="task-list">
        {data?.tasks.map((task: ITask) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.completed}
              onChange={() => taskService.updateTask(task.id, !task.completed)}
            />
            <ListItemText primary={task.title} secondary={task.description} />
            <IconButton
              onClick={() => {
                setDeleteId(task.id);
                setOpen(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </ul>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
