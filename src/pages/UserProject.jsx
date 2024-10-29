import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import UserProjectCard from '../components/UserProjectCard'

import '../styles/nonexistinguserproject.css'
//import { getMyCourseProject } from '../services/project'

const UserProject = () => {
    const navigate = useNavigate()
    const [project, setProject] = useState(null) // temporary

    useEffect(() => {
        const course = localStorage.getItem('selectedCourse')
        const storedProject = localStorage.getItem('createdProject')
        if (storedProject) {
            setProject(JSON.parse(storedProject))
            //console.log("Stored project in UserProject:", storedProject)
        }
        /*getMyCourseProject(course).then((project) => {
            setProject(project)
        })*/
    }, [])

    return (
        <>
            < TFmenu />

            <div className="project-proposal-container">
                {project ? (
                    <UserProjectCard
                        teamName={project.teamName}
                        title={project.title}
                        description={project.description}
                        teammates={project.teammates}
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
