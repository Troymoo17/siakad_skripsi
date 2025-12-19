import React, { useState, useEffect } from 'react';
import { getBimbinganSidangResult } from '../../api/api';

const BimbinganSidangPage = () => {
    const [sidangData, setSidangData] = useState([]);
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
                const data = await getBimbinganSidangResult(nim);
                setSidangData(data || []);
            } catch (error) {
                console.error("Gagal memuat hasil sidang:", error);
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
                        <th className="py-4 px-6">Judul Skripsi / TA</th>
                        <th className="py-4 px-6 text-center w-[180px]">Tanggal Sidang</th>
                        <th className="py-4 px-6 text-center w-[120px]">Nilai</th>
                        <th className="py-4 px-6">Revisi / Catatan</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {sidangData.map((item, index) => (
                        <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="py-5 px-6 font-black text-gray-800 uppercase text-xs tracking-tight leading-relaxed">
                                {item.judul_skripsi || '-'}
                            </td>
                            <td className="py-5 px-6 text-center font-medium text-gray-500">
                                {formatDateToDMY(item.tanggal_sidang)}
                            </td>
                            <td className="py-5 px-6 text-center">
                                <span className="inline-block bg-blue-700 text-white px-4 py-1.5 rounded-lg font-black text-xs shadow-sm shadow-blue-100">
                                    {item.nilai || '-'}
                                </span>
                            </td>
                            <td className="py-5 px-6 italic text-gray-500 text-[11px] leading-relaxed">
                                {item.revisi || '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="space-y-4 md:hidden">
            {sidangData.map((item, index) => (
                <div key={index} className="bg-white rounded-[1.5rem] border border-gray-200 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-lg uppercase">
                            Nilai Akhir: {item.nilai || '-'}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">{formatDateToDMY(item.tanggal_sidang)}</span>
                    </div>
                    <h3 className="font-black text-gray-800 text-xs uppercase mb-3 leading-relaxed">
                        {item.judul_skripsi}
                    </h3>
                    <div className="pt-3 border-t border-gray-50">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Catatan Revisi:</span>
                        <p className="text-[11px] text-gray-600 italic leading-relaxed">{item.revisi || '-'}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-[#f8fafc] min-h-screen">
            <div className="w-full">
                {/* Header Page */}
                <header className="mb-10">
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Hasil Sidang Skripsi</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1 italic">Hasil Evaluasi Akhir & Yudisium Mahasiswa</p>
                </header>

                <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex items-center gap-2 bg-white">
                        <div className="w-1.5 h-5 bg-blue-700 rounded-full"></div>
                        <h2 className="text-gray-800 font-black text-[11px] tracking-[0.2em] uppercase">Data Kelulusan Sidang</h2>
                    </div>

                    <div className="p-2 md:p-0">
                        {loading ? (
                            <div className="p-32 text-center">
                                <div className="w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Memproses Hasil Sidang...</p>
                            </div>
                        ) : sidangData && sidangData.length > 0 ? (
                            <>
                                {renderDesktopTable()}
                                <div className="p-4 md:hidden">
                                    {renderMobileCards()}
                                </div>
                            </>
                        ) : (
                            <div className="p-32 text-center">
                                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
                                    Data sidang belum tersedia
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BimbinganSidangPage;