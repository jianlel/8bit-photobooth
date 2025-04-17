'use client';

import React, { useEffect, useRef, useState} from 'react'

export default function CapturePage() {
    // Put the typescript part here
    // FORMAT = const [val, setVal] = useState<Type>(initialValue);

    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [capturedImages, setCapturedImages] = useState<String[]>([]);

    // webcam
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        });
    }, []);

    const startCapture = ()

    // Put the HTML part here

    return(
        <main>
            Hello

        </main>
    );
}