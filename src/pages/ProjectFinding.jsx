import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectProposalForm from '../components/ProjectProposalForm'
import ProjectCard from '../components/ProjectCard'
import '../styles/projectfinding.css'
import '../styles/dashboard.css'
import Grid from '@mui/material/Grid';
import TFToolbar from '../components/TFToolbar'

const ProjectFinding = ({ appLogo }) => {
    const navigate = useNavigate()
    const [course, setCourse] = useState('')

    useEffect(() => {
        setCourse(localStorage.getItem('selectedCourse'))
    }, [])
    const handleLogout = () => {
        // Add your logout logic here (e.g., clear session or tokens)
        navigate('/login'); // Redirect back to login page after logging out
    }

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const term = event.target.value
        setSearchTerm(term)
    }

    return (
        <>
            <TFToolbar />

            <div className='course'>{course}</div>

            <div className='project-finding'>
                <h1>Projects</h1>
                <h3>Description of the page</h3>

                <div className="project-search">
                    <label htmlFor="project">Search:</label>
                    <input
                        type="text"
                        id="project"
                        className="input"
                        onChange={handleSearch}
                    />
                </div>

                <Grid container spacing={2}>
                    {["1", "2", "3", "4", "5"].filter(x => searchTerm.includes(x) || x.includes(searchTerm)).map(
                        x => <Grid key={x} item xs={4}>
                            <ProjectCard teamName={x} />
                        </Grid>
                    )}
                </Grid>
            </div>
        </>
    )
}

export default ProjectFinding

//nho phai mo truoc khi hut thong minh