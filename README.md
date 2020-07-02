# Frolf Today API

Link to live app: https://frolf-today-app.now.sh/

## Summary

This API allows a user to submit a get request and the API returns information about disc golf courses: location, name, description,
and details about each course.

# Endpoint Documentation

## GET Detail by Zipcode

Returns disc golf courses by zipcode. 

**Method:** GET

**URL:** https://evening-sea-86701.herokuapp.com/api/courses?zipcode=

**Example:** GET https://evening-sea-86701.herokuapp.com/api/courses?zipcode=69130

**Example Response:** 

  Status: 200 OK
  
  {
    basket_types: "Baskets"
    city: "Cozad"
    course_length: "2157"
    course_name: "Cozad Muny Park Disc Golf Course"
    description: "Short, winds around existing park attractions."
    holes: 9
    id: 12
    latitude: 40
    longitude: -99
    private_course: "no"
    state_name: "Nebraska"
    tee_types: "Grass"
    website_title: null
    website_url: "https://nebdisc.wordpress.com/"
    zipcode: 69130
  }

## Add a new disc golf course

Adds a new disc golf course to the database.

**Method:** POST

**URL:** https://evening-sea-86701.herokuapp.com/api

**Example:** POST

**Example Respone:** STATUS 201

## Remove a disc golf course

Removes a disc golf and it's data from the database.

**Method:** DELETE

**URL:** https://evening-sea-herokuapp.com/api

**Example Response:** STATUS 204

## Screenshots

MainPage:

![image](https://user-images.githubusercontent.com/58092710/86085517-f64da100-ba64-11ea-941b-069604f48993.png)

Search Results: 

![image](https://user-images.githubusercontent.com/58092710/86303087-590f7b80-bbd0-11ea-8324-f54f725cbcad.png)

Course Detail Page:

![image](https://user-images.githubusercontent.com/58092710/86303028-2a91a080-bbd0-11ea-81f8-de08d9e77d8d.png)

Add Course:

![image](https://user-images.githubusercontent.com/58092710/86086200-c2737b00-ba66-11ea-8f3e-764165d14434.png)

## API used

Google Maps API

## Technology

React, Express, Axios, Helmet, Knex, Morgan, Winston, XSS, Chai, Postgrator, Mocha, Supertest

