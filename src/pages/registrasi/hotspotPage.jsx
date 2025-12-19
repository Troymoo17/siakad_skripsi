import React, { useState, useEffect } from 'react';
import { getMahasiswaData, submitHotspotPassword } from '../../api/api';

const HotspotPage = () => {
    const [mahasiswaData, setMahasiswaData] = useState(null);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const mhsData = await getMahasiswaData(nim);
            setMahasiswaData(mhsData);
        };
        fetchData();
    }, []);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        const response = await submitHotspotPassword(nim, password);
        
        if (response.status === 'success') {
            alert(response.message);
        } else {
            alert('Gagal menyimpan password hotspot: ' + response.message);
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Pendaftaran Hotspot</h1>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Akses Internet Area Kampus</p>
            </header>

            <div className="w-full space-y-8">
                {/* Form Section */}
                <section className="bg-white p-8 rounded-xl border border-gray-300 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 border-b pb-3">
                        <div className="w-1.5 h-5 bg-blue-700 rounded-full"></div>
                        <h2 className="text-gray-800 font-bold text-sm tracking-widest uppercase">Konfigurasi Akun Hotspot</h2>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Username (NIM)</label>
                                <input 
                                    type="text" 
                                    value={mahasiswaData?.nim || 'Memuat...'} 
                                    readOnly 
                                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg text-sm font-bold text-gray-500 outline-none cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest" htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    value={password} 
                                    onChange={handlePasswordChange} 
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm font-bold focus:border-blue-700 outline-none transition-all" 
                                    placeholder="MASUKKAN PASSWORD"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-start pt-4">
                            <button 
                                type="submit" 
                                className="w-full md:w-auto bg-blue-700 text-white font-black px-12 py-3 rounded-xl hover:bg-blue-800 transition-all uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-blue-100"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </section>

                {/* Keterangan Section */}
                <section className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm border-l-4 border-l-blue-700">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Informasi & Keterangan
                    </h3>
                    <ol className="list-decimal list-inside space-y-3">
                        <li className="text-xs font-bold text-gray-600 uppercase leading-relaxed tracking-wide">
                            Silakan login dengan Username dan password.
                        </li>
                        <li className="text-xs font-bold text-gray-600 uppercase leading-relaxed tracking-wide">
                            Username adalah NIM Anda dan passwordnya sesuai yang Anda input.
                        </li>
                        <li className="text-xs font-bold text-gray-600 uppercase leading-relaxed tracking-wide">
                            Satu User dapat digunakan untuk 2 perangkat (maksimal).
                        </li>
                    </ol>
                </section>
            </div>
        </main>
    );
};

export default HotspotPage;