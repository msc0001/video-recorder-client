export interface MediaRecorderData {
    mediaRecorder: MediaRecorder;
    recordedVideoChunks: Array<Blob>;
    resetRecordedVideo: CallableFunction;
}

export default function getMediaRecorder({
    stream,
    onStartRecording,
    onStopRecording,
    onPauseRecording,
}: {
    stream: MediaStream;
    onStartRecording: CallableFunction;
    onPauseRecording: CallableFunction;
    onStopRecording: CallableFunction;
}) {
    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
    });

    let recordedVideoChunks: Array<Blob> = [];

    window.addEventListener("beforeunload", (event: BeforeUnloadEvent) => {
        if (!recordedVideoChunks.length) {
            return;
        }

        event.preventDefault();
        event.returnValue = "";

        const message =
            "You have unsaved work. Are you sure you want to leave this page?";
        event.returnValue = message;

        return message;
    });

    mediaRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
            recordedVideoChunks.push(event.data);
        }
    };

    mediaRecorder.onstart = function () {
        onStartRecording();
    };

    mediaRecorder.onresume = function () {
        onStartRecording();
    };

    mediaRecorder.onpause = function () {
        onPauseRecording();
    };

    mediaRecorder.onstop = function () {
        const recordedBlob = new Blob(recordedVideoChunks, {
            type: "video/webm",
        });

        return onStopRecording(recordedBlob);
    };

    const resetRecordedVideo = function () {
        recordedVideoChunks = [];
    };

    return {
        mediaRecorder,
        recordedVideoChunks,
        resetRecordedVideo,
    };
}
