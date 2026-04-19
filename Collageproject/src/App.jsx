import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./Footer";

import Home from "./components/Home/Home";
import RegistrationForm from "./components/Pages/Register";
import EmailOTP from "./components/Pages/EmailOtp";
import LoginForm from "./components/Pages/Login";
import AdminLogin from "./components/Pages/Admin/Admin";

import SeekerDashboard from "./components/Pages/SeekerDhashboard/SeekerDhashboard";
import GuideList from "./components/Pages/SeekerDhashboard/GuideList";
import BookingPage from "./components/Pages/SeekerDhashboard/Booking";
import Payment from "./components/Pages/SeekerDhashboard/Payment";
import DownloadReport from "./components/Pages/SeekerDhashboard/Report";
import GuideCallPage from "./components/Pages/seniorguide/guidecallpage";
import SubmitRating from "./components/Pages/SeekerDhashboard/Rating";
import SlotSelection from "./components/Pages/SeekerDhashboard/SeekerSlot";
import ProtectedGuide from "./components/Pages/seniorguide/ProtectedGuide";
import SeniorGuideForm from "./components/Pages/seniorguide/Senoirform";
import GuideTest from "./components/Pages/seniorguide/Test";
import PendingApproval from "./components/Pages/seniorguide/Aprovel";
import TimeSlots from "./components/Pages/seniorguide/SlotList";
import SeniorGuideDashboard from "./components/Pages/seniorguide/SeniorDashboard";
import GuideStatus from "./components/Pages/seniorguide/ApplicationStatus";
import Slots from "./components/Pages/seniorguide/SeniorSlot";
import WalletPage from "./components/Pages/seniorguide/SeniorWallet";
import Withdraw from "./components/Pages/seniorguide/Withdrawelrequest";
import Referral from "./components/Pages/seniorguide/Referal";
import Feedback from "./components/Pages/seniorguide/Collagefeedback";
import CallHistory from "./components/Pages/seniorguide/CallHistory";
import UpcomingCalls from "./components/Pages/seniorguide/Upcomingcalls";
import TestPendingApproval from "./components/Pages/seniorguide/Testpending";
import TestResult from "./components/Pages/seniorguide/Testresult";
import Confirmation from "./components/Pages/SeekerDhashboard/Confirmation";
import RefundRequest from "./components/Pages/SeekerDhashboard/refundrequest";
import ViewGuide from "./components/Home/ViewGuides";
import AboutUs from "./components/Home/About";
import FAQ from "./components/Home/FAQ";
import ContactUs from "./components/Home/Contactus";
import PrivacyPolicy from "./components/Home/pravicy";
import Rules from "./components/Home/Term";
import RefundPolicy from "./components/Home/Help";
import MyProfile from "./components/Home/Myprofie";

import SeniorGuideProfile from "./components/Pages/seniorguide/Seniorprofile";
import SeekerCallPage from "./components/Pages/SeekerDhashboard/seekercallpage";

import AdminDashboard from "./components/Pages/Admin/AdminDashboard";
import ProtectedAdmin from "./components/Pages/Admin/ProtectAdmin";
import MyBookings from "./components/Pages/SeekerDhashboard/MyBookings";


function App() {


  
  

  return (
    <>
    
      <Navbar />
      <hr className="text-white" />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/emailotp" element={<EmailOTP />} />
        <Route path="/login" element={<LoginForm />} />

        {/* SEEKER */}
        <Route path="/seeker" element={<SeekerDashboard />} />
        <Route path="/guides" element={<GuideList />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation/:bookingId" element={<Confirmation />} />
        <Route path="/download-report/:bookingId" element={<DownloadReport />} />
      
<Route path="/rating/:bookingId" element={<SubmitRating />} />
        <Route path="/SlotSelection/:guide_id" element={<SlotSelection />} />
       <Route path="/guide-profile/:guide_id" element={<SeniorGuideProfile />} />
       <Route
  path="/refund-request" element={<RefundRequest />}
/>
        <Route path="/my-bookings" element={ <MyBookings />}/>

        {/* SENIOR GUIDE */}
        <Route path="/guide" element={<SeniorGuideForm />} />
        <Route
  path="/guide-dashboard"
  element={
    <ProtectedGuide>
      <SeniorGuideDashboard />
    </ProtectedGuide>
  }
/>
        <Route path="/guide-test" element={<GuideTest />} />
        <Route path="/pending-approval" element={<PendingApproval />} />
        <Route path="/test-pending" element={<TestPendingApproval />} />
        <Route path="/time-slots" element={<TimeSlots />} />
        <Route path="/guide-status" element={<GuideStatus />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/feedback/:bookingId" element={<Feedback />} />
        <Route path="/call-history" element={<CallHistory />} />
        <Route path="/upcoming-calls" element={<UpcomingCalls />} />
          <Route path="/guide-call/:booking_id" element={<GuideCallPage />}/>

  {/* SEEKER CALL PAGE */}
        <Route path="/call/:booking_id" element={<SeekerCallPage />} />
        <Route path="/test-result" element={<TestResult />} />
        
        {/* ADMIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdmin>
              <AdminDashboard />
            </ProtectedAdmin>
          }
        />

        {/* STATIC */}
        <Route path="/view-guide" element={<ViewGuide />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Rules />} />
        <Route path="/help" element={<RefundPolicy />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;