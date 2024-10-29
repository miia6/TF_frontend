import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TFmenu from '../components/TFmenu'
import CourseSelectionForm from '../components/CourseSelectionForm'
import '../styles/courseselection.css'

const CourseSelection = () => {
    const navigate = useNavigate()
    const selectedCourse = localStorage.getItem('selectedCourse')

    const handleCourseSelection = (course) => {
        if (course) {
            localStorage.setItem('selectedCourse', course)
            console.log("Course selected:", course)
            navigate('/dashboard')
        } else {
            console.log("No course selected")
        }
    }

    return (
        <>
            <TFmenu />
            <div className={`course-selection-container ${selectedCourse ? 'with-sidebar' : ''}`}>
                <CourseSelectionForm
                    handleCourseSelection={handleCourseSelection}
                />
            </div>
        </>
    )
}

export default CourseSelection
