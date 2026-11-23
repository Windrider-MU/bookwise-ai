# BookWise AI

BookWise AI is a full-stack, AI-powered tutoring appointment platform. Users can browse software-development tutoring services, create and manage appointments, and receive an AI-generated service recommendation based on their learning goals.

## Live Application

- Frontend: `YOUR_VERCEL_URL`
- Backend API: `YOUR_RENDER_URL/api/health`

## Repository

- GitHub: `YOUR_GITHUB_REPOSITORY_URL`

## Project Overview

Students often know that they need technical help but do not know which tutoring service is best for their situation. BookWise AI combines a service-booking platform with an AI advisor that recommends one of the services currently available in the application.

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Vite
- CSS

### Backend

- Node.js
- Express
- Mongoose
- JSON Web Tokens
- bcryptjs
- OpenAI JavaScript SDK

### Database

- MongoDB Atlas

### Deployment

- Vercel
- Render
- MongoDB Atlas

## Features

- User registration
- User login and logout
- JWT-based protected routes
- Password hashing
- Service browsing
- Service details
- Appointment booking
- Appointment rescheduling
- Appointment cancellation
- Personal user dashboard
- AI-powered service recommendations
- Responsive design
- Validation and error handling
- API rate limiting

## AI-Powered Feature

The BookWise AI Advisor allows an authenticated user to describe their learning challenge. The backend retrieves the current service catalog and sends both the catalog and the user's goal to the OpenAI Responses API.

The AI is instructed to:

1. Recommend only a service that exists in the database.
2. Use the exact service name.
3. Explain why the service is relevant.
4. Include duration and price.
5. Provide a preparation tip.
6. Avoid claiming that it created a booking.

The OpenAI API key is stored only on the backend.

## Project Structure

```text
bookwise-ai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── seed.js
│   │   └── server.js
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── vercel.json
├── docs/
├── .gitignore
└── README.md