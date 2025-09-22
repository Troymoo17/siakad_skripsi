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
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderedDays.map((day) => (
                groupedJadwal[day] && (
                    <div key={day} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">{day}</h2>
                        <div className="space-y-4 text-sm">
                            {groupedJadwal[day].map((item, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <h3 className="font-semibold text-gray-800">{item.matkul}</h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.jam_mulai.substring(0, 5)} - {item.jam_selesai.substring(0, 5)} | Ruang: {item.ruang}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Dosen: {item.dosen} | Kelas: {item.kelas}
                                    </p>
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
        <div className="grid grid-cols-1 gap-4 md:hidden">
            {orderedDays.map((day) => (
                groupedJadwal[day] && (
                    <div key={day} className="bg-white p-4 rounded-xl shadow border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">{day}</h2>
                        <div className="space-y-4 text-sm">
                            {groupedJadwal[day].map((item, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <h3 className="font-semibold text-gray-800">{item.matkul}</h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.jam_mulai.substring(0, 5)} - {item.jam_selesai.substring(0, 5)} | Ruang: {item.ruang}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Dosen: {item.dosen} | Kelas: {item.kelas}
                                    </p>
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
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-2 md:space-y-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Jadwal Kuliah</h1>
            <p className="text-xs text-gray-500 mt-1">
              Tahun: {mahasiswa?.tahun_masuk || 'Memuat...'}/
              {parseInt(mahasiswa?.tahun_masuk) + 1 || 'Memuat...'} - Semester: Gasal
            </p>
          </div>
          <div className="text-sm text-gray-600 space-y-1 md:text-right">
            <p>{mahasiswa?.prodi || 'Memuat...'}</p>
            <p>{mahasiswa?.program || 'Memuat...'}</p>
          </div>
        </div>
        <div id="jadwal-kuliah-content-container" className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
          {jadwal.length > 0 ? (
            <>
              {renderDesktopCards()}
              {renderMobileCards()}
            </>
          ) : (
            <div className="text-center py-4 text-gray-500">
              {mahasiswa ? "Tidak ada jadwal kuliah yang ditemukan." : "Memuat data..."}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default JadwalKuliahPage;