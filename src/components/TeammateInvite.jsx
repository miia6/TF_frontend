import React, { useState, useEffect } from 'react'

import { getCurrentUserData } from '../services/auth' 
import { getSelectedCourseCookies, getUsersByCourse } from '../services/course'
import { getProjects, getUserCourseProject, getProjectMembers } from '../services/project'
import { inviteUserToProject, getSentInvitations } from '../services/invitation'

import '../styles/teammatesinviting.css'


const TeammateInvite = ({ teammates, setTeammates, sentInvitations, onInvite, maxInvitations }) => {
    const [users, setUsers] = useState([])
    const [searchTerms, setSearchTerms] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [dropdownStates, setDropdownStates] = useState([false])
    const [isLoading, setIsLoading] = useState(true)

    const selectedCourseId = getSelectedCourseCookies()

    useEffect(() => {
        const fetchUsers = async () => {
            if (selectedCourseId) {
                try {
                    const currentUser = await getCurrentUserData()
                    const fetchedCourseUsers = await getUsersByCourse(selectedCourseId)
                    const projectMemberIds = await membersOfCourseProjects(selectedCourseId)
                    const invitedUserIds = sentInvitations.length > 0 ? invitedUsers(sentInvitations) : []

                    const filteredUsers = fetchedCourseUsers.filter( user => {
                        const isNotCurrentUser = user.id !== currentUser?.id
                        const isNotProjectMember = !projectMemberIds.includes(user.id)
                        const isNotInvited = !invitedUserIds.includes(user.id)
                        return isNotCurrentUser && isNotProjectMember && isNotInvited
                    })

                    //console.log('Filtered users after applying filters:', filteredUsers)
                    setUsers(filteredUsers)
                    setFilteredUsers(filteredUsers)
          
                } catch (error) {
                    console.error("Error fetching course " + error)
                } finally {
                    setIsLoading(false) 
                }
            }
        }

        fetchUsers()
    }, [selectedCourseId, sentInvitations])

    useEffect(() => {
        if (sentInvitations.length > 0) {
            const invitedUserIds = invitedUsers(sentInvitations)
            const filtered = users.filter(user => !invitedUserIds.includes(user.id))
            setFilteredUsers(filtered)
        }
    }, [sentInvitations, users])

    // Get users who already are a member of some project in a course
    const membersOfCourseProjects = async (courseId) => {
        const courseProjects = await getProjects(courseId)
        const courseProjectIds = courseProjects.map(project => project.id)
        const allProjectMembers = (
            await Promise.all(courseProjectIds.map(projectId => getProjectMembers(projectId)))
        ).flat()
        const projectMemberIds = allProjectMembers.map(member => member.userId)
        return projectMemberIds
    }

     // Get users who are already invited to this project
    const invitedUsers = (invitations) => {
        const invitedUserIds = invitations
            .filter(invite => invite.status === "PENDING") 
            .map(invite => invite.User.id)
        return invitedUserIds
    }
    

    const handleAddTeammateClick = () => {
        setTeammates([...teammates, ''])
        setSearchTerms([...searchTerms, ''])
        setDropdownStates([...dropdownStates, false])
    }

    const filterUsers = (searchValue, teammateIndex) => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            !teammates.includes(user.name)
        )

        setFilteredUsers(filtered)
        const updatedDropdownStates = [...dropdownStates]
        updatedDropdownStates[teammateIndex] = true
        setDropdownStates(updatedDropdownStates)
    }

    const handleSearch = (event, teammateIndex) => {
        const searchValue = event.target.value
        const updatedSearchTerms = [...searchTerms]
        updatedSearchTerms[teammateIndex] = searchValue
        setSearchTerms(updatedSearchTerms)
        filterUsers(searchValue, teammateIndex)
    }

    const handleSelectTeammate = (user, teammateIndex) => {
        const updatedTeammates = [...teammates]
        updatedTeammates[teammateIndex] = user.name
        setTeammates(updatedTeammates)

        const updatedDropdownStates = [...dropdownStates]
        updatedDropdownStates[teammateIndex] = false
        setDropdownStates(updatedDropdownStates)

        const updatedSearchTerms = [...searchTerms]
        updatedSearchTerms[teammateIndex] = user.name
        setSearchTerms(updatedSearchTerms)
    }

    const handleRemoveTeammate = (teammateIndex) => {
        const updatedTeammates = teammates.filter((_, index) => index !== teammateIndex)
        setTeammates(updatedTeammates)

        const updatedSearchTerms = searchTerms.filter((_, index) => index !== teammateIndex)
        setSearchTerms(updatedSearchTerms)

        const updatedDropdownStates = dropdownStates.filter((_, index) => index !== teammateIndex)
        setDropdownStates(updatedDropdownStates)
    }

    const handleInvite = async () => {
        try {
            const usersToInvite = teammates
                .map(teammateName => users.find(user => user.name === teammateName))
                .filter(user => user)

            await onInvite(usersToInvite)
            console.log(`Invitation sent to: ${usersToInvite.map(user => user.name).join(", ")}`)
        } catch (error) {
            console.error("Error inviting teammates:", error);
        }
    }

    const availableSlots = Math.min(maxInvitations, filteredUsers.length)

    if (isLoading) {
        return <div className="loading-form">Loading...</div> // Or a loader component
    }

    // TO DO: modify
    if (!isLoading && users.length === 0) {
        return (
            <div className="no-users-message">
                <p>No users can be invited.</p>
            </div>
        )
    }

    return (
        <div className="invite-teammates-section">
            {teammates.map((_, index) => (
                <div key={index} className="form-group-proposal">
                    <label htmlFor={`teammate${index + 1}`}>Teammate {index + 1}:</label>
                    <input
                        type="text"
                        id={`teammate${index + 1}`}
                        placeholder="Search teammate by name"
                        value={searchTerms[index]}
                        onChange={(event) => handleSearch(event, index)}
                        onFocus={() => {
                            const newDropdownStates = [...dropdownStates];
                            newDropdownStates[index] = true;
                            setDropdownStates(newDropdownStates);
    
                            if (!searchTerms[index]) {
                                const availableUsers = users.filter(
                                    (user) => !teammates.includes(user.name)
                                );
                                setFilteredUsers(availableUsers);
                            }
                        }}
                        className="project-teammate"
                    />
    
                    {dropdownStates[index] && (
                        <ul className="dropdown">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => handleSelectTeammate(user, index)}
                                        className="dropdown-item"
                                    >
                                        {user.name}
                                    </li>
                                ))
                            ) : (
                                <li className="dropdown-item no-results">No results</li>
                            )}
                        </ul>
                    )}
    
                    <button
                        type="button"
                        onClick={() => handleRemoveTeammate(index)}
                        className="cancel-teammate-button"
                    >
                        Cancel
                    </button>
                </div>
            ))}
    
            {teammates.length < availableSlots && (
                <button
                    type="button"
                    onClick={handleAddTeammateClick}
                    className="invite-teammate-button"
                >
                    Add invitation
                </button>
            )}
    
            {teammates.length > 0 && teammates.some((teammate) => teammate) && (
                <div className="confirmed-teammates-section">
                    <p>Teammates to be invited: </p>
                    <ul>
                        {teammates.map(
                            (teammate, index) =>
                                teammate && <li key={index}>{teammate}</li>
                        )}
                    </ul>
                    <button
                        type="button"
                        onClick={handleInvite}
                        className="send-invites-button"
                    >
                        Invite
                    </button>
                </div>
            )}
        </div>
    )
}


export default TeammateInvite
