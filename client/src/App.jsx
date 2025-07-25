import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";
import AdminRoute from "./components/protectedRoutes/AdminRoute";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader.jsx";
import DashboardLayout from "./pages/user-dashboard/DashboardLayout.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";

// Lazy-loaded Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About.jsx"));
const Blogs = lazy(() => import("./pages/Blogs.jsx"));
const BlogDetails = lazy(() => import("./pages/BlogDetails.jsx"));
const ContactPage = lazy(() => import("./pages/Contact.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Register = lazy(() => import("./pages/auth/Register.jsx"));
const ForgetPassword = lazy(() => import("./pages/auth/ForgetPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword.jsx"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail.jsx"));
const PropertyList = lazy(() => import("./pages/property/PropertyList.jsx"));
const PropertyDetail = lazy(() => import("./pages/property/PropertyDetail.jsx"));
const UpdateProperty = lazy(() => import("./pages/property/UpdateProperty.jsx"));
const PropertyForm = lazy(() => import("./pages/property/PropertyForm.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const PricingPlan = lazy(() => import("./pages/PricingPlan.jsx"));

// User Pages
const Profile = lazy(() => import("./pages/profile/Profile.jsx"));
const UpdateProfile = lazy(() => import("./pages/profile/UpdateProfile.jsx"));

// Dashboard
const UserDashboard = lazy(() => import("./pages/user-dashboard/UserDashboard.jsx"));
const UserPropertyManagement = lazy(() => import("./pages/user-dashboard/dashboard-controls/UserPropertyManagement.jsx"));
const Favorites = lazy(() => import("./pages/user-dashboard/dashboard-controls/Favourites.jsx"));
const FavoriteServices = lazy(() => import("./pages/user-dashboard/dashboard-controls/FavouriteServices.jsx"));

// Service Provider
const BecomeProvider = lazy(() => import("./pages/serviceProvider/BecomeProvider.jsx"));
const ServiceProviderList = lazy(() => import("./pages/serviceProvider/ServiceProviderList.jsx"));
const ServiceProviderDetailPage = lazy(() => import("./pages/serviceProvider/ServiceProviderDetails.jsx"));
const ServiceProviderProfileView = lazy(() => import("./pages/serviceProvider/ServiceProviderProfileView.jsx"));
const ServiceProviderProfileForm = lazy(() => import("./components/serviceProvider/ServiceProviderProfileForm.jsx"));

// Admin
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AdminPropertyManagement = lazy(() => import("./pages/admin/dashboard-controls/AdminPropertyManagement.jsx"));
const PendingApprovals = lazy(() => import("./pages/admin/dashboard-controls/PendingApprovals.jsx"));
const AdminProviderApprovalTable = lazy(() => import("./pages/admin/dashboard-controls/AdminApproveProvider.jsx"));
const AdminUserManagement = lazy(() => import("./pages/admin/dashboard-controls/AdminUserManagement.jsx"));
const AdminCreateBlog = lazy(() => import("./pages/admin/dashboard-controls/AdminCreateBlog.jsx"));
const AdminEditBlog = lazy(() => import("./pages/admin/dashboard-controls/AdminEditBlog.jsx"));

import "./App.css";
import ServiceProviderRequests from "./pages/serviceProvider/ServiceProviderRequests.jsx";
import MyRequests from "./pages/user-dashboard/dashboard-controls/MyRequestedServices.jsx";
import ScrollToTop from './components/common/ScrollToTop.jsx';
import ChatbotWidget from "./components/common/ChatbotWidget.jsx";
import CustomCursor from "./components/common/CustomCursor.jsx";

function App() {
  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <Header />
      <ChatbotWidget />

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/providers/:id" element={<ServiceProviderDetailPage />} />
          <Route path="/services" element={<ServiceProviderList />} />
          <Route path="/pricing-plan" element={<PricingPlan />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected User Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/user-dashboard" element={<DashboardLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="dashboard-properties" element={<UserPropertyManagement />} />
              <Route path="dashboard-favourites" element={<Favorites />} />
              <Route path="dashboard-favourite-services" element={<FavoriteServices />} />
              <Route path="my/requests" element={<MyRequests />} />
            </Route>

            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/add-property" element={<PropertyForm />} />
            <Route path="/property/edit/:id" element={<UpdateProperty />} />
            <Route path="/add-service" element={<BecomeProvider />} />
            <Route path="/service-provider/me" element={<ServiceProviderProfileView />} />
            <Route path="/update-service-profile" element={<ServiceProviderProfileForm />} />
            <Route path="/provider/requests" element={<ServiceProviderRequests />} />
          </Route>
            
          <Route path="edit-blog/:id" element={<AdminEditBlog />} />

          {/* Admin Routes - FIXED: Use blog ID for editing, not slug */}
          <Route path="/admin-dashboard" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="properties" element={<AdminPropertyManagement />} />
            <Route path="pending-approvals" element={<PendingApprovals />} />
            <Route path="pending-providers-approval" element={<AdminProviderApprovalTable />} />
            <Route path="admin-users" element={<AdminUserManagement />} />
            <Route path="add-blog" element={<AdminCreateBlog />} />
          </Route>
        </Routes>
      </Suspense>

      <Footer />
    </Router>
  );
}

export default App;