module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://trent@localhost/frolf_today_courses',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
    API_TOKEN: process.env.API_TOKEN,
  }
  