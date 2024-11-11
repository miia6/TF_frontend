import React, { useState, useEffect } from 'react'

import TFmenu from '../components/TFmenu'
import SentInvitationCard from '../components/SentInvitationCard'

import { getUsersByCourse } from '../services/user'
import { createProject, getUserCourseProject } from '../services/project'
import { getSelectedCourseCookies } from '../services/course'
import { getSentInvitations, sendInvitation } from '../services/invitation'
import Grid from '@mui/material/Grid'

import '../styles/sentinvitations.css'

const SentInvitations = () => {
    const [hasProject, setHasProject] = useState(false)
    const [projectId, setProjectId] = useState('')
    const [invitations, setInvitations] = useState([])
    const [users, setUsers] = useState([])
    const [potentialInvitees, setPotentialInvitees] = useState([])
    const selectedCourseId = getSelectedCourseCookies()

    const fetchUsers = async () => {
        if (selectedCourseId) {
            try {
                const fetchedCourseUsers = await getUsersByCourse(selectedCourseId)

                if (fetchedCourseUsers) {
                    setUsers(fetchedCourseUsers)
                } else {
                    setUsers([])
                    console.log("Failed to fetch course users")
                }

            } catch (error) {
                console.error("Error fetching course " + error)
            }
        }
    }

    const fetchProjectData = async () => {
        if (selectedCourseId) {
            try {
                const existingProject = await getUserCourseProject(selectedCourseId)
                setHasProject(!!existingProject)
                setProjectId(existingProject.id)
            } catch (error) {
                console.error("Failed to check project existence:", error)
            }
        }

    }

    const fetchSentInvitations = () => {
        // Call something from service
        const sampleInvitations = [
            {
                inviteeID: "123",
                inviteeName: "a",
            },
            {
                inviteeID: "456",
                inviteeName: "b",
            },
        ]
        setInvitations(sampleInvitations)
    }

    const handleSendInvite = async () => {
        await getSentInvitations(selectedCourseId)
        await sendInvitation()
    }

    useEffect(() => {
        fetchUsers()
        fetchProjectData()
        fetchSentInvitations()
    }, [selectedCourseId])

    useEffect(() => {
        const uninvitedUsers = users.filter(user => !invitations.map(invitation => invitation.inviteeID).includes(user.id))
        setPotentialInvitees(uninvitedUsers)
    }, [users, invitations])

    return (
        <>
            < TFmenu />
            <div className="sent-invitations-container">
                {hasProject ? (
                    <div className="sent-invitations-list">
                        <h2> Your sent invitations:</h2>
                        <Grid container spacing={2}>
                            {invitations.map(invitation => (
                                <Grid item key={invitation.inviteeID} xs={12} sm={6} md={6}>
                                    <SentInvitationCard
                                        inviteeName={invitation.inviteeName}
                                        invited={true}
                                        handleSendInvite={handleSendInvite}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <h2>Send more invitations:</h2>
                        <Grid container spacing={2}>
                            {potentialInvitees.map(user => (
                                <Grid item key={user.id} xs={12} sm={6} md={6}>
                                    <SentInvitationCard
                                        inviteeName={user.name}
                                        invited={false}
                                        handleSendInvite={handleSendInvite}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : (
                    <p className='rejection-message'> You need to own a project first. </p>
                )}
            </div>
        </>
    )
}

export default SentInvitations
