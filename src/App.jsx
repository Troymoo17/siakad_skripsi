import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from "./components/DashboardLayout";
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import JadwalKuliahPage from './pages/perkuliahan/JadwalKuliahPage';
import KehadiranPage from './pages/perkuliahan/KehadiranPage';
import DetailKehadiranPage from './pages/perkuliahan/DetailKehadiranPage';
import JadwalUjianPage from './pages/ujian dan nilai/JadwalUjianPage';
import KartuHasilStudiPage from './pages/ujian dan nilai/KartuHasilStudiPage';
import DaftarNilaiKumulatifPage from './pages/ujian dan nilai/DaftarNilaiKumulatifPage';
import KurikulumPage from './pages/registrasi/KurikulumPage';
import KRSPage from './pages/registrasi/kartuRencanaStudiPage';
import KMKPage from './pages/registrasi/kartuMataKuliahPage';
import PembayaranPage from './pages/keuangan/PembayaranPage';
import PointBookPage from './pages/histori/PointBookPage';
import HistoriPinjamanPage from './pages/histori/HistoriPinjamanPage';
import PengajuanMagangPage from './pages/registrasi/PengajuanMagangPage';
import PengajuanJudulPage from './pages/registrasi/PengajuanJudulPage';
import PengajuanUjianPage from './pages/registrasi/PengajuanUjianPage';
import IkadIkasPage from './pages/registrasi/ikad_ikasPage';
import BimbinganProposalPage from './pages/bimbingan/bimbinganProposalPage';
import BimbinganSkripsiPage from './pages/bimbingan/BimbinganSkripsiPage';
import BimbinganSidangPage from './pages/bimbingan/BimbinganSidangPage';
import DownloadPage from './pages/download/downloadPage';
import UploadMagangPage from './pages/upload/uploadMagang';
import PengumumanPage from './pages/informasi/pengumumanPage';
import DetailPengumumanPage from './pages/informasi/detailPengumumanPage';
import HotspotPage from './pages/registrasi/hotspotPage';
import SurveiKepuasanFasilitasPage from './pages/survei/surveiKepuasanFasilitas';
import SurveiKepuasanSkripsiPage from './pages/survei/surveiKepuasanSkripsi';
import IkadKuesionerPage from './pages/registrasi/ikadKuesionerPage';
import IkasKuesionerPage from './pages/registrasi/ikasKuesionerPage';
import LupaSandiPage from './pages/LupaSandi';

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
          <Route path="registrasi/ikad-ikas" element={<IkadIkasPage />} />
          <Route path="registrasi/ikad-ikas/ikad/:kode_mk" element={<IkadKuesionerPage />} />
          <Route path="registrasi/ikad-ikas/ikas/:id_staff" element={<IkasKuesionerPage />} />
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
          <Route path="registrasi/hotspot" element={<HotspotPage />} />
           <Route path="survei-kepuasan/fasilitas" element={<SurveiKepuasanFasilitasPage />} />
          <Route path="survei-kepuasan/skripsi" element={<SurveiKepuasanSkripsiPage />} />
          <Route path="lupa-sandi" element={<LupaSandiPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;