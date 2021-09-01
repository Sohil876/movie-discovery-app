import axios from 'axios';

/**
 * base url to make requests to TMDB database
 *
 * https://developers.themoviedb.org/3
 *
 */
const tmdb = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
});

export default tmdb;
