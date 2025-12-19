import React, { useState, useEffect } from 'react';
import { getSkripsiData, getMahasiswaData } from '../api/api';
import Swal from 'sweetalert2';

const YudisiumPage = () => {
    const [ setMahasiswaData] = useState(null);
    const [skripsiData, setSkripsiData] = useState(null);
    const [files, setFiles] = useState({
        bebas_pustaka: null,
        skpi: null,
        transkrip_final: null,
        foto_ijazah: null
    });

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const mhs = await getMahasiswaData(nim);
            setMahasiswaData(mhs?.data[0]);
            
            const skripsi = await getSkripsiData(nim);
            setSkripsiData(skripsi?.data);
        };
        fetchData();
    }, []);

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!skripsiData?.judul_disetujui) {
            return Swal.fire('Gagal', 'Anda belum menyelesaikan sidang skripsi.', 'error');
        }

        Swal.fire({
            title: 'Konfirmasi Yudisium',
            text: "Pastikan semua dokumen yang diunggah sudah benar.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Daftar Yudisium',
            confirmButtonColor: '#1d4ed8'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Berhasil', 'Pendaftaran Yudisium Anda telah diterima dan sedang diproses.', 'success');
            }
        });
    };

    return (
        <main className="flex-1 p-4 md:p-10 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Pendaftaran Yudisium</h1>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Validasi kelulusan dan pengumpulan dokumen akhir</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Status Kelulusan */}
                <div className="lg:col-span-1 space-y-6">
                    <section className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-1.5 h-4 bg-blue-700 rounded-full"></div>
                            <h2 className="text-xs font-black uppercase tracking-widest text-gray-700">Status Akademik</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <p className="text-[9px] font-bold text-gray-400 uppercase">Total SKS Lulus</p>
                                <p className="text-lg font-black text-gray-800">{skripsiData?.sks_ditempuh || '0'}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-gray-400 uppercase">IPK Akhir</p>
                                <p className="text-lg font-black text-blue-700">{skripsiData?.ipk_terakhir || '0.00'}</p>
                            </div>
                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">Judul Skripsi Final</p>
                                <p className="text-[11px] font-bold text-gray-600 uppercase leading-relaxed italic">
                                    "{skripsiData?.judul_disetujui || 'BELUM TERSEDIA'}"
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-blue-700 p-6 rounded-xl shadow-lg text-white">
                        <h3 className="text-xs font-black uppercase tracking-widest mb-2">Pemberitahuan</h3>
                        <p className="text-[10px] leading-relaxed opacity-90 font-medium">
                            Pastikan anda telah menyelesaikan revisi skripsi dan mendapatkan tanda tangan pengesahan dari semua penguji sebelum mendaftar yudisium.
                        </p>
                    </section>
                </div>

                {/* Form Upload Dokumen */}
                <div className="lg:col-span-2">
                    <section className="bg-white p-8 rounded-xl border border-gray-300 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-1.5 h-4 bg-blue-700 rounded-full"></div>
                                    <h2 className="text-xs font-black uppercase tracking-widest text-gray-700">Dokumen Persyaratan (PDF)</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { label: 'Surat Bebas Pustaka', name: 'bebas_pustaka' },
                                        { label: 'Sertifikat SKPI', name: 'skpi' },
                                        { label: 'Transkrip Nilai Final', name: 'transkrip_final' },
                                        { label: 'Pas Foto Ijazah (4x6)', name: 'foto_ijazah' },
                                    ].map((doc) => (
                                        <div key={doc.name} className="p-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg group hover:border-blue-700 transition-colors">
                                            <label className="block text-[10px] font-black text-gray-500 uppercase mb-2 group-hover:text-blue-700">{doc.label}</label>
                                            <input 
                                                type="file" 
                                                name={doc.name}
                                                onChange={handleFileChange}
                                                className="block w-full text-[10px] text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                                required 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <button 
                                    type="submit" 
                                    className="w-full bg-gray-900 text-white font-black py-4 rounded-xl hover:bg-black transition-all uppercase text-[11px] tracking-widest shadow-lg flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Ajukan Verifikasi Yudisium
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default YudisiumPage;