import React, { useState, useEffect } from 'react';
import { getSkripsiData, getPengajuanUjianData, submitPengajuanUjian } from '../../api/api';
import Swal from 'sweetalert2';

const PengajuanUjianPage = () => {
    const [skripsiData, setSkripsiData] = useState(null);
    const [historiUjian, setHistoriUjian] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    
    const [formData, setFormData] = useState({
        judul_skripsi: '',
        pembimbing1: '',
        pembimbing2: '',
        no_hp: '',
        nik: '', 
        nisn: '',
        nomor_ijazah: '',
        penerima_kps: 'Tidak',
        alamat_lengkap: '', 
        sertifikasi: []
    });

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const response = await getSkripsiData(nim);
            const academic = response?.data;
            setSkripsiData(academic);
            
            // AUTO FILL DATA DARI PROFIL MAHASISWA
            if (academic) {
                setFormData(prev => ({
                    ...prev,
                    no_hp: academic.hp_terbaru || '',
                    judul_skripsi: academic.judul_disetujui || '',
                    nik: academic.nik || '', 
                    alamat_lengkap: academic.alamat_lengkap || '' 
                }));
            }

            const history = await getPengajuanUjianData(nim);
            setHistoriUjian(history?.data || []);
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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        const formSubmitData = new FormData();
        
        formSubmitData.append('nim', nim);
        formSubmitData.append('ipk_terakhir', skripsiData?.ipk_terakhir || 0);
        formSubmitData.append('jumlah_sks', skripsiData?.sks_ditempuh || 0);
        formSubmitData.append('sertifikasi', formData.sertifikasi.join(', '));
        
        Object.keys(formData).forEach(key => {
            if (key !== 'sertifikasi') formSubmitData.append(key, formData[key]);
        });
        
        if (selectedFile) formSubmitData.append('file_ijazah', selectedFile);

        Swal.fire({ title: 'Mohon Tunggu...', didOpen: () => Swal.showLoading() });

        const response = await submitPengajuanUjian(formSubmitData);
        if (response.status === 'success') {
            Swal.fire('Berhasil', response.message, 'success');
            const updated = await getPengajuanUjianData(nim);
            setHistoriUjian(updated?.data || []);
        } else {
            Swal.fire('Gagal', response.message, 'error');
        }
    };

    return (
        <main className="flex-1 p-4 md:p-10 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Pendaftaran Ujian Sidang</h1>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Lengkapi data identitas dan dokumen persyaratan</p>
            </header>

            <div className="space-y-8">
                {/* Section Data Akademik */}
                <section className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 border-b pb-3">
                        <div className="w-1.5 h-5 bg-blue-700 rounded-full"></div>
                        <h2 className="text-gray-800 font-bold text-sm tracking-widest uppercase">Informasi Akademik</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            { label: 'IPK', value: skripsiData?.ipk_terakhir },
                            { label: 'SKS Lulus', value: skripsiData?.sks_ditempuh },
                            { label: 'Point', value: skripsiData?.jumlah_point },
                            { label: 'Semester', value: skripsiData?.semester_pengajuan },
                            { label: 'No. HP', value: skripsiData?.hp_terbaru },
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

                <section className="bg-white p-8 rounded-xl border border-gray-300 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Data Skripsi */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-4 bg-blue-700 rounded-full"></div>
                                <h2 className="text-xs font-black uppercase tracking-widest text-gray-700">01. Informasi Skripsi</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase">Judul Skripsi</label>
                                    <textarea name="judul_skripsi" value={formData.judul_skripsi} onChange={handleChange} className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold uppercase focus:border-blue-700 outline-none" rows="2" required />
                                </div>
                                <input name="pembimbing1" placeholder="NAMA PEMBIMBING 1" onChange={handleChange} className="p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold outline-none focus:border-blue-700" required />
                                <input name="pembimbing2" placeholder="NAMA PEMBIMBING 2" onChange={handleChange} className="p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold outline-none focus:border-blue-700" />
                            </div>
                        </div>

                        {/* Identitas */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1.5 h-4 bg-blue-700 rounded-full"></div>
                                <h2 className="text-xs font-black uppercase tracking-widest text-gray-700">02. Data Identitas & Berkas</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase">NIK (KTP)</label>
                                    <input name="nik" value={formData.nik} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold" required />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase">NISN</label>
                                    <input name="nisn" value={formData.nisn} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold" required />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase">No. Handphone</label>
                                    <input name="no_hp" value={formData.no_hp} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold" required />
                                </div>
                                
                                <input name="nomor_ijazah" placeholder="NO IJAZAH TERAKHIR" onChange={handleChange} className="p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold" required />
                                
                                <select name="penerima_kps" value={formData.penerima_kps} onChange={handleChange} className="p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold">
                                    <option value="Tidak">PENERIMA KPS: TIDAK</option>
                                    <option value="Ya">PENERIMA KPS: YA</option>
                                </select>

                                <div>
                                    <label className="text-[9px] font-black text-blue-700 uppercase">Upload Ijazah (PDF/JPG)</label>
                                    <input type="file" onChange={handleFileChange} className="w-full text-xs mt-1" required />
                                </div>

                                <div className="md:col-span-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase">Alamat Lengkap</label>
                                    <textarea name="alamat_lengkap" value={formData.alamat_lengkap} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold" rows="2" required />
                                </div>
                            </div>
                        </div>

                        {/* Sertifikasi */}
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-3">Sertifikasi Yang Diperoleh</label>
                            <div className="flex flex-wrap gap-6">
                                {['TOEFL', 'JENI', 'CCNA'].map((item) => (
                                    <label key={item} className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" value={item} checked={formData.sertifikasi.includes(item)} onChange={handleChange} className="w-4 h-4 accent-blue-700" />
                                        <span className="text-xs font-bold text-gray-600 group-hover:text-blue-700">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-blue-700 text-white font-black py-4 rounded-xl hover:bg-blue-800 transition-all uppercase text-[11px] tracking-widest shadow-lg">
                            Daftar Ujian Sekarang
                        </button>
                    </form>
                </section>

                {/* Histori Table*/}
                <section>
                    <div className="flex items-center gap-2 mb-4 px-1">
                        <div className="w-1 h-4 bg-blue-700 rounded-full"></div>
                        <h2 className="text-gray-800 font-bold text-sm tracking-widest uppercase">Histori Pendaftaran Ujian Sidang</h2>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                        <th className="px-6 py-4">Judul Skripsi</th>
                                        <th className="px-6 py-4">Pembimbing 1</th>
                                        <th className="px-6 py-4">Pembimbing 2</th>
                                        <th className="px-6 py-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {historiUjian.length > 0 ? (
                                        historiUjian.map((item, index) => (
                                            <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="px-6 py-4 max-w-xs">
                                                    <p className="text-xs font-black text-gray-800 uppercase leading-tight">
                                                        {item.judul_skripsi}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase">
                                                    {item.pembimbing1 || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-[10px] font-bold text-gray-600 uppercase">
                                                    {item.pembimbing2 || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <a 
                                                        href={`http://localhost/siakad_api/${item.link_cetak}`} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="text-blue-700 font-black text-[10px] uppercase hover:underline"
                                                    >
                                                        Cetak
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                Belum ada histori pendaftaran ujian
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

export default PengajuanUjianPage;