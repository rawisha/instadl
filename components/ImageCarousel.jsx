import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import axios from 'axios';

const ImageCarousel = ({ images = [], isVideo = false, userData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  // Ensure there are images or display_url before rendering
  if (!images.length && !userData?.display_url) {
    return <div>No content available</div>;
  }

  // Function to go to the next image
  const nextImage = () => {
    if (images.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  // Function to go to the previous image
  const prevImage = () => {
    if (images.length > 1) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  // Function to handle the download action
  const handleDownload = async () => {
    setIsDownloading(true);

    let downloadUrl = '';
    let filename = '';

    // Determine whether it's an image, video, or carousel image
    if (isVideo) {
      downloadUrl = images[currentIndex] || userData?.display_url; // Video URL
      filename = `${userData?.username || 'download'}_video.mp4`;
    } else if (images.length > 0) {
      downloadUrl = images[currentIndex]; // Carousel Image URL
      filename = `${userData?.username || 'download'}_image_${currentIndex + 1}.jpeg`;
    } else {
      downloadUrl = userData?.display_url; // Single Image URL
      filename = `${userData?.username || 'download'}_image.jpeg`;
    }

    try {
      const response = await axios.get(`/api/instagram/download?url=${encodeURIComponent(downloadUrl)}`, {
        responseType: 'blob', // Required for binary data
      });

      const blob = response.data;
      const mimeType = blob.type || (isVideo ? "video/mp4" : "image/jpeg"); // Handle mime type
      const fileBlob = new Blob([blob], { type: mimeType });
      const objectURL = window.URL.createObjectURL(fileBlob);

      const link = document.createElement("a");
      link.href = objectURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Content Display */}
      <div className="relative w-full h-auto overflow-hidden">
        <Image
          src={isVideo ? images[currentIndex] : (images.length > 0 ? images[currentIndex] : userData?.display_url)}
          alt="Carousel content"
          width={1080}
          height={1080}
          className="object-cover w-full h-full"
        />

        {/* Download button */}
        <button
          onClick={handleDownload}
          className="absolute top-4 right-4 z-10 p-2 bg-green-600 rounded-full text-white"
          disabled={isDownloading}
        >
          {isDownloading ? "Downloading..." : <Download className="text-white" size={24} />}
        </button>
      </div>

      {/* Controls for carousel */}
      {images.length > 1 && userData?.isCarousel && (
        <div>
          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2 z-10"
          >
            <ArrowLeft />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2 z-10"
          >
            <ArrowRight />
          </button>

          {/* Image index indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 w-[20%] py-2 text-center text-white font-bold">
            {currentIndex + 1}/{images.length} Images
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
