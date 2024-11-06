import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import JoinCourseForm from '../components/JoinCourseForm'
import { getSelectedCourseCookies, joinCourse, getUserCourses } from '../services/course' 

import '../styles/joincourse.css'

const JoinCourse = () => {
    const [selectedCourse, setSelectedCourse] = useState(getSelectedCourseCookies()) //useState(null)
    const navigate = useNavigate()

    const handleJoinCourse = async (courseId, courseName) => {
        //console.log(courseId, courseName)
        if (courseId) {
            try {
                await joinCourse(courseId)
                alert(`You have joined the course "${courseName}"`)
                // TO DO: see if user has now joined multiple courses (getUserCourses), if has, redirect to the /courseSelection
                navigate('/dashboard')
            } catch (error) {
                console.error('Error joining the course:', error)
            }
        } else {
            console.log("No course selected")
        }
    }

    return (
        <>
            <TFmenu />
            <div className={`join-course-container ${selectedCourse ? 'with-sidebar' : 'without-sidebar'}`}>
                <JoinCourseForm
                    handleJoinCourse={(courseId, courseName) => handleJoinCourse(courseId, courseName)}
                />
            </div>
        </>
    )
}

export default JoinCourse
