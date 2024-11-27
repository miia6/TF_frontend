import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageLoader from '../components/PageLoader'
import TFmenu from '../components/TFmenu'
import UserProjectCard from '../components/UserProjectCard'
import ProjectEditForm from '../components/ProjectEditForm'
import { editProject } from '../services/project'

import { getCurrentUserData } from '../services/auth'
import { getSelectedCourseCookies, getUsersByCourse } from '../services/course'
import { getUserCourseProject } from '../services/project'

import '../styles/userproject.css'

const UserProject = () => {
    const [editting, setEditting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [project, setProject] = useState(null)
    const [teammates, setTeammates] = useState(null)
    const selectedCourseId = getSelectedCourseCookies()

    const navigate = useNavigate()

    const handleEditProject = async (edittedProjectData) => {
        setIsLoading(true)
        await editProject(edittedProjectData)
        setProject({ ...project, ...edittedProjectData })
        setEditting(false)
        setIsLoading(false)
    }

    useEffect(() => {
        const fetchProjectData = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedProject = await getUserCourseProject(selectedCourseId)
                    //console.log(fetchedProject)
                    const fetchedCourseUsers = await getUsersByCourse(selectedCourseId)
                    const currentUser = await getCurrentUserData()
                    if (fetchedProject) {
                        setProject(fetchedProject)
                        const teammatesNames = getTeammatesNames(fetchedProject.members, fetchedCourseUsers, currentUser.name)
                        setTeammates(teammatesNames)
                    }

                } catch (error) {
                    console.error("Error fetching project: " + error)
                } finally {
                    setIsLoading(false)
                }
            } else {
                setProject(null)
                setIsLoading(false)
            }
        }

        fetchProjectData()
    }, [selectedCourseId])

    const getTeammatesNames = (teammates, users, currentUserName) => {
        return teammates.map(teammate => {
            const user = users.find(user => user.id === teammate.userId)
            return user ? user.name : 'Unknown'
        })
            .filter(name => name !== currentUserName)
            .join(', ')
    }

    return (
        <>
            < TFmenu />

            {isLoading ? (
                <PageLoader message="Loading project..." />

            ) : (

                <div className="project-proposal-container">
                    {project && !editting ? (
                        <UserProjectCard
                            teamName={project.teamName}
                            title={project.name}
                            description={project.description}
                            keywords={project.keywords}
                            skills={project.skills}
                            teammates={teammates}
                            setEditting={setEditting}
                        />
                    ) : project && editting ? (
                        <ProjectEditForm
                            teamName={project.teamName}
                            title={project.name}
                            description={project.description}
                            keywords={project.keywords}
                            skills={project.skills}
                            teammates={teammates}
                            setEditting={setEditting}
                            handleEditProject={handleEditProject}
                        />
                    ) : (
                        <div className="no-project-container">
                            <h2 className="no-project-header">
                                You are not a member of a project yet.
                            </h2>
                            <div className="no-project-links">
                                <p>Find new projects:</p>
                                <a href="/projectSearch">Search projects</a>
                                <p>... or create a new project:</p>
                                <a href="/projectProposal">Create a new project</a>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default UserProject
