import React, { useState, useEffect } from 'react';
import { getMahasiswaData, updateProfile } from '../api/api';
import Swal from 'sweetalert2';

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
        
        updateData.append('email', formData.email || '');
        updateData.append('telp', formData.telp || '');
        updateData.append('handphone', formData.handphone || '');
        updateData.append('nik', formData.nik || '');
        
        Swal.fire({
            title: 'Mohon Tunggu...',
            text: 'Sedang memperbarui profil Anda',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
            const response = await updateProfile(nim, updateData);
            
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Berhasil!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonColor: '#1d4ed8',
                });
            } else {
                Swal.fire({
                    title: 'Gagal',
                    text: 'Gagal memperbarui profil: ' + response.message,
                    icon: 'error',
                    confirmButtonColor: '#1d4ed8',
                });
            }
        
    };

    return (
        <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 bg-gray-50">
            <header className="mb-5 md:mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Profil Mahasiswa</h1>
            </header>
            
            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-5 md:gap-6">
                
                {/* Kolom Kiri: Foto & Kontak  */}
               <div className="w-full md:w-1/3 p-5 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
    <div className="mb-4">
        {mahasiswaData?.foto_profil_url ? (
            <img 
                src={mahasiswaData.foto_profil_url} 
                alt="Foto Profil" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" 
                id="profile-img" 
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://ui-avatars.com/api/?name=" + mahasiswaData?.nama;
                }}
            />
        ) : (
            <div 
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white text-3xl font-bold uppercase"
                id="profile-fallback"
            >
                {mahasiswaData?.nama?.charAt(0) || 'U'}
            </div>
        )}
    </div>
                    <h2 className="text-xl font-bold text-gray-800 text-center">{mahasiswaData?.nama || 'Memuat...'}</h2>
                    <span className="text-sm text-gray-500 mb-6">{mahasiswaData?.nim || 'Memuat...'}</span>

                    <form id="profileForm" className="space-y-4 w-full" onSubmit={handleSave}>
                        {/* Email */}
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs text-gray-500 font-medium">Email</label>
                            <input 
                                type="email" id="input-email" name="email" value={formData?.email || ''} onChange={handleChange} 
                                className="flex-1 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring focus:ring-blue-200" 
                            />
                        </div>
                        {/* Telephone */}
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs text-gray-500 font-medium">Telephone</label>
                            <input 
                                type="tel" id="input-telp" name="telp" value={formData?.telp || ''} onChange={handleChange} 
                                className="flex-1 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring focus:ring-blue-200" 
                            />
                        </div>
                        {/* Handphone */}
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs text-gray-500 font-medium">Handphone</label>
                            <input 
                                type="tel" id="input-hp" name="handphone" value={formData?.handphone || ''} onChange={handleChange} 
                                className="flex-1 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring focus:ring-blue-200" 
                            />
                        </div>
                        <button type="submit" id="saveProfileBtn" className="w-full bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Simpan Perubahan
                        </button>
                    </form>
                </div>

                {/* Kolom Kanan: Detail Data Pribadi  */}
                <div className="w-full md:w-2/3 p-5 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Informasi Akademik dan Pribadi</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 md:gap-x-6 md:gap-y-4">
                        
                        {/* Baris 1: Nama Lengkap (Read-Only) */}
                        <div className="flex flex-col space-y-0.5">
                            <label className="text-xs text-gray-500 font-medium">Nama Lengkap</label>
                            <input type="text" value={mahasiswaData?.nama || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly />
                        </div>
                        {/* Baris 2: Nim (Read-Only) */}
                        <div className="flex flex-col space-y-0.5">
                            <label className="text-xs text-gray-500 font-medium">Nim</label>
                            <input type="text" value={mahasiswaData?.nim || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly />
                        </div>
                        
                        {/* Baris 3: No.KTP  */}
                        <div className="flex flex-col space-y-0.5">
                            <label className="text-xs text-gray-500 font-medium">No.KTP (NIK)</label>
                            <input type="text" name="nik" value={formData?.nik || ''} onChange={handleChange} 
                                className="w-full text-sm p-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring focus:ring-blue-200" 
                            />
                        </div>
                        {/* Baris 4: Program Studi (Read-Only) */}
                        <div className="flex flex-col space-y-0.5">
                            <label className="text-xs text-gray-500 font-medium">Program Studi</label>
                            <input type="text" value={mahasiswaData?.prodi || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly />
                        </div>

                        {/* Program, Kelas, Angkatan, Dosen PA, dst...  */}
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Program</label><input type="text" value={mahasiswaData?.program || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Kelas</label><input type="text" value={mahasiswaData?.kelas || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Angkatan</label><input type="text" value={mahasiswaData?.angkatan || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Dosen PA</label><input type="text" value={mahasiswaData?.dosen_pa || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        
                        {/* Alamat (Full Width di mobile dan desktop) */}
                        <div className="flex flex-col space-y-0.5 col-span-1 sm:col-span-2 md:col-span-2">
                            <label className="text-xs text-gray-500 font-medium">Alamat</label>
                            <input type="text" value={mahasiswaData?.alamat || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly />
                        </div>
                        
                        {/* Sisa field data pribadi */}
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Kota</label><input type="text" value={mahasiswaData?.kota || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">RT/RW</label><input type="text" value={mahasiswaData?.rtrw || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Kodepos</label><input type="text" value={mahasiswaData?.kodepos || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Provinsi</label><input type="text" value={mahasiswaData?.provinsi || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Negara</label><input type="text" value={mahasiswaData?.kewarganegaraan || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Jenis Kelamin</label><input type="text" value={mahasiswaData?.jenis_kelamin || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Agama</label><input type="text" value={mahasiswaData?.agama || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Status</label><input type="text" value={mahasiswaData?.status_pernikahan || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Tempat Lahir</label><input type="text" value={mahasiswaData?.tempat_lahir || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Tanggal Lahir</label><input type="text" value={mahasiswaData?.tanggal_lahir || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                        <div className="flex flex-col space-y-0.5"><label className="text-xs text-gray-500 font-medium">Kewarganegaraan</label><input type="text" value={mahasiswaData?.kewarganegaraan || ''} className="text-sm p-2 rounded-lg bg-gray-100 border border-gray-200" readOnly /></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;