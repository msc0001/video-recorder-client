import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import Button from "../Button";
import getMediaRecorder, {
    MediaRecorderData,
} from "../../Helpers/mediaRecorder";
import downloadVideo from "../../Helpers/downloadVideo";

interface VideoActionsProps {
    stream: MediaStream | null;
}

enum STATE {
    RECORDING = "recording",
    PAUSED = "paused",
    STOPPED = "inactive",
}

const VideoActions: FunctionComponent<VideoActionsProps> = ({ stream }) => {
    const [recordedVideo, setRecordedVideo] = useState<Blob>();
    const [recordingState, setRecordingState] = useState(STATE.STOPPED);
    const mediaRecorderRef = useRef<MediaRecorderData | null>(null);

    useEffect(() => {
        if (!stream) {
            return;
        }

        mediaRecorderRef.current = getMediaRecorder({
            stream,
            onStartRecording: () => {
                setRecordingState(STATE.RECORDING);
            },
            onPauseRecording: () => {
                setRecordingState(STATE.PAUSED);
            },
            onStopRecording: (recording: Blob) => {
                setRecordingState(STATE.STOPPED);
                setRecordedVideo(recording);
            },
        });
    }, [stream]);

    const startRecordingVideo = useCallback(() => {
        if (!mediaRecorderRef.current) {
            return;
        }

        const { mediaRecorder, resetRecordedVideo } = mediaRecorderRef.current;

        if (mediaRecorder.state === STATE.PAUSED) {
            mediaRecorder.resume();
            return;
        }

        resetRecordedVideo();
        mediaRecorder.start();
    }, [mediaRecorderRef]);

    const pauseRecordingVideo = useCallback(() => {
        if (!mediaRecorderRef.current) {
            return;
        }

        const { mediaRecorder } = mediaRecorderRef.current;

        mediaRecorder.pause();
    }, [mediaRecorderRef]);

    const stopRecordingVideo = useCallback(() => {
        if (!mediaRecorderRef.current) {
            return;
        }

        const { mediaRecorder } = mediaRecorderRef.current;
        mediaRecorder.stop();
    }, [mediaRecorderRef]);

    const downloadRecordedVideo = useCallback(() => {
        downloadVideo(recordedVideo);
    }, [recordedVideo]);

    const { mediaRecorder } = mediaRecorderRef.current || {};
    console.log(mediaRecorder?.state);

    const isRecording = recordingState === STATE.RECORDING;
    const isPaused = recordingState === STATE.PAUSED;
    const isStopped = recordingState === STATE.STOPPED;

    return (
        <div className="actions">
            <span
                className={`recording-icon ${
                    isRecording || isPaused ? "active" : ""
                }`}
            >
                {mediaRecorder?.state}
            </span>
            {isStopped ? (
                <Button onClick={startRecordingVideo}>Start</Button>
            ) : null}
            {isPaused ? (
                <Button onClick={startRecordingVideo}>Resume</Button>
            ) : null}
            {isRecording ? (
                <Button onClick={pauseRecordingVideo}>Pause</Button>
            ) : null}
            {isRecording || isPaused ? (
                <Button onClick={stopRecordingVideo}>Stop</Button>
            ) : null}
            {recordedVideo?.size ? (
                <Button onClick={downloadRecordedVideo}>Download Video</Button>
            ) : null}
        </div>
    );
};

export default VideoActions;
