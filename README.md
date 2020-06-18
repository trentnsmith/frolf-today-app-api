# Frolf Today API

Link to live app: https://frolf-today-app.now.sh/

## Summary

This API allows a user to submit a get request and the API returns information about disc golf courses: location, name, description,
and details about each course.


## Screenshots

MainPage:

![frolf_today_search_main_large](https://user-images.githubusercontent.com/58092710/84978909-b9dc8580-b0f3-11ea-90d4-6329b7789de9.JPG)

Search Results: 

![frolf_today_search_results_large](https://user-images.githubusercontent.com/58092710/84978941-cfea4600-b0f3-11ea-88f7-b354ed97fa16.JPG)

Course Detail Page:

![frolf_today_course_detail](https://user-images.githubusercontent.com/58092710/84978965-dd9fcb80-b0f3-11ea-9c83-46e03947ad50.JPG)

## API End Points





## Technology

React, Express, Axios, Helmet, Knex, Morgan, Winston, XSS, Chai, Postgrator, Mocha, Supertest








# Express Boilerplate!

This is a boilerplate project used for starting new projects!

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
