# EduPlatform Frontend

A complete Angular 17+ frontend for an online school platform that connects to a REST API at `/api`.

## Features

- **Modern UI/UX**: Built with Angular 17+, Tailwind CSS, and Angular Animations
- **Responsive Design**: Mobile-first approach with hamburger menu
- **Authentication**: Complete auth flow with login, register, and protected routes
- **Course Management**: Browse courses, view details, enroll in lessons
- **Live Sessions**: Jitsi Meet integration for interactive live classes
- **Practice Exams**: Take exams with different question types
- **Dashboard**: Personalized user dashboard with progress tracking
- **Real-time Updates**: Auto-sliding carousel, animated counters, smooth transitions

## Tech Stack

- **Framework**: Angular 17+ (standalone components)
- **Styling**: Tailwind CSS with custom animations
- **Routing**: Angular Router with guards
- **HTTP**: Angular HttpClient with interceptors
- **Forms**: Reactive Forms with FormBuilder
- **Animations**: Angular Animations for smooth transitions

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/              # Home page with hero, carousel, stats
│   │   ├── courses/           # Course catalog with filters
│   │   ├── course-detail/     # Individual course with lessons
│   │   ├── exams/             # Practice exams list
│   │   ├── exam-detail/       # Exam taking interface
│   │   ├── live-sessions/     # Live sessions with Jitsi
│   │   ├── dashboard/         # User dashboard
│   │   ├── login/             # Authentication
│   │   ├── register/          # User registration
│   │   ├── navbar/            # Navigation component
│   │   └── loading/           # Loading component
│   ├── services/              # API services
│   ├── models/                # TypeScript interfaces
│   ├── guards/                # Route guards
│   ├── interceptors/          # HTTP interceptors
│   ├── app.config.ts          # Angular app configuration
│   ├── app.routes.ts          # Route definitions
│   └── app.component.ts        # Root component
├── styles.scss               # Global styles
└── index.html               # HTML template
```

## Pages & Features

### 1. Home Page (/)
- Hero section with animated gradient background
- Auto-sliding carousel of featured courses (4-second intervals)
- Animated stats counters
- Subject categories grid with icons
- Featured courses section
- Upcoming live sessions
- Footer with links

### 2. Courses (/courses)
- Course catalog with search and filters
- Filter by level and subject
- Responsive course grid (3/2/1 columns)
- Course cards with thumbnails, badges, ratings
- Loading skeleton animations

### 3. Course Detail (/courses/:id)
- Course header with information
- Enroll button for students
- Lesson list sidebar grouped by type
- Lesson player area (video, PDF, summary, quiz)
- Locked lessons for non-enrolled users

### 4. Exams (/exams)
- Practice exams list
- Filter by level and subject
- Exam cards with duration and question count
- Start exam functionality

### 5. Exam Detail (/exams/:id)
- Countdown timer
- Multiple question types (multiple choice, true/false, short answer)
- Submit functionality
- Results screen with animations

### 6. Live Sessions (/live-sessions)
- Live sessions list
- Session status badges
- Jitsi Meet integration in modal
- Join session functionality

### 7. Dashboard (/dashboard) - Protected
- Welcome message
- Enrolled courses with progress
- Upcoming exams
- Upcoming live sessions

### 8. Authentication
- Login page with form validation
- Registration with role selection
- Cookie-based authentication
- Protected routes with AuthGuard

## API Integration

The frontend connects to a REST API at `/api` with the following endpoints:

- `GET /api/auth/me` - Get current user
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/courses` - Get courses with filters
- `GET /api/courses/:id` - Get course details
- `GET /api/exams` - Get exams
- `GET /api/live-sessions` - Get live sessions
- `GET /api/stats` - Get platform statistics

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run start
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Run tests**:
   ```bash
   npm run test
   ```

## Configuration

- **API Base URL**: Configured in services (`/api`)
- **Authentication**: Cookie-based with `withCredentials: true`
- **Tailwind CSS**: Custom configuration in `tailwind.config.js`
- **Animations**: Defined in global styles and component-specific

## Key Features

### Animations & Effects
- Route transitions (fade + slide)
- Carousel auto-slide every 4 seconds
- Counter animations on scroll
- Card hover effects with elevation
- Loading skeleton animations
- Staggered list entries
- Navbar transparency on scroll

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile
- Responsive grid layouts
- Touch-friendly interactions

### User Experience
- Loading states for all async operations
- Error handling with user-friendly messages
- Form validation with reactive forms
- SEO meta tags per page
- Accessibility considerations

## Development Notes

- All components are standalone (Angular 17+)
- Uses functional interceptors for HTTP
- Implements proper error handling
- Follows Angular best practices
- TypeScript strict mode enabled

## Next Steps

After completing the frontend, proceed to create the backend API in a separate `backend` folder to provide the required endpoints for full functionality.
