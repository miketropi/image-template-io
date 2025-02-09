import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            {/* <Image src="/logo.png" alt="Logo" width={40} height={40} /> */}
            <Link href="/" className="text-gray-900 font-bold">Image Template / io</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-800 hover:text-gray-600 px-3 py-2">Home</Link>
              <Link href="/features" className="text-gray-800 hover:text-gray-600 px-3 py-2">Features</Link>
              <Link href="/pricing" className="text-gray-800 hover:text-gray-600 px-3 py-2">Pricing</Link>
              <Link href="/contact" className="text-gray-800 hover:text-gray-600 px-3 py-2">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 