
const steps = [
  {
    title: "1. Book a Call",
    desc: "Pay ₹99 and choose a time slot.",
  },
  {
    title: "2. Talk Anonymously",
    desc: "In-web call, no real identities shared.",
  },
  {
    title: "3. Get College Advice",
    desc: "Receive honest feedback & a summary report.",
  },
];

function Workcards() {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-blue-50 text-center">
      
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#ff6b35] mb-14">
        How It Works
      </h2>

      {/* Cards */}
      <div className="grid mx-6 md:mx-16 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
          >
            
            {/* Step Number Circle */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#545454] text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-md group-hover:scale-110 transition">
              {index + 1}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-[#ff6b35] mt-6 mb-3">
              {step.title}
            </h3>

            {/* Divider */}
            <div className="w-12 h-1 bg-[#545454] mx-auto mb-4 rounded"></div>

            {/* Description */}
            <p className="text-gray-600 font-medium leading-relaxed">
              {step.desc}
            </p>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#ff6b35] transition duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workcards;