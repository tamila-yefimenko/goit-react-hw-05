import axios from "axios";

const ACCESS_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjkwMDAyNTJmNGIxZjFjMjZiZDc3MDU1NDU0NWRmMSIsIm5iZiI6MTc0NDg5OTAzOC4xMjcsInN1YiI6IjY4MDEwYmRlZGU1ZTRkZWM2MmFmMDVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dokRvxE73AuPxLaJeUBNTuryzP77N5ubKNXXO37rKf4";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] = `Bearer ${ACCESS_KEY}`;

export const getMovies = async () => {
  const { data } = await axios.get(`trending/movie/day`);
  return data;
};

export const getSearchedMovies = async (query, page) => {
  const { data } = await axios.get(`search/movie`, {
    params: { query, page },
  });
  return data;
};

export const getMoviesById = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}`);
  return data;
};

export const getMovieCast = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}/credits`);
  return data;
};

export const getMovieReview = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}/reviews`);
  return data;
};
