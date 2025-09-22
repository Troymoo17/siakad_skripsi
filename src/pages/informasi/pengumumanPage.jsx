import React, { useState, useEffect } from 'react';
import { getAnnouncements } from '../../api/api';
import { Link } from 'react-router-dom';

const PengumumanPage = () => {
    const [pengumumanData, setPengumumanData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await getAnnouncements();
                const threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

                const filteredData = data.filter(announcement => {
                    const announcementDate = new Date(announcement.tanggal_upload);
                    return announcementDate >= threeMonthsAgo;
                });
                
                setPengumumanData(filteredData);
            } catch (error) {
                console.error("Failed to fetch announcements:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    return (
        <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Daftar Pengumuman Tiga Bulan Terakhir</h1>
            </header>
            <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
                <div className="space-y-4 text-sm">
                    {pengumumanData.length > 0 ? (
                        pengumumanData.map((item, index) => (
                            <div key={index} className="pb-3 border-b border-gray-200 last:border-b-0">
                                <div className="text-xs text-gray-500">{item.tanggal_upload}</div>
                                <Link to={`/dashboard/informasi/pengumuman/${item.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                                    {item.judul}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 italic">Tidak ada pengumuman dalam tiga bulan terakhir.</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default PengumumanPage;