import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAnnouncementDetail } from '../../api/api';

const DetailPengumumanPage = () => {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);

    // Function to format date to d-m-Y
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
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Detail Pengumuman</h1>
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