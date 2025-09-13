# Campus360 Solution

## Project Overview
Campus360 is a comprehensive campus management system designed to facilitate various campus activities including reservations, cafeteria services, transportation tracking, and administrative functions. The system provides a user-friendly interface for students, staff, and administrators to interact with campus resources efficiently.

## Features
- **User Authentication**: Secure login system for different user roles (students, staff, teachers, admins)
- **Reservation System**: Book and manage reservations for campus facilities
- **Cafeteria Management**: Browse menu, place food orders, and manage cafeteria services
- **Transportation Tracking**: Real-time bus tracking and transportation polling system
- **Admin Dashboard**: Administrative controls for managing users, reservations, and system settings
- **Communication Hub**: Centralized communication platform for campus announcements
- **Club Management**: Features for managing student clubs and activities

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Custom authentication system
- **Validation**: Validator.js for input validation
- **CORS**: Enabled for cross-origin requests
- **Environment Management**: Dotenv for configuration

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with DaisyUI components
- **Routing**: React Router DOM
- **HTTP Client**: Axios for API calls
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Smooth Scrolling**: React Scroll

## Project Structure
```
campus-dot/
├── Backend/
│   ├── app.js                 # Main Express application
│   ├── server.js              # Server entry point
│   ├── config/
│   │   └── config.env         # Environment configuration
│   ├── controller/
│   │   └── reservation.js     # Reservation controller
│   ├── database/
│   │   └── dbconnection.js    # Database connection
│   ├── error/
│   │   └── error.js           # Error handling middleware
│   ├── models/
│   │   └── reservationSchema.js # Reservation data model
│   └── routes/
│       └── reservationRoute.js # Reservation routes
├── fronted/                   # Frontend application
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # React entry point
│   ├── package.json
│   ├── vite.config.js         # Vite configuration
│   └── index.html
└── readme                     # Project documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `config/config.env`:
   ```
   PORT=5002
   FRONTEND_URL=http://localhost:5174
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the fronted directory:
   ```bash
   cd fronted
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5174` and the backend at `http://localhost:5002`.

## API Endpoints
- `GET /` - Health check endpoint
- `POST /api/v1/reservation` - Create a new reservation
- `GET /api/v1/reservation` - Get all reservations

## Usage
1. Access the application through the frontend URL
2. Register/Login as appropriate user type
3. Navigate through different sections:
   - Home: Overview of campus services
   - Cafeteria: Browse and order food
   - Transport: Track buses and participate in polls
   - Admin: Manage system (admin access required)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is licensed under the ISC License.

## Contact
For questions or support, please contact the development team.
