import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { getGuideBookings } from "../../../Apiroute";

function SeniorGuideDashboard() {

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // 🚨 not logged in
    if (!token) {

      navigate("/login");
      return;

    }

    // 🚨 wrong role
    if (role !== "senior_guide") {

      navigate("/");
      return;

    }

    // ✅ load guide upcoming call requests
    const fetchDashboard = async () => {

      try {

        const res = await getGuideBookings();

        setBookings(res.data);

        setData({
          name: "Senior Guide",
          status: "Passed"
        });

      } catch (error) {

        console.error("Failed to load guide bookings:", error);

      }

    };

    fetchDashboard();

  }, [navigate]);


  // ⏳ loading state

  if (!data) {

    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading dashboard...
      </div>
    );

  }


  // ❌ block if guide not approved

  if (data.status !== "Passed") {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">

          <XCircle size={40} />

          <h2 className="mt-4 text-xl font-semibold">
            Application Status: {data.status}
          </h2>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-[#ff6b35] text-white px-4 py-2 rounded"
          >
            Go Back
          </button>

        </div>

      </div>

    );

  }


  // ✅ dashboard menu

  const menu = [

    { title: "Application Status", path: "/guide-status" },

    { title: "Availability Slots", path: "/slots" },

    { title: "Upcoming Calls", path: "/upcoming-calls" },

    { title: "Call History", path: "/call-history" },

    { title: "College Feedback", path: "/feedback" },

    { title: "Wallet", path: "/wallet" },

    { title: "Withdraw Request", path: "/withdraw" },

    { title: "Referral", path: "/referral" }

  ];


  return (

    <div className="min-h-screen bg-[#fffbed] p-6">

      {/* HEADER */}

      <h1 className="text-2xl font-bold mb-6">
        Welcome back, {data.name}
      </h1>


      {/* MENU GRID */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {menu.map((item, index) => (

          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="bg-white shadow hover:shadow-lg p-4 rounded-lg transition"
          >

            {item.title}

          </button>

        ))}

      </div>


      {/* 📞 INCOMING CALL REQUESTS */}

      {bookings.length > 0 && (

        <div className="mt-10">

          <h2 className="text-xl font-semibold mb-4">
            Incoming Call Requests
          </h2>

          {bookings.map((booking) => {

            const date =
              booking.time_slot.split(/[T ]/)[0];

            const time =
              (booking.time_slot.split(/[T ]/)[1] || "").slice(0, 5);

            return (

              <div
                key={booking.id}
                className="bg-white shadow p-4 rounded mb-3 flex justify-between items-center"
              >

                <div>

                  <p className="font-semibold">
                    Booking ID: {booking.id}
                  </p>

                  <p>
                    Date: {date}
                  </p>

                  <p>
                    Time: {time}
                  </p>

                </div>

                <button
                  onClick={() => navigate(`/call/${booking.id}`)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Join Call
                </button>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

}

export default SeniorGuideDashboard;