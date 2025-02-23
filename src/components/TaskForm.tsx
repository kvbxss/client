import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ICreateTaskInput } from "../interfaces/interfaces";
import { createTaskSchema } from "../interfaces/schemas";
import TaskService from "../service/TaskService";
import client from "../service/apollo-client";
import { useState } from "react";

const taskService = new TaskService(client);

export default function TaskForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
  });

  const [open, setOpen] = useState(false);

  const onSubmit = async (data: ICreateTaskInput) => {
    await taskService.createTask(data);
    reset();
    setOpen(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("title")}
          label="Task Title"
          fullWidth
          required
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          {...register("description")}
          label="Description"
          fullWidth
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </form>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Task Created</DialogTitle>
        <DialogContent>Your task has been successfully added!</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
