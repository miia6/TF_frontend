import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import CourseInfo from '../components/CourseInfo'
import UserProjectCard from '../components/UserProjectCard'

import '../styles/userproject.css'
import '../styles/userprojectcard.css'
import { getMyCourseProject } from '../services/project'

const UserProject = () => {
    const navigate = useNavigate()
    const [project, setProject] = useState(null) // temporary

    useEffect(() => {
        const course = localStorage.getItem('selectedCourse')
        if (!course) {
            return
        }
        getMyCourseProject(course).then((project) => {
            setProject(project)
        })
    }, [])

    return (
        <>
            < TFmenu />
            < CourseInfo />

            <div className="project-proposal-container">
                {project ? (
                    <UserProjectCard
                        teamNamr={project?.teamName ?? name}
                        title={project.name}
                        description={project?.description ?? 'No description'}
                        teammates={project?.teammates}
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

        </>
    )
}

export default UserProject
