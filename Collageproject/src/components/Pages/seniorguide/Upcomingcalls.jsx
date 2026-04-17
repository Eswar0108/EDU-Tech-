import { useEffect, useState } from "react";
import { Phone, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getGuideUpcomingCalls,startCall } from "../../../Apiroute";

function UpcomingCalls() {

  const [calls, setCalls] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    loadCalls();

    const interval = setInterval(loadCalls, 15000);

    return () => clearInterval(interval);

  }, []);

  const loadCalls = async () => {

    try {

      const res = await getGuideUpcomingCalls();

      setCalls(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleJoin = async (call) => {

  try {

    await startCall(call.id);   // 🔥 IMPORTANT

    navigate(`/guide-call/${call.id}`);

  } catch (error) {

    console.error("Failed to start call", error);

    alert("Unable to start call");

  }

};

  return (
    <div className="min-h-screen bg-[#54545454] p-6">

      <div className="bg-white p-6 rounded-xl shadow mb-6 flex items-center gap-2">
        <Phone className="text-[#ff6b35]" />
        <h1 className="text-2xl font-bold">
          Upcoming Calls
        </h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        {calls.length > 0 ? (

          <div className="space-y-4">

            {calls.map((call) => (

              <div
                key={call.id}
                className="flex justify-between items-center border-b pb-3"
              >

                <div>

                  <p className="font-semibold">
                    Booking ID: {call.id}
                  </p>

                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={14} />
                    {new Date(call.time_slot).toLocaleString()}
                  </span>

                </div>

                <button
                  onClick={() => handleJoin(call)}
                  className="bg-green-500 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Join Call
                </button>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-center text-gray-400">
            No upcoming calls
          </p>

        )}

      </div>

    </div>
  );
}

export default UpcomingCalls;