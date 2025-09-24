import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';
import Swal from 'sweetalert2';
import logo from '../assets/logo.png';
import logoOnly from '../assets/logo_only.png';

const LoginPage = () => {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser(nim, password);
    if (response.status === 'success') {
      localStorage.setItem('loggedInUserNim', response.data.nim);
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        showConfirmButton: false,
        timer: 1000
      });
      navigate('/dashboard');
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: response.message,
        showConfirmButton: false,
        timer: 1000
      });
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 overflow-x-hidden flex flex-col items-center justify-start md:justify-center relative">
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-white z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-white z-0"></div>
      <div className="w-full flex flex-col items-center md:flex-row md:items-stretch md:justify-center relative z-10">
        <div className="relative w-full md:w-2/5 flex flex-col items-center md:items-start md:justify-center pt-6 md:pt-0 z-0">
          <div className="relative w-full max-w-xs sm:max-w-md mx-auto md:-translate-x-48 md:-translate-y-28">
            <img src={logoOnly} alt="Logo Widya Pratama" className="block md:hidden absolute left-1/2 top-1/2 w-40 sm:w-56 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none select-none z-0" />
            <img src={logoOnly} alt="Logo Widya Pratama" className="hidden md:block absolute top-1/2 left-0 -translate-y-1/2 w-[451px] select-none pointer-events-none z-0" />
            <div className="relative z-10 bg-transparent p-4 md:p-0 rounded-lg md:rounded-none w-full text-white md:text-left text-center">
              <h1 className="font-extrabold text-xl sm:text-3xl md:text-5xl leading-tight drop-shadow max-w-full md:max-w-[260px]">SISTEM INFORMASI<br /><span className="text-orange-400">AKADEMIK</span>.</h1>
              <br />
              <p className="text-lg sm:text-2xl font-bold">INSTITUT WIDYA PRATAMA PEKALONGAN</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[540px] flex justify-center mt-6 md:mt-0 z-10">
          <div className="relative w-[98%] sm:w-[510px] max-w-lg bg-white shadow-xl rounded-xl p-6 sm:p-12 mx-auto">
            <div className="flex flex-col items-center mb-6">
              <img src={logo} alt="Logo IWP" className="w-14 sm:w-20 mb-2" />
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1" htmlFor="userid">ID Pengguna</label>
                <input id="userid" type="text" placeholder="Masukkan ID Pengguna" value={nim} onChange={(e) => setNim(e.target.value)} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm sm:text-base" required/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1" htmlFor="password">Kata Sandi</label>
                <input id="password" type="password" placeholder="Masukkan Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm sm:text-base" required/>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1" htmlFor="role">Sebagai</label>
                <select id="role" className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm sm:text-base">
                  <option>Mahasiswa</option>
                  <option>Dosen</option>
                  <option>Admin</option>
                  <option>Pimpinan</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition text-sm sm:text-base mb-2">Masuk</button>
              <div className="text-center">
                <a href="/lupa_sandi.html" className="text-xs sm:text-sm text-blue-500 hover:underline">Lupa kata sandi?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
