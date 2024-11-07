import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import PageLoader from '../components/PageLoader'
import SentApplicationCard from '../components/SentApplicationCard' 
import Grid from '@mui/material/Grid'

import { getSentApplications } from '../services/project'

import '../styles/sentapplications.css'

const SentApplications = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [applications, setApplications] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchApplications = async () => {
            setIsLoading(true)
            try {
                const fetchedApplications = await getSentApplications()
                setApplications(fetchedApplications)
            } catch (error) {
                console.error('Error fetching sent applications:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchApplications()
    }, [])

    return (
        <>
            <TFmenu />
            
            {isLoading && <PageLoader message="Loading applications..." />}
            
            <div className='sent-applications-form'>
                {!isLoading && applications.length === 0 ? (
                    <h3>No sent applications found.</h3>
                ) : (
                    <>
                        <h1>Sent Applications</h1>
                            <Grid container spacing={2}>
                                {applications.map((application, index) => (
                                    <Grid item key={index} xs={12} sm={6} md={4}>
                                        <SentApplicationCard 
                                            key={application.id}
                                            projectId={application.projectId}
                                            teamName={application.Project.teamName}
                                            title={application.Project.name}
                                            description={application.Project.description}
                                            status={application.status}
                                            createdAt={application.createdAt}
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

export default SentApplications