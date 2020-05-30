module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgreql://dunder_mifflin@localhost/frolf_today_courses',
    API_TOKEN: process.env.API_TOKEN,
  }