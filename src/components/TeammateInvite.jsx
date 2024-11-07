import React, { useState, useEffect } from 'react'

import { getSelectedCourseCookies } from '../services/course'
import { getUsersByCourse } from '../services/user'
import { getCurrentUser } from '../services/auth' 

const TeammateInvite = ({ teammates, setTeammates }) => {
    const [users, setUsers] = useState([])
    const [searchTerms, setSearchTerms] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [dropdownStates, setDropdownStates] = useState([])

    const selectedCourseId = getSelectedCourseCookies()

    const currentUserName = getCurrentUser()?.name
    console.log(currentUserName)

    useEffect(() => {
        const fetchUsers = async () => {
            if (selectedCourseId) {
                try {
                    const fetchedCourseUsers = await getUsersByCourse(selectedCourseId)
                    
                    if (fetchedCourseUsers) {
                        setUsers(fetchedCourseUsers)
                    } else {
                        setUsers([])
                        console.log("Failed to fetch course users")
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
    };

    const filterUsers = (searchValue, teammateIndex) => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            !teammates.includes(user.name)
        );
        setFilteredUsers(filtered)
        const updatedDropdownStates = [...dropdownStates]
        updatedDropdownStates[teammateIndex] = true
        setDropdownStates(updatedDropdownStates)
    };

    const handleSearch = (event, teammateIndex) => {
        const searchValue = event.target.value
        const updatedSearchTerms = [...searchTerms]
        updatedSearchTerms[teammateIndex] = searchValue
        setSearchTerms(updatedSearchTerms)
        filterUsers(searchValue, teammateIndex)
    };

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
    };

    const handleRemoveTeammate = (teammateIndex) => {
        const updatedTeammates = teammates.filter((_, index) => index !== teammateIndex)
        setTeammates(updatedTeammates)

        const updatedSearchTerms = searchTerms.filter((_, index) => index !== teammateIndex)
        setSearchTerms(updatedSearchTerms)

        const updatedDropdownStates = dropdownStates.filter((_, index) => index !== teammateIndex)
        setDropdownStates(updatedDropdownStates)
    };

    return (
        <div className="teammates-section">
            <h3>Invite teammates</h3>
            <p>You can invite max. 4 teammates. Not mandatory, teammates can also be invited later. </p>

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
                                );
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
                </div>
            )}
        </div>
    )
}

export default TeammateInvite
