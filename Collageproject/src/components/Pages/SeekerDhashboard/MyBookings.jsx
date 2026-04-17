import { useEffect, useState, useRef } from "react";
import {
  getMyBookings,
  createBookingOrder,
  getCallStatus,
   verifyBookingPayment
} from "../../../Apiroute";
import { connectIncomingCallSocket } from "../../../Service/callSocket";
function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔔 ringtone control
  const ringtoneRef = useRef(null);
  const ringtonePlayingRef = useRef(false);

  // ✅ Load bookings initially
  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const res = await getMyBookings();

        setBookings(res.data || []);

      } catch (error) {

        console.error("Failed loading bookings", error);

      } finally {

        setLoading(false);

      }

    };

    fetchBookings();

  }, []);


useEffect(() => {

  ringtoneRef.current = new Audio("/ringtone.mp3");

  const userId = localStorage.getItem("user_id");

  if (!userId) {
    console.log("❌ user_id missing. socket not started");
    return;
  }

  const socket = connectIncomingCallSocket(
    userId,
    (data) => {

      console.log("📩 Incoming socket:", data);

      if (data.type === "incoming_call") {

        // play ringtone once
        if (!ringtonePlayingRef.current) {

          ringtonePlayingRef.current = true;

          ringtoneRef.current.loop = true;

          ringtoneRef.current.play().catch(() => {});

        }

        // redirect AFTER 1 second (important)
        if (data.booking_id) {

          setTimeout(() => {

            window.location.href =
              `/seeker-call/${data.booking_id}`;

          }, 1000);

        }

      }

      if (data.type === "call_ended") {

        ringtoneRef.current.pause();

        ringtoneRef.current.currentTime = 0;

        ringtonePlayingRef.current = false;

      }

    }
  );

  return () => socket?.close();

}, []);

  // ✅ Continue payment (WITH verification)
const handleContinuePayment = async (bookingId) => {

  try {

    const orderRes = await createBookingOrder(bookingId);

    const order = orderRes.data;

    const razorpay = new window.Razorpay({

      key: order.razorpay_key, // backend returns this

      amount: order.amount,

      currency: order.currency || "INR",

      order_id: order.order_id,

      name: "Session Booking",

      description: "Guide Call Payment",

      handler: async (response) => {

        try {

          // ✅ VERIFY PAYMENT HERE
          await verifyBookingPayment({

            booking_id: bookingId,

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_signature:
              response.razorpay_signature

          });

          alert("Payment successful ✅");

          window.location.reload();

        } catch (err) {

          console.error(
            "Payment verification failed:",
            err
          );

          alert("Payment verification failed ❌");

        }

      },

      theme: {
        color: "#16a34a"
      }

    });

    razorpay.open();

  } catch (err) {

    console.error("Payment error:", err);

    alert("Unable to start payment");

  }

};


  // ✅ Join call (STOP ringtone here)
  const handleJoinCall = async (bookingId) => {

    try {

      const status = await getCallStatus(bookingId);

      if (status.data.call_status === "STARTED") {

        // 🔕 stop ringtone
        if (ringtoneRef.current) {

          ringtoneRef.current.pause();

          ringtoneRef.current.currentTime = 0;

          ringtonePlayingRef.current = false;

        }

       window.location.href = `/seeker-call/${bookingId}`;

      } else {

        alert("Guide hasn't started the call yet");

      }

    } catch (err) {

      console.error("Join call error:", err);

      alert("Unable to join call");

    }

  };


  if (loading)
    return <p>Loading bookings...</p>;


  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">

        My Bookings

      </h2>


      {bookings.map((booking) => (

        <div
          key={booking.id}
          className="bg-white shadow rounded p-4 mb-4"
        >

          <p>

            Booking ID: {booking.id}

          </p>


          <p>

            Slot: {booking.time_slot}

          </p>


          <p>

            Status: {booking.status}

          </p>


          <p>

            Payment: {booking.payment_status}

          </p>


          {booking.payment_status === "PENDING" && (

            <button
              onClick={() =>
                handleContinuePayment(
                  booking.id
                )
              }
              className="bg-orange-500 text-white px-4 py-2 mt-2"
            >

              Continue Payment

            </button>

          )}


          {booking.status === "CONFIRMED" && (

            <button
              onClick={() =>
                handleJoinCall(
                  booking.id
                )
              }
              className="bg-green-500 text-white px-4 py-2 mt-2"
            >

              Join Call

            </button>

          )}


         {booking.status === "COMPLETED" && (

  <button
    onClick={() =>
      navigate(`/refund-request`, {
        state: { booking_id: booking.id }
      })
    }
    className="bg-red-500 text-white px-4 py-2 mt-2"
  >

    Request Refund

  </button>

)}

        </div>

      ))}

    </div>

  );

}

export default MyBookings;