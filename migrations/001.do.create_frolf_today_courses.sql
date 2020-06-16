CREATE TABLE frolf_today_courses (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    course_name TEXT NOT NULL,
    holes INTEGER,
    zipcode INTEGER NOT NULL,
    latitude INTEGER NOT NULL,
    longitude INTEGER NOT NULL,
    city TEXT NOT NULL,
    state_name TEXT NOT NULL,
    website_title TEXT,
    website_url TEXT,
    basket_types TEXT,
    tee_types TEXT,
    course_length TEXT,
    private_course TEXT,
    description TEXT NOT NULL
    );