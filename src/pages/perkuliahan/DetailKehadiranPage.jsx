import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getKehadiranDetail } from '../../api/api';

const DetailKehadiranPage = () => {
    const { kode_mk } = useParams();
    const location = useLocation();
    const mataKuliahName = location.state?.mata_kuliah;
    const [detailKehadiran, setDetailKehadiran] = useState([]);
    const [dosenPengajar, setDosenPengajar] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(true);
            const data = await getKehadiranDetail(nim, kode_mk);
            if (data.length > 0) {
                setDetailKehadiran(data);
                setDosenPengajar(data[0].dosen);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [kode_mk]);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Hadir': return 'bg-green-100 text-green-700 border-green-200';
            case 'Sakit': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Izin': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Tidak Hadir': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8 bg-[#f8fafc] min-h-screen">
            <div className="w-full mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Header Section */}
                    <div className="p-6 md:p-10 border-b border-gray-50 bg-gradient-to-r from-white to-gray-50/30">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="flex-1">
                                <button onClick={() => window.history.back()} className="mb-4 flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-[#005c97] transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                                    Kembali
                                </button>
                                <h1 className="text-2xl md:text-3xl font-black text-[#1e293b] tracking-tight mb-2 leading-tight">
                                    {mataKuliahName || 'Detail Kehadiran'}
                                </h1>
                                <p className="text-gray-400 text-xs md:text-sm font-bold flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                    Dosen: <span className="text-gray-600">{dosenPengajar || '...'}</span>
                                </p>
                            </div>
                            <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 flex flex-col items-center">
                                <span className="text-[10px] font-black text-[#005c97] uppercase tracking-widest mb-1">Mata Kuliah</span>
                                <span className="text-lg font-black text-[#1e293b]">{kode_mk}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 italic text-gray-400 text-xs">
                                <div className="w-8 h-8 border-4 border-[#005c97] border-t-transparent rounded-full animate-spin mb-4"></div>
                                Mengambil Detail Pertemuan...
                            </div>
                        ) : detailKehadiran.length > 0 ? (
                            <>
                                {/* Desktop Table */}
                                <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                                    <table className="w-full text-left text-sm">
                                        <thead className="text-xs text-white uppercase bg-gradient-to-r from-[#005c97] to-[#363795]">
                                            <tr>
                                                <th className="px-8 py-5 font-black tracking-widest">Pertemuan</th>
                                                <th className="px-8 py-5 font-black tracking-widest">Tanggal Perkuliahan</th>
                                                <th className="px-8 py-5 font-black tracking-widest text-center">Status Kehadiran</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {detailKehadiran.map(item => (
                                                <tr key={item.pertemuan} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-8 py-5 font-black text-[#1e293b]">Pertemuan {item.pertemuan}</td>
                                                    <td className="px-8 py-5 font-bold text-gray-500">{formatDateToDMY(item.tanggal)}</td>
                                                    <td className="px-8 py-5 text-center">
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border shadow-sm ${getStatusStyles(item.status)}`}>
                                                            {item.status === 'Tidak Hadir' ? 'Alfa' : item.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Cards */}
                                <div className="md:hidden space-y-4">
                                    {detailKehadiran.map(item => (
                                        <div key={item.pertemuan} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center relative overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-100"></div>
                                            <div>
                                                <h3 className="font-black text-gray-800 text-sm">Pertemuan {item.pertemuan}</h3>
                                                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{formatDateToDMY(item.tanggal)}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${getStatusStyles(item.status)}`}>
                                                {item.status === 'Tidak Hadir' ? 'Alfa' : item.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Data kehadiran belum tersedia untuk MK ini.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DetailKehadiranPage;