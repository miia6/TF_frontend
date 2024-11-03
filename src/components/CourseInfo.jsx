import React, { useState, useEffect } from 'react'
import CourseSelectionForm from './CourseSelectionForm'
import { getSelectedCourse, setSelectedCourse } from '../services/course'
import '../styles/courseinfo.css'

const CourseInfo = () => { 
    const [selectedCourse, setSelectedCourse] = useState(null) // useState(localStorage.getItem('selectedCourse'))
    
    useEffect(() => {
        const currentCourse = getSelectedCourse()
        setSelectedCourseState(currentCourse) 
    }, [])

    const handleCourseChange = () => {
        navigate('/courseSelection') //setChangingCourse(true)
    }

    const handleCourseSelection = (course) => {
        setSelectedCourse(course)  //localStorage.setItem('selectedCourse', course)
        setSelectedCourseState(course) 
        console.log("Changing to course: " + course)
    }


    return (
        <div className="course-section">
            {selectedCourse ? (
                <h3 className="course-info">
                    <strong>{selectedCourse}</strong>
                </h3>
            ) : (
                <p> </p>
            )}
            <button className="change-course-button" onClick={handleCourseChange}>
                Change Course
            </button>
        </div>
    )
}

export default CourseInfo
