import { useEffect, useState, useRef } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import { getSearchedMovies } from "../../apiService/requests";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);

  const isRestoredFromSession = useRef(false);

  useEffect(() => {
    const savedMovies = sessionStorage.getItem("movies");
    const savedPage = Number(sessionStorage.getItem("page"));
    const savedQuery = sessionStorage.getItem("query");

    if (savedMovies && savedQuery === query && savedPage === pageFromUrl) {
      setMovies(JSON.parse(savedMovies));
      setPage(savedPage);
      isRestoredFromSession.current = true;
    }
  }, []);

  useEffect(() => {
    if (query) {
      searchParams.set("page", page);
      setSearchParams(searchParams);
    }
  }, [page, query, searchParams, setSearchParams]);

  useEffect(() => {
    if (!query || isRestoredFromSession.current) {
      isRestoredFromSession.current = false;
      return;
    }

    const getMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getSearchedMovies(query, page);
        if (!data.results.length) {
          return setIsEmpty(true);
        }
        setIsEmpty(false);
        const newMovies =
          page === 1 ? data.results : [...movies, ...data.results];
        setMovies(newMovies);
        setTotalPages(data.total_pages);

        sessionStorage.setItem("movies", JSON.stringify(newMovies));
        sessionStorage.setItem("page", page.toString());
        sessionStorage.setItem("query", query);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  const handleSearch = (newValue) => {
    sessionStorage.removeItem("movies");
    sessionStorage.removeItem("page");
    sessionStorage.removeItem("query");

    if (!newValue) {
      searchParams.delete("query");
      searchParams.delete("page");
      setSearchParams(searchParams);
      setMovies([]);
      setError(null);
      return;
    }

    searchParams.set("query", newValue);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    setPage(1);
    setMovies([]);
    setError(null);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
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
