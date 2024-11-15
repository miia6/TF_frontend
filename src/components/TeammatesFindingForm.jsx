import React, { useState, useEffect } from 'react'

import TeammateInvite from './TeammateInvite'

import { getSelectedCourseCookies, getUsersByCourse } from '../services/course'
import { getUserCourseProject, getUserProjectCookies, getProjectMemberStatusCookies } from '../services/project'
import { inviteUserToProject, getSentInvitations } from '../services/invitation'

const TeammatesFindingForm = ({ onInvitationSuccess }) => {
    const [teammates, setTeammates] = useState([])
    const [sentInvitations, setSentInvitations] = useState([])
    const [project, setProject] = useState()
    const [maxInvitations, setMaxInvitations] = useState(5)

    const selectedCourseId = getSelectedCourseCookies()

    useEffect(() => {
        const fetchProjectData = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedProject = await getUserCourseProject(selectedCourseId)
                    //console.log("fetched project: " + JSON.stringify(fetchedProject, null, 2))  
                    const currentMembers = fetchedProject.members?.length || 0
                    const remainingSlots = Math.max(0, 5 - currentMembers)   
                    setMaxInvitations(remainingSlots)
                    if (fetchedProject) {
                        setProject(fetchedProject)
                    } 
                } catch (error) {
                    console.error("Failed to fetch projects:", error)
                }
            }
        }
        fetchProjectData()
    }, [selectedCourseId])

    useEffect(() => {
        const fetchSentInvitations = async () => {
            if (project) {
                try {
                    const invitations = await getSentInvitations(project.id)
                    //console.log("invitations fetched: " + JSON.stringify(invitations, null, 2))
                    setSentInvitations(invitations)
                } catch (error) {
                    console.error('Failed to fetch sent invitations:', error)
                }
            }
        }
        fetchSentInvitations()
    }, [project])


    const handleInvite = async (users) => {
        try {
            const invitedTeammatesNames = []

            for (const user of users) {
                //console.log(`Inviting user ${user.id} to project ${project.id}`)
                const invitedTeammate = await inviteUserToProject(user.id, project.id)
                invitedTeammatesNames.push(user.name)
            }
            alert(`Invitation sent to: ${invitedTeammatesNames.join(", ")}`)
            onInvitationSuccess()
        } catch (error) {
            console.error("Error inviting user:", error)
        }
    }

    return (
        <>  
            <div className="teammates-finding-form">
                <h2>Invite teammates</h2>
                <TeammateInvite 
                    teammates={teammates} 
                    setTeammates={setTeammates} 
                    sentInvitations={sentInvitations}
                    onInvite={handleInvite}
                    maxInvitations={maxInvitations}
                />
            </div>     
        </>
    )
}

export default TeammatesFindingForm