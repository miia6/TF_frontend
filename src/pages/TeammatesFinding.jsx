import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/teammatesfinding.css'
import Grid from '@mui/material/Grid';
import ProposedProjectCard from '../components/ProposedProjectCard';
import TFToolbar from '../components/TFToolbar'

const TeammatesFinding = () => {
    const navigate = useNavigate()
    const [course, setCourse] = useState('')

    useEffect(() => {
        console.log('test', localStorage.getItem('selectedCourse'))
        setCourse(localStorage.getItem('selectedCourse'))
    }, [])

    return (
        <div className="teammates-finding-container">
            <TFToolbar />

            <div className='course'>{course}</div>

            <h1>Find your teammates</h1>
            <h3>Description of the page</h3>
            <h3>Your project has 2 applications</h3>

            <button
                onClick={() => navigate('/applications')}
                className='view-button'
            >
                View applications
            </button>

            <Grid container spacing={2}>
                {["1", "2", "3", "4", "5"].map(
                    x => <Grid key={x} item xs={4}>
                        <ProposedProjectCard teamName={"Your team"} />
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default TeammatesFinding