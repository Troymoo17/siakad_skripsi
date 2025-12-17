import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../assets/logo.png';

const LupaSandiPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    // Simulasi logic lupa sandi
    Swal.fire({
      icon: "success",
      title: "Instruksi Terkirim",
      text: "Silahkan cek email Anda untuk mengatur ulang kata sandi.",
      confirmButtonColor: "#1d4ed8"
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo IWP" className="w-20 mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Lupa Kata Sandi?</h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Masukkan email yang terdaftar pada sistem untuk menerima instruksi pemulihan.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-xs font-bold uppercase mb-2 ml-1">Alamat Email</label>
            <input 
              type="email" 
              placeholder="nama@mhs.widya-pratama.ac.id" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              required 
            />
          </div>

          <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all">
            KIRIM INSTRUKSI
          </button>

          <div className="text-center">
            <Link to="/" className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
              Kembali ke halaman Login
            </Link>
          </div>
        </form>
      </div>
      
      <p className="mt-8 text-xs text-gray-400 font-medium">
        &copy; {new Date().getFullYear()} Institut Widya Pratama Pekalongan
      </p>
    </div>
  );
};

export default LupaSandiPage;