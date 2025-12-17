import React, { useState, useEffect } from 'react';
import { getIpkIpsData, getJadwalKuliah, getAnnouncements } from '../api/api';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [ipkData, setIpkData] = useState(null);
  const [jadwalData, setJadwalData] = useState([]);
  const [pengumumanData, setPengumumanData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const formatDateToDMY = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const nim = localStorage.getItem('loggedInUserNim');
    if (nim) {
      const fetchData = async () => {
        const ipk = await getIpkIpsData(nim);
        const jadwal = await getJadwalKuliah(nim);
        const announcements = await getAnnouncements();
        
        setIpkData(ipk);
        const hariIni = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
        setJadwalData(jadwal.filter(item => item.hari.toLowerCase() === hariIni.toLowerCase()));
        setPengumumanData(announcements);
      };
      fetchData();
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSks = ipkData?.ips_per_semester?.reduce((sum, semester) => sum + parseInt(semester.total_sks), 0) || 0;
  const lastSemester = ipkData?.ips_per_semester?.[ipkData.ips_per_semester.length - 1];
  const ipkPercentage = ipkData ? (parseFloat(ipkData.ipk) / 4.00) * 100 : 0;
  const recentAnnouncements = pengumumanData.slice(0, 3);

  const renderKinerjaPembelajaran = () => (
    <section className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
        Kinerja Pembelajaran
      </h2>
      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36 md:w-40 md:h-40 flex items-center justify-center flex-shrink-0">
          <div className="donut-chart" style={{ background: `conic-gradient(#0b66a5 0% ${ipkPercentage}%, #e2e8f0 ${ipkPercentage}% 100%)` }}></div>
          <div className="absolute flex flex-col items-center justify-center bg-white w-[80%] h-[80%] rounded-full shadow-inner">
            <span className="text-3xl md:text-4xl font-black text-blue-900">{ipkData?.ipk || '...'}</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">IPK Terakhir</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 w-full gap-2 mt-6">
          <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-100">
            <div className="text-[10px] uppercase font-bold text-gray-400">Smt</div>
            <div className="text-lg font-bold text-gray-800">{ipkData?.ips_per_semester?.length || '...'}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-100">
            <div className="text-[10px] uppercase font-bold text-gray-400">SKS</div>
            <div className="text-lg font-bold text-gray-800">{totalSks || '...'}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center border border-gray-100">
            <div className="text-[10px] uppercase font-bold text-gray-400">Tahun</div>
            <div className="text-sm font-bold text-gray-800 leading-tight flex items-center justify-center h-full">
               {lastSemester?.tahun_akademik?.split('/')[0] || '...'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderPengumuman = () => (
    <section className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-500 rounded-full"></span>
            Pengumuman
        </h2>
        <Link to="/dashboard/informasi/pengumuman" className="text-[11px] font-bold text-blue-600 hover:underline uppercase tracking-tighter">Lihat Semua</Link>
      </div>
      <div className="space-y-3">
          {recentAnnouncements.length > 0 ? (
              recentAnnouncements.map((item, index) => (
                  <div key={index} className="group pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 mb-0.5">{formatDateToDMY(item.tanggal_upload)}</span>
                        <Link to={`/dashboard/informasi/pengumuman/${item.id}`} className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors leading-snug">
                            {item.judul}
                        </Link>
                      </div>
                  </div>
              ))
          ) : (
              <p className="text-sm text-gray-500 italic">Tidak ada pengumuman.</p>
          )}
      </div>
    </section>
  );

  const renderJadwalKuliah = () => (
    <section className="bg-white p-5 md:p-6 rounded-xl shadow-sm md:col-span-2 border border-gray-200">
      <h2 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-green-500 rounded-full"></span>
        Jadwal Hari Ini
      </h2>
      <div className="space-y-3">
        {jadwalData.length > 0 ? (
            jadwalData.map((item, index) => (
              <div key={index} className="p-4 border-l-4 border-blue-600 bg-blue-50/30 rounded-r-lg shadow-sm">
                <h3 className="font-bold text-sm md:text-base text-blue-900 line-clamp-1">{item.matkul}</h3>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-600 font-medium">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{item.jam_mulai.substring(0, 5)}</span>
                  <span className="text-gray-300">|</span>
                  <span className="truncate">Ruang {item.ruang}</span>
                  <span className="text-gray-300">|</span>
                  <span className="truncate">{item.dosen}</span>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-xs text-gray-500 font-medium">Tidak ada jadwal kuliah hari ini.</p>
          </div>
        )}
      </div>
    </section>
  );

  const renderQuote = () => (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 rounded-xl shadow-lg text-white">
      <div className="flex items-center gap-2 mb-3 opacity-80">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.866 19.883 22 16.017 22H14.017V21ZM2.01693 21L2.01693 18C2.01693 16.8954 2.91236 16 4.01693 16H7.01693C7.56921 16 8.01693 15.5523 8.01693 15V9C8.01693 8.44772 7.56921 8 7.01693 8H4.01693C2.91236 8 2.01693 7.10457 2.01693 6V5C2.01693 3.89543 2.91236 3 4.01693 3H7.01693C9.22607 3 11.0169 4.79086 11.0169 7V15C11.0169 18.866 7.88297 22 4.01693 22H2.01693V21Z" /></svg>
        <h2 className="text-[10px] font-bold uppercase tracking-widest">Quote of the Day</h2>
      </div>
      <p className="text-sm font-medium italic leading-relaxed">"Jika harimu buruk maka tetaplah buruk."</p>
      <p className="text-[10px] mt-2 font-bold opacity-70">— anomali bumi</p>
    </section>
  );

  const renderDesktopView = () => (
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
      {renderKinerjaPembelajaran()}
      <div className="space-y-6">
        {renderPengumuman()}
        {renderQuote()}
      </div>
      {renderJadwalKuliah()}
    </div>
  );

  const renderMobileView = () => (
    <div className="md:hidden flex flex-col gap-5">
      {renderJadwalKuliah()}
      {renderKinerjaPembelajaran()}
      {renderPengumuman()}
      {renderQuote()}
    </div>
  );

  return (
    <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 bg-gray-50">
      {isMobile ? renderMobileView() : renderDesktopView()}
    </main>
  );
};

export default DashboardPage;