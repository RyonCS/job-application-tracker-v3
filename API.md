# 📘 API Documentation

**Base URL:** `https://job-application-tracker-v2.onrender.com/api/v1`

## 🧑 User Routes

### POST /auth/register
Register a new user.

**Request Body:**
```json
{
    "emailAddress": "",
    "password": ""
}
```

**Response:**

- **Success (200 OK):**

```json
{
    "message": "Successfully registered user."
}
```

### Notes:
- Requires `emailAddress` and `password` in request body.
- Password is hashed before storage.
- If the user is already logged in, they will be logged out first.

---

### POST /auth/login
Login an existing user.

**Request Body:**
```json
{
    "emailAddress": "",
    "password": ""
}
```

**Response:**

- **Success (200 OK):**

```json
{
    "message": "Login Successful."
}
```

### Notes:
- Requires valid `emailAddress` and `password`.
- If user already logged in, previous session is logged out before new login.

---

### POST /auth/logout
Logout a logged-in user.

**Request:**
- No request body required.
- User must have a valid session (authenticated).

**Response:**

- **Success (200 OK):**

```json
{
  "message": "Successfully logged out user."
}
```

### Notes:
- Logs out the user by destroying their session.

---

## 💼 Application Routes

### GET /applications  
Get all job applications belonging to the authenticated user, with optional sorting, filtering, and searching.

**Request:**

- Requires authentication (session or token).
- Supports query parameters for sorting, filtering, and searching (optional):

| Query Parameter | Description                                 | Example                |
|-----------------|---------------------------------------------|------------------------|
| `sort`          | Field to sort by (e.g., `"dateApplied"`)    | `?sort=dateApplied`    |
| `orderBy`       | Sort order (`asc` or `desc`)                 | `?orderBy=desc`        |
| `filter`        | Filter criteria (e.g., status)               | `?filter=applied`      |
| `search`        | Search keyword for company or position name | `?search=google`   

**Response:**

- **Success (200 OK):**

```json
{
  "applications": [
    {
      "id": "string",
      "applicationDate": "YYYY-MM-DD",
      "company": "string",
      "position": "string",
      "location": "string",
      "status": "Status",
      "workMode": "WorkMode",
      "linktoJobPosting": "string",
      "userId" : "string"
    }
    // ... more applications
  ],
  "sort": "string",
  "filter": "string",
  "search": "string"
}
```

### Notes:
- User must be authenticated to access their own applications.
- Sorting, filtering, and searching query parameters are optional and case-insensitive.
- The returned application objects contain all relevant fields from the database.

---

### POST /applications
Adds a new application for the logged-in user.

**Request:**
```json
{
  "applicationDate": "YYYY-MM-DD",   // Optional. If missing, defaults to current date.
  "company": "string",               // Optional
  "position": "string",              // Optional
  "location": "string",              // Optional
  "status": "APPLIED" | "PHONESCREEN" | "INTERVIEW" | "TAKEHOMEASSESSMENT" | "OFFER" | "REJECTED" | "DECLINED",  // Enum, optional but recommended
  "workMode": "INPERSON" | "REMOTE" | "HYBRID",  // Enum, optional
  "linkToJobPosting": "string"       // Optional
}
```

**Response:**

- **Success (200 OK):**
```json
{
  "message": "Application successfully created.",
  "applicationId": "string"  // The UUID of the new job application
}
```

### Notes:
- `applicationDate` defaults to the current date if omitted or invalid.
- Enum fields (status, workMode) are case-insensitive and normalized on the server.
- User identity (userId) is set from the authenticated session and cannot be overridden.
- Partial or missing optional fields (e.g., company, position) are allowed.

---

### PUT /applications

**Request:**

- Requires authentication (session or token).
- URL parameter:  
  - `id` (string) — The UUID of the job application to update.
- Content-Type: `application/json`
- JSON request body fields (any subset of these to update):

```json
{
  "applicationDate": "YYYY-MM-DD",   // Optional, date string
  "company": "string",               // Optional
  "position": "string",              // Optional
  "location": "string",              // Optional
  "status": "APPLIED" | "PHONESCREEN" | "INTERVIEW" | "TAKEHOMEASSESSMENT" | "OFFER" | "REJECTED" | "DECLINED",  // Enum, optional
  "workMode": "INPERSON" | "REMOTE" | "HYBRID",  // Enum, optional
  "linkToJobPosting": "string"       // Optional
}
```

**Response:**

- **Success (200 OK):**
```json
{
  "message": "Application successfully updated."
}
```

### Notes
- Only fields included in the request body will be updated.
- `applicationDate` should be a valid date string (`YYYY-MM-DD`).
- Enum fields (`status` and `workMode`) are normalized before updating.
- User must own the application to update it.

---

### DELETE /api/v1/applications/:id  
Delete a job application by its ID.

**Request:**

- Requires authentication (session or token).
- URL parameter:  
  - `id` (string) — The UUID of the job application to delete.
- No request body required.

---

**Response:**

- **Success (200 OK):**

```json
{
  "message": "Successfully deleted application."
}
```

### Notes
- User must own the application to delete it.
- The endpoint validates ownership before deleting.