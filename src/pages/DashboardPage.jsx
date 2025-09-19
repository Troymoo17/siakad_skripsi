import React, { useState, useEffect } from 'react';
import { getIpkIpsData, getJadwalKuliah } from '../api/api';

const DashboardPage = () => {
  const [ipkData, setIpkData] = useState(null);
  const [jadwalData, setJadwalData] = useState([]);

  useEffect(() => {
    const nim = localStorage.getItem('loggedInUserNim');
    if (nim) {
      const fetchData = async () => {
        const ipk = await getIpkIpsData(nim);
        const jadwal = await getJadwalKuliah(nim);
        setIpkData(ipk);
        const hariIni = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
        setJadwalData(jadwal.filter(item => item.hari.toLowerCase() === hariIni.toLowerCase()));
      };
      fetchData();
    }
  }, []);

  const totalSks = ipkData?.ips_per_semester.reduce((sum, semester) => sum + parseInt(semester.total_sks), 0);
  const lastSemester = ipkData?.ips_per_semester[ipkData.ips_per_semester.length - 1];
  const ipkPercentage = ipkData ? (parseFloat(ipkData.ipk) / 4.00) * 100 : 0;

  return (
    <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-1xl font-bold text-gray-800">Selamat Datang Di Sistem Informasi Akademik Institut Widya Pratama Pekalongan</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Kinerja Pembelajaran</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-40 h-40 flex items-center justify-center flex-shrink-0">
              <div className="donut-chart" style={{ background: `conic-gradient(#0b66a5 0% ${ipkPercentage}%, #f0b341 ${ipkPercentage}% 100%)` }}></div>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-blue-900">{ipkData?.ipk || '...'}</span>
                <span className="text-xs text-gray-500">/ 4.00</span>
              </div>
            </div>
            <br />
            <div className="flex flex-col md:flex-row justify-around w-full gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm flex-1 text-center border border-gray-300">
                <div className="text-xs text-gray-500">Semester</div>
                <div className="text-2xl font-bold text-gray-800">{ipkData?.ips_per_semester.length || '...'}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex-1 text-center border border-gray-300">
                <div className="text-xs text-gray-500">Tahun Akademik</div>
                <div className="text-2xl font-bold text-gray-800">{lastSemester?.tahun_akademik || '...'}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex-1 text-center border border-gray-300">
                <div className="text-xs text-gray-500">SKS</div>
                <div className="text-2xl font-bold text-gray-800">{totalSks || '...'}</div>
              </div>
            </div>
          </div>
        </section>
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Pengumuman</h2>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-800">Lihat pengumuman tiga bulan terakhir</a>
            </div>
            <div className="space-y-4 text-sm">
              <div className="pb-3 border-b border-gray-200">
                <div className="text-xs text-gray-500">26 Agustus 2025</div>
                <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Jadwal input krs Gasal 2025/2026</a>
              </div>
              <div className="pb-3 border-b border-gray-200">
                <div className="text-xs text-gray-500">26 Agustus 2025</div>
                <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Jadwal dan daftar peserta ujian sertifikasi CCNA</a>
              </div>
              <div className="pb-3 border-b border-gray-200">
                <div className="text-xs text-gray-500">26 Agustus 2025</div>
                <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Surat adopsi hasil karya mahasiswa TTG</a>
              </div>
            </div>
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">QUOTE OF THE DAY</h2>
            </div>
            <span className="font-bold text-blue-700">Jika harimu buruk maka tetaplah buruk.</span>
            <span className="text-sm text-gray-500">-anomali bumi</span>
          </section>
        </div>
        <section className="bg-white p-6 rounded-lg shadow-md mt-6 md:col-span-2 border border-gray-300">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Jadwal Kuliah Hari Ini</h2>
          <div id="jadwal-hari-ini-container">
            {jadwalData.length > 0 ? (
              <div className="space-y-4">
                {jadwalData.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                    <h3 className="font-bold text-base text-gray-800">{item.matkul}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.jam_mulai.substring(0, 5)} - {item.jam_selesai.substring(0, 5)} | Ruang: {item.ruang} | Dosen: {item.dosen}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Tidak ada jadwal kuliah untuk hari ini.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;