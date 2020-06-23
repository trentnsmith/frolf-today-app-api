const express = require('express');
const path = require('path');
const CoursesService = require('./courses.service');
const coursesRouter = express.Router();
const jsonParser = express.json();
const xss = require('xss');


const serializeCourse = course => ({
    id: course.id,
    course_name: xss(course.course_name),
    holes: (course.holes),
    zipcode: (course.zipcode),
    latitude: parseInt(course.latitude),
    longitude: parseInt(course.longitude),
    city: (course.city),
    state_name: (course.state_name),
    website_title: (course.website_title),
    website_url: (course.website_url),
    basket_types: (course.basket_types),
    tee_types: (course.tee_types),
    course_length: (course.course_length),
    private_course: (course.private_course),
    description: (course.description)
});

coursesRouter
    .route('/')
    .get((req, res, next) => {
        console.log('req query', req.query)
        CoursesService.getAllCourses(req.app.get('db'))
            .then(course => {
                console.log('course', course)
                let newCourse = course.filter((c) => {
                    return Number(c.zipcode) === Number(req.query.zip)
                })
                console.log('newcourse', newCourse)
                res.json(newCourse.map(serializeCourse))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { course_name, holes, zipcode, latitude, longitude, city, state_name, website_title, website_url, basket_types, tee_types, course_length, private_course, description } = req.body
        const newCourse = { course_name, holes, zipcode, latitude, longitude, city, state_name, website_title, website_url, basket_types, tee_types, course_length, private_course, description }

        for (const [key, value] of Object.entries(newCourse)) {
            if (!value) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                });
            };
        };

        CoursesService.createCourse(
            req.app.get('db'),
            newCourse
        )
        .then(course => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${course.id}`))
                .json(serializeCourse(course))
        })
        .catch(next)
    })


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
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeCourse(res.course))
    })
    .delete((req, res, next) => {
        CoursesService.deleteCourse(
            req.app.get('db'),
            req.params.course_id
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { 
            course_name,
            holes,
            zipcode,
            latitude,
            longitude,
            city,
            state_name,
            website_title,
            wesbite_url,
            basket_types,
            tee_types,
            course_length,
            private_course,
            description
        } = req.body;
        const courseToUpdate = { 
            course_name,
            holes,
            zipcode,
            latitude,
            longitude,
            city,
            state_name,
            website_title,
            wesbite_url,
            basket_types,
            tee_types,
            course_length,
            private_course,
            description
        };

        const numberOfValues = Object.values(courseToUpdate).filter(Boolean).length;
        if (numberOfValues === 0)
            return res.status(400).json({
                error: { message: 'Must include all attributes' }
            });
        
        CoursesService.updateCourse(
            req.app.get('db'),
            req.params.course_id,
            courseToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end();
            })
            .catch(next);
    });  

module.exports = coursesRouter;  