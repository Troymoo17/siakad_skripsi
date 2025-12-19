import React, { useState, useEffect } from 'react';
import { getLaporanMagangHistory, submitLaporanMagang } from '../../api/api';
import Swal from 'sweetalert2';

const UploadMagangPage = () => {
    const [historiDokumen, setHistoriDokumen] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const fetchData = async () => {
        try {
            setLoading(true);
            const nim = localStorage.getItem('loggedInUserNim');
            const history = await getLaporanMagangHistory(nim);
            setHistoriDokumen(history);
        } catch (error) {
            console.error("Gagal mengambil histori:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
            Swal.fire('Berhasil', response.message, 'success');
            setFormData({ judul_dokumen: '', jenis_file: '', file_dokumen: null });
            fetchData();
        } else {
            Swal.fire('Gagal', 'Gagal mengunggah dokumen: ' + response.message, 'error');
        }
    };

    const renderDesktopTable = () => (
        <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left text-sm">
                <thead className="text-[10px] text-gray-400 uppercase tracking-[0.2em] bg-gray-50/50 border-y border-gray-100">
                    <tr>
                        <th className="py-4 px-6">Judul Dokumen</th>
                        <th className="py-4 px-6">Tanggal Unggah</th>
                        <th className="py-4 px-6 text-center">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {historiDokumen.map((item, index) => {
                        const statusColor = item.status_upload === 'Diterima' ? 'text-emerald-600 bg-emerald-50' : (item.status_upload === 'Ditolak' ? 'text-red-600 bg-red-50' : 'text-blue-700 bg-blue-50');
                        const dotColor = item.status_upload === 'Diterima' ? 'bg-emerald-500' : (item.status_upload === 'Ditolak' ? 'bg-red-500' : 'bg-blue-600');
                        
                        return (
                            <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="py-5 px-6 font-black text-gray-800 uppercase text-xs tracking-tight">{item.judul_dokumen}</td>
                                <td className="py-5 px-6 font-medium text-gray-500">{formatDateToDMY(item.tanggal_upload)}</td>
                                <td className="py-5 px-6">
                                    <div className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full mx-auto w-fit ${statusColor}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
                                        <span className="font-black text-[10px] tracking-widest uppercase">{item.status_upload}</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    const renderMobileCards = () => (
        <div className="space-y-4 md:hidden p-4">
            {historiDokumen.map((item, index) => (
                <div key={index} className="bg-white rounded-[1.5rem] border border-gray-200 p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-black text-gray-800 text-xs uppercase">{item.judul_dokumen}</h3>
                        <span className="text-[9px] font-black text-blue-700 bg-blue-50 px-2 py-1 rounded-lg uppercase">{item.status_upload}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                        <span>Tanggal Unggah</span>
                        <span className="text-gray-600">{formatDateToDMY(item.tanggal_upload)}</span>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-[#f8fafc] min-h-screen">
            <div className="w-full">
                {/* Header Page */}
                <header className="mb-10">
                    <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">Laporan Magang</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1 italic">Institut Widya Pratama Pekalongan</p>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Form Unggah Section */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-sm h-fit">
                        <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                            <div className="w-1.5 h-5 bg-blue-700 rounded-full"></div>
                            <h2 className="text-gray-800 font-black text-[11px] tracking-[0.2em] uppercase">
                                Form Unggah Dokumen
                            </h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest">Judul Dokumen</label>
                                <input type="text" name="judul_dokumen" value={formData.judul_dokumen} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 transition-all outline-none font-bold text-gray-700" placeholder="Ketik judul dokumen..." required/>
                            </div>
                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest">Jenis Dokumen</label>
                                <select name="jenis_file" value={formData.jenis_file} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none font-bold text-gray-700 cursor-pointer" required>
                                    <option value="">Pilih Jenis File</option>
                                    <option value="Laporan Akhir Magang">Laporan Akhir Magang</option>
                                    <option value="Sertifikat Magang">Sertifikat Magang</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase mb-2 tracking-widest">File Laporan (PDF)</label>
                                <input type="file" name="file_dokumen" onChange={handleChange} className="w-full text-[10px] text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer transition-all border border-dashed border-gray-200 p-2 rounded-2xl" required/>
                            </div>
                            <button type="submit" className="w-full py-4 bg-blue-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all active:scale-95">
                                Unggah Dokumen
                            </button>
                        </form>
                    </div>

                    {/* Histori Section */}
                    <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-white">
                            <h2 className="text-gray-800 font-black text-[11px] tracking-[0.2em] uppercase">Histori Unggah Dokumen</h2>
                            <div className="bg-blue-50 px-4 py-1 rounded-full border border-blue-100">
                                <span className="text-[10px] font-black text-blue-700 uppercase">{historiDokumen.length} File</span>
                            </div>
                        </div>
                        
                        <div className="flex-1">
                            {loading ? (
                                <div className="p-32 text-center">
                                    <div className="w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">Sinkronisasi...</p>
                                </div>
                            ) : historiDokumen.length > 0 ? (
                                <>
                                    {renderDesktopTable()}
                                    {renderMobileCards()}
                                </>
                            ) : (
                                <div className="p-32 text-center text-gray-400 font-black text-[10px] uppercase tracking-widest">
                                    Belum ada histori unggahan
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UploadMagangPage;