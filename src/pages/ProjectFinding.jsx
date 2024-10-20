import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectProposalForm from '../components/ProjectProposalForm'
import ProjectCard from '../components/ProjectCard'
import '../styles/projectfinding.css'
import '../styles/dashboard.css'
import Grid from '@mui/material/Grid';
import TFToolbar from '../components/TFToolbar'
import { getProjects } from '../services/project'

const ProjectFinding = ({ appLogo }) => {
    const navigate = useNavigate()
    const [course, setCourse] = useState('')
    const [projects, setProjects] = useState([])

    useEffect(() => {
        setCourse(localStorage.getItem('selectedCourse'))
    }, [])

    const handleLogout = () => {
        // Add your logout logic here (e.g., clear session or tokens)
        navigate('/login'); // Redirect back to login page after logging out
    }

    useEffect(() => {
        if (!course) {
            return
        }
        getProjects(course).then((projects) => {
            setProjects(projects)
            console.log(projects)
        })
    }, [course])


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
                    {projects.filter(x => searchTerm.includes(x.name) || x.name.includes(searchTerm)).map(
                        x => <Grid key={x.id} item xs={4}>
                            <ProjectCard teamName={x.name} />
                        </Grid>
                    )}
                </Grid>
            </div>
        </>
    )
}

export default ProjectFinding

//nho phai mo truoc khi hut thong minh
