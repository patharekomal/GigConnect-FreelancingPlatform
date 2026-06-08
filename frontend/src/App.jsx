import { BrowserRouter, Routes, Route } from "react-router-dom";

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

import ClientDashboard from "./pages/Client/ClientDashboard"
import PostJob from "./pages/Client/PostJobs"
import ViewBids from "./pages/Client/ViewBids"
import MyJobs from "./pages/Client/MyJobs"
import ClientMyProjects from "./pages/Client/ClientMyProjects"
import ProjectPage from "./pages/Client/ProjectPage"
import Payment from "./pages/Client/Payment"
import { jobs } from "./data/dummyData"
// import ClientDashboard from "./pages/ClientDashboard";
// import FreelancerDashboard from "./pages/FreelancerDashboard";
{/* Freelancer  */}
   import FreelancerDashboard from './pages/Freelancer/FreelancerDashboard'
import BrowseJobs from "./pages/Freelancer/BrowseJobs";
import SubmitBid from "./pages/Freelancer/SubmitBid";
import MyBids from "./pages/Freelancer/MyBids";
import MyProjects from "./pages/Freelancer/MyProjects";
import Chat from "./pages/Freelancer/Chat";
import SubmitWork from "./pages/Freelancer/SubmitWork";
import Reviews from "./pages/Freelancer/Reviews";
import Profile from "./pages/Freelancer/Profile";


function App() {
  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password"  element={<ResetPassword />} />
        {/* <Route path="/client" element={<ClientDashboard />} />
        <Route path="/freelancer" element={<FreelancerDashboard />} /> */}

        <Route path="/client" element={<ClientDashboard />} />
         <Route path="/post-job" element={<PostJob />} />
         <Route path="/bids/:jobId" element={<ViewBids jobs={jobs} />} />
         <Route path="/my-jobs" element={<MyJobs jobs={jobs} />} />
         <Route path="/my-projects" element={<ClientMyProjects />} />
         <Route path="/project/:projectId" element={<ProjectPage />} />
         <Route path="/payment" element={<Payment />} />
         
         {/* Freelancer  */}
    <Route path='/freelancer' element={<FreelancerDashboard/>}/>
     <Route path='/browseJobs' element={<BrowseJobs/>} />
     <Route  path="/submitBid/:jobId" element={<SubmitBid/>} />
     <Route  path="/myBids" element={<MyBids/>} />
     <Route path='/myProjects' element={<MyProjects/>} />
     <Route path="/submitWork/:projectId" element={<SubmitWork />}/>
     <Route path="/chat/:projectId" element={<Chat />}/>
     <Route path="/reviews" element={<Reviews/>}/>
     <Route path="/profile" element={<Profile/>}/>

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;