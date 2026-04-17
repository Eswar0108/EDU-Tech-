import { useParams, useNavigate } from "react-router-dom";

function Confirmation() {

  const navigate = useNavigate();

  const { bookingId } = useParams();

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">

      <h1 className="text-3xl font-bold text-green-600">
        Booking Confirmed ✅
      </h1>

      <p className="mt-4 text-lg">
        Your session has been successfully booked.
      </p>

      <p className="mt-2 text-xl">
        Booking ID: <strong>{bookingId}</strong>
      </p>

      <button
        onClick={() => navigate(`/call/${bookingId}`)}
        className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg"
      >
        Join Call
      </button>

    </div>

  );
}

export default Confirmation;