import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  IndianRupee
} from "lucide-react";

import {
  getBookingDetails,
  createBookingOrder,
  verifyBookingPayment
} from "../../../Apiroute";

function Payment() {

  const navigate = useNavigate();
  const location = useLocation();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);


  // ✅ Load booking details

  useEffect(() => {

    const fetchBooking = async () => {

      try {

        const { booking_id } =
          location.state || {};

        if (!booking_id) {

          navigate("/guides");
          return;

        }

        const res =
          await getBookingDetails(booking_id);

        setBooking(res.data);

      } catch (error) {

        console.error("Booking load failed:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchBooking();

  }, [location, navigate]);


  // ✅ Handle Razorpay payment
  
 const handlePayment = async () => {

  try {

    const orderRes =
      await createBookingOrder(booking.id);

    const order = orderRes.data;

    const options = {

      key: order.razorpay_key,

      amount: order.amount,

      currency: "INR",

      name: "EduTech Booking",

      description: "Session Payment",

      order_id: order.order_id,

      handler: async (response) => {

        try {

          await verifyBookingPayment({

            booking_id: booking.id,

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_signature:
              response.razorpay_signature

          });

          alert("Payment successful ✅");

          navigate(`/confirmation/${booking.id}`);

        } catch (error) {

          console.error(
            "Payment verification failed:",
            error
          );

        }

      },

      theme: {
        color: "#ff6b35"
      }

    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();

  } catch (error) {

    console.error(
      "Payment creation failed:",
      error
    );

  }

};


  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading payment details...

      </div>

    );

  }


  if (!booking) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Booking not found

      </div>

    );

  }


  const date =
    booking.time_slot.split("T")[0];

  const time =
    booking.time_slot.split("T")[1].slice(0,5);


  return (

    <div className="min-h-screen bg-[#fffbed] p-6">

      {/* BACK BUTTON */}

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2"
      >

        <ArrowLeft size={20} />

        Back to Booking

      </button>


      {/* HEADER */}

      <h1 className="text-2xl font-bold mb-6">

        Secure Payment

      </h1>


      {/* BOOKING SUMMARY */}

      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="font-semibold mb-4">

          Booking Summary

        </h2>


        <div className="space-y-2">

          <p>

            Booking ID: {booking.id}

          </p>


          <p>

            Date: {date}

          </p>


          <p>

            Time: {time}

          </p>


          <p>

            Duration: 15 minutes

          </p>

        </div>

      </div>


      {/* PAYMENT SUMMARY */}

      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="font-semibold mb-4">

          Payment Summary

        </h2>


        <div className="flex justify-between">

          <span>

            Session Fee

          </span>


          <span>

            ₹{booking.amount || 99}

          </span>

        </div>


        <div className="flex justify-between font-bold mt-3 text-lg">

          <span>Total</span>


          <span className="text-[#ff6b35]">

            ₹{booking.amount || 99}

          </span>

        </div>


        <div className="mt-4 flex items-center gap-2 text-sm">

          <ShieldCheck size={14} />

          Secure payment protected

        </div>

      </div>


      {/* PAY BUTTON */}

      <button

        onClick={handlePayment}

        className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"

      >

        <Lock size={18} />

        Pay ₹{booking.amount || 99}

      </button>

    </div>

  );

}

export default Payment;