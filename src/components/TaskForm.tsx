import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CREATE_TASK } from "../service/graphql";
import { Button, TextField } from "@mui/material";

export default function TaskForm({ refetch }: { refetch: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const [createTask] = useMutation(CREATE_TASK);

  const onSubmit = async (data: any) => {
    await createTask({ variables: { input: data } });
    reset();
    refetch();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register("title")} label="Task Title" fullWidth required />
      <TextField {...register("description")} label="Description" fullWidth />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </form>
  );
}
