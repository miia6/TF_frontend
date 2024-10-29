import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from './config';

// Función para obtener todos los cursos
export const getCourses = async () => {
	try {
		const user = JSON.parse(Cookies.get('user'));
		const response = await axios.get(`${API_URL}/course/list-courses`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Error al obtener los cursos');
	}
};


export const getCourse = async (courseId) => {
	try {
		const user = JSON.parse(Cookies.get('user'));
		const response = await axios.get(`${API_URL}/course/get-course/${courseId}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Error al obtener el curso');
	}
}
