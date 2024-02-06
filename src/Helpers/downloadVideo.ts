export default function downloadVideo(video?: Blob) {
    if (!video?.size) {
        alert("Video is not recorded yet");
        return;
    }

    const url = URL.createObjectURL(video);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = "recorded-video.webm";
    a.click();
    window.URL.revokeObjectURL(url);
}
