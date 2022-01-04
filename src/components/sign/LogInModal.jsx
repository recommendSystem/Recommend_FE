import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #1976d2",
  boxShadow: 24,
  p: 4,
};

const log_in_style = {
  bgcolor: "#1976d2",
  fontWeight: "bold",
  p: 1.5,
  mt: 2,
};

/**
 *
 * @param {String} value는 Button의 내용이다.
 * @returns
 */
export default function LogInModal({ value, isLoggedIn, onHandleLogIn }) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("ID");
  const [password, setPassword] = React.useState("Password");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = e => {
    if (e.key === "Enter" || e.type === "click") {
      // http message 세부 사항
      const options = {
        url: "http://localhost:8080/login",
        data: {
          _id: sessionStorage.getItem(sessionStorage.getItem("id")),
          ID: id,
          password: password,
        },
      };

      axios
        .post(options.url, options.data)
        .then(res => {
          onHandleLogIn(id, res.data);
          setId("ID");
          setPassword("Password");
          handleClose();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // 로그인 된 경우
  if (isLoggedIn) {
    return <Button color="inherit">{sessionStorage.getItem("id")}</Button>;
  }

  return (
    <div>
      <Button onClick={handleOpen} color="inherit">
        {value}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            {value}
          </Typography>
          <Stack>
            <TextField
              margin="dense"
              placeholder={id}
              onChange={e => setId(e.target.value)}
            ></TextField>
            <TextField
              margin="dense"
              placeholder={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
              onKeyPress={handleSubmit}
            ></TextField>
            <Button
              variant="contained"
              sx={log_in_style}
              onClick={handleSubmit}
            >
              {value}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
