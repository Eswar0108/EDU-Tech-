import AgoraRTC from "agora-rtc-sdk-ng";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8"
});

let localAudioTrack = null;


// JOIN VOICE CALL
export const joinVoiceCall = async (tokenData) => {

  try {

    const {
      appId,
      channel,
      token,
      uid
    } = tokenData;

    console.log("Joining channel:", channel);

    // join channel
    await client.join(
      appId,
      channel,
      token,
      uid
    );

    console.log("Joined Agora channel");

    // create mic track
    localAudioTrack =
      await AgoraRTC.createMicrophoneAudioTrack();

    // publish mic
    await client.publish([localAudioTrack]);

    console.log("Mic published");


    // listen remote audio
    client.on(
      "user-published",
      async (user, mediaType) => {

        await client.subscribe(
          user,
          mediaType
        );

        if (mediaType === "audio") {

          console.log("Remote audio received");

          user.audioTrack.play();

        }

      }
    );

  } catch (error) {

    console.error("Agora join failed:", error);

  }

};


// LEAVE VOICE CALL
export const leaveVoiceCall = async () => {

  try {

    if (localAudioTrack) {

      localAudioTrack.stop();

      localAudioTrack.close();

    }

    await client.leave();

    console.log("Left Agora channel");

  } catch (error) {

    console.error("Leave call failed:", error);

  }

};