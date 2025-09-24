import React, { useState, useEffect } from 'react';
import { getSkripsiData, getPengajuanJudulData, submitPengajuanJudul } from '../../api/api';

const PengajuanJudulPage = () => {
    const [skripsiData, setSkripsiData] = useState(null);
    const [historiJudul, setHistoriJudul] = useState([]);
    const [formData, setFormData] = useState({
        baru_ulang: 'Baru', judul: '', abstrak: '', jalur: '', sertifikasi: []
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
            const data = await getSkripsiData(nim);
            setSkripsiData(data?.data);
            const history = await getPengajuanJudulData(nim);
            setHistoriJudul(history);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                sertifikasi: checked ? [...prev.sertifikasi, value] : prev.sertifikasi.filter(item => item !== value)
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        const formSubmitData = new FormData();
        formSubmitData.append('nim', nim);
        formSubmitData.append('judul', formData.judul);
        formSubmitData.append('abstrak', formData.abstrak);
        formSubmitData.append('jalur', formData.jalur);
        formSubmitData.append('baru_ulang', formData.baru_ulang);

        const response = await submitPengajuanJudul(formSubmitData);
        if (response.status === 'success') {
            alert(response.message);
            const updatedHistory = await getPengajuanJudulData(nim);
            setHistoriJudul(updatedHistory);
        } else {
            alert('Pengajuan gagal: ' + response.message);
        }
    };

    const renderHistoryTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-white uppercase bg-blue-600 rounded-t-lg">
                    <tr>
                        <th scope="col" className="py-3 px-6 rounded-tl-lg">Judul</th>
                        <th scope="col" className="py-3 px-6">Abstrak</th>
                        <th scope="col" className="py-3 px-6">Jalur</th>
                        <th scope="col" className="py-3 px-6">Tgl Pengajuan</th>
                        <th scope="col" className="py-3 px-6 text-center">Status</th>
                        <th scope="col" className="py-3 px-6">Tgl Proses</th>
                        <th scope="col" className="py-3 px-6">Komentar Prodi</th>
                        <th scope="col" className="py-3 px-6 rounded-tr-lg text-center">Cetak Form</th>
                    </tr>
                </thead>
                <tbody>
                    {historiJudul.map((item, index) => {
                        const statusBadgeClass = item.status === 'Disetujui' ? 'bg-green-600' : (item.status === 'Ditolak' ? 'bg-red-600' : 'bg-yellow-600');
                        const cetakFormLink = item.cetak_form ? <a href={item.cetak_form} className="text-blue-600 hover:underline">Cetak</a> : 'Tidak tersedia';
                        return (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <td className="py-3 px-6">{item.judul}</td>
                                <td className="py-3 px-6">{item.abstrak}</td>
                                <td className="py-3 px-6">{item.jalur}</td>
                                <td className="py-3 px-6">{formatDateToDMY(item.tgl_pengajuan)}</td>
                                <td className="py-3 px-6 text-center"><span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${statusBadgeClass}`}>{item.status}</span></td>
                                <td className="py-3 px-6">{item.tgl_proses ? formatDateToDMY(item.tgl_proses) : '-'}</td>
                                <td className="py-3 px-6">{item.komentar_prodi || '-'}</td>
                                <td className="py-3 px-6 text-center">{cetakFormLink}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Formulir Pengajuan Judul Skripsi/TA</h1>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <form id="pengajuanJudulForm" className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700">Baru/Ulang</label><select id="baru_ulang" name="baru_ulang" value={formData.baru_ulang} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" required><option value="Baru">Baru</option><option value="Ulang">Ulang</option></select></div>
                        <div className="col-span-2"><label className="block text-sm font-medium text-gray-700">Judul Yang Diajukan</label><input type="text" id="judul" name="judul" value={formData.judul} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" required/></div>
                        <div className="col-span-2"><label className="block text-sm font-medium text-gray-700">Deskripsi atau Abstrak</label><textarea id="abstrak" name="abstrak" rows="4" value={formData.abstrak} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" required></textarea></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700">Jalur</label><select id="jalur" name="jalur" value={formData.jalur} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" required><option value="">-- Pilih --</option><option value="Jalur A">Jalur A</option><option value="Jalur B">Jalur B</option></select></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700">No. HP Terbaru</label><input type="text" id="hp_terbaru" name="hp_terbaru" value={skripsiData?.hp_terbaru || ''} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700">Semester</label><input type="text" id="semester_pengajuan" name="semester_pengajuan" value={skripsiData?.semester_pengajuan || ''} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700">IPK Terakhir</label><input type="text" id="ipk_terakhir" name="ipk_terakhir" value={skripsiData?.ipk_terakhir || ''} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700">Jumlah Point</label><input type="text" id="jumlah_point" name="jumlah_point" value={skripsiData?.jumlah_point || ''} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700">Nilai Magang</label><input type="text" id="nilai_magang" name="nilai_magang" value={skripsiData?.nilai_magang || ''} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700">Jumlah SKS yang Telah Ditempuh</label><input type="text" id="sks_ditempuh" name="sks_ditempuh" value={skripsiData?.sks_ditempuh || ''} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700">Jumlah Nilai D</label><input type="text" id="jumlah_nilai_d" name="jumlah_nilai_d" value={skripsiData?.jumlah_nilai_d || ''} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/></div>
                        <div className="col-span-2 md:col-span-1"><label className="block text-sm font-medium text-gray-700">Jumlah Nilai E</label><input type="text" id="jumlah_nilai_e" name="jumlah_nilai_e" value={skripsiData?.jumlah_nilai_e || ''} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly/></div>
                        <div className="col-span-2"><label className="block text-sm font-medium text-gray-700">Mata Kuliah D</label><textarea id="mata_kuliah_d" name="mata_kuliah_d" rows="2" value={skripsiData?.mata_kuliah_d || ''} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly></textarea></div>
                        <div className="col-span-2"><label className="block text-sm font-medium text-gray-700">Mata Kuliah E</label><textarea id="mata_kuliah_e" name="mata_kuliah_e" rows="2" value={skripsiData?.mata_kuliah_e || ''} className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm" readOnly></textarea></div>
                        <div className="col-span-2"><label className="block text-sm font-medium text-gray-700">Sertifikasi</label><div className="mt-2 space-y-2"><div className="flex items-center"><input id="sertifikat_toefl" name="sertifikasi[]" type="checkbox" value="TOEFL" checked={formData.sertifikasi.includes('TOEFL')} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/><label htmlFor="sertifikat_toefl" className="ml-3 block text-sm font-medium text-gray-700">TOEFL</label></div><div className="flex items-center"><input id="sertifikat_jeni" name="sertifikasi[]" type="checkbox" value="JENI" checked={formData.sertifikasi.includes('JENI')} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/><label htmlFor="sertifikat_jeni" className="ml-3 block text-sm font-medium text-gray-700">JENI</label></div><div className="flex items-center"><input id="sertifikat_ccna" name="sertifikasi[]" type="checkbox" value="CCNA 1" checked={formData.sertifikasi.includes('CCNA 1')} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/><label htmlFor="sertifikat_ccna" className="ml-3 block text-sm font-medium text-gray-700">CCNA 1</label></div></div></div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Ajukan
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Status Permohonan Skripsi Anda</h2>
                <div id="status-permohonan-container" className="overflow-x-auto">
                    {historiJudul.length > 0 ? renderHistoryTable() : <p className="text-center py-4 text-gray-500">Memuat status permohonan...</p>}
                </div>
            </div>
        </main>
    );
};

export default PengajuanJudulPage;
