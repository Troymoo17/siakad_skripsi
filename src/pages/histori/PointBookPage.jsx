import React, { useState, useEffect } from 'react';
import { getPointBookHistory } from '../../api/api';

const PointBookPage = () => {
    const [pointBookData, setPointBookData] = useState(null);

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
            const data = await getPointBookHistory(nim);
            setPointBookData(data);
        };
        fetchData();
    }, []);

    const renderDesktopTable = () => (
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="text-xs text-white uppercase bg-gradient-to-r from-[#005c97] to-[#363795]">
                    <tr>
                        <th scope="col" className="py-4 px-6 font-bold tracking-wider">Tanggal</th>
                        <th scope="col" className="py-4 px-6 font-bold tracking-wider">Nama Kegiatan</th>
                        <th scope="col" className="py-4 px-6 font-bold tracking-wider">Keterangan</th>
                        <th scope="col" className="py-4 px-6 text-center font-bold tracking-wider">Poin</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {pointBookData?.data?.map((item, index) => (
                        <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6 font-medium text-gray-700">{formatDateToDMY(item.tanggal)}</td>
                            <td className="py-4 px-6 font-semibold text-gray-900">{item.nama_kegiatan}</td>
                            <td className="py-4 px-6 text-gray-500 text-xs">{item.keterangan}</td>
                            <td className="py-4 px-6 text-center">
                                <span className="px-3 py-1 bg-blue-50 text-[#005c97] rounded-full text-xs font-black">
                                    +{item.poin}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="space-y-4 px-1">
            {/* Total Point Card Mobile */}
            <div className="bg-gradient-to-r from-[#005c97] to-[#363795] p-6 rounded-2xl shadow-lg text-white mb-6">
                <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">Akumulasi Poin Anda</p>
                <div className="flex items-end gap-2">
                    <h2 className="text-4xl font-black tracking-tighter">{pointBookData?.total_poin || 0}</h2>
                    <span className="text-sm font-bold mb-1 text-blue-200">Point</span>
                </div>
                <p className="text-[9px] text-white/50 mt-3 italic">*Poin dikumpulkan dari aktivitas akademik & non-akademik.</p>
            </div>

            <h3 className="text-[11px] font-black uppercase tracking-wider text-gray-400 ml-1 flex items-center gap-2">
                <div className="w-1 h-3 bg-orange-400 rounded-full"></div>
                Riwayat Aktivitas
            </h3>

            {pointBookData?.data?.map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 pr-3">
                            <p className="text-[9px] font-black text-blue-500 uppercase tracking-tighter mb-1">{formatDateToDMY(item.tanggal)}</p>
                            <h3 className="font-bold text-gray-800 text-sm leading-tight mb-2">{item.nama_kegiatan}</h3>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">"{item.keterangan}"</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 min-w-[60px]">
                            <span className="text-xs font-black text-[#005c97]">+{item.poin}</span>
                            <span className="text-[8px] font-bold text-gray-400 uppercase">Poin</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-8 bg-[#f8fafc] min-h-screen">
            <div className="w-full mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Header Section */}
                    <div className="p-6 md:p-10 border-b border-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-[#1e293b] tracking-tight mb-2">Point Book</h1>
                                <p className="text-gray-400 text-xs md:text-sm font-medium">Rekapitulasi poin prestasi dan kegiatan mahasiswa.</p>
                            </div>
                            
                            {/* Desktop Total Poin Badge */}
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Poin</span>
                                <div className="bg-blue-50 px-6 py-2 rounded-2xl border border-blue-100">
                                    <span className="text-2xl font-black text-[#005c97]">{pointBookData?.total_poin || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        {pointBookData ? (
                            <>
                                <div className='hidden md:block animate-in fade-in duration-700'>
                                    {renderDesktopTable()}
                                </div>
                                <div className='md:hidden'>
                                    {renderMobileCards()}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 italic text-gray-400 text-xs">
                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                                Menyinkronkan Data Poin...
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Footer */}
                <div className="mt-8 flex items-center gap-3 px-6 py-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="p-1.5 bg-[#363795] rounded-lg text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <p className="text-[10px] md:text-xs text-blue-800 font-medium">
                        <strong>Informasi:</strong> Poin ini akan digunakan sebagai salah satu syarat kelengkapan administrasi kelulusan (SKPI).
                    </p>
                </div>
            </div>
        </main>
    );
};

export default PointBookPage;