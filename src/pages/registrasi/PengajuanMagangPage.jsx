import React, { useState, useEffect } from 'react';
import { getMahasiswaData, getMagangHistory, submitPengajuanMagang } from '../../api/api';

const PengajuanMagangPage = () => {
    const [mahasiswaData, setMahasiswaData] = useState(null);
    const [historiMagangData, setHistoriMagangData] = useState([]);
    const [formData, setFormData] = useState({
        jenis_tempat_magang: '', nama_tempat_magang: '', alamat: '', kota_kabupaten_magang: '', baru_ulang: '', rencana_mulai: '', rencana_selesai: ''
    });

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const mhsData = await getMahasiswaData(nim);
            const history = await getMagangHistory(nim);
            setMahasiswaData(mhsData);
            setHistoriMagangData(history);
            setFormData({
                ...formData,
                handphone: mhsData?.handphone || '',
                alamat: mhsData?.alamat || ''
            });
        };
        fetchData();
    }, );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        const formSubmitData = new FormData();
        formSubmitData.append('nim', nim);
        for (const key in formData) {
            formSubmitData.append(key, formData[key]);
        }
        
        const response = await submitPengajuanMagang(formSubmitData);
        if (response.status === 'success') {
            alert(response.message);
            const updatedHistory = await getMagangHistory(nim);
            setHistoriMagangData(updatedHistory);
        } else {
            alert('Pengajuan gagal: ' + response.message);
        }
    };

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                    <tr>
                        <th scope="col" className="py-3 px-6">Jenis</th>
                        <th scope="col" className="py-3 px-6">Tempat KP</th>
                        <th scope="col" className="py-3 px-6">Alamat</th>
                        <th scope="col" className="py-3 px-6">Kota</th>
                        <th scope="col" className="py-3 px-6">Rencana Pelaksanaan</th>
                        <th scope="col" className="py-3 px-6">Tgl. Pengajuan</th>
                        <th scope="col" className="py-3 px-6">Status</th>
                        <th scope="col" className="py-3 px-6">Tgl. Proses</th>
                        <th scope="col" className="py-3 px-6">Komentar Prodi</th>
                        <th scope="col" className="py-3 px-6">Surat Pengantar</th>
                    </tr>
                </thead>
                <tbody>
                    {historiMagangData.map((item, index) => {
                        const statusBadge = item.status_magang === 'Diterima' ? 'bg-green-500' : (item.status_magang === 'Ditolak' ? 'bg-red-500' : 'bg-yellow-500');
                        const suratPengantarLink = item.surat_pengantar ? <a href="#" className="text-blue-600 hover:underline">{item.surat_pengantar}</a> : '-';
                        return (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <td className="py-3 px-6 whitespace-nowrap">{item.jenis_tempat_magang}</td>
                                <td className="py-3 px-6">{item.nama_tempat_magang}</td>
                                <td className="py-3 px-6">{item.alamat}</td>
                                <td className="py-3 px-6 text-center">{item.kota_kabupaten_magang}</td>
                                <td className="py-3 px-6 text-center">{item.rencana_mulai} sd {item.rencana_selesai}</td>
                                <td className="py-3 px-6 text-center">{item.tgl_pengajuan}</td>
                                <td className="py-3 px-6 text-center"><span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusBadge}`}>{item.status_magang}</span></td>
                                <td className="py-3 px-6 text-center">{item.tgl_proses || '-'}</td>
                                <td className="py-3 px-6">{item.komentar_prodi || '-'}</td>
                                <td className="py-3 px-6">{suratPengantarLink}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Form Pengajuan Magang</h1>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <form id="pengajuanMagangForm" className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1"><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">NIM</label><input type="text" id="nim" name="nim" value={mahasiswaData?.nim || ''} className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm sm:text-base" readOnly/></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">Nama Lengkap</label><input type="text" id="nama_lengkap" name="nama_lengkap" value={mahasiswaData?.nama || ''} className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm sm:text-base" readOnly/></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">NIK</label><input type="text" id="nik" name="nik" value={mahasiswaData?.nik || ''} className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm sm:text-base" readOnly/></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">Nomor Handphone</label><input type="text" id="handphone" name="handphone" value={formData.handphone} onChange={handleChange} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base" required/></div>
                        <div className="col-span-2"><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">Alamat</label><textarea id="alamat_mahasiswa" name="alamat" value={formData.alamat} onChange={handleChange} rows="2" className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base" required></textarea></div>
                    </div>
                    <hr className="my-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">Jenis Tempat Magang</label><select id="jenisTempat" name="jenis_tempat_magang" value={formData.jenis_tempat_magang} onChange={handleChange} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base" required><option value="">Pilih Salah Satu</option><option value="Perusahaan IT">Perusahaan IT</option><option value="Instansi Pemerintahan">Instansi Pemerintahan</option></select></div>
                        <div><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">Nama Tempat Magang</label><input type="text" id="namaTempat" name="nama_tempat_magang" value={formData.nama_tempat_magang} onChange={handleChange} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base" required/></div>
                        <div className="md:col-span-2"><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">Alamat</label><textarea id="alamat" name="alamat" rows="2" value={formData.alamat} onChange={handleChange} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base"></textarea></div>
                        <div><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">Kota/Kabupaten Magang</label><input type="text" id="kotaKabupaten" name="kota_kabupaten_magang" value={formData.kota_kabupaten_magang} onChange={handleChange} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base" required/></div>
                        <div><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">Baru/Ulang</label><div className="mt-2 space-y-2"><div className="flex items-center"><input id="baru" name="baru_ulang" type="radio" value="Baru" checked={formData.baru_ulang === 'Baru'} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" required/><label htmlFor="baru" className="ml-3 block text-sm font-medium text-gray-700">Baru (Pengajuan Baru)</label></div><div className="flex items-center"><input id="ulang" name="baru_ulang" type="radio" value="Ulang" checked={formData.baru_ulang === 'Ulang'} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/><label htmlFor="ulang" className="ml-3 block text-sm font-medium text-gray-700">Ulang (Lanjutan dari semester sebelumnya)</label></div></div></div>
                        <div><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">Rencana Pelaksanaan Mulai</label><input type="date" id="rencanaMulai" name="rencana_mulai" value={formData.rencana_mulai} onChange={handleChange} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base" required/></div>
                        <div><label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1">Rencana Pelaksanaan Selesai</label><input type="date" id="rencanaSelesai" name="rencana_selesai" value={formData.rencana_selesai} onChange={handleChange} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base" required/></div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="w-full md:w-auto bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Kirim Pengajuan
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Histori Pengajuan Magang</h2>
                <div id="histori-magang-container" className="overflow-x-auto">
                    {historiMagangData.length > 0 ? renderDesktopTable() : <p className="text-center py-4 text-gray-500">Memuat histori pengajuan...</p>}
                </div>
            </div>
        </main>
    );
};

export default PengajuanMagangPage;