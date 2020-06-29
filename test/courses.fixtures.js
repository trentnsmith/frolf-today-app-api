function makeCoursesArray() {
    return [
        {
            id: 1, 
            course_name: "seymour smith", 
            holes: 18, 
            zipcode: 68102, 
            latitude: 41.193860, 
            longitude: -96.021848,
            city: 'Omaha',
            state: 'Nebraska',
            rating: 4
        },
        {
            courseId: 2,
            course_name: "plattsmouth", 
            holes: 9, 
            zip: 68048, 
            location: [41.006574, -95.898543]
        },
        {
            courseId: 3, 
            course_name: "omaha course", 
            holes: 18, 
            zip: 68106, 
            location: [41.339253, -96.046986]
        },
        {
            courseId: 4, 
            course_name: "lincoln course", 
            holes: 18, 
            zip: 68105, 
            location: [40.766155, -96.680029]
        },
    ];
};

module.exports = makeCoursesArray