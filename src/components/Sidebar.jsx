import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import profileImage from '../assets/22.240.0007.jpg';

const Sidebar = ({ mahasiswaData, isSidebarOpen, setSidebarOpen, isCollapsed }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('loggedInUserNim');
        navigate('/');
    };

    // State dropdown asli dari code Anda
    const [isRegistrasiOpen, setRegistrasiOpen] = useState(false);
    const [isKeuanganOpen, setKeuanganOpen] = useState(false);
    const [isHistoriOpen, setHistoriOpen] = useState(false);
    const [isPerkuliahanOpen, setPerkuliahanOpen] = useState(false);
    const [isUjianNilaiOpen, setUjianNilaiOpen] = useState(false);
    const [isBimbinganOpen, setBimbinganOpen] = useState(false);
    const [isSurveiOpen, setSurveiOpen] = useState(false);

    const toggleDropdown = (setter) => {
        if (isCollapsed && window.innerWidth >= 768) return; 
        setter(prev => !prev);
    };

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    return (
        <aside
            id="sidebar"
            className={`bg-white shadow-xl border-r border-gray-100 flex flex-col transition-all duration-300 fixed z-50 inset-y-0 left-0 md:static md:translate-x-0 overflow-y-auto 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}
        >
            {/* Logo Area */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2 px-4'} py-5 border-b border-gray-200 mb-4`}>
                <img src={logo} alt="Logo" className="w-12 h-10" />
                {!isCollapsed && <span className="font-bold text-sm text-blue-900 leading-tight">INSTITUT WIDYA PRATAMA</span>}
            </div>

            {/* Profile Section - Akan sembunyi jika isCollapsed true */}
            {!isCollapsed && (
                <NavLink to="/dashboard/profile" onClick={handleLinkClick} className="mx-3 bg-white border border-gray-200 rounded-xl shadow-sm mb-5 px-3 pt-3 pb-2 flex flex-col items-center">
                    <img src={profileImage} alt="Foto Pengguna" className="w-16 h-18 mb-1 rounded" />
                    <div id="profile-nama" className="text-xs text-gray-500 mb-1 mt-1 text-center">{mahasiswaData?.nama || 'Memuat...'}</div>
                    <div id="profile-nim" className="font-semibold text-blue-900 text-base mb-1">{mahasiswaData?.nim || 'Memuat...'}</div>
                </NavLink>
            )}

            <nav className="flex-1 space-y-1 text-sm px-2 overflow-y-auto">
                <NavLink to="/dashboard" onClick={handleLinkClick} end className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} py-2.5 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>
                    {!isCollapsed && <span>Beranda</span>}
                </NavLink>

                {/* Dropdown: Registrasi */}
                <div>
                    <div onClick={() => toggleDropdown(setRegistrasiOpen)} className={`sidebar-dropdown-toggle flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer`}>
                        <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            {!isCollapsed && <span>Registrasi</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isRegistrasiOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {!isCollapsed && (
                        <div className={`submenu ${isRegistrasiOpen ? 'block' : 'hidden'} space-y-1 pl-10 pt-1`}>
                            <NavLink to="/dashboard/registrasi/kurikulum" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Kurikulum</NavLink>
                            <NavLink to="/dashboard/registrasi/krs" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Kartu Rencana Studi</NavLink>
                            <NavLink to="/dashboard/registrasi/kmk" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Kartu Mata Kuliah</NavLink>
                            <NavLink to="/dashboard/registrasi/ikad-ikas" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Kuesioner IKAD/IKAS</NavLink>
                            <NavLink to="/dashboard/registrasi/pengajuan_magang" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Pengajuan Magang</NavLink>
                            <NavLink to="/dashboard/registrasi/pengajuan_judul" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Pengajuan Judul</NavLink>
                            <NavLink to="/dashboard/registrasi/pengajuan_ujian" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Pengajuan Ujian</NavLink>
                            <NavLink to="/dashboard/registrasi/hotspot" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Pendaftaran Hotspot</NavLink>
                        </div>
                    )}
                </div>
                
                {/* Dropdown: Keuangan */}
                <div>
                    <div onClick={() => toggleDropdown(setKeuanganOpen)} className={`sidebar-dropdown-toggle flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer`}>
                        <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            {!isCollapsed && <span>Keuangan</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isKeuanganOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {!isCollapsed && (
                        <div className={`submenu ${isKeuanganOpen ? 'block' : 'hidden'} space-y-1 pl-10 pt-1`}>
                            <NavLink to="/dashboard/keuangan/pembayaran" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Tagihan / Pembayaran</NavLink>
                        </div>
                    )}
                </div>

                {/* Dropdown: Histori */}
                <div>
                    <div onClick={() => toggleDropdown(setHistoriOpen)} className={`sidebar-dropdown-toggle flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer`}>
                        <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {!isCollapsed && <span>Histori</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isHistoriOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {!isCollapsed && (
                        <div className={`submenu ${isHistoriOpen ? 'block' : 'hidden'} space-y-1 pl-10 pt-1`}>
                            <NavLink to="/dashboard/histori/histori_pinjaman" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Histori Pinjaman Buku</NavLink>
                            <NavLink to="/dashboard/histori/pointbook" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Point Book</NavLink>
                        </div>
                    )}
                </div>

                {/* Dropdown: Perkuliahan */}
                <div>
                    <div onClick={() => toggleDropdown(setPerkuliahanOpen)} className={`sidebar-dropdown-toggle flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer`}>
                        <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.484 9.352 5 7.636 5H4.25c-1.243 0-2.25 1.007-2.25 2.25v10.5c0 1.243 1.007 2.25 2.25 2.25h3.386c1.716 0 3.196.484 4.364 1.253m0-13C13.168 5.484 14.648 5 16.364 5h3.386c1.243 0 2.25 1.007 2.25 2.25v10.5c0 1.243-1.007 2.25-2.25 2.25h-3.386c-1.716 0-3.196-.484-4.364-1.253" /></svg>
                            {!isCollapsed && <span>Perkuliahan</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isPerkuliahanOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {!isCollapsed && (
                        <div className={`submenu ${isPerkuliahanOpen ? 'block' : 'hidden'} space-y-1 pl-10 pt-1`}>
                            <NavLink to="/dashboard/perkuliahan/jadwalKuliah" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Jadwal Kuliah</NavLink>
                            <NavLink to="/dashboard/perkuliahan/kehadiran" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Kehadiran</NavLink>
                        </div>
                    )}
                </div>

                {/* Dropdown: Ujian & Nilai */}
                <div>
                    <div onClick={() => toggleDropdown(setUjianNilaiOpen)} className={`sidebar-dropdown-toggle flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer`}>
                        <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6 4h6" /></svg>
                            {!isCollapsed && <span>Ujian dan Nilai</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isUjianNilaiOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {!isCollapsed && (
                        <div className={`submenu ${isUjianNilaiOpen ? 'block' : 'hidden'} space-y-1 pl-10 pt-1`}>
                            <NavLink to="/dashboard/ujian-dan-nilai/jadwalUjian" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Jadwal Ujian</NavLink>
                            <NavLink to="/dashboard/ujian-dan-nilai/kartu-hasil-studi" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Kartu Hasil Studi</NavLink>
                            <NavLink to="/dashboard/ujian-dan-nilai/daftar-nilai-kumulatif" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Daftar Nilai Kumulatif</NavLink>
                        </div>
                    )}
                </div>

                {/* Dropdown: Bimbingan */}
                <div>
                    <div onClick={() => toggleDropdown(setBimbinganOpen)} className={`sidebar-dropdown-toggle flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer`}>
                        <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.484 9.352 5 7.636 5H4.25c-1.243 0-2.25 1.007-2.25 2.25v10.5c0 1.243 1.007 2.25 2.25 2.25h3.386c1.716 0 3.196.484 4.364 1.253m0-13C13.168 5.484 14.648 5 16.364 5h3.386c1.243 0 2.25 1.007 2.25 2.25v10.5c0 1.243-1.007 2.25-2.25 2.25h-3.386c-1.716 0-3.196-.484-4.364-1.253" /></svg>
                            {!isCollapsed && <span>Bimbingan</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isBimbinganOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {!isCollapsed && (
                        <div className={`submenu ${isBimbinganOpen ? 'block' : 'hidden'} space-y-1 pl-10 pt-1`}>
                            <NavLink to="/dashboard/bimbingan/proposal" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Proposal</NavLink>
                            <NavLink to="/dashboard/bimbingan/skripsi" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Skripsi/TA</NavLink>
                            <NavLink to="/dashboard/bimbingan/sidang" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Sidang Skripsi/TA</NavLink>
                        </div>
                    )}
                </div>

                {/* Dropdown: Survei */}
                <div>
                    <div onClick={() => toggleDropdown(setSurveiOpen)} className={`sidebar-dropdown-toggle flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer`}>
                        <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6 4h6" /></svg>
                            {!isCollapsed && <span>Survei Kepuasan</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-4 h-4 ml-auto transform transition-transform duration-200 ${isSurveiOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {!isCollapsed && (
                        <div className={`submenu ${isSurveiOpen ? 'block' : 'hidden'} space-y-1 pl-10 pt-1`}>
                            <NavLink to="/dashboard/survei-kepuasan/fasilitas" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Fasilitas</NavLink>
                            <NavLink to="/dashboard/survei-kepuasan/skripsi" onClick={handleLinkClick} className="block py-2 hover:text-blue-900">Skripsi</NavLink>
                        </div>
                    )}
                </div>

                {/* Upload & Download */}
                <NavLink to="/dashboard/magang" onClick={handleLinkClick} className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} py-2.5 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" /></svg>
                    {!isCollapsed && <span>Upload</span>}
                </NavLink>
                <NavLink to="/dashboard/download" onClick={handleLinkClick} className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} py-2.5 px-3 rounded-lg transition duration-150 ${isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    {!isCollapsed && <span>Download</span>}
                </NavLink>
            </nav>

            {/* Logout */}
            <div className="space-y-2 text-sm px-2 mt-auto border-t border-gray-200 pt-4 mb-4">
                <button onClick={handleLogout} className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-3'} py-2.5 rounded-lg text-red-600 hover:bg-red-50 font-semibold transition duration-150`}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    {!isCollapsed && <span>Keluar</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;