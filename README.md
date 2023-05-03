# API documentation

NC Games is a RESTful API that enables CRUD operations for reviews, comments, and users. The API provides various endpoints to view, create, update, and delete reviews and comments

# Link to hosted version

https://vincenzos-back-end-project.onrender.com/api

# Getting Started

1. Clone the repository
2. Install the dependecies by running 'npm install'
3. Create two new files .env.development and .env.test
   and add PGDATABASE=nc_games for the development environment and
   PGDATABASE=nc_games_test for the test.
4. Seed the database by running 'npm run seed'

# Running the tests

Run the tests by running 'npm test'

# Minimum versions

Node.js version 10.0.0 or higher
Postgres version 12.0.0 or higher

# Endpoints

- GET /api
- GET /api/categories
- GET /api/reviews
- GET /api/reviews/:review_id
- GET /api/reviews/:review_id/comments
- GET /api/users
- POST /api/reviews/:review_id/comments
- PATCH /api/reviews/:review_id
- DELETE /api/comments/:comment_id

# Contributing

If you'd like to contribute to this project, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

# Author

Vincenzo Chiovaro - https://www.linkedin.com/in/vincenzo-chiovaro-22258a176/
