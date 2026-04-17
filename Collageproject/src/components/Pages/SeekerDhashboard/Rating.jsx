import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  submitRating,
  getBookingDetails
} from "../../../Apiroute";

function SubmitRating() {

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // ⚠️ store as string (matches DB)
  const [honesty, setHonesty] = useState("Yes");
  const [recommend, setRecommend] = useState("Yes");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  // ================= LOAD BOOKING =================
  useEffect(() => {

    if (!bookingId) {
      navigate("/dashboard");
      return;
    }

    const fetchBooking = async () => {

      try {

        const res = await getBookingDetails(bookingId);

        setBooking(res.data);

      } catch (error) {

        console.error("Booking load failed:", error.response?.data || error);
        alert("Booking not found");

      } finally {

        setLoading(false);

      }

    };

    fetchBooking();

  }, [bookingId, navigate]);


  // ================= SUBMIT RATING =================
  const handleSubmit = async () => {

    if (!rating) {
      alert("Please select rating");
      return;
    }

    if (!feedback.trim()) {
      alert("Please write comments");
      return;
    }

    try {

      setSubmitting(true);

      const payload = {
        rating: Number(rating),

        // send STRING (important fix)
        honesty: honesty,
        recommend: recommend,

        comments: feedback.trim()
      };

      console.log("Submitting rating payload:", payload);

      await submitRating(bookingId, payload);

      alert("Rating submitted successfully ✅");

      navigate(`/download-report/${bookingId}`);

    } catch (error) {

      console.error(
        "Rating submit failed:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.detail ||
        "Rating submission failed ❌"
      );

    } finally {

      setSubmitting(false);

    }

  };


  // ================= LOADING UI =================
  if (loading)
    return (
      <p className="text-center mt-40">
        Loading booking details...
      </p>
    );


  // ================= BOOKING NOT FOUND =================
  if (!booking)
    return (
      <p className="text-center mt-40">
        Booking not found
      </p>
    );


  // ================= UI =================
  return (

    <div className="min-h-screen bg-[#fffbed] p-6">

      <h2 className="text-2xl font-bold mb-6">
        Rate Your Guide
      </h2>


      {/* Booking Info */}
      <div className="bg-white p-4 rounded shadow mb-6">

        <p>
          Guide: {booking.guide_name || "Guide"}
        </p>

        <p>
          Slot: {
            booking.time_slot
              ? new Date(booking.time_slot).toLocaleString()
              : "N/A"
          }
        </p>

      </div>


      {/* Rating Buttons */}
      <div className="mb-6">

        <p className="mb-2 font-medium">
          Select Rating:
        </p>

        {[1,2,3,4,5].map((star)=>(
          <button
            key={star}
            onClick={()=>setRating(star)}
            className={`px-4 py-2 mr-2 rounded ${
              rating===star
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
            }`}
          >
            {star} ⭐
          </button>
        ))}

      </div>


      {/* Honesty Dropdown */}
      <div className="mb-3">

        <label className="block mb-1">
          Guide was honest?
        </label>

        <select
          value={honesty}
          onChange={(e)=>setHonesty(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

      </div>


      {/* Recommend Dropdown */}
      <div className="mb-4">

        <label className="block mb-1">
          Recommend this guide?
        </label>

        <select
          value={recommend}
          onChange={(e)=>setRecommend(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

      </div>


      {/* Comments */}
      <textarea
        value={feedback}
        onChange={(e)=>setFeedback(e.target.value)}
        placeholder="Write your experience with the guide..."
        className="border w-full p-3 rounded mb-4"
      />


      {/* Submit Button */}
      <button
        disabled={submitting}
        onClick={handleSubmit}
        className="bg-[#ff6b35] text-white px-6 py-3 rounded"
      >
        {submitting ? "Submitting..." : "Submit Rating"}
      </button>

    </div>

  );

}

export default SubmitRating;