import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import GroupsIcon from '@mui/icons-material/Groups'

import { getProjectMembers, applyToProject } from '../services/project'

const SearchProjectCard = ({ projectId, teamName, title, description, keywords, skills, projectMember, maxMembers }) => {
    const [showDescription, setShowDescription] = useState(false)
    const [teammates, setTeammates] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchTeammates = async () => {
            try {
                const fetchedTeammates = await getProjectMembers(projectId)
                setTeammates(fetchedTeammates)

            } catch (error) {
                console.error("Error fetching teammayes:", error)
            } 
        } 
        fetchTeammates()
    }, [])

    const memberCount = maxMembers - teammates.length

    const getShortDescription = (desc) => {
        const maxChars = 50
        return desc.length > maxChars ? desc.slice(0, maxChars) + '...' : desc
    }

    const descriptionCharCount = description.length
    const maxChars = 50

    const handleApply = async () => {
        try {
            await applyToProject(projectId)
            alert('You have successfully applied to the project!')
            navigate('/sentApplications')
        } catch (error) {
            console.error('Error applying to project:', error)
            alert('Error applying to project')
        }
    }

    return (
        <>
            <div className="search-project-card-container">
                <div className='search-project-card'>

                    <div className='search-project-card-header'>
                        <GroupsIcon className="search-project-group-icon" />
                        <div className='search-project-team-name'>Team: {teamName}</div>
                    </div>

                    <div className='search-project-topic-container'>
                        <div className='search-project-topic'>Title: {title}</div>
                    </div>

                    <div className='search-project-card-description-section'>
                        <div className='search-project-description'>
                            <span className='search-project-card-subsection'>Description:</span> {showDescription ? description : getShortDescription(description)}
                        </div>
                        <div className='search-project-description'>
                            <span className='search-project-card-subsection'>Keywords:</span> {keywords || <span className='unspecified-info'>No keyword specified.</span>}
                        </div>
                        <div className='search-project-description'>
                            <span className='search-project-card-subsection'>Skills:</span> {skills || <span className='unspecified-info'>No required skill specified.</span>}
                        </div>
                        <button
                            className='search-project-card-read-more'
                            onClick={() => setShowDescription(!showDescription)}
                            disabled={descriptionCharCount <= 50}
                            style={{
                                opacity: descriptionCharCount <= maxChars ? 0.5 : 1,
                                cursor: descriptionCharCount <= maxChars ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {showDescription ? 'Show less' : 'Show more'}
                        </button>
                    </div>

                    <div className='search-project-card-apply-section'>
                        <p className='searching-text'>Searching for {memberCount} members</p>
                        {!projectMember ? (
                            <button
                                className='search-project-card-apply-button'
                                onClick={handleApply}
                            >
                                Apply
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchProjectCard
