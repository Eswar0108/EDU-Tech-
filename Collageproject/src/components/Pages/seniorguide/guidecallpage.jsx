import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  createCallSession,
  getCallToken,
  endCallAPI
} from "../../../Service/callService";

import {
  joinVoiceCall,
  leaveVoiceCall
} from "../../../Service/agoraCall";

import {
  connectIncomingCallSocket
} from "../../../Service/callSocket";


function GuideCallPage() {

  const { booking_id } = useParams();

  const navigate = useNavigate();

  const [joined, setJoined] = useState(false);

  const ringtoneRef = useRef(null);


  const joinCall = async () => {

    try {

      await createCallSession(booking_id);

      const tokenData =
        await getCallToken(booking_id);

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

 if (booking_id) {
  navigate(`/feedback/${booking_id}`);
}

  };


  useEffect(() => {

    ringtoneRef.current =
      new Audio("/ringtone.mp3");

    const guideId =
      localStorage.getItem("user_id");

    const socket =
      connectIncomingCallSocket(
        guideId,
        data => {

          if (data.type === "call_ended")
            leaveCall();

        }
      );

    return () => socket?.close();

  }, []);


  return (

    <div className="flex flex-col items-center justify-center h-screen">

      <h1 className="text-3xl font-bold">
        Guide Call
      </h1>

      {!joined ? (

        <button
          onClick={joinCall}
          className="bg-green-500 text-white px-6 py-3 mt-6 rounded"
        >
          Start Call 📞
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

export default GuideCallPage;