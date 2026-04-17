import { Link } from "react-router-dom";
function AdviceCards() {
  return (
    <div className="w-full px-6 md:px-16 py-10 bg-gray-100">
      
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Left Card */}
        <div className="rounded-xl p-8 text-white shadow-lg 
          bg-gradient-to-r from-orange-500 to-orange-400 relative overflow-hidden">

          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Seeking College Advice?
          </h2>

          <div className="w-16 h-[2px] bg-white/50 mb-4"></div>

          <p className="text-sm md:text-base mb-6 text-white/90">
            Book a session with a Senior Guide now.
          </p>

          <Link to={'/seeker'} className="bg-orange-600 hover:bg-white hover:text-[#545454] 
            px-6 py-3 rounded-lg font-semibold shadow-md transition">
            Find a Seeker
          </Link>
        </div>

        {/* Right Card */}
        <div className="rounded-xl p-8 text-white shadow-lg 
          bg-gradient-to-r from-[#545454] to-[#545454] relative overflow-hidden">

          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Become a SeniorGuide!
          </h2>

          <div className="w-16 h-[2px] bg-white/50 mb-4"></div>

          <p className="text-sm md:text-base mb-6 text-white/90">
            Earn by sharing your college experiences.
          </p>

         <Link to='/register'> <button className="border border-white/70 hover:bg-white hover:text-[#ff6b35]
            px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
            Register Now
            <span>›</span>
          </button></Link>
        </div>

      </div>
    </div>
  );
}

export default AdviceCards;