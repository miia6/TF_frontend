import React, { useState, useEffect } from 'react'

import { getCurrentUserData } from '../services/auth'
import { getSelectedCourseCookies } from '../services/course'
import { getUsersByCourse } from '../services/user'
//import { inviteUserToProject  } from '../services/project' 

import '../styles/teammatesinviting.css'


const TeammateInvite = ({ teammates, setTeammates, sentInvitations, onInvite }) => {
    const [users, setUsers] = useState([])
    const [searchTerms, setSearchTerms] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [dropdownStates, setDropdownStates] = useState([])

    const selectedCourseId = getSelectedCourseCookies()

    useEffect(() => {
        const fetchUsers = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedCourseUsers = await getUsersByCourse(selectedCourseId)
                    //console.log("Users fetched: " + JSON.stringify(fetchedCourseUsers, null, 2))
                    const currentUser = await getCurrentUserData()

                    if (currentUser && fetchedCourseUsers) {
                        const invitedUserIds = sentInvitations.map(invite => invite.User.id)
                        const filteredUsers = fetchedCourseUsers.filter(
                            user => user.id !== currentUser?.id &&
                                !invitedUserIds.includes(user.id)
                        )
                        setUsers(filteredUsers)
                    } else {
                        setUsers([])
                        console.log("Failed to fetch users")
                    }

                } catch (error) {
                    console.error("Error fetching course " + error)
                }
            }
        }

        fetchUsers()
    }, [selectedCourseId])


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

    return (
        <div className="teammates-section">

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
                            const newDropdownStates = [...dropdownStates]
                            newDropdownStates[index] = true
                            setDropdownStates(newDropdownStates)

                            if (!searchTerms[index]) {
                                const availableUsers = users.filter(
                                    (user) => !teammates.includes(user.name)
                                )
                                setFilteredUsers(availableUsers)
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
                                <li className="dropdown-item">No results</li>
                            )}
                        </ul>
                    )}

                    <button type="button" onClick={() => handleRemoveTeammate(index)} className="cancel-teammate-button">
                        Cancel
                    </button>
                </div>
            ))}

            {teammates.length < 4 && (
                <button type="button" onClick={handleAddTeammateClick} className="invite-teammate-button">
                    Add invitation
                </button>
            )}

            {teammates.length > 0 && teammates.some(teammate => teammate) && (
                <div className="confirmed-teammates-section">
                    <p>Teammates to be invited: </p>
                    <ul>
                        {teammates.map((teammate, index) => (
                            teammate && <li key={index}>{teammate}</li>
                        ))}
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
