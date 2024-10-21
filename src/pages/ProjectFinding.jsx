import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectProposalForm from '../components/ProjectProposalForm'
import ProjectCard from '../components/ProjectCard'
import '../styles/projectfinding.css'
import '../styles/dashboard.css'
import Grid from '@mui/material/Grid';
import TFmenu from '../components/TFmenu'
import CourseInfo from '../components/CourseInfo'

const ProjectFinding = ({ appLogo }) => {
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <>
            < TFmenu />
            < CourseInfo />

            {/*<div className='project-finding-container'>*/}
                <div className='project-finding-form'>
                    <h1>Projects</h1>
                    <h3>Description of the page</h3>

                    <div className="project-search">
                        <label htmlFor="projectSearch">Search:</label>
                        <input
                            type="text"
                            id="projectSearch"
                            placeholder="Type to search. Search by words, #tags or team names."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="input"
                        />
                    </div>
                {/*</div>*/}

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