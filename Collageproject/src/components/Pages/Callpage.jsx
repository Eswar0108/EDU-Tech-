import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";

import {
  createCallSession,
  getCallToken,
  endCallAPI
} from "../../../Service/callService";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8"
});

export default function CallPage() {

  const { bookingId } = useParams();

  const [joined, setJoined] = useState(false);
  const [micTrack, setMicTrack] = useState(null);
  const [timer, setTimer] = useState(0);

  const intervalRef = useRef(null);

  const APP_ID = import.meta.env.VITE_AGORA_APP_ID;


  // ================= JOIN CALL =================

  async function joinCall() {

    try {

      // 1️⃣ create backend call session
      await createCallSession(bookingId);

      // 2️⃣ get Agora token
      const tokenData = await getCallToken(bookingId);

      const { token, channel, uid } = tokenData;

      // 3️⃣ join Agora channel
      await client.join(APP_ID, channel, token, uid);

      // 4️⃣ create mic track
      const track = await AgoraRTC.createMicrophoneAudioTrack();

      await client.publish([track]);

      setMicTrack(track);

      setJoined(true);

      console.log("Call joined successfully");

    } catch (err) {

      console.error("Join call error:", err);

      alert("Unable to join call");

    }

  }


  // ================= LEAVE CALL =================

  async function leaveCall() {

    if (micTrack) {

      micTrack.stop();
      micTrack.close();

    }

    await client.leave();

    await endCallAPI(bookingId);

    clearInterval(intervalRef.current);

    setJoined(false);

    setTimer(0);

    console.log("Call ended");

  }


  // ================= TIMER =================

  useEffect(() => {

    if (joined) {

      intervalRef.current = setInterval(() => {

        setTimer(prev => prev + 1);

      }, 1000);

    }

    return () => clearInterval(intervalRef.current);

  }, [joined]);


  // ================= REMOTE AUDIO =================

  useEffect(() => {

    client.on("user-published", async (user, mediaType) => {

      await client.subscribe(user, mediaType);

      if (mediaType === "audio") {

        user.audioTrack.play();

      }

    });

  }, []);


  // ================= FORMAT TIMER =================

  const formatTime = (seconds) => {

    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;

  };


  return (

    <div className="flex flex-col items-center justify-center h-screen bg-[#fffbed]">

      <h1 className="text-2xl font-bold">
        Voice Consultation
      </h1>

      <h2 className="mt-2">
        Booking ID: {bookingId}
      </h2>

      <div className="text-4xl font-mono mt-4">
        {formatTime(timer)}
      </div>


      {!joined ? (

        <button
          onClick={joinCall}
          className="bg-green-500 text-white px-6 py-3 mt-6 rounded"
        >
          Start Call
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