import React, { useEffect, useState } from 'react'
import CourseSelectionForm from './CourseSelectionForm'

import '../styles/courseinfo.css'

const CourseInfo = () => { // { selectedCourse, handleCourseChange }
    const [selectedCourse, setSelectedCourse] = useState(localStorage.getItem('selectedCourse'))
    const [changingCourse, setChangingCourse] = useState(false)

    // TODO: add later backend logic

    useEffect(() => {
        // Change later to backend logic
        const storedCourse = localStorage.getItem('selectedCourse')
        if (storedCourse !== selectedCourse) {
            setSelectedCourse(storedCourse)
            console.log('effect; stored course ' + storedCourse)
        }
    }, [])

    const handleCourseChange = () => {
        setChangingCourse(true)
    }

    const handleCourseSelection = (course) => {
        localStorage.setItem('selectedCourse', course)
        setSelectedCourse(course)
        setChangingCourse(false)
        console.log("Selection; selected course: " + selectedCourse)
    }


    return (
        <div className="course-section">
            {changingCourse ? (
                <CourseSelectionForm handleCourseSelection={handleCourseSelection} />
            ) : (
                <>
                   <p>Selected course:</p>
                    <h3 className="course-info">
                        <strong>{selectedCourse || 'No course selected'}</strong> 
                    </h3>
                    <button className="change-course-button" onClick={handleCourseChange}>
                        Change Course
                    </button>
                </> 
            )}
        </div>
    )
}

export default CourseInfo
