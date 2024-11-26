// src/routes/index.jsx
import { createBrowserRouter, Outlet, useRouteError } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/ui/Navbar";
import DashboardNavbar from "./components/ui/DashboardNav";
import Dashboard from "./components/pages/Dashboard";
import PayrollSetup from "./components/pages/Payrol";
import PayrollSystem from "./components/pages/PaySystem";
import Footer from "./components/ui/Footer";
import { ProtectedRoute } from "../ProtectedRoute";
import { AuthProvider } from "./components/context/userContext";

// Layout component that includes common elements like navigation
const RootLayout = () => {
  return (
    <div>
      <main>
        <AuthProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </AuthProvider>
      </main>
    </div>
  );
};

const DashboardRootLayout = () => {
  return (
    <div>
      <main>
        <AuthProvider>
          <ProtectedRoute>
            <DashboardNavbar />
            <Outlet />
          </ProtectedRoute>
        </AuthProvider>
      </main>
    </div>
  );
};

// Error boundary component
const ErrorBoundary = () => {
  const error = useRouteError();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
        <p className="text-xl text-gray-600">
          {error?.message || "Sorry, an unexpected error occurred."}
        </p>
      </div>
    </div>
  );
};

// Placeholder components for other routes
const About = () => <div>About Page</div>;
const Customers = () => <div>Customers Page</div>;
const Pricing = () => <div>Pricing Page</div>;
const Blog = () => <div>Blog Page</div>;
const SignIn = () => <div>Sign In Page</div>;
const SignUp = () => <div>Sign Up Page</div>;
// const Dashboard = () => <div>Dashboard Page</div>;

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardRootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // {
      //   path: "",
      //   element: <Dashboard />,
      // },
    ],
  },
  {
    path: "payroll",
    // element: <DashboardRootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <PayrollSetup />,
      },
      {
        path: "pay",
        element: <PayrollSystem />,
      },
    ],
  },
]);

export default router;
