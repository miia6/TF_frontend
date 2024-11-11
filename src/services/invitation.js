import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from './config'
import { getCurrentUser } from './auth'
import { getUserCourseProject } from './project'
import { getCourse, getSelectedCourseCookies } from './course'

const getSentInvitations = async (courseId) => {
    try {
        const user = await getCurrentUser()
        const project = await getUserCourseProject(courseId)
        const response = await axios.get(`${API_URL}/project/sent-invitations`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            params: {
                projectId: project.id
            }
        })
        console.log(response.data)
    } catch (error) {
        console.error(error)
        throw new Error('Error getting sent invitations.')
    }
}

const sendInvitation = async (userId, projectId) => {
    try {
        const response = await axios.post(`${API_URL}/project/send-invitation`,
            { userId, projectId },
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
        )
        return response.data
    } catch {
        console.error(error)
        throw new Error('Error sending invitations.')
    }

}

export {
    getSentInvitations,
    sendInvitation,
}