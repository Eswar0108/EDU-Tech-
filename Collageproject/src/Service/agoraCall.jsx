import AgoraRTC from "agora-rtc-sdk-ng";

let client = null;
let localAudioTrack = null;

export const joinVoiceCall = async ({
  appId,
  channel,
  token,
  uid
}) => {

  try {

    client = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8"
    });

    // 🔊 listen remote audio
    client.on("user-published", async (user, mediaType) => {

      await client.subscribe(user, mediaType);

      if (mediaType === "audio") {

        user.audioTrack.play();

        console.log("Remote audio connected");

      }

    });

    await client.join(
      appId,
      channel,
      token,
      uid
    );

    localAudioTrack =
      await AgoraRTC.createMicrophoneAudioTrack();

    await client.publish([
      localAudioTrack
    ]);

    console.log("Mic connected");

  } catch (err) {

    console.log("Agora error:", err);

  }

};


export const leaveVoiceCall = async () => {

  try {

    if (localAudioTrack) {

      localAudioTrack.stop();
      localAudioTrack.close();
      localAudioTrack = null;

    }

    if (client) {

      await client.leave();
      client = null;

    }

  } catch (err) {

    console.log(err);

  }

};