<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Blogging-application API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        h1 {
            text-align: center;
        }

        p {
            text-align: center;
            color: #333;
        }

        ul {
            list-style-type: square;
            margin-left: 20px;
        }
    </style>
</head>
<body>
    <h1>Blogging-application API</h1>
    
    <p>:computer: This is a simple API for a blog. It includes authentication so that only the owner of the blog can create, edit, and delete a blog. It uses Node.js, Express, and MongoDB.</p>
    
    <h2>Endpoints</h2>
    
    <h3>Blogs</h3>
    <ul>
        <li>
            <strong>POST /blog/article</strong>
            <p>Creates a new blog. Requires authentication.</p>
        </li>
        <li>
            <strong>GET /blog/</strong>
            <p>Gets all blogs.</p>
        </li>
        <li>
            <strong>PUT /blog/article/update/:blog_id</strong>
            <p>Updates a blog. Requires authentication.</p>
        </li>
        <li>
            <strong>DELETE /blog/article/:blog_id</strong>
            <p>Deletes a blog. Requires authentication.</p>
        </li>
        <li>
            <strong>POST /blog/article/like/:blog_id</strong>
            <p>Updates likes and dislikes. Requires authentication.</p>
        </li>
    </ul>
    
    <h3>Comments</h3>
    <ul>
        <li>
            <strong>POST /comment/:blog_id</strong>
            <p>Adds a comment to a blog. Requires authentication.</p>
        </li>
        <li>
            <strong>GET /comment/:blog_id</strong>
            <p>Gets all comments for a blog.</p>
        </li>
        <li>
            <strong>PUT /comment/update/:blog_id/:comment_id</strong>
            <p>Updates a comment for a blog. Requires authentication.</p>
        </li>
        <li>
            <strong>DELETE /comment/blog_id/:comment_id</strong>
            <p>Deletes a comment for a blog. Requires authentication.</p>
        </li>
    </ul>
    
    <h3>User Authentication</h3>
    <ul>
        <li>
            <strong>POST /author/register</strong>
            <p>Registers a new author.</p>
        </li>
        <li>
            <strong>POST /author/login</strong>
            <p>Logs in an author. It generates a token using JWT.</p>
        </li>
    </ul>
</body>
</html>
