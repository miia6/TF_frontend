import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getCourses } from '../services/course'

const JoinCourseForm = ({ handleJoinCourse}) => {

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

        handleJoinCourse(selectedCourse.id, selectedCourse.name)
    }

    return (
        <div className="join-course-form">
            <form onSubmit={handleSubmit}>
                <h2>Join a course</h2>

                <div className="form-group">
                    <label htmlFor="joinCourse"></label>
                    <input
                        type="text"
                        id="joinCourse"
                        placeholder="Type or search courses..."
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={() => setIsDropdownOpen(true)}
                        className={`join-course ${errors.selectedCourse ? 'error' : ''}`}
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
                    Join
                </button>
            </form>
        </div>
    )
}

JoinCourseForm.propTypes = {
    handleJoinCourse: PropTypes.func.isRequired
}

export default JoinCourseForm
