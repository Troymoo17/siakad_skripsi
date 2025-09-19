// src/components/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getMahasiswaData } from '../api/api';

const DashboardLayout = () => {
  const [mahasiswaData, setMahasiswaData] = useState(null);
  const navigate = useNavigate();

  // Tambahkan state untuk mengelola sidebar di mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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

  // Fungsi untuk membuka/menutup sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row">
      <button
        id="toggleSidebar"
        className="md:hidden block fixed top-3 left-3 z-50 p-2 bg-white rounded shadow-lg border border-gray-100"
        aria-label="Buka Menu"
        onClick={toggleSidebar} // Tambahkan event handler di sini
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <Sidebar mahasiswaData={mahasiswaData} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div id="main-content-container" className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;