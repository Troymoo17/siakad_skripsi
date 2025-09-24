import React, { useState, useEffect } from 'react';
import { getSidangProposalResult } from '../../api/api';

const BimbinganProposalPage = () => {
    const [sidangProposalData, setSidangProposalData] = useState([]);

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
            const data = await getSidangProposalResult(nim);
            setSidangProposalData(data);
        };
        fetchData();
    }, []);

    const renderDesktopTable = () => {
        if (!sidangProposalData || sidangProposalData.length === 0) {
            return <div className="text-center py-4 text-gray-500">Tidak ada hasil sidang proposal yang ditemukan.</div>;
        }

        return (
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                        <tr>
                            <th scope="col" className="py-3 px-6 rounded-tl-lg">Judul</th>
                            <th scope="col" className="py-3 px-6">Pembimbing</th>
                            <th scope="col" className="py-3 px-6">Tanggal Sidang</th>
                            <th scope="col" className="py-3 px-6 text-center">Nilai</th>
                            <th scope="col" className="py-3 px-6 rounded-tr-lg">Revisi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sidangProposalData.map((item, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <td className="py-3 px-6">{item.judul_skripsi}</td>
                                <td className="py-3 px-6 whitespace-nowrap">{item.pembimbing || '-'}</td>
                                <td className="py-3 px-6 whitespace-nowrap">{formatDateToDMY(item.tanggal_sidang)}</td>
                                <td className="py-3 px-6 text-center font-bold text-lg">{item.nilai}</td>
                                <td className="py-3 px-6">{item.revisi || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderMobileCards = () => {
        if (!sidangProposalData || sidangProposalData.length === 0) {
            return <div className="text-center py-4 text-gray-500">Tidak ada hasil sidang proposal yang ditemukan.</div>;
        }
        return (
            <div className="p-4 space-y-4 md:hidden">
                {sidangProposalData.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-md text-gray-800">{item.judul_skripsi}</h3>
                            <span className="py-1 px-3 rounded-full text-white font-bold text-lg bg-blue-600">{item.nilai}</span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Pembimbing:</span>
                                <span>{item.pembimbing || '-'}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Tanggal Sidang:</span>
                                <span>{formatDateToDMY(item.tanggal_sidang)}</span>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="font-semibold">Revisi:</span>
                                <span>{item.revisi || '-'}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Hasil Sidang Proposal</h1>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                {sidangProposalData && sidangProposalData.length > 0 ? (
                    <>
                        {renderDesktopTable()}
                        {renderMobileCards()}
                    </>
                ) : (
                    <div className="text-center py-4 text-gray-500">Memuat data...</div>
                )}
            </div>
        </main>
    );
};

export default BimbinganProposalPage;