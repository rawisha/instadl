"use client"
import { Download, Camera, Video, PlaySquare, Film, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DownloadForm from '@/components/DownloadForm';
import Features from '@/components/Features';
import AdSpace from '@/components/AdSpace';
import Preview from '@/components/Preview';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

function ResultPage() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  
  return (
    <main>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-500 to-purple-700 min-h-[500px] px-4">
        <Header />

        {/* Top Ad Space */}
        <div className="max-w-3xl mx-auto mb-8">
          <AdSpace className="h-[90px]" slot="top-banner" />
        </div>

        {/* Content Type Selector */}
        <div className="max-w-3xl mx-auto pt-8 pb-4">
          <div className="md:flex justify-center space-x-4 mb-8 hidden">
            <Button variant="secondary" className="flex items-center gap-2">
              <Video className="w-4 h-4" /> Video ✅
            </Button>
            <Button variant="secondary" className="flex items-center gap-2">
              <Camera className="w-4 h-4" /> Photo ✅
            </Button>
            <Button variant="secondary" className="flex items-center gap-2">
              <PlaySquare className="w-4 h-4" /> Story ❌
            </Button>
            <Button variant="secondary" className="flex items-center gap-2">
              <Film className="w-4 h-4" /> Reel ✅
            </Button>
            <Button variant="secondary" className="flex items-center gap-2">
              <Film className="w-4 h-4" /> IGTV ❌
            </Button>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-4">
            Preview your Instagram content 🚀
          </h2>
          {(userData?.display_url || userData.video_url) && (
            <h2 className='text-2xl sm:text-3xl md:text-3xl text-center shadow-2xl rounded-br-full drop-shadow-2xl mb-5 bg-white border p-5 '><span className='bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent'>Your Content is ready to be downloaded </span>🚀✅</h2>
          )}
          
          <p className="text-center text-white mb-8">
            Download Instagram Video, Photo, Reels, Stories, IGTV online
          </p>

          <DownloadForm />
        </div>
      </div>

      {(userData?.display_url || userData.video_url) && (
        <div className='flex items-center justify-center mt-10'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl text-center '><span className='bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent'>Your Content is ready to be downloaded, Scroll Down !! </span>🚀✅</h2>
      </div>
      )}

      {/* Middle Ad Space */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdSpace className="h-[250px]" slot="middle-rectangle" />
      </div>

      {/* Features Section */}
      <div className='flex items-center justify-center'>
        <Preview />
      </div>

      {/* Bottom Ad Space */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdSpace className="h-[90px]" slot="bottom-banner" />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
export default ResultPage