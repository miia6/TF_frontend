import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import PageLoader from '../components/PageLoader'
import ProjectApplicationCard from '../components/ProjectApplicationCard'
import Grid from '@mui/material/Grid'

import { getSelectedCourseCookies } from '../services/course'
import { getUserCourseProject } from '../services/project'
import { getProjectApplicants, handleUserApplication, getApplicationsAmountCookies, setApplicationsAmountCookies, removeApplicationsAmountCookies } from '../services/application'

import '../styles/projectapplications.css'

const ProjectApplications = ()  => {
    const { projectId } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [applications, setApplications] = useState([])
    const [projectName, setProjectName] = useState()
    
    const selectedCourseId = getSelectedCourseCookies() 

    useEffect(() => {
        const fetchApplicants = async () => {
            if (selectedCourseId && projectId) {
                try {
                    const fetchedApplications = await getProjectApplicants(projectId)
                    setApplications(fetchedApplications)

                    const fetchedProject = await getUserCourseProject(selectedCourseId) 
                    if (fetchedProject) {
                        setProjectName(fetchedProject.name) 
                    }

                } catch (error) {
                    console.error('Error fetching applicants:', error)
                } finally {
                    setIsLoading(false)
                }
            } else {
            console.log('Failed to fetch course or project')
            }
        }
        fetchApplicants()
    }, [selectedCourseId, projectId])

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
            /*setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === updatedApplication.id ? updatedApplication : app)
            )*/
            alert(`Application accepted!`)
            const currentAmount = parseInt(getApplicationsAmountCookies(), 10)
            if (currentAmount && currentAmount > 0) {
                const newAmount = currentAmount - 1;
                setApplicationsAmountCookies(newAmount)
            }
            window.location.reload()
            
        } catch (error) {
            console.error('Error accepting application:', error)
        }
    }

    const handleReject = async (applicationId) => {
        try {
            const updatedApplication = await handleUserApplication(applicationId, false)
            /*setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === updatedApplication.id ? updatedApplication : app
                )
            )*/
            alert('Application rejected')

            const currentAmount = parseInt(getApplicationsAmountCookies(), 10)
            if (currentAmount && currentAmount > 0) {
                const newAmount = currentAmount - 1;
                setApplicationsAmountCookies(newAmount)
            }
            window.location.reload()
            
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
                    <h3>No applications.</h3>
                ) : (
                    <>
                        <h1>Project Applications</h1>
                        <Grid container spacing={2}>
                            {applications.map((application, index) => (
                                <Grid item key={index} xs={12} sm={6} md={6}>
                                    <ProjectApplicationCard 
                                        key={application.id}
                                        title={projectName ? projectName : ''}
                                        userName={application.User.name}
                                        userEmail={application.User.email}
                                        status={application.status}
                                        appliedAt={formatDate(application.createdAt)}
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