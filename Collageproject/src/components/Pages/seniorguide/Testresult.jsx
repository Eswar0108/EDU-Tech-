import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TestResult() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const checkStatus = () => {
      const guideApplications = JSON.parse(localStorage.getItem("guideApplications")) || [];
      const index = parseInt(localStorage.getItem("currentGuideIndex"));

      if (isNaN(index)) {
        console.error("Invalid guide index");
        return;
      }

      const currentStatus = guideApplications[index]?.status;
      setStatus(currentStatus);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  // Countdown and redirect for passed status
  useEffect(() => {
    if (status === "Passed") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/guide-dashboard");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, navigate]);

  // Handle retry for failed status
  const handleRetry = () => {
    navigate("/guide-test");
  };

  // Handle go back for failed status
  const handleGoBack = () => {
    navigate("/");
  };

  if (status === "Passed") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#fffbed" }}>
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 sm:p-10 text-center">
              {/* Success Animation */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: "#e8f5e9" }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "#4caf50" }}>
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Title */}
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#2e7d32" }}>
                🎉 Congratulations!
              </h2>
              <p className="text-lg font-semibold mb-4" style={{ color: "#4caf50" }}>
                You Passed the Assessment
              </p>

              {/* Message */}
              <p className="mb-4" style={{ color: "#545454" }}>
                Your responses have been evaluated and you've qualified as a Senior Guide.
              </p>

              {/* Achievement Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: "#e8f5e9" }}>
                <svg className="w-5 h-5" style={{ color: "#4caf50" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium" style={{ color: "#2e7d32" }}>Senior Guide Qualified</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <p className="text-sm mb-2" style={{ color: "#545454" }}>Redirecting to dashboard in {countdown} seconds...</p>
                <div className="w-full rounded-full h-2 overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
                  <div 
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      backgroundColor: "#4caf50",
                      width: `${((3 - countdown) / 3) * 100}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Info Box */}
              <div className="rounded-lg p-4 text-left" style={{ backgroundColor: "#fffbed" }}>
                <div className="flex gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#4caf50" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#545454" }}>What's next?</p>
                    <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
                      You'll be redirected to your dashboard where you can start mentoring juniors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "Failed") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#fffbed" }}>
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 sm:p-10 text-center">
              {/* Failure Animation */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: "#ffebee" }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "#ef5350" }}>
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Failure Title */}
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#c62828" }}>
                Not Qualified
              </h2>
              <p className="text-lg font-semibold mb-4" style={{ color: "#ef5350" }}>
                You did not pass the assessment
              </p>

              {/* Message */}
              <p className="mb-4" style={{ color: "#545454" }}>
                Unfortunately, your responses didn't meet the required criteria for this time.
              </p>

              {/* Feedback Box */}
              <div className="rounded-lg p-4 mb-6 text-left" style={{ backgroundColor: "#fffbed" }}>
                <div className="flex gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#ff6b35" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#545454" }}>Suggestions for improvement</p>
                    <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
                      • Review mentoring best practices<br />
                      • Practice with scenario-based questions<br />
                      • Focus on communication skills
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRetry}
                  className="flex-1 py-2.5 rounded-xl font-semibold transition-all transform hover:scale-[1.02]"
                  style={{ backgroundColor: "#ff6b35", color: "white" }}
                >
                  Try Again
                </button>
                <button
                  onClick={handleGoBack}
                  className="flex-1 py-2.5 rounded-xl font-semibold transition-all border hover:bg-gray-50"
                  style={{ borderColor: "#d1d5db", color: "#545454" }}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#fffbed" }}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10 text-center">
            {/* Loading Animation */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fff0e8" }}>
                  <div className="w-16 h-16 rounded-full animate-spin border-4" style={{ borderColor: "#ff6b35", borderTopColor: "transparent" }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8" style={{ color: "#ff6b35" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2" style={{ color: "#545454" }}>
              Checking Results
            </h2>
            <p className="text-sm" style={{ color: "#9ca3af" }}>
              Please wait while we fetch your assessment results...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestResult;