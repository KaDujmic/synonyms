'use client';

import Link from "next/link";

/**
 * Footer component for the application
 * 
 * Features:
 * - Dark theme footer with multiple sections
 * - Brand information
 * - Features, Resources, and Connect links
 * - Copyright notice
 * - Responsive grid layout
 * 
 * @returns Footer component
 */
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SynonymHub</h3>
            <p className="text-gray-400">
              Your trusted companion for finding the perfect words.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/search" className="hover:text-white transition-colors">Search Synonyms</Link></li>
              <li><Link href="/create" className="hover:text-white transition-colors">Create Synonyms</Link></li>
              <li><Link href="/browse" className="hover:text-white transition-colors">Browse Collections</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/api" className="hover:text-white transition-colors">API Documentation</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SynonymHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
