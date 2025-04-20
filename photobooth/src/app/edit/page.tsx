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

    const [activeLayout, setActiveLayout] = useState<'default' | 'pink-strip' | 'blue-strip'>('default');
    const [showPinkPhotostrip, setPinkPhotostrip] = useState(false);
    const [showBluePhotostrip, setBluePhotostrip] = useState(false);

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
    
            <div className="flex bg-white/70 rounded-xl shadow-lg p-6 gap-4 w-[400px]">
              <PrimaryButton
                label="Pink strip"
                color="pink"
                onClick={() => setActiveLayout(activeLayout === 'pink-strip' ? 'default' : 'pink-strip')}
              />
              <PrimaryButton
                label="Blue strip"
                color="blue"
                onClick={() => setActiveLayout(activeLayout === 'blue-strip' ? 'default' : 'blue-strip')}
              />
            </div>

            <div className="flex flex-col gap-4">
              {activeLayout === 'pink-strip' && (
                <div
                  ref={stripRef}
                  className="bg-pink-500 p-6 rounded-2xl shadow-2xl w-[250px] flex flex-col gap-4 items-center border-[8px] border-black"
                >
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Photo ${idx + 1}`}
                      className="w-50 h-50 object-cover rounded-lg shadow"
                    />
                  ))}
                </div>
              )}

              {activeLayout === 'blue-strip' && (
                <div
                  ref={stripRef}
                  className="bg-blue-500 p-6 rounded-2xl shadow-2xl w-[250px] flex flex-col gap-4 items-center border-[8px] border-black"
                >
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Photo ${idx + 1}`}
                      className="w-50 h-50 object-cover rounded-lg shadow"
                    />
                  ))}
                </div>
              )}

              {activeLayout === 'default' && (
                <div ref={stripRef} className="flex flex-col gap-4">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Photo ${idx + 1}`}
                      className="w-50 h-50 object-cover rounded-lg shadow"
                    />
                  ))}
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