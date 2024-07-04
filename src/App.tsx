import "./App.css";
import NavBar from "./NavBar/NavBar";
import Card from "./Card/Card";
import useMovieSearch from "./hooks/useMovieSearch";
import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPageNumber(0);
  };

  useMovieSearch(query, pageNumber);
  return (
    <>
      <NavBar handleSearch={handleSearch} />
      <main>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </main>
    </>
  );
};

export default App;
