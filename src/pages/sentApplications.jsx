import React, { useState, useEffect } from 'react'

import TFmenu from '../components/TFmenu'
import PageLoader from '../components/PageLoader'
import SentApplicationCard from '../components/SentApplicationCard' 
import Grid from '@mui/material/Grid'

import { getSelectedCourseCookies } from '../services/course'
import { getSentApplications } from '../services/application'
import { getUserCourseProject } from '../services/project'

import '../styles/sentapplications.css'

const SentApplications = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [applications, setApplications] = useState([])
    const selectedCourseId = getSelectedCourseCookies()

    useEffect(() => {
        const fetchApplications = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedApplications = await getSentApplications()                    
                    if (fetchedApplications) {
                        const filteredApplications = fetchedApplications.filter(
                            app => app.Project.courseId === selectedCourseId)
                        setApplications(filteredApplications)
                    }
                    
                } catch (error) {
                    console.error('Error fetching sent applications:', error)
                } finally {
                    setIsLoading(false)
                }
            }
        }

        fetchApplications()
    }, [selectedCourseId])

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
            <TFmenu />
            
            {isLoading ? (
                 <PageLoader message="Loading applications..." />
            ) : (
            
                <div className='sent-applications-form'>
                    {applications.length === 0 ? (
                        <h3>You have not applied to any projects.</h3>
                    ) : (
                        <>
                            <h1>Applied projects</h1>
                            <Grid container spacing={2}>
                                {applications.map((application, index) => (
                                    <Grid item key={index} xs={12} sm={6} md={6}>
                                        <SentApplicationCard 
                                            key={application.id}
                                            projectId={application.projectId}
                                            teamName={application.Project.teamName}
                                            title={application.Project.name}
                                            description={application.Project.description}
                                            status={application.status}
                                            appliedAt={formatDate(application.createdAt)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default SentApplications