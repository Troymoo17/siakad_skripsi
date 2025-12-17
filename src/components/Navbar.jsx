import React from 'react';

const Navbar = ({ toggleSidebar, mahasiswaData }) => {
  return (
    <nav className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="hidden md:block font-semibold text-gray-700">SIAKAD Institut Widya Pratama</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-medium text-gray-900 leading-none">{mahasiswaData?.nama || 'Memuat...'}</p>
          <p className="text-[10px] text-gray-500 mt-1">{mahasiswaData?.nim || '...'}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs border border-blue-200">
          {mahasiswaData?.nama?.charAt(0) || 'U'}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;