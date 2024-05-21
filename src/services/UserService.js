import axios from 'axios';
import { env } from '../config/env';

export function login(data) {
	return axios(env.API_GATEWAY.testUrl + '/UserManagementService/users/login', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}