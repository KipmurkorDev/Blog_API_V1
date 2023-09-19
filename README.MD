<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blogging API</title>
</head>
<body>
    <h1>Blogging API</h1>
    <p>The Blogging API is a versatile web service that allows you to create, manage, and interact with blogs and comments. It includes user authentication to ensure secure access to specific functionalities. This API is designed using Node.js and Express and relies on MongoDB as the database.</p>

    <h2>Endpoints</h2>
    <h3>Blogs</h3>
    <ul>
        <li>
            <strong>GET /blogs</strong>
            <p>Retrieves a list of all blogs.</p>
        </li>
        <li>
            <strong>POST /blogs</strong>
            <p>Creates a new blog post. Requires authentication.</p>
        </li>
        <li>
            <strong>PUT /blogs/:blog_id</strong>
            <p>Updates an existing blog post. Requires authentication.</p>
        </li>
        <li>
            <strong>DELETE /blogs/:blog_id</strong>
            <p>Deletes a specific blog post. Requires authentication.</p>
        </li>
        <li>
            <strong>PATCH /blogs/:blog_id/like</strong>
            <p>Records likes and dislikes for a blog post. Requires authentication.</p>
        </li>
        <li>
            <strong>PATCH /blogs/:blog_id/co-authors</strong>
            <p>Manages co-authors for a blog post. Requires authentication.</p>
        </li>
    </ul>

    <h3>Comments</h3>
    <ul>
        <li>
            <strong>GET /comments/:blog_id</strong>
            <p>Retrieves all comments for a specific blog post.</p>
        </li>
        <li>
            <strong>POST /comments/:blog_id</strong>
            <p>Adds a new comment to a blog post. Requires authentication.</p>
        </li>
        <li>
            <strong>PUT /comments/:blog_id/:comment_id</strong>
            <p>Updates a specific comment on a blog post. Requires authentication.</p>
        </li>
        <li>
            <strong>DELETE /comments/:blog_id/:comment_id</strong>
            <p>Deletes a specific comment on a blog post. Requires authentication.</p>
        </li>
    </ul>

    <h3>User Authentication</h3>
    <ul>
        <li>
            <strong>POST /users/signup</strong>
            <p>Registers a new user.</p>
        </li>
        <li>
            <strong>POST /users/login</strong>
            <p>Logs in a user and generates a JWT token for authentication.</p>
        </li>
    </ul>

    <h2>Getting Started</h2>
    <p>To use this API, follow these steps:</p>
    <ol>
        <li>Clone the repository: <code>git clone [repository-url]</code></li>
        <li>Install dependencies: <code>npm install</code></li>
        <li>Configure your MongoDB connection in the <code>config.js</code> file.</li>
        <li>Start the server: <code>npm start</code></li>
        <li>You can now access the API at <a href="http://localhost:3000">http://localhost:3000</a></li>
    </ol>

    <h2>Authentication</h2>
    <p>Certain routes require authentication, which can be done by registering and logging in as a user. Use the <code>/users/signup</code> endpoint to create a new user account and <code>/users/login</code> to obtain a JWT token. Include this token in the headers of your requests as <code>Authorization: Bearer [token]</code> to access authenticated endpoints.</p>

    <h2>Examples</h2>
    <p>Here are some examples of how to use the API:</p>

    <h3>Create a new blog post:</h3>
    <pre>
        <code>
            POST /blogs
            Content-Type: application/json
            Authorization: Bearer [token]

            {
                "title": "New Blog Post",
                "content": "This is the content of the blog post."
            }
        </code>
    </pre>

    <h3>Update an existing blog post:</h3>
    <pre>
        <code>
            PUT /blogs/:blog_id
            Content-Type: application/json
            Authorization: Bearer [token]

            {
                "title": "Updated Blog Post",
                "content": "This is the updated content."
            }
        </code>
    </pre>

    <h3>Add a comment to a blog post:</h3>
    <pre>
        <code>
            POST /comments/:blog_id
            Content-Type: application/json
            Authorization: Bearer [token]

            {
                "text": "This is a comment on the blog post."
            }
        </code>
    </pre>

    <p>Please note that the <code>[token]</code> in the examples should be replaced with a valid JWT token obtained after user login.</p>

    <h2>Dependencies</h2>
    <ul>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>MongoDB</li>
        <li>JWT (jsonwebtoken)</li>
        <li>Other dependencies specified in <code>package.json</code></li>
    </ul>

    <h2>License</h2>
    <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
