import { useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import { getSearchedMovies } from "../../apiService/requests";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsLoading,
  setMoviesSearch,
  setError,
  setTotalPages,
  setIsEmpty,
} from "../../redux/moviesSlice";

const MoviesPage = () => {
  const movies = useSelector((state) => state.movies.moviesSearch);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const error = useSelector((state) => state.movies.error);
  const isEmpty = useSelector((state) => state.movies.isEmpty);
  const totalPages = useSelector((state) => state.movies.totalPages);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(setMoviesSearch([]));
    dispatch(setError(null));
  }, [query, dispatch]);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getMovies = async () => {
      dispatch(setIsLoading(true));
      try {
        const data = await getSearchedMovies(query, page);
        if (!data.results.length) {
          return dispatch(setIsEmpty(true));
        }
        dispatch(setIsEmpty(false));

        const newMovies =
          page === 1
            ? data.results
            : [...movies, ...data.results].filter(
                (movie, index, self) =>
                  index === self.findIndex((m) => m.id === movie.id)
              );

        dispatch(setMoviesSearch(newMovies));

        dispatch(setTotalPages(data.total_pages));
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    getMovies();
  }, [query, page, dispatch]);

  const handleSearch = (newValue) => {
    if (!newValue) {
      searchParams.delete("query");
      searchParams.delete("page");
      setSearchParams(searchParams);
      dispatch(setMoviesSearch([]));
      dispatch(setError(null));
      return;
    }

    searchParams.set("query", newValue);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    dispatch(setMoviesSearch([]));
    dispatch(setError(null));
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleLoadMore = () => {
    if (page < totalPages) {
      searchParams.set("page", page + 1);
      setSearchParams(searchParams);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" />
      {isEmpty && (
        <p style={{ color: "#035d60", fontSize: "20px" }}>
          No results found. Try a different search.
        </p>
      )}
      {movies.length > 0 && (
        <>
          <MovieList movies={filteredMovies} />
          {isLoading && <Loader />}
          {error && <ErrorMessage />}
          {page < totalPages && !isLoading && (
            <button onClick={handleLoadMore}>Load more</button>
          )}
        </>
      )}
    </div>
  );
};

export default MoviesPage;
