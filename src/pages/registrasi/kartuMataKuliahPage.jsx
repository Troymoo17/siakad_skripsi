import React, { useState, useEffect } from 'react';
import { getKMKData } from '../../api/api';

const KMKPage = () => {
    const [kmkData, setKmkData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getKMKData(nim);
                setKmkData(data);
            } catch (error) {
                console.error("Gagal memuat data KMK:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Bagian Informasi Mahasiswa - Lebar Penuh (Full Width)
    const StudentInfoCard = () => (
        <div className="w-full bg-white p-6 rounded-xl border border-gray-300 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4 border-b pb-3">
                <div className="w-1.5 h-5 bg-blue-700 rounded-full"></div>
                <h2 className="text-gray-800 font-bold text-sm tracking-widest uppercase">
                    Informasi Mahasiswa
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">NIM</label>
                    <p className="font-bold text-gray-700 border-l-2 border-gray-200 pl-3">{kmkData?.mahasiswa?.nim || '-'}</p>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Nama Lengkap</label>
                    <p className="font-bold text-gray-700 border-l-2 border-gray-200 pl-3 uppercase">{kmkData?.mahasiswa?.nama || '-'}</p>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Program Studi</label>
                    <p className="font-bold text-gray-700 border-l-2 border-gray-200 pl-3">{kmkData?.mahasiswa?.prodi || '-'}</p>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Semester</label>
                    <p className="font-bold text-gray-700 border-l-2 border-gray-200 pl-3">Semester {kmkData?.mahasiswa?.semester_sekarang || '-'}</p>
                </div>
            </div>
        </div>
    );

    // Bagian Mata Kuliah - List Melebar Penuh
    const CourseList = () => (
        <div className="w-full space-y-3">
            <h2 className="text-gray-800 font-bold text-xs tracking-[0.2em] mb-3 px-1 uppercase opacity-60">Daftar Mata Kuliah Terdaftar</h2>
            {kmkData?.matakuliah?.map((mk, index) => (
                <div key={index} className="w-full bg-white p-5 rounded-xl border border-gray-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight leading-none">{mk.nama_mk}</h3>
                        <div className="flex gap-4 mt-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">KODE: <span className="text-gray-600">{mk.kode_mk}</span></span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">BOBOT: <span className="text-gray-600">{mk.sks} SKS</span></span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 md:gap-8 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                        <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 text-center min-w-[100px]">
                            <p className="text-[9px] text-gray-400 font-bold uppercase">Grup Kelas</p>
                            <p className="text-sm font-black text-blue-700 uppercase">{mk.kelas}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header Page */}
            <header className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Kartu Mata Kuliah</h1>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Institut Widya Pratama</p>
                </div>
            </header>
            
            {/* Container Utama - Dibuat W-Full */}
            <div className="w-full mx-auto">
                {loading ? (
                    <div className="w-full bg-white p-20 rounded-xl text-center border border-gray-200 shadow-sm">
                        <div className="w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Sinkronisasi Data...</p>
                    </div>
                ) : kmkData ? (
                    <>
                        <StudentInfoCard />
                        <CourseList />
                    </>
                ) : (
                    <div className="w-full bg-white p-10 rounded-xl text-center border border-gray-200">
                        <p className="text-gray-500 font-bold text-sm uppercase">Data Tidak Tersedia</p>
                    </div>
                )}
            </div>

            <footer className="mt-10 mb-4">
                <div className="border-t border-gray-300 pt-4 flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Sistem Informasi Akademik</span>
                    <span>&copy; {new Date().getFullYear()} IWP Pekalongan</span>
                </div>
            </footer>
        </main>
    );
};

export default KMKPage;