import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import PageLoader from '../components/PageLoader'
import ProjectInvitationCard from '../components/ProjectInvitationCard'
import Grid from '@mui/material/Grid'

import { getSelectedCourseCookies } from '../services/course'
import { getReceivedInvitations, respondToInvitation } from '../services/invitation'

import '../styles/projectinvitations.css'

const ReceivedInvitations = () => {
    const [isLoading, setIsLoading] = useState(true)
    const selectedCourseId = getSelectedCourseCookies() 
    const [invitations, setInvitations] = useState([])
    const [courseInvitations, setCourseInvitations] = useState([])

    useEffect(() => {
        const fetchInvitations = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedInvitations = await getReceivedInvitations()
                    setInvitations(fetchedInvitations) 
                    
                    const filtered = fetchedInvitations.filter(
                        invitation => invitation.Project.courseId === selectedCourseId
                    )
                    setCourseInvitations(filtered)
                    
                } catch (error) {
                    console.error("Failed to fetch invitations:", error)
                } finally {
                    setIsLoading(false)
                }
            }
        }

        fetchInvitations()
    }, [selectedCourseId])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fi-FI', {
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric', 
        })
    }

    const handleAccept = async (invitationId) => {
        try {
            const updatedInvitation = await respondToInvitation(invitationId, true)
            console.log(updatedInvitation)
            setCourseInvitations((prevInvitations) =>
                prevInvitations.filter((inv) => inv.id !== invitationId)
            )
            alert(`Invitation accepted`)
        } catch (error) {
            console.error('Error accepting invitation:', error)
        }
    }

    const handleReject = async (invitationId) => {
        try {
            const updatedInvitation = await respondToInvitation(invitationId, false)
            console.log(updatedInvitation)
            setCourseInvitations((prevInvitations) =>
                prevInvitations.filter((inv) => inv.id !== invitationId)
            )
            alert(`Invitation rejected`)
        } catch (error) {
            console.error('Error accepting invitation:', error)
        }
    }


    return (
        <>
            <TFmenu />

            {isLoading && <PageLoader message="Loading Invitations" />}

            <div className='received-invitations-form'>
                {!isLoading && courseInvitations.length === 0 ? (
                    <h3>No invitations.</h3>
                ) : (
                    <>
                    <h1>Project Invitations</h1>
                        <Grid container spacing={2}>
                            {courseInvitations.map((invitation, index) => (
                                <Grid item key={index} xs={12} sm={6} md={6}>
                                    <ProjectInvitationCard 
                                        key={invitation.id}
                                        title={invitation.Project.name}
                                        teamName={invitation.Project.teamName}
                                        description={invitation.Project.description}
                                        status={invitation.status}
                                        createdAt={formatDate(invitation.createdAt)}
                                        invitationId={invitation.id}
                                        projectId={invitation.Project.id}
                                        onAccept={() => handleAccept(invitation.id)}
                                        onReject={() => handleReject(invitation.id)}
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

export default ReceivedInvitations