# Unified Lab: Building the "Posts" Social Media API

## Objective

In this lab, you will apply everything you've learned over the last two days. You will build a complete "Posts" resource from scratch following the professional architecture we used for Users (Routes -> Controllers -> Services -> Models) and integrate it with MongoDB using Mongoose.

---

## Part 1: Quick Server Enhancements (Warm-up)
Before building the new API, let's practice adding simple functionality to our current server to get comfortable with the project structure.

1.  **Add a Health Check Route**:
    In your `index.js`, add a simple GET route `/health` that returns a `200 OK` status and a JSON message: `{ "status": "UP", "message": "Server is running smoothly" }`.
    *Why? This is a professional standard used to monitor if a server is alive.*

---

## Part 2: The Data Layer (Model & Service)

1.  **Create the Post Model**:
    Create a new file `models/postModel.js`.
    - **Fields**: 
      - `title`: String, required, minimum 5 characters.
      - `content`: String, required, minimum 10 characters.
      - `category`: String, enum: ["Tech", "Life", "Health", "Education"], default: "Life".
      - `author`: String, required.

2.  **Create the Posts Service**:
    Create `services/postsService.js`.
    Implement the following functions using Mongoose:
    - `createPost(data)`: Save a new post to the database.
    - `getAllPosts(query)`: Fetch all posts. (Try to implement the same pagination logic we used in `usersService.js`).
    - `getPostById(id)`: Fetch a single post by its ID.
    - `updatePost(id, data)`: Find a post by ID and update it.
    - `deletePost(id)`: Find a post by ID and remove it.

---

## Part 3: The Controller & Routing Layer

1.  **Create the Posts Controller**:
    Create `controllers/postsController.js`.
    - Map the service functions to controller methods (`createPost`, `getAllPosts`, etc.).

2.  **Create the Posts Router**:
    Create `routes/postsRouter.js`.
    - Define routes for:
      - `GET /` -> List all posts
      - `GET /:id` -> Get one post
      - `POST /` -> Create a post
      - `PUT /:id` -> Update a post
      - `DELETE /:id` -> Delete a post

3.  **Mount the Router**:
    In `index.js`, import your new router and mount it at `/api/v1/posts`.

---

## Part 4: Testing & Error Handling

1.  **Test Validations**: 
    Open Postman and try to create a post with a `title` shorter than 5 characters. 
    - Check if your `errorHandler` middleware returns a "ValidationError" message.

2.  **Test CastError**:
    Try to fetch a post using an invalid ID (like `abc-123`). 
    - Verify that your server returns "Invalid ID" (handled in `errorHandler.js`).

---

## Part 5: "Apply Your Knowledge" Challenge
These tasks ask you to modify the *existing* User code to see if you can apply the patterns independently:

1.  **New Field**: Add a `bio` field (String) to the `userModel.js`. Update the User controller and service so that users can save a short bio about themselves.
2.  **Count Users**: In `usersController.js`, add a new method `countUsers` and a route `GET /count` that returns the total number of users in the database.
3.  **Search Logic (Bonus)**: In `postsService.js`, modify the `getAllPosts` to allow searching by title using a query parameter (e.g., `GET /posts?search=node`).
    - *Hint: Use `{ title: { $regex: query.search, $options: 'i' } }` in your `.find()` method.*
4.  **Search Logic (Bonus)**: In `usersService.js`, modify the `getAllUsers` to allow searching by name using a query parameter (e.g., `GET /users?search=node`).
    - *Hint: Use `{ name: { $regex: query.search, $options: 'i' } }` in your `.find()` method.*

---

## Part 6: ADVANCED BONUS - Professional Validation with Joi
Mongoose validation is great, but professional apps often use a dedicated validation layer. Let's implement one using the **Joi** package.

1.  **Install Joi**:
    Run `npm install joi` in your terminal.

2.  **Create a Validation Middleware**:
    Create `middlewares/validationMiddleware.js`. This function should:
    - Accept a Joi `schema`.
    - Return a middleware function `(req, res, next) => { ... }`.
    - Validate `req.body` against the schema.
    - If validation fails, return a `400 Bad Request` with the error details. If it passes, call `next()`.

3.  **Define the Post Schema**:
    Create a folder `validators/` and a file `validators/postValidator.js`.
    - Define a Joi object with the same rules as your Mongoose model (title min 5, content min 10, etc.).

4.  **Apply the Middleware**:
    Go to `routes/postsRouter.js` and apply your new validation middleware to the `POST` route.
    - *Challenge*: What happens if you try to send a field that isn't allowed in the schema?

---

### Additional Notes
- Use your `.env` file for the database connection string.
- Follow the naming conventions used in the project (CamelCase for functions, descriptive names for routes).
- Always check your console for the `✅✅` logs to ensure everything is connected!

Good luck, you are building a real-world API architecture!
