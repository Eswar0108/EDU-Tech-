import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, verifyOtp } from "../../Apiroute";

function LoginForm() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  // ================= SEND OTP =================

  const handleSendOtp = async () => {

    if (!email.trim()) {
      alert("Enter email first ❌");
      return;
    }

    try {

      setLoading(true);

      const response = await loginUser({ email });

      console.log("Send OTP response:", response.data);

      setEmailSent(true);

      alert("OTP sent successfully ✅");

    } catch (error) {

      console.error("OTP send error:", error);

      alert("Failed to send OTP ❌");

    } finally {

      setLoading(false);

    }

  };


  // ================= VERIFY OTP =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!otp.trim()) {
      alert("Enter OTP ❌");
      return;
    }

    try {

      setLoading(true);

      const response = await verifyOtp({
        email,
        otp
      });

      console.log("Verify OTP response:", response.data);

      const data = response?.data || {};

      // ✅ extract token safely
      const token =
        data.access_token ||
        data.token ||
        data.data?.access_token ||
        data.data?.token;

      // ✅ extract role
      const role =
        data.role ||
        data.data?.role;

      // ✅ extract user id
      const user_id =
        data.user_id ||
        data.data?.user_id ||
        data.id ||
        data.data?.id;


      if (!token) {

        console.error("Token missing from backend response ❌");

        alert("Login failed. Token missing.");

        return;
      }


      // ================= STORE SESSION =================

      localStorage.setItem("token", token);

      if (role)
        localStorage.setItem("role", role.toLowerCase());

      if (user_id)
        localStorage.setItem("user_id", user_id);

      localStorage.setItem("isLoggedIn", "true");


      console.log("Login success ✅");
      console.log("Stored token:", token);
      console.log("Stored role:", role);
      console.log("Stored user_id:", user_id);


      // ================= REDIRECT BASED ON ROLE =================

      switch (role?.toLowerCase()) {

        case "seeker":
          navigate("/seeker");
          break;

        case "senior_guide":
          navigate("/guide-dashboard");
          break;

        case "admin":
          navigate("/admin-dashboard");
          break;

        default:
          navigate("/");
      }

    } catch (error) {

      console.error("OTP verify error:", error);

      alert("Invalid OTP ❌");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">

        <h2 className="text-3xl font-bold text-center text-[#ff6b35] mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}

          <div className="mb-4">

            <label className="block text-gray-600 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />

          </div>


          {/* OTP INPUT */}

          {emailSent && (

            <div className="mb-4">

              <label className="block text-gray-600 font-medium">
                Enter OTP
              </label>

              <input
                type="text"
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                required
                className="w-full p-3 border rounded-lg"
              />

            </div>

          )}


          {/* SEND OTP BUTTON */}

          {!emailSent && (

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-3 bg-[#ff6b35] text-white rounded-lg mb-4"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

          )}


          {/* VERIFY OTP BUTTON */}

          {emailSent && (

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#ff6b35] text-white rounded-lg"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

          )}

        </form>

      </div>

    </div>

  );

}

export default LoginForm;