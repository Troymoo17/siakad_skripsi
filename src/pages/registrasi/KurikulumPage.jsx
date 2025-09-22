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

    const renderDesktopCards = () => (
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-4">
            {kurikulumData.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h3 className="font-bold text-lg text-gray-800 border-b pb-2 mb-2">{item.nama_mk}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p className="flex justify-between items-center">
                            <span className="font-semibold">Kode Matkul:</span>
                            <span>{item.kode_mk}</span>
                        </p>
                        <p className="flex justify-between items-center">
                            <span className="font-semibold">SKS:</span>
                            <span>{item.sks}</span>
                        </p>
                        <p className="flex justify-between items-center">
                            <span className="font-semibold">Grade Min:</span>
                            <span>{item.grade_min}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderMobileCards = () => (
        <div className="p-4 space-y-4 md:hidden">
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
                <div className="p-4">
                    {kurikulumData.length > 0 ? (
                        <>
                        <div className='hidden md:block'>
                            {renderDesktopCards()}
                        </div>
                        <div className='md:hidden'>
                            {renderMobileCards()}
                        </div>
                        </>
                    ) : (
                        <div className="text-center py-4 text-gray-500">Memuat data...</div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default KurikulumPage;