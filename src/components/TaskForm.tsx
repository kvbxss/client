import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { ICreateTaskInput } from "../interfaces/interfaces";
import { createTaskSchema } from "../interfaces/schemas";
import TaskService from "../service/TaskService";
import client from "../service/apollo-client";

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

  const onSubmit = async (data: ICreateTaskInput) => {
    await taskService.createTask(data);
    reset();
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
    </div>
  );
}
