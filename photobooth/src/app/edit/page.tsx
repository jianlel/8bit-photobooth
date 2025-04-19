'use client'

import { usePhotoContext } from '@/context/PhotoContext'
import PrimaryButton from '../component/PrimaryButton';
import { useRouter } from 'next/navigation';

export default function editPage() {
    
    // Typescript goes here
    const { images } = usePhotoContext();
    const router = useRouter();
    console.log('images', images);

    // HTML goes here
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-white p-8 bg-gradient-to-b from-yellow-200 to-pink-200">
            <div className='flex flex-col gap-4 w-[150px]'>
                <PrimaryButton
                    label="Preview?"
                    color='red'
                    onClick={() => {
                            console.log("Preview test")
                        }    
                    }
                />
                <PrimaryButton
                    label="Download?"
                    color='fuchsia'
                    onClick={() => {
                            console.log("Preview test")
                        }    
                    }
                />
                <PrimaryButton
                    label="Retake?"
                    color='indigo'
                    onClick={() => {
                            router.push('/capture')
                        }    
                    }
                />
                <PrimaryButton
                    label="Reupload?"
                    color='cyan'
                    onClick={() => {
                            router.push('/upload')
                        }    
                    }
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