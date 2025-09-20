import React, { useState, useEffect } from 'react';
import { getKHSData } from '../../api/api';

const KartuHasilStudiPage = () => {
    const [khsData, setKhsData] = useState(null);
    const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getKHSData(nim);
            setKhsData(data);
        };
        fetchData();
    }, []);

    const handleSemesterChange = (e) => {
        setSelectedSemesterIndex(e.target.value);
    };

    const currentKHS = khsData?.data?.[selectedSemesterIndex];

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                    <tr>
                        <th scope="col" className="py-3 px-6 rounded-tl-lg">Kode MK</th>
                        <th scope="col" className="py-3 px-6">Mata Kuliah</th>
                        <th scope="col" className="py-3 px-6 text-center">Grade</th>
                        <th scope="col" className="py-3 px-6 text-center">Bobot</th>
                        <th scope="col" className="py-3 px-6 text-center">SKS</th>
                        <th scope="col" className="py-3 px-6 text-center rounded-tr-lg">Bobot x SKS</th>
                    </tr>
                </thead>
                <tbody>
                    {currentKHS?.mata_kuliah.map((mk, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="py-3 px-6 whitespace-nowrap">{mk.kode_mk}</td>
                            <td className="py-3 px-6">{mk.nama_mk}</td>
                            <td className="py-3 px-6 text-center font-semibold">{mk.grade}</td>
                            <td className="py-3 px-6 text-center">{mk.bobot}</td>
                            <td className="py-3 px-6 text-center">{mk.sks}</td>
                            <td className="py-3 px-6 text-center">{mk.bobot_sks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="khs-card-container">
            {currentKHS?.mata_kuliah.map((mk, index) => (
                <div key={index} className="khs-card">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">{mk.nama_mk}</h3>
                        <p className="text-sm text-gray-500">{mk.sks} SKS</p>
                    </div>
                    <div className={`grade-badge grade-${mk.grade.toUpperCase()}`}>{mk.grade}</div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Kartu Hasil Studi (KHS)</h1>
                
                <div className="khs-info-mobile">
                    <p className="text-4xl font-extrabold text-blue-900">{currentKHS?.ips || 'Memuat...'}</p>
                    <p className="text-sm text-gray-500">IP Semester</p>
                </div>

                <div className="flex items-center justify-center md:justify-start mb-6">
                    <label htmlFor="semester-select" className="text-gray-700 font-semibold mr-4">Pilih Semester:</label>
                    <select id="semester-select" value={selectedSemesterIndex} onChange={handleSemesterChange} className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                        {khsData?.data?.map((semester, index) => (
                            <option key={index} value={index}>Semester {semester.semester}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4 text-sm text-gray-600 khs-info-desktop">
                    <p>Program Studi: <span id="program-studi-khs" className="font-semibold">{khsData?.program_studi || 'Memuat...'}</span></p>
                    <p>Jenjang Studi: <span id="jenjang-studi-khs" className="font-semibold">{khsData?.jenjang_studi || 'Memuat...'}</span></p>
                </div>

                <div id="semester-card-container">
                    {window.innerWidth < 768 ? renderMobileCards() : renderDesktopTable()}
                </div>
            </div>
        </main>
    );
};

export default KartuHasilStudiPage;