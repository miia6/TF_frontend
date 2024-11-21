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

import { getProjectApplicants, setApplicationsAmountCookies, removeApplicationsAmountCookies } from '../services/application'
import { getReceivedInvitations, setInvitationsAmountCookies, removeInvitationsAmountCookies } from '../services/invitation'

import '../styles/courseselection.css'

const CourseSelection = () => {
    const [selectedCourse, setSelectedCourse] = useState(getSelectedCourseCookies())
    const navigate = useNavigate()

    const handleCourseSelection = async (courseId) => {
        if (courseId) {
            removeUserProjectCookies()
            removeProjectMemberStatusCookies()
            removeApplicationsAmountCookies()
            removeInvitationsAmountCookies()

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
                    await receivedApplications(fetchedProject)
                } if (fetchedProject.Creator.name !== currentUser.name) {
                    setProjectMemberStatusCookies('MEMBER') 
                    console.log('User is a member of the project.')
                } 

            } else {
                await receivedInvitations(courseId)
                console.log('User is not a member of a project')
            }
            //console.log("Selected course id: ", courseId) 
            navigate('/dashboard')
        } else {            
            console.log("No course selected")
        }
    }

    const receivedApplications = async (fetchedProject) => {
        const applications = await getProjectApplicants(fetchedProject.id)
        let applicationsAmount = 0
        if (applications.length > 0) {
            for (const application of applications) {
                if (application.status === 'PENDING') {
                    applicationsAmount += 1
                }
            }
            setApplicationsAmountCookies(applicationsAmount)
            console.log('received applications amount: ' + applicationsAmount)
        } else {
            console.log('no applications')
        }
    }

    const receivedInvitations = async (courseId) => {
        const invitations = await getReceivedInvitations()
        let invitationsAmount = 0
        if (invitations.length > 0) {
            for (const invitation of invitations) {
                if (invitation.status === 'PENDING' && invitation.Project.courseId === courseId) {
                    invitationsAmount += 1
                }
            }
            setInvitationsAmountCookies(invitationsAmount)
            console.log('received invitations amount: ' + invitationsAmount)
        } else {
            console.log('no invitations')
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
