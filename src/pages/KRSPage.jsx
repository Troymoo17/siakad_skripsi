// src/pages/KRSPage.js
import React, { useState, useEffect } from 'react';
import { getKRSData, submitKRS, getMahasiswaData } from '../api/api';

const KRSPage = () => {
    const [krsData, setKrsData] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [mahasiswaData, setMahasiswaData] = useState(null);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const mhsData = await getMahasiswaData(nim);
            setMahasiswaData(mhsData);
            const data = await getKRSData(nim, mhsData?.semester_sekarang);
            setKrsData(data);
            if (data?.krs_terisi) {
                setSelectedCourses(data.krs_terisi);
            }
        };
        fetchData();
    }, []);

    const handleCheckboxChange = (kode_mk) => {
        setSelectedCourses(prev =>
            prev.includes(kode_mk) ? prev.filter(id => id !== kode_mk) : [...prev, kode_mk]
        );
    };

    const handleKRSSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        const semester = mahasiswaData?.semester_sekarang;
        if (!nim || !semester) return;

        const success = await submitKRS(nim, semester, selectedCourses);
        if (success) {
            alert('KRS berhasil disimpan!');
            const updatedData = await getKRSData(nim, semester);
            setKrsData(updatedData);
        } else {
            alert('Gagal menyimpan KRS. Silakan coba lagi.');
        }
    };

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                    <tr>
                        <th scope="col" className="py-3 px-6 rounded-tl-lg">Pilih</th>
                        <th scope="col" className="py-3 px-6">Kode Mata Kuliah</th>
                        <th scope="col" className="py-3 px-6">Mata Kuliah</th>
                        <th scope="col" className="py-3 px-6 text-center">SKS</th>
                        <th scope="col" className="py-3 px-6 rounded-tr-lg text-center">Semester</th>
                    </tr>
                </thead>
                <tbody id="krs-table-body">
                    {krsData.mata_kuliah_tersedia.map(mk => (
                        <tr key={mk.kode_mk} className="bg-white border-b hover:bg-gray-50">
                            <td className="py-3 px-6 text-center">
                                <input type="checkbox" name="mata_kuliah[]" value={mk.kode_mk} checked={selectedCourses.includes(mk.kode_mk)} onChange={() => handleCheckboxChange(mk.kode_mk)} />
                            </td>
                            <td className="py-3 px-6">{mk.kode_mk}</td>
                            <td className="py-3 px-6">{mk.nama_mk}</td>
                            <td className="py-3 px-6 text-center">{mk.sks}</td>
                            <td className="py-3 px-6 text-center">{mahasiswaData?.semester_sekarang}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="p-4 space-y-4">
            {krsData.mata_kuliah_tersedia.map(mk => (
                <label key={mk.kode_mk} className="khs-card flex-col items-start space-y-2 cursor-pointer">
                    <div className="flex items-center space-x-4 w-full">
                        <input type="checkbox" name="mata_kuliah[]" value={mk.kode_mk} checked={selectedCourses.includes(mk.kode_mk)} onChange={() => handleCheckboxChange(mk.kode_mk)} className="form-checkbox h-5 w-5 text-blue-600 rounded" />
                        <h3 className="font-bold text-base text-gray-800">{mk.nama_mk}</h3>
                    </div>
                    <div className="text-xs text-gray-500 w-full">Kode: {mk.kode_mk} | SKS: {mk.sks} | Semester: {mahasiswaData?.semester_sekarang}</div>
                </label>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Kartu Rencana Studi</h1>
            </header>
            <div id="krs-content-container" className="bg-white rounded-lg shadow-md overflow-hidden">
                <form id="krsForm" className="space-y-4" onSubmit={handleKRSSubmit}>
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-lg">Pilih Mata Kuliah</h2>
                        <p className="text-sm text-gray-500 mt-1">Semester: <span id="krs-semester">{mahasiswaData?.semester_sekarang || 'Memuat...'}</span></p>
                    </div>
                    {krsData ? (
                        <>
                            {window.innerWidth < 768 ? renderMobileCards() : renderDesktopTable()}
                            <div className="p-4 md:p-6 border-t border-gray-200 flex justify-end">
                                <button type="submit" className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition">Simpan KRS</button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-4 text-gray-500">Memuat daftar mata kuliah...</div>
                    )}
                </form>
            </div>
        </main>
    );
};

export default KRSPage;