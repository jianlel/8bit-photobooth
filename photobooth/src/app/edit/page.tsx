'use client'

import { usePhotoContext } from '@/context/PhotoContext'
import PrimaryButton from '../component/PrimaryButton';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import domtoimage from 'dom-to-image-more' 

export default function editPage() {
    
    // Typescript goes here
    const { images } = usePhotoContext();
    const router = useRouter();
    const stripRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [stripLayout, setStripLayout] = useState<'default' | 'pink-strip' | 'blue-strip'>('default');
    const [frameLayout, setFrameLayout] = useState<'default' | 'pixel' | 'glitch'>('default');

    
    const downloadStrip = async() => {
      if(!stripRef.current) return;

      domtoimage.toPng(stripRef.current).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'photostrip.png';
        link.href = dataUrl;
        link.click();
      }).catch((error) => {
        console.error('Download failed: ', error);
      })
    }

    const renderFramedImage = (img: string, idx: number) => (
      <div key={idx} className="relative w-50 h-50">
        <img
          src={img}
          alt={`Photo ${idx + 1}`}
          className="w-full h-full object-cover rounded-lg shadow"
        />
        {frameLayout === 'pixel' && (
          <img
            src="/pixel_frame.png"
            alt="Pixel Frame"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}
        {frameLayout === 'glitch' && (
          <img
          src="/glitch_frame.png"
          alt="Glitch Frame"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        )}
      </div>
    );

    // HTML goes here
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-200 to-pink-200 text-white">
          <main className="flex-1 flex items-center justify-center p-8 gap-20">
            <div className="flex flex-col gap-4 w-[150px]">
              <PrimaryButton
                label="Preview?"
                color="red"
                onClick={() => console.log('Preview test')}
              />
              <PrimaryButton
                label="Download?"
                color="fuchsia"
                onClick={downloadStrip}
              />
              <PrimaryButton
                label="Retake?"
                color="indigo"
                onClick={() => router.push('/capture')}
              />
              <PrimaryButton
                label="Reupload?"
                color="cyan"
                onClick={() => router.push('/upload')}
              />
            </div>
            
            {/* Buttons to add things to image */}
            <div className="flex flex-col gap-6 bg-white/70 rounded-xl shadow-lg p-6 w-[400px] text-black">
              {/* Strip Group */}
              <div>
                <h2 className="text-lg font-bold mb-3 text-center">Photostrip!</h2>
                <div className="flex gap-4">
                  <PrimaryButton
                    label="Pink strip"
                    color="pink"
                    onClick={() =>
                      setStripLayout(stripLayout === 'pink-strip' ? 'default' : 'pink-strip')
                    }
                  />
                  <PrimaryButton
                    label="Blue strip"
                    color="blue"
                    onClick={() =>
                      setStripLayout(stripLayout === 'blue-strip' ? 'default' : 'blue-strip')
                    }
                  />
                </div>
              </div>

              {/* Frame Group */}
              <div>
                <h2 className="text-lg font-bold mb-3 text-center">Frames!</h2>
                <div className="flex gap-4">
                  <PrimaryButton
                    label="Pixel"
                    color="fuchsia"
                    onClick={() =>
                      setFrameLayout(frameLayout === 'pixel' ? 'default' : 'pixel')
                    }
                  />
                  <PrimaryButton
                    label="Glitch"
                    color="indigo"
                    onClick={() =>
                      setFrameLayout(frameLayout === 'glitch' ? 'default' : 'glitch')
                    }
                  />
                </div>
              </div>

              {/* Accessories Group */}
              <div>
                <h2 className="text-lg font-bold mb-3 text-center">Accessories!</h2>

              </div>
            </div>

            {/* Image display here */}
            <div ref={stripRef} className="flex flex-col gap-4">
              {stripLayout === 'pink-strip' && (
                <div className="bg-pink-500 p-6 rounded-2xl shadow-2xl w-[250px] flex flex-col gap-6 items-center border-[8px] border-black">
                  {images.map(renderFramedImage)}
                </div>
              )}

              {stripLayout === 'blue-strip' && (
                <div className="bg-blue-500 p-6 rounded-2xl shadow-2xl w-[250px] flex flex-col gap-6 items-center border-[8px] border-black">
                  {images.map(renderFramedImage)}
                </div>
              )}

              {stripLayout === 'default' && (
                <div className="flex flex-col gap-4">
                  {images.map(renderFramedImage)}
                </div>
              )}
            </div>
          </main>

          <canvas ref={canvasRef} className="hidden" />
    
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