export async function getUserMediaDevices(): Promise<MediaStream | null> {
    try {
        if (!navigator?.mediaDevices?.getUserMedia) {
            return null;
        }

        const stream: MediaStream = await navigator?.mediaDevices?.getUserMedia(
            { video: true, audio: true }
        );

        return stream;
    } catch (error) {
        return null;
    }
}
