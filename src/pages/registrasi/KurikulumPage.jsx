import React, { useState, useEffect } from 'react';
import { getKurikulumData } from '../../api/api';

const KurikulumPage = () => {
    const [kurikulumData, setKurikulumData] = useState([]);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getKurikulumData(nim);
            setKurikulumData(data);
        };
        fetchData();
    }, []);

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                    <tr>
                        <th scope="col" className="py-3 px-6 rounded-tl-lg">Kode Matkul</th>
                        <th scope="col" className="py-3 px-6">Mata Kuliah</th>
                        <th scope="col" className="py-3 px-6 text-center">SKS</th>
                        <th scope="col" className="py-3 px-6 text-center rounded-tr-lg">Grade Min</th>
                    </tr>
                </thead>
                <tbody id="kurikulum-table-body">
                    {kurikulumData.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="py-3 px-6 whitespace-nowrap">{item.kode_mk}</td>
                            <td className="py-3 px-6">{item.nama_mk}</td>
                            <td className="py-3 px-6 text-center">{item.sks}</td>
                            <td className="py-3 px-6 text-center">{item.grade_min}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="p-4 space-y-4">
            {kurikulumData.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                    <div className="border-b pb-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{item.nama_mk}</h3>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                        <p className="text-xs text-gray-500">Kode: {item.kode_mk}</p>
                        <p className="text-xs text-gray-500">SKS: {item.sks}</p>
                        <p className="text-xs text-gray-500">Grade Min: {item.grade_min}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Daftar Kurikulum</h1>
            </header>
            <div id="kurikulum-content-container" className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200">
                    <h2 className="font-bold text-lg">Daftar Kurikulum</h2>
                    <p id="semester-info" className="text-sm text-gray-500 mt-1">Menampilkan mata kuliah kurikulum yang tersedia untuk semester saat ini.</p>
                </div>
                {kurikulumData.length > 0 ? (
                    <>
                    <div className='hidden md:block'>
                        {renderDesktopTable()}
                    </div>
                    <div className='md:hidden'>
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

export default KurikulumPage;