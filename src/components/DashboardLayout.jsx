import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { getMahasiswaData } from '../api/api';

const DashboardLayout = () => {
  const [mahasiswaData, setMahasiswaData] = useState(null);
  const navigate = useNavigate();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const nim = localStorage.getItem('loggedInUserNim');
    if (!nim) {
      navigate('/');
      return;
    }
    const fetchMahasiswa = async () => {
      const data = await getMahasiswaData(nim);
      setMahasiswaData(data);
    };
    fetchMahasiswa();
  }, [navigate]);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(!isSidebarOpen); 
    } else {
      setIsCollapsed(!isCollapsed); 
    }
  };

  return (
    <div className="bg-gray-50 h-screen flex overflow-hidden">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar 
        mahasiswaData={mahasiswaData} 
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        isCollapsed={isCollapsed}
      />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        <Navbar 
          toggleSidebar={toggleSidebar} 
          mahasiswaData={mahasiswaData} 
        />
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;