import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import profileImage from '../assets/22.240.0007.jpg';

const Sidebar = ({ mahasiswaData, isSidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('loggedInUserNim');
        navigate('/');
    };

    const [isRegistrasiOpen, setRegistrasiOpen] = useState(false);
    const [isKeuanganOpen, setKeuanganOpen] = useState(false);
    const [isHistoriOpen, setHistoriOpen] = useState(false);
    const [isPerkuliahanOpen, setPerkuliahanOpen] = useState(false);
    const [isUjianNilaiOpen, setUjianNilaiOpen] = useState(false);
    const [isBimbinganOpen, setBimbinganOpen] = useState(false);

    const toggleDropdown = (setter) => setter(prev => !prev);

    const handleLinkClick = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    return (
        <aside
            id="sidebar"
            className={`bg-white w-64 min-h-screen py-4 px-2 shadow-xl border-r border-gray-100 flex flex-col transition-all duration-300 fixed z-50 inset-y-0 left-0 md:static md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="flex items-center space-x-2 px-2 pb-4 border-b border-gray-200 mb-4">
                <img src={logo} alt="Logo Institut Widya Pratama" className="w-16 h-14" />
                <span className="font-bold text-lg text-blue-900">INSTITUT WIDYA PRATAMA</span>
            </div>
            <NavLink to="/dashboard/profile" onClick={handleLinkClick} className="bg-white border border-gray-200 rounded-xl shadow-sm mb-5 px-3 pt-3 pb-2 flex flex-col items-center">
                <img src={profileImage} alt="Foto Pengguna" className="w-16 h-18 mb-1 rounded" />
                <div id="profile-nama" className="text-xs text-gray-500 mb-1 mt-1">{mahasiswaData?.nama || 'Memuat...'}</div>
                <div id="profile-nim" className="font-semibold text-blue-900 text-base mb-1">{mahasiswaData?.nim || 'Memuat...'}</div>
            </NavLink>
            <nav className="flex-1 space-y-1 text-sm px-1">
                <NavLink to="/dashboard" onClick={handleLinkClick} end className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>
                    <span>Beranda</span>
                </NavLink>

                <div onClick={() => toggleDropdown(setRegistrasiOpen)} className="sidebar-dropdown-toggle flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 cursor-pointer">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span>Registrasi</span>
                    </div>
                    <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isRegistrasiOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
                <div className={`submenu ${isRegistrasiOpen ? 'block' : 'hidden'} space-y-1 pl-6 pt-1`}>
                    <NavLink to="/dashboard/registrasi/kurikulum" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Kurikulum</span></NavLink>
                    <NavLink to="/dashboard/registrasi/krs" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Kartu Rencana Studi</span></NavLink>
                    <NavLink to="/dashboard/registrasi/kmk" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Kartu Mata Kuliah</span></NavLink>
                    <NavLink to="/dashboard/registrasi/ikad-ikas" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Kuesioner IKAD/IKAS</span></NavLink>
                    <NavLink to="/dashboard/registrasi/pengajuan_magang" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Pengajuan Magang</span></NavLink>
                    <NavLink to="/dashboard/registrasi/pengajuan_judul" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Pengajuan Judul</span></NavLink>
                    <NavLink to="/dashboard/registrasi/pengajuan_ujian" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Pengajuan Ujian</span></NavLink>
                </div>
                
                <div onClick={() => toggleDropdown(setKeuanganOpen)} className="sidebar-dropdown-toggle flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 cursor-pointer">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Keuangan</span>
                    </div>
                    <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isKeuanganOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
                <div className={`submenu ${isKeuanganOpen ? 'block' : 'hidden'} space-y-1 pl-6 pt-1`}>
                    <NavLink to="/dashboard/keuangan/pembayaran" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Tagihan / Pembayaran</span></NavLink>
                </div>

                <div onClick={() => toggleDropdown(setHistoriOpen)} className="sidebar-dropdown-toggle flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 cursor-pointer">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Histori</span>
                    </div>
                    <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isHistoriOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
                <div className={`submenu ${isHistoriOpen ? 'block' : 'hidden'} space-y-1 pl-6 pt-1`}>
                    <NavLink to="/dashboard/histori/histori_pinjaman" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Histori Pinjaman</span></NavLink>
                    <NavLink to="/dashboard/histori/pointbook" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Point Book</span></NavLink>
                </div>

                <div onClick={() => toggleDropdown(setPerkuliahanOpen)} className="sidebar-dropdown-toggle flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 cursor-pointer">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.484 9.352 5 7.636 5H4.25c-1.243 0-2.25 1.007-2.25 2.25v10.5c0 1.243 1.007 2.25 2.25 2.25h3.386c1.716 0 3.196.484 4.364 1.253m0-13C13.168 5.484 14.648 5 16.364 5h3.386c1.243 0 2.25 1.007 2.25 2.25v10.5c0 1.243-1.007 2.25-2.25 2.25h-3.386c-1.716 0-3.196-.484-4.364-1.253" />
                        </svg>
                        <span>Perkuliahan</span>
                    </div>
                    <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isPerkuliahanOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
                <div className={`submenu ${isPerkuliahanOpen ? 'block' : 'hidden'} space-y-1 pl-6 pt-1`}>
                    <NavLink to="/dashboard/perkuliahan/jadwalKuliah" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Jadwal Kuliah</span></NavLink>
                    <NavLink to="/dashboard/perkuliahan/kehadiran" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Kehadiran</span></NavLink>
                </div>

                <div onClick={() => toggleDropdown(setUjianNilaiOpen)} className="sidebar-dropdown-toggle flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 cursor-pointer">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6 4h6" />
                        </svg>
                        <span>Ujian dan Nilai</span>
                    </div>
                    <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isUjianNilaiOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
                <div className={`submenu ${isUjianNilaiOpen ? 'block' : 'hidden'} space-y-1 pl-6 pt-1`}>
                    <NavLink to="/dashboard/ujian-dan-nilai/jadwalUjian" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Jadwal Ujian</span></NavLink>
                    <NavLink to="/dashboard/ujian-dan-nilai/kartu-hasil-studi" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Kartu Hasil Studi</span></NavLink>
                    <NavLink to="/dashboard/ujian-dan-nilai/daftar-nilai-kumulatif" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Daftar Nilai Kumulatif</span></NavLink>
                </div>
                <div onClick={() => toggleDropdown(setBimbinganOpen)} className="sidebar-dropdown-toggle flex items-center justify-between py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 cursor-pointer">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.484 9.352 5 7.636 5H4.25c-1.243 0-2.25 1.007-2.25 2.25v10.5c0 1.243 1.007 2.25 2.25 2.25h3.386c1.716 0 3.196.484 4.364 1.253m0-13C13.168 5.484 14.648 5 16.364 5h3.386c1.243 0 2.25 1.007 2.25 2.25v10.5c0 1.243-1.007 2.25-2.25 2.25h-3.386c-1.716 0-3.196-.484-4.364-1.253" /></svg>
                        <span>Bimbingan</span>
                    </div>
                    <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isBimbinganOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </div>
                <div className={`submenu ${isBimbinganOpen ? 'block' : 'hidden'} space-y-1 pl-6 pt-1`}>
                    <NavLink to="/dashboard/bimbingan/proposal" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Proposal</span></NavLink>
                    <NavLink to="/dashboard/bimbingan/skripsi" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Skripsi/TA</span></NavLink>
                    <NavLink to="/dashboard/bimbingan/sidang" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><span>Sidang Skripsi/TA</span></NavLink>
                </div>
                <NavLink to="/dashboard/magang" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" /></svg>
                    <span>Upload</span>
                </NavLink>
                <NavLink to="/dashboard/download" onClick={handleLinkClick} className={({ isActive }) => `flex items-center space-x-2 py-2 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>Download</span>
                </NavLink>
            </nav>
            <div className="space-y-2 text-sm px-2 mt-auto border-t border-gray-200 pt-4">
                <button onClick={handleLogout} className="w-full flex items-center space-x-2 py-2 px-3 rounded-lg text-red-600 hover:bg-red-50 font-semibold transition duration-150">
                    <span>Keluar</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;