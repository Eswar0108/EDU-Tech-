import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getGuideSlots,
  getBookedSlots
} from "../../../Apiroute";

function SlotSelection() {

  const navigate = useNavigate();
  const { guide_id } = useParams();

  const [selectedDate, setSelectedDate] = useState("");
  const [allSlots, setAllSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);


  // ✅ STEP 1: Load all guide slots immediately

  useEffect(() => {

    const fetchSlots = async () => {

      try {

        const res = await getGuideSlots(guide_id);

        console.log("Guide slots:", res.data);

        setAllSlots(res.data || []);

        // show all slots initially
        setAvailableSlots(res.data || []);

      } catch (error) {

        console.error("Failed to load guide slots:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchSlots();

  }, [guide_id]);


  // ✅ STEP 2: Filter slots only if date selected

  useEffect(() => {

    if (!selectedDate) {

      setAvailableSlots(allSlots);

      return;

    }

    const filtered = allSlots.filter((slot) => {

      const slotDate = slot.start_time.split("T")[0];

      return slotDate === selectedDate;

    });

    setAvailableSlots(filtered);

  }, [selectedDate, allSlots]);


  // ✅ STEP 3: Load booked slots

  useEffect(() => {

    if (!selectedDate) return;

    const fetchBookedSlots = async () => {

      try {

        const res = await getBookedSlots(selectedDate);

        console.log("Booked slots:", res.data);

        setBookedSlots(res.data || []);

      } catch (error) {

        console.error("Failed to fetch booked slots:", error);

      }

    };

    fetchBookedSlots();

  }, [selectedDate]);


  // ✅ STEP 4: Continue to booking

  const handleContinue = () => {

    if (!selectedSlot) {

      alert("Please select slot");

      return;

    }

    navigate("/bookings", {
  state: {
    guide_id,
    time_slot: selectedSlot.start_time
  }
});

  };


  if (loading) {

    return (
      <p className="text-center mt-40">
        Loading slots...
      </p>
    );

  }


  return (

    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">

        <h2 className="text-xl font-bold mb-4">
          Select Available Slot
        </h2>


        {/* DATE FILTER */}

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
          className="border p-2 rounded mb-4 w-full"
        />


        {/* SLOT GRID */}

        <div className="grid grid-cols-2 gap-3">

          {availableSlots.length === 0 && (
            <p>No available slots</p>
          )}


          {availableSlots.map((slot) => {

            const isBooked = bookedSlots.some(
              (booked) =>
                booked.time_slot === slot.start_time
            );

            return (

              <button
                key={slot.id}
                disabled={isBooked}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded border transition

                  ${
                    isBooked
                      ? "bg-gray-300 cursor-not-allowed"
                      : selectedSlot?.id === slot.id
                      ? "bg-orange-500 text-white"
                      : "bg-white hover:bg-orange-100"
                  }`}
              >

                {/* show date + time */}

                <div className="text-sm text-gray-500">
                  {slot.start_time.split("T")[0]}
                </div>

                {slot.start_time.split("T")[1].slice(0,5)}
                {" - "}
                {slot.end_time.split("T")[1].slice(0,5)}

              </button>

            );

          })}

        </div>


        {/* CONTINUE BUTTON */}

        <button
          onClick={handleContinue}
          className="mt-6 w-full bg-[#ff6b35] text-white py-3 rounded"
        >

          Continue to Booking

        </button>

      </div>

    </div>

  );

}

export default SlotSelection;