# Admin Dashboard - React + TypeScript Frontend

A hackathon-ready admin dashboard built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🔐 JWT Authentication (Login, Forgot Password, Reset Password)
- 📁 Category Management (CRUD)
- 📂 Subcategory Management (CRUD)
- 📦 Product Management (CRUD)
- 🎨 Modern UI with Tailwind CSS
- 🛡️ Protected Routes
- 📱 Responsive Design

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router v6** for routing
- **Context API** for state management
- **Axios** for API calls
- **Tailwind CSS v3.4** for styling

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Update the URL to match your backend server.

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── App.tsx                 # Main app component with routes
├── main.tsx                # Entry point with BrowserRouter
├── index.css               # Tailwind CSS imports
├── components/
│   ├── Navbar.tsx          # Top navigation bar
│   ├── Sidebar.tsx         # Side navigation menu
│   ├── Table.tsx           # Reusable table component
│   └── Modal.tsx           # Reusable modal component
├── context/
│   └── AuthContext.tsx     # Authentication context
├── pages/
│   ├── Login.tsx           # Login page
│   ├── ForgotPassword.tsx  # Forgot password page
│   ├── ResetPassword.tsx   # Reset password page
│   ├── Home.tsx            # Dashboard home
│   ├── Categories.tsx      # Categories management
│   ├── Subcategories.tsx   # Subcategories management
│   └── Products.tsx        # Products management
├── services/
│   └── api.ts              # API service layer
└── routes/
    └── ProtectedRoute.tsx  # Route protection component
```

## API Integration

The frontend expects the following backend endpoints:

### Auth
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Categories
- `GET /api/categories`
- `GET /api/categories/:id`
- `POST /api/categories`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`

### Subcategories
- `GET /api/subcategories`
- `GET /api/subcategories/:id`
- `POST /api/subcategories`
- `PUT /api/subcategories/:id`
- `DELETE /api/subcategories/:id`

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

All protected routes require a JWT token in the Authorization header: `Bearer <token>`

## Notes

- The UI is hackathon-ready and functional, but not pixel-perfect
- No validation library is used (basic HTML5 validation)
- Tables are simple without pagination
- Forms are basic but functional
- All API calls are handled through the service layer
