'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react'
import PrimaryButton from '../component/PrimaryButton';
import { usePhotoContext } from '@/context/PhotoContext';
import Image from 'next/image';
import React from 'react';

export default function UploadPage() {
    
    // Typescript goes here
    const MAX_FILE_SIZE_MB = 5
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg']
    const { setImages } = usePhotoContext();
    const router = useRouter();
    const [uploadedImages, setUploadedImages] = useState<string[]>(['','','']);
    const [warning, setWarning] = useState(false);

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
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-200 to-pink-200 text-white">
          <main className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="h-5 mt-5 text-base transition-opacity duration-300 text-red-600 text-center">
              {warning ? (
                <span className="opacity-100">Please upload all 3 images before continuing!</span>
              ) : (
                <span className="opacity-0 select-none">xd</span>
              )}
            </div>
      
            <h1 className="text-4xl font-bold mt-15 mb-5 text-center text-black">
              Upload Your Photos!
            </h1>
      
            <div className="flex gap-6 mb-6">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, idx)}
                  onClick={() => document.getElementById(`file-upload-${idx}`)?.click()}
                  className="w-60 h-60 border-2 border-dashed border-gray-400 bg-white flex items-center justify-center rounded-xl cursor-pointer hover:border-blue-500 transition"
                >
                  {uploadedImages[idx] ? (
                    <Image
                      src={uploadedImages[idx]}
                      alt={`Uploaded ${idx + 1}`}
                      width={320}
                      height={480}
                      className="w-full h-full object-cover rounded-xl"
                      unoptimized 
                    />
                  ) : (
                    <span className="text-sm text-gray-500 text-center">Click or Drop</span>
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
                onClick={() => {
                  const isComplete = uploadedImages.every((img) => img !== '');
                  if (!isComplete) {
                    setWarning(true);
                    setTimeout(() => setWarning(false), 3000);
                    return;
                  }
                  setImages(uploadedImages);
                  router.push('/edit');
                }}
              />
            </div>
          </main>
      
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
        </div>
      );
}
