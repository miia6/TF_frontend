import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import PageLoader from '../components/PageLoader'
import ProjectApplicationCard from '../components/ProjectApplicationCard'
import Grid from '@mui/material/Grid'

import { getSelectedCourseCookies } from '../services/course'
import { getProjectApplicants, getUserCourseProject, handleUserApplication } from '../services/project'

import '../styles/projectapplications.css'

const ProjectApplications = () => {
    const { projectId } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [applications, setApplications] = useState([])
    const [projectName, setProjectName] = useState()
    const selectedCourseId = getSelectedCourseCookies() 

    useEffect(() => {
        if (projectId) {
            const fetchApplicants = async () => {
                setIsLoading(true)
                try {
                    const fetchedApplications = await getProjectApplicants(projectId)
                    setApplications(fetchedApplications)
                } catch (error) {
                    console.error('Error fetching applicants:', error)
                } finally {
                    setIsLoading(false)
                }
            }

            fetchApplicants()
        }
    }, [projectId])

    useEffect(() => {
        const fetchProjectName = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedProject = await getUserCourseProject(selectedCourseId) 
                    if (fetchedProject) {
                        setProjectName(fetchedProject.name) 
                    }
                    
                } catch (error) {
                    console.error("Failed to fetch projects:", error)
                }
            }
        }

        fetchProjectName()
    }, [selectedCourseId])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fi-FI', {
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric', 
        })
    }

    const handleAccept = async (applicationId) => {
        try {
            const updatedApplication = await handleUserApplication(applicationId, true)
            console.log(updatedApplication)
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === updatedApplication.id ? updatedApplication : app)
            )
            alert(`Accepted user to ${projectName}`)
        } catch (error) {
            console.error('Error accepting application:', error)
        }
    }

    const handleReject = async (applicationId) => {
        try {
            const updatedApplication = await handleUserApplication(applicationId, false)
            alert('Rejected user application')
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === updatedApplication.id ? updatedApplication : app
                )
            )
        } catch (error) {
            console.error('Error rejecting application:', error)
        }
    }

    return (
        <>
            < TFmenu />

            {isLoading && <PageLoader message="Loading Applications" />}

            <div className='received-applications-form'>
                {!isLoading && applications.length === 0 ? (
                    <h3>No applications found for this project.</h3>
                ) : (
                    <>
                        <h1>Project Applications</h1>
                        <Grid container spacing={2}>
                            {applications.map((application, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <ProjectApplicationCard 
                                        key={application.id}
                                        title={projectName}
                                        userName={application.User.name}
                                        userEmail={application.User.email}
                                        status={application.status}
                                        appliedAt={formatDate(application.createdAt)}
                                        acceptedAt={application.updatedAt ? formatDate(application.updatedAt) : null}
                                        applicationId={application.id}
                                        projectId={projectId}
                                        onAccept={() => handleAccept(application.id)}
                                        onReject={() => handleReject(application.id)}
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

export default ProjectApplications