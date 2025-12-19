import React, { useState, useEffect } from 'react';
import { getSkripsiData, getPengajuanJudulData, submitPengajuanJudul } from '../../api/api';
import Swal from 'sweetalert2';

const PengajuanJudulPage = () => {
    const [skripsiData, setSkripsiData] = useState(null);
    const [historiJudul, setHistoriJudul] = useState([]);
    const [formData, setFormData] = useState({
        baru_ulang: 'Baru', 
        judul: '', 
        abstrak: '', 
        jalur: '', 
        sertifikasi: []
    });

    // Helper Fungsi Format Tanggal d-m-Y
    const formatDateToDMY = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getSkripsiData(nim);
            setSkripsiData(data?.data);
            const history = await getPengajuanJudulData(nim);
            setHistoriJudul(history);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                sertifikasi: checked 
                    ? [...prev.sertifikasi, value] 
                    : prev.sertifikasi.filter(item => item !== value)
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        const formSubmitData = new FormData();
        formSubmitData.append('nim', nim);
        formSubmitData.append('judul', formData.judul);
        formSubmitData.append('abstrak', formData.abstrak);
        formSubmitData.append('jalur', formData.jalur);
        formSubmitData.append('baru_ulang', formData.baru_ulang);

        const response = await submitPengajuanJudul(formSubmitData);
        if (response.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: response.message,
                showConfirmButton: false,
                timer: 1500
            });
            const updatedHistory = await getPengajuanJudulData(nim);
            setHistoriJudul(updatedHistory);
        } else {
            Swal.fire('Gagal', response.message, 'error');
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Formulir Pengajuan Judul</h1>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Pengajuan Tugas Akhir & Skripsi Mahasiswa</p>
            </header>

            <div className="w-full space-y-8">
                {/* Section Data Akademik  */}
                <section className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 border-b pb-3">
                        <div className="w-1.5 h-5 bg-blue-700 rounded-full"></div>
                        <h2 className="text-gray-800 font-bold text-sm tracking-widest uppercase">Informasi Akademik</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            { label: 'No. HP', value: skripsiData?.hp_terbaru },
                            { label: 'Semester', value: skripsiData?.semester_pengajuan },
                            { label: 'IPK', value: skripsiData?.ipk_terakhir },
                            { label: 'Point', value: skripsiData?.jumlah_point },
                            { label: 'Nilai Magang', value: skripsiData?.nilai_magang },
                            { label: 'SKS Lulus', value: skripsiData?.sks_ditempuh },
                        ].map((info, i) => (
                            <div key={i}>
                                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">{info.label}</p>
                                <p className="text-sm font-black text-gray-800">{info.value || '-'}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100">
                        <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">Mata Kuliah Nilai D</p>
                            <div className="p-3 bg-gray-50 rounded-lg text-[11px] font-bold text-gray-600 border border-gray-200 min-h-[50px]">
                                {skripsiData?.mata_kuliah_d || 'Tidak ada'}
                            </div>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">Mata Kuliah Nilai E</p>
                            <div className="p-3 bg-gray-50 rounded-lg text-[11px] font-bold text-gray-600 border border-gray-200 min-h-[50px]">
                                {skripsiData?.mata_kuliah_e || 'Tidak ada'}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Form Pengajuan */}
                <section className="bg-white p-8 rounded-xl border border-gray-300 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Jenis Pengajuan</label>
                                <select name="baru_ulang" value={formData.baru_ulang} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm font-bold focus:border-blue-700 outline-none" required>
                                    <option value="Baru">BARU</option>
                                    <option value="Ulang">ULANG</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Jalur Skripsi</label>
                                <select name="jalur" value={formData.jalur} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm font-bold focus:border-blue-700 outline-none" required>
                                    <option value="">-- PILIH JALUR --</option>
                                    <option value="Jalur A">JALUR A</option>
                                    <option value="Jalur B">JALUR B</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Judul Yang Diajukan</label>
                                <input type="text" name="judul" value={formData.judul} onChange={handleChange} placeholder="MASUKKAN JUDUL LENGKAP" className="w-full p-3 border border-gray-300 rounded-lg text-sm font-bold uppercase focus:border-blue-700 outline-none" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Deskripsi / Abstrak Singkat</label>
                                <textarea name="abstrak" rows="4" value={formData.abstrak} onChange={handleChange} placeholder="JELASKAN RINGKASAN TOPIK ANDA..." className="w-full p-4 border border-gray-300 rounded-lg text-sm font-bold focus:border-blue-700 outline-none" required></textarea>
                            </div>
                            
                            {/* Sertifikasi Checkboxes */}
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Sertifikasi Yang Dimiliki</label>
                                <div className="flex flex-wrap gap-6">
                                    {['TOEFL', 'JENI', 'CCNA 1'].map((item) => (
                                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                value={item} 
                                                checked={formData.sertifikasi.includes(item)} 
                                                onChange={handleChange} 
                                                className="w-5 h-5 border-gray-300 rounded text-blue-700 focus:ring-blue-500 accent-blue-700" 
                                            />
                                            <span className="text-xs font-black text-gray-600 uppercase group-hover:text-blue-700 transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button type="submit" className="w-full md:w-auto bg-blue-700 text-white font-black px-12 py-3 rounded-xl hover:bg-blue-800 transition-all uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-blue-100">
                                Ajukan Judul Sekarang
                            </button>
                        </div>
                    </form>
                </section>

                {/* Section Histori */}
                <section>
                    <div className="flex items-center gap-2 mb-4 px-1">
                        <div className="w-1 h-4 bg-blue-700 rounded-full"></div>
                        <h2 className="text-gray-800 font-bold text-sm tracking-widest uppercase">Status Permohonan Skripsi</h2>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                        <th className="px-6 py-4">Judul & Abstrak</th>
                                        <th className="px-6 py-4">Jalur</th>
                                        <th className="px-6 py-4">Tgl Pengajuan</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4">Komentar Prodi</th>
                                        <th className="px-6 py-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {historiJudul.length > 0 ? (
                                        historiJudul.map((item, index) => (
                                            <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-6 py-4 max-w-xs">
                                                    <p className="text-xs font-black text-gray-800 uppercase leading-tight mb-1">{item.judul}</p>
                                                    <p className="text-[9px] text-gray-500 line-clamp-2">{item.abstrak}</p>
                                                </td>
                                                <td className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase">{item.jalur}</td>
                                                <td className="px-6 py-4 text-[10px] font-bold text-gray-500">{formatDateToDMY(item.tgl_pengajuan)}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-widest ${
                                                        item.status === 'Disetujui' ? 'bg-green-100 text-green-700' : 
                                                        item.status === 'Ditolak' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {item.status || 'PROSES'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-[10px] font-bold text-gray-500 italic">
                                                    {item.komentar_prodi || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {item.cetak_form ? (
                                                        <a href={item.cetak_form} className="text-blue-700 font-black text-[10px] uppercase hover:underline">Cetak</a>
                                                    ) : '-'}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-10 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
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

export default PengajuanJudulPage;