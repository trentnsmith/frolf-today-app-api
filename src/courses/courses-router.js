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
            return axios({
                url: `http://api.pdga.com/services/json/course?${query}`,
                method: 'get',
                headers: { "Cookie": response.session_name + "=" + response.sessid }
        
            })
            .catch(console.error)
        }    
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