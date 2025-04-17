import Image from 'next/image'

'use client';

import { useRouter } from 'next/navigation';
import PrimaryButton from '@/app/component/PrimaryButton'; // ✅ make sure path and casing are correct
import React from 'react';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white p-8 bg-gradient-to-b from-yellow-200 to-pink-200">
      <h1 className="text-6xl font-bold mb-15 text-center text-black">
        8-bit Photobooth
      </h1>

      <div className="flex flex-row gap-16 max-w-6xl w-full items-center justify-center">
        <div className="w-1/2 flex justify-center">
          <div className="w-64 h-64 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">
              <img
                src="/sunglasses.png"
                alt="8Bit image here"
                className="w-64 h-64 object-contain rounded-lg shadow-lg -rotate-12"
              />
            </span>
          </div>
        </div>
        
        <div className="flex flex-col gap-6 w-1/2 max-w-sm">
          <PrimaryButton
            label="Take Photos"
            onClick={() => router.push('/capture')}
          />
          <PrimaryButton
            label="Upload Photos"
            onClick={() => router.push('/upload')}
            color="green"
          />
        </div>

        <div className="w-1/2 flex justify-center">
          <div className="w-64 h-64 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">
              <img
                src="/heart.png"
                alt="8Bit image here"
                className="w-64 h-64 object-contain rounded-lg shadow-lg rotate-12"
              />
            </span>
          </div>
        </div>
      </div>

      <h3 className="mt-60 text-black text-sm font-mono">
        Made with ❤️ by{' '}
        <a
          href="https://github.com/jianlel"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-700 hover:text-blue-900 transition"
        >
          @jianlel
        </a>
      </h3>
    </main>
  );
}