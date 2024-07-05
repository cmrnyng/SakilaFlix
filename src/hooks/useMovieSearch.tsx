import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";

interface Language {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Actor {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  language: Language;
  length: number;
  rating: string;
  category: Category;
  cast: Actor[];
}

const useMovieSearch = (
  query: string,
  pageNumber: number,
  category: string | null,
  language: string | null,
  sort: string | null
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setMovies([]);
  }, [query, category, language, sort]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: Canceler;
    axios({
      method: "GET",
      url: "http://localhost:8080/movies",
      params: {
        title: query,
        pageNo: pageNumber,
        category: category,
        language: language,
        sort: sort,
      },
      cancelToken: new axios.CancelToken(c => (cancel = c)),
    })
      .then(res => {
        setMovies(prev => {
          return [...prev, ...res.data.content];
        });
        setHasMore(res.data.content.length > 0);
        setLoading(false);
      })
      .catch(e => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [query, language, category, sort, pageNumber]);

  return { loading, error, movies, hasMore };
};

export default useMovieSearch;
