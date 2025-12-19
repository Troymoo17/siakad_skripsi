import React from 'react';

const Navbar = ({ toggleSidebar, mahasiswaData }) => {
  return (
    <nav className="bg-gradient-to-r from-[#005c97] to-[#363795] shadow-md h-16 flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-white/10 text-white/90 hover:text-white transition-all duration-200"
          aria-label="Toggle Sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="flex flex-col">
          <span className="md:block font-bold text-white tracking-tight leading-none">
            SIAKAD
          </span>
          <span className="md:block text-[10px] text-blue-100/80 font-medium tracking-wider uppercase mt-1">
            Institut Widya Pratama
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-white leading-none tracking-wide">
            {mahasiswaData?.nama || 'Memuat...'}
          </p>
          <p className="text-[10px] text-blue-200 mt-1 font-medium">
            {mahasiswaData?.nim || '...'}
          </p>
        </div>
        
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-sm border border-white/30 shadow-sm">
          {mahasiswaData?.nama?.charAt(0) || 'U'}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;