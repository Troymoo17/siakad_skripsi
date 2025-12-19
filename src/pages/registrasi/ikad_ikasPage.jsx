import React, { useState, useEffect } from 'react';
import { getIkadIkasData, getMahasiswaData } from '../../api/api';
import { Link } from 'react-router-dom';

const IkadIkasPage = () => {
    const [ikadIkasData, setIkadIkasData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            try {
                setLoading(true);
                const mhsData = await getMahasiswaData(nim);
                const data = await getIkadIkasData(nim, mhsData?.semester_sekarang);
                setIkadIkasData(data);
            } catch (error) {
                console.error("Gagal memuat data kuisioner:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderSectionHeader = (title, subtitle) => (
        <div className="flex items-center gap-2 mb-4 border-b pb-3 mt-8 first:mt-0">
            <div className="w-1.5 h-5 bg-blue-700 rounded-full"></div>
            <div>
                <h2 className="text-gray-800 font-bold text-sm tracking-widest uppercase">{title}</h2>
                <p className="text-[9px] text-gray-400 font-bold uppercase">{subtitle}</p>
            </div>
        </div>
    );

    const renderKuisionerList = (data, type) => (
        <div className="space-y-3">
            {data.map((item, index) => (
                <div key={index} className="w-full bg-white p-5 rounded-xl border border-gray-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 border-l-4 border-blue-700 pl-4">
                        <h3 className="font-black text-gray-800 text-sm uppercase tracking-tight">
                            {type === 'IKAD' ? item.nama_matkul : item.nama_staf}
                        </h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                            {type === 'IKAD' ? `Dosen: ${item.dosen}` : `${item.bagian} • ${item.jabatan}`}
                        </p>
                    </div>

                    <div className="flex items-center gap-6 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
                        {item.status === 'Belum Diisi' ? (
                            <Link 
                                to={`/dashboard/registrasi/ikad-ikas/${type.toLowerCase()}/${type === 'IKAD' ? item.kode_mk : item.id_staff}`} 
                                state={{ name: type === 'IKAD' ? item.dosen : item.nama_staf }}
                                className="bg-blue-700 text-white text-[10px] font-black px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors uppercase tracking-widest shadow-md shadow-blue-100"
                            >
                                Isi Detail
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sudah Terisi</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Kuisioner Kinerja</h1>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Evaluasi Dosen, Administrasi, dan Sarana</p>
            </header>

            <div className="w-full"> 
                {loading ? (
                    <div className="w-full bg-white p-20 rounded-xl text-center border border-gray-200">
                        <div className="w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Menyiapkan Kuisioner...</p>
                    </div>
                ) : (
                    <>
                        {ikadIkasData?.ikad && (
                            <>
                                {renderSectionHeader("Indeks Kinerja Dosen", "Evaluasi Kualitas Pembelajaran Mata Kuliah")}
                                {renderKuisionerList(ikadIkasData.ikad, 'IKAD')}
                            </>
                        )}

                        {ikadIkasData?.ikas && (
                            <>
                                {renderSectionHeader("Indeks Kinerja Administrasi", "Evaluasi Layanan Staff dan Sarana Kampus")}
                                {renderKuisionerList(ikadIkasData.ikas, 'IKAS')}
                            </>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};

export default IkadIkasPage;