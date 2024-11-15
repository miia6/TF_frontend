import React, { useState, useEffect } from 'react'

import TFmenu from '../components/TFmenu'
import PageLoader from '../components/PageLoader'
import Grid from '@mui/material/Grid'
import SentInvitationCard from '../components/SentInvitationCard'

import { getUsersByCourse } from '../services/course'
import { getUserCourseProject, getUserProjectCookies } from '../services/project'
import { getSelectedCourseCookies } from '../services/course'
import { getSentInvitations } from '../services/invitation'

import '../styles/sentinvitations.css'

const SentInvitations = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [invitations, setInvitations] = useState([])
    const [projectName, setProjectName] = useState()

    const selectedCourseId = getSelectedCourseCookies()
    const projectId = getUserProjectCookies()

    useEffect(() => {
        const fetchInvitations = async () => {
            if (selectedCourseId && projectId) {
                try {
                    const fetchedInvitations = await getSentInvitations(projectId)
                    setInvitations(fetchedInvitations)

                    const fetchedProject = await getUserCourseProject(selectedCourseId) 
                    if (fetchedProject) {
                        setProjectName(fetchedProject.name)
                    }

                } catch (error) {
                    console.error('Error fetching invitations:', error)
                } finally {
                    setIsLoading(false)
                }
            } else {
                console.log('Failed to fetch course')
            }
        }

        fetchInvitations()
    }, [selectedCourseId, projectId])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fi-FI', {
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric', 
        })
    }

    return (
        <>
            < TFmenu />

            {isLoading && <PageLoader message="Loading Invitations" />}

            <div className='received-invitations-form'>
                {!isLoading && invitations.length === 0 ? (
                    <h3>No invitations.</h3>
                ) : (
                    <>
                    <h1>Project Invitations</h1>
                        <Grid container spacing={2}>
                            {invitations.map((invitation, index) => (
                                <Grid item key={index} xs={12} sm={6} md={6}>
                                    <SentInvitationCard 
                                        key={invitation.id}
                                        title={projectName}
                                        userName={invitation.User.name}
                                        userEmail={invitation.User.email}
                                        status={invitation.status}
                                        createdAt={formatDate(invitation.createdAt)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </div>
        </>
    )
}

export default SentInvitations
