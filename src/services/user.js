import axios from 'axios'
import { API_URL } from './config'
import { jwtDecode } from 'jwt-decode'
import { getCurrentUser } from '../services/auth'

const getUsersByCourse = async (courseId) => {
    try {
		const user = getCurrentUser()
		const response = await axios.get(`${API_URL}/course/get-users-by-course/${courseId}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Error getting course's users")
	}
}

export { getUsersByCourse }