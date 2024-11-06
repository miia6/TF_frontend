import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from './config'
import { getCurrentUser } from '../services/auth'

// Get all courses / Función para obtener todos los cursos
const getCourses = async () => {
	try {
		const user = getCurrentUser() //JSON.parse(Cookies.get('user'))
		const response = await axios.get(`${API_URL}/course/list-courses`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data
	} catch (error) {
		console.error(error);
		throw new Error('Error listing courses')
	}
}

// Get course object by id
const getCourse = async (courseId) => {
	try {
		const user = getCurrentUser() //JSON.parse(Cookies.get('user'))
		const response = await axios.get(`${API_URL}/course/get-course/${courseId}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error getting a course')
	}
}

// Join a course
const joinCourse = async (courseId) => {
	try {
		const user = getCurrentUser() 
		console.log('user token: ' + user.token)
		const response = await axios.post(`${API_URL}/course/join-course/${courseId}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			},
			/*params: {
				courseId: courseId
			}*/
		})
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error joining a course')
	}
}

// Get the courses user is joined
const getUserCourses = async () => {
	try {
		const user = getCurrentUser() 
		const response = await axios.get(`${API_URL}/course/my-courses`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Error getting user's courses")
	}
}

// Set current course Id to cookies
const setSelectedCourseCookies = (courseId) => {
    Cookies.set('selectedCourse', courseId, { expires: 7, secure: true, sameSite: 'Strict' })
}

// Get current course Id from cookies
const getSelectedCourseCookies = () => {
    return Cookies.get('selectedCourse')
}

// Remove current course Id from cookies
const removeSelectedCourseCookies = () => {
    Cookies.remove('selectedCourse')
}

export { getCourses, getCourse, joinCourse, getUserCourses, setSelectedCourseCookies, getSelectedCourseCookies, removeSelectedCourseCookies }
