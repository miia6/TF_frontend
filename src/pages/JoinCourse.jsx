import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import JoinCourseForm from '../components/JoinCourseForm'
import PageLoader from '../components/PageLoader'

import { getSelectedCourseCookies, setSelectedCourseCookies, 
        joinCourse, getUserCourses, getCourses } from '../services/course' 
        import { getUserCourseProject,
                setUserProjectCookies, 
                setProjectMemberStatusCookies,
                removeUserProjectCookies, 
                removeProjectMemberStatusCookies,
                /*getSentApplications, 
                getAppliedProjectsCookies, 
                setAppliedProjectsCookies*/ } from '../services/project'

import '../styles/joincourse.css'

const JoinCourse = () => {
    const [selectedCourse, setSelectedCourse] = useState(getSelectedCourseCookies()) //useState(null)
    const [allCourses, setAllCourses] = useState([])
    const [userCourses, setUserCourses] = useState([])
    const [isAllJoined, setIsAllJoined] = useState(false)
    const [loading, setLoading] = useState(true)

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
                setLoading(false)
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
                    removeUserProjectCookies()
                    removeProjectMemberStatusCookies()
                    setSelectedCourseCookies(courseId)

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
                    
                    //getUserApplications(courseId)
                    navigate('/dashboard')
                }
                
            } catch (error) {
                console.error('Error joining the course:', error)
            }
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
            <div className={`join-course-container ${selectedCourse ? 'with-sidebar' : 'without-sidebar'}`}>

                {loading ? (
                        <PageLoader message="Loading courses..." size="medium" />
                ) : isAllJoined ? (
                        <h3>You have already joined all courses available.</h3>
                ) : (
                    <JoinCourseForm
                        handleJoinCourse={(courseId, courseName) => handleJoinCourse(courseId, courseName)}
                    />
                )}

            </div>
        </>
    )
}

export default JoinCourse
