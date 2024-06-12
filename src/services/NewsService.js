import axios from 'axios';
import { env } from '../config/env';

export function post(data) {
	return axios('http://localhost:53446/news', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
