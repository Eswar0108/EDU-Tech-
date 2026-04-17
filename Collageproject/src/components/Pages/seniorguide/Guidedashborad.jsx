import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGuideApplicationStatus,
  getGuideProfile
} from "../../Apiroute";

function GuideDashboard() {

  const navigate = useNavigate();

  const [guide, setGuide] = useState(null);

  useEffect(() => {

    const checkAccess = async () => {

      try {

        const res = await getGuideApplicationStatus();

        const status = res.data.status;

        // ❌ Not passed test yet
        if (status === "ELIGIBLE_TEST") {

          navigate("/guide-test");
          return;

        }

        // ❌ Still under approval
        if (status === "PENDING_VERIFICATION") {

          navigate("/pending-approval");
          return;

        }

        // ❌ Failed 3 attempts
        if (status === "REJECTED") {

          navigate("/rejected");
          return;

        }

        // ✅ Only ACTIVE allowed
        if (status === "ACTIVE") {

          const profile = await getGuideProfile();
          setGuide(profile.data);

        }

      } catch (err) {

        console.error(err);
        navigate("/");

      }

    };

    checkAccess();

  }, [navigate]);



  if (!guide) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking access...
      </div>
    );

  }



  return (

    <div className="min-h-screen bg-gradient-to-br from-[#ff6b35] to-[#545454] p-6 text-white">

      <h1 className="text-2xl font-bold mb-4">
        Guide Dashboard
      </h1>

      <p className="mb-4">
        Guide ID: <b>{guide.unique_id}</b>
      </p>

      <p className="mb-6">
        Wallet Balance: ₹{guide.wallet_balance}
      </p>

      <div className="grid md:grid-cols-3 gap-4">

        <button
          onClick={() => navigate("/availability")}
          className="bg-white text-black p-4 rounded-xl"
        >
          Set Availability
        </button>

        <button
          onClick={() => navigate("/slots")}
          className="bg-white text-black p-4 rounded-xl"
        >
          View Slots
        </button>

        <button
          onClick={() => navigate("/earnings")}
          className="bg-white text-black p-4 rounded-xl"
        >
          Earnings
        </button>

      </div>

    </div>

  );

}

export default GuideDashboard;