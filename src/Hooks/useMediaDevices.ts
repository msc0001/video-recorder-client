import { useCallback, useEffect, useRef, useState } from "react";
import { getUserMediaDevices } from "../Helpers/mediaDevices";

export default function useMediaDevices() {
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const mediaDeviceHandlerRef = useRef<CallableFunction>();

    mediaDeviceHandlerRef.current = async () => {
        setHasError(false);
        try {
            const mediaStream = await getUserMediaDevices();
            setStream(mediaStream);
        } catch (error) {
            setHasError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        mediaDeviceHandlerRef.current?.();
    }, []);

    const refresh = useCallback(() => {
        mediaDeviceHandlerRef.current?.();
    }, []);

    return { loading, hasError, stream, refresh };
}
