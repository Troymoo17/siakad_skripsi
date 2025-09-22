import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardLayout from './components/dashboardLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import JadwalKuliahPage from './pages/perkuliahan/JadwalKuliahPage.jsx';
import KehadiranPage from './pages/perkuliahan/KehadiranPage.jsx';
import DetailKehadiranPage from './pages/perkuliahan/DetailKehadiranPage.jsx';
import JadwalUjianPage from './pages/ujian dan nilai/JadwalUjianPage.jsx';
import KartuHasilStudiPage from './pages/ujian dan nilai/KartuHasilStudiPage.jsx';
import DaftarNilaiKumulatifPage from './pages/ujian dan nilai/DaftarNilaiKumulatifPage.jsx';
import KurikulumPage from './pages/registrasi/KurikulumPage.jsx';
import KRSPage from './pages/registrasi/kartuRencanaStudiPage.jsx';
import KMKPage from './pages/registrasi/kartuMataKuliahPage.jsx';
import PembayaranPage from './pages/keuangan/PembayaranPage.jsx';
import PointBookPage from './pages/histori/PointBookPage.jsx';
import HistoriPinjamanPage from './pages/histori/HistoriPinjamanPage.jsx';
import PengajuanMagangPage from './pages/registrasi/PengajuanMagangPage.jsx';
import PengajuanJudulPage from './pages/registrasi/PengajuanJudulPage.jsx';
import PengajuanUjianPage from './pages/registrasi/PengajuanUjianPage.jsx';
import IkadIkasPage from './pages/registrasi/ikad_ikasPage.jsx';
import BimbinganProposalPage from './pages/bimbingan/BimbinganProposalPage.jsx';
import BimbinganSkripsiPage from './pages/bimbingan/BimbinganSkripsiPage.jsx';
import BimbinganSidangPage from './pages/bimbingan/BimbinganSidangPage.jsx';
import DownloadPage from './pages/download/downloadPage.jsx';
import UploadMagangPage from './pages/upload/uploadMagang.jsx';
import PengumumanPage from './pages/informasi/pengumumanPage.jsx';
import PengumumanDetailPage from './pages/informasi/detailPengumumanPage.jsx';

import './index.css';
import DetailPengumumanPage from './pages/informasi/detailPengumumanPage.jsx';

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
          <Route path="registrasi/ikad-ikas" element={<IkadIkasPage />} />
          <Route path="registrasi/kurikulum" element={<KurikulumPage />} />
          <Route path="registrasi/krs" element={<KRSPage />} />
          <Route path="registrasi/kmk" element={<KMKPage />} />
          <Route path="registrasi/pengajuan_magang" element={<PengajuanMagangPage />} />
          <Route path="registrasi/pengajuan_judul" element={<PengajuanJudulPage />} />
          <Route path="registrasi/pengajuan_ujian" element={<PengajuanUjianPage />} />
          <Route path="keuangan/pembayaran" element={<PembayaranPage />} />
          <Route path="histori/pointbook" element={<PointBookPage />} />
          <Route path="histori/histori_pinjaman" element={<HistoriPinjamanPage />} />
          <Route path="bimbingan/proposal" element={<BimbinganProposalPage />} />
          <Route path="bimbingan/skripsi" element={<BimbinganSkripsiPage />} />
          <Route path="bimbingan/sidang" element={<BimbinganSidangPage />} />
          <Route path="download" element={<DownloadPage />} />
          <Route path="magang" element={<UploadMagangPage />} />
          <Route path="informasi/pengumuman" element={<PengumumanPage />} />
          <Route path="informasi/pengumuman/:id" element={<DetailPengumumanPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;