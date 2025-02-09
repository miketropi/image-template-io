export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Privacy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Image Template IO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 