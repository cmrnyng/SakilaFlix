import "./App.css";
import NavBar from "./NavBar/NavBar";
import Card from "./Card/Card";
import useMovieSearch from "./hooks/useMovieSearch";
import { useRef, useState, useCallback } from "react";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [category, setCategory] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const { movies, hasMore, loading } = useMovieSearch(query, pageNumber, category, language, sort);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElement = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
    setPageNumber(0);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCategory(e.target.value === "" ? null : e.target.value);
    console.log(e.target.value);
    setPageNumber(0);
  };

  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setLanguage(e.target.value === "" ? null : e.target.value);
    setPageNumber(0);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSort(e.target.value === "" ? null : e.target.value);
    setPageNumber(0);
  };

  return (
    <>
      <NavBar
        handleSearch={handleSearch}
        handleCategory={handleCategory}
        handleLanguage={handleLanguage}
        handleSort={handleSort}
      />
      <main>
        {movies.map((movie, i) => {
          if (movies.length === i + 1) {
            return (
              <div ref={lastMovieElement} key={`d${i}`}>
                <Card key={movie.id} movie={movie} />
              </div>
            );
          } else {
            return (
              <div key={`d${i}`}>
                <Card key={movie.id} movie={movie} />
              </div>
            );
          }
        })}
      </main>
    </>
  );
};

export const convertLength = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const convertName = (name: string): string => {
  const words = name.toLowerCase().split(" ");
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
};

export default App;
