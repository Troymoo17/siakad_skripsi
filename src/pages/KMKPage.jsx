// src/pages/KMKPage.js
import React, { useState, useEffect } from 'react';
import { getKMKData } from '../api/api';

const KMKPage = () => {
    const [kmkData, setKmkData] = useState(null);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getKMKData(nim);
            setKmkData(data);
        };
        fetchData();
    }, []);

    const renderDesktopTable = () => (
        <>
            <div className="p-4 md:p-8 rounded-xl shadow-lg">
                <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">Informasi Mahasiswa dan Daftar Mata Kuliah</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
                    <p>NIM: <span id="mahasiswa-nim" className="font-semibold">{kmkData?.mahasiswa?.nim || 'Memuat...'}</span></p>
                    <p>Nama: <span id="mahasiswa-nama" className="font-semibold">{kmkData?.mahasiswa?.nama || 'Memuat...'}</span></p>
                    <p>Program Studi: <span className="font-semibold">{kmkData?.mahasiswa?.prodi || 'Memuat...'}</span></p>
                    <p>Jenjang Studi: <span className="font-semibold">{kmkData?.mahasiswa?.program || 'Memuat...'}</span></p>
                    <p className="md:col-span-2">Semester: <span id="semester-sekarang" className="font-semibold">{kmkData?.mahasiswa?.semester_sekarang || 'Memuat...'}</span></p>
                </div>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-sm text-gray-700">
                    <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                        <tr>
                            <th scope="col" className="py-3 px-6 rounded-tl-lg whitespace-nowrap">Kode Matkul</th>
                            <th scope="col" className="py-3 px-6 whitespace-nowrap">Mata Kuliah</th>
                            <th scope="col" className="py-3 px-6 text-center whitespace-nowrap">SKS</th>
                            <th scope="col" className="py-3 px-6 rounded-tr-lg text-center whitespace-nowrap">Kelas</th>
                        </tr>
                    </thead>
                    <tbody id="mata-kuliah-table-body">
                        {kmkData?.matakuliah.map((mk, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <td className="py-3 px-6 whitespace-nowrap">{mk.kode_mk}</td>
                                <td className="py-3 px-6 whitespace-nowrap">{mk.nama_mk}</td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">{mk.sks}</td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">{mk.kelas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );

    const renderMobileCards = () => (
        <>
            <div className="p-4 md:p-8">
                <h2 className="font-bold text-lg text-gray-800 mb-2">Informasi Mahasiswa</h2>
                <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>NIM:</strong> {kmkData?.mahasiswa?.nim || 'Memuat...'}</p>
                    <p><strong>Nama:</strong> {kmkData?.mahasiswa?.nama || 'Memuat...'}</p>
                    <p><strong>Program Studi:</strong> {kmkData?.mahasiswa?.prodi || 'Memuat...'}</p>
                    <p><strong>Jenjang Studi:</strong> {kmkData?.mahasiswa?.program || 'Memuat...'}</p>
                    <p><strong>Semester:</strong> {kmkData?.mahasiswa?.semester_sekarang || 'Memuat...'}</p>
                </div>
                <hr className="my-4" />
            </div>
            <div className="p-4 space-y-4">
                {kmkData?.matakuliah.map((mk, index) => (
                    <div key={index} className="khs-card flex-col items-start space-y-2">
                        <h3 className="font-bold text-lg text-gray-800">{mk.nama_mk}</h3>
                        <p className="text-xs text-gray-500">Kode: {mk.kode_mk}</p>
                        <p className="text-xs text-gray-500">SKS: {mk.sks}</p>
                        <p className="text-xs text-gray-500">Kelas: {mk.kelas}</p>
                    </div>
                ))}
            </div>
        </>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Kartu Mata Kuliah</h1>
            </header>
            <div id="kmk-content-container" className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                {kmkData ? (
                    window.innerWidth < 768 ? renderMobileCards() : renderDesktopTable()
                ) : (
                    <div className="text-center py-4 text-gray-500">Memuat data...</div>
                )}
            </div>
        </main>
    );
};

export default KMKPage;