import React, { useState, useEffect } from 'react';
import { getKehadiranSummary } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const KehadiranPage = () => {
    const [kehadiranData, setKehadiranData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getKehadiranSummary(nim);
            setKehadiranData(data);
        };
        fetchData();
    }, []);

    const handleDetailClick = (kode_mk, mata_kuliah) => {
        navigate(`/dashboard/perkuliahan/kehadiran/${kode_mk}`, { state: { mata_kuliah } });
    };

    return (
        <main className="flex-1 p-4 md:p-8 bg-[#f8fafc] min-h-screen">
            <div className="w-full mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Header Section */}
                    <div className="p-6 md:p-10 border-b border-gray-50 bg-gradient-to-r from-white to-gray-50/30">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-[#1e293b] tracking-tight mb-2">Rekap Kehadiran</h1>
                                <p className="text-gray-400 text-xs md:text-sm font-medium">Pantau persentase kehadiran Anda di setiap mata kuliah.</p>
                            </div>
                            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-green-50 rounded-xl text-green-700 border border-green-100">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-black uppercase tracking-widest">Semester Gasal Aktif</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        {kehadiranData.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {kehadiranData.map(item => (
                                    <div key={item.kode_mk} className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight group-hover:text-[#005c97] transition-colors pr-4">{item.mata_kuliah}</h3>
                                                <span className="text-[10px] font-black text-gray-400 uppercase bg-gray-50 px-2 py-1 rounded-md">{item.kode_mk}</span>
                                            </div>
                                            
                                            <div className="grid grid-cols-4 gap-2 mb-6">
                                                <div className="bg-green-50 p-2 rounded-xl border border-green-100 text-center">
                                                    <p className="text-[9px] font-black text-green-600 uppercase">Hadir</p>
                                                    <p className="font-bold text-gray-800">{item.hadir}</p>
                                                </div>
                                                <div className="bg-blue-50 p-2 rounded-xl border border-blue-100 text-center">
                                                    <p className="text-[9px] font-black text-blue-600 uppercase">Izin</p>
                                                    <p className="font-bold text-gray-800">{item.izin}</p>
                                                </div>
                                                <div className="bg-orange-50 p-2 rounded-xl border border-orange-100 text-center">
                                                    <p className="text-[9px] font-black text-orange-600 uppercase">Sakit</p>
                                                    <p className="font-bold text-gray-800">{item.sakit}</p>
                                                </div>
                                                <div className="bg-red-50 p-2 rounded-xl border border-red-100 text-center">
                                                    <p className="text-[9px] font-black text-red-600 uppercase">Alfa</p>
                                                    <p className="font-bold text-gray-800">{item.alfa}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => handleDetailClick(item.kode_mk, item.mata_kuliah)} 
                                            className="w-full py-3 bg-gray-50 text-[#005c97] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#005c97] hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                                        >
                                            Lihat Detail
                                            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 italic text-gray-400 text-xs">
                                <div className="w-8 h-8 border-4 border-[#005c97] border-t-transparent rounded-full animate-spin mb-4"></div>
                                Menyinkronkan Data Kehadiran...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default KehadiranPage;