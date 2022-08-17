# MERN TypeScript Boilerplate with Facebook and Google OAuth
Node typescript boilerplate with React, Express, Mongoose, JWT, Facebook and Google OAuth.

## Features

- Server

  - `User` and `Admin` roles
  - Full CRUD REST API operations for User models
  - Passport authentication with local `email/password`, Facebook and Google OAuth strategies and JWT protected APIs
  - NodeJS server with Babel for new JS syntax unified with React client
  - `async/await` syntax across whole app
  - Validation of user's input with Joi
  - `.env` file configuration
  - Image upload with Multer

- Client

  - React client with functional components
  - Multiple layout for Guest, Autherised users and Admins 
  - Dynamic Class Name to Body When Navigating
  - Lazy Loading
  - [ant.design](https://ant.design/) components
  - Home, Users, Profile, Admin, Notfound, Login and Register pages
  - Protected routes with Higher order components
  - Different views for unauthenticated, authenticated and admin user
  - Admin has privileges to edit and delete other users

## Installation

Read on on how to set up this for development. Clone the repo.

```
$ git clone https://github.com/sanjaynishad/mern-typescript-boilerplate.git
$ cd mern-typescript-boilerplate
$ npm i
$ npm run serve
```

## TODO
 - Fix icons
 - Fix style naming
 - Improve this doc and add more info about projects :)
 - Add server side pagination with users table
 - CRUD with User admin page 