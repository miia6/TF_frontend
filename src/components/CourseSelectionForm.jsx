import React, { useState, useEffect } from 'react'
//import { getCourses } from '../services/course'
import PropTypes from 'prop-types'

import '../styles/courseselection.css'

const courses = [
    'Design of WWW Services D',
    'User-Centered Methods for Product and Service Design D',
    'Data Science',
    'Machine Learning',
    'Linear Optimization D',
    'Complex networks D',
    'Full Stack',
    'Web Software Development',
    'Information security',
    'Software Engineering',
    'Artificial Intelligence',
    'Databases',
    'Data Structures and Algorithms',
]

const CourseSelectionForm = ({ handleCourseSelection }) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(() => localStorage.getItem('selectedCourse') || '')
    //const [courses, setCourses] = useState([]);

    /*useEffect(() => {
        getCourses()
            .then((courses) => {
                setCourses(courses);
            })
            .catch((error) => {
                console.error("Failed to fetch courses:", error);
            });
    }, []);*/

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        setIsDropdownOpen(event.target.value.length > 0 || selectedCourse.length > 0)
    }

    const handleSelect = (course) => {
        setSelectedCourse(course) // course.id ?
        setSearchTerm(course) // course.name
        setIsDropdownOpen(false)
    }

    const filteredCourses = courses.filter((course) =>
        course.toLowerCase().includes(searchTerm.toLowerCase()) // course.name
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
                <h2>Select your course</h2>

                <div className="form-group">
                    <label htmlFor="courseSelect"></label>
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
                                {/*course.name*/}
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

CourseSelectionForm.propTypes = {
    handleCourseSelection: PropTypes.func.isRequired
}

export default CourseSelectionForm
