import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TestPending() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = () => {
      const guideApplications = JSON.parse(localStorage.getItem("guideApplications")) || [];
      const index = parseInt(localStorage.getItem("currentGuideIndex"));

      if (isNaN(index)) {
        console.error("Invalid guide index");
        return;
      }

      const status = guideApplications[index]?.status;

      if (status === "Passed" || status === "Failed") {
        navigate("/test-result");
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#fffbed" }}>
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10 text-center">
            {/* Animated Loader */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#fff0e8" }}
                >
                  <div 
                    className="w-16 h-16 rounded-full animate-spin border-4"
                    style={{ 
                      borderColor: "#ff6b35",
                      borderTopColor: "transparent"
                    }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8" style={{ color: "#ff6b35" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#545454" }}>
              Test Under Evaluation
            </h2>
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: "#fff0e8", color: "#ff6b35" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#ff6b35" }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "#ff6b35" }}></span>
              </span>
              Processing Results
            </div>

            {/* Message */}
            <p className="mb-6" style={{ color: "#545454" }}>
              Your assessment answers are being reviewed by our admin team.
            </p>

            {/* Progress Steps */}
            <div className="space-y-3 text-left mb-6">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#ff6b35" }}>
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#545454" }}>Test Submitted</p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>Your answers have been recorded</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: "#ff6b35" }}>
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#ff6b35" }}>Admin Evaluation</p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>Reviewing your responses</p>
                </div>
              </div>

              <div className="flex items-center gap-3 opacity-50">
                <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "#d1d5db" }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#d1d5db" }}></div>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#9ca3af" }}>Final Result</p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>Pass/Fail decision</p>
                </div>
              </div>
            </div>

            {/* Loading Bar */}
            <div className="w-full rounded-full h-1.5 overflow-hidden mb-4" style={{ backgroundColor: "#e5e7eb" }}>
              <div 
                className="h-1.5 rounded-full animate-pulse"
                style={{ 
                  backgroundColor: "#ff6b35",
                  width: "66%",
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                }}
              ></div>
            </div>

            {/* Info Message */}
            <div className="rounded-lg p-3" style={{ backgroundColor: "#fffbed" }}>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                ⏱️ Estimated time: 1-2 minutes. You'll be redirected automatically once results are ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPending;