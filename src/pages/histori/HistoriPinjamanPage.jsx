import React, { useState, useEffect } from 'react';
import { getPinjamanHistory } from '../../api/api';
import Swal from 'sweetalert2';

const HistoriPinjamanPage = () => {
    const [pinjamanData, setPinjamanData] = useState(null);

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
            const data = await getPinjamanHistory(nim);
            setPinjamanData(data);
        };
        fetchData();
    }, []);

    const renderDesktopTable = () => (
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="text-xs text-white uppercase bg-gradient-to-r from-[#005c97] to-[#363795]">
                    <tr>
                        <th scope="col" className="py-4 px-6 font-bold tracking-wider">Tanggal Pinjam</th>
                        <th scope="col" className="py-4 px-6 font-bold tracking-wider">Tanggal Kembali</th>
                        <th scope="col" className="py-4 px-6 font-bold tracking-wider">Nama Buku</th>
                        <th scope="col" className="py-4 px-6 text-center font-bold tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {pinjamanData?.data?.map((item, index) => (
                        <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6 font-medium text-gray-700">{formatDateToDMY(item.tanggal_pinjam)}</td>
                            <td className="py-4 px-6 text-gray-600">{formatDateToDMY(item.tanggal_kembali) || '-'}</td>
                            <td className="py-4 px-6 font-semibold text-gray-900">{item.nama_buku}</td>
                            <td className="py-4 px-6 text-center">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                    item.status_pinjaman === 'Sudah Kembali' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                    {item.status_pinjaman}
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
            {pinjamanData?.data?.map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    {/* Status Indicator Side Line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        item.status_pinjaman === 'Sudah Kembali' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>

                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 pr-4">
                            <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{item.nama_buku}</h3>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                item.status_pinjaman === 'Sudah Kembali' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                                {item.status_pinjaman}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-50">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Tgl Pinjam</p>
                            <p className="text-xs font-bold text-gray-700">{formatDateToDMY(item.tanggal_pinjam)}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Tgl Kembali</p>
                            <p className="text-xs font-bold text-gray-700">{formatDateToDMY(item.tanggal_kembali) || '-'}</p>
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
                    <div className="p-6 md:p-10 border-b border-gray-50 bg-gradient-to-r from-white to-gray-50/30">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-[#1e293b] tracking-tight mb-2">Histori Pinjaman</h1>
                                <p className="text-gray-400 text-xs md:text-sm font-medium">Daftar riwayat peminjaman buku perpustakaan Anda.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        {pinjamanData ? (
                            <>
                                <div className='hidden md:block animate-in fade-in duration-700'>
                                    {renderDesktopTable()}
                                </div>
                                <div className='md:hidden'>
                                    {renderMobileCards()}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Memuat Data Pinjaman...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 flex items-center gap-3 px-6 py-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="p-1.5 bg-[#005c97] rounded-lg text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <p className="text-[10px] md:text-xs text-blue-800 font-medium">
                        Harap kembalikan buku tepat waktu untuk menghindari denda keterlambatan sesuai peraturan perpustakaan.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default HistoriPinjamanPage;