import React, { useState } from 'react';
import { submitSurveiKepuasan } from '../../api/api';

const SurveiKepuasanSkripsiPage = () => {
    const [answers, setAnswers] = useState({
        q1: '', q2: '', q3: '', q4: '', q5: '', q6: ''
    });

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

        const response = await submitSurveiKepuasan(nim, 'skripsi', answers);
        if (response.status === 'success') {
            alert(response.message);
        } else {
            alert('Gagal mengirim survei: ' + response.message);
        }
    };

    const questions = [
        "Pembimbing skripsi memberikan bimbingan yang jelas dan terarah.",
        "Dosen pembimbing mudah dihubungi dan responsif.",
        "Tersedianya informasi yang memadai terkait prosedur dan jadwal skripsi.",
        "Proses pengujian skripsi (ujian sidang) berjalan dengan adil dan transparan.",
        "Fasilitas seperti ruang sidang atau perlengkapan proyektor berfungsi dengan baik.",
        "Durasi pengerjaan skripsi yang diberikan oleh pihak jurusan sudah sesuai."
    ];

    const options = [
        "Sangat Setuju",
        "Setuju",
        "Kurang Setuju",
        "Tidak Setuju",
        "Sangat Tidak Setuju"
    ];

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Survei Kepuasan Skripsi</h1>
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
                        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Kirim Survei
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default SurveiKepuasanSkripsiPage;