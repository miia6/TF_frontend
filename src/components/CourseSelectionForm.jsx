import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getCourses } from '../services/course'

import '../styles/courseselection.css'

const CourseSelectionForm = ({ handleCourseSelection }) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [courses, setCourses] = useState([])
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesList = await getCourses()
                setCourses(coursesList)
            } catch (error) {
                console.error("Failed to fetch courses", error)
            }
        }
        fetchCourses()
    }, [])


    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        setIsDropdownOpen(event.target.value.length > 0 )
    }

    const handleSelect = (course) => {
        setSearchTerm(course.name) 
        setIsDropdownOpen(false)
        setErrors({})
    }

    const filteredCourses = courses.filter((course) =>
        course?.name?.toLowerCase().includes(searchTerm.toLowerCase()) 
    )

    const handleSubmit = (event) => {
        event.preventDefault()

        const selectedCourse = courses.find((course) => course.name === searchTerm)

        if (!selectedCourse) {
            setErrors({ selectedCourse: "Please select a course from the list" }) 
            return
        }

        handleCourseSelection(selectedCourse.id)
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
                        className={`course-select ${errors.selectedCourse ? 'error' : ''}`}
                    />
                    {errors.selectedCourse && <p className="error-text">{errors.selectedCourse}</p>}
                </div>

                {isDropdownOpen && filteredCourses.length > 0 && (
                    <ul className="dropdown">
                        {filteredCourses.map((course, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(course)}
                                className="dropdown-item"
                            >
                                {course.name}
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
