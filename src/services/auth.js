import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000'; // Replace with your backend URL

// Login function
export const login = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, { email, password });
		if (response.data.token) {
			Cookies.set('user', JSON.stringify(response.data), { expires: 7, secure: true, sameSite: 'Strict' });
		}
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Login failed');
	}
};

// Signup function
export const signup = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}/auth/signup`, { email, password });
		return response.data;
	} catch {
		throw new Error('Signup failed');
	}
};

// Logout function
export const logout = () => {
	Cookies.remove('user');
};

// Get current user
export const getCurrentUser = () => {
	return JSON.parse(Cookies.get('user'));
};

