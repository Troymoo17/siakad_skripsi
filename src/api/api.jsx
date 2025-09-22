const BASE_URL = 'http://localhost/siakad_api';

export const loginUser = async (nim, password) => {
  const formData = new FormData();
  formData.append('nim', nim);
  formData.append('password', password);
  const response = await fetch(`${BASE_URL}/login.php`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const getMahasiswaData = async (nim) => {
  const response = await fetch(`${BASE_URL}/mahasiswa.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data.data[0] : null;
};

export const updateProfile = async (nim, formData) => {
  formData.append('nim', nim);
  const response = await fetch(`${BASE_URL}/mahasiswa.php`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const getIpkIpsData = async (nim) => {
  const response = await fetch(`${BASE_URL}/ipk_ips.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data.data : null;
};

export const getJadwalKuliah = async (nim, semester) => {
  const response = await fetch(`${BASE_URL}/jadwal_kuliah.php?nim=${nim}&semester=${semester}`);
  const data = await response.json();
  return data.status === 'success' ? data.data : [];
};

export const getKehadiranSummary = async (nim) => {
  const response = await fetch(`${BASE_URL}/kehadiran.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data.data : [];
};

export const getKehadiranDetail = async (nim, kode_mk) => {
  const response = await fetch(`${BASE_URL}/kehadiran_detail.php?nim=${nim}&kode_mk=${kode_mk}`);
  const data = await response.json();
  return data.status === 'success' ? data.data : [];
};

export const getJadwalUjian = async (nim) => {
  const response = await fetch(`${BASE_URL}/jadwal_ujian.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data : null;
};

export const getKHSData = async (nim) => {
  const response = await fetch(`${BASE_URL}/khs.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data : null;
};

export const getDaftarNilaiKumulatif = async (nim) => {
  const response = await fetch(`${BASE_URL}/nilai.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data.data : [];
};

export const getKurikulumData = async (nim) => {
  const response = await fetch(`${BASE_URL}/kurikulum.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data.data : [];
};

export const getKRSData = async (nim, semester) => {
  const response = await fetch(`${BASE_URL}/krs.php?nim=${nim}&semester=${semester}`);
  const data = await response.json();
  return data.status === 'success' ? data : null;
};

export const submitKRS = async (nim, semester, selectedCourses) => {
  const postPromises = selectedCourses.map(kode_mk => {
    const postData = new FormData();
    postData.append('nim', nim);
    postData.append('semester', semester);
    postData.append('kode_mk', kode_mk);
    return fetch(`${BASE_URL}/krs.php`, {
      method: 'POST',
      body: postData,
    });
  });
  const responses = await Promise.all(postPromises);
  return responses.every(res => res.ok);
};

export const getKMKData = async (nim) => {
  const response = await fetch(`${BASE_URL}/matakuliah.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data : null;
};

export const getPembayaranData = async (nim) => {
  const response = await fetch(`${BASE_URL}/pembayaran.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data : null;
};

export const getPointBookHistory = async (nim) => {
  const response = await fetch(`${BASE_URL}/pointbook.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data : null;
};

export const getPinjamanHistory = async (nim) => {
  const response = await fetch(`${BASE_URL}/pinjaman.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data : null;
};

export const getMagangHistory = async (nim) => {
  const response = await fetch(`${BASE_URL}/pengajuan_magang.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data.data : [];
};

export const submitPengajuanMagang = async (formData) => {
  const response = await fetch(`${BASE_URL}/pengajuan_magang.php`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const getPengajuanJudulData = async (nim) => {
  const response = await fetch(`${BASE_URL}/skripsi_judul.php?nim=${nim}`);
  const data = await response.json();
  return data.status === 'success' ? data.data : [];
};

export const getSkripsiData = async (nim) => {
  const [mahasiswaData, ipkIpsData, pointData, nilaiData] = await Promise.all([
    getMahasiswaData(nim),
    getIpkIpsData(nim),
    getPointBookHistory(nim),
    getDaftarNilaiKumulatif(nim),
  ]);
  
  if (!mahasiswaData || !ipkIpsData || !pointData || !nilaiData) {
    return null;
  }

  const jumlahNilaiD = nilaiData.filter(item => item.grade === 'D').length;
  const mataKuliahD = nilaiData.filter(item => item.grade === 'D').map(item => item.nama_mk).join(', ');
  const jumlahNilaiE = nilaiData.filter(item => item.grade === 'E').length;
  const mataKuliahE = nilaiData.filter(item => item.grade === 'E').map(item => item.nama_mk).join(', ');

  const sksDitempuh = ipkIpsData.ips_per_semester.reduce((sum, semester) => sum + parseInt(semester.total_sks), 0);

  return {
    status: 'success',
    data: {
      hp_terbaru: mahasiswaData?.handphone || '',
      semester_pengajuan: mahasiswaData?.semester_sekarang || '',
      ipk_terakhir: ipkIpsData?.ipk || '',
      jumlah_point: pointData?.total_poin || '',
      nilai_magang: 'A',
      sks_ditempuh: sksDitempuh,
      jumlah_nilai_d: jumlahNilaiD,
      jumlah_nilai_e: jumlahNilaiE,
      mata_kuliah_d: mataKuliahD,
      mata_kuliah_e: mataKuliahE,
    }
  };
};

export const submitPengajuanJudul = async (formData) => {
  const response = await fetch(`${BASE_URL}/skripsi_judul.php`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const getPengajuanUjianData = async (nim) => {
  const response = await fetch(`${BASE_URL}/skripsi_ujian.php?nim=${nim}`);
  const data = await response.json();
  return data;
};

export const submitPengajuanUjian = async (formData) => {
  const response = await fetch(`${BASE_URL}/skripsi_ujian.php`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data;
};
export const getIkadIkasData = async (nim, semester) => {
    const response = await fetch(`${BASE_URL}/ikad_ikas.php?nim=${nim}&semester=${semester}`);
    const data = await response.json();
    return data.status === 'success' ? data : null;
};
export const getSidangProposalResult = async (nim) => {
    const response = await fetch(`${BASE_URL}/sidang_proposal.php?nim=${nim}`);
    const data = await response.json();
    return data.status === 'success' ? data.data : [];
};

export const getBimbinganSkripsiHistory = async (nim) => {
    const response = await fetch(`${BASE_URL}/bimbingan_skripsi.php?nim=${nim}`);
    const data = await response.json();
    return data.status === 'success' ? data.data : [];
};

export const submitBimbinganRevisi = async (postData) => {
    const formData = new FormData();
    for (const key in postData) {
        formData.append(key, postData[key]);
    }
    const response = await fetch(`${BASE_URL}/bimbingan_skripsi.php`, {
        method: 'POST',
        body: formData,
    });
    const data = await response.json();
    return data;
};

export const getBimbinganSidangResult = async (nim) => {
    const response = await fetch(`${BASE_URL}/bimbingan_sidang.php?nim=${nim}`);
    const data = await response.json();
    return data.status === 'success' ? data.data : [];
};
export const getDownloadData = async () => {
    const response = await fetch(`${BASE_URL}/download_materi.php`);
    const data = await response.json();
    return data.status === 'success' ? data.data : [];
};
export const getLaporanMagangHistory = async (nim) => {
    const response = await fetch(`${BASE_URL}/laporan_magang.php?nim=${nim}`);
    const data = await response.json();
    return data.status === 'success' ? data.data : [];
};

export const submitLaporanMagang = async (formData) => {
    const response = await fetch(`${BASE_URL}/laporan_magang.php`, {
        method: 'POST',
        body: formData,
    });
    const data = await response.json();
    return data;
};