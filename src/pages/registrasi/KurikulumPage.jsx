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
                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-800 uppercase leading-tight">{item.nama_mk}</h3>
                        <span className={
                            `text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap 
                            ${item.status === 'Wajib' 
                                ? 'text-blue-600 bg-blue-100' 
                                : 'text-green-600 bg-green-100'
                            }`
                        }>
                            {item.status}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-500 text-xs font-semibold">Kode MK</p>
                            <p className="font-bold text-gray-800">{item.kode_mk}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-500 text-xs font-semibold">SKS</p>
                            <p className="font-bold text-gray-800">{item.sks} SKS</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-500 text-xs font-semibold">Grade Minimal</p>
                            <p className="font-bold text-gray-800">{item.grade_min || '-'}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-500 text-xs font-semibold">Semester</p>
                            <p className="font-bold text-gray-800">{item.semester || '-'}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderMobileCards = () => (
        <div className="grid grid-cols-1 gap-4">
            {kurikulumData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex">
                    {/* Aksen Warna Samping berdasarkan Status */}
                    <div className={`w-2 ${item.status === 'Wajib' ? 'bg-blue-600' : 'bg-green-500'}`}></div>
                    
                    <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2 gap-2">
                            <h3 className="font-bold text-sm text-gray-800 leading-snug uppercase">{item.nama_mk}</h3>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                                item.status === 'Wajib' ? 'text-blue-700 bg-blue-50' : 'text-green-700 bg-green-50'
                            }`}>
                                {item.status}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-3">
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Kode</p>
                                <p className="text-xs font-semibold text-gray-700">{item.kode_mk}</p>
                            </div>
                            <div className="h-6 w-[1px] bg-gray-100"></div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">SKS</p>
                                <p className="text-xs font-semibold text-gray-700">{item.sks} SKS</p>
                            </div>
                            <div className="h-6 w-[1px] bg-gray-100"></div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Grade Min</p>
                                <p className="text-xs font-semibold text-gray-700">{item.grade_min || '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <header className="mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Daftar Kurikulum</h1>
                <p className="text-xs text-gray-500 mt-1">Daftar mata kuliah yang tersedia dalam kurikulum Anda.</p>
            </header>
            
            <div id="kurikulum-content-container">
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
                    <div className="bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center">
                        <p className="text-gray-400 text-sm font-medium italic">Memuat data kurikulum...</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default KurikulumPage;