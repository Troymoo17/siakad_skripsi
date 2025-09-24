import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { submitSurveiKepuasanIkadIkas } from '../../api/api';

const IkadKuesionerPage = () => {
    const { kode_mk } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { name } = location.state || { name: 'Dosen' };
    const [answers, setAnswers] = useState({});

    const questions = [
        "1. Pengetahuan dan penguasaan materi yang diberikan oleh dosen sangat baik.",
        "2. Kemampuan dosen dalam menyampaikan materi jelas dan mudah dipahami.",
        "3. Kemampuan dosen dalam berinteraksi dengan mahasiswa baik.",
        "4. Tanggung jawab dosen terhadap tugas yang diberikan sangat baik.",
        "5. Kedisiplinan dan kehadiran dosen dalam mengajar/bekerja sangat baik."
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
            alert('NIM tidak ditemukan. Harap login kembali.');
            return;
        }

        const payload = {
            nim,
            jenis_survei: 'ikad',
            target_id: kode_mk,
            answers
        };

        const response = await submitSurveiKepuasanIkadIkas(payload);
        if (response.status === 'success') {
            alert(response.message);
            navigate('/dashboard/registrasi/ikad-ikas');
        } else {
            alert('Gagal mengirim kuesioner: ' + response.message);
        }
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">Kuesioner IKAD</h1>
            <h2 className="text-lg md:text-xl font-medium mb-6 text-gray-700">Penilaian untuk Dosen: {name}</h2>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="border-b pb-4">
                            <p className="font-semibold text-gray-800 mb-2">{question}</p>
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
                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Kirim Kuesioner
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default IkadKuesionerPage;