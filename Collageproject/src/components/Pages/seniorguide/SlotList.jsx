import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SlotSelection() {
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const navigate = useNavigate();

  // Generate slots
  const generateSlots = () => {
    const start = 9 * 60;
    const end = 18 * 60;
    const tempSlots = [];

    for (let i = start; i < end; i += 15) {
      const format = (h, m) => {
        const ampm = h >= 12 ? "PM" : "AM";
        const hour = h % 12 === 0 ? 12 : h % 12;
        return `${hour}:${m === 0 ? "00" : m} ${ampm}`;
      };

      tempSlots.push(
        `${format(Math.floor(i / 60), i % 60)} - ${format(
          Math.floor((i + 15) / 60),
          (i + 15) % 60
        )}`
      );
    }

    setSlots(tempSlots);
  };

  useEffect(() => {
    generateSlots();
  }, []);

  useEffect(() => {
    if (selectedDate && slots.length > 0) {
      const randomBooked = [];
      for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * slots.length);
        randomBooked.push(slots[index]);
      }
      setBookedSlots(randomBooked);
      setSelectedSlot("");
    }
  }, [selectedDate, slots]);

  const handleContinue = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Select date and slot");
      return;
    }

    localStorage.setItem(
      "bookingData",
      JSON.stringify({ selectedDate, selectedSlot })
    );

    navigate("/booking");
  };

  // ✅ Cancel Function
  const handleCancel = () => {
    setSelectedDate("");
    setSelectedSlot("");
    setBookedSlots([]);
  };

  return (
    <div className="min-h-screen bg-[#54545454] p-6">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Select Slot
        </h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow">

        {/* Date */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-600">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Slots */}
        <h2 className="text-lg font-semibold mb-4">
          Available Slots
        </h2>

        {!selectedDate ? (
          <p className="text-gray-500">Please select a date</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {slots.map((slot, index) => {
              const isBooked = bookedSlots.includes(slot);
              const isSelected = selectedSlot === slot;

              return (
                <button
                  key={index}
                  disabled={isBooked}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-lg text-sm border transition
                    ${isBooked
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-[#ff6b35] text-white"
                      : "hover:bg-gray-100"
                    }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-6">

          <button
            onClick={handleContinue}
            className="w-full bg-[#ff6b35] hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
          >
            Continue
          </button>

          <button
            onClick={handleCancel}
            className="w-full border border-[#ff6b35] text-[#ff6b35] py-3 rounded-xl hover:bg-gray-100"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}

export default SlotSelection;