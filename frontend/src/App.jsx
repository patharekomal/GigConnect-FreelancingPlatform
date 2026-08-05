import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ClientDashboard from "./pages/Client/ClientDashboard";
import PostJob from "./pages/Client/PostJobs";
import ViewBids from "./pages/Client/ViewBids";
import MyJobs from "./pages/Client/MyJobs";
import ClientMyProjects from "./pages/Client/ClientMyProjects";
import ProjectPage from "./pages/Client/ProjectPage";
import Payment from "./pages/Client/Payment";
import ClientProfile from "./pages/Client/ClientProfile";
import ClientChat from "./pages/Client/ClientChat";
import EditClientProfile from "./pages/Client/EditClientProfile";

import FreelancerDashboard from "./pages/Freelancer/FreelancerDashboard";
import BrowseJobs from "./pages/Freelancer/BrowseJobs";
import SubmitBid from "./pages/Freelancer/SubmitBid";
import MyBids from "./pages/Freelancer/MyBids";
import EditBid from "./pages/Freelancer/EditBid";
import MyProjects from "./pages/Freelancer/MyProjects";
import Chat from "./pages/Freelancer/Chat";
import SubmitWork from "./pages/Freelancer/SubmitWork";
import Reviews from "./pages/Freelancer/Reviews";
import Profile from "./pages/Freelancer/Profile";
import ProjectDetails from "./pages/Freelancer/ProjectDetails";
import EditFreelancerProfile from "./pages/Freelancer/EditFreelancerProfile";

import ClientProfileSetup from "./pages/ClientProfileSetup";
import FreelancerProfileSetup from "./pages/FreelancerProfileSetup";

import ProtectedRoute from "./components/ProtectedRoute";

import { jobs } from "./data/dummyData";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} /> 
      <Routes>

        {/* ── PUBLIC ROUTES — no login needed ──────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/client-profile-setup" element={<ClientProfileSetup />} />
        <Route path="/freelancer-profile-setup" element={<FreelancerProfileSetup />} />

        {/* ── CLIENT ONLY ROUTES ───────────────────────────────────── */}
        <Route path="/client" element={
          <ProtectedRoute allowedRole="CLIENT">
            <ClientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/post-job" element={
          <ProtectedRoute allowedRole="CLIENT">
            <PostJob />
          </ProtectedRoute>
        } />
        <Route path="/bids/:jobId" element={
          <ProtectedRoute allowedRole="CLIENT">
            <ViewBids jobs={jobs} />
          </ProtectedRoute>
        } />
        <Route path="/my-jobs" element={
          <ProtectedRoute allowedRole="CLIENT">
            <MyJobs jobs={jobs} />
          </ProtectedRoute>
        } />
        <Route path="/my-projects" element={
          <ProtectedRoute allowedRole="CLIENT">
            <ClientMyProjects />
          </ProtectedRoute>
        } />
        <Route path="/project/:projectId" element={
          <ProtectedRoute allowedRole="CLIENT">
            <ProjectPage />
          </ProtectedRoute>
        } />
        <Route path="/clientChat/:projectId" element={
          <ProtectedRoute allowedRole="CLIENT">
            <ClientChat />
          </ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute allowedRole="CLIENT">
            <Payment />
          </ProtectedRoute>
        } />
        <Route path="/client-profile" element={
          <ProtectedRoute allowedRole="CLIENT">
            <ClientProfile />
          </ProtectedRoute>
        } />
        <Route path="/edit-client-profile" element={
          <ProtectedRoute allowedRole="CLIENT">
            <EditClientProfile />
          </ProtectedRoute>
        } />

        {/* ── FREELANCER ONLY ROUTES ───────────────────────────────── */}
        <Route path="/freelancer" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <FreelancerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/browseJobs" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <BrowseJobs />
          </ProtectedRoute>
        } />
        <Route path="/submitBid/:jobId" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <SubmitBid />
          </ProtectedRoute>
        } />
        <Route path="/freelancer/myBids" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <MyBids />
          </ProtectedRoute>
        } />
        <Route path="/myProjects" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <MyProjects />
          </ProtectedRoute>
        } />
        <Route path="/submitWork/:projectId" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <SubmitWork />
          </ProtectedRoute>
        } />
        <Route path="/chat/:projectId" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/reviews" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <Reviews />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/freelancer/edit-profile" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <EditFreelancerProfile />
          </ProtectedRoute>
        } />
        <Route path="/freelancer/project/:projectId" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <ProjectDetails />
          </ProtectedRoute>
        } />
        <Route path="/freelancer/editBid/:bidId" element={
          <ProtectedRoute allowedRole="FREELANCER">
            <EditBid />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
