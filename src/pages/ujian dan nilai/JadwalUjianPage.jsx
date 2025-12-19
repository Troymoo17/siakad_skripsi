import React, { useState, useEffect } from 'react';
import { getJadwalUjian } from '../../api/api';

const JadwalUjianPage = () => {
    const [jadwalUjian, setJadwalUjian] = useState(null);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getJadwalUjian(nim);
            setJadwalUjian(data);
        };
        fetchData();
    }, []);

    const renderDesktopCards = (data) => (
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-12">
            {data.map((item, index) => (
                <div key={index} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                    <div className="bg-gradient-to-r from-[#005c97] to-[#363795] px-8 py-4 flex justify-between items-center">
                        <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">{item.hari}</h2>
                        <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/30 uppercase">
                            Kelas {item.kelas}
                        </span>
                    </div>
                    <div className="p-6 space-y-5 flex-1 bg-gradient-to-b from-white to-gray-50/30">
                        <div className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-300 transition-all">
                            <h3 className="font-bold text-gray-800 text-sm leading-snug mb-3 group-hover:text-[#005c97] transition-colors">
                                {item.mata_kuliah}
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[11px] text-[#005c97] font-black bg-blue-50 w-fit px-3 py-1 rounded-lg">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    {item.tanggal} | {item.mulai.substring(0, 5)} - {item.selesai.substring(0, 5)}
                                </div>
                                <div className="flex flex-col gap-1 px-1">
                                    <p className="text-[11px] text-gray-500 font-bold flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                        Ruang: <span className="text-gray-700">{item.ruangan}</span>
                                    </p>
                                    <p className="text-[11px] text-gray-500 font-bold flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                                        No. Kursi: <span className="text-[#005c97] font-black">{item.no_kursi}</span>
                                    </p>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-50">
                                    <p className="text-[10px] text-gray-400 font-medium italic">
                                        {item.dosen}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderMobileCards = (data) => (
        <div className="space-y-4 md:hidden px-1 mb-8">
            {data.map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                    <div className="flex flex-col items-center justify-center border-r border-gray-100 pr-4 min-w-[80px]">
                        <span className="text-[10px] font-black text-gray-400 uppercase">Ruang</span>
                        <div className="w-0.5 h-4 bg-blue-100 my-1"></div>
                        <span className="text-xs font-black text-[#005c97]">{item.ruangan}</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-sm leading-tight mb-2">{item.mata_kuliah}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <span className="bg-blue-50 text-[#005c97] text-[9px] font-bold px-2 py-0.5 rounded-md border border-blue-100">
                                {item.tanggal}
                            </span>
                            <span className="bg-orange-50 text-orange-700 text-[9px] font-bold px-2 py-0.5 rounded-md border border-orange-100">
                                Kursi: {item.no_kursi}
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-400 italic line-clamp-1">{item.dosen}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-8 bg-[#f8fafc] min-h-screen">
            <div className="w-full">
                {/* Header Section */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="p-6 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-[#1e293b] tracking-tight mb-2">Jadwal Ujian</h1>
                                <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">
                                    Tahun Akademik 2024/2025 - Semester Gasal
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div id="ujian-content-container" className="w-full space-y-12">
                    {jadwalUjian ? (
                        <>
                            {/* Section UTS */}
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest bg-white px-6 py-2 rounded-full border border-gray-100 shadow-sm">Ujian Tengah Semester (UTS)</h2>
                                    <div className="h-[1px] flex-1 bg-gray-200"></div>
                                </div>
                                {renderDesktopCards(jadwalUjian.uts)}
                                {renderMobileCards(jadwalUjian.uts)}
                            </div>

                            {/* Section UAS */}
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest bg-white px-6 py-2 rounded-full border border-gray-100 shadow-sm">Ujian Akhir Semester (UAS)</h2>
                                    <div className="h-[1px] flex-1 bg-gray-200"></div>
                                </div>
                                {renderDesktopCards(jadwalUjian.uas)}
                                {renderMobileCards(jadwalUjian.uas)}
                            </div>
                        </>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-gray-100 w-full">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest italic">Menyinkronkan Jadwal Ujian...</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default JadwalUjianPage;