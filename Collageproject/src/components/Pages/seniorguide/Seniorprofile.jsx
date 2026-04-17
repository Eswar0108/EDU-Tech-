import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getGuideSlots,
  getGuideProfileById,
  getGuideRating
} from "../../../Apiroute";


function SeniorGuideProfile() {

  const navigate = useNavigate();
  const { guide_id } = useParams();

  const [guide, setGuide] = useState(null);
  const [slots, setSlots] = useState([]);
  const [rating, setRating] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchGuideData = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {

          navigate("/login");
          return;

        }

        // parallel API calls
        const [profileRes, slotsRes, ratingRes] =
          await Promise.all([

            getGuideProfileById(guide_id),

            getGuideSlots(guide_id),

            getGuideRating(guide_id)

          ]);

        console.log("Guide profile:", profileRes.data);
        console.log("Guide slots:", slotsRes.data);
        console.log("Guide rating:", ratingRes.data);

        setGuide(profileRes.data);
        setSlots(slotsRes.data || []);
        setRating(ratingRes.data?.average_rating || "N/A");

      } catch (error) {

        console.error("Guide profile fetch failed:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchGuideData();

  }, [guide_id, navigate]);


  const handleViewSlots = () => {

    navigate(`/SlotSelection/${guide_id}`);

  };


  if (loading)
    return <p className="text-center mt-40">Loading profile...</p>;


  if (!guide)
    return <p className="text-center mt-40">Guide not found</p>;


  return (

    <div className="min-h-screen mt-50 bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-2xl font-bold text-center text-[#ff6b35] mb-6">
          Senior Guide Profile
        </h1>


        <div className="space-y-4">

          <ProfileItem label="Guide ID" value={guide.unique_id} />

        <ProfileItem label="College" value={guide.college_name} />

        <ProfileItem label="Branch" value={guide.branch} />

        <ProfileItem label="Year of Study" value={guide.year_of_study} />

          <ProfileItem label="Rating" value={rating} />

          <ProfileItem
            label="Available Slots"
            value={slots.length}
          />

        </div>


        <button
          onClick={handleViewSlots}
          className="mt-6 w-full bg-[#ff6b35] text-white py-2 rounded-lg"
        >
          View Available Slots
        </button>

      </div>

    </div>

  );

}


function ProfileItem({ label, value }) {

  return (

    <div className="flex justify-between border-b pb-2">

      <span className="font-semibold text-gray-600">
        {label}
      </span>

      <span className="text-gray-800">
        {value || "N/A"}
      </span>

    </div>

  );

}


export default SeniorGuideProfile;