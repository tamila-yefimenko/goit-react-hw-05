import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getMovies } from "../../apiService/requests";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const { results } = await getMovies();
        setMovies((prevMovies) => [...prevMovies, ...results]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        setError(null);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <p className={s.homeText}>Trending today</p>
      <MovieList movies={movies} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
    </>
  );
};

export default HomePage;
