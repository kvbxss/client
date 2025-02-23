import { useQuery } from "@apollo/client";
import { GET_TASKS } from "./service/graphql";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Container, Typography } from "@mui/material";

export default function App() {
  const { refetch } = useQuery(GET_TASKS);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Task Manager
      </Typography>
      <TaskForm refetch={refetch} />
      <TaskList />
    </Container>
  );
}
