import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import CourseSelectionForm from '../components/CourseSelectionForm'

import { getCurrentUserData } from '../services/auth' 
import { getSelectedCourseCookies, setSelectedCourseCookies } from '../services/course'
import { getUserCourseProject,
         setUserProjectCookies, 
         setProjectMemberStatusCookies,
         removeUserProjectCookies, 
         removeProjectMemberStatusCookies,
         /*getSentApplications, 
         getAppliedProjectsCookies, 
         setAppliedProjectsCookies*/ } from '../services/project'

import '../styles/courseselection.css'

const CourseSelection = () => {
    const [selectedCourse, setSelectedCourse] = useState(getSelectedCourseCookies())
    const navigate = useNavigate()

    const handleCourseSelection = async (courseId) => {
        if (courseId) {
            removeUserProjectCookies()
            removeProjectMemberStatusCookies()
            setSelectedCourseCookies(courseId) 
            setSelectedCourse(courseId) 
            const fetchedProject = await getUserCourseProject(courseId)
            if (fetchedProject) {
                console.log('Fetched project:', fetchedProject.name)
                setUserProjectCookies(fetchedProject.id)

                const currentUser = await getCurrentUserData()
                if (fetchedProject.Creator.name === currentUser.name) {
                    setProjectMemberStatusCookies('CREATOR') 
                    console.log('User is an owner of the project.')
                } if (fetchedProject.Creator.name !== currentUser.name) {
                    setProjectMemberStatusCookies('MEMBER') 
                    console.log('User is a member of the project.')
                }

            } else {
                console.log('User is not a member of a project')
            }
            //console.log("Selected course id: ", courseId) 
            //getUserApplications(courseId)
            navigate('/dashboard')
        } else {            
            console.log("No course selected")
        }
    }

    /*const getUserApplications = async (selectedCourseId) => {
        const applications = await getSentApplications()
        //console.log(applications)
        if (applications.length > 0) {
            for (const application of applications) {
                const applicationCourseId = application.Project.courseId
                if (applicationCourseId === selectedCourseId) {
                    console.log(`application in course ${applicationCourseId}, project ${application.projectId}`)
                    await setAppliedProjectsCookies(application.projectId)
                } else {
                    console.log('no applications in course ' + selectedCourseId)
                }
            }
        }
    }*/

    return (
        <>
            <TFmenu />
            <div className={`course-selection-container ${selectedCourse ? 'with-sidebar' : 'without-sidebar'}`}>
                <CourseSelectionForm
                    handleCourseSelection={handleCourseSelection}
                />
            </div>
        </>
    )
}

export default CourseSelection
