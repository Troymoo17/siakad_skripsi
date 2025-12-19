import React, { useState, useEffect } from 'react';
import { getDownloadData } from '../../api/api';

const DownloadPage = () => {
    const [downloadData, setDownloadData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getDownloadData();
                setDownloadData(data);
            } catch (error) {
                console.error("Gagal memuat data download:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderDesktopTable = () => (
        <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left text-sm">
                <thead className="text-[10px] text-gray-400 uppercase tracking-[0.2em] bg-gray-50/50 border-y border-gray-100">
                    <tr>
                        <th className="py-4 px-6 w-20">No</th>
                        <th className="py-4 px-6">Keterangan Dokumen</th>
                        <th className="py-4 px-6 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {downloadData.map((item, index) => (
                        <tr key={index} className="hover:bg-blue-50/40 transition-colors group">
                            <td className="py-5 px-6 font-medium text-gray-500">{item.no}</td>
                            <td className="py-5 px-6 font-black text-gray-800 uppercase text-xs tracking-tight">
                                {item.keterangan}
                            </td>
                            <td className="py-5 px-6 text-right">
                                <a 
                                    href={item.link_download} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-[10px] font-black text-blue-700 uppercase tracking-widest hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all shadow-sm"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="召M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Unduh File
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="space-y-4 md:hidden">
            {downloadData.map((item, index) => (
                <div key={index} className="bg-white rounded-[1.5rem] border border-gray-200 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dokumen #{item.no}</span>
                    </div>
                    <h3 className="font-black text-gray-800 text-xs uppercase mb-5 leading-relaxed">
                        {item.keterangan}
                    </h3>
                    <a 
                        href={item.link_download} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-2 w-full bg-blue-50 text-blue-700 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        Download Sekarang
                    </a>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-[#f8fafc] min-h-screen">
            <div className="w-full">
                {/* Header Page */}
                <header className="mb-10">
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Pusat Download</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1 italic">Institut Widya Pratama Pekalongan</p>
                </header>

                <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-blue-700 rounded-full"></div>
                            <h2 className="text-gray-800 font-black text-[11px] tracking-[0.2em] uppercase">Daftar Dokumen Tersedia</h2>
                        </div>
                        <div className="bg-blue-50 px-4 py-1 rounded-full border border-blue-100">
                            <span className="text-[10px] font-black text-blue-700 uppercase">{downloadData.length} Berkas</span>
                        </div>
                    </div>

                    <div className="p-2 md:p-0">
                        {loading ? (
                            <div className="p-32 text-center">
                                <div className="w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Menyiapkan Berkas...</p>
                            </div>
                        ) : downloadData.length > 0 ? (
                            <>
                                {renderDesktopTable()}
                                <div className="p-4 md:hidden">
                                    {renderMobileCards()}
                                </div>
                            </>
                        ) : (
                            <div className="p-32 text-center">
                                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Tidak ada dokumen yang dapat diunduh</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DownloadPage;