# Blogging API

The Blogging API is a versatile web service that allows you to create, manage, and interact with blogs and comments. It includes user authentication to ensure secure access to specific functionalities. This API is designed using Node.js and Express and relies on MongoDB as the database.

## Endpoints

### Blogs

- **GET /blogs**

  - Retrieves a list of all blogs.

- **POST /blogs**

  - Creates a new blog post. Requires authentication.

- **PUT /blogs/:blog_id**

  - Updates an existing blog post. Requires authentication.

- **DELETE /blogs/:blog_id**

  - Deletes a specific blog post. Requires authentication.

- **PATCH /blogs/:blog_id/like**

  - Records likes and dislikes for a blog post. Requires authentication.

- **PATCH /blogs/:blog_id/co-authors**
  - Manages co-authors for a blog post. Requires authentication.

### Comments

- **GET /comments/:blog_id**

  - Retrieves all comments for a specific blog post.

- **POST /comments/:blog_id**

  - Adds a new comment to a blog post. Requires authentication.

- **PUT /comments/:blog_id/:comment_id**

  - Updates a specific comment on a blog post. Requires authentication.

- **DELETE /comments/:blog_id/:comment_id**
  - Deletes a specific comment on a blog post. Requires authentication.

### User Authentication

- **POST /users/signup**

  - Registers a new user.

- **POST /users/login**
  - Logs in a user and generates a JWT token for authentication.

## Getting Started

To use this API, follow these steps:

1. Clone the repository: `git clone [repository-url]`
2. Install dependencies: `npm install`
3. Configure your MongoDB connection in the `config.js` file.
4. Start the server: `npm start`
5. You can now access the API at [http://localhost:3000](http://localhost:3000)

## Authentication

Certain routes require authentication, which can be done by registering and logging in as a user. Use the `/users/signup` endpoint to create a new user account and `/users/login` to obtain a JWT token. Include this token in the headers of your requests as `Authorization: Bearer [token]` to access authenticated endpoints.
