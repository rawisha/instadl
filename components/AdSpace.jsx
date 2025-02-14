"use client";

import { useEffect, useRef } from 'react';



export default function AdSpace({ className = "", slot = "default" }) {
  const adRef = useRef(null);

  // useEffect(() => {
  //   // This is where we would initialize Google AdSense
  //   // For now, we'll just show a placeholder
  //   if (adRef.current) {
  //     adRef.current.innerHTML = ''; // Clear previous content
  //     adRef.current.classList.add('ad-space-placeholder');
  //   }
  // }, [slot]);

  return (
    <div 
      ref={adRef}
      className={`bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
      data-ad-slot={slot}
    >
      <p className="text-black text-sm">Advertisement Space</p>
    </div>
  );
}