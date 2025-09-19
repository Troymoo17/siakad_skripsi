// src/pages/DetailKehadiranPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getKehadiranDetail } from '../api/api';

const DetailKehadiranPage = () => {
    const { kode_mk } = useParams();
    const location = useLocation();
    const mataKuliahName = location.state?.mata_kuliah;
    const [detailKehadiran, setDetailKehadiran] = useState([]);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getKehadiranDetail(nim, kode_mk);
            setDetailKehadiran(data);
        };
        fetchData();
    }, [kode_mk]);

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Detail Kehadiran</h1>
                    <p id="detail-mk-name" className="text-sm text-gray-500 mt-1">Mata Kuliah: {mataKuliahName || 'Memuat...'}</p>
                </div>
            </header>
            
            <div id="detail-kehadiran-content-container" className="bg-white rounded-lg shadow-md overflow-hidden">
                {detailKehadiran.length > 0 ? (
                    <div className="p-4 space-y-4">
                        {detailKehadiran.map(item => (
                            <div key={item.pertemuan} className="khs-card flex-col items-start space-y-2">
                                <h3 className="font-bold text-base text-gray-800">Pertemuan {item.pertemuan}</h3>
                                <p className="text-xs text-gray-500">Tanggal: {item.tanggal}</p>
                                <p className="text-xs text-gray-500">Dosen: {item.dosen}</p>
                                <div className={`w-full text-center p-2 rounded-md font-semibold text-white mt-2 status-${item.status}`}>{item.status}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4 text-gray-500">Memuat detail kehadiran...</div>
                )}
            </div>
        </main>
    );
};

export default DetailKehadiranPage;