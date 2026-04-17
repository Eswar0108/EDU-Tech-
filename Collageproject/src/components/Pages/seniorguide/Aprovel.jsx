import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGuideApplicationStatus } from "../../../Apiroute";

function PendingApproval() {

  const navigate = useNavigate();

  const [status, setStatus] = useState("PENDING_VERIFICATION");

  useEffect(() => {

    const checkStatus = async () => {

      try {

        const res = await getGuideApplicationStatus();

        const currentStatus = res.data.status;

        setStatus(currentStatus);

        // ✅ If admin approved → go to test
        if (currentStatus === "APPROVED") {

          navigate("/guide-test");

        }

        // ❌ If rejected → go home
        if (currentStatus === "REJECTED") {

          alert("Application Rejected ❌");

          navigate("/");

        }

      } catch (err) {

        console.error("Status check failed", err);

      }

    };

    checkStatus();

    const interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);

  }, [navigate]);

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#fffbed]">

      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md">

        <div className="mb-6">

          <div className="w-20 h-20 mx-auto rounded-full bg-[#fff0e8] flex items-center justify-center">

            <svg
              className="w-10 h-10 animate-spin text-[#ff6b35]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />

            </svg>

          </div>

        </div>

        <h2 className="text-2xl font-bold text-[#545454]">

          Application Under Review

        </h2>

        <p className="mt-3 text-gray-600">

          Current Status: <b>{status}</b>

        </p>

        <p className="mt-6 text-sm text-gray-400">

          You will be redirected automatically after approval.

        </p>

      </div>

    </div>

  );

}

export default PendingApproval;