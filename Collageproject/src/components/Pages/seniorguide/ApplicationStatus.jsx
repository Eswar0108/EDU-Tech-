import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  AlertCircle,
  Loader2
} from "lucide-react";

import {
  getGuideApplicationStatus,
  getGuideProfile
} from "../../../Apiroute";

function GuideStatus() {

  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuideData();
  }, []);

  const fetchGuideData = async () => {
    try {

      const statusRes = await getGuideApplicationStatus();
      const profileRes = await getGuideProfile();

      console.log("STATUS:", statusRes.data);
      console.log("PROFILE:", profileRes.data);

      setStatus(statusRes.data.status);
      setGuide(profileRes.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );

  if (!guide)
    return (
      <div className="min-h-screen flex justify-center items-center">
        No Guide Profile Found
      </div>
    );

  // STATUS UI

  const getStatusUI = () => {

    if (status === "ACTIVE")
      return {
        icon: <CheckCircle size={22} />,
        text: "Approved",
        color: "#16a34a"
      };

    if (status === "REJECTED")
      return {
        icon: <XCircle size={22} />,
        text: "Rejected",
        color: "#dc2626"
      };

    return {
      icon: <Clock size={22} />,
      text: "Pending",
      color: "#f59e0b"
    };

  };

  const statusUI = getStatusUI();

  return (
    <div className="min-h-screen bg-[#fffbed]">

      <div className="max-w-6xl mx-auto pt-24 px-6">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>


        {/* STATUS */}

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-bold">
            Application Status
          </h2>

          <div
            className="flex gap-2 items-center mt-3"
            style={{ color: statusUI.color }}
          >
            {statusUI.icon}
            {statusUI.text}
          </div>

        </div>


        {/* GUIDE DETAILS */}

        <div className="grid md:grid-cols-2 gap-6 mt-6">

          <div className="bg-white shadow rounded-xl p-6">

            <h3 className="font-semibold mb-4">
              Submitted Details
            </h3>

            <p>College: {guide.college_name}</p>
            <p>Branch: {guide.branch}</p>
            <p>Year: {guide.year_of_study}</p>

            <p>
              Aadhaar:
              ****{guide.aadhaar_number?.slice(-4)}
            </p>

            <p>
              ID:
              {guide.college_id || guide.hall_ticket}
            </p>

          </div>


          {/* DOCUMENTS */}

          <div className="bg-white shadow rounded-xl p-6">

            <h3 className="font-semibold mb-4">
              Uploaded Documents
            </h3>

            <div className="grid grid-cols-3 gap-4">

              {guide.aadhaar_file && (
                <img src={guide.aadhaar_file} />
              )}

              {guide.college_id_file && (
                <img src={guide.college_id_file} />
              )}

              {guide.hall_ticket_file && (
                <img src={guide.hall_ticket_file} />
              )}

            </div>

          </div>

        </div>


        {/* MESSAGE */}

        <div className="bg-orange-100 mt-6 p-4 rounded-xl flex gap-2">

          <AlertCircle size={18} />

          <p>

            {status === "ACTIVE" &&
              "You can now start guiding students"}

            {status === "PENDING" &&
              "Application under review"}

            {status === "REJECTED" &&
              "Please reapply with valid documents"}

          </p>

        </div>

      </div>

    </div>
  );
}

export default GuideStatus;