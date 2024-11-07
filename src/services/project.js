import axios from 'axios'
import { API_URL } from './config'
import { getCurrentUser } from './auth'
import { getCourse, getSelectedCourseCookies } from './course'

// Get all course projects / Función para obtener todos los proyectos 
const getProjects = async (courseId) => {
	try {
		const user = getCurrentUser() //JSON.parse(Cookies.get('user'))
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
		throw new Error('Error listing projects')
	}
}

// Get a spesific project / Función para obtener un proyecto específico
const getProject = async (projectId) => {
	try {
		const user = getCurrentUser() //JSON.parse(Cookies.get('user'));
		const response = await axios.get(`${API_URL}/project/get-project/${projectId}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data;
	} catch (error) {
		console.error(error);
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

export { getProjects, getProject, createProject, getUserCourseProject, applyToProject, getSentApplications }
