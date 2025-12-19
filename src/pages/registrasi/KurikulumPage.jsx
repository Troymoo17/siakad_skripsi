import React, { useState, useEffect } from 'react';
import { getKurikulumData } from '../../api/api';

const KurikulumPage = () => {
    const [kurikulumData, setKurikulumData] = useState([]);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getKurikulumData(nim);
            setKurikulumData(data);
        };
        fetchData();
    }, []);

    return (
        <main className="flex-1 p-4 md:p-8 bg-[#f8fafc] min-h-screen">
            <div className="w-full">
                <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden mb-10">
                    <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-black text-[#1e293b] tracking-tight mb-2">Kurikulum</h1>
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Daftar Mata Kuliah Wajib & Pilihan</p>
                        </div>
                        <div className="w-full md:w-48 bg-gradient-to-br from-[#005c97] to-[#363795] p-6 rounded-[2.5rem] text-center shadow-xl shadow-blue-100">
                            <p className="text-[10px] font-black text-blue-200 uppercase tracking-[0.2em] mb-1">Total Matkul</p>
                            <p className="text-4xl font-black text-white">{kurikulumData.length}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-10">
                    {kurikulumData.map((item, index) => (
                        <div key={index} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:border-blue-200 transition-colors">
                            <div className={`px-8 py-5 flex justify-between items-center ${
                                item.status === 'Wajib' ? 'bg-[#005c97]' : 'bg-emerald-600'
                            }`}>
                                <h2 className="text-[10px] font-black text-white uppercase tracking-widest">{item.kode_mk}</h2>
                                <span className="bg-white/20 text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase border border-white/20">
                                    {item.status}
                                </span>
                            </div>
                            <div className="p-8 space-y-6 flex-1 bg-white">
                                <div className="h-12 flex items-center">
                                    <h3 className="font-black text-gray-800 text-sm uppercase line-clamp-2 leading-tight">{item.nama_mk}</h3>
                                </div>
                                <div className="flex justify-between items-end pt-6 border-t border-gray-50">
                                    <div>
                                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Semester</p>
                                        <p className="text-base font-black text-gray-700">{item.semester || '-'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">SKS</p>
                                        <p className="text-base font-black text-[#005c97]">{item.sks}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default KurikulumPage;