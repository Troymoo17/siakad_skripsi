import React, { useState, useEffect } from 'react';
import { getJadwalKuliah, getMahasiswaData } from '../../api/api';

const JadwalKuliahPage = () => {
  const [jadwal, setJadwal] = useState([]);
  const [mahasiswa, setMahasiswa] = useState(null);

  useEffect(() => {
    const fetchJadwal = async () => {
      const nim = localStorage.getItem('loggedInUserNim');
      if (nim) {
        const mhsData = await getMahasiswaData(nim);
        const jadwalData = await getJadwalKuliah(nim);
        setMahasiswa(mhsData);
        setJadwal(jadwalData);
      }
    };
    fetchJadwal();
  }, []);

  const groupJadwalByDay = (data) => {
    return data.reduce((acc, item) => {
      const day = item.hari;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(item);
      return acc;
    }, {});
  };

  const renderDesktopCards = () => {
    const groupedJadwal = groupJadwalByDay(jadwal);
    const orderedDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    return (
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {orderedDays.map((day) => (
                groupedJadwal[day] && (
                    <div key={day} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                        <div className="bg-gradient-to-r from-[#005c97] to-[#363795] px-8 py-4">
                            <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">{day}</h2>
                        </div>
                        <div className="p-6 space-y-5 flex-1 bg-gradient-to-b from-white to-gray-50/30">
                            {groupedJadwal[day].map((item, index) => (
                                <div key={index} className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-300 transition-all">
                                    <h3 className="font-bold text-gray-800 text-sm leading-snug mb-3 group-hover:text-[#005c97] transition-colors">{item.matkul}</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[11px] text-[#005c97] font-black bg-blue-50 w-fit px-3 py-1 rounded-lg">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                            {item.jam_mulai.substring(0, 5)} - {item.jam_selesai.substring(0, 5)}
                                        </div>
                                        <div className="flex flex-col gap-1 px-1">
                                            <p className="text-[11px] text-gray-500 font-bold flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                                Ruang: <span className="text-gray-700">{item.ruang}</span>
                                            </p>
                                            <p className="text-[11px] text-gray-500 font-bold flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                                Kelas: <span className="text-gray-700">{item.kelas}</span>
                                            </p>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-gray-50">
                                            <p className="text-[10px] text-gray-400 font-medium italic">
                                                {item.dosen}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
  };

  const renderMobileCards = () => {
    const groupedJadwal = groupJadwalByDay(jadwal);
    const orderedDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    return (
        <div className="space-y-8 md:hidden px-1">
            {orderedDays.map((day) => (
                groupedJadwal[day] && (
                    <div key={day} className="relative">
                        <div className="sticky top-0 z-10 flex items-center gap-3 mb-4 bg-[#f8fafc]/90 backdrop-blur-sm py-2">
                            <span className="bg-[#005c97] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
                                {day}
                            </span>
                            <div className="h-[1px] flex-1 bg-gray-200"></div>
                        </div>
                        
                        <div className="space-y-4">
                            {groupedJadwal[day].map((item, index) => (
                                <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                                    <div className="flex flex-col items-center justify-center border-r border-gray-100 pr-4 min-w-[70px]">
                                        <span className="text-[11px] font-black text-gray-800">{item.jam_mulai.substring(0, 5)}</span>
                                        <div className="w-0.5 h-4 bg-blue-100 my-1"></div>
                                        <span className="text-[10px] font-bold text-gray-400">{item.jam_selesai.substring(0, 5)}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800 text-sm leading-tight mb-2">{item.matkul}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="bg-blue-50 text-[#005c97] text-[9px] font-bold px-2 py-0.5 rounded-md border border-blue-100">
                                                Ruang {item.ruang}
                                            </span>
                                            <span className="bg-orange-50 text-orange-700 text-[9px] font-bold px-2 py-0.5 rounded-md border border-orange-100">
                                                Kelas {item.kelas}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-2 italic line-clamp-1">
                                            {item.dosen}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
  };

  return (
    <main className="flex-1 p-4 md:p-8 bg-[#f8fafc] min-h-screen">
      <div className="w-full"> 
        {/* Header Section */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-[#1e293b] tracking-tight mb-2">Jadwal Kuliah</h1>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <span className="bg-blue-50 text-[#005c97] text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 uppercase tracking-tighter">
                                TA {mahasiswa?.tahun_masuk || '...'}/{parseInt(mahasiswa?.tahun_masuk) + 1 || '...'}
                            </span>
                            <span className="bg-gray-50 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full border border-gray-200 uppercase tracking-tighter">
                                Semester Gasal
                            </span>
                        </div>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{mahasiswa?.prodi || '...'}</p>
                        <p className="text-sm font-bold text-[#005c97]">{mahasiswa?.program || '...'}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div id="jadwal-kuliah-content-container" className="w-full">
          {jadwal.length > 0 ? (
            <>
              {renderDesktopCards()}
              {renderMobileCards()}
            </>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-20 text-center border border-gray-100 w-full">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest italic">
                    {mahasiswa ? "Tidak ada jadwal kuliah yang ditemukan." : "Menyinkronkan Jadwal..."}
                </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex items-center gap-3 px-6 py-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="p-1.5 bg-[#005c97] rounded-lg text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <p className="text-[10px] md:text-xs text-blue-800 font-medium">
                <strong>Tips:</strong> Pastikan Anda hadir 15 menit sebelum perkuliahan dimulai. Periksa ruang kelas secara berkala untuk info perubahan.
            </p>
        </div>
      </div>
    </main>
  );
};

export default JadwalKuliahPage;