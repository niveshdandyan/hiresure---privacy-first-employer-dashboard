import React from 'react';
import { User, HelpCircle, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 rounded-lg p-1.5">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">HireSure</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            <User size={18} />
            My Account
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            <HelpCircle size={18} />
            Help
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </nav>
        
        {/* Mobile menu placeholder */}
        <div className="md:hidden">
            <button className="p-2 text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;