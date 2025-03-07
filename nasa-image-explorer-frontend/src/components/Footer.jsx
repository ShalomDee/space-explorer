import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">NASA Space Explorer</h3>
            <p className="text-gray-400">Exploring the universe one image at a time</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400 mb-2">
              Powered by NASA's Astronomy Picture of the Day API
            </p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Space Explorer. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;