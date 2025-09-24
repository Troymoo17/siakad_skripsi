import React, { useState, useEffect } from 'react';
import { getPengajuanUjianData, submitPengajuanUjian, getMahasiswaData } from '../../api/api';
import { Link } from 'react-router-dom';

const PengajuanUjianPage = () => {
    const [ujianData, setUjianData] = useState(null);
    const [mahasiswaData, setMahasiswaData] = useState(null);
    const [sertifikasi, setSertifikasi] = useState([]);
    const [historiUjian, setHistoriUjian] = useState([]);
    const [formData, setFormData] = useState({
        judul_skripsi: '',
        pembimbing1: '',
        pembimbing2: '',
        no_hp: '',
        nik: '',
        kecamatan: '',
        kelurahan: '',
        nomor_ijazah: '',
        link_ijazah: '',
        nisn: '',
        nama_ibu: '',
        agama: '',
        penerima_kps: '',
        kps: ''
    });

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
        const fetchData = async () => {
            const data = await getPengajuanUjianData(nim);
            const mhsData = await getMahasiswaData(nim);
            setUjianData(data);
            setMahasiswaData(mhsData);
            setHistoriUjian(data?.histori_pengajuan || []);
            setFormData(prev => ({
                ...prev,
                judul_skripsi: data?.judul_disetujui?.judul || '',
                pembimbing1: data?.judul_disetujui?.pembimbing || '',
                pembimbing2: data?.judul_disetujui?.pembimbing2 || '',
                no_hp: mhsData?.handphone || '',
                nik: mhsData?.nik || '',
                nisn: mhsData?.nisn || '',
                nama_ibu: mhsData?.nama_ibu || '',
                agama: mhsData?.agama || '',
                penerima_kps: mhsData?.penerima_kps || '',
                kps: mhsData?.kps || ''
            }));
        };
        fetchData();
    }, []);

    console.log(mahasiswaData);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSertifikasi(prev => checked ? [...prev, value] : prev.filter(item => item !== value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        const formSubmitData = new FormData();
        formSubmitData.append('nim', nim);
        for (const key in formData) {
            formSubmitData.append(key, formData[key]);
        }
        formSubmitData.append('sertifikasi', sertifikasi.join(', '));
        formSubmitData.append('ipk_terakhir', ujianData?.ipk_sks?.ipk_terakhir || 0);
        formSubmitData.append('jumlah_sks', ujianData?.ipk_sks?.jumlah_sks || 0);
        formSubmitData.append('jumlah_point', ujianData?.ipk_sks?.jumlah_point || 0);
        formSubmitData.append('jumlah_nilai_d', ujianData?.ipk_sks?.jumlah_nilai_d || 0);
        formSubmitData.append('jumlah_nilai_e', ujianData?.ipk_sks?.jumlah_nilai_e || 0);

        const response = await submitPengajuanUjian(formSubmitData);
        if (response.status === 'success') {
            alert(response.message);
            const updatedData = await getPengajuanUjianData(nim);
            setUjianData(updatedData);
            setHistoriUjian(updatedData?.histori_pengajuan || []);
        } else {
            alert('Pengajuan gagal: ' + response.message);
        }
    };
    
    // Fungsi untuk merender tampilan tabel (desktop)
    const renderDesktopTable = () => {
        if (!historiUjian || historiUjian.length === 0) {
            return <div className="text-center py-4 text-gray-500">Tidak ada histori pengajuan yang ditemukan.</div>;
        }

        return (
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                        <tr>
                            <th scope="col" className="py-3 px-6">Judul</th>
                            <th scope="col" className="py-3 px-6">Pembimbing 1</th>
                            <th scope="col" className="py-3 px-6">Pembimbing 2</th>
                            <th scope="col" className="py-3 px-6">Tanggal Pengajuan</th>
                            <th scope="col" className="py-3 px-6 text-center">Status</th>
                            <th scope="col" className="py-3 px-6">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historiUjian.map((item, index) => {
                            const statusBadge = item.status === 'Diterima' ? 'bg-green-500' : (item.status === 'Ditolak' ? 'bg-red-500' : 'bg-yellow-500');
                            return (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="py-3 px-6">{item.judul_skripsi}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{item.pembimbing1}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{item.pembimbing2 || '-'}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{formatDateToDMY(item.tanggal_pengajuan)}</td>
                                    <td className="py-3 px-6 text-center"><span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusBadge}`}>{item.status}</span></td>
                                    <td className="py-3 px-6">{item.keterangan || '-'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    // Fungsi untuk merender tampilan kartu (mobile)
    const renderMobileCards = () => {
        if (!historiUjian || historiUjian.length === 0) {
            return <div className="text-center py-4 text-gray-500">Tidak ada histori pengajuan yang ditemukan.</div>;
        }
        return (
            <div className="p-4 space-y-4">
                {historiUjian.map((item, index) => {
                    const statusBadge = item.status === 'Diterima' ? 'bg-green-500' : (item.status === 'Ditolak' ? 'bg-red-500' : 'bg-yellow-500');
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-md text-gray-800">{item.judul_skripsi}</h3>
                                <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusBadge}`}>{item.status}</span>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p className="flex justify-between items-center">
                                    <span className="font-semibold">Pembimbing 1:</span>
                                    <span>{item.pembimbing1}</span>
                                </p>
                                <p className="flex justify-between items-center">
                                    <span className="font-semibold">Pembimbing 2:</span>
                                    <span>{item.pembimbing2 || '-'}</span>
                                </p>
                                <p className="flex justify-between items-center">
                                    <span className="font-semibold">Tgl. Pengajuan:</span>
                                    <span>{formatDateToDMY(item.tanggal_pengajuan)}</span>
                                </p>
                                <p className="flex justify-between items-center">
                                    <span className="font-semibold">Keterangan:</span>
                                    <span>{item.keterangan || '-'}</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Pengajuan Ujian Skripsi/TA</h1>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <form id="pengajuanUjianForm" className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label htmlFor="judul_skripsi" className="block text-sm font-medium text-gray-700">Judul Skripsi/TA</label>
                            <textarea id="judul_skripsi" name="judul_skripsi" value={formData.judul_skripsi} onChange={handleChange} rows="2" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" readOnly></textarea>
                        </div>
                        <div>
                            <label htmlFor="pembimbing1" className="block text-sm font-medium text-gray-700">Pembimbing 1</label>
                            <input type="text" id="pembimbing1" name="pembimbing1" value={formData.pembimbing1} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div>
                            <label htmlFor="pembimbing2" className="block text-sm font-medium text-gray-700">Pembimbing 2</label>
                            <input type="text" id="pembimbing2" name="pembimbing2" value={formData.pembimbing2} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div>
                            <label htmlFor="ipk" className="block text-sm font-medium text-gray-700">IPK Terakhir</label>
                            <input type="text" id="ipk" name="ipk" value={ujianData?.ipk_sks?.ipk_terakhir || '-'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div>
                            <label htmlFor="jumlah_sks" className="block text-sm font-medium text-gray-700">Jumlah SKS</label>
                            <input type="text" id="jumlah_sks" name="jumlah_sks" value={ujianData?.ipk_sks?.jumlah_sks || '-'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div>
                            <label htmlFor="jumlah_point" className="block text-sm font-medium text-gray-700">Jumlah Point</label>
                            <input type="text" id="jumlah_point" name="jumlah_point" value={ujianData?.ipk_sks?.jumlah_point || '-'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div>
                            <label htmlFor="jumlah_nilai_d" className="block text-sm font-medium text-gray-700">Jumlah Nilai D</label>
                            <input type="text" id="jumlah_nilai_d" name="jumlah_nilai_d" value={ujianData?.ipk_sks?.jumlah_nilai_d || '-'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div>
                            <label htmlFor="jumlah_nilai_e" className="block text-sm font-medium text-gray-700">Jumlah Nilai E</label>
                            <input type="text" id="jumlah_nilai_e" name="jumlah_nilai_e" value={ujianData?.ipk_sks?.jumlah_nilai_e || '-'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/>
                        </div>
                        <div>
                            <label htmlFor="mata_kuliah_d" className="block text-sm font-medium text-gray-700">Mata Kuliah D</label>
                            <textarea id="mata_kuliah_d" name="mata_kuliah_d" value={ujianData?.ipk_sks?.mata_kuliah_d || '-'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly></textarea>
                        </div>
                        <div>
                            <label htmlFor="mata_kuliah_e" className="block text-sm font-medium text-gray-700">Mata Kuliah E</label>
                            <textarea id="mata_kuliah_e" name="mata_kuliah_e" value={ujianData?.ipk_sks?.mata_kuliah_e || '-'} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="sertifikasi" className="block text-sm font-medium text-gray-700">Sertifikasi</label>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center">
                                    <input id="sertifikat_toefl" name="sertifikasi" type="checkbox" value="TOEFL" checked={sertifikasi.includes('TOEFL')} onChange={handleCheckboxChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/>
                                    <label htmlFor="sertifikat_toefl" className="ml-3 block text-sm font-medium text-gray-700">TOEFL</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="sertifikat_lainnya_jeni" name="sertifikasi" type="checkbox" value="JENI" checked={sertifikasi.includes('JENI')} onChange={handleCheckboxChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/>
                                    <label htmlFor="sertifikat_lainnya_jeni" className="ml-3 block text-sm font-medium text-gray-700">JENI</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="sertifikat_lainnya_cena" name="sertifikasi" type="checkbox" value="CENA" checked={sertifikasi.includes('CENA')} onChange={handleCheckboxChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/>
                                    <label htmlFor="sertifikat_lainnya_cena" className="ml-3 block text-sm font-medium text-gray-700">CENA 1</label>
                                </div>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="no_hp" className="block text-sm font-medium text-gray-700">No. HP Terbaru</label>
                            <input type="text" id="no_hp" name="no_hp" value={formData.no_hp} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="nik" className="block text-sm font-medium text-gray-700">NIK (No. KTP)</label>
                            <input type="text" id="nik" name="nik" value={formData.nik} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700">Kecamatan</label>
                            <input type="text" id="kecamatan" name="kecamatan" value={formData.kecamatan} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="kelurahan" className="block text-sm font-medium text-gray-700">Kelurahan</label>
                            <input type="text" id="kelurahan" name="kelurahan" value={formData.kelurahan} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"/>
                        </div>
                         <div>
                            <label htmlFor="nomor_ijazah" className="block text-sm font-medium text-gray-700">Nomor Ijazah</label>
                            <input type="text" id="nomor_ijazah" name="nomor_ijazah" value={formData.nomor_ijazah} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="nisn" className="block text-sm font-medium text-gray-700">NISN SMK/SMA</label>
                            <input type="text" id="nisn" name="nisn" value={formData.nisn} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="nama_ibu" className="block text-sm font-medium text-gray-700">Nama Ibu</label>
                            <input type="text" id="nama_ibu" name="nama_ibu" value={formData.nama_ibu} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="agama" className="block text-sm font-medium text-gray-700">Agama</label>
                            <input type="text" id="agama" name="agama" value={formData.agama} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="penerima_kps" className="block text-sm font-medium text-gray-700">Apakah Anda Penerima KPS:</label>
                            <input type="text" id="penerima_kps" name="penerima_kps" value={formData.penerima_kps} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="kps" className="block text-sm font-medium text-gray-700">KPS</label>
                            <input type="text" id="kps" name="kps" value={formData.kps} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"/>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Ajukan Sidang
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Histori Pengajuan Ujian</h2>
                {historiUjian && historiUjian.length > 0 ? (
                    <>
                        <div className="hidden md:block">
                            {renderDesktopTable()}
                        </div>
                        <div className="md:hidden">
                            {renderMobileCards()}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-gray-500">
                         {historiUjian === null ? "Memuat histori pengajuan..." : "Tidak ada histori pengajuan ujian yang ditemukan."}
                    </div>
                )}
            </div>
        </main>
    );
};

export default PengajuanUjianPage;