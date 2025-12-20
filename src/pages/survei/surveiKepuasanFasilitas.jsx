import React, { useState } from 'react';
import { submitSurveiKepuasan } from '../../api/api';
import Swal from 'sweetalert2';
import logoKecil from '../../assets/logo_kecil.png';

const SurveiKepuasanFasilitasPage = () => {
    const [answers, setAnswers] = useState({
        q1: '', q2: '', q3: '', q4: '', q5: ''
    });
    // State untuk melacak status pengiriman
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nim = localStorage.getItem('loggedInUserNim');
        
        if (!nim) {
            Swal.fire({
                icon: 'error',
                title: 'Sesi Berakhir',
                text: 'NIM tidak ditemukan. Harap login kembali.',
                confirmButtonColor: '#3b82f6'
            });
            return;
        }

        Swal.fire({
            title: 'Sedang Mengirim...',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        const response = await submitSurveiKepuasan(nim, 'fasilitas', answers);
        
        if (response.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Terima Kasih!',
                text: response.message,
                confirmButtonColor: '#3b82f6'
            });
            setIsSubmitted(true); 
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Terkirim',
                text: response.message,
                confirmButtonColor: '#ef4444'
            });
        }
    };

    if (isSubmitted) {
        return (
            <main className="flex-1 p-4 md:p-8 lg:p-10 bg-[#f8fafc] min-h-screen flex items-center justify-center">
                <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-blue-50">
                    <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <img src={logoKecil} alt="Logo" className="w-16 h-16 object-contain" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 mb-2 uppercase tracking-tight">Terima Kasih!</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Data survei fasilitas Anda telah kami terima. Partisipasi Anda sangat berharga bagi kami.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/dashboard'}
                        className="mt-8 w-full bg-[#005c97] hover:bg-[#363795] text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95 uppercase tracking-widest text-sm"
                    >
                        Kembali ke Dashboard
                    </button>
                </div>
            </main>
        );
    }

    const questions = [
        "Ruang kuliah tertata dengan bersih, dan rapi",
        "Ruang kuliah sejuk dan nyaman",
        "Sarana pembelajaran yang tersedia di ruang kuliah tercukupi",
        "Tersedia perpustakaan yang lengkap",
        "Tersedia laboratorium yang relevan dengan kebutuhan keilmuan bagi mahasiswa (bahasa, komputer)"
    ];

    const options = ["Sangat Setuju", "Setuju", "Kurang Setuju", "Tidak Setuju", "Sangat Tidak Setuju"];

    return (
        <main className="flex-1 p-4 md:p-8 lg:p-10 bg-[#f8fafc] min-h-screen">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Survei Kepuasan Fasilitas</h1>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="border-b pb-4">
                            <p className="font-semibold text-gray-800 mb-2">{index + 1}. {question}</p>
                            <div className="space-y-2">
                                {options.map(option => (
                                    <div key={option} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`q${index + 1}-${option}`}
                                            name={`q${index + 1}`}
                                            value={option}
                                            checked={answers[`q${index + 1}`] === option}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            required
                                        />
                                        <label htmlFor={`q${index + 1}-${option}`} className="ml-3 text-sm text-gray-700">{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all uppercase tracking-wider">
                            Kirim Survei
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default SurveiKepuasanFasilitasPage;