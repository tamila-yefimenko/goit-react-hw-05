import { useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getMovies } from "../../apiService/requests";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import s from "./HomePage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, setMovies, setError } from "../../redux/moviesSlice";

const HomePage = () => {
  const movies = useSelector((state) => state.movies.moviesHome);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const error = useSelector((state) => state.movies.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setError(null));
      dispatch(setIsLoading(true));

      try {
        const { results } = await getMovies();

        const uniqueMovies = [...movies, ...results].filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
        );

        dispatch(setMovies(uniqueMovies));
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    if (movies.length === 0) {
      fetchMovies();
    }
  }, [dispatch, movies]);

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
