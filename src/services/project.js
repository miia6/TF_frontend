import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000'; // Reemplaza con la URL de tu backend

// Función para obtener todos los proyectos
export const getProjects = async (courseId) => {
	try {
		const user = JSON.parse(Cookies.get('user'));
		const response = await axios.get(`${API_URL}/project/list-projects`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			},
			params: {
				courseId: courseId
			}
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Error al obtener los proyectos');
	}
};

// Función para obtener un proyecto específico
export const getProject = async (projectId) => {
	try {
		const user = JSON.parse(Cookies.get('user'));
		const response = await axios.get(`${API_URL}/project/get-project/${projectId}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Error al obtener el proyecto');
	}
};

