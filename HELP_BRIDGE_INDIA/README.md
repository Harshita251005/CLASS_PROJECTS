# Help Bridge India

Help Bridge India is a comprehensive social welfare platform designed to connect NGOs, volunteers, and people in need. It facilitates event management, help requests, and community support to bridge the gap between resources and those who require them.

## Features

-   **NGO Registration**: NGOs can register and manage their profiles.
-   **Event Management**: Organize and list events for social causes.
-   **Help Requests**: Users can submit requests for help, which can be picked up by volunteers or NGOs.
-   **Volunteer Management**: Volunteers can sign up and participate in events and help requests.
-   **Community Forum**: A space for discussions and community engagement.

## Tech Stack

**Frontend:**
-   React
-   Vite
-   Tailwind CSS
-   Framer Motion
-   Lucide React
-   Axios

**Backend:**
-   Node.js
-   Express.js
-   MongoDB (Mongoose)
-   JWT (JSON Web Tokens) for authentication
-   Multer for file uploads

## Prerequisites

Before you begin, ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd HELP_BRIDGE_INDIA
    ```

2.  **Install Dependencies:**

    *   **Frontend:**
        ```bash
        npm install
        ```

    *   **Backend:**
        ```bash
        cd server
        npm install
        ```

3.  **Environment Variables:**

    Create a `.env` file in the `server` directory and add the following variables:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    *(Note: Adjust variable names based on your actual configuration)*

## Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd server
    npm start
    # or for development with nodemon
    npm run dev
    ```

2.  **Start the Frontend Development Server:**
    ```bash
    # From the root directory
    npm run dev
    ```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:5000`.

## Project Structure

```
HELP_BRIDGE_INDIA/
├── public/              # Static assets
├── server/              # Backend Node.js/Express application
│   ├── config/          # Database configuration
│   ├── middleware/      # Custom middleware (auth, uploads, etc.)
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded files
│   └── index.js         # Server entry point
├── src/                 # Frontend React application
│   ├── assets/          # Images and styles
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application pages
│   ├── context/         # React context providers
│   └── App.jsx          # Main App component
├── package.json         # Frontend dependencies and scripts
└── README.md            # Project documentation
```

## License

This project is licensed under the ISC License.
