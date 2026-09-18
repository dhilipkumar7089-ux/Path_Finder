# Path-Finder 🎓

A full-stack web application for 12th-standard students to discover colleges and courses based on their interests, cutoff marks, and career goals.

## Features

- **Student Authentication**: Register and login with JWT-based authentication
- **Career Interest Quiz**: Multiple-choice quiz to discover your ideal career domain (Engineering/Medical/Commerce/Arts)
- **College Directory**: Browse colleges with detailed information, infrastructure, and images
- **Smart Search**: Filter colleges by district and check eligibility based on cutoff marks
- **College Details**: View image galleries, course offerings, and cutoff tables
- **Career Roadmaps**: Visual step-by-step timelines for each course
- **Bookmarks**: Save and manage your favorite colleges

## Tech Stack

### Backend
- Node.js + Express.js
- MySQL (mysql2 with raw SQL queries)
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- React with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

## Project Structure

```
Path-Finder/
├── backend/
│   ├── config/
│   │   └── db.js           # Database configuration
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js         # Authentication endpoints
│   │   ├── quiz.js         # Quiz endpoints
│   │   ├── colleges.js     # College endpoints
│   │   └── roadmaps.js     # Roadmap endpoints
│   ├── schema.sql          # Database schema
│   ├── seed.js             # Database seeder
│   ├── server.js           # Express server
│   ├── package.json
│   └── .env                # Environment variables
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Quiz.jsx
    │   │   ├── Results.jsx
    │   │   ├── CollegeSearch.jsx
    │   │   ├── CollegeDetail.jsx
    │   │   ├── Roadmap.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── utils/
    │   │   └── api.js      # Axios configuration
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Edit the `.env` file with your MySQL credentials:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=path_finder
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Configure MySQL database**

   Option A: Using MySQL Command Line
   ```bash
   mysql -u root -p
   ```
   Then run:
   ```sql
   source path/to/backend/schema.sql
   ```

   Option B: Using Node.js script
   ```bash
   node setup-db.js
   ```

   Option C: Using MySQL Workbench/phpMyAdmin
   - Open the `schema.sql` file in your MySQL client
   - Execute the SQL commands to create the database and tables

5. **Seed the database with sample data**
   ```bash
   node seed.js
   ```

6. **Start the backend server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new student
- `POST /api/auth/login` - Login a student
- `GET /api/auth/profile` - Get user profile (requires auth)

### Quiz
- `GET /api/quiz/questions` - Get all quiz questions
- `POST /api/quiz/submit` - Submit quiz answers (requires auth)
- `GET /api/quiz/results` - Get quiz results (requires auth)

### Colleges
- `GET /api/colleges` - Get all colleges with optional filters
- `GET /api/colleges/:id` - Get college details by ID
- `GET /api/colleges/meta/districts` - Get all districts
- `POST /api/colleges/bookmark` - Bookmark a college (requires auth)
- `DELETE /api/colleges/bookmark/:college_id` - Remove bookmark (requires auth)
- `GET /api/colleges/bookmarks/list` - Get user's bookmarks (requires auth)

### Roadmaps
- `GET /api/roadmaps/course/:course_id` - Get roadmap for a course

## Database Schema

The application uses the following tables:
- `students` - User accounts and profile information
- `quiz_questions` - Career interest quiz questions
- `quiz_responses` - Student quiz answers
- `colleges` - College information
- `courses` - Course offerings per college
- `course_cutoffs` - Cutoff marks by category
- `bookmarks` - User-saved colleges
- `career_roadmaps` - Career step-by-step guides

## Demo Data

The seed script includes:
- 8 sample colleges across Tamil Nadu
- 16 courses across Engineering, Medical, Commerce, and Arts
- 5 quiz questions for career assessment
- Complete cutoff data for all categories
- Career roadmaps for key courses

## Usage

1. **Register** - Create an account with your cutoff mark, category, and district
2. **Take Quiz** - Complete the career interest quiz to get personalized suggestions
3. **Explore Colleges** - Search and filter colleges by district and eligibility
4. **View Details** - Check college infrastructure, courses, and cutoff tables
5. **Bookmark** - Save your favorite colleges for quick access
6. **View Roadmaps** - See career progression timelines for each course

## Development

### Adding New Colleges

Edit `backend/seed.js` and add college data to the `colleges` array, then run:
```bash
node seed.js
```

### Adding Quiz Questions

Edit `backend/seed.js` and add questions to the `questions` array, then run:
```bash
node seed.js
```

### Customizing UI

The frontend uses Tailwind CSS. Modify `tailwind.config.js` to customize colors and themes.

## License

ISC
