import React, { useState, useEffect } from 'react';
import { getMahasiswaData, submitHotspotPassword } from '../../api/api';

const HotspotPage = () => {
    const [mahasiswaData, setMahasiswaData] = useState(null);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const nim = localStorage.getItem('loggedInUserNim');
        const fetchData = async () => {
            const mhsData = await getMahasiswaData(nim);
            setMahasiswaData(mhsData);
        };
        fetchData();
    }, []);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        const response = await submitHotspotPassword(nim, password);
        
        if (response.status === 'success') {
            alert(response.message);
        } else {
            alert('Gagal menyimpan password hotspot: ' + response.message);
        }
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Pendaftaran Hotspot</h1>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1">Username:</label>
                        <input type="text" value={mahasiswaData?.nim || 'Memuat...'} readOnly className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm p-2"/>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2" required/>
                    </div>
                    <div className="flex justify-start pt-2">
                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Simpan
                        </button>
                    </div>
                </form>
                <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
                    <h3 className="font-semibold mb-2">Keterangan:</h3>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Silakan login dengan Username dan password.</li>
                        <li>Username adalah nim Anda dan passwordnya sesuai yang Anda input.</li>
                        <li>Satu User dapat digunakan untuk 2 perangkat (maksimal).</li>
                    </ol>
                </div>
            </div>
        </main>
    );
};

export default HotspotPage;