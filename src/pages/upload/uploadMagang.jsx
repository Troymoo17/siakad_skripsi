import React, { useState, useEffect } from 'react';
import { getLaporanMagangHistory, submitLaporanMagang } from '../../api/api';

const UploadMagangPage = () => {
    const [historiDokumen, setHistoriDokumen] = useState([]);
    const [formData, setFormData] = useState({
        judul_dokumen: '',
        jenis_file: '',
        file_dokumen: null,
    });

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
            const history = await getLaporanMagangHistory(nim);
            setHistoriDokumen(history);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        const formSubmitData = new FormData();
        formSubmitData.append('nim', nim);
        formSubmitData.append('judul_dokumen', formData.judul_dokumen);
        formSubmitData.append('jenis_file', formData.jenis_file);
        formSubmitData.append('file_dokumen', formData.file_dokumen);

        const response = await submitLaporanMagang(formSubmitData);
        if (response.status === 'success') {
            alert(response.message);
            setFormData({ judul_dokumen: '', jenis_file: '', file_dokumen: null });
            const updatedHistory = await getLaporanMagangHistory(nim);
            setHistoriDokumen(updatedHistory);
        } else {
            alert('Gagal mengunggah dokumen: ' + response.message);
        }
    };

    const renderDesktopTable = () => (
        <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                    <tr>
                        <th scope="col" className="py-3 px-6 rounded-tl-lg">Judul Dokumen</th>
                        <th scope="col" className="py-3 px-6">Tanggal Unggah</th>
                        <th scope="col" className="py-3 px-6 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {historiDokumen.map((item, index) => {
                        const statusBadge = item.status_upload === 'Diterima' ? 'bg-green-500' : (item.status_upload === 'Ditolak' ? 'bg-red-500' : 'bg-yellow-500');
                        return (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <td className="py-3 px-6">{item.judul_dokumen}</td>
                                <td className="py-3 px-6 whitespace-nowrap">{formatDateToDMY(item.tanggal_upload)}</td>
                                <td className="py-3 px-6 text-center">
                                    <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusBadge}`}>{item.status_upload}</span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="p-4 space-y-4 md:hidden">
            {historiDokumen.map((item, index) => {
                const statusBadge = item.status_upload === 'Diterima' ? 'bg-green-500' : (item.status_upload === 'Ditolak' ? 'bg-red-500' : 'bg-yellow-500');
                return (
                    <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-base text-gray-800">{item.judul_dokumen}</h3>
                            <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusBadge}`}>{item.status_upload}</span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Tanggal Unggah:</span>
                                <span>{formatDateToDMY(item.tanggal_upload)}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Upload Dokumen Laporan Magang</h1>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">Form Unggah Dokumen</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="judul_dokumen" className="block text-sm font-medium text-gray-700">Judul Dokumen</label>
                        <input type="text" id="judul_dokumen" name="judul_dokumen" value={formData.judul_dokumen} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" required/>
                    </div>
                    <div>
                        <label htmlFor="jenis_file" className="block text-sm font-medium text-gray-700">Jenis Dokumen</label>
                        <select id="jenis_file" name="jenis_file" value={formData.jenis_file} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" required>
                            <option value="">Pilih Jenis File</option>
                            <option value="Laporan Akhir Magang">Laporan Akhir Magang</option>
                            <option value="Sertifikat Magang">Sertifikat Magang</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="file_dokumen" className="block text-sm font-medium text-gray-700">Pilih File Dokumen</label>
                        <input type="file" id="file_dokumen" name="file_dokumen" onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required/>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Unggah Dokumen
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h2 className="text-lg md:text-xl font-semibold mb-4 border-b pb-2">Histori Unggah Dokumen</h2>
                {historiDokumen.length > 0 ? (
                    <>
                        <div className="hidden md:block">
                            {renderDesktopTable()}
                        </div>
                        <div className="md:hidden">
                            {renderMobileCards()}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-gray-500">Memuat histori unggahan...</div>
                )}
            </div>
        </main>
    );
};

export default UploadMagangPage;