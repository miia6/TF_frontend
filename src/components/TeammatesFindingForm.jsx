import React, { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import '../styles/teammatesfinding.css'

// TO DO: get users from database
const users = [
    { name: 'user 1', },
    { name: 'user 2', },
    { name: 'user 3', },
    { name: 'user 4', },
    { name: 'user 5', },
    { name: 'user 6', },
]

const TeammatesFindingForm = ({ handleTeammatesFinding }) => {
    const [user, setUser] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null) 
    const [userInfo, setUserInfo] = useState('')
    const [isUserInfoVisible, setIsUserInfoVisible] = useState(false)

    //const navigate = useNavigate()

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        setIsDropdownOpen(event.target.value.length > 0 || selectedUser.length > 0)
    }

    const handleSelect = (user) => {
        setSelectedUser(user)
        setSearchTerm(user.name)
        setIsDropdownOpen(false)
      }

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        if (selectedUser) {
          handleTeammatesFinding(selectedUser)
          setUserInfo(selectedUser)
          setIsUserInfoVisible((prev) => !prev)
        } else {
          // Add later error handling
          console.log("No user searched")
        }
    }


    return (
        <>            
            <div className="teammates-finding-form">
                <form onSubmit={handleSubmit}>
                    <h1>Search teammates</h1>

                    <div className="form-group">
                        <input
                            type="text"
                            id="teammatesFinding"
                            placeholder="Search teammates by name..."
                            value={searchTerm}
                            onChange={handleSearch}
                            onFocus={() => setIsDropdownOpen(true)}
                            className="teammates-finding"
                        />
                    </div>

                    {isDropdownOpen && filteredUsers.length > 0 && (
                        <ul className="dropdown">
                            {filteredUsers.map((user, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(user)}
                                    className="dropdown-item"
                                >
                                    {user.name}
                                </li>
                            ))}
                        </ul>
                    )}

            <button type="submit" className="submit-button">
            {isUserInfoVisible ? 'Hide' : 'Show'}
            </button>
        </form>

        {isUserInfoVisible && userInfo && (
                <div className="user-info">
                    <p>Username: {userInfo.name}</p>
                    <p>Project: {userInfo.project}</p>
                    {/* Add more user details here as you fetch them from backend */}
                </div>
        )}

    </div>

           
        </>
    )
}

export default TeammatesFindingForm