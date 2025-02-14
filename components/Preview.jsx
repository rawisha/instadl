"use client";

import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import axios from 'axios';

const Preview = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const displayUrl = userData.display_url;
    const videoUrl = userData.video_url;
    const isVideo = userData.isVideo;

    const handleDownload = async () => {
        setIsDownloading(true);
        const url = isVideo ? videoUrl : displayUrl;
        const filename = `${userData.username}_${isVideo ? "video.mp4" : "image.jpeg"}`;
    
        try {
            const response = await axios.get(isVideo ? url : `/api/instagram/download?url=${encodeURIComponent(url)}`, {
                responseType: 'blob', // Required for binary data
            });
    
    
            // Axios stores the binary data inside `response.data`
            const blob = response.data;
            const mimeType = blob.type || (isVideo ? "video/mp4" : "image/jpeg"); // Handle video type fallback
            const fileBlob = new Blob([blob], { type: mimeType });
            const downloadUrl = window.URL.createObjectURL(fileBlob);
    
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error("Download failed:", error);
        } finally {
            setIsDownloading(false);
        }
    };
    
    

    return (
        <div className='flex flex-col max-w-6xl items-center justify-center gap-5'>
            <div className="flex">
                {/* Video/Image Section (Left) */}
                <div className="w-full px-5 md:px-0 md:w-1/2 h-full">
                    {isVideo ? (
                        <video
                            src={videoUrl}
                            muted
                            autoPlay
                            preload="metadata"
                            className="w-full h-auto md:h-auto object-contain"
                            poster={displayUrl}
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <Image src={displayUrl} alt={userData.username} width={1080} height={1080} />
                    )}
                </div>

                {/* Content/Details Section (Right) */}
                <div className="md:w-1/2 mr-5 bg-black text-white p-4 hidden md:block">
                    {/* Header: User Info */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className='flex items-center justify-center gap-2'>
                            <Image src={userData?.profile_picture} alt={userData?.username} width={50} height={50} className='border rounded-full' />
                            <span className="font-bold mr-2">{userData?.username}</span>
                            </div>
                            <svg className="h-5 w-5 fill-blue-500" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l4.59-4.58L17 11l-6 6z" />
                            </svg>
                            <span className="ml-1"> • Follow</span>
                        </div>
                        <div>
                            <svg className="h-6 w-6" viewBox="0 0 24 24">
                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="text-gray-400 mb-2">InstaDL</div>

                    {/* Caption */}
                    <div className="mb-4 max-w-sm">
                        <span className="font-bold">{userData.username}</span> Feel free to download your own content at www.instadl.com 🤯 @eric_szk @mehdi_amri_10
                    </div>

                    {/* Time Posted */}
                    <div className="text-gray-400 mb-4">245w</div>

                    {/* Interaction Icons */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <Heart className="h-6 w-6" />
                            <MessageCircle className="h-6 w-6" />
                            <Send className="h-6 w-6" />
                        </div>
                        <Bookmark className="h-6 w-6" />
                    </div>

                    {/* Views and Date */}
                    <div className="text-gray-400 mb-4">
                        1,363,737 views<br />
                        June 1, 2020
                    </div>

                    {/* Login to like or comment */}
                    <div className="text-gray-400">Log in to like or comment.</div>
                </div>
            </div>

            {/* Download Button */}
            <div>
                <Button
                    className="p-8 text-lg bg-green-500 drop-shadow-xl text-white font-bold"
                    variant="ghost"
                    onClick={handleDownload}
                    disabled={isDownloading} // Disable while downloading
                >
                    {isDownloading ? "Downloading..." : "Download Content 🚀"}
                </Button>
            </div>
        </div>
    );
};

export default Preview;
