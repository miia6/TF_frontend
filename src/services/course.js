import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from './config'

// Get all courses / Función para obtener todos los cursos
export const getCourses = async () => {
	try {
		const user = JSON.parse(Cookies.get('user'))
		const response = await axios.get(`${API_URL}/course/list-courses`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data
	} catch (error) {
		console.error(error);
		throw new Error('Error al obtener los cursos')
	}
}

// Get course object by id
export const getCourse = async (courseId) => {
	try {
		const user = JSON.parse(Cookies.get('user'))
		const response = await axios.get(`${API_URL}/course/get-course/${courseId}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error al obtener el curso')
	}
}

// Set current course Id to cookies
export const setSelectedCourseCookies = (courseId) => {
    Cookies.set('selectedCourse', courseId, { expires: 7, secure: true, sameSite: 'Strict' })
}

// Get current course Id from cookies
export const getSelectedCourseCookies = () => {
    return Cookies.get('selectedCourse')
}

// Remove current course Id from cookies
export const removeSelectedCourseCookies = () => {
    Cookies.remove('selectedCourse')
}
