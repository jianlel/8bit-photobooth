'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState} from 'react'
import PrimaryButton from '@/app/component/PrimaryButton';

export default function CapturePage() {
    // Put the typescript part here
    // FORMAT = const [val, setVal] = useState<Type>(initialValue);

    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [capturedImages, setCapturedImages] = useState<String[]>([]);
    const [status, setStatus] = useState<string>('');
    const [isCapturing, setIsCapturing] = useState(false);
    const [flash, setFlash] = useState(false);
    const [done, setDone] = useState(false);

    // webcam
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        });

    }, []);

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const runCountdown = async () => {
        for (let i = 3; i >= 1; i--) {
          setCountdown(i);
          await wait(1000);
        }
        setCountdown(null);
      };

    // Main photo sequence
    const startPhotoSequence = async () => {
        if (isCapturing || capturedImages.length >= 3) return;
    
        setIsCapturing(true);
    
        const messages = ['Get ready!', 'Here comes another!', 'Last one!'];
    
        for (let i = 0; i < 3; i++) {
            setStatus(messages[i]);
            await wait(1000);
            setStatus('');
            await runCountdown();
            takePhoto();
        }
    
        setStatus('You Look Great!');
        stopVideo();
        setIsCapturing(false);
        setDone(true);
    };

    const startRetake = async() => {
        setCapturedImages([]);
        setCountdown(null);
        setStatus('Retaking...');
        setDone(false);
        setIsCapturing(false);

        // Restart webcam
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }
        setStatus('')
    }

    const takePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            setCapturedImages(prev => [...prev, dataUrl]);
            setFlash(true);
            setTimeout(() => setFlash(false), 150);
        }
    };

    const stopVideo = () => {
        const video = videoRef.current;
        const stream = video?.srcObject as MediaStream;

        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop(); 
            });

            video.srcObject = null;
        }
    }

    // Put the HTML part here

    return(
        <main className="min-h-screen flex flex-col items-center justify-center text-white p-8 bg-gradient-to-b from-yellow-200 to-pink-200">
            <div className="w-[640px]">
                {!done && !isCapturing ? (
                    <PrimaryButton
                        label="Looking good, Take a Photo?"
                        onClick={startPhotoSequence}
                        color="blue"
                    />
                    ) : done ? (
                    <div className="flex gap-6 w-[640px]">
                        <PrimaryButton
                        label="Edit Photos"
                        onClick={() => router.push('/edit')}
                        color="red"
                        />
                        <PrimaryButton
                        label="Retake?"
                        onClick={startRetake}
                        color="green"
                        />
                    </div>
                    ) : null}
            </div>

            <div className="relative w-[640px] h-[480px] mt-3">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full rounded-lg bg-gray-800 shadow-lg"
                />

                {(countdown !== null || status) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 rounded-lg">
                    {status && (
                        <div className="text-2xl font-bold text-white mb-2">{status}</div>
                    )}
                    {countdown !== null && (
                        <div className="text-7xl font-extrabold text-yellow-400 drop-shadow-md">
                        {countdown}
                        </div>
                    )}
                    </div>
                )}

                {flash && (
                    <div className="absolute inset-0 bg-white opacity-80 rounded-lg pointer-events-none transition-opacity duration-150" />
                )}
            </div>

            <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="hidden"
            />

            <div className="flex gap-8 mt-6">
                {[0, 1, 2].map((idx) => (
                    <div
                    key={idx}
                    className="w-32 h-24 flex items-center justify-center rounded-xl border-3 border-double border-gray-400 bg-white text-sm text-gray-600"
                    >
                    {capturedImages[idx] ? (
                        <img
                        src={capturedImages[idx]}
                        alt={`Capture ${idx + 1}`}
                        className="w-full h-full object-cover rounded"
                        />
                    ) : (
                        `Slot ${idx + 1}`
                    )}
                    </div>
                ))}
            </div>
            
        </main>
    );
}