import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  createCallSession,
  getCallToken,
  startCallAPI,
  endCallAPI
} from "../../../Service/callService";

import {
  joinVoiceCall,
  leaveVoiceCall
} from "../../../Service/agoraCall";

import {
  connectIncomingCallSocket
} from "../../../Service/callSocket";


function SeekerCallPage() {

  const { booking_id } = useParams();

  const navigate = useNavigate();

  const [joined, setJoined] = useState(false);

  const ringtoneRef = useRef(null);


  const joinCall = async () => {

    try {

      console.log("Joining booking:", booking_id);

      // ensure session exists
      await createCallSession(booking_id);

      // get agora token

      const tokenData =
        await getCallToken(booking_id);

      console.log("Agora token:", tokenData);

      // join channel

      await joinVoiceCall(tokenData);

      ringtoneRef.current?.pause();

      setJoined(true);

    } catch (error) {

      console.error("Join call failed:", error);

      alert("Call start failed");

    }

  };


  const leaveCall = async () => {

    await leaveVoiceCall();

    await endCallAPI(booking_id);

    navigate(`/rating/${booking_id}`);

  };


  useEffect(() => {

    ringtoneRef.current =
      new Audio("/ringtone.mp3");

    const userId =
      localStorage.getItem("user_id");

    if (!userId) {

      console.warn("user_id missing in localStorage");

      return;

    }

    const socket =
      connectIncomingCallSocket(
        userId,
        (data) => {

          if (data.type === "incoming_call") {

            ringtoneRef.current.loop = true;

            ringtoneRef.current.play();

          }

          if (data.type === "call_ended") {

            leaveCall();

          }

        }
      );

    return () => socket?.close();

  }, []);


  return (

    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

      <h1 className="text-3xl font-bold">
        Consultation Call
      </h1>

      <p className="mt-2">
        Booking ID: {booking_id}
      </p>

      {!joined ? (

        <button
          onClick={joinCall}
          className="bg-green-500 text-white px-6 py-3 mt-6 rounded"
        >
          Join Call
        </button>

      ) : (

        <button
          onClick={leaveCall}
          className="bg-red-500 text-white px-6 py-3 mt-6 rounded"
        >
          End Call
        </button>

      )}

    </div>

  );

}

export default SeekerCallPage;