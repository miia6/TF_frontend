import axios from 'axios'
import Cookies from 'js-cookie'
import { API_URL } from './config'
import { getCurrentUser } from './auth'
import { getUserCourseProject } from './project'

const getSentInvitations = async (courseId) => {
    try {
        const projects = await getUserCourseProject(courseId)
        const project = projects[0]
        console.log(`TEST: ${project}`)
    } catch (error) {
        console.error(error)
        throw new Error('Error getting sent invitations.')
    }
}

export { getSentInvitations }