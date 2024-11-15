import { useState, useEffect } from 'react'
import TFmenu from '../components/TFmenu'

import { getSelectedCourseCookies } from '../services/course'
import { getUserProjectCookies } from '../services/project'

import '../styles/dashboard.css'

const Dashboard = () => {
    const projectId = getUserProjectCookies() //[projectId, setProjectId] = useState(null)
    const selectedCourseId = getSelectedCourseCookies() 

    /*useEffect(() => {
        const fetchProjectData = async () => {
            if (selectedCourseId, projectId) {
                try {
                    const fetchedProject = await getUserCourseProject(selectedCourseId)
                    if (fetchedProject) {
                        setProject(fetchedProject)
                        //console.log('User has an existing project: ' + JSON.stringify(fetchedProject, null, 2))
                    }
                } catch (error) {
                    console.error("Error fetching project:", error)
                } finally {
                setIsLoading(false)
                }
            } else {
                //setProject(null)
                setIsLoading(false)
            }
        }

        fetchProjectData()
    }, [selectedCourseId, projectId])*/


    return (
        <>
            <TFmenu />

            <div className="dashboard-container">

                {projectId && (
                    <>
                        <h2>Teammates Finding </h2>
                        <p>Search teammates</p>
                        <div className="dashboard-link-container">
                            <a href="/teammatesFinding">Teammates Finding</a>
                        </div>
                    </>
                )}

                {!projectId && (
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
