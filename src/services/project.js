import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from './config'
import { getCourse, getSelectedCourseCookies } from '../services/course'

// Función para obtener todos los proyectos / get all projects
export const getProjects = async (courseId) => {
	try {
		const user = JSON.parse(Cookies.get('user'))
		const response = await axios.get(`${API_URL}/project/list-projects`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			},
			params: {
				courseId: courseId
			}
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error al obtener los proyectos')
	}
};

// Función para obtener un proyecto específico / get a spesific project
export const getProject = async (projectId) => {
	try {
		const user = JSON.parse(Cookies.get('user'));
		const response = await axios.get(`${API_URL}/project/get-project/${projectId}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Error al obtener el proyecto')
	}
}


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
		const user = JSON.parse(Cookies.get('user'))
		const courseId = getSelectedCourseCookies()
		//console.log('user', user)
		const response = await axios.post(`${API_URL}/project/create-project`, projectData, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
			/*params: {
                courseId: courseId // My addition
            }*/
		})

		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error al crear el proyecto')
	}
}

export const getUserCourseProject = async (courseId) => {
	try {
		const user = JSON.parse(Cookies.get('user'))
		const response = await axios.get(`${API_URL}/project/my-course-project`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			},
			params: {
				courseId: courseId
			}
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error al obtener el proyecto')
	}
}

/*export const setUserCourseProjectCookies = (project) => {
    Cookies.set('userCourseProject', project, { expires: 7, secure: true, sameSite: 'Strict' })
}

export const getUserCourseProjectCookies = () => {
	return Cookies.get('userCourseProject')
}

export const removeUserProjectCookies = () => {
	Cookies.remove('userCourseProject')
}*/
