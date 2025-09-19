import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import JadwalKuliahPage from './pages/JadwalKuliahPage.jsx';
import KehadiranPage from './pages/KehadiranPage.jsx';
import DetailKehadiranPage from './pages/DetailKehadiranPage.jsx';
import JadwalUjianPage from './pages/JadwalUjianPage.jsx';
import KartuHasilStudiPage from './pages/KartuHasilStudiPage.jsx';
import DaftarNilaiKumulatifPage from './pages/DaftarNilaiKumulatifPage.jsx';
import KurikulumPage from './pages/KurikulumPage.jsx';
import KRSPage from './pages/KRSPage.jsx';
import KMKPage from './pages/KMKPage.jsx';
import PembayaranPage from './pages/PembayaranPage.jsx';
import PointBookPage from './pages/PointBookPage.jsx';
import HistoriPinjamanPage from './pages/HistoriPinjamanPage.jsx';
import PengajuanMagangPage from './pages/PengajuanMagangPage.jsx';
import PengajuanJudulPage from './pages/PengajuanJudulPage.jsx';
import PengajuanUjianPage from './pages/PengajuanUjianPage.jsx';

import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="perkuliahan/jadwalKuliah" element={<JadwalKuliahPage />} />
          <Route path="perkuliahan/kehadiran" element={<KehadiranPage />} />
          <Route path="perkuliahan/kehadiran/:kode_mk" element={<DetailKehadiranPage />} />
          <Route path="ujian-dan-nilai/jadwalUjian" element={<JadwalUjianPage />} />
          <Route path="ujian-dan-nilai/kartu-hasil-studi" element={<KartuHasilStudiPage />} />
          <Route path="ujian-dan-nilai/daftar-nilai-kumulatif" element={<DaftarNilaiKumulatifPage />} />
          <Route path="registrasi/kurikulum" element={<KurikulumPage />} />
          <Route path="registrasi/krs" element={<KRSPage />} />
          <Route path="registrasi/kmk" element={<KMKPage />} />
          <Route path="registrasi/pengajuan_magang" element={<PengajuanMagangPage />} />
          <Route path="registrasi/pengajuan_judul" element={<PengajuanJudulPage />} />
          <Route path="registrasi/pengajuan_ujian" element={<PengajuanUjianPage />} />
          <Route path="keuangan/pembayaran" element={<PembayaranPage />} />
          <Route path="histori/pointbook" element={<PointBookPage />} />
          <Route path="histori/histori_pinjaman" element={<HistoriPinjamanPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;