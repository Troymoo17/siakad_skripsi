import React, { useState, useEffect } from 'react';
import { getDownloadData } from '../../api/api';

const DownloadPage = () => {
    const [downloadData, setDownloadData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDownloadData();
            setDownloadData(data);
        };
        fetchData();
    }, []);

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                    <tr>
                        <th scope="col" className="py-3 px-6 rounded-tl-lg">No</th>
                        <th scope="col" className="py-3 px-6">Keterangan</th>
                        <th scope="col" className="py-3 px-6 rounded-tr-lg text-center">Link Download</th>
                    </tr>
                </thead>
                <tbody>
                    {downloadData.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="py-3 px-6 whitespace-nowrap">{item.no}</td>
                            <td className="py-3 px-6">{item.keterangan}</td>
                            <td className="py-3 px-6 text-center">
                                <a href={item.link_download} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Download</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="p-4 space-y-4">
            {downloadData.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                    <div className="flex justify-between items-center pb-2 mb-2 border-b">
                        <h3 className="font-bold text-base text-gray-800">{item.keterangan}</h3>
                        <span className="text-sm font-semibold text-gray-500">{item.no}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-2">
                        <a href={item.link_download} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center py-2 px-4 rounded-lg  text-blue-600 font-semibold transition">
                            Download File
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Download</h1>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">Daftar Dokumen</h2>
                {downloadData.length > 0 ? (
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

export default DownloadPage;