import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  GraduationCap,
  Star,
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from "lucide-react";

import {
  getGuideProfileById,
  createBooking
} from "../../../Apiroute";

function BookingPage() {

  const navigate = useNavigate();
  const location = useLocation();

  const [guide, setGuide] = useState(null);
  const [timeSlot, setTimeSlot] = useState(null);
  const [loading, setLoading] = useState(true);


  // ✅ Load guide details using guide_id

  useEffect(() => {

    const fetchData = async () => {

      try {

        const { guide_id, time_slot } =
          location.state || {};

        if (!guide_id || !time_slot) {

          navigate("/guides");
          return;

        }

        const res =
          await getGuideProfileById(guide_id);

        setGuide(res.data);

        setTimeSlot(time_slot);

      } catch (error) {

        console.error("Failed to load booking data:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, [location, navigate]);


  // ✅ Create booking API call

  const handleConfirmBooking = async () => {

    try {

      const { guide_id, time_slot } =
        location.state;

      const res = await createBooking({

        guide_id: guide_id,
        time_slot: time_slot

      });

      console.log("Booking created:", res.data);

      navigate("/payment", {

        state: {

          booking_id: res.data.booking_id || res.data.id

        }

      });

    } catch (error) {

      console.error("Booking failed:", error);

      alert("Booking failed. Try again.");

    }

  };


  // ✅ Loading UI

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading booking details...

      </div>

    );

  }


  // ✅ Safety fallback

  if (!guide || !timeSlot) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Booking data missing

      </div>

    );

  }


  // ✅ Extract date & time

  const date =
    timeSlot.split(/[T ]/)[0];

  const time =
    (timeSlot.split(/[T ]/)[1] || "").slice(0, 5);


  return (

    <div className="min-h-screen bg-[#fffbed] p-6">


      {/* BACK BUTTON */}

      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2"
      >

        <ArrowLeft size={20} />

        Back

      </button>


      {/* PAGE TITLE */}

      <h1 className="text-2xl font-bold mb-6">

        Booking Summary

      </h1>


      {/* GUIDE DETAILS */}

      <div className="bg-white p-4 rounded shadow mb-6">

        <h2 className="font-semibold mb-2">

          Guide Details

        </h2>


        <div className="space-y-1">

          <p>

            <User size={14} className="inline mr-1" />

            {guide.unique_id || "Guide"}

          </p>


          <p>

            <GraduationCap size={14} className="inline mr-1" />

            {guide.branch || "Branch"}

          </p>


          <p>

            <Star size={14} className="inline mr-1" />

            {guide.rating ?? 0}

          </p>

        </div>

      </div>


      {/* SLOT DETAILS */}

      <div className="bg-white p-4 rounded shadow mb-6">

        <h2 className="font-semibold mb-2">

          Selected Slot

        </h2>


        <p>

          <Calendar size={14} className="inline mr-1" />

          {date}

        </p>


        <p>

          <Clock size={14} className="inline mr-1" />

          {time}

        </p>


        <p>

          Duration: 15 minutes

        </p>

      </div>


      {/* PAYMENT SUMMARY */}

      <div className="bg-white p-4 rounded shadow mb-6">

        <h2 className="font-semibold mb-2">

          Payment Summary

        </h2>


        <p>

          Session Fee: ₹{guide.session_price || 99}

        </p>


        <p className="font-bold text-lg mt-2">

          Total: ₹{guide.price || 99}

        </p>


        <div className="mt-3 text-sm flex items-start gap-2">

          <ShieldCheck size={14} />

          Secure payment processing enabled

        </div>

      </div>


      {/* POLICY NOTICE */}

      <div className="bg-orange-100 border border-orange-200 p-3 rounded mb-6 flex gap-2">

        <AlertCircle size={16} />

        <p className="text-sm">

          Free cancellation up to 2 hours before session.

        </p>

      </div>


      {/* CONFIRM BUTTON */}

      <button

        onClick={handleConfirmBooking}

        className="w-full bg-[#ff6b35] text-white py-3 rounded-lg font-semibold"

      >

        <CheckCircle size={18} className="inline mr-2" />

        Confirm & Proceed to Payment

      </button>

    </div>

  );

}

export default BookingPage;