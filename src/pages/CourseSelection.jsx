import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import CourseSelectionForm from '../components/CourseSelectionForm'

import { getSelectedCourseCookies, setSelectedCourseCookies } from '../services/course'
import { getUserCourseProject } from '../services/project'

import '../styles/courseselection.css'

const CourseSelection = () => {
    const [selectedCourse, setSelectedCourse] = useState(getSelectedCourseCookies())
    
    const navigate = useNavigate()

    const handleCourseSelection = async (courseId) => {
        if (courseId) {
            setSelectedCourseCookies(courseId) 
            setSelectedCourse(courseId) 
            console.log("Selected course id: ", courseId)

            try {
                const project = await getUserCourseProject(courseId)
                if (project) {
                    console.log('User has an existing project: ' + project.name)  
                } else {
                    console.log('User has not created any projects')
                }
                navigate('/dashboard')

            } catch (error) {
                console.error('Error fetching user project:', error)
            }

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
