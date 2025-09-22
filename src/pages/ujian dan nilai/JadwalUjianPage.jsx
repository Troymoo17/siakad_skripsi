import React, { useState, useEffect } from 'react';
import { getJadwalUjian } from '../../api/api';

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

    const renderDesktopCards = (data) => {
        if (!data || data.length === 0) {
            return <div className="text-center py-4 text-gray-500">Tidak ada jadwal yang ditemukan.</div>;
        }

        return (
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800 border-b pb-2 mb-2">{item.mata_kuliah}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Tanggal:</span>
                                <span>{item.tanggal}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Hari:</span>
                                <span>{item.hari}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Waktu:</span>
                                <span>{item.mulai.substring(0, 5)} - {item.selesai.substring(0, 5)}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Ruangan:</span>
                                <span>{item.ruangan}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Kelas:</span>
                                <span>{item.kelas}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Dosen:</span>
                                <span>{item.dosen}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">No. Kursi:</span>
                                <span>{item.no_kursi}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Soal:</span>
                                <span>{item.soal}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderMobileCards = (data, title) => {
        if (!data || data.length === 0) {
            return <div className="text-center py-4 text-gray-500">Tidak ada {title} yang ditemukan.</div>;
        }
        return (
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {data.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow border border-gray-200">
                        <h3 className="text-md font-bold text-gray-800 mb-2">{item.mata_kuliah}</h3>
                        <div className="text-gray-600 space-y-1 text-sm">
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Tanggal:</span>
                                <span>{item.tanggal}, {item.hari}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Waktu:</span>
                                <span>{item.mulai.substring(0, 5)} - {item.selesai.substring(0, 5)}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Ruangan:</span>
                                <span>{item.ruangan}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Kelas:</span>
                                <span>{item.kelas}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Dosen:</span>
                                <span>{item.dosen}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">No. Kursi:</span>
                                <span>{item.no_kursi}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Soal:</span>
                                <span>{item.soal}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Jadwal Ujian</h1>
            <div className="space-y-8">
                <div id="uts-container" className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                    <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">Ujian Tengah Semester (UTS)</h2>
                    {jadwalUjian?.uts ? (
                        <>
                            {renderDesktopCards(jadwalUjian.uts, "Ujian Tengah Semester (UTS)")}
                            {renderMobileCards(jadwalUjian.uts, "Ujian Tengah Semester (UTS)")}
                        </>
                    ) : (
                        <div className="text-center py-4 text-gray-500">Memuat jadwal...</div>
                    )}
                </div>

                <div id="uas-container" className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                    <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">Ujian Akhir Semester (UAS)</h2>
                    {jadwalUjian?.uas ? (
                        <>
                            {renderDesktopCards(jadwalUjian.uas, "Ujian Akhir Semester (UAS)")}
                            {renderMobileCards(jadwalUjian.uas, "Ujian Akhir Semester (UAS)")}
                        </>
                    ) : (
                        <div className="text-center py-4 text-gray-500">Memuat jadwal...</div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default JadwalUjianPage;