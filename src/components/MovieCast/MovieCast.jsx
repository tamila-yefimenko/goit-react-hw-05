import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../apiService/requests";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieCast(movieId);
        setActors(data.cast);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        setError(null);
      }
    };
    getData();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {actors.length > 0 ? (
        <ul className={s.list}>
          {actors.map((actor) => {
            return (
              <li className={s.item} key={actor.id}>
                <img
                  className={s.img}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.original_name}
                />
                <h3 className={s.subtitle}>{actor.name}</h3>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any information.</p>
      )}
    </div>
  );
};

export default MovieCast;
