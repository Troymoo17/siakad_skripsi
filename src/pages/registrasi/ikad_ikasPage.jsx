import React, { useState, useEffect } from 'react';
import { getIkadIkasData, getMahasiswaData } from '../../api/api';
import { Link } from 'react-router-dom';

const IkadIkasPage = () => {
    const [ikadIkasData, setIkadIkasData] = useState(null);
    const [mahasiswaData, setMahasiswaData] = useState(null);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const mhsData = await getMahasiswaData(nim);
            setMahasiswaData(mhsData);
            const data = await getIkadIkasData(nim, mhsData?.semester_sekarang);
            setIkadIkasData(data);
        };
        fetchData();
    }, []);

    console.log(mahasiswaData);

    const renderDesktopTable = (data, type) => {
        if (!data || data.length === 0) {
            return <div className="text-center py-4 text-gray-500">Tidak ada data {type} yang ditemukan.</div>;
        }

        if (type === 'IKAD') {
            return (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                            <tr>
                                <th scope="col" className="py-3 px-6 rounded-tl-lg">No</th>
                                <th scope="col" className="py-3 px-6">Nama Mata Kuliah</th>
                                <th scope="col" className="py-3 px-6 text-center">SKS</th>
                                <th scope="col" className="py-3 px-6 text-center">Kelas</th>
                                <th scope="col" className="py-3 px-6 text-center">Dosen</th>
                                <th scope="col" className="py-3 px-6 rounded-tr-lg text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="py-3 px-6 whitespace-nowrap">{item.no}</td>
                                    <td className="py-3 px-6">{item.nama_matkul}</td>
                                    <td className="py-3 px-6 text-center">{item.sks}</td>
                                    <td className="py-3 px-6 text-center">{item.kelas}</td>
                                    <td className="py-3 px-6 text-center">{item.dosen}</td>
                                    <td className="py-3 px-6 text-center">
                                        {item.status === 'Belum Diisi' ? (
                                            <Link to={`/dashboard/registrasi/ikad-ikas/ikad/${item.kode_mk}`} state={{ name: item.dosen }} className="text-blue-600 hover:underline">
                                                Detail
                                            </Link>
                                        ) : (
                                            <span className="text-gray-500">Sudah Terisi</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (type === 'IKAS') {
            return (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                            <tr>
                                <th scope="col" className="py-3 px-6 rounded-tl-lg">No</th>
                                <th scope="col" className="py-3 px-6">Nama Staf</th>
                                <th scope="col" className="py-3 px-6">Bagian</th>
                                <th scope="col" className="py-3 px-6">Jabatan</th>
                                <th scope="col" className="py-3 px-6 rounded-tr-lg text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="py-3 px-6 whitespace-nowrap">{item.no}</td>
                                    <td className="py-3 px-6">{item.nama_staf}</td>
                                    <td className="py-3 px-6">{item.bagian}</td>
                                    <td className="py-3 px-6">{item.jabatan}</td>
                                    <td className="py-3 px-6 text-center">
                                        {item.status === 'Belum Diisi' ? (
                                            <Link to={`/dashboard/registrasi/ikad-ikas/ikas/${item.id_staff}`} state={{ name: item.nama_staf }} className="text-blue-600 hover:underline">
                                                Detail
                                            </Link>
                                        ) : (
                                            <span className="text-gray-500">Sudah Terisi</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    };
    
    const renderMobileCards = (data, type) => {
        if (!data || data.length === 0) {
            return <div className="text-center py-4 text-gray-500">Tidak ada data {type} yang ditemukan.</div>;
        }

        if (type === 'IKAD') {
            return (
                <div className="p-1 space-y-4">
                    {data.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                            <div className="border-b pb-2 mb-2">
                                <h3 className="font-bold text-base text-gray-800">{item.nama_matkul}</h3>
                            </div>
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>Dosen: <span className="font-medium text-gray-700">{item.dosen}</span></p>
                                <p>SKS: <span className="font-medium text-gray-700">{item.sks}</span></p>
                                <p>Kelas: <span className="font-medium text-gray-700">{item.kelas}</span></p>
                            </div>
                            <div className="w-full text-center mt-3 pt-3 border-t border-gray-200">
                                {item.status === 'Belum Diisi' ? (
                                    <Link to={`/dashboard/registrasi/ikad-ikas/ikad/${item.kode_mk}`} state={{ name: item.dosen }} className="inline-block text-blue-600 hover:underline text-sm">
                                        Detail
                                    </Link>
                                ) : (
                                    <span className="text-gray-500 text-sm">Sudah Terisi</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else if (type === 'IKAS') {
            return (
                <div className="p-1 space-y-4">
                    {data.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                            <div className="border-b pb-2 mb-2">
                                <h3 className="font-bold text-base text-gray-800">{item.nama_staf}</h3>
                            </div>
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>Bagian: <span className="font-medium text-gray-700">{item.bagian}</span></p>
                                <p>Jabatan: <span className="font-medium text-gray-700">{item.jabatan}</span></p>
                            </div>
                            <div className="w-full text-center mt-3 pt-3 border-t border-gray-200">
                                {item.status === 'Belum Diisi' ? (
                                    <Link to={`/dashboard/registrasi/ikad-ikas/ikas/${item.id_staff}`} state={{ name: item.nama_staf }} className="inline-block text-blue-600 hover:underline text-sm">
                                        Detail
                                    </Link>
                                ) : (
                                    <span className="text-gray-500 text-sm">Sudah Terisi</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    };


    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Kuisioner</h1>
            <div id="ikad-container" className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">IKAD (Indeks Kinerja Dosen)</h2>
                {ikadIkasData?.ikad ? (
                    <>
                        <div className="hidden md:block">
                            {renderDesktopTable(ikadIkasData.ikad, 'IKAD')}
                        </div>
                        <div className="md:hidden">
                            {renderMobileCards(ikadIkasData.ikad, 'IKAD')}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-gray-500">Memuat data...</div>
                )}
            </div>
            <div id="ikas-container" className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">IKAS (Indeks Kinerja Administrasi dan Sarana)</h2>
                {ikadIkasData?.ikas ? (
                    <>
                        <div className="hidden md:block">
                            {renderDesktopTable(ikadIkasData.ikas, 'IKAS')}
                        </div>
                        <div className="md:hidden">
                            {renderMobileCards(ikadIkasData.ikas, 'IKAS')}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-gray-500">Memuat data...</div>
                )}
            </div>
        </main>
    );
};

export default IkadIkasPage;