'use client';

import { useRouter } from 'next/navigation';
import PrimaryButton from '@/app/component/PrimaryButton';
import React from 'react';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-200 to-pink-200 text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-6xl font-bold mb-15 text-center text-black">
          8-bit Photobooth
        </h1>

        <div className="flex flex-row gap-16 max-w-6xl w-full items-center justify-center">
          <div className="w-1/2 flex justify-center">
            <div className="w-64 h-64 rounded-lg flex items-center justify-center">
              <Image
                src="/sunglasses.png"
                alt="8Bit image here"
                width={300}
                height={300}
                className="object-contain rounded-lg shadow-lg -rotate-12"
              />
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
              <Image
                src="/heart.png"
                alt="8Bit image there"
                width={300}
                height={300}
                className="object-contain rounded-lg shadow-lg rotate-12"
              />
            </div>
          </div>
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
