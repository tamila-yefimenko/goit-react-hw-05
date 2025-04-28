import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../apiService/requests";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import s from "./MovieCast.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, setActors, setError } from "../../redux/actorsSlice";

const MovieCast = () => {
  const { movieId } = useParams();
  const actors = useSelector((state) => state.actors.actors);
  const error = useSelector((state) => state.actors.error);
  const isLoading = useSelector((state) => state.actors.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;
    const getData = async () => {
      dispatch(setIsLoading(true));
      try {
        const data = await getMovieCast(movieId);
        dispatch(setActors(data.cast));
      } catch (error) {
        dispatch(setError(error));
      } finally {
        dispatch(setIsLoading(false));
        dispatch(setError(null));
      }
    };
    getData();
  }, [movieId, dispatch]);

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
