import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/course';
import PropTypes from 'prop-types';

const CourseSelectionForm = ({ handleCourseSelection }) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(() => localStorage.getItem('selectedCourse') || '')
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses()
            .then((courses) => {
                setCourses(courses);
            })
            .catch((error) => {
                console.error("Failed to fetch courses:", error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        setIsDropdownOpen(event.target.value.length > 0 || selectedCourse.length > 0)
    }

    const handleSelect = (course) => {
        setSelectedCourse(course.id);
        localStorage.setItem('selectedCourse', course.id);
        setSearchTerm(course.name)
        setIsDropdownOpen(false)
    }

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
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
