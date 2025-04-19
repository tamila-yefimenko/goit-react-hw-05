import { useEffect, useState, useRef } from "react";
import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import { getMoviesById } from "../../apiService/requests";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getMovieData = async () => {
      setIsLoading(true);
      try {
        setError(null);
        const data = await getMoviesById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieData();
  }, [movieId]);

  return (
    <div>
      <Link className={s.goBack} to={goBackRef.current}>
        Go back
      </Link>
      <div className={s.detailsWrapper}>
        {isLoading && <Loader />}
        {error && <ErrorMessage />}
        <img
          className={s.image}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={s.infoWrapper}>
          <h2 className={s.title}>{movie.title}</h2>
          <p className={s.text}>
            User score:{" "}
            {movie.vote_average
              ? `${(movie.vote_average * 10).toFixed(2)}%`
              : "No ratings yet"}
          </p>
          <h3 className={s.subtitle}>Overview</h3>
          <p className={s.text}>
            {movie.overview ? `${movie.overview}` : "No overwiew"}
          </p>
          <h3 className={s.subtitle}>Genres</h3>
          <p>
            {movie.genres?.length
              ? movie.genres.map((genre) => genre.name).join(" ")
              : "Genre unknown"}
          </p>
        </div>
      </div>

      <p className={s.text}>Additional information</p>
      <nav className={s.navInfo}>
        <NavLink className={s.navInfoItem} to="cast">
          cast
        </NavLink>
        <NavLink className={s.navInfoItem} to="reviews">
          reviews
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
