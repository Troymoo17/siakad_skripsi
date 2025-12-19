import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getKRSData, submitKRS, getMahasiswaData } from '../../api/api';

const KRSPage = () => {
    const [krsData, setKrsData] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [mahasiswaData, setMahasiswaData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        fetchInitialData(nim);
    }, []);

    const fetchInitialData = async (nim) => {
        setLoading(true);
        const mhs = await getMahasiswaData(nim);
        setMahasiswaData(mhs);
        if (mhs?.semester_sekarang) {
            const data = await getKRSData(nim, mhs.semester_sekarang);
            setKrsData(data);
            setSelectedCourses(data?.krs_terisi || []);
        }
        setLoading(false);
    };

    const toggleCourse = (kode_mk) => {
        setSelectedCourses(prev => 
            prev.includes(kode_mk) ? prev.filter(k => k !== kode_mk) : [...prev, kode_mk]
        );
    };

    const handleSave = async () => {
        const nim = mahasiswaData?.nim;
        const sem = mahasiswaData?.semester_sekarang;
        
        const success = await submitKRS(nim, sem, selectedCourses);
        if (success) {
            Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Rencana studi telah diperbarui', timer: 1500, showConfirmButton: false });
        } else {
            Swal.fire({ icon: 'error', title: 'Gagal', text: 'Terjadi kesalahan saat menyimpan data' });
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8 bg-[#f8fafc] min-h-screen">
            <div className="w-full">
                {/* Header Section - Full Width */}
                <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-8 md:p-12 mb-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">Kartu Rencana Studi</h1>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">
                            Sistem Informasi Akademik &bull; {mahasiswaData?.nama} &bull; {mahasiswaData?.nim}
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="bg-blue-50 px-6 py-2 rounded-2xl border border-blue-100">
                            <p className="text-[10px] font-black text-[#005c97] uppercase tracking-widest">Semester Target: {mahasiswaData?.semester_sekarang}</p>
                        </div>
                        <button 
                            onClick={handleSave}
                            className="bg-gradient-to-br from-[#005c97] to-[#363795] text-white font-black px-12 py-4 rounded-[1.5rem] shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all uppercase text-xs tracking-[0.2em]"
                        >
                            Simpan Rencana Studi
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="w-full py-40 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-[#005c97] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-black text-gray-300 animate-pulse tracking-[0.5em] uppercase">Sinkronisasi Kurikulum...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
                        {krsData?.mata_kuliah_tersedia.map((mk) => {
                            const isSelected = selectedCourses.includes(mk.kode_mk);
                            const isWajib = mk.status === 'Wajib';
                            
                            return (
                                <div 
                                    key={mk.kode_mk}
                                    onClick={() => toggleCourse(mk.kode_mk)}
                                    className={`bg-white rounded-[2.5rem] border-2 transition-all cursor-pointer overflow-hidden flex flex-col h-full group ${
                                        isSelected 
                                        ? 'border-[#005c97] shadow-2xl shadow-blue-100 -translate-y-2' 
                                        : 'border-gray-100 hover:border-blue-200 hover:-translate-y-1'
                                    }`}
                                >
                                    {/* Card Header dengan Indikator Status */}
                                    <div className={`px-8 py-5 flex justify-between items-center transition-colors ${
                                        isWajib 
                                        ? (isSelected ? 'bg-[#005c97]' : 'bg-gray-800 group-hover:bg-[#005c97]') 
                                        : (isSelected ? 'bg-emerald-600' : 'bg-gray-600 group-hover:bg-emerald-600')
                                    }`}>
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{mk.kode_mk}</span>
                                        <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${
                                            isSelected ? 'bg-white border-white rotate-0' : 'border-white/30 rotate-45'
                                        }`}>
                                            {isSelected && (
                                                <svg className={`w-4 h-4 ${isWajib ? 'text-[#005c97]' : 'text-emerald-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-8 flex flex-col flex-1 justify-between gap-6 bg-gradient-to-b from-white to-gray-50/30">
                                        <div>
                                            <div className="h-14 flex items-center mb-4">
                                                <h3 className="font-black text-gray-800 text-sm md:text-base uppercase line-clamp-2 leading-tight">
                                                    {mk.nama_mk}
                                                </h3>
                                            </div>
                                            <span className={`text-[9px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest border ${
                                                isWajib 
                                                ? 'bg-blue-50 text-[#005c97] border-blue-100' 
                                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            }`}>
                                                {mk.status || 'Wajib'}
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-between items-end pt-6 border-t border-gray-100">
                                            <div>
                                                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Beban Kredit</p>
                                                <p className="text-base font-black text-gray-700">{mk.sks} SKS</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Semester</p>
                                                <p className="text-base font-black text-[#005c97]">{mk.semester}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
};

export default KRSPage;