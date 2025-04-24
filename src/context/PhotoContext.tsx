'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import React from "react";

type PhotoContextType = {
    images: string[];
    setImages: (images: string[]) => void;
    clearImages: () => void;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider = ({ children }: {children: React.ReactNode}) => {
    const [images, setImagesState] = useState<string[]>([]);

    const setImages = (newImages: string[]) => {
        setImagesState(newImages);
        localStorage.setItem('photobooth-images', JSON.stringify(newImages));
    };

    const clearImages = () => {
        setImagesState([]);
        localStorage.removeItem('photobooth-images');
    }

    useEffect(() => {
        const stored = localStorage.getItem('photobooth-images');
        if (stored) {
            setImagesState(JSON.parse(stored));
        }
    }, []);

    return (
        <PhotoContext.Provider value={{ images, setImages, clearImages }}>
            {children}
        </PhotoContext.Provider>
    );
};

export const usePhotoContext = () => {
    const context = useContext(PhotoContext);
    if(!context) {
        throw new Error('usePhotoContext must be used within a PhotoProvider');
    }
    return context;
};