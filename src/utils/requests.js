/**
 * The Movie Database API
 *
 * https://developers.themoviedb.org/3/getting-started/introduction
 */

/**
 *  TMDb API Key
 */
export const API_KEY = '276dbe36838cf9f1737fd88bce2c5bd9';

/**
 * Base image URL for image posters
 */
export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

/**
 * Banner image URL for backdrops/banners
 */
export const BANNER_IMG_URL = 'https://image.tmdb.org/t/p/w750';

/**
 * Movie Discovery endpoint
 *
 * https://developers.themoviedb.org/3/discover/movie-discover
 */
const movieUrl = '/discover/movie?api_key=';

export const movieRequests = {
	// trending movies
	fetchTrendingMovies: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,

	// now playing movies
	fetchNowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,

	// upcoming movies
	fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
};

export const tvRequests = {
	// trending tv
	fetchTrendingTVShows: `/trending/tv/day?api_key=${API_KEY}&language=en-US`,

	// popular tv
	fetchPopularTVShows: `/tv/popular?api_key=${API_KEY}&language=en-US`,
};
