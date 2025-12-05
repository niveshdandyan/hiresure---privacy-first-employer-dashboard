import React from 'react';
import { ChevronDown, Filter } from 'lucide-react';

const FilterButton: React.FC<{ label: string }> = ({ label }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
    {label}
    <ChevronDown size={14} className="text-gray-400" />
  </button>
);

const FilterBar: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200 overflow-x-auto">
        <div className="flex items-center gap-2 text-gray-500 mr-2">
            <Filter size={16} />
            <span className="text-sm font-medium uppercase tracking-wider">Filters:</span>
        </div>
      <div className="flex gap-3">
        <FilterButton label="Experience" />
        <FilterButton label="Nationality" />
        <FilterButton label="Agency" />
        <FilterButton label="Availability" />
      </div>
    </div>
  );
};

export default FilterBar;