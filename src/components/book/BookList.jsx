import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Stack from "@mui/material/Stack";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BookRatingCard from "./BookRatingCard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

export default function BookList({ data, value, books }) {
  //* React는 key를 통해서 어떤 항목을 변경, 추가 또는 삭제할지 알 수 있다.
  //* key는 element에 안정적인 고유성을 부여하기 위해 배열 내부의 element에 지정해야 한다.
  const bookList = books.map(({ title, score, review_num }, index) => (
    <BookRatingCard
      key={index}
      title={title}
      rating={score}
      numReviews={review_num}
    ></BookRatingCard>
  ));

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          sx={{ ml: -2, mb: 1, textTransform: "none" }}
        >
          <MenuBookIcon sx={{ mr: 1 }} />
          {value + " " + data}
        </Button>
      </ThemeProvider>
      <ScrollMenu>
        <Stack direction="row" spacing={5}>
          {bookList}
        </Stack>
      </ScrollMenu>
    </div>
  );
}
