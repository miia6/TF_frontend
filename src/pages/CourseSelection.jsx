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
         removeProjectMemberStatusCookies } from '../services/project'

import { getProjectApplicants } from '../services/application'
import { getReceivedInvitations } from '../services/invitation'

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
                setUserProjectCookies(fetchedProject.id)

                const currentUser = await getCurrentUserData()
                if (fetchedProject.Creator.name === currentUser.name) {
                    setProjectMemberStatusCookies('CREATOR') 
                } if (fetchedProject.Creator.name !== currentUser.name) {
                    setProjectMemberStatusCookies('MEMBER') 
                } 

            } 
            navigate('/dashboard')
        } else {            
            console.log("No course selected")
        }
    }

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
