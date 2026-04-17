import { Link } from "react-router-dom"; // ✅ Correct import
import { Star } from "lucide-react";

const guides = [
  { id: "SG-10234", branch: "CSE, 3rd Year", rating: 4, calls: 120 },
  { id: "SG-10456", branch: "ECE, 4th Year", rating: 5, calls: 95 },
  { id: "SG-10789", branch: "ME, Final Year", rating: 2, calls: 150 },
];

function SeniorGuide() {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-blue-50 text-center">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#ff6b35] mb-14">
        Meet Our Senior Guides
      </h2>

      {/* Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mx-6 md:mx-16">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
          >
            {/* Top Section */}
            <div className="flex items-center gap-4 mb-5">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:scale-110 transition">
                👤
              </div>

              {/* Info */}
              <div className="text-left">
                <h3 className="font-semibold text-lg text-gray-700">{guide.id}</h3>
                <p className="text-gray-500 text-sm">{guide.branch}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-200 mb-4"></div>

            {/* Rating */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-700 font-medium">Rating</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < guide.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>

            {/* Calls */}
            <div className="flex justify-between items-center text-gray-700 mb-4">
              <p className="font-medium">Calls</p>
              <span className="bg-blue-100 text-[#ff6b35] px-3 py-1 rounded-full text-sm font-semibold">
                {guide.calls}
              </span>
            </div>

            {/* Hover Border Glow */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#545454] transition duration-300"></div>
          </div>
        ))}
      </div>

      {/* Button */}
      <Link to="/view-guide">
        <button className="mt-12 bg-[#ff6b35] hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition duration-300">
          View More Guides →
        </button>
      </Link>
    </div>
  );
}

export default SeniorGuide;