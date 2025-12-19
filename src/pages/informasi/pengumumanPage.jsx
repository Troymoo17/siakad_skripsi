import React, { useState, useEffect } from 'react';
import { getAnnouncements } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';

const PengumumanPage = () => {
    const navigate = useNavigate();
    const [pengumumanData, setPengumumanData] = useState([]);
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
        const fetchAnnouncements = async () => {
            try {
                const data = await getAnnouncements();
                const threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

                const filteredData = data
                    .filter(announcement => {
                        const announcementDate = new Date(announcement.tanggal_upload);
                        return announcementDate >= threeMonthsAgo;
                    })
                    .sort((a, b) => new Date(b.tanggal_upload) - new Date(a.tanggal_upload));
                
                setPengumumanData(filteredData);
            } catch (error) {
                console.error("Gagal memuat pengumuman:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-[#f8fafc] min-h-screen">
            <div className="w-full">
                {/* Header Page */}
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Daftar Pengumuman</h1>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1 italic">
                            Informasi Terkini (3 Bulan Terakhir)
                        </p>
                    </div>
                    
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl font-black text-[10px] text-gray-500 uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali
                    </button>
                </header>

                <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-2 md:p-0">
                        {loading ? (
                            <div className="p-32 text-center">
                                <div className="w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Sinkronisasi Informasi...</p>
                            </div>
                        ) : pengumumanData.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead className="text-[10px] text-blue-900 uppercase tracking-[0.2em] bg-blue-50/50 border-y border-blue-100">
                                        <tr>
                                            <th className="py-4 px-8 w-40">Tanggal</th>
                                            <th className="py-4 px-6">Informasi & Judul Pengumuman</th>
                                            <th className="py-4 px-8 w-40 text-center">Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {pengumumanData.map((item, index) => (
                                            <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="py-6 px-8 font-medium text-gray-400 italic text-xs">
                                                    {formatDateToDMY(item.tanggal_upload)}
                                                </td>
                                                <td className="py-6 px-6">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-black text-gray-800 uppercase text-xs tracking-tight leading-relaxed group-hover:text-blue-700 transition-colors">
                                                            {item.judul}
                                                        </span>
                                                        <p className="text-[11px] text-gray-500 line-clamp-1 italic max-w-2xl">
                                                            {item.isian}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-8 text-center">
                                                    <Link 
                                                        to={`/dashboard/informasi/pengumuman/${item.id}`}
                                                        className="inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-700 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 hover:text-white transition-all shadow-sm active:scale-95"
                                                    >
                                                        Lihat Detail
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-32 text-center">
                                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">
                                    Belum ada pengumuman dalam 3 bulan terakhir
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PengumumanPage;