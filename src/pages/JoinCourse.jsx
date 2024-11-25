import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import PageLoader from '../components/PageLoader'
import TFmenu from '../components/TFmenu'
import JoinCourseForm from '../components/JoinCourseForm'

import { getSelectedCourseCookies, setSelectedCourseCookies, joinCourse, getUserCourses, getCourses } from '../services/course' 

import '../styles/joincourse.css'

const JoinCourse = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [selectedCourse, setSelectedCourse] = useState(getSelectedCourseCookies()) //useState(null)
    const [allCourses, setAllCourses] = useState([])
    const [userCourses, setUserCourses] = useState([])
    const [isAllJoined, setIsAllJoined] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                const fetchedCourses = await getCourses()
                const fetchedUserCourses = await getUserCourses()
                
                setAllCourses(fetchedCourses)
                setUserCourses(fetchedUserCourses)

                if (fetchedCourses.length === fetchedUserCourses.length) {
                    setIsAllJoined(true)
                } else {
                    setIsAllJoined(false)
                }          
            } catch (error) {
                console.error("Error fetching course data", error)
            } finally {
                setIsLoading(false)
            }  
        }

        fetchCoursesData()
    }, [])

    const handleJoinCourse = async (courseId, courseName) => {
        if (courseId) {
            try {
                await joinCourse(courseId)
                alert(`You have joined the course "${courseName}"`)
            
                const userCourses = await getUserCourses()
                if (userCourses.length > 1) {
                    navigate('/courseSelection')
                } else {
                    setSelectedCourseCookies(courseId)
                    navigate('/dashboard')
                }
                
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

            {isLoading ? (
                <PageLoader message="Loading courses..." />

            ) : (

                <div className={`join-course-container ${selectedCourse ? 'with-sidebar' : 'without-sidebar'}`}>

                    {isAllJoined ? (
                            <h3>You have already joined all courses available.</h3>
                    ) : (
                        <JoinCourseForm
                            handleJoinCourse={(courseId, courseName) => handleJoinCourse(courseId, courseName)}
                        />
                    )}

                </div>
            )}
        </>
    )
}

export default JoinCourse
