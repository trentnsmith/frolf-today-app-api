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
            res.json(courses.map(serializeCourse));
        })
        .catch(next)
    })
  /*
    .post(jsonParser, (req, res, next) => {
        const { course_name, rating, holes, zipcode } = req
    })
    */


coursesRouter
    .route('/:course_id')
    .all((req, res, next) => {
        CoursesService.getById(
            req.app.get('db'),
            req.params.course_id
        )
        .then(course => {
            if (!course) {
                return res.status(404).json({
                    error: { message: `Course doesn't exist` }
                })
            }
            res.course = course
            next()
        })
    })
    .get((req, res, next) => {
        res.json(serializeCourse(res.course))
    })    

module.exports = coursesRouter    