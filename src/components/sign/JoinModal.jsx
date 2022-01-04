import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import Password from "./Password";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #2e7d32",
  boxShadow: 24,
  p: 4,
};

const join_style = {
  fontWeight: "bold",
  p: 1.5,
  mt: 2,
};

export default function JoinModal({ value, isLoggedIn, onHandleLogOut }) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("ID");
  const [password, setPassword] = React.useState("Password");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 상위 컴포넌트에 함수를 정의한 후, 하위 컴포넌트의 props로 전달하여 하위 컴포넌트의 state를 매개 변수로 받아온다.
  const handleUpdate = pwd => {
    setPassword(pwd);
  };

  const handleSubmit = e => {
    if (e.key === "Enter" || e.type === "click") {
      // http message 세부 사항
      const options = {
        url: "http://localhost:8080/join",
        data: {
          ID: id,
          password: password,
        },
      };

      axios
        .post(options.url, options.data)
        .then(res => {
          // TODO: 회원 가입 성공 창
          console.log(res.data);
          handleClose();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  if (isLoggedIn) {
    return <Button color="inherit" onClick={onHandleLogOut}>Log Out</Button>;
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
              required
              id="outlined-required"
              margin="dense"
              label="ID"
              color="success"
              onChange={e => setId(e.target.value)}
            />
            <Password
              value="Password"
              color="success"
              onHandleUpdate={handleUpdate}
              onHandleSubmit={handleSubmit}
            ></Password>
            <Button
              variant="contained"
              color="success"
              sx={join_style}
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
