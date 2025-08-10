'use client';

import Link from "next/link";

/**
 * Header component for the application
 * 
 * Features:
 * - Sticky navigation bar with backdrop blur
 * - Brand logo that links to home
 * - Create Synonym button
 * - Responsive design
 * 
 * @returns Header component
 */
export const Header = () => {
  return (
    <nav className="bg-white backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              SynonymHub
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/create" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Create Synonym
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
