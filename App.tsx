import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import CandidateCard from './components/CandidateCard';
import { MOCK_CANDIDATES } from './services/mockData';
import { analyzeSearchQuery } from './services/geminiService';
import { Candidate } from './types';

const App: React.FC = () => {
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [interpretedIntent, setInterpretedIntent] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query) {
      setFilteredCandidates(MOCK_CANDIDATES);
      setInterpretedIntent('');
      setIsAnalyzing(false);
      return;
    }

    setIsAnalyzing(true);
    
    // Call Gemini to interpret the query
    const result = await analyzeSearchQuery(query);
    
    setInterpretedIntent(result.interpretedIntent);
    
    // Filter candidates based on Gemini's interpreted intent and keywords
    const keywords = result.keywords.map(k => k.toLowerCase());
    const intent = result.interpretedIntent.toLowerCase();

    const results = MOCK_CANDIDATES.filter(candidate => {
      // Create a searchable string from candidate attributes
      const candidateString = `
        ${candidate.skills.map(s => s.name).join(' ')} 
        ${candidate.agencyName} 
        ${candidate.nationality} 
        ${candidate.experienceYears} years
      `.toLowerCase();

      // Check if any keyword matches
      const matchesKeyword = keywords.some(k => candidateString.includes(k));
      
      // Also check if the high-level intent matches specific skills directly
      const matchesIntent = candidate.skills.some(s => s.name.toLowerCase().includes(intent));

      return matchesKeyword || matchesIntent;
    });

    setFilteredCandidates(results);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search Section */}
        <section className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find the Perfect Helper</h1>
          <p className="text-gray-500 mb-8">Search by skills, needs, or keywords. We protect privacy first.</p>
          <SearchBar 
            onSearch={handleSearch} 
            interpretedIntent={interpretedIntent} 
            isAnalyzing={isAnalyzing}
          />
        </section>

        {/* Filters */}
        <FilterBar />

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Search Results 
            <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
              {filteredCandidates.length} Profiles Found
            </span>
          </h2>
        </div>

        {/* Grid */}
        {filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No candidates found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} HireSure. All rights reserved.</p>
          <p className="mt-2">Privacy Protected • Verified Agencies • Secure Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default App;