import React, { useState, useEffect } from 'react';

const courses = [
  'Design of WWW Services D',
  'User-Centered Methods for Product and Service Design D',
  'Data Science',
  'Machine Learning',
  'Linear Optimization',
  'Complex networks D',
  'Full Stack',
  'Web Software Development',
  'Information security',
  'Software Engineering',
  'Artificial Intelligence',
]

const CourseSelectionForm = ({ handleCourseSelection, handleCourseSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('') // useState(() => localStorage.getItem('selectedCourse') || '')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    setIsDropdownOpen(event.target.value.length > 0 || selectedCourse.length > 0)
  }

  const handleSelect = (course) => {
    setSelectedCourse(course)
    setSearchTerm(course)
    setIsDropdownOpen(false)
  }

  const filteredCourses = courses.filter((course) =>
    course.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    if (selectedCourse) {
      handleCourseSelection(selectedCourse)
    } else {
      // Add later error handling
      console.log("No course selected")
    }
  }

  return (
    <div className="course-select-form">
      <form onSubmit={handleSubmit}>
        <h1>Select your course</h1>

        <div className="form-group">
          <label htmlFor="courseSelect">Search or select a course:</label>
          <input
            type="text"
            id="courseSelect"
            placeholder="Type or search courses..."
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setIsDropdownOpen(true)}
            className="course-select"
          />
        </div>

        {isDropdownOpen && filteredCourses.length > 0 && (
          <ul className="dropdown">
            {filteredCourses.map((course, index) => (
              <li
                key={index}
                onClick={() => handleSelect(course)}
                className="dropdown-item"
              >
                {course}
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className="submit-button">
          Select
        </button>
      </form>
    </div>
  )
}

export default CourseSelectionForm
