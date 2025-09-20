import React, { useState, useEffect } from 'react';
import { getPengajuanUjianData, submitPengajuanUjian, getMahasiswaData } from '../../api/api';

const PengajuanUjianPage = () => {
    const [ujianData, setUjianData] = useState(null);
    const [mahasiswaData, setMahasiswaData] = useState(null);
    const [sertifikasi, setSertifikasi] = useState([]);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getPengajuanUjianData(nim);
            const mhsData = await getMahasiswaData(nim);
            setUjianData(data);
            setMahasiswaData(mhsData);
            console.log(mahasiswaData);
        };
        fetchData();
    }, );


    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSertifikasi(prev => checked ? [...prev, value] : prev.filter(item => item !== value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        const formData = new FormData();
        formData.append('nim', nim);
        formData.append('judul_skripsi', ujianData?.judul_disetujui?.judul || '');
        formData.append('pembimbing1', ujianData?.judul_disetujui?.pembimbing || '');
        formData.append('pembimbing2', '');
        formData.append('ipk_terakhir', ujianData?.ipk_sks?.ipk_terakhir || 0);
        formData.append('jumlah_sks', ujianData?.ipk_sks?.jumlah_sks || 0);
        formData.append('sertifikasi', sertifikasi.join(', '));

        const response = await submitPengajuanUjian(formData);
        if (response.status === 'success') {
            alert(response.message);
        } else {
            alert('Pengajuan gagal: ' + response.message);
        }
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Pengajuan Ujian Skripsi/TA</h1>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <form id="pengajuanUjianForm" className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label htmlFor="judul_ujian" className="block text-sm font-medium text-gray-700">Judul Skripsi/TA</label>
                            <input type="text" id="judul_ujian" name="judul_ujian" value={ujianData?.judul_disetujui?.judul || 'Belum ada judul yang disetujui.'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div>
                            <label htmlFor="pembimbing1" className="block text-sm font-medium text-gray-700">Pembimbing 1</label>
                            <input type="text" id="pembimbing1" name="pembimbing1" value={ujianData?.judul_disetujui?.pembimbing || '-'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div>
                            <label htmlFor="pembimbing2" className="block text-sm font-medium text-gray-700">Pembimbing 2</label>
                            <input type="text" id="pembimbing2" name="pembimbing2" value={'-'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div>
                            <label htmlFor="ipk_ujian" className="block text-sm font-medium text-gray-700">IPK Terakhir</label>
                            <input type="text" id="ipk_ujian" name="ipk_ujian" value={ujianData?.ipk_sks?.ipk_terakhir || '-'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div>
                            <label htmlFor="sks_ujian" className="block text-sm font-medium text-gray-700">Jumlah SKS</label>
                            <input type="text" id="sks_ujian" name="sks_ujian" value={ujianData?.ipk_sks?.jumlah_sks || '-'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="sertifikasi" className="block text-sm font-medium text-gray-700">Sertifikasi</label>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center">
                                    <input id="sertifikat_toefl" name="sertifikasi" type="checkbox" value="TOEFL" checked={sertifikasi.includes('TOEFL')} onChange={handleCheckboxChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/>
                                    <label htmlFor="sertifikat_toefl" className="ml-3 block text-sm font-medium text-gray-700">TOEFL</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="sertifikat_lainnya" name="sertifikasi" type="checkbox" value="Lainnya" checked={sertifikasi.includes('Lainnya')} onChange={handleCheckboxChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/>
                                    <label htmlFor="sertifikat_lainnya" className="ml-3 block text-sm font-medium text-gray-700">Lainnya</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Ajukan Ujian
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default PengajuanUjianPage;