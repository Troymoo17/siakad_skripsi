// src/pages/JadwalUjianPage.js
import React, { useState, useEffect } from 'react';
import { getJadwalUjian } from '../api/api';

const JadwalUjianPage = () => {
    const [jadwalUjian, setJadwalUjian] = useState(null);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getJadwalUjian(nim);
            setJadwalUjian(data);
        };
        fetchData();
    }, []);

    const renderTable = (data, title) => {
    if (!data || data.length === 0) {
        return <div className="text-center py-4 text-gray-500">Tidak ada {title} yang ditemukan.</div>;
    }
        return (
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                        <tr>
                            <th scope="col" className="py-3 px-6 rounded-tl-lg whitespace-nowrap">Tanggal</th>
                            <th scope="col" className="py-3 px-6 whitespace-nowrap">Hari</th>
                            <th scope="col" className="py-3 px-6 whitespace-nowrap">Mulai</th>
                            <th scope="col" className="py-3 px-6 whitespace-nowrap">Selesai</th>
                            <th scope="col" className="py-3 px-6 whitespace-nowrap">Ruangan</th>
                            <th scope="col" className="py-3 px-6 whitespace-nowrap">Mata Kuliah</th>
                            <th scope="col" className="py-3 px-6 whitespace-nowrap">Kelas</th>
                            <th scope="col" className="py-3 px-6 whitespace-nowrap">Dosen</th>
                            <th scope="col" className="py-3 px-6 whitespace-nowrap">No. Kursi</th>
                            <th scope="col" className="py-3 px-6 rounded-tr-lg whitespace-nowrap">Soal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <td className="py-3 px-6 whitespace-nowrap">{item.tanggal}</td>
                                <td className="py-3 px-6">{item.hari}</td>
                                <td className="py-3 px-6">{item.mulai.substring(0, 5)}</td>
                                <td className="py-3 px-6">{item.selesai.substring(0, 5)}</td>
                                <td className="py-3 px-6">{item.ruangan}</td>
                                <td className="py-3 px-6">{item.mata_kuliah}</td>
                                <td className="py-3 px-6">{item.kelas}</td>
                                <td className="py-3 px-6">{item.dosen}</td>
                                <td className="py-3 px-6">{item.no_kursi}</td>
                                <td className="py-3 px-6">{item.soal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Jadwal Ujian</h1>
            <div className="space-y-8">
                <div id="uts-container" className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                    <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">Ujian Tengah Semester (UTS)</h2>
                    {jadwalUjian?.uts ? renderTable(jadwalUjian.uts, "Ujian Tengah Semester (UTS)") : <div className="text-center py-4 text-gray-500">Memuat jadwal...</div>}
                </div>
                
                <div id="uas-container" className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                    <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">Ujian Akhir Semester (UAS)</h2>
                    {jadwalUjian?.uas ? renderTable(jadwalUjian.uas, "Ujian Akhir Semester (UAS)") : <div className="text-center py-4 text-gray-500">Memuat jadwal...</div>}
                </div>
            </div>
        </main>
    );
};

export default JadwalUjianPage;