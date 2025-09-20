import React, { useState, useEffect } from 'react';
import { getDaftarNilaiKumulatif } from '../../api/api';

const DaftarNilaiKumulatifPage = () => {
    const [nilaiData, setNilaiData] = useState([]);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getDaftarNilaiKumulatif(nim);
            setNilaiData(data);
        };
        fetchData();
    }, []);

    const totalSks = nilaiData.reduce((sum, mk) => sum + parseInt(mk.sks), 0);
    const totalBobotSks = nilaiData.reduce((sum, mk) => sum + parseFloat(mk.bobot_sks), 0);
    const ipk = totalSks > 0 ? (totalBobotSks / totalSks).toFixed(2) : '0.00';

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Daftar Nilai Kumulatif</h1>
            </header>
            
            <div id="nilai-kumulatif-content-container" className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200">
                    <h2 className="font-bold text-lg">Daftar Mata Kuliah</h2>
                </div>
                
                {nilaiData.length > 0 ? (
                    <div id="mata-kuliah-list-container">
                        {window.innerWidth < 768 ? (
                            <div className="p-4 space-y-4">
                                {nilaiData.map((mk, index) => (
                                    <div key={index} className="khs-card">
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-lg">{mk.nama_mk}</h3>
                                            <p className="text-sm text-gray-500">{mk.kode_mk}</p>
                                        </div>
                                        <div className="flex flex-col items-end space-y-1">
                                            <div className={`grade-badge grade-${mk.grade.toUpperCase()}`}>{mk.grade}</div>
                                            <p className="text-xs text-gray-500">SKS: {mk.sks}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-500">
                                    <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                                        <tr>
                                            <th scope="col" className="py-3 px-6 rounded-tl-lg">Kode Mata Kuliah</th>
                                            <th scope="col" className="py-3 px-6">Mata Kuliah</th>
                                            <th scope="col" className="py-3 px-6 text-center">Grade</th>
                                            <th scope="col" className="py-3 px-6 text-center">Bobot</th>
                                            <th scope="col" className="py-3 px-6 text-center">SKS</th>
                                            <th scope="col" className="py-3 px-6 text-center rounded-tr-lg">Bobot x SKS</th>
                                        </tr>
                                    </thead>
                                    <tbody id="mata-kuliah-table-body">
                                        {nilaiData.map((mk, index) => (
                                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                <td className="py-3 px-6 whitespace-nowrap">{mk.kode_mk}</td>
                                                <td className="py-3 px-6">{mk.nama_mk}</td>
                                                <td className="py-3 px-6 text-center">{mk.grade}</td>
                                                <td className="py-3 px-6 text-center">{mk.bobot}</td>
                                                <td className="py-3 px-6 text-center">{mk.sks}</td>
                                                <td className="py-3 px-6 text-center">{mk.bobot_sks}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="text-xs text-white uppercase bg-blue-600">
                                        <tr className="font-bold">
                                            <td colSpan="4" className="py-3 px-6 text-right">JUMLAH</td>
                                            <td className="py-3 px-6 text-center">{totalSks}</td>
                                            <td className="py-3 px-6 text-center">{totalBobotSks.toFixed(2)}</td>
                                        </tr>
                                        <tr className="font-bold">
                                            <td colSpan="5" className="py-3 px-6 text-right">IPK TOTAL</td>
                                            <td className="py-3 px-6 text-center">{ipk}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </div>
                ) : (
                    <div id="mata-kuliah-list-container" className="text-center py-4 text-gray-500">Memuat data...</div>
                )}
                
                {window.innerWidth < 768 && nilaiData.length > 0 && (
                    <div id="total-summary-mobile" className="mt-4 md:hidden bg-white rounded-lg shadow-md">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-gray-700">Total SKS</span>
                                <span id="total-sks-value" className="font-semibold text-gray-900">{totalSks}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                                <span className="font-bold text-gray-700">Total Bobot SKS</span>
                                <span id="total-bobot-sks-value" className="font-semibold text-gray-900">{totalBobotSks.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="font-bold text-gray-700">IPK</span>
                                <span id="ipk-value" className="text-xl font-extrabold text-blue-900">{ipk}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default DaftarNilaiKumulatifPage;