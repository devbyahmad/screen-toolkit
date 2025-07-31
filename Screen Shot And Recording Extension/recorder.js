(async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });

    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "screen-recording.webm";
      a.click();

      window.close(); // close the tab automatically
    };

    mediaRecorder.start();

    // Stop after 30 seconds or when user closes the tab (you can customize this)
    setTimeout(() => {
      mediaRecorder.stop();
    }, 30000);
  } catch (err) {
    alert("Recording failed: " + err.message);
    window.close();
  }
})();
