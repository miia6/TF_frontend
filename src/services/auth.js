import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from './config';

// Login function
const login = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, { emailOrPhoneNumber: email, password })
		if (response.data.token) {
			Cookies.set('user', JSON.stringify(response.data), { expires: 7, secure: true, sameSite: 'Strict' })
		}
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Login failed')
	}
}

// Signup function
const signup = async (email, password, username, phoneNumber) => {
	try {
		const response = await axios.post(`${API_URL}/auth/signup`, { email, password, username: username, phone: phoneNumber })
		return response.data
	} catch {
		throw new Error('Signup failed')
	}
}

// Logout function
const logout = () => {
	Cookies.remove('user')
}

// Get current user
const getCurrentUser = () => {
	return JSON.parse(Cookies.get('user'))
}

export { login, signup, logout, getCurrentUser }


