import React, { FunctionComponent, useEffect, useRef } from "react";
import useMediaDevices from "../../Hooks/useMediaDevices";
import Message from "../Message";
import "./styles.css";
import VideoActions from "../VideoActions";

interface VideoPreviewProps {
    id?: string;
}

const VideoPreview: FunctionComponent<VideoPreviewProps> = ({
    id = "video",
}) => {
    const videoElementRef = useRef<HTMLVideoElement>(null);
    const { loading, hasError, stream } = useMediaDevices();

    useEffect(() => {
        if (videoElementRef.current && stream) {
            videoElementRef.current.srcObject = stream;
        }
    }, [stream]);

    if (loading) return <Message data="Loading..." />;

    if (hasError) return <Message data="Allow permissions" />;

    return (
        <div className="video-container">
            <VideoActions stream={stream} />
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
