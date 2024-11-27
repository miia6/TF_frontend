import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from './config'
import { getCurrentUser } from './auth'

const inviteUserToProject = async (userToInvite, projectId) => {
	try {
		const user = getCurrentUser()
        const response = await axios.post(`${API_URL}/project/send-invitation`, 
			{ userId: userToInvite, projectId: projectId },
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            }
		)
        return response.data
    } catch (error) {
        console.error('Error updating status:', error)
        throw error
    }

}

const getSentInvitations = async (projectId) => {
	try {
		const user = getCurrentUser()
        const response = await axios.get(`${API_URL}/project/project-sent-invitations?projectId=${projectId}`, {
            headers: {
				'Authorization': `Bearer ${user.token}` 
			}
        })
        return response.data
    } catch (error) {
        console.error('Error getting sended invitations:', error)
        throw error
    }
}

const getReceivedInvitations = async () => {
	try {
		const user = getCurrentUser()
        const response = await axios.get(`${API_URL}/project/received-invitations`, 
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            }
		)
        return response.data
    } catch (error) {
        console.error('Error updating status:', error)
        throw error
    }
}

const respondToInvitation = async (invitationId, status) => {
	try {
		const user = getCurrentUser()
        const response = await axios.post(`${API_URL}/project/respond-invitation`, 
			{ invitationId: invitationId, accept: status },
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

export { inviteUserToProject, 
         getSentInvitations, 
         getReceivedInvitations, 
         respondToInvitation }

