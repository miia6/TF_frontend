import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import TeammateInvite from './TeammateInvite'

import { getSelectedCourseCookies } from '../services/course'
import { getUserCourseProject, inviteUserToProject, getSentInvitations } from '../services/project'
import { getUsersByCourse } from '../services/user'

const TeammatesFindingForm = () => {
    const [teammates, setTeammates] = useState([])
    const [sentInvitations, setSentInvitations] = useState([])
    const [project, setProject] = useState()
    const selectedCourseId = getSelectedCourseCookies()

    useEffect(() => {
        const fetchProjectData = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedProject = await getUserCourseProject(selectedCourseId)     
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
                    console.log("invitations fetched: " + JSON.stringify(invitations, null, 2))
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
        } catch (error) {
            console.error("Error inviting user:", error)
        }
    }

    return (
        <>  
            <div className="teammates-finding-form">
                <h1>Invite teammates</h1>
                <TeammateInvite 
                    teammates={teammates} 
                    setTeammates={setTeammates} 
                    sentInvitations={sentInvitations}
                    onInvite={handleInvite}
                />
            </div>     
        </>
    )
}

export default TeammatesFindingForm