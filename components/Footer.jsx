import AdSpace from "./AdSpace"

function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">About InstaDL</h3>
              <p className="text-gray-600">
                InstaDL is a free tool that helps you download YOUR Instagram content in high quality. 
                We support various types of content including videos, photos, stories, reels, and IGTV.
              </p>
            </div>
            <div>
              {/* Sidebar Ad Space */}
              <AdSpace className="h-[300px]" slot="sidebar-rectangle" />
            </div>
          </div>
        </div>
      </footer>
  )
}
export default Footer