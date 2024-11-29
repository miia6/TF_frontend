import React, { useEffect, useState } from 'react'

import PageLoader from '../components/PageLoader'
import TFmenu from '../components/TFmenu'
import UserProjectCard from '../components/UserProjectCard'
import ProjectEditForm from '../components/ProjectEditForm'
import { editProject, deleteProject, removeProjectMemberStatusCookies, removeUserProjectCookies } from '../services/project'

import { getCurrentUserData } from '../services/auth'
import { getSelectedCourseCookies, getUsersByCourse } from '../services/course'
import { getUserCourseProject } from '../services/project'

import '../styles/userproject.css'

const UserProject = () => {
    const [editting, setEditting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [project, setProject] = useState(null)
    const [teammates, setTeammates] = useState(null)
    const [userIsProjectOwner, setUserIsProjectOwner] = useState(false)
    const selectedCourseId = getSelectedCourseCookies()

    const handleEditProject = async (edittedProjectData) => {
        setIsLoading(true)
        await editProject(edittedProjectData)
        setProject({ ...project, ...edittedProjectData })
        setEditting(false)
        setIsLoading(false)
    }

    const handleDeleteProject = async (projectId) => {
        if (confirm('Are you sure you want to delete this project?')) {
            setProject(null)
            removeProjectMemberStatusCookies()
            removeUserProjectCookies()
            await deleteProject(projectId)
        }
    }

    useEffect(() => {
        const fetchProjectData = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedProject = await getUserCourseProject(selectedCourseId)
                    const fetchedCourseUsers = await getUsersByCourse(selectedCourseId)
                    const currentUser = await getCurrentUserData()
                    
                    if (fetchedProject) {
                        setProject(fetchedProject)
                        const teammatesNames = getTeammatesNames(fetchedProject.members, fetchedCourseUsers, currentUser.name)
                        setTeammates(teammatesNames)
                        setUserIsProjectOwner(currentUser.id === fetchedProject.Creator.id)
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
                            userIsProjectOwner={userIsProjectOwner}
                            handleDeleteProject={() => handleDeleteProject(project.id)}
                        />
                    ) : project && editting ? (
                        <ProjectEditForm
                            teamName={project.teamName}
                            title={project.name}
                            description={project.description}
                            keywords={project.keywords}
                            skills={project.skills}
                            projectId={project.id}
                            teammates={teammates}
                            setEditting={setEditting}
                            handleEditProject={handleEditProject}
                        />
                    ) : (
                        <div className="no-project-container">
                            <h3 className="no-project-header">
                                You are not a member of a project yet.
                            </h3>
                            <div className="no-project-links">
                                <p>Apply to projects:</p>
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
