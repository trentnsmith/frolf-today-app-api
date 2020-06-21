const CoursesService = {
    //returns all courses in database
    getAllCourses(db) {
        return db
            .select('*')
            .from('frolf_today_courses');
    },

    //returns courses by the id
    getById(db, id) {
        return db
            .select('*')
            .from('frolf_today_courses')
            .where('id', id)
            .first();
    },

    //remove course from database by the id
    deleteCourse (db, id) {
        return db
            .select('*')
            .from('frolf_today_courses')
            .where('id', id)
            .delete();
    },

    //ability to update all fields for a course by id
    updateCourse(db, id, updateFields) {
        return db
            .select('*')
            .from('frolf_today_courses')
            .where('id', id)
            .update(updateFields)
    },

    createCourse(db, course) {
        return db
            .insert(course)
            .into('frolf_today_courses')
            .returning('*')
            .then((rows) => {
                return rows[0]
            });
    },
};

module.exports = CoursesService;