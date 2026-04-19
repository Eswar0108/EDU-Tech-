 

import axiosInstance from "./baseapi";
// ================= ADMIN AUTH =================

// ADMIN LOGIN
export const adminLogin = (data) =>
  axiosInstance.post("/admin/login", data);

// REGISTER ADMIN (SUPERADMIN ONLY)
export const registerAdmin = (data) =>
  axiosInstance.post("/admin/register", data);



// ================= GUIDE MANAGEMENT =================

// GET PENDING GUIDES
export const getPendingGuides = () =>
  axiosInstance.get("/admin/guides/pending");

// APPROVE GUIDE DOCUMENTS
export const approveGuideDocs = (guideId) =>
  axiosInstance.put(`/admin/guides/approve/${guideId}`);

// REJECT GUIDE
export const rejectGuide = (guideId) =>
  axiosInstance.put(`/admin/guides/reject/${guideId}`);

// SUSPEND GUIDE
export const suspendGuide = (guideId) =>
  axiosInstance.put(`/admin/guides/suspend/${guideId}`);

// PASS TEST (ACTIVATE GUIDE)
export const passGuideTest = (guideId) =>
  axiosInstance.put(`/admin/guides/pass-test/${guideId}`);

// RESET GUIDE TEST ATTEMPTS
export const resetGuideAttempts = (guideId) =>
  axiosInstance.put(`/admin/guides/reset-attempts/${guideId}`);

// FORCE ACTIVATE GUIDE
export const forceActivateGuide = (guideId) =>
  axiosInstance.put(`/admin/guides/force-activate/${guideId}`);



// ================= BOOKINGS & CALLS =================

// VIEW ALL BOOKINGS
export const getAllBookings = () =>
  axiosInstance.get("/admin/bookings");

// VIEW ALL CALLS
export const getAllCalls = () =>
  axiosInstance.get("/admin/calls");



// ================= REFUND MANAGEMENT =================

// GET REFUND REQUESTS
export const getRefundRequests = () =>
  axiosInstance.get("/admin/refund/requests");

// PROCESS REFUND
export const processRefund = (bookingId) =>
  axiosInstance.put(`/admin/refund/${bookingId}`);



// ================= WITHDRAW MANAGEMENT =================

// GET WITHDRAW REQUESTS
export const getWithdrawRequests = () =>
  axiosInstance.get("/admin/withdraw/requests");

// APPROVE WITHDRAW
export const approveWithdraw = (requestId) =>
  axiosInstance.put(`/admin/withdraw/approve/${requestId}`);

// REJECT WITHDRAW
export const rejectWithdraw = (requestId) =>
  axiosInstance.put(`/admin/withdraw/reject/${requestId}`);



// ================= USER CONTROL =================

// SUSPEND USER
export const suspendUser = (userId) =>
  axiosInstance.put(`/admin/users/suspend/${userId}`);

// ACTIVATE USER
export const activateUser = (userId) =>
  axiosInstance.put(`/admin/users/activate/${userId}`);



// ================= ANALYTICS =================

// ADMIN ANALYTICS
export const getAdminAnalytics = () =>
  axiosInstance.get("/admin/analytics");



// ================= DASHBOARD SUMMARY =================

// ADMIN DASHBOARD SUMMARY
export const getAdminDashboard = () =>
  axiosInstance.get("/admin/dashboard");



// ================= FINANCE SUMMARY =================

// FINANCE REVENUE SUMMARY
export const getRevenueSummary = () =>
  axiosInstance.get("/admin/finance/revenue-summary");





// ================= REGISTER =================

// REGISTER USER (SEND OTP)
export const registerUser = (data) =>
  axiosInstance.post("/auth/register", data);


// ================= LOGIN =================

// LOGIN (SEND OTP)
export const loginUser = (data) =>
  axiosInstance.post("/auth/login", data);


// ================= VERIFY OTP =================

// VERIFY OTP & GET TOKEN
export const verifyOtp = (data) =>
  axiosInstance.post("/auth/verify-otp", data);


// ================= RESEND OTP =================

// RESEND OTP
export const resendOtp = (email) =>
  axiosInstance.post("/auth/resend-otp", email);


// ================= GET PROFILE =================

// GET CURRENT USER PROFILE
export const getMyProfile = () =>
  axiosInstance.get("/auth/me");


 


// ================= GUIDE SLOT MANAGEMENT =================

// CREATE SLOT (GUIDE)
export const createSlot = (data) =>
  axiosInstance.post("/availability/create", data);

// GET AVAILABLE SLOTS BY GUIDE ID (SEEKER VIEW)
export const getGuideSlots = (guideId) =>
  axiosInstance.get(`/availability/guide/${guideId}`);

// GET MY SLOTS (GUIDE OWN SLOTS)
export const getMySlots = () =>
  axiosInstance.get("/availability/my-slots");

// DELETE SLOT (GUIDE)
export const deleteSlot = (slotId) =>
  axiosInstance.delete(`/availability/delete/${slotId}`);


// ================= SEEKER SLOT BOOKING =================

// BOOK SLOT (SEEKER)
export const bookSlot = (slotId) =>
  axiosInstance.put(`/availability/book/${slotId}`);

// CANCEL SLOT BOOKING (SEEKER)
export const cancelSlotBooking = (slotId) =>
  axiosInstance.put(`/availability/cancel/${slotId}`);


// ================= SEEKER UPCOMING BOOKINGS =================

// GET SEEKER UPCOMING CONFIRMED BOOKINGS
export const getSeekerUpcomingBookings = () =>
  axiosInstance.get("/availability/seeker/upcoming");





 


// ================= CREATE BOOKING =================

// CREATE BOOKING
export const createBooking = (data) =>
  axiosInstance.post("/booking/create", data);


// ================= SEEKER BOOKINGS =================

// GET MY BOOKINGS (SEEKER)
export const getMyBookings = () =>
  axiosInstance.get("/booking/my-bookings");


// ================= GUIDE BOOKINGS =================

// GUIDE UPCOMING BOOKINGS
export const getGuideUpcomingBookings = () =>
  axiosInstance.get("/booking/guide-bookings");

// GUIDE COMPLETED HISTORY
export const getGuideHistory = () =>
  axiosInstance.get("/booking/guide-history");

// GUIDE UPCOMING CALLS
export const getGuideUpcomingCalls = () =>
  axiosInstance.get("/booking/guide/upcoming");


// ================= PAYMENT =================

// CREATE RAZORPAY ORDER
export const createBookingOrder = (bookingId) =>
  axiosInstance.post(`/booking/payment/create/${bookingId}`);

// VERIFY PAYMENT
export const verifyBookingPayment = (data) =>
  axiosInstance.post("/booking/payment/verify", data);


// ================= CANCEL BOOKING =================

// CANCEL BOOKING
export const cancelBooking = (bookingId) =>
  axiosInstance.put(`/booking/cancel/${bookingId}`);


// ================= BOOKING DETAILS =================

// GET BOOKING DETAILS
export const getGuideBookings = () =>
  axiosInstance.get("/booking/guide-bookings");


// ================= BOOKING STATUS =================

// GET BOOKING STATUS
export const getBookingStatus = (bookingId) =>
  axiosInstance.get(`/booking/status/${bookingId}`);


// ================= REFUND REQUEST (SEEKER) =================

// CREATE REFUND REQUEST
export const createRefundRequest = (bookingId, reason) =>
  axiosInstance.post(`/booking/refund/request/${bookingId}`, {
    reason,
  });

// GET REFUND STATUS
export const getRefundStatus = (bookingId) =>
  axiosInstance.get(`/booking/refund/status/${bookingId}`);




export const connectCallSocket = (userId, onMessage) => {
  const wsProto = window.location.protocol === "https:" ? "wss" : "ws";
  const socket = new WebSocket(
    `${wsProto}://${window.location.host}/call/ws/call/${userId}`
  );

  socket.onopen = () => {
    console.log("Call socket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("Call socket disconnected");
  };

  return socket;
};



 


// ================= CREATE CALL SESSION =================

// CREATE SESSION BEFORE STARTING CALL
export const createCallSession = (bookingId) =>
  axiosInstance.post(`/call/session/create/${bookingId}`);


// ================= GET AGORA TOKEN =================

// GET AGORA TOKEN FOR VIDEO CALL
export const getAgoraToken = (bookingId) =>
  axiosInstance.get(`/call/token/${bookingId}`);


// ================= START CALL =================

// START CALL
export const startCall = (bookingId) =>
  axiosInstance.post(`/call/start/${bookingId}`);


// ================= END CALL =================

// END CALL
export const endCall = (bookingId) =>
  axiosInstance.post(`/call/end/${bookingId}`);


// ================= CANCEL CALL =================

// CANCEL CALL BEFORE START
export const cancelCall = (bookingId) =>
  axiosInstance.post(`/call/cancel/${bookingId}`);


// ================= CALL STATUS =================

// GET CALL STATUS
export const getCallStatus = (bookingId) =>
  axiosInstance.get(`/call/status/${bookingId}`);



 


// ================= SUBMIT FEEDBACK =================

// GUIDE SUBMIT COLLEGE FEEDBACK AFTER COMPLETED CALL
export const submitCollegeFeedback = (bookingId, data) =>
  axiosInstance.post(`/college-feedback/submit/${bookingId}`, data);



// ================= FEEDBACK STATUS =================

// CHECK IF FEEDBACK ALREADY SUBMITTED
export const getFeedbackStatus = (bookingId) =>
  axiosInstance.get(`/college-feedback/status/${bookingId}`);



// ================= REPORT READY CHECK =================

// CHECK IF SUMMARY REPORT AVAILABLE
export const checkReportAvailable = (bookingId) =>
  axiosInstance.get(`/college-feedback/report/${bookingId}`);



// ================= ADMIN FEEDBACK LIST =================

// GET ALL FEEDBACK (ADMIN)
export const getAllCollegeFeedback = () =>
  axiosInstance.get("/college-feedback/admin/all");


 


// ================= COUNTRY APIs =================

// ADD COUNTRY (ADMIN)
export const addCountry = (data) =>
  axiosInstance.post("/master/country/add", data);

// DELETE COUNTRY (ADMIN)
export const deleteCountry = (countryId) =>
  axiosInstance.delete(`/master/country/delete/${countryId}`);


// ================= STATE APIs =================

// GET STATES BY COUNTRY
export const getStatesByCountry = (countryId) =>
  axiosInstance.get(`/master/state/${countryId}`);

// UPDATE STATE (ADMIN)
export const updateState = (stateId, data) =>
  axiosInstance.put(`/master/state/update/${stateId}`, data);


// ================= COLLEGE APIs =================

// GET COLLEGES BY STATE
export const getCollegesByState = (stateId) =>
  axiosInstance.get(`/master/college/${stateId}`);

// UPDATE COLLEGE (ADMIN)
export const updateCollege = (collegeId, data) =>
  axiosInstance.put(`/master/college/update/${collegeId}`, data);


// ================= BRANCH APIs =================

// UPDATE BRANCH (ADMIN)
export const updateBranch = (branchId, data) =>
  axiosInstance.put(`/master/branch/update/${branchId}`, data);



export const connectNotificationSocket = (onMessage) => {
  const wsProto = window.location.protocol === "https:" ? "wss" : "ws";
  const socket = new WebSocket(`${wsProto}://${window.location.host}/notifications/ws/notifications`);

  socket.onopen = () => {
    console.log("Notification socket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("Notification socket disconnected");
  };

  return socket;
};



 


// ================= USER NOTIFICATIONS =================

// GET MY NOTIFICATIONS
export const getMyNotifications = () =>
  axiosInstance.get("/notifications/my");


// GET SINGLE NOTIFICATION
export const getNotificationById = (id) =>
  axiosInstance.get(`/notifications/${id}`);


// GET UNREAD COUNT
export const getUnreadCount = () =>
  axiosInstance.get("/notifications/unread-count");


// MARK SINGLE NOTIFICATION AS READ
export const markNotificationRead = (id) =>
  axiosInstance.put(`/notifications/read/${id}`);


// MARK ALL NOTIFICATIONS AS READ
export const markAllNotificationsRead = () =>
  axiosInstance.put("/notifications/read-all");
// ================= PUBLIC NOTIFICATIONS =================

// GET PUBLIC NOTIFICATIONS (LOGIN PAGE)
export const getPublicNotifications = () =>
  axiosInstance.get("/notifications/public");

// DELETE NOTIFICATION
export const deleteNotification = (id) =>
  axiosInstance.delete(`/notifications/delete/${id}`);


// ================= ADMIN NOTIFICATIONS =================

// GET ALL NOTIFICATIONS (ADMIN ONLY)
export const getAllNotifications = (limit = 50, offset = 0) =>
  axiosInstance.get(
    `/notifications/all?limit=${limit}&offset=${offset}`
  );


// BROADCAST NOTIFICATION (ADMIN ONLY)
export const broadcastNotification = (data) =>
  axiosInstance.post("/notifications/broadcast", data);


 


// ================= SUBMIT RATING =================

// SUBMIT RATING AFTER CALL COMPLETION
export const submitRating = (bookingId, data) =>
  axiosInstance.post(`/rating/submit/${bookingId}`, data);



// ================= GUIDE RATING SUMMARY =================

// GET GUIDE AVERAGE RATING
export const getGuideRating = (guideId) =>
  axiosInstance.get(`/rating/guide/${guideId}`);



// ================= GUIDE RATING HISTORY =================

// GET ALL RATINGS OF A GUIDE
export const getGuideRatingHistory = (guideId) =>
  axiosInstance.get(`/rating/history/${guideId}`);



// ================= SEEKER MY RATINGS =================

// GET RATINGS GIVEN BY CURRENT SEEKER
export const getMyRatings = () =>
  axiosInstance.get("/rating/my-ratings");



// ================= BOOKING RATING =================

// GET RATING FOR SPECIFIC BOOKING
export const getBookingRating = (bookingId) =>
  axiosInstance.get(`/rating/booking/${bookingId}`);



// ================= DELETE RATING (ADMIN ONLY) =================

// DELETE A RATING
export const deleteRating = (ratingId) =>
  axiosInstance.delete(`/rating/delete/${ratingId}`);



// ================= ADMIN ALL RATINGS =================

// GET ALL RATINGS (ADMIN / SUPPORT ADMIN)
export const getAllRatings = () =>
  axiosInstance.get("/rating/admin/all");


 


// ================= GENERATE REPORT =================

// GENERATE PDF REPORT SUMMARY DATA
export const generateReport = (bookingId) =>
  axiosInstance.get(`/report/generate/${bookingId}`);


// ================= DOWNLOAD REPORT =================

// DOWNLOAD REPORT PDF
export const downloadReport = (bookingId) =>
  axiosInstance.get(`/report/download/${bookingId}`, {
    responseType: "blob",
  });


// ================= REPORT STATUS =================

// CHECK IF REPORT GENERATED
export const getReportStatus = (bookingId) =>
  axiosInstance.get(`/report/status/${bookingId}`);


// ================= SEEKER REPORT HISTORY =================

// SEEKER COMPLETED SESSION REPORT LIST
export const getMyReports = () =>
  axiosInstance.get("/report/my-reports");


// ================= GUIDE REPORT HISTORY =================

// GUIDE COMPLETED SESSION REPORT LIST
export const getGuideReports = () =>
  axiosInstance.get("/report/guide-reports");


// ================= RESEND REPORT EMAIL =================

// RESEND REPORT EMAIL TO SEEKER
export const resendReportEmail = (bookingId) =>
  axiosInstance.post(`/report/resend-email/${bookingId}`);


 


// ================= GET SEEKER PROFILE =================

// GET PROFILE
export const getSeekerProfile = () =>
  axiosInstance.get("/seeker/profile");


// ================= CREATE SEEKER PROFILE =================

// CREATE COLLEGE FORM (multipart/form-data)
export const createSeekerProfile = (formData) =>
  axiosInstance.post("/seeker/collegeform", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


// ================= UPDATE SEEKER PROFILE =================

// UPDATE COLLEGE FORM
export const updateSeekerProfile = (formData) =>
  axiosInstance.put("/seeker/collegeform", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


// ================= SEARCH GUIDES =================

// SEARCH GUIDES BY COLLEGE + BRANCH
export const searchGuides = (college = "", branch = "") =>
  axiosInstance.get(
    `/seeker/guides/search?college=${college}&branch=${branch}`
  );



   


// ================= APPLY AS SENIOR GUIDE =================

// APPLY GUIDE (multipart/form-data)
export const applySeniorGuide = (formData) =>
  axiosInstance.post("/guides/apply", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


// ================= TEST APIs =================

// GET TEST QUESTIONS
export const getGuideTestQuestions = () =>
  axiosInstance.get("/guides/test/questions");

// SUBMIT TEST
export const submitGuideTest = (data) =>
  axiosInstance.post("/guides/test/submit", data);


// ================= GUIDE PROFILE =================

// GET GUIDE PROFILE
export const getGuideProfile = () =>
  axiosInstance.get("/guides/profile");

// UPDATE GUIDE PROFILE
export const updateGuideProfile = (formData) =>
  axiosInstance.put("/guides/profile/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


// ================= GUIDE DASHBOARD =================

// DASHBOARD SUMMARY
export const getGuideDashboard = () =>
  axiosInstance.get("/guides/dashboard");

// EARNINGS SUMMARY
export const getGuideEarnings = () =>
  axiosInstance.get("/guides/earnings");

// GUIDE STATS
export const getGuideStats = () =>
  axiosInstance.get("/guides/stats");


// ================= REFERRAL APIs =================

// REFERRAL STATS
export const getGuideReferralStats = () =>
  axiosInstance.get("/guides/referrals");

// REFERRAL LIST
export const getGuideReferralList = () =>
  axiosInstance.get("/guides/referrals/list");


// ================= STATUS =================

// CHECK APPLICATION STATUS
export const getGuideApplicationStatus = () =>
  axiosInstance.get("/guides/my-status");


// ================= PUBLIC GUIDE PROFILE =================

// GET GUIDE PROFILE BY ID
export const getGuideProfileById = (guideId) =>
  axiosInstance.get(`/guides/${guideId}`);


// ================= BOOKED SLOTS =================

// GET BOOKED SLOTS BY DATE
export const getBookedSlots = (date) =>
  axiosInstance.get(`/guides/slots/booked?date=${date}`);

 


// ================= WALLET BALANCE =================

// GET WALLET BALANCE
export const getWalletBalance = () =>
  axiosInstance.get("/wallet/balance");


// ================= TRANSACTION HISTORY =================

// GET TRANSACTION HISTORY
export const getWalletTransactions = () =>
  axiosInstance.get("/wallet/transactions");


// ================= WITHDRAW REQUEST =================

// CREATE WITHDRAW REQUEST
export const createWithdrawRequest = (amount) =>
  axiosInstance.post("/wallet/withdraw/request", amount);


// ================= ADMIN WITHDRAW MANAGEMENT =================

// GET ALL WITHDRAW REQUESTS (ADMIN)
export const getAllWithdrawRequests = () =>
  axiosInstance.get("/wallet/admin/all-requests");

// APPROVE WITHDRAW REQUEST (ADMIN)
export const approveWithdrawRequest = (id) =>
  axiosInstance.post(`/wallet/admin/approve/${id}`);

// REJECT WITHDRAW REQUEST (ADMIN)
export const rejectWithdrawRequest = (id) =>
  axiosInstance.post(`/wallet/admin/reject/${id}`);


// ================= ADD MONEY TO WALLET =================

// CREATE RAZORPAY ORDER
export const createWalletOrder = (data) =>
  axiosInstance.post("/wallet/add-money/order", data);

// VERIFY PAYMENT
export const verifyWalletPayment = (data) =>
  axiosInstance.post("/wallet/add-money/verify", data);


// ================= REFERRAL SYSTEM =================

// GET MY REFERRAL CODE
export const getReferralCode = () =>
  axiosInstance.get("/wallet/my-code");

// APPLY REFERRAL CODE
export const applyReferralCode = (code) =>
  axiosInstance.post(`/wallet/apply/${code}`);

// REFERRAL STATS
export const getReferralStats = () =>
  axiosInstance.get("/wallet/stats");

export const getBookingDetails = (bookingId) =>
  axiosInstance.get(`/booking/${bookingId}`);