const path = require('path');
const express = require('express');
const CoursesService = require('./courses.service');
const coursesRouter = express.Router();
const jsonParser = express.json();
const axios = require('axios');
const url = require('url');
const xss = require('xss')


const serializeCourse = course => ({
    id: course.id,
    course_name: xss(course.course_name),
    holes: (course.holes),
    zipcode: (course.postal_code),
    latitude: (course.latitude),
    longitude: (course.longitude),
    city: (course.city),
    state_name: (course.state_province_name),
    website_title: (course.external_link_1_title),
    wesbite_url: (course.external_link_1_url),
    basket_types: (course.basket_types),
    tee_types: (course.tee_types),
    course_length: (course.total_length_of_course),
    private_course: (course.private),
    description: (course.course_description)
})

coursesRouter
    .route('/')
    .get((req, res, next) => {
        const zip = url.parse(req.url,true).query.zip
        const course_id = url.parse(req.url,true).query.course_id
        
        axios({
            url: 'https://api.pdga.com/services/json/user/login',
            method: 'post',
            headers: { "content-type": 'application/json' },
            data: { "username": "TSmith12", "password": "Tnewman!2"}
        })  .then((response) => {
              
            getCourses(response.data, zip, course_id)
            .then((response) => {
                res.json(response.data)
            })
            
        })
            .catch(next)
        
        const getCourses = (response, zip, course_id) => {
            let query = ''
            if (zip) {
               query = `postal_code=${zip}`
            } else if (course_id) {
                query = `course_id=${course_id}`
            }
            axios({
                url: `http://api.pdga.com/services/json/course?${query}`,
                method: 'get',
                headers: { "Cookie": response.session_name + "=" + response.sessid }
        
            })
            .then((resJson) => {
                let myRes = resJson.map((obj) => {
                    return (
                        obj.course_name,
                        obj.holes,
                        obj.zipcode,
                        obj.latitude,
                        obj.longitude,
                        obj.city,
                        obj.state_name,
                        obj.website_title,
                        obj.wesbite_url,
                        obj.basket_types,
                        obj.tee_types,
                        obj.course_length,
                        obj.private_course,
                        obj.description
                    )
                })
                knex.insert(resJson)
            })
            .catch(console.error)
        }
        CoursesService.getAllCourses(req.app.get('db'))
            .then(course => {
                res.json(course.map(serializeCourse))
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

module.exports = coursesRouter    