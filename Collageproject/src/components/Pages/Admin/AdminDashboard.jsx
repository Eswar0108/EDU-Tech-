import { useEffect, useState } from "react";

import {
  getPendingGuides,
  approveGuideDocs,
  rejectGuide,
  getAllBookings,
  getAllCalls,
  getWithdrawRequests,
  approveWithdraw,
  rejectWithdraw,
  getRefundRequests,
  processRefund,
  getAllRatings,
  getAllCollegeFeedback,
  getAllNotifications,
  broadcastNotification,
  getAdminDashboard,
  getAdminAnalytics,
  getRevenueSummary
} from "../../../Apiroute";


function AdminDashboard() {

  const [tab, setTab] = useState("dashboard");

  const [dashboard, setDashboard] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [revenue, setRevenue] = useState({});

  const [guides, setGuides] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [calls, setCalls] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [message, setMessage] = useState("");



  // ================= LOAD DATA =================

  const loadData = async () => {

    if (tab === "dashboard") {

      const d = await getAdminDashboard();
      const a = await getAdminAnalytics();
      const r = await getRevenueSummary();

      setDashboard(d.data);
      setAnalytics(a.data);
      setRevenue(r.data);
    }

    if (tab === "guides")
      setGuides((await getPendingGuides()).data);

    if (tab === "bookings")
      setBookings((await getAllBookings()).data);

    if (tab === "calls")
      setCalls((await getAllCalls()).data);

    if (tab === "withdraws")
      setWithdraws((await getWithdrawRequests()).data);

    if (tab === "refunds")
      setRefunds((await getRefundRequests()).data);

    if (tab === "ratings")
      setRatings((await getAllRatings()).data);

    if (tab === "feedback")
      setFeedbacks((await getAllCollegeFeedback()).data);

    if (tab === "notifications")
      setNotifications((await getAllNotifications()).data);

  };


  useEffect(() => {

    loadData();

  }, [tab]);


  // ================= ACTIONS =================

  const sendNotification = async () => {

    if (!message) return alert("Enter message");

    await broadcastNotification({ message });

    alert("Notification sent ✅");

    setMessage("");

  };


  // ================= UI COMPONENTS =================

  const Card = ({ title, value }) => (

    <div className="bg-white shadow rounded-xl p-6">

      <p className="text-gray-500">{title}</p>

      <h2 className="text-2xl font-bold">{value}</h2>

    </div>

  );


  const TableWrapper = ({ children }) => (

    <div className="bg-white shadow rounded-xl p-6 overflow-auto">
      {children}
    </div>

  );


  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <aside className="w-64 bg-slate-900 text-white p-6">

        <h2 className="text-2xl font-bold text-orange-400 mb-6">
          Admin Panel
        </h2>

        {[
          "dashboard",
          "guides",
          "bookings",
          "calls",
          "withdraws",
          "refunds",
          "ratings",
          "feedback",
          "notifications"
        ].map(item => (

          <button
            key={item}
            onClick={() => setTab(item)}
            className={`block mb-3 capitalize ${
              tab === item ? "text-orange-400" : ""
            }`}
          >
            {item}
          </button>

        ))}

      </aside>



      {/* MAIN CONTENT */}

      <main className="flex-1 p-8 space-y-6">


        {/* DASHBOARD */}

        {tab === "dashboard" && (

          <div className="grid grid-cols-4 gap-6">

            <Card title="Users" value={analytics.total_users} />
            <Card title="Guides" value={analytics.total_guides} />
            <Card title="Bookings" value={dashboard.bookings} />
            <Card title="Revenue ₹" value={revenue.platform_revenue} />

          </div>

        )}



        {/* GUIDE APPROVALS */}

        {tab === "guides" && (

          <TableWrapper>

            <h2 className="font-bold mb-4">Pending Guide Applications</h2>

            <table className="w-full">

              <thead>

                <tr className="text-left border-b">

                  <th>ID</th>
                  <th>College</th>
                  <th>Branch</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {guides.map(g => (

                  <tr key={g.id} className="border-b">

                    <td>{g.id}</td>
                    <td>{g.college_name}</td>
                    <td>{g.branch}</td>

                    <td>

                      <button
                        onClick={() => approveGuideDocs(g.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectGuide(g.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </TableWrapper>

        )}



        {/* BOOKINGS */}

        {tab === "bookings" && (

          <TableWrapper>

            <h2 className="font-bold mb-4">All Bookings</h2>

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th>ID</th>
                  <th>Guide</th>
                  <th>Seeker</th>
                  <th>Status</th>
                  <th>Payment</th>

                </tr>

              </thead>

              <tbody>

                {bookings.map(b => (

                  <tr key={b.id} className="border-b">

                    <td>{b.id}</td>
                    <td>{b.guide_id}</td>
                    <td>{b.seeker_id}</td>
                    <td>{b.status}</td>
                    <td>{b.payment_status}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </TableWrapper>

        )}



        {/* CALL SESSIONS */}

        {tab === "calls" && (

          <TableWrapper>

            <h2 className="font-bold mb-4">Call Sessions</h2>

            <pre>{JSON.stringify(calls, null, 2)}</pre>

          </TableWrapper>

        )}



        {/* WITHDRAW REQUESTS */}

        {tab === "withdraws" && (

          <TableWrapper>

            <h2 className="font-bold mb-4">Withdraw Requests</h2>

            {withdraws.map(w => (

              <div key={w.id} className="mb-2">

                ₹{w.amount}

                <button
                  onClick={() => approveWithdraw(w.id)}
                  className="ml-3 bg-green-500 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectWithdraw(w.id)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>

              </div>

            ))}

          </TableWrapper>

        )}



        {/* REFUNDS */}

        {tab === "refunds" && (

          <TableWrapper>

            <h2 className="font-bold mb-4">Refund Requests</h2>

            {refunds.map(r => (

              <div key={r.id}>

                Booking #{r.booking_id}

                <button
                  onClick={() => processRefund(r.booking_id)}
                  className="ml-3 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Process Refund
                </button>

              </div>

            ))}

          </TableWrapper>

        )}



        {/* RATINGS */}

        {tab === "ratings" && (

          <TableWrapper>

            <pre>{JSON.stringify(ratings, null, 2)}</pre>

          </TableWrapper>

        )}



        {/* COLLEGE FEEDBACK */}

        {tab === "feedback" && (

          <TableWrapper>

            <pre>{JSON.stringify(feedbacks, null, 2)}</pre>

          </TableWrapper>

        )}



        {/* NOTIFICATIONS */}

        {tab === "notifications" && (

          <TableWrapper>

            <h2 className="font-bold mb-4">Broadcast Notification</h2>

            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter message"
              className="border p-2 mr-3"
            />

            <button
              onClick={sendNotification}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              Send
            </button>

          </TableWrapper>

        )}

      </main>

    </div>

  );

}

export default AdminDashboard;