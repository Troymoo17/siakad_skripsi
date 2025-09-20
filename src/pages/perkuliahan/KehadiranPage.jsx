import React, { useState, useEffect } from 'react';
import { getKehadiranSummary } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const KehadiranPage = () => {
    const [kehadiranData, setKehadiranData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getKehadiranSummary(nim);
            setKehadiranData(data);
        };
        fetchData();
    }, []);

    const handleDetailClick = (kode_mk, mata_kuliah) => {
        navigate(`/dashboard/perkuliahan/kehadiran/${kode_mk}`, { state: { mata_kuliah } });
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Kehadiran</h1>
            </header>
            <div id="kehadiran-content-container" className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200">
                    <h2 className="font-bold text-lg">Rekapitulasi Kehadiran Mata Kuliah</h2>
                    <p className="text-sm text-gray-500 mt-1">Rekapitulasi total kehadiran berdasarkan status.</p>
                </div>
                {kehadiranData.length > 0 ? (
                    <div className="p-4 space-y-4">
                        {kehadiranData.map(item => (
                            <div key={item.kode_mk} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col items-start space-y-2">
                                <h3 className="font-bold text-lg text-gray-800">{item.mata_kuliah}</h3>
                                <div className="w-full flex justify-between space-x-2 text-xs text-gray-500">
                                    <div className="flex-1 p-2 bg-gray-100 rounded-lg text-center">Hadir: <span className="font-semibold text-green-600">{item.hadir}</span></div>
                                    <div className="flex-1 p-2 bg-gray-100 rounded-lg text-center">Izin: <span className="font-semibold text-yellow-600">{item.izin}</span></div>
                                    <div className="flex-1 p-2 bg-gray-100 rounded-lg text-center">Sakit: <span className="font-semibold text-red-600">{item.sakit}</span></div>
                                </div>
                                <button onClick={() => handleDetailClick(item.kode_mk, item.mata_kuliah)} className="w-full text-blue-600 hover:underline text-sm mt-2">Detail</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4 text-gray-500">Memuat rekapitulasi kehadiran...</div>
                )}
            </div>
        </main>
    );
};

export default KehadiranPage;