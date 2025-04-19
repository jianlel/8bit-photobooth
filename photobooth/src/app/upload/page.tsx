'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react'
import PrimaryButton from '../component/PrimaryButton';
import React from 'react';

export default function uploadPage() {
    
    // Typescript goes here
    const MAX_FILE_SIZE_MB = 5
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg']
    const router = useRouter();
    const [uploadedImages, setUploadedImages] = useState<string[]>(['','','']);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            alert('Only JPG/JPEG/PNG files allowed!');
            return;
        }

        if (file.size > MAX_FILE_SIZE_MB*1024*1024) {
            alert(`File size should not exceed ${MAX_FILE_SIZE_MB}MB`);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setUploadedImages((prev) => {
                const copy = [...prev];
                const nextEmpty = copy.findIndex((v) => !v);
                if (nextEmpty !== -1) copy[nextEmpty] = reader.result as string;
                return copy;
            });
        };
        reader.readAsDataURL(file);
    }

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (!file) return;
      
        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImages((prev) => {
            const updated = [...prev];
            updated[index] = reader.result as string;
            return updated;
          });
        };
        reader.readAsDataURL(file);
      };

    // HTML goes here
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-white p-8 bg-gradient-to-b from-yellow-200 to-pink-200">
            <h1 className="text-4xl font-bold mb-15 text-center text-black">
                Upload Your Photo(s)!
            </h1>
 
            <div className="flex gap-6 mb-6">
                {[0, 1, 2].map((idx) => (
                <div
                    key={idx}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, idx)}
                    onClick={() => document.getElementById(`file-upload-${idx}`)?.click()}
                    className="w-40 h-40 border-2 border-dashed border-gray-400 bg-white flex items-center justify-center rounded-xl cursor-pointer hover:border-blue-500 transition"
                >
                    {uploadedImages[idx] ? (
                    <img
                        src={uploadedImages[idx]}
                        alt={`Uploaded ${idx + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                    />
                    ) : (
                    <span className="text-sm text-gray-500 text-center">
                        Click or Drop
                    </span>
                    )}

                    <input
                    id={`file-upload-${idx}`}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                    />
                </div>
                ))}
            </div>

            <div className="w-[200px]">
                <PrimaryButton
                    label="Edit?"
                    onClick={() => router.push('/edit')}
                />
            </div>
            
            <footer className="text-center py-4 text-black text-sm">
                Made with ❤️ by{' '}
                <a
                    href="https://github.com/jianlel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-700 hover:text-blue-900 transition"
                >
                    @jianlel
                </a>
            </footer>
        </main>
    );

}
