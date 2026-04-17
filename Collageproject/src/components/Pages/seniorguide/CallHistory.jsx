
import { useEffect, useState } from "react";
import { Phone, Clock } from "lucide-react";
import { getGuideHistory } from "../../../Apiroute";

function CallHistory() {

  const [calls, setCalls] = useState([]);

  useEffect(() => {

    loadHistory();

  }, []);


  const loadHistory = async () => {

    try {

      const res = await getGuideHistory();

      console.log("Guide bookings:", res.data);

      setCalls(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="min-h-screen bg-[#54545454] p-6">

      <div className="bg-white p-6 rounded-xl shadow mb-6 flex items-center gap-2">

        <Phone className="text-[#ff6b35]" />

        <h1 className="text-2xl font-bold">
          Call History
        </h1>

      </div>


      <div className="bg-white p-6 rounded-xl shadow">

        {calls.length > 0 ? (

          <div className="space-y-4">

            {calls.map((call) => (

              <div
                key={call.id}
                className="flex justify-between border-b pb-3"
              >

                <div>

                  <p className="font-semibold">
                    Booking #{call.id}
                  </p>

                  <div className="flex gap-3 text-sm text-gray-500">

                    <span className="flex items-center gap-1">

                      <Clock size={14} />

                      {new Date(call.start_time).toLocaleString()}

                    </span>

                    <span>
                      {call.duration || "N/A"} mins
                    </span>

                  </div>

                </div>


                <div className="text-right">

                  <p className="text-green-500 font-semibold">
                    {call.status || "Completed"}
                  </p>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-center text-gray-400">
            No call history available
          </p>

        )}

      </div>

    </div>

  );

}

export default CallHistory;