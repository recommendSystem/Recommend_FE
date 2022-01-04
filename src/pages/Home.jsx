import React from "react";
import { Stack } from "@mui/material";
import BookList from "../components/book/BookList";
import MainAppBar from "../components/common/MainAppBar";

export default function Home() {
  const [relatedBooks, setRelatedBooks] = React.useState([]);
  const [recommendedBooks, setRecommendedBooks] = React.useState([]);
  const [SimillarBooks, setSimillarBooks] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [id, setId] = React.useState("");

  const handleSubmit = data => {
    console.log(data);
    setRelatedBooks(data.books);
    setRecommendedBooks(data.results);
    setSimillarBooks(data.recommends_result);
    setKeyword(data.keyword);
    setId(data.ID.toUpperCase());
  };

  const clearBooks = () => {
    setRelatedBooks([]);
    setRecommendedBooks([]);
    setSimillarBooks([]);
  }

  return (
    <>
      <MainAppBar onHandleSubmit={handleSubmit} onHandleClear={clearBooks}></MainAppBar>
      <Stack spacing={10}>
        <BookList data={keyword} value="Books related to" books={relatedBooks}></BookList>
        <BookList data={keyword} value="Books that are similar to" books={recommendedBooks}></BookList>
        <BookList data={id} value="Books for people with similar tastes to" books={SimillarBooks}></BookList>
      </Stack>
    </>
  );
}
