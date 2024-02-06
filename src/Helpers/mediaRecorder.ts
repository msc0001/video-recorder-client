export interface MediaRecorderData {
    mediaRecorder: MediaRecorder;
    recordedVideoChunks: Array<Blob>;
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
    mediaRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
            recordedVideoChunks.push(event.data);
        }
    };

    mediaRecorder.onstart = function () {
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

    return {
        mediaRecorder,
        recordedVideoChunks,
    };
}
