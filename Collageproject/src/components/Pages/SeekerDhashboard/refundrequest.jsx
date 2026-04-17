import { useEffect, useState } from "react";
import {
  getMyBookings,
  createRefundRequest,
  getRefundStatus
} from "../../../Apiroute";

function RefundRequest() {

  const [bookings, setBookings] = useState([]);
  const [reason, setReason] = useState("");
  const [selectedBooking, setSelectedBooking] =
    useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {

    try {

      const res = await getMyBookings();

      // show only eligible bookings
      const eligible = res.data.filter(
        b =>
          b.status === "CONFIRMED" ||
          b.status === "COMPLETED"
      );

      setBookings(eligible);

    } catch (err) {

      console.error(err);

    }

  };

  const handleRefund = async () => {

    if (!selectedBooking || !reason) {

      alert("Select booking and enter reason");

      return;

    }

    try {

      await createRefundRequest(
        selectedBooking,
        reason
      );

      alert("Refund request submitted ✅");

      setReason("");

      loadBookings();

    } catch (err) {

      console.error(err);

      alert("Refund request failed ❌");

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-4">

          Request Refund

        </h1>

        {/* Booking selector */}

        <select
          className="w-full border p-2 rounded mb-4"
          onChange={e =>
            setSelectedBooking(e.target.value)
          }
        >

          <option value="">

            Select Booking

          </option>

          {bookings.map(b => (

            <option key={b.id} value={b.id}>

              Booking #{b.id} – {b.status}

            </option>

          ))}

        </select>

        {/* Reason */}

        <textarea
          placeholder="Enter refund reason..."
          className="w-full border p-3 rounded mb-4"
          rows="4"
          value={reason}
          onChange={e =>
            setReason(e.target.value)
          }
        />

        {/* Submit button */}

        <button
          onClick={handleRefund}
          className="w-full bg-red-500 text-white py-2 rounded-lg"
        >

          Submit Refund Request

        </button>

      </div>

    </div>

  );

}

export default RefundRequest;