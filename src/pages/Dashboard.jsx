import { useState, useEffect } from 'react'
import TFmenu from '../components/TFmenu'

import { getSelectedCourseCookies } from '../services/course'
import { getUserCourseProject } from '../services/project'

import '../styles/dashboard.css'

const Dashboard = () => {

    const [hasProject, setHasProject] = useState(false)
    const selectedCourse = getSelectedCourseCookies() 

    useEffect(() => {
        const fetchProjectData = async () => {
            if (selectedCourse) {
                try {
                    const project = await getUserCourseProject(selectedCourse)
                    setHasProject(!!project)
                    //console.log("Existing project: ", project)
                } catch (error) {
                    console.error("Failed to check project existence:", error)
                }
            }
        }

        fetchProjectData()
    }, [selectedCourse])

    return (
        <>
            <TFmenu />

            <div className="dashboard-container">
                <h2>Teammates Finding </h2>
                <p>Search teammates</p>
                <div className="dashboard-link-container">
                    <a href="/teammatesFinding">Teammates Finding</a>
                </div>

                {!hasProject && (
                    <>
                        <h2>Create a new project</h2>
                        <p>Have an idea for project? Create a new project, where you can invite students and students can apply to your project:</p>
                        <div className="dashboard-link-container">
                            <a href="/projectProposal">Project Proposal</a>
                        </div>
                    </>
                )}

                <h2>Search projects</h2>
                <p>Search existing projects</p>
                <div className="dashboard-link-container">
                    <a href="/projectSearch">Search projects</a>
                </div>

            </div>
        </>
    )
}

export default Dashboard
