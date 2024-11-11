import axios from 'axios'
import { API_URL } from './config'
import Cookies from 'js-cookie'

import { getCurrentUser } from './auth'
import { getCourse, getSelectedCourseCookies } from './course'

// Get all course projects / Función para obtener todos los proyectos 
const getProjects = async (courseId) => {
	try {
		const user = getCurrentUser()
		const response = await axios.get(`${API_URL}/project/list-projects`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			},
			params: {
				courseId: courseId
			}
		})
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error listing projects')
	}
}

// Get a spesific project / Función para obtener un proyecto específico
const getProject = async (projectId) => {
	console.log("received project id " + projectId)
	try {
		const user = getCurrentUser()
		const response = await axios.get(`${API_URL}/project/get-project/${projectId}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error getting project')
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
const createProject = async (projectData) => {
	try {
		const user = getCurrentUser()
		const courseId = getSelectedCourseCookies()
		const response = await axios.post(`${API_URL}/project/create-project`, projectData, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error creating project')
	}
}

const getUserCourseProject = async (courseId) => {
	try {
		const user = getCurrentUser()
		const response = await axios.get(`${API_URL}/project/my-course-project`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			},
			params: {
				courseId: courseId
			}
		})
		//console.log("project: " + response.data)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Error getting the user's project")
	}
}

const applyToProject = async (projectId) => {
	try {
		const user = getCurrentUser()
		const response = await axios.post(`${API_URL}/project/apply-to-project`,
			{ projectId },
			{
				headers: {
					'Authorization': `Bearer ${user.token}`
				}
			}
		)
		return response.data
	} catch (error) {
		console.error('Error applying to project', error)
		throw error
	}
}


const getSentApplications = async () => {
	try {
		const user = getCurrentUser()
		const response = await axios.get(`${API_URL}/project/projects-applications`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data
	} catch (error) {
		console.error('Error getting sent applications:', error)
		throw error
	}
}

const getProjectApplicants = async (projectId) => {
	try {
		const user = getCurrentUser()
		const response = await axios.get(`${API_URL}/project/project-applicants?projectId=${projectId}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data
	} catch (error) {
		console.error('Error getting applicants:', error)
		throw error
	}
}

const acceptUserApplication = async (applicationId, projectId) => {
	const user = getCurrentUser()
	// TO DO

}

const rejectUserApplication = async (applicationId, projectId) => {
	const user = getCurrentUser()
	// TO DO
}

const setAppliedProjectsCookies = async (projectId) => {
	//Cookies.set('hasAppliedProjects', 'true', { expires: 7, secure: true, sameSite: 'Strict' })
	// Get the existing projects from the cookie (if any)
	const appliedProjectsIDs = Cookies.get('hasAppliedProjects');
	const projectIds = appliedProjectsIDs ? JSON.parse(appliedProjectsIDs) : [];

	// Add the new project ID only if it's not already in the array
	if (!projectIds.includes(projectId)) {
		projectIds.push(projectId);
	}

	// Store the updated array back in the cookie as a JSON string
	Cookies.set('hasAppliedProjects', JSON.stringify(projectIds), {
		expires: 7,
		secure: true,
		sameSite: 'Strict',
	});
}

const getAppliedProjectsCookies = () => {
	//return Cookies.get('hasAppliedProjects')
	const appliedProjectsIDs = Cookies.get('hasAppliedProjects');
	return appliedProjectsIDs ? JSON.parse(appliedProjectsIDs) : [];
}

// Remove current course Id from cookies
const removeAppliedProjectsCookies = () => {
	Cookies.remove('hasAppliedProjects')
}


export {
	getProjects,
	getProject,
	createProject,
	getUserCourseProject,
	applyToProject,
	getSentApplications,
	getProjectApplicants,
	acceptUserApplication,
	rejectUserApplication,
	setAppliedProjectsCookies,
	getAppliedProjectsCookies,
	removeAppliedProjectsCookies
}
