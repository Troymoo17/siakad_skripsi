import React, { useState, useEffect } from 'react';
import { getBimbinganSkripsiHistory } from '../../api/api';

const BimbinganSkripsiPage = () => {
    const [historiBimbingan, setHistoriBimbingan] = useState([]);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const history = await getBimbinganSkripsiHistory(nim);
            setHistoriBimbingan(history);
        };
        fetchData();
    }, []);

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                    <tr>
                        <th scope="col" className="py-3 px-6 rounded-tl-lg">Tanggal</th>
                        <th scope="col" className="py-3 px-6">Bab</th>
                        <th scope="col" className="py-3 px-6">Pembimbing</th>
                        <th scope="col" className="py-3 px-6">Uraian</th>
                        <th scope="col" className="py-3 px-6 text-center rounded-tr-lg">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {historiBimbingan.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="py-3 px-6 whitespace-nowrap">{item.tanggal}</td>
                            <td className="py-3 px-6">{item.bab}</td>
                            <td className="py-3 px-6">{item.pembimbing}</td>
                            <td className="py-3 px-6">{item.uraian}</td>
                            <td className="py-3 px-6 text-center">
                                <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${item.status === 'Diterima' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="p-4 space-y-4">
            {historiBimbingan.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                    <div className="flex justify-between items-center pb-2 mb-2 border-b">
                        <h3 className="font-bold text-base text-gray-800">{item.bab}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${item.status === 'Diterima' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                            {item.status}
                        </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                        <div className='flex flex-col'>
                            <span className="font-semibold">Tanggal:</span>
                            <span className="ml-2">{item.tanggal}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className="font-semibold">Pembimbing:</span>
                            <span className="ml-2">{item.pembimbing}</span>
                        </div>
                        <div className="mt-4 pt-2 border-t">
                            <span className="font-semibold block mb-1">Uraian:</span>
                            <p className="text-gray-700">{item.uraian}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Bimbingan Skripsi / Tugas Akhir</h1>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">Data Bimbingan Skripsi / Tugas Akhir</h2>
                {historiBimbingan && historiBimbingan.length > 0 ? (
                    <>
                        <div className="hidden md:block">
                            {renderDesktopTable()}
                        </div>
                        <div className="md:hidden">
                            {renderMobileCards()}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-gray-500">Memuat histori bimbingan...</div>
                )}
            </div>
        </main>
    );
};

export default BimbinganSkripsiPage;