import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";

import ChatBoxComponent from "./ChatBoxComponent";
import Box from "@mui/material/Box";

export default function HomeComponent() {
  const [queries, setQueries] = useState<any[]>([]);
  const [chatBoxOpen, setChatBoxOpen] = useState<boolean>(false);
  const [confirmDeleteQueryDialogOpen, setConfirmDeleteQueryDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/photos')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setQueries(data);
    //   });
    setQueries([
      {
        title: "Best seller of the month",
        question: "What was the best seller of the last month?",
      },
      {
        title: "Best seller of the year",
        question: "What was the best seller of the last month?",
      },
      {
        title: "Top 10 sellers of the month",
        question: "What are the top 10 selling products of the last month?",
      },
      {
        title: "Top 10 sellers of the year",
        question: "What are the top 10 selling products of the last year?",
      },
    ]);
  }, []);
  const deleteQuery = () => {
    setConfirmDeleteQueryDialogOpen(true);
  };
  const confirmDeleteQuery = () => {
    // delete query
    setConfirmDeleteQueryDialogOpen(false);
  };

  const toggleOpenChatBox = () => {
    console.log("toggleOpenChatBox");
    setChatBoxOpen(!chatBoxOpen);
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
      }}
    >
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {queries.map((query) => (
          <Card sx={{ width: "30%" }}>
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={deleteQuery}>
                  <DeleteIcon color="error" />
                </IconButton>
              }
              title={query.title}
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {query.question}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Stack
        sx={{ position: "fixed", bottom: 10, right: 10 }}
        direction="row"
        justifyContent="end"
      >
        <Fab
          color="primary"
          aria-lbale="Ask a Question"
          onClick={toggleOpenChatBox}
        >
          <QuestionAnswer />
        </Fab>
      </Stack>
      <Drawer
        anchor="right"
        open={chatBoxOpen}
        onClose={toggleOpenChatBox}
        PaperProps={{
          sx: { width: "500px" },
        }}
      >
        <ChatBoxComponent />
      </Drawer>

      {/* Confirm delete dialog */}
      <Dialog open={confirmDeleteQueryDialogOpen} onClose={confirmDeleteQuery}>
        <DialogTitle id="alert-dialog-title">Delete Query</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this query?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteQueryDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmDeleteQuery} autoFocus variant="contained">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
