import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/courseinfo.css'

const CourseInfo = ({}) => {
    const [selectedCourse, setSelectedCourse] = useState('') 
    const navigate = useNavigate()

    useEffect(() => {
        setSelectedCourse(localStorage.getItem('selectedCourse'))
    }, [])

    const handleCourseChange = () => {
        navigate('/courseSelection')
    }

    return (
        <div className="course-section">
            <p>Selected course:</p>
            <h3 className="course-info">
                <strong>{selectedCourse || 'No course selected'}</strong>
            </h3>
            <button className="change-course-button" onClick={handleCourseChange}>
                Change Course
            </button>
        </div>
    )
}

export default CourseInfo