import React, { useState, useEffect, useRef } from 'react';
import { Search, Zap, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  interpretedIntent: string;
  isAnalyzing: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, interpretedIntent, isAnalyzing }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearch = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (debouncedSearch.current) {
      clearTimeout(debouncedSearch.current);
    }

    // Debounce the search to simulate "as you type" but respectful of API limits
    debouncedSearch.current = setTimeout(() => {
      onSearch(value);
    }, 600);
  };

  const clearSearch = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 relative">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm text-lg"
          placeholder="Try searching 'Elderly care', 'Looking after grandma', or 'Nursing'..."
        />
        {inputValue && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Semantic Analysis Indicator */}
      <div className={`mt-3 flex items-center gap-2 text-sm transition-opacity duration-300 ${inputValue && (interpretedIntent || isAnalyzing) ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        {isAnalyzing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-gray-500">Analyzing intent...</span>
          </>
        ) : interpretedIntent ? (
          <>
            <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-600">
              AI Semantic Search active: Showing results for <span className="font-semibold text-blue-700">"{interpretedIntent}"</span>
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;