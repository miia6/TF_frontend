import React, { useState, useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';

const SearchProjectCard = ({ teamName, title, description, teammates }) => {
    const [showDescription, setShowDescription] = useState(false)

    const getShortDescription = (desc) => {
        const maxChars = 70
        return desc.length > maxChars ? desc.slice(0, maxChars) + '...' : desc
    }

    const descriptionCharCount = description.length
    const maxChars = 70
    
    return (
        <>
            <div className="search-project-card-container">
                <div className='search-project-card'>

                    <div className='search-project-card-header'>
                        <GroupsIcon className="search-project-group-icon"/>
                        <div className='search-project-team-name'>Team: {teamName}</div>
                    </div>

                    <div className='search-project-topic-container'>
                        <div className='search-project-topic'>Title: {title}</div>
                    </div>

                    <div className='search-project-card-description-section'>
                        <div className='search-project-description'>
                            {showDescription ? description : getShortDescription(description)}
                        </div>
                        <button
                            className='search-project-card-read-more'
                            onClick={() => setShowDescription(!showDescription)}
                            disabled={descriptionCharCount <= 70} 
                            style={{
                                opacity: descriptionCharCount <= maxChars ? 0.5 : 1, 
                                cursor: descriptionCharCount <= maxChars ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {showDescription ? 'Show less' : 'Show more'}
                        </button>
                    </div>

                    <div className='search-project-card-apply-section'>
                        <p className='searching-text'>Searching for 4 members</p>
                        {/*<p>Teammates: {teammates.length > 0 ? teammates.join(', ') : 'None'}</p>*/}
                        <button className='search-project-card-apply-button'>Apply</button>
                    </div>
                </div>
            </div>
        </>
    )
  }

export default SearchProjectCard
