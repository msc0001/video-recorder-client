import { useCallback, useEffect, useState } from "react";
import { getUserMediaDevices } from "../Helpers/mediaDevices";

export default function useMediaDevices() {
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const handleMediaDevices = async () => {
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

        handleMediaDevices();

        return;
    }, []);

    return { loading, hasError, stream };
}
