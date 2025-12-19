import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../assets/logo.png';
import logoOnly from '../assets/logo_only.png';

const LupaSandiPage = () => {
  const [email, setEmail] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Verifikasi Berhasil",
      text: "Instruksi pemulihan telah dikirim ke email Anda.",
      confirmButtonColor: "#005c97",
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#005c97] to-[#363795] flex flex-col relative overflow-x-hidden">
      
      {/* Background Putih Bawah */}
      <div className="absolute bottom-0 left-0 w-full h-[25vh] md:h-[30vh] bg-white z-0 rounded-t-[3rem] md:rounded-none"></div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center relative z-10 p-4 min-[350px]:p-6">
        
        {/* Branding Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start pt-16 min-[350px]:pt-20 md:pt-0 mb-4 md:mb-0 md:pl-12 lg:pl-20 transition-all duration-500">
          <div className="relative">
            <img 
              src={logoOnly} 
              alt="Watermark" 
              className="absolute top-1/2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-[-10%] -translate-y-1/2 w-44 min-[350px]:w-56 sm:w-64 md:w-[450px] opacity-10 brightness-0 invert pointer-events-none" 
            />
            
            <div className="relative z-10 text-center md:text-left">
              <h1 className="font-black text-2xl min-[350px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tighter drop-shadow-2xl">
                PEMULIHAN<br />
                <span className="text-orange-400">AKUN</span>
              </h1>
              <p className="mt-2 md:mt-4 text-[11px] min-[350px]:text-sm sm:text-base md:text-xl font-bold tracking-[0.2em] text-blue-100 opacity-90 uppercase">
                Institut Widya Pratama
              </p>
            </div>
          </div>
        </div>

        {/* Card Reset Password  */}
        <div className="w-full max-w-[450px] md:w-[420px] lg:w-[480px] translate-y-24 min-[350px]:translate-y-28 md:translate-y-32 lg:translate-y-36 transition-all duration-500">
          <div className="bg-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] rounded-[2.5rem] p-7 min-[350px]:p-9 sm:p-12 border border-gray-100 mx-auto">
            <div className="flex flex-col items-center mb-8">
              <img src={logo} alt="Logo IWP" className="w-16 min-[350px]:w-20 mb-4" />
              <h2 className="text-lg min-[350px]:text-xl font-black text-gray-800 uppercase tracking-tight">Verifikasi Data</h2>
            </div>

            <form onSubmit={handleReset} className="space-y-4 md:space-y-5">
              {/* Input Email */}
              <div>
                <label className="block text-gray-700 text-[10px] min-[350px]:text-xs font-bold uppercase mb-2 tracking-widest ml-1">
                  Alamat Email
                </label>
                <input 
                  type="email" 
                  placeholder="Masukkan email terdaftar" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm transition-all"
                  required 
                />
              </div>

              {/* Input Tanggal Lahir - Baru */}
              <div>
                <label className="block text-gray-700 text-[10px] min-[350px]:text-xs font-bold uppercase mb-2 tracking-widest ml-1">
                  Tanggal Lahir
                </label>
                <input 
                  type="date" 
                  value={tglLahir}
                  onChange={(e) => setTglLahir(e.target.value)}
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm transition-all text-gray-600"
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#005c97] hover:bg-[#363795] text-white font-black py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 uppercase tracking-widest text-xs sm:text-sm mt-2"
              >
                Verifikasi & Kirim
              </button>

              <div className="text-center mt-4">
                <Link to="/" className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                  Kembali ke Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 py-6 text-center mt-36 min-[350px]:mt-44 md:mt-0">
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase px-4">
          &copy; {new Date().getFullYear()} Institut Widya Pratama
        </p>
      </div>
    </div>
  );
};

export default LupaSandiPage;