import React from "react";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import LogInModal from "../sign/LogInModal";
import JoinModal from "../sign/JoinModal";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100ch",
    },
  },
}));

export default function MainAppBar({ onHandleSubmit, onHandleClear }) {
  const [text, setText] = React.useState("");
  const [LoggedIn, setLoggedIn] = React.useState(sessionStorage.length > 0 ? true : false);

  const handleSubmit = e => {
    // enter 칠 시에 text에 있는 내용 http에 감싸서 서버로 보내기
    if (e.key === "Enter") {
      const options = {
        url: "http://localhost:8080/search?keyword=" + text,
        data: {
          _id: sessionStorage.getItem(sessionStorage.getItem("id")),
        },
      };

      axios
        .post(options.url, options.data)
        .then(res => {
          onHandleSubmit(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleLogIn = (userID, sessionID) => {
    sessionStorage.setItem(userID, sessionID);
    sessionStorage.setItem("id", userID);
    onHandleClear();
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    axios
      .get("http://localhost:8080/logout")
      .then(res => {
        setLoggedIn(false);
      })
      .catch(error => console.log(error));
    sessionStorage.clear();
    onHandleClear();
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Book Recommendation
          </Typography>
          <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Please search the book you want to read"
              inputProps={{ "aria-label": "search" }}
              onKeyPress={handleSubmit}
              onChange={e => setText(e.target.value)}
            />
          </Search>
          <LogInModal
            value="Log In"
            isLoggedIn={LoggedIn}
            onHandleLogIn={handleLogIn}
          ></LogInModal>
          <JoinModal
            value="Join"
            isLoggedIn={LoggedIn}
            onHandleLogOut={handleLogOut}
          ></JoinModal>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
