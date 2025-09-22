import React, { useState, useEffect } from 'react';
import { getKMKData } from '../../api/api';

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

    const renderDesktopCards = () => (
        <>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">Informasi Mahasiswa</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <p>NIM: <span id="mahasiswa-nim" className="font-semibold">{kmkData?.mahasiswa?.nim || 'Memuat...'}</span></p>
                    <p>Nama: <span id="mahasiswa-nama" className="font-semibold">{kmkData?.mahasiswa?.nama || 'Memuat...'}</span></p>
                    <p>Program Studi: <span className="font-semibold">{kmkData?.mahasiswa?.prodi || 'Memuat...'}</span></p>
                    <p>Jenjang Studi: <span className="font-semibold">{kmkData?.mahasiswa?.program || 'Memuat...'}</span></p>
                    <p className="md:col-span-2">Semester: <span id="semester-sekarang" className="font-semibold">{kmkData?.mahasiswa?.semester_sekarang || 'Memuat...'}</span></p>
                </div>
            </div>
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-4">
                {kmkData.matakuliah.map((mk, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800 border-b pb-2 mb-2">{mk.nama_mk}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Kode Matkul:</span>
                                <span>{mk.kode_mk}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">SKS:</span>
                                <span>{mk.sks}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Kelas:</span>
                                <span>{mk.kelas}</span>
                            </p>
                        </div>
                    </div>
                ))}
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
            <div className="p-2 space-y-4">
                {kmkData?.matakuliah.map((mk, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                        <div className='border-b pb-2 mb-2'>
                            <h3 className="font-bold text-lg text-gray-800">{mk.nama_mk}</h3>
                        </div>
                        <div className='text-sm text-gray-500 space-y-1'>
                            <p className="text-xs text-gray-500">Kode: {mk.kode_mk}</p>
                            <p className="text-xs text-gray-500">SKS: {mk.sks}</p>
                            <p className="text-xs text-gray-500">Kelas: {mk.kelas}</p>
                        </div>
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
                    <>
                        <div className="hidden md:block">
                            {renderDesktopCards()}
                        </div>
                        <div className="md:hidden">
                            {renderMobileCards()}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-gray-500">Memuat data...</div>
                )}
            </div>
        </main>
    );
};

export default KMKPage;