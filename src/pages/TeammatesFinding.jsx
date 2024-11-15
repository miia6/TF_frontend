import React, { useState, useEffect } from 'react'

import TFmenu from '../components/TFmenu'
import TeammatesFindingForm from '../components/TeammatesFindingForm'

import { getCurrentUserData } from '../services/auth' 
import { getSelectedCourseCookies, getUsersByCourse } from '../services/course'
import { getUserCourseProject, getUserProjectCookies, getProjectMemberStatusCookies } from '../services/project'

import '../styles/teammatesfinding.css'

const TeammatesFinding = () => {
    const selectedCourseId = getSelectedCourseCookies()
    const projectId = getUserProjectCookies()
    const projectMemberStatus = getProjectMemberStatusCookies() 
    const [teammates, setTeammates] = useState([])
    const [viewMode, setViewMode] = useState('view')

    const handleInvitationSuccess = () => {
        setViewMode('view')
    }

    useEffect(() => {
        const fetchProjectData = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedProject = await getUserCourseProject(selectedCourseId) 
                    const fetchedCourseUsers = await getUsersByCourse(selectedCourseId)         
                    const currentUser = await getCurrentUserData()          
                    if (fetchedProject) {
                        //console.log('User has an existing project: ' + JSON.stringify(fetchedProject, null, 2))
                        const fetchedTeammates = getTeammates(fetchedProject.members, fetchedCourseUsers, currentUser.name)
                        setTeammates(fetchedTeammates)
                    }           
                } catch (error) {
                    console.error("Error fetching project: " + error)
                } 
            } 
        }

        fetchProjectData()
    }, [selectedCourseId])

    const getTeammates= (teammates, users, currentUserName) => {
        return teammates.map(teammate => {
            const user = users.find(user => user.id === teammate.userId)
            return user || { name: 'Unknown', email: 'Unknown' }
        })
        .filter(teammate => teammate.name !== currentUserName)
    }

    if (!selectedCourseId) {
        return null
    }

    return (
        <>
            <TFmenu />

            <div className="teammates-finding-container">
                {projectId ? (
                    <>
                        <div className="teammates-form">
                            <div className="toggle-buttons">
                                <button
                                    className={`toggle-button ${viewMode === 'view' ? 'active' : ''}`}
                                    onClick={() => setViewMode('view')}
                                >
                                    Your Teammates
                                </button>
                                <button
                                    className={`toggle-button ${viewMode === 'invite' ? 'active' : ''}`}
                                    onClick={() => setViewMode('invite')}
                                    disabled={projectMemberStatus !== 'CREATOR'}
                                    title={projectMemberStatus !== 'CREATOR' ? 'Only the creator can invite teammates' : ''}
                                >
                                    Invite Teammates
                                </button>
                            </div>

                            {viewMode === 'view' ? (
                                <div className="own-teammates">
                                    <h3>Your Teammates:</h3>
                                    {teammates && teammates.length > 0 ? (
                                        <ul>
                                            {teammates.map(teammate => (
                                                <li key={teammate.id} className="teammate-item">
                                                    <strong>{teammate.name}</strong> <span>| {teammate.email}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p> </p>
                                    )}
                                </div>
                            ) : (
                                <TeammatesFindingForm onInvitationSuccess={() => setViewMode('view')}/>
                            )}
                        </div>
                    </>
                ) : (
                    <h3>You're not a member of a project.</h3>
                )}
            </div>
        </>
    )
}

export default TeammatesFinding
