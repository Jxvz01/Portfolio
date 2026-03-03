# Advanced Tech Portfolio - Pilot

A futuristic, immersive portfolio website with a 3D drone hero, GSAP storytelling, and a mission-control admin panel.

## Features
- **3D Drone Hero**: Interactive drone tracking cursor in real-time.
- **HUD Interface**: Real-time telemetry, scanlines, and tech overlays.
- **GSAP Storytelling**: Cinematic scroll-based narrative.
- **Admin Panel**: Mission-control dashboard for CRUD operations on projects and skills.
- **Tech Stack**: React, TypeScript, Three.js, GSAP, Express, MongoDB.

## Tech Stack
- **Frontend**: React, Vite, TS, Tailwind CSS, Three.js (R3F), GSAP, Framer Motion.
- **Backend**: Node.js, Express, MongoDB, JWT.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or Atlas)

### Local Development

1.  **Clone the repository** (or navigate to the folder).
2.  **Server Setup**:
    ```bash
    cd server
    npm install
    # Update .env with your MongoDB URI
    npm run dev
    ```
3.  **Client Setup**:
    ```bash
    cd client
    npm install
    npm run dev
    ```
4.  **Admin Access**:
    - Route: `/admin/login`
    - Demo Password: `admin123`

## Environment Variables (.env)

### Server
- `PORT`: 5000
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Random string for JWT
- `ADMIN_PASSWORD`: Your desired admin password

## Credits
- Built with Antigravity AI.
- Design inspired by drone HUDs and futuristic interfaces.
