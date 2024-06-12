import axios from 'axios';
import { env } from '../config/env';

export function login(data) {
	return axios(env.API_GATEWAY.testUrl + '/UserManagementService/users/token', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export function register(data) {
	return axios(env.API_GATEWAY.testUrl + '/UserManagementService/users/create', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export function search(params) {
	return axios(env.API_GATEWAY.testUrl + '/UserManagementService/users/search', {
	  method: 'GET',
	  params: params,
	  headers: {
		'Content-Type': 'application/json',
	  },
	});
  }