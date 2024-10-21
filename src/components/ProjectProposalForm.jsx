import React, { useState, useEffect } from 'react';
import { createProject } from '../services/project';

const ProjectProposalForm = () => {
  const [courseId, setCourseId] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!courseId || !event.target.title.value || !event.target.teamName.value) {
      return
    }

    await createProject({
      name: event.target.title.value,
      description: event.target.description.value,
      teamName: event.target.teamName.value,
      teammates: event.target.teammates.value,
      courseId: courseId
    })

  }

  useEffect(() => {

    setCourseId(localStorage.getItem('selectedCourse'))
  }, [])

  return (
    <div className="project-proposal-form">
      <form onSubmit={handleSubmit}>
        <h1>Create your own project</h1>
        <h3>Description of the page</h3>

        <div className="form-group-proposal">
          <label htmlFor="teamName">Team name:</label>
          <input
            type="text"
            id="teamName"
            className="input"
          />
        </div>

        <div className="form-group-proposal">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            className="input"
          />
        </div>

        <div className="form-group-proposal">
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            className="textarea"
            rows="10"
          />
        </div>

        <div className="form-group-proposal">
          <label htmlFor="teammates">Add teammates:</label>
          <textarea
            type="text"
            id="teammates"
            className="textarea"
            rows="5"
          />
        </div>

        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  )
}

export default ProjectProposalForm
