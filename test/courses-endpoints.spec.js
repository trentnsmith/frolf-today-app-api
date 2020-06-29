const knex = require('knex');
const app = require('../src/app');
const makeCoursesArray = require('./courses.fixtures');
const supertest = require('supertest');

describe('Courses endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => db('frolf_today_courses_test').truncate())

    afterEach('cleanup', () => db('frolf_today_courses_test').truncate())

    describe.only('GET /api/courses', () => {
        context(`Given no courses`, () => {
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/courses')
              .expect(200, [])
          })
        })

        context('Given there are courses in the database', () => {
            const testCourses = makeCoursesArray();

            beforeEach('insert courses', () => {
                return db
                    .into('frolf_today_courses_test')
                    .insert(testCourses)
                    .then(() => {
                        return db
                        .into('frolf_today_courses_test')
                        .insert(testCourses)
                    })
            })

            it('responds with 200 and all of the courses', () => {
                return supertest(app)
                    .get('/api/courses')
                    .expect(200, testCourses)
            }) 
        })
    })
})