import React, { useState, useEffect } from 'react';
import { getPointBookHistory } from '../../api/api';

const PointBookPage = () => {
    const [pointBookData, setPointBookData] = useState(null);

    const formatDateToDMY = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getPointBookHistory(nim);
            setPointBookData(data);
        };
        fetchData();
    }, []);

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                    <tr>
                        <th scope="col" className="py-3 px-6 rounded-tl-lg">Tanggal</th>
                        <th scope="col" className="py-3 px-6">Nama Kegiatan</th>
                        <th scope="col" className="py-3 px-6">Poin</th>
                        <th scope="col" className="py-3 px-6 rounded-tr-lg">Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    {pointBookData.data.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="py-3 px-6">{formatDateToDMY(item.tanggal)}</td>
                            <td className="py-3 px-6">{item.nama_kegiatan}</td>
                            <td className="py-3 px-6">{item.poin}</td>
                            <td className="py-3 px-6">{item.keterangan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="p-4 space-y-4">
            {pointBookData.data.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-base text-gray-800">{item.nama_kegiatan}</h3>
                        <div className="px-2 py-1 text-xs font-semibold text-white rounded-full bg-blue-600">{item.poin} Poin</div>
                    </div>
                    <div className="flex flex-col text-sm text-gray-600">
                        <p>Tanggal: {formatDateToDMY(item.tanggal)}</p>
                        <p>Keterangan: {item.keterangan}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Histori Point Book</h1>
            </header>
            
            <div id="pointbook-content-container" className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200">
                    <h2 className="font-bold text-lg">Daftar Kegiatan</h2>
                    <div className="mt-2 text-sm text-gray-500">
                        Total Poin: <span id="total-poin-value" className="font-semibold text-gray-900">{pointBookData?.total_poin || 'Memuat...'}</span>
                    </div>
                </div>
                <div id="pointbook-list-container" className="text-center py-4 text-gray-500">
                    {pointBookData ? (
                        <>
                        <div className='hidden md:block'>
                            {renderDesktopTable()}
                        </div>
                        <div className='md:hidden'>
                            {renderMobileCards()}
                        </div>
                        </>
                        ) : (
                            <p>Tidak ada data Point Book yang ditemukan.</p>
                        )}
                </div>
            </div>
        </main>
    );
};

export default PointBookPage;