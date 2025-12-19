import React, { useState, useEffect } from 'react';
import { getKHSData } from '../../api/api';

const KartuHasilStudiPage = () => {
    const [khsData, setKhsData] = useState(null);
    const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getKHSData(nim);
            setKhsData(data);
        };
        fetchData();
    }, []);

    const handleSemesterChange = (e) => {
        setSelectedSemesterIndex(e.target.value);
    };

    const currentKHS = khsData?.data?.[selectedSemesterIndex];

    const renderListItems = () => {
        if (!currentKHS?.mata_kuliah || currentKHS.mata_kuliah.length === 0) {
            return (
                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 italic font-bold uppercase text-[10px] tracking-widest">Rincian nilai tidak tersedia</p>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-3 w-full mb-10">
                {currentKHS.mata_kuliah.map((mk, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                        <div className="flex flex-row items-center h-16 md:h-20 w-full">
                            {/* Kode MK */}
                            <div className="bg-gradient-to-br from-[#005c97] to-[#363795] w-16 md:w-32 h-full flex items-center justify-center shrink-0">
                                <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-tighter md:tracking-widest">
                                    {mk.kode_mk}
                                </span>
                            </div>

                            {/* Nama MK & SKS */}
                            <div className="flex-1 px-4 md:px-6 overflow-hidden">
                                <h3 className="font-bold text-gray-800 text-xs md:text-sm group-hover:text-[#005c97] transition-colors truncate">
                                    {mk.nama_mk}
                                </h3>
                                <div className="flex gap-2 items-center mt-0.5 md:mt-1">
                                    <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase">{mk.sks} SKS</span>
                                    <span className="text-gray-200">|</span>
                                    <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase">Bobot: {mk.bobot}</span>
                                </div>
                            </div>

                            {/* Nilai & Grade - List Horizontal */}
                            <div className="flex items-center gap-3 md:gap-8 px-4 md:px-8 h-full border-l border-gray-50 shrink-0 bg-gray-50/30">
                                <div className="text-center hidden sm:block">
                                    <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-tighter">B x SKS</p>
                                    <p className="text-xs md:text-sm font-black text-[#005c97]">{mk.bobot_sks}</p>
                                </div>
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-black text-xs md:text-sm border shadow-sm ${
                                    ['A', 'A-'].includes(mk.grade) ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                }`}>
                                    {mk.grade}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <main className="flex-1 p-4 md:p-8 bg-[#f8fafc] min-h-screen">
            <div className="w-full">
                {/* Header Section */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-6 md:mb-8">
                    <div className="p-6 md:p-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex-1">
                                <h1 className="text-2xl md:text-3xl font-black text-[#1e293b] tracking-tight mb-2">Kartu Hasil Studi</h1>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-200 shadow-sm">
                                        <label htmlFor="semester-select" className="text-[10px] font-black text-gray-400 uppercase">Periode:</label>
                                        <select 
                                            id="semester-select"
                                            value={selectedSemesterIndex} 
                                            onChange={handleSemesterChange}
                                            className="bg-transparent text-xs font-black text-[#005c97] focus:outline-none cursor-pointer"
                                        >
                                            {khsData?.data?.map((semester, index) => (
                                                <option key={index} value={index}>Semester {semester.semester}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <span className="bg-blue-50 text-[#005c97] text-[10px] font-bold px-4 py-2 rounded-xl border border-blue-100 uppercase tracking-tighter flex items-center">
                                        {khsData?.program_studi || 'Prodi'}
                                    </span>
                                </div>
                            </div>
                            
                            {/* IPS dipindahkan ke sini, IPK dihapus */}
                            <div className="flex gap-4 w-full md:w-auto">
                                <div className="flex-1 md:w-40 bg-gradient-to-br from-[#005c97] to-[#363795] p-5 rounded-[2rem] text-center shadow-lg shadow-blue-100">
                                    <p className="text-[10px] font-black text-blue-200 uppercase tracking-[0.2em] mb-1">IP Semester</p>
                                    <p className="text-3xl font-black text-white">{currentKHS?.ips || '0.00'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* List View Container */}
                <div id="khs-list-view-container" className="w-full">
                    {khsData ? (
                        renderListItems()
                    ) : (
                        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-gray-100 w-full shadow-sm">
                            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Memuat Data KHS...</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default KartuHasilStudiPage;