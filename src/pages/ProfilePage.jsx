import React, { useState, useEffect } from 'react';
import { getMahasiswaData, updateProfile } from '../api/api';
import profileImage from '../assets/22.240.0007.jpg';

const ProfilePage = () => {
    const [mahasiswaData, setMahasiswaData] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const data = await getMahasiswaData(nim);
            setMahasiswaData(data);
            setFormData(data);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        const updateData = new FormData();
        updateData.append('email', formData.email);
        updateData.append('telp', formData.telp);
        updateData.append('handphone', formData.handphone);
        updateData.append('nik', formData.nik);
        const response = await updateProfile(nim, updateData);
        if (response.status === 'success') {
            alert(response.message);
        } else {
            alert('Gagal memperbarui profil: ' + response.message);
        }
    };

    return (
        <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Profil</h1>
            </header>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
                    <div className="mb-4">
                        <img src={profileImage} alt="Foto Profil" className="w-24 h-24 rounded-full border-4 border-white shadow-lg" id="profile-img" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{mahasiswaData?.nama || 'Memuat...'}</h2>
                    <span className="text-sm text-gray-500 mb-6">{mahasiswaData?.nim || 'Memuat...'}</span>

                    <form id="profileForm" className="space-y-4 w-full" onSubmit={handleSave}>
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs text-gray-500">Email</label>
                            <div className="flex items-center space-x-2">
                                <input type="email" id="input-email" name="email" value={formData?.email || ''} onChange={handleChange} className="flex-1 text-sm text-gray-700 bg-blue-50 p-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-200" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs text-gray-500">Telephone</label>
                            <div className="flex items-center space-x-2">
                                <input type="tel" id="input-telp" name="telp" value={formData?.telp || ''} onChange={handleChange} className="flex-1 text-sm text-gray-700 bg-blue-50 p-2 rounded-md border border-gray-200" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs text-gray-500">Handphone</label>
                            <div className="flex items-center space-x-2">
                                <input type="tel" id="input-hp" name="handphone" value={formData?.handphone || ''} onChange={handleChange} className="flex-1 text-sm text-gray-700 bg-blue-50 p-2 rounded-md border border-gray-200" />
                            </div>
                        </div>
                        <button type="submit" id="saveProfileBtn" className="w-full bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Simpan
                        </button>
                    </form>
                </div>

                <div className="w-full md:w-2/3 p-6 bg-white rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Nama Lengkap</label><input type="text" value={mahasiswaData?.nama || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Nim</label><input type="text" value={mahasiswaData?.nim || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">No.KTP</label><input type="text" name="nik" value={formData?.nik || ''} onChange={handleChange} className="w-full text-sm p-2 pr-10 rounded-md bg-blue-50 border border-gray-200" /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Program Studi</label><input type="text" value={mahasiswaData?.prodi || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Program</label><input type="text" value={mahasiswaData?.program || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Kelas</label><input type="text" value={mahasiswaData?.kelas || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Angkatan</label><input type="text" value={mahasiswaData?.angkatan || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Dosen PA</label><input type="text" value={mahasiswaData?.dosen_pa || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1 col-span-1 md:col-span-2"><label className="text-xs text-gray-500">Alamat</label><input type="text" value={mahasiswaData?.alamat || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Kota</label><input type="text" value={mahasiswaData?.kota || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">RT/RW</label><input type="text" value={mahasiswaData?.rtrw || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Kodepos</label><input type="text" value={mahasiswaData?.kodepos || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Provinsi</label><input type="text" value={mahasiswaData?.provinsi || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Negara</label><input type="text" value={mahasiswaData?.kewarganegaraan || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Jenis Kelamin</label><input type="text" value={mahasiswaData?.jenis_kelamin || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Agama</label><input type="text" value={mahasiswaData?.agama || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Status</label><input type="text" value={mahasiswaData?.status_pernikahan || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Tempat Lahir</label><input type="text" value={mahasiswaData?.tempat_lahir || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Tanggal Lahir</label><input type="text" value={mahasiswaData?.tanggal_lahir || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-1"><label className="text-xs text-gray-500">Kewarganegaraan</label><input type="text" value={mahasiswaData?.kewarganegaraan || ''} className="text-sm p-2 rounded-md bg-gray-100 border border-gray-200" readOnly /></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;