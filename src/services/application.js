import axios from 'axios'
import { API_URL } from './config'

import { getCurrentUser } from './auth'

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

const handleUserApplication = async (applicationId, status) => {
	try {
		const user = getCurrentUser()
        const response = await axios.post(`${API_URL}/project/update-project-request-status`, 
			{ requestId: applicationId, acceptRequest: status },
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
					'Content-Type': 'application/json'  
                }
            }
		)
        return response.data
    } catch (error) {
        console.error('Error updating status:', error)
        throw error
    }
}

export { getSentApplications, getProjectApplicants, handleUserApplication,}