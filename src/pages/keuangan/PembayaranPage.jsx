import React, { useState, useEffect } from 'react';
import { getPembayaranData } from '../../api/api';

const PembayaranPage = () => {
    const [pembayaranData, setPembayaranData] = useState(null);
    const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getPembayaranData(nim);
            setPembayaranData(data);
        };
        fetchData();
    }, []);

    const handleSemesterChange = (e) => {
        setSelectedSemesterIndex(e.target.value);
    };

    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

    const currentSemesterData = pembayaranData?.data?.[selectedSemesterIndex];

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                    <tr>
                        <th scope="col" className="py-3 px-6 rounded-tl-lg">Keterangan</th>
                        <th scope="col" className="py-3 px-6 text-center">Nominal Tagihan</th>
                        <th scope="col" className="py-3 px-6 text-center rounded-tr-lg">Nominal Bayar</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSemesterData?.rincian?.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="py-3 px-6 whitespace-nowrap">{item.deskripsi}</td>
                            <td className="py-3 px-6 text-center">{formatRupiah(item.nominal)}</td>
                            <td className="py-3 px-6"></td>
                        </tr>
                    ))}
                    <tr className="bg-gray-100 font-bold border-b border-gray-200">
                        <td className="py-3 px-6 text-left">Total Tagihan Semester {currentSemesterData?.semester}</td>
                        <td className="py-3 px-6 text-center">{formatRupiah(currentSemesterData?.tagihan || 0)}</td>
                        <td className="py-3 px-6"></td>
                    </tr>
                    {currentSemesterData?.pembayaran?.map((item, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="py-3 px-6 whitespace-nowrap">Pembayaran ({item.tanggal})</td>
                            <td className="py-3 px-6"></td>
                            <td className="py-3 px-6 text-center">{formatRupiah(item.nominal)}</td>
                        </tr>
                    ))}
                    <tr className="bg-gray-100 font-bold">
                        <td className="py-3 px-6 text-left">Total Sudah Dibayar</td>
                        <td className="py-3 px-6"></td>
                        <td className="py-3 px-6 text-center">{formatRupiah(currentSemesterData?.dibayar || 0)}</td>
                    </tr>
                    <tr className="bg-blue-100 font-bold">
                        <td className="py-3 px-6 text-left">Total Belum Dibayar</td>
                        <td className="py-3 px-6 text-center text-red-600">{formatRupiah(currentSemesterData?.sisa_tagihan || 0)}</td>
                        <td className="py-3 px-6"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h3 className="font-bold text-base mb-2">Virtual Account</h3>
                <p className="font-semibold text-lg text-blue-600">{pembayaranData?.virtual_account || 'Tidak Tersedia'}</p>
                <p className="text-xs text-gray-500 mt-1">Gunakan nomor ini untuk melakukan pembayaran.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h3 className="font-bold text-base mb-2">Rincian Tagihan Semester {currentSemesterData?.semester}</h3>
                {currentSemesterData?.rincian?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                        <p className="text-gray-600">{item.deskripsi}</p>
                        <span className="font-semibold">{formatRupiah(item.nominal)}</span>
                    </div>
                ))}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h3 className="font-bold text-base mb-2">Rincian Pembayaran Semester {currentSemesterData?.semester}</h3>
                {currentSemesterData?.pembayaran?.length > 0 ? (
                    currentSemesterData.pembayaran.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                            <p className="text-gray-600">Pembayaran ({item.tanggal})</p>
                            <span className="font-semibold text-green-600">{formatRupiah(item.nominal)}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 italic">Belum ada pembayaran.</p>
                )}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h3 className="font-bold text-lg mb-2">Ringkasan</h3>
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-700">Total Tagihan</p>
                        <span className="font-bold">{formatRupiah(currentSemesterData?.tagihan || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-700">Total Sudah Dibayar</p>
                        <span className="font-bold text-green-600">{formatRupiah(currentSemesterData?.dibayar || 0)}</span>
                    </div>
                    <hr className="my-2 border-gray-200" />
                    <div className="flex justify-between">
                        <p className="font-bold text-gray-800">Total Belum Dibayar</p>
                        <span className={`font-bold text-xl ${currentSemesterData?.sisa_tagihan > 0 ? 'text-red-600' : 'text-gray-500'}`}>{formatRupiah(currentSemesterData?.sisa_tagihan || 0)}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Tagihan / Pembayaran</h1>
                <div className="khs-info-mobile">
                    <p className="text-4xl font-extrabold text-blue-900">{formatRupiah(currentSemesterData?.tagihan || 0)}</p>
                    <p className="text-sm text-gray-500">Tagihan Semester</p>
                </div>
                <div className="flex items-center justify-center md:justify-start mb-6">
                    <label htmlFor="semester-select" className="text-gray-700 font-semibold mr-4">Pilih Semester:</label>
                    <select id="semester-select" value={selectedSemesterIndex} onChange={handleSemesterChange} className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                        {pembayaranData?.data?.map((semester, index) => (
                            <option key={index} value={index}>Semester {semester.semester}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4 text-sm text-gray-600 khs-info-desktop">
                    <p>Virtual Account: <span id="virtual-account-value" className="font-semibold">{pembayaranData?.virtual_account || 'Memuat...'}</span></p>
                </div>
                <div id="semester-card-container">
                    {pembayaranData ? (
                        <>
                        <div className='hidden md:block'>
                            {renderDesktopTable()}
                        </div>
                        <div className='md:hidden'>
                            {renderMobileCards()}
                        </div>
                        </>
                    ) : (
                        <p className="text-center py-4 text-gray-500">Memuat data...</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default PembayaranPage;