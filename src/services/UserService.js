import axios from 'axios';
import { env } from '../config/env';

export function validateToken(params) {
	return axios(env.API_GATEWAY.testUrl + '/UserManagementService/users/validate', {
		method: 'GET',
		params: params,
		headers: {
		  'Content-Type': 'application/json',
		},
	  });
}

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

export function getUserWithMail(email) {
	return axios(env.API_GATEWAY.testUrl + '/UserManagementService/users/email/' + email, {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		},
	  });
}

export function getNotificationsFromUser(uid) {
	const token = localStorage.getItem('authToken');
	return axios(env.API_GATEWAY.testUrl + '/NewsService/notifications/uid/' + uid, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		  },
	})
}

export function getHealthDiaryFromUser(uid) {
	const token = localStorage.getItem('authToken');
	return axios(env.API_GATEWAY.testUrl + '/PatientService/api/diary-entries/uid/' + uid, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		  },
	})
}

export function postDiaryEntry(data) {
	const token = localStorage.getItem('authToken');
	return axios(env.API_GATEWAY.testUrl + '/PatientService/api/diary-entries/', {
		method: 'POST',
		data: JSON.stringify(data),
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
}

