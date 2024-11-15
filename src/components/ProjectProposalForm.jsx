import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
//import TeammateInvite from './TeammateInvite'

const ProjectProposalForm = ({ handleProjectCreation }) => {

    const [teamName, setTeamName] = useState('')
    const [title, setTitle] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [teammates, setTeammates] = useState([])

    const [errors, setErrors] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault()

        let validationErrors = {}

        if (!teamName) {
            validationErrors.teamName = "Team Name is required"
        }
        if (!title) {
            validationErrors.title = "Title is required"
        }
        if (!descriptionInput) {
            validationErrors.descriptionInput = "Description is required"
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const description = descriptionInput.replace(/\s+/g, ' ').trim()

        const projectData = {
            title: title,
            description: description,
            teamName: teamName,
            //tags,
            teammates: Object.values(teammates).filter(teammate => teammate !== '') 
        }

        handleProjectCreation(projectData)
    }

    return (
        <div className="project-proposal-form">
            <form onSubmit={handleSubmit}>
                <h2>Create your own project</h2>

                <div className="form-group-proposal">
                    <label htmlFor="teamName"> <span className="required">*</span> Team name:</label>
                    <input
                        type="text"
                        id="teamName"
                        value={teamName}
                        onChange={(event) => setTeamName(event.target.value)}
                        placeholder="max. 20 marks."
                        className={`team-name ${errors.teamName ? 'error' : ''}`}
                    />
                    {errors.teamName && <p className="error-text">{errors.teamName}</p>}
                </div>

                <div className="form-group-proposal">
                    <label htmlFor="title"> <span className="required">*</span> Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="max. 100 marks."
                        className={`project-title ${errors.title ? 'error' : ''}`}
                    />
                    {errors.title && <p className="error-text">{errors.title}</p>}
                </div>

                <div className="form-group-proposal">
                    <label htmlFor="description"> <span className="required">*</span> Description:</label>
                    <textarea
                        id="description"
                        value={descriptionInput}
                        onChange={(event) => setDescriptionInput(event.target.value)}
                        placeholder="max. 100 words. You may use #tags."
                        className={`project-description ${errors.descriptionInput ? 'error' : ''}`}
                        rows="6"
                    />
                    {errors.descriptionInput && <p className="error-text">{errors.descriptionInput}</p>}
                </div>

                <div className="teammate-invite-form">
                    <p>After project creation, you can invite teammates in Teammates page.</p>
                </div>

                {/*<TeammateInvite teammates={teammates} setTeammates={setTeammates} />*/}

                <div className="create-button-container">
                    <button type="submit" className="submit-button">
                        Create project
                    </button>
                </div>

            </form>
        </div>
    )
}

ProjectProposalForm.propTypes = {
    handleProjectCreation: PropTypes.func.isRequired,
    teamName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    descriptionInput: PropTypes.string.isRequired
}

export default ProjectProposalForm
