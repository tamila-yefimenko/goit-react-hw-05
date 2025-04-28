import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieReview } from "../../apiService/requests";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import s from "./MovieReviews.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, setReviews, setError } from "../../redux/reviewsSlice";

const MovieReviews = () => {
  const { movieId } = useParams();
  const reviews = useSelector((state) => state.reviews.reviews);
  const isLoading = useSelector((state) => state.reviews.isLoading);
  const error = useSelector((state) => state.reviews.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;
    const getData = async () => {
      dispatch(setIsLoading(true));
      try {
        const data = await getMovieReview(movieId);
        dispatch(setReviews(data.results));
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
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map((review) => (
            <li className={s.item} key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
