import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getKRSData, submitKRS, getMahasiswaData } from '../../api/api';

const KRSPage = () => {
    const [krsData, setKrsData] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [mahasiswaData, setMahasiswaData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            try {
                setLoading(true);
                const mhsData = await getMahasiswaData(nim);
                setMahasiswaData(mhsData);
                
                if (mhsData?.semester_sekarang) {
                    // LOGIC ASLI TIDAK BERUBAH
                    const data = await getKRSData(nim, mhsData.semester_sekarang);
                    setKrsData(data);
                    if (data?.krs_terisi) {
                        setSelectedCourses(data.krs_terisi);
                    }
                }
            } catch (error) {
                console.error("Error fetching KRS data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCheckboxChange = (kode_mk) => {
        // LOGIC ASLI TIDAK BERUBAH
        setSelectedCourses(prev =>
            prev.includes(kode_mk) ? prev.filter(id => id !== kode_mk) : [...prev, kode_mk]
        );
    };

    const handleKRSSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        // LOGIC ASLI TIDAK BERUBAH
        const response = await submitKRS(nim, selectedCourses);
        if (response.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: response.message,
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: response.message
            });
        }
    };

    // Tampilan Header Informasi (Full Width)
    const renderStudentInfo = () => (
        <div className="w-full bg-white p-6 rounded-xl border border-gray-300 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4 border-b pb-3">
                <div className="w-1.5 h-5 bg-blue-700 rounded-full"></div>
                <h2 className="text-gray-800 font-bold text-sm tracking-widest uppercase">
                    Status Rencana Studi
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Mahasiswa</label>
                    <p className="font-bold text-gray-700">{mahasiswaData?.nama || 'Memuat...'}</p>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">NIM</label>
                    <p className="font-bold text-gray-700">{mahasiswaData?.nim || 'Memuat...'}</p>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Semester Target</label>
                    <p className="font-bold text-blue-700">Semester {mahasiswaData?.semester_sekarang || '-'}</p>
                </div>
            </div>
        </div>
    );

    // Tampilan Baris Mata Kuliah (Full Width)
    const renderCourseRows = () => (
        <div className="w-full space-y-3">
            <div className="flex justify-between items-center px-1">
                <h2 className="text-gray-800 font-bold text-xs tracking-widest uppercase opacity-60">Pilih Mata Kuliah</h2>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {selectedCourses.length} Terpilih
                </span>
            </div>
            
            {krsData?.mata_kuliah_tersedia.map((mk, index) => {
                const isSelected = selectedCourses.includes(mk.kode_mk);
                return (
                    <div 
                        key={index} 
                        onClick={() => handleCheckboxChange(mk.kode_mk)}
                        // Pewarnaan baris agar terlihat jelas terpilih
                        className={`w-full p-4 rounded-xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                            isSelected ? 'border-blue-600 bg-blue-50/30' : 'border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center gap-4 flex-1">
                            {/* Checkbox Custom */}
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                isSelected ? 'bg-blue-700 border-blue-700' : 'bg-white border-gray-400'
                            }`}>
                                {isSelected && (
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            
                            {/* Nama Mata Kuliah */}
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm uppercase">{mk.nama_mk}</h3>
                                {/* Menghilangkan Kode dan SKS dari sini */}
                            </div>
                        </div>

                        {/* Pindahkan KODE MATKUL dan SKS ke bagian kanan (menggantikan Grup Kelas dan Jadwal) */}
                        <div className="flex items-center gap-6 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                            
                            <div className="text-right">
                                <p className="text-[9px] text-gray-400 font-bold uppercase">Kode Matkul</p>
                                <p className="text-sm font-black text-gray-700 uppercase">{mk.kode_mk}</p>
                            </div>
                            
                            <div className="text-right border-l pl-6 border-gray-200">
                                <p className="text-[9px] text-gray-400 font-bold uppercase">SKS</p>
                                <p className="text-sm font-black text-blue-700">{mk.sks}</p>
                            </div>
                            
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Kartu Rencana Studi</h1>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Pengisian Mata Kuliah Semester Berjalan</p>
            </header>

            <form onSubmit={handleKRSSubmit} className="w-full">
                {loading ? (
                    <div className="w-full bg-white p-20 rounded-xl text-center border border-gray-200 shadow-sm">
                        <div className="w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Sinkronisasi Data...</p>
                    </div>
                ) : (
                    <>
                        {renderStudentInfo()}
                        
                        {krsData && krsData.mata_kuliah_tersedia.length > 0 ? (
                            <>
                                {renderCourseRows()}
                                
                                {/* Tombol Simpan */}
                                <div className="mt-8 flex justify-end">
                                    <button 
                                        type="submit" 
                                        className="w-full md:w-auto bg-blue-700 text-white font-black px-10 py-3 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-200 uppercase text-xs tracking-widest"
                                    >
                                        Simpan Rencana Studi
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="w-full bg-white p-12 rounded-xl text-center border border-gray-300 shadow-sm">
                                <p className="text-gray-500 font-bold text-sm uppercase">Tidak ada mata kuliah tersedia</p>
                            </div>
                        )}
                    </>
                )}
            </form>
        </main>
    );
};

export default KRSPage;