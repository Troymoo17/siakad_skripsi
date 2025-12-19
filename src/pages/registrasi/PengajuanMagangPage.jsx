import React, { useState, useEffect } from 'react';
import { getMahasiswaData, getMagangHistory, submitPengajuanMagang } from '../../api/api';
import Swal from 'sweetalert2';

const PengajuanMagangPage = () => {
    const [mahasiswaData, setMahasiswaData] = useState(null);
    const [historiMagangData, setHistoriMagangData] = useState([]);
    const [formData, setFormData] = useState({
        jenis_tempat_magang: '', 
        nama_tempat_magang: '', 
        alamat: '', 
        kota_kabupaten_magang: '', 
        baru_ulang: '', 
        rencana_mulai: '', 
        rencana_selesai: ''
    });

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; 
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const mhsData = await getMahasiswaData(nim);
            const history = await getMagangHistory(nim);
            setMahasiswaData(mhsData);
            setHistoriMagangData(history);
            setFormData(prev => ({ 
                ...prev, 
                handphone: mhsData?.handphone || '', 
                alamat_mhs: mhsData?.alamat || '' 
            }));
        };
        fetchData();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formSubmitData = new FormData();
        formSubmitData.append('nim', localStorage.getItem('loggedInUserNim'));
        Object.keys(formData).forEach(key => formSubmitData.append(key, formData[key]));
        
        const response = await submitPengajuanMagang(formSubmitData);
        if (response.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: response.message,
                showConfirmButton: false,
                timer: 1500
            });
            const history = await getMagangHistory(localStorage.getItem('loggedInUserNim'));
            setHistoriMagangData(history);
        } else {
            Swal.fire('Gagal', response.message, 'error');
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Pengajuan Magang</h1>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Formulir Pendaftaran Kerja Praktek / Magang</p>
            </header>

            <div className="w-full space-y-10">
                {/* Form Section */}
                <section className="bg-white p-8 rounded-xl border border-gray-300 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Data Mahasiswa</label>
                                <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <p className="text-xs font-bold text-gray-800">{mahasiswaData?.nim} <span className="text-gray-400">/</span> {mahasiswaData?.nama}</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase">{mahasiswaData?.prodi}</p>
                                </div>
                            </div>
                            
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Jenis Tempat</label>
                                    <select name="jenis_tempat_magang" value={formData.jenis_tempat_magang} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm font-bold focus:border-blue-700 outline-none" required>
                                        <option value="">PILIH JENIS</option>
                                        <option value="Perusahaan IT">PERUSAHAAN IT</option>
                                        <option value="Instansi Pemerintahan">INSTANSI PEMERINTAHAN</option>
                                        <option value="Swasta">SWASTA</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Nama Instansi</label>
                                    <input type="text" name="nama_tempat_magang" value={formData.nama_tempat_magang} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg text-sm font-bold uppercase focus:border-blue-700 outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Rencana Mulai</label>
                                    <input type="date" name="rencana_mulai" value={formData.rencana_mulai} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg text-sm font-bold outline-none focus:border-blue-700" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Rencana Selesai</label>
                                    <input type="date" name="rencana_selesai" value={formData.rencana_selesai} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg text-sm font-bold outline-none focus:border-blue-700" required />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button type="submit" className="w-full md:w-auto bg-blue-700 text-white font-black px-12 py-3 rounded-xl hover:bg-blue-800 transition-all uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-blue-100">
                                Kirim Pengajuan
                            </button>
                        </div>
                    </form>
                </section>

                {/* History Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4 px-1">
                        <div className="w-1 h-4 bg-blue-700 rounded-full"></div>
                        <h2 className="text-gray-800 font-bold text-sm tracking-widest uppercase">Histori Pengajuan</h2>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                        <th className="px-6 py-4">Nama Instansi / Perusahaan</th>
                                        <th className="px-6 py-4">Periode Magang</th>
                                        <th className="px-6 py-4 text-center">Status Pengajuan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {historiMagangData.length > 0 ? (
                                        historiMagangData.map((item, index) => (
                                            <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="text-xs font-black text-gray-800 uppercase">{item.nama_tempat_magang}</p>
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase">{item.jenis_tempat_magang}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-xs font-bold text-gray-600">
                                                        {formatDate(item.rencana_mulai)} 
                                                        <span className="mx-2 text-gray-300">s/d</span> 
                                                        {formatDate(item.rencana_selesai)}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest ${
                                                        item.status_magang === 'Diterima' ? 'bg-green-100 text-green-700' : 
                                                        item.status_magang === 'Ditolak' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {item.status_magang || 'Menunggu'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-10 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                Belum ada histori pengajuan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default PengajuanMagangPage;