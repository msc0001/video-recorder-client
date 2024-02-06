import React, { FunctionComponent, MutableRefObject, useCallback } from "react";
import Button from "../Button";
import { MediaRecorderData } from "../../Helpers/mediaRecorder";

interface VideoActionsProps {
    recording: boolean;
    mediaRecorderRef: MutableRefObject<MediaRecorderData | null>;
    downloadVideoHandler: CallableFunction;
}

const VideoActions: FunctionComponent<VideoActionsProps> = ({
    recording,
    mediaRecorderRef,
    downloadVideoHandler,
}) => {
    const startRecordingVideo = useCallback(() => {
        if (!mediaRecorderRef.current) {
            return;
        }

        const { mediaRecorder } = mediaRecorderRef.current;
        console.log(mediaRecorder);
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

    const downloadRecordedVideo = downloadVideoHandler();

    return (
        <div className="actions">
            <Button
                onClick={recording ? pauseRecordingVideo : startRecordingVideo}
            >
                {recording ? "Pause" : "Start"}
            </Button>
            {recording ? (
                <Button onClick={stopRecordingVideo}>Stop</Button>
            ) : null}
            {downloadRecordedVideo ? (
                <Button onClick={downloadRecordedVideo}>Download Video</Button>
            ) : null}
        </div>
    );
};

export default VideoActions;
