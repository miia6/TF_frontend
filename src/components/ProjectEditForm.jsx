import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
//import TeammateInvite from './TeammateInvite'

const ProjectEditForm = (
    { teamName, title, description, keywords, skills, setEditting, handleEditProject }
) => {
    const [edittedTeamName, setEdittedTeamName] = useState(teamName)
    const [edittedTitle, setEdittedTitle] = useState(title)
    const [edittedDescription, setEdittedDescription] = useState(description)
    const [edittedKeywords, setEdittedKeywords] = useState(keywords)
    const [edittedSkills, setEdittedSkills] = useState(skills)

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
        if (!description) {
            validationErrors.descriptionInput = "Description is required"
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const edittedProjectData = {
            title: edittedTitle,
            description: edittedDescription.replace(/\s+/g, ' ').trim(),
            teamName: edittedTeamName,
            keywords: edittedKeywords,
            skills: edittedSkills,
        }
        handleEditProject(edittedProjectData)
    }

    return (
        <div className="project-proposal-form">
            <form onSubmit={handleSubmit}>
                <h2>Edit your project</h2>

                <div className="form-group-proposal">
                    <label htmlFor="teamName"> <span className="required">*</span> Team name:</label>
                    <input
                        type="text"
                        id="teamName"
                        value={edittedTeamName}
                        onChange={(event) => setEdittedTeamName(event.target.value)}
                        placeholder="Pick a team name (max. 20 marks)."
                        className={`team-name ${errors.teamName ? 'error' : ''}`}
                    />
                    {errors.teamName && <p className="error-text">{errors.teamName}</p>}
                </div>

                <div className="form-group-proposal">
                    <label htmlFor="title"> <span className="required">*</span> Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={edittedTitle}
                        onChange={(event) => setEdittedTitle(event.target.value)}
                        placeholder="Pick a project title (max. 100 marks)."
                        className={`project-title ${errors.title ? 'error' : ''}`}
                    />
                    {errors.title && <p className="error-text">{errors.title}</p>}
                </div>

                <div className="form-group-proposal">
                    <label htmlFor="description"> <span className="required">*</span> Description:</label>
                    <textarea
                        id="description"
                        value={edittedDescription}
                        onChange={(event) => setEdittedDescription(event.target.value)}
                        placeholder="Describe your proposed project (max. 100 words)."
                        className={`project-description ${errors.descriptionInput ? 'error' : ''}`}
                        rows="6"
                    />
                    {errors.descriptionInput && <p className="error-text">{errors.descriptionInput}</p>}
                </div>

                <div className="form-group-proposal">
                    <label htmlFor="keywords"> {/*<span className="required">*</span>*/} Keywords: </label>
                    <input
                        type="text"
                        id="keywords"
                        value={edittedKeywords}
                        onChange={(event) => setEdittedKeywords(event.target.value)}
                        placeholder="Pick some crucial keywords about your project (max. 50 marks)."
                        className={`project-keywords`}
                        maxLength={50}
                    />
                </div>

                <div className="form-group-proposal">
                    <label htmlFor="skills"> {/*<span className="required">*</span>*/} Required skills:  </label>
                    <input
                        type="text"
                        id="skills"
                        value={edittedSkills}
                        onChange={(event) => setEdittedSkills(event.target.value)}
                        placeholder="Specify required skills to join your project (max. 50 marks)."
                        className={`project-skills`}
                        maxLength={50}
                    />
                </div>

                {/*<TeammateInvite teammates={teammates} setTeammates={setTeammates} />*/}

                <div className="create-button-container">
                    <button type="submit" className="submit-button">
                        Update
                    </button>
                    <button className="submit-button" onClick={() => setEditting(false)}>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
}

ProjectEditForm.propTypes = {
    handleProjectCreation: PropTypes.func.isRequired,
    //teamName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    descriptionInput: PropTypes.string.isRequired
}

export default ProjectEditForm
