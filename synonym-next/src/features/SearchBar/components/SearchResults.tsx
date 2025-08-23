'use client';

import { Synonym } from '@/types/Synonym.type';
import Link from 'next/link';

interface SearchResultsProps {
  setFocused: (focused: boolean) => void;
  results: Synonym[];
  setSearchTerm: (term: string) => void;
  searchTerm: string;
  isLoading: boolean;
  isFocused: boolean;
}

export const SearchResults = (props: SearchResultsProps) => {
  const { 
    setFocused,
    setSearchTerm,
    results,
    searchTerm,
    isLoading,
    isFocused
  } = props;

  if (isLoading && isFocused) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto mt-1">
        <div className="flex items-center justify-center p-4 text-gray-500 text-sm gap-2">
          <div className="w-4 h-4 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <span>Searching...</span>
        </div>
      </div>
    );
  }

  if (results.length === 0 && searchTerm.trim()) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto mt-1">
        <div className="p-4 text-center text-gray-500 text-sm">
          <span>No synonyms found for "{searchTerm}"</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto mt-1">
      {results.map((synonym) => (
        <Link
          key={synonym.slug}
          className="flex items-center justify-between p-3 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
          href={`/synonym/${synonym.slug}`}
          onClick={() => {
            setSearchTerm(synonym.word);
            setFocused(false);
          }}
        >
          <span className="font-medium text-gray-900">{synonym.word}</span>
          <span className="text-xs text-gray-500 font-mono">/{synonym.slug}</span>
        </Link>
      ))}
    </div>
  );
};
