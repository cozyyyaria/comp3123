# Express.js Basics with Routing - Exercise 05

**Student Name:** Ariana Cruz  
**Student ID:** 101346000  
**Course:** COMP 3123 - Full Stack Development I  
**Exercise:** Lab Exercise 05  

---

## Section A: Practical Coding Tasks

### 1. Creating an Express.js Route for Home Page
- **Task:** Create `home.html` containing an `<h1>` tag with "Welcome to ExpressJs Tutorial" and serve it at the `/home` route.
- **Implementation:**
  - Created `home.html` with `<h1>Welcome to ExpressJs Tutorial</h1>`.
  - Defined route in `index.js`:
    ```javascript
    app.get('/home', (req, res) => {
      res.sendFile(path.join(__dirname, 'home.html'));
    });
    ```
  - Added route `GET /` to also serve `home.html` for root access.

### 2. Serving JSON Data from a User File
- **Task:** Modify the route `/profile` to return all details from `user.json` in JSON format.
- **Implementation:**
  - Route defined in `routes/users.js`:
    ```javascript
    router.get('/profile', (req, res) => {
      try {
        const user = getUserData();
        res.json(user);
      } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error' });
      }
    });
    ```

### 3. Implementing User Authentication
- **Task:** Modify `/login` (POST) to validate `username` and `password` from the JSON body against `user.json`.
- **Implementation:**
  - Enabled body parsing middleware in `index.js`: `app.use(express.json())`.
  - Route in `routes/users.js`:
    - Checks `username` against `user.json` (`bret`). If invalid, returns:
      ```json
      {
        "status": false,
        "message": "User Name is invalid"
      }
      ```
    - Checks `password` against `user.json` (`bret@123`). If invalid, returns:
      ```json
      {
        "status": false,
        "message": "Password is invalid"
      }
      ```
    - If both match, returns:
      ```json
      {
        "status": true,
        "message": "User Is valid"
      }
      ```

### 4. Creating a Logout Route
- **Task:** Modify `/logout` to accept `username` as a parameter and return `<b>{username} successfully logged out.<b>` in HTML format.
- **Implementation:**
  - Route in `routes/users.js`:
    ```javascript
    router.get(['/logout/:username', '/logout'], (req, res) => {
      const username = req.params.username || req.query.username || 'User';
      res.send(`<b>${username} successfully logged out.<b>`);
    });
    ```
  - Supports both path parameter (`/logout/bret`) and query parameter (`/logout?username=bret`).

### 5. Error Handling Middleware
- **Task:** Add error handling middleware to return a 500 status page with the message "Server Error".
- **Implementation:**
  - Middleware in `index.js`:
    ```javascript
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Server Error');
    });
    ```
  - Added a test route `GET /error` to demonstrate triggering the 500 error handler.

---

## Section B: Short Answer Questions

### 6. Explain the Purpose of `express.Router()` in the Code Above.
**Why is `express.Router()` used in Express.js applications, and how does it benefit the code structure?**

**Answer:**
1. **Modular Routing & Separation of Concerns:**
   `express.Router()` acts as an isolated mini-instance of middleware and routes. Instead of cluttering the main `index.js` file with dozens of route definitions, routes can be logically categorized into separate files (e.g., `routes/users.js`, `routes/products.js`, `routes/auth.js`).

2. **Mounting & Namespace Prefixing:**
   Routers can be mounted on specific URL path prefixes using `app.use()`. For example, `app.use('/api/v1/user', userRouter)` prefixes every route defined in `userRouter` with `/api/v1/user`. If the API version changes in the future, it only needs to be updated at the mount point rather than within each individual route.

3. **Scoped Middleware:**
   Middleware functions can be applied specifically to a single router without affecting the rest of the application. For example, authentication or logging middleware can be applied only to routes inside `userRouter`.

4. **Maintainability, Scalability & Team Collaboration:**
   Decoupling route definitions makes the codebase easier to navigate, test, and maintain as the application expands. Multiple developers can work on different route modules simultaneously without merge conflicts in the main application file.

---

### 7. Error Handling in Express.js
**How would you implement error handling in the Express routes to ensure that any issues (such as file not found or server errors) are appropriately handled? Provide an example.**

**Answer:**
In Express.js, comprehensive error handling is achieved through two complementary mechanisms:
1. **404 Not Found Middleware:** Placed after all valid route definitions to catch requests that do not match any route.
2. **Centralized Error-Handling Middleware:** Express recognizes middleware with **four arguments** `(err, req, res, next)` as error-handling middleware. Any error passed to `next(err)` or thrown in synchronous code is routed directly to this handler.

#### Example Implementation:

```javascript
// 1. Route with error propagation
app.get('/data', (req, res, next) => {
  try {
    const raw = fs.readFileSync('missing-file.json');
    res.json(JSON.parse(raw));
  } catch (err) {
    // Forward error to centralized error handler
    next(err);
  }
});

// 2. 404 Handler for undefined routes (placed after all routes)
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: 'Error 404: Resource Not Found'
  });
});

// 3. Centralized 500 Error Handling Middleware (must have 4 arguments)
app.use((err, req, res, next) => {
  console.error('Error log:', err.message);
  res.status(err.status || 500).json({
    status: false,
    message: err.message || 'Server Error'
  });
});
```

**Benefits:**
- **Prevents Server Crashes:** Unhandled exceptions are caught gracefully.
- **Consistent Responses:** Clients always receive a structured error response with appropriate HTTP status codes (400, 404, 500).
- **Security:** Prevents internal server stack traces and sensitive database information from leaking to clients in production environments.

---

## Section C: Bonus

### 8. Dynamic Port Binding in Express.js
**Explain how the `app.listen(process.env.port || 8081)` line works and why it's useful in production environments.**

**Answer:**
1. **How It Works:**
   - `process.env` is a global object in Node.js that exposes the environment variables of the runtime process.
   - `process.env.PORT` (or `process.env.port`) accesses the value of the port assigned by the operating system or host environment.
   - The logical OR (`||`) operator acts as a fallback:
     - If `process.env.PORT` is set, Express binds to that port.
     - If `process.env.PORT` is `undefined` (common in local development), Express defaults to port `8081`.

2. **Why It Is Critical in Production:**
   - **Cloud Platforms & PaaS Requirements:** Hosting providers such as Heroku, AWS Elastic Beanstalk, Render, Azure App Service, Google Cloud Run, and Railway dynamically assign an arbitrary port to running containers/processes via the `PORT` environment variable. If an application hardcodes a port (e.g., only listens on `8081`), the cloud router cannot communicate with the container, leading to timeout or crash errors (e.g., Heroku R10 Boot Timeout).
   - **Environment Agnostic:** Developers can run the server locally on port `8081` without passing any configuration, while production deployments automatically adapt to the host's infrastructure without modifying any source code.
   - **Avoiding Port Conflicts:** Multiple instances of services or microservices can run on the same physical host by injecting different `PORT` values per process.

---

## API Endpoints Summary

| Method | Endpoint | Description | Request Body / Param | Expected Response |
|--------|----------|-------------|----------------------|-------------------|
| `GET` | `/home` | Serves HTML home page | None | `<h1>Welcome to ExpressJs Tutorial</h1>` |
| `GET` | `/profile` or `/api/v1/user/profile` | Returns user details | None | JSON object of user from `user.json` |
| `POST` | `/login` or `/api/v1/user/login` | User authentication | `{"username":"bret", "password":"bret@123"}` | `{"status": true, "message": "User Is valid"}` |
| `POST` | `/login` (Invalid user) | Invalid username check | `{"username":"wrong", "password":"bret@123"}` | `{"status": false, "message": "User Name is invalid"}` |
| `POST` | `/login` (Invalid pwd) | Invalid password check | `{"username":"bret", "password":"wrong"}` | `{"status": false, "message": "Password is invalid"}` |
| `GET` | `/logout/:username` | Logout user | Path param (e.g., `/logout/bret`) | `<b>bret successfully logged out.<b>` |
| `GET` | `/logout?username=...` | Logout user | Query param (e.g., `/logout?username=bret`) | `<b>bret successfully logged out.<b>` |
| `GET` | `/error` | Test 500 error handler | None | `Server Error` (HTTP 500) |

---

## Screenshots

Screenshots for all Postman requests and outputs are stored in the `screenshots/` directory:
- `screenshots/01_get_home.png` - GET `/home` returning `home.html`
- `screenshots/02_get_profile.png` - GET `/profile` returning JSON from `user.json`
- `screenshots/03_post_login_success.png` - POST `/login` with valid credentials
- `screenshots/04_post_login_invalid_username.png` - POST `/login` with invalid username
- `screenshots/05_post_login_invalid_password.png` - POST `/login` with invalid password
- `screenshots/06_get_logout.png` - GET `/logout/bret` returning HTML response
- `screenshots/07_get_error_500.png` - GET `/error` triggering 500 Server Error
- `screenshots/08_mongodb_atlas.png` - MongoDB Atlas dashboard login confirmation
