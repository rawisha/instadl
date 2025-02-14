import { CheckCircle } from 'lucide-react';
import AdSpace from './AdSpace';

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-4">
        All features of InstaDL
      </h2>
      <p className="text-center text-gray-600 mb-12">
        InstaDL™ supports all types of Instagram videos/images links
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
            alt="Instagram post example"
            className="rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">
            Instagram video downloader
          </h3>
          <p className="text-gray-600 mb-6">
            InstalDL allows you to Download Instagram Video from your own content. InstalDL supports downloading videos for many video types from Instagram.
          </p>

          <div className="space-y-4">
            <Feature text="Download Instagram videos in HD quality" />
            <Feature text="No registration required" />
            <Feature text="Support for Reels, Stories, and IGTV" />
            <Feature text="Fast and secure downloads" />
            <Feature text="Compatible with all devices" />
          </div>

          {/* Features Section Ad Space */}
          <div className="mt-8">
            <AdSpace className="h-[250px]" slot="features-rectangle" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center space-x-2">
      <CheckCircle className="w-5 h-5 text-green-500" />
      <span>{text}</span>
    </div>
  );
}