import { useCallback, useRef, useState } from "react";
import getMediaRecorder, { MediaRecorderData } from "../Helpers/mediaRecorder";

export interface Recording {
    name: string;
    data: Blob;
}

export type Recordings = Array<Recording>;

export enum RECORDING_STATUS {
    STARTED,
    PAUSED,
    STOPPED,
}

export default function useMediaRecorder({
    stream,
}: {
    stream: MediaStream | null;
}) {
    const [recordings, setRecordings] = useState<Recordings>([]);
    const [status, setStatus] = useState<RECORDING_STATUS>(
        RECORDING_STATUS.STOPPED
    );

    const mediaRecorderRef = useRef<MediaRecorderData | null>(null);
    const streamRef = useRef(stream);
    streamRef.current = stream;

    const initialiseRecorder = useCallback(() => {
        if (!streamRef.current) {
            return;
        }

        if (
            status === RECORDING_STATUS.STARTED ||
            status === RECORDING_STATUS.PAUSED
        ) {
            alert("Recording is in progress");
            return;
        }

        mediaRecorderRef.current = getMediaRecorder({
            stream: streamRef.current,
            onStartRecording: () => setStatus(RECORDING_STATUS.STARTED),
            onStopRecording: (recording: Blob) => {
                setStatus(RECORDING_STATUS.STOPPED);
                setRecordings((prev) => [
                    ...prev,
                    { name: new Date().toDateString(), data: recording },
                ]);
            },
            onPauseRecording: () => setStatus(RECORDING_STATUS.PAUSED),
        });
    }, [status]);

    const getRecorder = useCallback(() => {
        if (!mediaRecorderRef.current) {
            alert("Recorder not initiated");
            return;
        }

        return mediaRecorderRef.current.mediaRecorder;
    }, []);

    const startRecording = useCallback(() => {
        // start recording
        getRecorder()?.start();
    }, [getRecorder]);

    const pauseRecording = useCallback(() => {
        // pause recording
        getRecorder()?.pause();
    }, [getRecorder]);

    const stopRecording = useCallback(() => {
        // stop recording
        getRecorder()?.stop();
    }, [getRecorder]);

    return {
        startRecording,
        stopRecording,
        pauseRecording,
        initialiseRecorder,
        recordings,
        mediaRecorderRef,
    };
}
