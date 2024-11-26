import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="font-bold text-xl">PayRoll</h3>
            <p className="text-sm text-gray-600">© 2024 All rights reserved.</p>
          </div>

          {/* Navigation */}
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-gray-600 hover:text-black transition-colors">About</a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">Products</a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">Contact</a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">Blog</a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-black transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-black transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;