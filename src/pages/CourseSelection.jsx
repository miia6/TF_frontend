import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseSelectionForm from '../components/CourseSelectionForm'
import '../styles/courseselection.css'

// TODO: resolve confusing names `handleCourseSelection` vs `handleCourseSelect`
const CourseSelection = ({ handleCourseSelect }) => {
  const navigate = useNavigate()

  const handleCourseSelection = (course) => {
    if (course) {
      localStorage.setItem('selectedCourse', course)
      console.log("Course selected:", course)
      navigate('/dashboard')
    } else {
      console.log("No course selected")
    }
  }

  return (
    <div className="course-selection-container">
      <CourseSelectionForm
        handleCourseSelection={handleCourseSelection}
        handleCourseSelect={handleCourseSelect}
      />
    </div>
  )
}

export default CourseSelection