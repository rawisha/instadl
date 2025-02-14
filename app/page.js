import {
  Download,
  Camera,
  Video,
  PlaySquare,
  Film,
  Instagram,
} from "lucide-react";

import DownloadForm from "@/components/DownloadForm";
import Features from "@/components/Features";
import AdSpace from "@/components/AdSpace";
import Footer from "@/components/Footer";
import ButtonItem from "@/components/ButtonItem";
import Header from "@/components/Header";

const buttonData = [
  { Icon: Video, text: "Video" },
  { Icon: Camera, text: "Photo" },
  { Icon: PlaySquare, text: "Story" },
  { Icon: Film, text: "Reel" },
  { Icon: Film, text: "IGTV" },
];

export default function Home() {
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
        <div className="sm:pb-5">
          <div className="sm:flex justify-center space-x-4 mb-8 hidden">
            {buttonData.map((item, index) => (
              <ButtonItem key={index} Icon={item.Icon} text={item.text} />
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Instagram Video Download
          </h2>
          <p className="text-center text-white mb-8">
            Download Instagram Video, Photo, Reels, Stories, IGTV online
          </p>

          <DownloadForm />
        </div>
      </div>

      {/* Middle Ad Space */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdSpace className="h-[250px]" slot="middle-rectangle" />
      </div>

      {/* Features Section */}
      <Features />

      {/* Bottom Ad Space */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdSpace className="h-[90px]" slot="bottom-banner" />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
