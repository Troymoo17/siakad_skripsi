import React, { useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { submitSurveiKepuasanIkadIkas } from '../../api/api';
import Swal from 'sweetalert2';

const IkasKuesionerPage = () => {
    const { id_staff } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { name } = location.state || { name: 'Staf' };
    const [answers, setAnswers] = useState({});

    const questions = [
        "1. Kemampuan staf dalam melayani mahasiswa sangat baik.",
        "2. Kecepatan dan ketepatan staf dalam menyelesaikan pekerjaan.",
        "3. Tanggung jawab staf terhadap tugas yang diberikan sangat baik.",
        "4. Kemampuan staf dalam berinteraksi dengan mahasiswa baik.",
        "5. Kedisiplinan dan kehadiran staf dalam bekerja sangat baik.",
        "6. Ketersediaan sarana dan prasarana penunjang kegiatan di kampus sangat baik."
    ];

    const options = [
        "Sangat Setuju",
        "Setuju",
        "Kurang Setuju",
        "Tidak Setuju",
        "Sangat Tidak Setuju"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        if (!nim) {
            Swal.fire('Error', 'NIM tidak ditemukan. Harap login kembali.', 'error');
            return;
        }

        const payload = {
            nim,
            jenis_survei: 'ikas',
            target_id: id_staff,
            answers
        };

        const response = await submitSurveiKepuasanIkadIkas(payload);
        if (response.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: response.message,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/registrasi/ikad-ikas');
        } else {
            Swal.fire('Gagal', response.message, 'error');
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Kuesioner IKAS</h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Penilaian Kinerja Administrasi & Sarana</p>
                </div>

                {/* Tombol Kembali */}
                <Link 
                    to="/dashboard/registrasi/ikad-ikas"
                    className="flex items-center gap-2 w-fit bg-white border border-gray-300 px-4 py-2 rounded-xl text-gray-600 hover:text-blue-700 hover:border-blue-700 transition-all shadow-sm group"
                >
                    <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest">Kembali</span>
                </Link>
            </header>

            <div className="w-full bg-white p-6 rounded-xl border border-gray-300 shadow-sm mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-5 bg-blue-700 rounded-full"></div>
                    <h2 className="text-gray-800 font-bold text-sm tracking-widest uppercase">Detail Objek Penilaian</h2>
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Nama Staf / Bagian:</p>
                <p className="text-lg font-black text-blue-700 uppercase">{name}</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="grid grid-cols-1 gap-4">
                    {questions.map((question, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm transition-all hover:border-blue-300">
                            <p className="font-bold text-gray-800 text-sm mb-4 leading-relaxed">{question}</p>
                            <div className="flex flex-wrap gap-4 md:gap-8">
                                {options.map(option => (
                                    <label key={option} className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="radio"
                                                name={`q${index + 1}`}
                                                value={option}
                                                checked={answers[`q${index + 1}`] === option}
                                                onChange={handleChange}
                                                className="peer appearance-none h-5 w-5 border-2 border-gray-300 rounded-full checked:border-blue-700 transition-all"
                                                required
                                            />
                                            <div className="absolute h-2.5 w-2.5 rounded-full bg-blue-700 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 uppercase group-hover:text-blue-700 transition-colors">
                                            {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        type="submit" 
                        className="w-full md:w-auto bg-blue-700 text-white font-black px-12 py-3 rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 uppercase text-xs tracking-widest"
                    >
                        Kirim Penilaian
                    </button>
                </div>
            </form>
        </main>
    );
};

export default IkasKuesionerPage;