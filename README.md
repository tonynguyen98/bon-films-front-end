# Bon Films Front-End

An Angular web application for browsing films and posting reviews.

- Frontend updated to Angular 20
- Uses Bootstrap 5 and modern Angular CLI configuration
- HTTP client integration with a Spring Boot backend API
- JWT-based auth flow (no Firebase or direct SQL in the frontend)

# Local development

## Requirements

- Node.js 18+ or 20+
- npm
- A running Spring Boot backend on `http://localhost:8080`

## Run the app

```bash
npm install
npm run start
```

Open the app at `http://localhost:4200`.

## Build for production

```bash
npm run build -- --configuration=production
```

# Backend integration

This frontend calls the Spring Boot backend at `http://localhost:8080`.
The backend repository is:

https://github.com/bon-films/bon-films-spring-boot

# API routes used by the frontend

- `POST /auth/login` — login and receive auth token
- `POST /auth/register` — register a new user
- `POST /auth/forgot-password` — request password reset
- `GET /api/films` — list all films
- `GET /api/films/{id}/reviews` — get reviews for a film
- `POST /api/films` — create a new film
- `GET /api/film-reviews` — get combined film and review data
- `GET /api/reviews/{id}` — get a single review
- `POST /api/reviews` — create a new review
- `PUT /api/reviews/{id}` — update a review
- `DELETE /api/reviews/{id}` — delete a review

# Features

Everyone can:

- View all films
- View all reviews
- View film and review details

Authenticated users can:

- Create reviews
- Add new films
- View their own reviews
- Edit reviews
- Delete reviews

# Notes

- The frontend no longer contains any SQL logic.
- Authentication is handled via the backend API.
- Environment configuration points to the Spring Boot backend URL.
