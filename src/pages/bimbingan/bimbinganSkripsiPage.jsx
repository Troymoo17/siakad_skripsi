import React, { useState, useEffect } from 'react';
import { getBimbinganSkripsiHistory } from '../../api/api';

const BimbinganSkripsiPage = () => {
    const [historiBimbingan, setHistoriBimbingan] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDateToDMY = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            try {
                setLoading(true);
                const history = await getBimbinganSkripsiHistory(nim);
                setHistoriBimbingan(history);
            } catch (error) {
                console.error("Gagal memuat histori bimbingan:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderDesktopTable = () => (
        <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left text-sm border-collapse">
                <thead className="text-[10px] text-blue-900 uppercase tracking-[0.2em] bg-blue-50/50 border-y border-blue-100">
                    <tr>
                        <th className="py-4 px-6 w-[150px]">Tanggal</th>
                        <th className="py-4 px-6 w-[120px] text-center">Bab</th>
                        <th className="py-4 px-8">Uraian Bimbingan</th>
                        <th className="py-4 px-6 w-[250px]">Pembimbing</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {historiBimbingan.map((item, index) => (
                        <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="py-5 px-6 font-medium text-gray-500 whitespace-nowrap">
                                {formatDateToDMY(item.tanggal)}
                            </td>
                            <td className="py-5 px-6 text-center">
                                <span className="inline-block min-w-[60px] bg-blue-700 text-white px-3 py-1.5 rounded-lg font-black text-[10px] uppercase shadow-sm shadow-blue-100">
                                    {item.bab}
                                </span>
                            </td>
                            <td className="py-5 px-8 text-gray-700 leading-relaxed text-xs">
                                {item.uraian}
                            </td>
                            <td className="py-5 px-6 font-bold text-gray-600 text-[11px] uppercase tracking-tight">
                                {item.pembimbing}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="space-y-4 md:hidden">
            {historiBimbingan.map((item, index) => (
                <div key={index} className="bg-white rounded-[1.5rem] border border-gray-200 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-lg uppercase">
                            Bab {item.bab}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">{formatDateToDMY(item.tanggal)}</span>
                    </div>
                    <div className="mb-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Uraian:</span>
                        <p className="text-xs text-gray-800 leading-relaxed font-medium italic">"{item.uraian}"</p>
                    </div>
                    <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pembimbing</span>
                        <span className="text-[10px] font-bold text-gray-700 uppercase">{item.pembimbing}</span>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-[#f8fafc] min-h-screen">
            <div className="w-full">
                <header className="mb-10">
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Bimbingan Skripsi</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1 italic">Log Aktivitas & Konsultasi Tugas Akhir</p>
                </header>

                <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-blue-700 rounded-full"></div>
                            <h2 className="text-gray-800 font-black text-[11px] tracking-[0.2em] uppercase">Histori Konsultasi</h2>
                        </div>
                    </div>

                    <div className="p-2 md:p-0">
                        {loading ? (
                            <div className="p-32 text-center">
                                <div className="w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Sinkronisasi Data...</p>
                            </div>
                        ) : historiBimbingan && historiBimbingan.length > 0 ? (
                            <>
                                {renderDesktopTable()}
                                <div className="p-4 md:hidden">
                                    {renderMobileCards()}
                                </div>
                            </>
                        ) : (
                            <div className="p-32 text-center">
                                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
                                    Belum ada catatan bimbingan
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BimbinganSkripsiPage;