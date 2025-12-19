import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnnouncementDetail } from '../../api/api';

const DetailPengumumanPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Inisialisasi navigate
    const [announcement, setAnnouncement] = useState(null);

    const formatDateToDMY = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAnnouncementDetail(id);
            setAnnouncement(data);
        };
        fetchData();
    }, [id]);

    if (!announcement) {
        return <div className="text-center py-4 text-gray-500">Memuat detail pengumuman...</div>;
    }

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {/* Header  */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Detail Pengumuman</h1>
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-sm text-gray-600 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali
                </button>
            </header>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">{announcement.judul}</h2>
                <div className="text-sm text-gray-600 space-y-4">
                    <p className="text-xs text-gray-500">Tanggal Upload: {formatDateToDMY(announcement.tanggal_upload)}</p>
                    <div className="prose max-w-none">
                        <p>{announcement.isian}</p>
                    </div>
                    {announcement.link_pdf && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <h3 className="font-semibold text-gray-800">Dokumen Terkait</h3>
                            <a href={announcement.link_pdf} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-600 hover:underline">
                                File Lampiran
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default DetailPengumumanPage;