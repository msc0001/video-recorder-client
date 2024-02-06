import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import useMediaDevices from "../../Hooks/useMediaDevices";
import Message from "../Message";
import getMediaRecorder, {
    MediaRecorderData,
} from "../../Helpers/mediaRecorder";
import "./styles.css";
import VideoActions from "../VideoActions";
import downloadVideo from "../../Helpers/downloadVideo";

interface VideoPreviewProps {
    id?: string;
}

const VideoPreview: FunctionComponent<VideoPreviewProps> = ({
    id = "video",
}) => {
    const videoElementRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorderData | null>(null);
    const [recordedVideo, setRecordedVideo] = useState<Blob>();
    const [recording, setRecording] = useState(false);

    const { loading, hasError, stream } = useMediaDevices();

    useEffect(() => {
        if (videoElementRef.current && stream) {
            mediaRecorderRef.current = getMediaRecorder({
                stream,
                onStartRecording: () => setRecording(true),
                onPauseRecording: () => {
                    setRecording(false);
                },
                onStopRecording: (recording: Blob) => {
                    setRecording(false);
                    setRecordedVideo(recording);
                    mediaRecorderRef.current = null;
                },
            });

            videoElementRef.current.srcObject = stream;
        }
    }, [stream]);

    const downloadVideoHandler = useCallback(() => {
        if (recordedVideo?.size) {
            return () => downloadVideo(recordedVideo);
        }
        return;
    }, [recordedVideo]);

    if (loading) return <Message data="Loading..." />;

    if (hasError) return <Message data="Allow permissions" />;

    return (
        <div className="video-container">
            <VideoActions
                recording={recording}
                mediaRecorderRef={mediaRecorderRef}
                downloadVideoHandler={downloadVideoHandler}
            />
            <span className={`recording-icon ${recording ? "active" : ""}`}>
                Recording...
            </span>
            <video
                ref={videoElementRef}
                id={id}
                autoPlay
                muted
                className={`video-frame`}
            />
        </div>
    );
};

export default VideoPreview;
