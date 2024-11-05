import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import PageLoader from '../components/PageLoader'
import SearchProjectCard from '../components/SearchProjectCard'
import Grid from '@mui/material/Grid'

import { getSelectedCourseCookies } from '../services/course'
import { getProjects, getUserCourseProject } from '../services/project'

import '../styles/projectsearch.css'
import '../styles/searchprojectcard.css'

const ProjectSearch = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [projects, setProjects] = useState()
    const [existingProjects, setExistingProjects] = useState(false) // see if there are any projects in the course yet
    const [projectMember, setProjectMember] = useState(false) // see whether user is already a member of a project or not
    const [searchTerm, setSearchTerm] = useState('')
    const selectedCourseId = getSelectedCourseCookies()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjects = async () => {
            if (selectedCourseId) {
                setIsLoading(true)
                try {
                    const fetchedUserProject = await getUserCourseProject(selectedCourseId)
                    const fetchedProjects = await getProjects(selectedCourseId)
                    //console.log("Projects fetched: " + JSON.stringify(fetchedProjects, null, 2))
                    setProjectMember(!!fetchedUserProject)
                    setExistingProjects(!!fetchedProjects)
                    
                    if (fetchedProjects) {
                        setProjects(fetchedProjects)
                        console.log('Fetched existing projects')
                    } else {
                        console.log("Failed to fetch existing projects")
                    }
                
                } catch (error) {
                    console.error("Error fetching projects " + error)
                } finally {
                    setIsLoading(false); // Stop loading
                }

            }
        }

        fetchProjects()
    }, [selectedCourseId])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <>
            < TFmenu />

            {isLoading && <PageLoader message="Loading Projects" />}

            {existingProjects ? (
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
                            .filter(project =>
                                project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
                            )
                            .map((project, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <SearchProjectCard
                                        teamName={project.teamName || " "}
                                        title={project.name || " "}
                                        description={project.description || " "}
                                        teammates={project.teammates || []}
                                        projectMember={projectMember}
                                        maxMembers={project.maxMembers}
                                    />
                                </Grid>
                            ))}
                    </Grid>

                </div>
            ) : (
                <div className="no-projects">
                    <p> </p>
                </div>
            )}
        </>
    )
}

export default ProjectSearch
