import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import PageLoader from '../components/PageLoader'
import SearchProjectCard from '../components/SearchProjectCard'
import Grid from '@mui/material/Grid'

import { getSelectedCourseCookies } from '../services/course'
import { getProjects, getUserCourseProject, getUserProjectCookies } from '../services/project'
import { getSentApplications } from '../services/application'

import '../styles/projectsearch.css'

const ProjectSearch = () => {
    const [projects, setProjects] = useState([])

    const [projectMember, setProjectMember] = useState(false)
    const [appliedProjects, setAppliedProjects] = useState()

    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const selectedCourseId = getSelectedCourseCookies()
    const projectId = getUserProjectCookies()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjectsData = async () => {
            if (selectedCourseId) {
                setIsLoading(true)

                try {
                    const fetchedProjects = await getProjects(selectedCourseId)
                    console.log(fetchedProjects)

                    if (projectId) {
                        setProjectMember(true)
                    }

                    const fetchedAppliedProjects = await getSentApplications()
                    const fetchedAppliedProjectsIds = new Set(fetchedAppliedProjects.map(app => app.Project.id))

                    if (fetchedProjects) {
                        const filteredProjects = fetchedProjects.filter(
                            project => !fetchedAppliedProjectsIds.has(project.id)
                        )
                        setProjects(filteredProjects)
                    } else {
                        console.log("Failed to fetch existing projects")
                    }

                } catch (error) {
                    console.error("Error fetching projects " + error)
                    setProjects([])
                } finally {
                    setIsLoading(false)
                }
            }
        }

        fetchProjectsData()
    }, [selectedCourseId, projectId])


    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <>
            < TFmenu />

            {isLoading && <PageLoader message="Loading Projects" />}

            {projects.length > 0 ? (
                <div className='project-search-form'>
                    <h1>Projects</h1>

                    <div className="project-search">
                        <label htmlFor="projectSearch">Search projects:</label>
                        <input
                            type="text"
                            id="projectSearch"
                            placeholder="Search by project titles, or description words or keywords."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="input"
                        />
                    </div>

                    <Grid container spacing={2}>
                        {projects
                            .filter(project =>
                                project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                (project.keywords && project.keywords.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                (project.skills && project.skills.toLowerCase().includes(searchTerm.toLowerCase()))
                            )
                            .map((project, index) => (
                                <Grid item key={index} xs={12} sm={12} md={6} lg={4}>
                                    <SearchProjectCard
                                        projectId={project.id}
                                        teamName={project.teamName || " "}
                                        title={project.name || " "}
                                        description={project.description || " "}
                                        keywords={project.keywords}
                                        skills={project.skills}
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
