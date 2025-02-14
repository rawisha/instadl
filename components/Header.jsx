import { Instagram } from "lucide-react";
import Link from "next/link";

function Header() {
  return (
    <nav className="max-w-7xl mx-auto py-6">
      <Link href="/" className="cursor-pointer">
        <div className="flex items-center space-x-2">
          <Instagram className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">InstaDL</h1>
        </div>
      </Link>
    </nav>
  );
}
export default Header;
