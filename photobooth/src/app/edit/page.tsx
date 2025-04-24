'use client'

import { usePhotoContext } from '@/context/PhotoContext'
import PrimaryButton from '../component/PrimaryButton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { accessoryOptions } from '@/utils/accessories';
import domtoimage from 'dom-to-image-more' 

export default function EditPage() {
    
    // Typescript goes here
    const { images } = usePhotoContext();
    const router = useRouter();
    const stripRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [stripLayout, setStripLayout] = useState<'default' | 'pink-strip' | 'indigo-strip'>('default');
    const [frameLayout, setFrameLayout] = useState<'default' | 'pixel' | 'glitch'>('default');
    const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
    
    const downloadStrip = async() => {
      if(!stripRef.current) return;

      domtoimage.toPng(stripRef.current, {
        bgcolor: 'transparent'
      }).then((dataUrl: string) => {
        const link = document.createElement('a');
        link.download = 'photostrip.png';
        link.href = dataUrl;
        link.click();
      }).catch((error: unknown) => {
        console.error('Download failed: ', error);
      })
    }

    const toggleAccessory = (id: string) => {
      setSelectedAccessories(prev => 
        prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
      );
    };

    const renderFramedImage = (img: string, idx: number) => (
      <div key={idx} className="relative w-50 h-50">
        <Image
          src={img}
          alt={`Photo ${idx + 1}`}
          fill
          className="object-cover rounded-lg shadow"
          unoptimized
        />
        
        {frameLayout === 'pixel' && (
          <Image
            src="/pixel_frame.png"
            alt="Pixel Frame"
            fill
            className="object-cover pointer-events-none"
            unoptimized
          />
        )}
        {frameLayout === 'glitch' && (
          <Image
            src="/glitch_frame.png"
            alt="Glitch Frame"
            fill
            className="object-cover pointer-events-none"
            unoptimized
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
            <div className="flex flex-col gap-6 bg-white/70 rounded-xl shadow-lg p-6 w-[500px] text-black">
              {/* Strip Group */}
              <div>
                <h2 className="text-lg font-bold mb-3 text-center">Photostrip!</h2>
                <div className="flex gap-4">
                  <PrimaryButton
                    label="Pink"
                    color="pink"
                    onClick={() =>
                      setStripLayout(stripLayout === 'pink-strip' ? 'default' : 'pink-strip')
                    }
                  />
                  <PrimaryButton
                    label="Indigo"
                    color='indigo'
                    onClick={() =>
                      setStripLayout(stripLayout === 'indigo-strip' ? 'default' : 'indigo-strip')
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
                  <div className='flex gap-4'>
                    <PrimaryButton
                    label="Hearts ❤️"
                    color='rose'
                    onClick={() =>
                      toggleAccessory('heart')
                    }
                  />
                  <PrimaryButton
                    label="Sunglasses 😎"
                    color='cyan'
                    onClick={() =>
                      toggleAccessory('sunglasses')
                    }
                  />
                  <PrimaryButton
                    label="Gameboy"
                    color='green'
                    onClick={() =>
                      toggleAccessory('gameboy')
                    }
                  />
                  </div>
              </div>
            </div>

            {/* Image display here */}
            <div ref={stripRef} className="relative w-fit h-fit">
              <div
                className={`
                  flex flex-col gap-4 items-center w-[250px] p-6 rounded-2xl shadow-2xl border-[8px]
                  ${stripLayout === 'pink-strip' ? 'bg-pink-500 border-black' : ''}
                  ${stripLayout === 'indigo-strip' ? 'bg-indigo-500 border-black' : ''}
                  ${stripLayout === 'default' ? 'bg-transparent border-transparent' : ''}
                `}
              >
                {images.map(renderFramedImage)}
              </div>

              {/* Show all selected accessories */}
              {accessoryOptions
                .filter(option => selectedAccessories.includes(option.id))
                .flatMap((option) =>
                  option.position.map((pos, index) => (
                    <div
                      key={`${option.id}-${index}`}
                      className={`absolute ${pos} ${option.size} pointer-events-none`}
                    >
                      <Image
                        src={option.src}
                        alt={option.alt}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ))
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