// src/App.jsx


import {
   HashRouter,
  Routes,
  Route
} from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import History from "./pages/History"
import Budget from "./pages/Budget"
import Groups from "./pages/Groups"
import GroupDetails from "./pages/GroupDetails"
import Settings from "./pages/Settings"

import ProtectedRoute from "./components/ProtectedRoute"
import VerifyEmail from "./pages/VerifyEmail"
import ResetPassword from "./pages/ResetPassword"

function App() {
  return (
    < HashRouter>

      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <Budget />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups/:groupId"
          element={
            <ProtectedRoute>
              <GroupDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
 path="/verify-email"
 element={<VerifyEmail />}
/>

<Route
 path="/reset-password/:token"
 element={<ResetPassword />}
/>

      </Routes>

    </HashRouter>
  )
}

export default App