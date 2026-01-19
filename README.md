# SafariConnect Frontend

A modern React-based frontend for the SafariConnect safari booking platform. This application allows travelers to browse and book accommodations and transportation, while hosts and drivers can manage their listings.

![SafariConnect](https://via.placeholder.com/1200x600/2563eb/ffffff?text=SafariConnect+Safari+Booking+Platform)

## 🚀 Features

### For Travelers (Tourists)

- **Browse Accommodations** - View available lodges, hotels, and campsites
- **Browse Transport** - Find available vehicles and drivers for your journey
- **Book Accommodations** - Make reservations with date selection and pricing
- **Book Transport** - Reserve seats for your travel dates
- **View Bookings** - Track all your upcoming and past bookings

### For Hosts

- **Create Listings** - Add new accommodations with photos, pricing, and amenities
- **Manage Availability** - Update property availability status
- **View Bookings** - See who has booked your properties

### For Drivers

- **Create Transport Listings** - Add vehicles with capacity and pricing
- **Manage Availability** - Update vehicle availability status
- **View Bookings** - See who has booked your transport services

## 🛠 Tech Stack

- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **React Router v6** - Client-side routing
- **Context API** - State management (Auth & Booking)
- **Axios** - HTTP client for API requests
- **Formik + Yup** - Form handling and validation
- **Tailwind CSS** - Utility-first styling

## 📁 Project Structure

```
safari-connect-frontend/
├── public/                 # Static assets
├── src/
│   ├── api/               # API client configuration
│   │   ├── axios.js      # Axios instance with interceptors
│   │   ├── accommodation.api.js
│   │   ├── auth.api.js
│   │   ├── booking.api.js
│   │   └── transport.api.js
│   ├── components/        # Reusable components
│   │   ├── accommodation/
│   │   ├── booking/
│   │   ├── common/
│   │   └── transport/
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.jsx
│   │   └── BookingContext.jsx
│   ├── hooks/             # Custom hooks
│   │   └── useAuth.js
│   ├── layouts/           # Page layouts
│   │   ├── AuthLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   └── PublicLayout.jsx
│   ├── pages/             # Page components
│   │   ├── auth/          # Login, Register
│   │   ├── driver/        # Driver dashboard, manage transports
│   │   ├── host/          # Host dashboard, manage accommodations
│   │   ├── public/        # Home, Accommodations, Transports
│   │   └── tourist/       # Tourist dashboard, my bookings
│   ├── routes/            # Route definitions
│   │   └── AppRoutes.jsx
│   ├── utils/             # Utility functions
│   │   └── token.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. After login/registration, the token is stored in localStorage and included in API requests via axios interceptors.

### User Roles

- **tourist** - Can browse and book accommodations/transport
- **host** - Can create and manage accommodation listings
- **driver** - Can create and manage transport listings

## 📡 API Integration

The frontend communicates with the SafariConnect backend API running at `http://127.0.0.1:5000`.

### API Endpoints Used

| Endpoint                  | Method   | Description                      |
| ------------------------- | -------- | -------------------------------- |
| `/auth/register`          | POST     | Register new user                |
| `/auth/login`             | POST     | User login                       |
| `/auth/me`                | GET      | Get current user                 |
| `/accommodations`         | GET      | List accommodations              |
| `/accommodations`         | POST     | Create accommodation (host only) |
| `/transports`             | GET      | List transports                  |
| `/transports`             | POST     | Create transport (driver only)   |
| `/accommodation_bookings` | GET/POST | Manage accommodation bookings    |
| `/transport_bookings`     | GET/POST | Manage transport bookings        |
| `/host/bookings`          | GET      | Get host's bookings              |
| `/driver/bookings`        | GET      | Get driver's bookings            |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the frontend directory:

```bash
cd safari-connect-frontend
```

2. Install dependencies:

```bash
npm install
npm install lucide-react
```

3. Create a `.env` file (optional):

```env
VITE_API_URL=http://127.0.0.1:5000
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## 🔧 Configuration

### Environment Variables

| Variable       | Description     | Default                 |
| -------------- | --------------- | ----------------------- |
| `VITE_API_URL` | Backend API URL | `http://127.0.0.1:5000` |

### Tailwind Configuration

The project uses Tailwind CSS for styling. Configuration can be found in `tailwind.config.js`.

## 📱 Available Pages

| Route                  | Description           | Auth Required |
| ---------------------- | --------------------- | ------------- |
| `/`                    | Home page             | No            |
| `/accommodations`      | Browse accommodations | No            |
| `/transports`          | Browse transport      | No            |
| `/login`               | User login            | No            |
| `/register`            | User registration     | No            |
| `/tourist/dashboard`   | Tourist dashboard     | Tourist       |
| `/tourist/bookings`    | My bookings           | Tourist       |
| `/host/dashboard`      | Host dashboard        | Host          |
| `/host/accommodations` | Manage accommodations | Host          |
| `/driver/dashboard`    | Driver dashboard      | Driver        |
| `/driver/transports`   | Manage transports     | Driver        |

## 🧪 Development

### Code Style

- ESLint is configured for code linting
- Prettier for code formatting (if configured)

### Adding New Features

1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Register routes in `src/routes/AppRoutes.jsx`
4. Update API clients in `src/api/` if needed

## 📄 License

This project is part of the SafariConnect application.

## 👥 Authors

This project was developed by:

1. Moses Maina
2. Ephraim Peace
3. Esther Wandera

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Built with ❤️ for safari enthusiasts
