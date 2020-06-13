const{ expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('Courses endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    context('Given there are courses in the database', () => {
        const testCourses = [
            {
                courseId: 1, 
                course_name: "seymour smith", 
                rating: "5", 
                holes: 18, 
                zip: 68102, 
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar ac nisl in bibendum. Vivamus vitae tincidunt ex. Nunc lacinia leo vel dolor ornare laoreet.",
                location: [41.193860, -96.021848]
            },
            {
                courseId: 2,
                course_name: "plattsmouth", 
                rating: "2", 
                holes: 9, 
                zip: 68048, 
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar ac nisl in bibendum. Vivamus vitae tincidunt ex. Nunc lacinia leo vel dolor ornare laoreet.",
                location: [41.006574, -95.898543]
            },
            {
                courseId: 3, 
                course_name: "omaha course", 
                rating: "4", 
                holes: 18, 
                zip: 68106, 
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar ac nisl in bibendum. Vivamus vitae tincidunt ex. Nunc lacinia leo vel dolor ornare laoreet.",
                location: [41.339253, -96.046986]
            },
            {
                courseId: 4, 
                course_name: "lincoln course", 
                rating: "5", 
                holes: 18, 
                zip: 68105, 
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar ac nisl in bibendum. Vivamus vitae tincidunt ex. Nunc lacinia leo vel dolor ornare laoreet.",
                location: [40.766155, -96.680029]
            },
        ];

        describe('GET /api/courses', () => {
            context(`Given no courses`, () => {
              it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                  .get('/api/courses')
                  .expect(200)
              })
        })
    })
})
})