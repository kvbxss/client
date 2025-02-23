import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Container, Typography, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import "./index.css";

const theme = createTheme({
  typography: {
    fontFamily: "Lucida Console",
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          backgroundColor: "black",
          color: "white",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          ":active": {
            borderColor: "black",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: "10px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          fontFamily: "Lucida Console",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Container fixed>
          <Typography variant="h4" gutterBottom fontFamily={"Lucida Console"}>
            Task Manager
          </Typography>
          <TaskForm />
          <TaskList />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
