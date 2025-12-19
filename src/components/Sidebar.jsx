import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar = ({ mahasiswaData, isSidebarOpen, setSidebarOpen, isCollapsed }) => {
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

    const navLinkClass = ({ isActive }) => 
        `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} py-2.5 px-3 rounded-xl transition-all duration-200 ${
            isActive 
            ? 'bg-white/20 text-white font-bold shadow-inner backdrop-blur-md' 
            : 'text-blue-100 hover:bg-white/10 hover:text-white'
        }`;

    return (
        <aside
            id="sidebar"
            className={`bg-gradient-to-b from-[#005c97] to-[#363795] text-white flex flex-col transition-all duration-300 fixed z-50 inset-y-0 left-0 md:static md:translate-x-0 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            ${isCollapsed ? 'md:w-20' : 'md:w-66'}`}
        >
            {/* Logo Area */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-5'} py-6 border-b border-white/10 mb-4`}>
                <img src={logo} alt="Logo" className="w-10 h-8 brightness-0 invert" />
                {!isCollapsed && (
                    <div className="flex flex-col">
                        <span className="font-black text-xs tracking-tighter leading-none">INSTITUT</span>
                        <span className="font-light text-[10px] tracking-widest opacity-80 uppercase">Widya Pratama</span>
                    </div>
                )}
            </div>

            {/* Profile Section */}
            {!isCollapsed && (
                <NavLink to="/dashboard/profile" onClick={handleLinkClick} className="mx-4 bg-white/10 border border-white/20 rounded-2xl p-4 mb-6 flex flex-col items-center backdrop-blur-sm transition-transform hover:scale-[1.02]">
                    <div className="relative">
            {mahasiswaData?.foto_profil_url ? (
                <img 
                    src={mahasiswaData.foto_profil_url} 
                    alt="Foto Profil" 
                    className="w-16 h-16 mb-3 rounded-full border-2 border-white object-cover shadow-lg" 
                    id="profile-img" 
                    onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://ui-avatars.com/api/?name=" + mahasiswaData?.nama;
                }}
                />
            ) : (
                <div className="w-16 h-16 mb-3 rounded-full border-2 border-white bg-gradient-to-tr from-blue-100 to-white flex items-center justify-center text-blue-600 font-bold text-2xl shadow-lg">
                    {mahasiswaData?.nama?.charAt(0) || 'U'}
                </div>
            )}
        </div>
                    <div className="text-[10px] text-blue-200 uppercase font-bold tracking-widest mb-1 text-center line-clamp-1">
                        {mahasiswaData?.nama || 'Memuat...'}
                    </div>
                    <div className="font-mono text-sm text-white font-bold tracking-wider">
                        {mahasiswaData?.nim || '...'}
                    </div>
                </NavLink>
            )}

            {/* Navigation Scroll Area */}
            <nav className="flex-1 space-y-1 text-sm px-3 overflow-y-auto custom-scrollbar">
                
                {/* Beranda */}
                <NavLink to="/dashboard" onClick={handleLinkClick} end className={navLinkClass}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></svg>
                    {!isCollapsed && <span>Beranda</span>}
                </NavLink>

                {/* Dropdown: Registrasi */}
                <div>
                    <div onClick={() => toggleDropdown(setRegistrasiOpen)} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-xl cursor-pointer transition-colors ${isRegistrasiOpen ? 'bg-white/5' : 'hover:bg-white/10'}`}>
                        <div className="flex items-center space-x-3 text-blue-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            {!isCollapsed && <span className="font-medium text-blue-50">Registrasi</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-3 h-3 transition-transform duration-300 ${isRegistrasiOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {isRegistrasiOpen && !isCollapsed && (
                        <div className="pl-11 space-y-1 mt-1 border-l border-white/10 ml-5 text-[13px]">
                            <NavLink to="/dashboard/registrasi/kurikulum" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Kurikulum</NavLink>
                            <NavLink to="/dashboard/registrasi/krs" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Kartu Rencana Studi</NavLink>
                            <NavLink to="/dashboard/registrasi/kmk" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Kartu Mata Kuliah</NavLink>
                            <NavLink to="/dashboard/registrasi/ikad-ikas" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Kuesioner IKAD/IKAS</NavLink>
                            <NavLink to="/dashboard/registrasi/pengajuan_magang" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Pengajuan Magang</NavLink>
                            <NavLink to="/dashboard/registrasi/pengajuan_judul" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Pengajuan Judul</NavLink>
                            <NavLink to="/dashboard/registrasi/pengajuan_ujian" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Pengajuan Ujian</NavLink>
                            <NavLink to="/dashboard/registrasi/hotspot" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Pendaftaran Hotspot</NavLink>
                        </div>
                    )}
                </div>

                {/* Dropdown: Keuangan */}
                <div>
                    <div onClick={() => toggleDropdown(setKeuanganOpen)} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-xl cursor-pointer transition-colors ${isKeuanganOpen ? 'bg-white/5' : 'hover:bg-white/10'}`}>
                        <div className="flex items-center space-x-3 text-blue-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            {!isCollapsed && <span className="font-medium text-blue-50">Keuangan</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-3 h-3 transition-transform duration-300 ${isKeuanganOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {isKeuanganOpen && !isCollapsed && (
                        <div className="pl-11 space-y-1 mt-1 border-l border-white/10 ml-5 text-[13px]">
                            <NavLink to="/dashboard/keuangan/pembayaran" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Tagihan / Pembayaran</NavLink>
                        </div>
                    )}
                </div>

                {/* Dropdown: Histori */}
                <div>
                    <div onClick={() => toggleDropdown(setHistoriOpen)} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-xl cursor-pointer transition-colors ${isHistoriOpen ? 'bg-white/5' : 'hover:bg-white/10'}`}>
                        <div className="flex items-center space-x-3 text-blue-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {!isCollapsed && <span className="font-medium text-blue-50">Histori</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-3 h-3 transition-transform duration-300 ${isHistoriOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {isHistoriOpen && !isCollapsed && (
                        <div className="pl-11 space-y-1 mt-1 border-l border-white/10 ml-5 text-[13px]">
                            <NavLink to="/dashboard/histori/histori_pinjaman" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Histori Pinjaman Buku</NavLink>
                            <NavLink to="/dashboard/histori/pointbook" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Point Book</NavLink>
                        </div>
                    )}
                </div>

                {/* Dropdown: Perkuliahan */}
                <div>
                    <div onClick={() => toggleDropdown(setPerkuliahanOpen)} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-xl cursor-pointer transition-colors ${isPerkuliahanOpen ? 'bg-white/5' : 'hover:bg-white/10'}`}>
                        <div className="flex items-center space-x-3 text-blue-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.484 9.352 5 7.636 5H4.25c-1.243 0-2.25 1.007-2.25 2.25v10.5c0 1.243 1.007 2.25 2.25 2.25h3.386c1.716 0 3.196.484 4.364 1.253m0-13C13.168 5.484 14.648 5 16.364 5h3.386c1.243 0 2.25 1.007 2.25 2.25v10.5c0 1.243-1.007 2.25-2.25 2.25h-3.386c-1.716 0-3.196-.484-4.364-1.253" /></svg>
                            {!isCollapsed && <span className="font-medium text-blue-50">Perkuliahan</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-3 h-3 transition-transform duration-300 ${isPerkuliahanOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {isPerkuliahanOpen && !isCollapsed && (
                        <div className="pl-11 space-y-1 mt-1 border-l border-white/10 ml-5 text-[13px]">
                            <NavLink to="/dashboard/perkuliahan/jadwalKuliah" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Jadwal Kuliah</NavLink>
                            <NavLink to="/dashboard/perkuliahan/kehadiran" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Kehadiran</NavLink>
                        </div>
                    )}
                </div>

                {/* Dropdown: Ujian & Nilai */}
                <div>
                    <div onClick={() => toggleDropdown(setUjianNilaiOpen)} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-xl cursor-pointer transition-colors ${isUjianNilaiOpen ? 'bg-white/5' : 'hover:bg-white/10'}`}>
                        <div className="flex items-center space-x-3 text-blue-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6 4h6" /></svg>
                            {!isCollapsed && <span className="font-medium text-blue-50">Ujian dan Nilai</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-3 h-3 transition-transform duration-300 ${isUjianNilaiOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {isUjianNilaiOpen && !isCollapsed && (
                        <div className="pl-11 space-y-1 mt-1 border-l border-white/10 ml-5 text-[13px]">
                            <NavLink to="/dashboard/ujian-dan-nilai/jadwalUjian" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Jadwal Ujian</NavLink>
                            <NavLink to="/dashboard/ujian-dan-nilai/kartu-hasil-studi" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Kartu Hasil Studi</NavLink>
                            <NavLink to="/dashboard/ujian-dan-nilai/daftar-nilai-kumulatif" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Daftar Nilai Kumulatif</NavLink>
                        </div>
                    )}
                </div>

                {/* Dropdown: Bimbingan */}
                <div>
                    <div onClick={() => toggleDropdown(setBimbinganOpen)} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-xl cursor-pointer transition-colors ${isBimbinganOpen ? 'bg-white/5' : 'hover:bg-white/10'}`}>
                        <div className="flex items-center space-x-3 text-blue-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.484 9.352 5 7.636 5H4.25c-1.243 0-2.25 1.007-2.25 2.25v10.5c0 1.243 1.007 2.25 2.25 2.25h3.386c1.716 0 3.196.484 4.364 1.253m0-13C13.168 5.484 14.648 5 16.364 5h3.386c1.243 0 2.25 1.007 2.25 2.25v10.5c0 1.243-1.007 2.25-2.25 2.25h-3.386c-1.716 0-3.196-.484-4.364-1.253" /></svg>
                            {!isCollapsed && <span className="font-medium text-blue-50">Bimbingan</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-3 h-3 transition-transform duration-300 ${isBimbinganOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {isBimbinganOpen && !isCollapsed && (
                        <div className="pl-11 space-y-1 mt-1 border-l border-white/10 ml-5 text-[13px]">
                            <NavLink to="/dashboard/bimbingan/proposal" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Proposal</NavLink>
                            <NavLink to="/dashboard/bimbingan/skripsi" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Skripsi/TA</NavLink>
                            <NavLink to="/dashboard/bimbingan/sidang" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Sidang Skripsi/TA</NavLink>
                        </div>
                    )}
                </div>

                {/* Dropdown: Survei */}
                <div>
                    <div onClick={() => toggleDropdown(setSurveiOpen)} className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-xl cursor-pointer transition-colors ${isSurveiOpen ? 'bg-white/5' : 'hover:bg-white/10'}`}>
                        <div className="flex items-center space-x-3 text-blue-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6 4h6" /></svg>
                            {!isCollapsed && <span className="font-medium text-blue-50">Survei</span>}
                        </div>
                        {!isCollapsed && <svg className={`w-3 h-3 transition-transform duration-300 ${isSurveiOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                    {isSurveiOpen && !isCollapsed && (
                        <div className="pl-11 space-y-1 mt-1 border-l border-white/10 ml-5 text-[13px]">
                            <NavLink to="/dashboard/survei-kepuasan/fasilitas" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Fasilitas</NavLink>
                            <NavLink to="/dashboard/survei-kepuasan/skripsi" onClick={handleLinkClick} className="block py-2 text-blue-200 hover:text-white">Skripsi</NavLink>
                        </div>
                    )}
                </div>

                {/* Menu Yudisium */}
                <NavLink 
                     to="/dashboard/yudisium" 
                     onClick={handleLinkClick} 
                   className={navLinkClass}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                     {!isCollapsed && <span>Yudisium</span>}
                </NavLink>

                {/* Upload & Download */}
                <NavLink to="/dashboard/magang" onClick={handleLinkClick} className={navLinkClass}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" /></svg>
                    {!isCollapsed && <span>Upload</span>}
                </NavLink>

                <NavLink to="/dashboard/download" onClick={handleLinkClick} className={navLinkClass}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    {!isCollapsed && <span>Download</span>}
                </NavLink>                

            </nav>

            {/* Logout Section */}
            <div className="p-4 mt-auto border-t border-white/10">
                <button 
                    onClick={handleLogout} 
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-4'} py-3 rounded-2xl bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    {!isCollapsed && <span className="font-bold uppercase tracking-widest text-xs">Keluar</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;