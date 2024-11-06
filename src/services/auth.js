import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from './config'
import { jwtDecode } from 'jwt-decode'
import { removeSelectedCourseCookies } from './course'

// Login function
const login = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, { email: email, password })
		if (response.data.token) {
			Cookies.set('user', JSON.stringify(response.data), { expires: 7, secure: true, sameSite: 'Strict' })
			Cookies.set('userEmail', email)
		}
		console.log('Login successful', response.data)
		console.log("Cookies set as token and email: " + email)
	} catch (error) {
		console.error(error)
		throw new Error('Login failed')
	}
}

// Signup function
const signup = async (email, password, username, phoneNumber) => {
	try {
		const response = await axios.post(`${API_URL}/auth/signup`, { email, password, username: username, phone: phoneNumber })
		if (response.data.email) {
			await login(email, password)
			window.location.href = '/joinCourse'
		}
		console.log('Signup response:', response.data)
	} catch (error) {
		console.error("Signup error:", error.response ? error.response.data : error.message)
		throw new Error('Signup failed')
	}
}

const isUserLoggedIn = () => {
	return !!Cookies.get('user')
}

// Logout function
const logout = () => {
	Cookies.remove('user')
	Cookies.remove('userEmail')
	removeSelectedCourseCookies()
}

// Get current user
const getCurrentUser = () => {
	return JSON.parse(Cookies.get('user'))
}

const getCurrentUserEmail = () => {
	return Cookies.get('userEmail')
}

const isTokenExpired = () => {
	const user = Cookies.get('user')
	if (!user) return true

	const { token } = JSON.parse(user)
	const decodedToken = jwtDecode(token)
	const currentTime = Date.now() / 1000

	return decodedToken.exp < currentTime
}

export { login, signup, isUserLoggedIn, logout, getCurrentUser, getCurrentUserEmail, isTokenExpired }


