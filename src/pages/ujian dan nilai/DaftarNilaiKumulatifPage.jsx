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

    const renderDesktopTable = () => (
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
    );

    const renderMobileCards = () => (
        <div className="p-4 space-y-4">
            {nilaiData.map((mk, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg text-gray-800">{mk.nama_mk}</h3>
                            <p className="text-sm text-gray-500">{mk.kode_mk}</p>
                        </div>
                        <div className={`py-1 px-3 rounded-full text-white font-bold text-lg grade-badge grade-${mk.grade.toUpperCase()}`}>
                            {mk.grade}
                        </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p className="flex justify-between items-center">
                            <span className="font-semibold">SKS:</span>
                            <span>{mk.sks}</span>
                        </p>
                        <p className="flex justify-between items-center">
                            <span className="font-semibold">Bobot:</span>
                            <span>{mk.bobot}</span>
                        </p>
                        <p className="flex justify-between items-center">
                            <span className="font-semibold">Bobot x SKS:</span>
                            <span>{mk.bobot_sks}</span>
                        </p>
                    </div>
                </div>
            ))}
            <div id="total-summary-mobile" className="mt-4 bg-white rounded-lg shadow-md border border-gray-200 p-4">
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
    );

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
                    <>
                        <div className="hidden md:block">
                            {renderDesktopTable()}
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

export default DaftarNilaiKumulatifPage;