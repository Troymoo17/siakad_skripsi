import React, { useState, useEffect } from 'react';
import { getPembayaranData } from '../../api/api';
import Swal from 'sweetalert2';

const PembayaranPage = () => {
    const [pembayaranData, setPembayaranData] = useState(null);
    const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);

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
            const data = await getPembayaranData(nim);
            setPembayaranData(data);
        };
        fetchData();
    }, []);

    const handleSemesterChange = (e) => {
        setSelectedSemesterIndex(e.target.value);
    };

    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        Swal.fire({
            icon: 'success',
            title: 'Tersalin!',
            text: `Nomor VA ${text} berhasil disalin.`,
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: 'top-end'
        });
    };

    const currentSemesterData = pembayaranData?.data?.[selectedSemesterIndex];

    const renderDesktopTable = () => (
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="text-xs text-white uppercase bg-gradient-to-r from-[#005c97] to-[#363795]">
                    <tr>
                        <th scope="col" className="py-4 px-6 font-bold tracking-wider">Keterangan Rincian</th>
                        <th scope="col" className="py-4 px-6 text-right font-bold tracking-wider">Tagihan</th>
                        <th scope="col" className="py-4 px-6 text-right font-bold tracking-wider">Pembayaran</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {currentSemesterData?.rincian?.map((item, index) => (
                        <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6 font-medium text-gray-700">{item.deskripsi}</td>
                            <td className="py-4 px-6 text-right font-semibold text-gray-900">{formatRupiah(item.nominal)}</td>
                            <td className="py-4 px-6"></td>
                        </tr>
                    ))}
                    <tr className="bg-gray-50/50 font-bold italic">
                        <td className="py-3 px-6 text-gray-500">Total Kewajiban Semester {currentSemesterData?.semester}</td>
                        <td className="py-3 px-6 text-right text-[#005c97]">{formatRupiah(currentSemesterData?.tagihan || 0)}</td>
                        <td className="py-3 px-6"></td>
                    </tr>
                    {currentSemesterData?.pembayaran?.map((item, index) => (
                        <tr key={index} className="bg-white">
                            <td className="py-4 px-6 text-gray-600 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Pembayaran ({formatDateToDMY(item.tanggal)})
                            </td>
                            <td className="py-4 px-6"></td>
                            <td className="py-4 px-6 text-right font-semibold text-green-600">{formatRupiah(item.nominal)}</td>
                        </tr>
                    ))}
                    <tr className="bg-gray-50 font-bold border-t-2 border-gray-100">
                        <td className="py-4 px-6 text-gray-700">Total Terbayar</td>
                        <td className="py-4 px-6"></td>
                        <td className="py-4 px-6 text-right text-green-700">{formatRupiah(currentSemesterData?.dibayar || 0)}</td>
                    </tr>
                    <tr className="bg-blue-50 font-black">
                        <td className="py-5 px-6 text-blue-900 text-base uppercase tracking-tight">Sisa Tagihan (Outstanding)</td>
                        <td colSpan="2" className="py-5 px-6 text-right text-red-600 text-xl font-black">
                            {formatRupiah(currentSemesterData?.sisa_tagihan || 0)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="space-y-4 px-1">
            <div className="bg-gradient-to-r from-[#005c97] to-[#363795] p-5 rounded-2xl shadow-lg text-white">
                <h3 className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-2">Nomor Virtual Account</h3>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-bold tracking-tight">{pembayaranData?.virtual_account || '8832XXXXXXXX'}</p>
                    <button 
                        onClick={() => copyToClipboard(pembayaranData?.virtual_account)}
                        className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 text-[10px] font-bold border border-white/30"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
                        Salin
                    </button>
                </div>
                <p className="text-[9px] text-white/70 mt-3 italic">*Gunakan nomor ini untuk seluruh transaksi pembayaran.</p>
            </div>

            {/* Rincian Tagihan Mobile */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 text-[11px] uppercase mb-4 flex items-center gap-2 tracking-wider">
                    <div className="w-1 h-4 bg-orange-400 rounded-full"></div>
                    Rincian Tagihan Semester {currentSemesterData?.semester}
                </h3>
                <div className="space-y-4">
                    {currentSemesterData?.rincian?.map((item, index) => (
                        <div key={index} className="flex justify-between items-start">
                            <p className="text-gray-500 text-xs font-medium max-w-[65%]">{item.deskripsi}</p>
                            <span className="font-bold text-gray-900 text-xs">{formatRupiah(item.nominal)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Riwayat Bayar Mobile */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 text-[11px] uppercase mb-4 flex items-center gap-2 tracking-wider">
                    <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                    Riwayat Pembayaran
                </h3>
                {currentSemesterData?.pembayaran?.length > 0 ? (
                    currentSemesterData.pembayaran.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                            <div>
                                <span className="text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">Berhasil</span>
                                <p className="text-[10px] text-gray-500 mt-1">{formatDateToDMY(item.tanggal)}</p>
                            </div>
                            <span className="font-bold text-green-600 text-xs">{formatRupiah(item.nominal)}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-[11px] text-gray-400 italic text-center py-2">Belum ada pembayaran.</p>
                )}
            </div>

            {/* Summary Mobile */}
            <div className="bg-[#1a1c23] p-6 rounded-[2rem] shadow-xl text-white">
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-[10px] text-gray-400">
                        <p>Total Tagihan</p>
                        <span className="text-gray-200">{formatRupiah(currentSemesterData?.tagihan || 0)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                        <p>Sudah Dibayar</p>
                        <span className="text-green-400">{formatRupiah(currentSemesterData?.dibayar || 0)}</span>
                    </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                    <p className="text-[9px] uppercase tracking-widest text-orange-400 font-bold mb-1">Sisa yang harus dibayar</p>
                    <p className="text-2xl font-black text-white">{formatRupiah(currentSemesterData?.sisa_tagihan || 0)}</p>
                </div>
            </div>
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-8 bg-[#f8fafc] min-h-screen">
            <div className="w-full mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Header */}
                    <div className="p-6 md:p-10 border-b border-gray-50">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-[#1e293b] tracking-tight mb-2">Tagihan & Pembayaran</h1>
                                <p className="text-gray-400 text-xs md:text-sm font-medium">Pantau status rincian keuangan akademik Anda secara berkala.</p>
                            </div>
                            <div className="flex flex-col items-start md:items-end">
                                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Pilih Periode:</label>
                                <div className="relative w-full md:w-52">
                                    <select 
                                        value={selectedSemesterIndex} 
                                        onChange={handleSemesterChange} 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-2.5 text-xs font-bold text-gray-700 appearance-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                                    >
                                        {pembayaranData?.data?.map((semester, index) => (
                                            <option key={index} value={index}>Semester {semester.semester}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        {/* Summary Desktop */}
                        <div className="hidden md:grid grid-cols-3 gap-6 mb-10">
                            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Total Kewajiban</p>
                                <p className="text-2xl font-black text-[#005c97]">{formatRupiah(currentSemesterData?.tagihan || 0)}</p>
                            </div>
                            <div className="bg-green-50/50 p-6 rounded-3xl border border-green-100">
                                <p className="text-[10px] font-black uppercase tracking-widest text-green-500 mb-1">Total Terbayar</p>
                                <p className="text-2xl font-black text-green-700">{formatRupiah(currentSemesterData?.dibayar || 0)}</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Virtual Account</p>
                                    <p className="text-2xl font-black text-gray-800 tracking-tighter">{pembayaranData?.virtual_account || '-'}</p>
                                </div>
                                <button onClick={() => copyToClipboard(pembayaranData?.virtual_account)} className="p-3 bg-white rounded-xl shadow-sm hover:bg-blue-600 hover:text-white transition-all text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        {pembayaranData ? (
                            <>
                                <div className='hidden md:block animate-in fade-in duration-700'>{renderDesktopTable()}</div>
                                <div className='md:hidden'>{renderMobileCards()}</div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 italic text-gray-400 text-xs">Memuat Data...</div>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-3 px-6 py-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <div className="p-1.5 bg-orange-400 rounded-lg text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <p className="text-[10px] md:text-xs text-orange-800 font-medium">
                        <strong>Perhatian:</strong> Pembayaran melalui Virtual Account (VA) akan terverifikasi secara otomatis dalam maksimal 1x24 jam.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default PembayaranPage;