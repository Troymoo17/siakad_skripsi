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
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                  <tr>
                    <th scope="col" className="py-3 px-6 rounded-tl-lg whitespace-nowrap">Hari</th>
                    <th scope="col" className="py-3 px-6 whitespace-nowrap">Jam Mulai</th>
                    <th scope="col" className="py-3 px-6 whitespace-nowrap">Jam Selesai</th>
                    <th scope="col" className="py-3 px-6 whitespace-nowrap">Ruang</th>
                    <th scope="col" className="py-3 px-6 whitespace-nowrap">Kode Matkul</th>
                    <th scope="col" className="py-3 px-6 whitespace-nowrap">Matkul</th>
                    <th scope="col" className="py-3 px-6 whitespace-nowrap">Dosen</th>
                    <th scope="col" className="py-3 px-6 whitespace-nowrap">Jenis</th>
                    <th scope="col" className="py-3 px-6 whitespace-nowrap">Kelas</th>
                  </tr>
                </thead>
                <tbody>
                  {jadwal.map((item, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <td className="py-3 px-6 whitespace-nowrap">{item.hari}</td>
                      <td className="py-3 px-6">{item.jam_mulai.substring(0, 5)}</td>
                      <td className="py-3 px-6">{item.jam_selesai.substring(0, 5)}</td>
                      <td className="py-3 px-6">{item.ruang}</td>
                      <td className="py-3 px-6">{item.kode_matkul}</td>
                      <td className="py-3 px-6">{item.matkul}</td>
                      <td className="py-3 px-6">{item.dosen}</td>
                      <td className="py-3 px-6">{item.jenis}</td>
                      <td className="py-3 px-6">{item.kelas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">Tidak ada jadwal kuliah yang ditemukan.</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default JadwalKuliahPage;