import axios from 'axios';
import { env } from '../config/env';

const BASE_URL = 'http://localhost:8080/NewsService';

const getToken = () => {
	return localStorage.getItem('authToken');
};

// Add a request interceptor to attach the token to each request
axios.interceptors.request.use(
	config => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

const getNews = () => axios.get(`${BASE_URL}/news`);

const post = news => axios.post(`${BASE_URL}/news`, news);

export { getNews, post };
