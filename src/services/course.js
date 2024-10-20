import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000'; // Reemplaza con la URL de tu backend

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
