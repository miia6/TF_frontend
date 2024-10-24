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


/**
 * Function to create a project.
 * @param {Object} projectData - Project data.
 * @param {string} projectData.name - Project title.
 * @param {string} projectData.description - Project description.
 * @param {string} projectData.teamName - Project team name.
 * @param {string} projectData.teammates - Project teammates.
 * @param {string} projectData.courseId - Course ID.
*/
export const createProject = async (projectData) => {
	try {
		const user = JSON.parse(Cookies.get('user'));
		console.log('user', user);
		const response = await axios.post(`${API_URL}/project/create-project`, projectData, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		});

		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Error al crear el proyecto');
	}
}

export const getMyCourseProject = async (courseId) => {
	try {
		const user = JSON.parse(Cookies.get('user'));
		const response = await axios.get(`${API_URL}/project/my-course-project`, {
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
		throw new Error('Error al obtener el proyecto');
	}
}

