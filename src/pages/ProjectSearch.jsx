import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getProject, getProjects } from '../services/project'

import TFmenu from '../components/TFmenu'
import CourseInfo from '../components/CourseInfo'
import UserProjectCard from '../components/SearchProjectCard'
import Grid from '@mui/material/Grid'

import '../styles/projectsearch.css'
import '../styles/searchprojectcard.css'

// TEST PROJECTS
/*const projects = [
    {
        teamName: "Team A",
        title: "Project Alpha",
        description: "This is a description for Project Alpha. It covers important aspects.",
        teammates: ["Alice", "Bob", "Charlie"]
    },
    {
        teamName: "Team B",
        title: "Project Beta",
        description: "This project is all about beta testing and feedback collection. This project is all about beta testing and feedback collection.",
        teammates: ["Dave", "Eve"]
    },
    {
        teamName: "Team C",
        title: "Project Gamma",
        description: "nothing.",
        teammates: ["Frank", "Grace", "Heidi"]
    },
    {
        teamName: "Team C",
        title: "Project Gamma",
        description: "ykskakskolmeneljäviiskuus seittämän kaheksan yheksän kymmenen.123456712345671234567123456789012",
        teammates: ["Frank", "Grace", "Heidi"]
    },
    {
        teamName: "Team C",
        title: "Project Gamma",
        description: "yks kaks kolme neljä viis kuus seittämän kaheksan yheksän kymmenen. 123456712345671 234567123456789012",
        teammates: ["Frank", "Grace", "Heidi"]
    },
    {
        teamName: "Team C",
        title: "Project Gamma",
        description: "Project Gamma focuses on developing innovative solutions. Project Gamma focuses on developing innovative solutions.",
        teammates: ["Frank", "Grace", "Heidi"]
    },
    
]*/

const ProjectSearch = ({ appLogo }) => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState()

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const course = localStorage.getItem('selectedCourse')
        getProjects(course).then((projects) => {
            setProjects(projects)
        })
    }, [])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <>
            < TFmenu />
            < CourseInfo />

            <div className='project-search-form'>
                <h1>Projects</h1>

                <div className="project-search">
                    <label htmlFor="projectSearch">Search projects:</label>
                    <input
                        type="text"
                        id="projectSearch"
                        placeholder="Search by project titles, or description words or #tags."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="input"
                    />
                </div>

                <Grid container spacing={2}>
                    {projects
                        ?.filter(project =>
                            project?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project?.description.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((project, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <UserProjectCard
                                    teamName={project?.teamName}
                                    title={project?.name}
                                    description={project?.description}
                                    teammates={project?.teammates}
                                />
                            </Grid>
                        ))}
                </Grid>

            </div>
        </>
    )
}

export default ProjectSearch
