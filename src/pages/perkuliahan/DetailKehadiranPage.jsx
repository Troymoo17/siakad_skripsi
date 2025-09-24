import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getKehadiranDetail } from '../../api/api';

const DetailKehadiranPage = () => {
    const { kode_mk } = useParams();
    const location = useLocation();
    const mataKuliahName = location.state?.mata_kuliah;
    const [detailKehadiran, setDetailKehadiran] = useState([]);
    const [dosenPengajar, setDosenPengajar] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(true);
            const data = await getKehadiranDetail(nim, kode_mk);
            if (data.length > 0) {
                setDetailKehadiran(data);
                setDosenPengajar(data[0].dosen);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [kode_mk]);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Hadir':
                return 'bg-green-500';
            case 'Sakit':
                return 'bg-yellow-500';
            case 'Izin':
                return 'bg-blue-500';
            case 'Tidak Hadir':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <header className="mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Detail Kehadiran</h1>
                <p id="detail-mk-name" className="text-sm text-gray-500 mt-1">
                    Mata Kuliah: {mataKuliahName || 'Memuat...'}
                </p>
                {dosenPengajar && (
                    <p className="text-sm text-gray-500">
                        Dosen Pengajar: {dosenPengajar}
                    </p>
                )}
            </header>

            {isLoading ? (
                <div className="text-center py-4 text-gray-500">Memuat detail kehadiran...</div>
            ) : detailKehadiran.length > 0 ? (
                <div id="detail-kehadiran-content-container" className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="hidden md:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="text-white uppercase bg-blue-600 rounded-t-lg">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">Pertemuan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">Tanggal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {detailKehadiran.map(item => (
                                    <tr key={item.pertemuan}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {item.pertemuan}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDateToDMY(item.tanggal)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusClass(item.status)}`}>
                                                {item.status === 'Tidak Hadir' ? 'Alfa' : item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden p-4 space-y-4">
                        {detailKehadiran.map(item => (
                            <div key={item.pertemuan} className="bg-gray-50 p-4 rounded-md shadow-sm">
                                <h3 className="font-bold text-base text-gray-800">Pertemuan {item.pertemuan}</h3>
                                <p className="text-xs text-gray-500 mt-1">Tanggal: {formatDateToDMY(item.tanggal)}</p>
                                <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusClass(item.status)}`}>
                                    {item.status === 'Tidak Hadir' ? 'Alfa' : item.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-4 text-gray-500">Tidak ada data kehadiran ditemukan.</div>
            )}
        </main>
    );
};

export default DetailKehadiranPage;