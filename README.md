# Express-Node-Routing-Middleware-API

Using express, express.Router() to separate routes for various resources in different files.

fakedb uses just an array of item objects saved to global.items, no db connection yet.

full RESTFUL API routes for "items" resource with full CRUD capability.

Using middleware for error handling, a 404 error handler and a general error handler that defaults to statusCode 500.

Supertest module for building and Jest for running tests on all resource routes.
