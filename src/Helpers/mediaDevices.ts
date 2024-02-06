export async function getUserMediaDevices(): Promise<MediaStream | null> {
    if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error("NotAvailable");
    }

    const stream: MediaStream = await navigator?.mediaDevices?.getUserMedia({
        video: true,
        audio: true,
    });

    return stream;
}
