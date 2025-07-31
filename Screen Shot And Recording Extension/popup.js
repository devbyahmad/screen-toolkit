// Screenshot functionality
document.getElementById("screenshotBtn").addEventListener("click", () => {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "screenshot.png";
    link.click();
  });
});

// Launch recorder tab
document.getElementById("startRecordBtn").addEventListener("click", () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("recorder.html") });
});
