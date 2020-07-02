const knex = require('knex');
const app = require('../src/app');
const makeCoursesArray = require('./courses.fixtures');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Courses endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db)
    });

    after('disconnect from db', () => db.destroy());

    before('cleanup', () => db('frolf_today_courses').truncate());

    afterEach('cleanup', () => db('frolf_today_courses').truncate());

    describe('GET /api/courses', () => {
        context(`Given no courses`, () => {
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/courses')
              .expect(200)
          });
        });

        context('Given there are courses in the database', () => {
            const testCourses = makeCoursesArray();

            beforeEach('insert courses', () => {
                return db
                    .into('frolf_today_courses')
                    .insert(testCourses)
            });

            it('responds with 200 and all of the courses', () => {
                return supertest(app)
                    .get('/api/courses')
                    .expect(200, [])
            }) ;
        });
    });

    describe('DELETE /api/courses/:course_id', () => {
        context(`Given no courses`, () => {
            it(`responds 404 when the course doesn't exist`, () => {
                const id = 12345;
                return supertest(app)
                    .delete(`/api/courses/${id}`)
                    .expect(404, { error: { message: "Course doesn't exist" } });
            });
        });

        context('Given there are courses in the database', () => {
            const testCourses = makeCoursesArray();

            beforeEach('insert courses', () => {
                return db
                    .into('frolf_today_courses')
                    .insert(testCourses)
            });

            it('removes the course by ID from the store', () => {
                const idToRemove = 2;
                const expectedCourses = testCourses.filter(course => course.id !== idToRemove);
                return supertest(app)
                    .delete(`/api/courses/${idToRemove}`)
                    .expect(204)
                    .then(res => 
                        supertest(app)
                            .get(`/api/courses`)
                            .expect([])
                    );
            });
        });
    });

    describe('POST /api/courses', () => {
        it('adds a new course to the database',  () => {
            const newCourse = {
                course_name: "test course",
                holes: 18,
                zipcode: 68105,
                latitude: 41,
                longitude: -97,
                city: 'Omaha',
                state_name: 'Nebraska',
                website_title: 'website',
                website_url: 'www.na.com',
                basket_types: 'grass',
                tee_types: 'mach1',
                course_length: '4000',
                private_course: 'no',
                description: 'test description'
            };
            return supertest(app)
                .post(`/api/courses`)
                .send(newCourse)
                .expect(201)
                .expect(res => {
                    expect(res.body.course_name).to.eql(newCourse.course_name)
                    expect(res.body.holes).to.eql(newCourse.holes)
                    expect(res.body.zipcode).to.eql(newCourse.zipcode)
                    expect(res.body.latitude).to.eql(newCourse.latitude)
                    expect(res.body.longitude).to.eql(newCourse.longitude)
                    expect(res.body.city).to.eql(newCourse.city)
                    expect(res.body.state_name).to.eql(newCourse.state_name)
                    expect(res.body.website_title).to.eql(newCourse.website_title)
                    expect(res.body.website_url).to.eql(newCourse.website_url)
                    expect(res.body.basket_types).to.eql(newCourse.basket_types)
                    expect(res.body.tee_types).to.eql(newCourse.tee_types)
                    expect(res.body.course_length).to.eql(newCourse.course_length)
                    expect(res.body.private_course).to.eql(newCourse.private_course)
                    expect(res.body.description).to.eql(newCourse.description)
                    expect(res.headers.location).to.eql(`/api/courses/${res.body.id}`)
                })
                .then(res => {
                    supertest(app)
                        .get(`api/courses/${res.body.id}`)
                        .expect(res.body)
                })
                .catch((error) => {
                    console.log(error)
                });
        });
    });

    describe(`PATCH /api/courses/:course_id`, () => {
        context(`Given no courses`, () => {
            it(`responds with 404`, () => {
                const courseId = 5432;
                return supertest(app)
                    .patch(`/api/courses/${courseId}`)
                    .expect(404, { error: { message: `Course doesn't exist` } })
            });
        });

        context(`Given there are courses in the database`, () => {
            const testCourses = makeCoursesArray();

            beforeEach('insert courses', () => {
                return db
                    .into('frolf_today_courses')
                    .insert(testCourses)
            });

            it(`Updates the course with 204`, () => {
                const idToUpdate = 2;
                const updateCourse = {
                    id: 2,
                    course_name: 'update course',
                    holes: 18,
                    zipcode: 68105,
                    latitude: 41,
                    longitude: -97,
                    city: 'update',
                    state_name: 'update Nebraska',
                    website_title: 'update website',
                    website_url: 'www.update-na.com',
                    basket_types: 'update grass',
                    tee_types: 'update mach1',
                    course_length: 'update 4000',
                    private_course: 'update no',
                    description: 'update description'
                  } ;
                const expectedCourse = {
                    ...testCourses[idToUpdate - 1],
                    ...updateCourse
                };
                return supertest(app)
                    .patch(`/api/courses/${idToUpdate}`)
                    .send(updateCourse)
                    .expect(204)
                    .then(res => 
                        supertest(app)
                            .get(`/api/courses/${idToUpdate}`)
                            .expect(200))
            });
        });
    });
});