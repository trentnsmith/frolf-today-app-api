const CoursesService = {
    getAllCourses(db) {
        return db
            .select('*')
            .from('frolf_today_courses');
    },

    getById(db, id) {
        return db
            .select('*')
            .from('frolf_today_courses')
            .where('id', id)
            .first();
    },

    deleteCourse (db, id) {
        return db
            .select('*')
            .from('frolf_today_courses')
            .where('id', id)
            .delete();
    },

    updateCourse(db, id, updateFields) {
        return db
            .select('*')
            .from('frolf_today_courses')
            .where('id', id)
            .update(updateFields)
    },
}

module.exports = CoursesService