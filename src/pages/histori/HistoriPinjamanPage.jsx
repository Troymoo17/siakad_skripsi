import React, { useState, useEffect } from 'react';
import { getPinjamanHistory } from '../../api/api';

const HistoriPinjamanPage = () => {
    const [pinjamanData, setPinjamanData] = useState(null);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getPinjamanHistory(nim);
            setPinjamanData(data);
        };
        fetchData();
    }, []);

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                    <tr>
                        <th scope="col" className="py-3 px-6 rounded-tl-lg">Tanggal Pinjam</th>
                        <th scope="col" className="py-3 px-6">Tanggal Kembali</th>
                        <th scope="col" className="py-3 px-6 text-center">Nama Buku</th>
                        <th scope="col" className="py-3 px-6 rounded-tr-lg text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pinjamanData.data.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="py-3 px-6">{item.tanggal_pinjam}</td>
                            <td className="py-3 px-6">{item.tanggal_kembali || '-'}</td>
                            <td className="py-3 px-6 text-center">{item.nama_buku}</td>
                            <td className="py-3 px-6 text-center">{item.status_pinjaman}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="p-4 space-y-4">
            {pinjamanData.data.map((item, index) => {
                const statusBadgeClass = item.status_pinjaman === 'Sudah Kembali' ? 'bg-green-600' : 'bg-red-600';
                return (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-base text-gray-800">{item.nama_buku}</h3>
                            <div className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusBadgeClass}`}>{item.status_pinjaman}</div>
                        </div>
                        <div className="flex flex-col text-sm text-gray-600">
                            <p>Tanggal Pinjam: {item.tanggal_pinjam}</p>
                            <p>Tanggal Kembali: {item.tanggal_kembali || 'Belum kembali'}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Histori Pinjaman</h1>
            </header>
            <div id="pinjaman-content-container" className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200">
                    <h2 className="font-bold text-lg">Daftar Pinjaman</h2>
                </div>
                <div id="pinjaman-list-container" className="text-center py-4 text-gray-500">
                    {pinjamanData ? (
                        pinjamanData.data.length > 0 ? (
                            window.innerWidth < 768 ? renderMobileCards() : renderDesktopTable()
                        ) : (
                            <p>Tidak ada data Pinjaman yang ditemukan.</p>
                        )
                    ) : (
                        <p>Memuat data...</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default HistoriPinjamanPage;