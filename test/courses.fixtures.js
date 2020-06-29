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
            id: 2,
            course_name: "plattsmouth", 
            holes: 9, 
            zipcode: 68048, 
            latitude: 41.006574,
            longitude: -95.898543,
            city: 'Omaha',
            state: 'Nebraska',
            rating: 4
        },
        {
            id: 3, 
            course_name: "omaha course", 
            holes: 18, 
            zipcode: 68106, 
            latitude: 41.339253,
            longitude: -96.046986,
            city: 'Omaha',
            state: 'Nebraska',
            rating: 4
        },
        {
            id: 4, 
            course_name: "lincoln course", 
            holes: 18, 
            zipcode: 68105, 
            latitude: 40.766155,
            longitude: -96.680029,
            city: 'Omaha',
            state: 'Nebraska',
            rating: 4
        },
    ];
};

module.exports = makeCoursesArray