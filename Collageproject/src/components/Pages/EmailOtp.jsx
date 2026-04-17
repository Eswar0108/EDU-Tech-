import { useState } from "react";
import {verifyOtp} from "../../Apiroute"
import { useNavigate,useLocation  } from "react-router-dom";
function EnterOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  
    const handleVerify = async () => {
    try {
      const response = await verifyOtp({
       
        email: email,
        otp: otp
    
        
      });
      
      console.log(response.data.success);

      if (response.data.message=="successful") {
        alert("OTP Verified ✅");
        navigate("/login"); // next page
      } else {
        alert("Invalid OTP ❌");
      }

    } catch (error) {
      console.log(error);
      alert("OTP verification failed");
    }
  };

    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="w-[380px] bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Header */}
        <div className="bg-[#545454] text-white text-center py-6">
          <h1 className="text-lg font-semibold">Enter OTP</h1>
        </div>

        {/* Body */}
        <div className="p-6 text-center">

          <p className="text-gray-600 mb-4">
            Please enter the 6-digit OTP sent to your email
          </p>

          {/* OTP Input */}
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="------"
            className="w-full border px-4 py-3 text-center text-xl tracking-[10px] rounded mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className="w-full bg-[#ff6b35] text-white py-2 rounded hover:shadow-xl transition duration-300 hover:scale-105"
          >
            Verify OTP
          </button>

          {/* Resend */}
          <p className="text-sm text-gray-500 mt-4">
            Didn’t receive OTP?{" "}
            <span className="text-[#ff6b35] cursor-pointer font-medium">
              Resend
            </span>
          </p>

        </div>

        {/* Footer */}
        <div className="bg-[#545454] text-white text-center py-3 text-sm">
          © 2026 SeniorGuide
        </div>

      </div>

    </div>
  );
}

export default EnterOTP;