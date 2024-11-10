import React, { useState, useEffect } from 'react'

import TFmenu from '../components/TFmenu'
import SentInvitationCard from '../components/SentInvitationCard'

import { createProject, getUserCourseProject } from '../services/project'
import { getSelectedCourseCookies } from '../services/course'
import Grid from '@mui/material/Grid'

import '../styles/sentinvitations.css'

const SentInvitations = () => {
    const [hasProject, setHasProject] = useState(false)
    const [invitations, setInvitations] = useState([])
    const selectedCourseId = getSelectedCourseCookies()

    const fetchProjectData = async () => {
        if (selectedCourseId) {
            try {
                const existingProject = await getUserCourseProject(selectedCourseId)
                setHasProject(!!existingProject)
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
                inviteeHasProject: false,
            },
            {
                inviteeID: "456",
                inviteeName: "b",
                inviteeHasProject: true,
            },
        ]
        setInvitations(sampleInvitations)
    }

    useEffect(() => {
        fetchProjectData()
        fetchSentInvitations()
    }, [selectedCourseId])

    return (
        <>
            < TFmenu />

            <div className="sent-invitations-container">
                {hasProject ? (
                    <div className="sent-invitations-list">
                        <h2> Your sent invitations: </h2>
                        <Grid container spacing={2}>
                            {invitations.map(invitation => (
                                <Grid item key={invitation.inviteeID} xs={12} sm={6} md={6}>
                                    <SentInvitationCard
                                        inviteeID={invitation.inviteeID}
                                        inviteeName={invitation.inviteeName}
                                        inviteeHasProject={invitation.inviteeHasProject}
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
