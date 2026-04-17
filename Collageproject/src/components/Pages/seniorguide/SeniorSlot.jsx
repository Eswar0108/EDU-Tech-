import { useState, useEffect } from "react";
import {
  createSlot,
  getMySlots,
  deleteSlot
} from "../../../Apiroute";

function Slots() {

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [confirmedSlots, setConfirmedSlots] = useState([]);
  const [loading, setLoading] = useState(false);


  // ✅ Load saved slots

  useEffect(() => {

    const fetchSlots = async () => {

      try {

        const res = await getMySlots();

        console.log("My slots:", res.data);

        setConfirmedSlots(res.data || []);

      } catch (err) {

        console.error("Failed to fetch slots:", err);

      }

    };

    fetchSlots();

  }, []);


  // ✅ Toggle slot selection

  const toggleSlot = (slot) => {

    if (selectedSlots.includes(slot)) {

      setSelectedSlots(
        selectedSlots.filter((s) => s !== slot)
      );

    } else {

      setSelectedSlots([...selectedSlots, slot]);

    }

  };


  // ✅ Convert slot string → start_time + end_time

  const convertSlotToDatetime = (slot) => {

    const [start, end] = slot.split(" - ");

    return {
      start_time: `${selectedDate}T${start}:00`,
      end_time: `${selectedDate}T${end}:00`
    };

  };


  // ✅ Save slots

  const handleSaveSlots = async () => {

    if (!selectedDate) {

      alert("Select a date first");
      return;

    }

    if (selectedSlots.length === 0) {

      alert("Select at least one slot");
      return;

    }

    try {

      setLoading(true);

      for (const slot of selectedSlots) {

        const payload =
          convertSlotToDatetime(slot);

        console.log("Sending slot:", payload);

        await createSlot(payload);

      }

      alert("Slots saved successfully");

      const updated = await getMySlots();

      setConfirmedSlots(updated.data || []);

      setSelectedSlots([]);

    } catch (err) {

      console.error("Slot save failed:", err);

      alert("Failed to save slots");

    } finally {

      setLoading(false);

    }

  };


  // ✅ Delete slot

  const handleDeleteSlot = async (slotId) => {

    try {

      await deleteSlot(slotId);

      setConfirmedSlots(
        confirmedSlots.filter(
          (slot) => slot.id !== slotId
        )
      );

    } catch (err) {

      console.error("Delete failed:", err);

    }

  };


  // ⏰ Slot time list

  const slotTimes = [

    "10:00 - 10:15",
    "10:15 - 10:30",
    "10:30 - 10:45",
    "10:45 - 11:00",

    "11:00 - 11:15",
    "11:15 - 11:30",
    "11:30 - 11:45",
    "11:45 - 12:00",

    "12:00 - 12:15",
    "12:15 - 12:30",
    "12:30 - 12:45",
    "12:45 - 13:00",

    "13:00 - 13:15",
    "13:15 - 13:30",
    "13:30 - 13:45",
    "13:45 - 14:00",

    "14:00 - 14:15",
    "14:15 - 14:30",
    "14:30 - 14:45",
    "14:45 - 15:00"

  ];


  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">

        <h2 className="text-xl font-bold mb-4">

          Set Availability Slots

        </h2>


        {/* DATE PICKER */}

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
          className="border p-2 rounded mb-4 w-full"
        />


        {/* SLOT GRID */}

        <div className="grid grid-cols-3 gap-3">

          {slotTimes.map((slot) => (

            <button
              key={slot}
              onClick={() => toggleSlot(slot)}
              className={`p-2 border rounded

                ${
                  selectedSlots.includes(slot)
                    ? "bg-orange-500 text-white"
                    : "bg-white"
                }`}
            >

              {slot}

            </button>

          ))}

        </div>


        {/* SAVE BUTTON */}

        <button
          onClick={handleSaveSlots}
          disabled={loading}
          className="mt-6 w-full bg-orange-500 text-white py-2 rounded"
        >

          {loading ? "Saving..." : "Save Slots"}

        </button>


        {/* CONFIRMED SLOT LIST */}

        <div className="mt-8">

          <h3 className="font-semibold mb-2">

            My Saved Slots

          </h3>


          {confirmedSlots.length === 0 && (

            <p>No slots saved yet</p>

          )}


          {confirmedSlots.map((slot) => (

            <div
              key={slot.id}
              className="flex justify-between border p-2 rounded mb-2"
            >

              <span>

                {slot.start_time} → {slot.end_time}

              </span>

              <button
                onClick={() =>
                  handleDeleteSlot(slot.id)
                }
                className="text-red-500"
              >

                Delete

              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Slots;