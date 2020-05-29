const path = require('path');
const express = require('express');
const CoursesService = require('./courses.service');
const coursesRouter = express.Router();
const jsonParser = express.json();

const serializeCourse = course => ({
    id: course.id,
    course_name: course.course_name
})

coursesRouter
    .route('/')
    .get((req, res, next) => {
        CoursesService.getAllCourses(req.app.get('db'))
        .then(courses => {
            return res.json(courses.map(serializeCourse));
        })
        .catch(next)
    })