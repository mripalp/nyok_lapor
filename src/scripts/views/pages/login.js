const Login = {
  async render() {
    return `
      <div class="grid justify-items-center ... font-semibold text-[#C2C2C2] over">
      <div class="bg-[#1F2937] rounded-lg " style="width: 642px; height: 855px; border-radius: 40px;">
          <div class="grid justify-items-center ... mt-16">
              <img src="../public/logo/Nyok lapor.png" style="width:183px; height:102px;">
              // eslint-disable-next-line no-tabs
              <p class="mt-7 text-5xl">Hai, Pelapor!</p>
              <p class="mt-3 text-lg text-center">Daftar sekarang dan jadilah bagian dari <br> inovasi kami.</p>
              <img src="../public//homepage/line.png" class="mt-1.5">
          </div>
          <form id="loginForm">
              <label class="block mt-5 ml-40">
                  <span class="block text-lg font-semibold text-[#B31312]">Email</span>
                  <input type="email" id="email" class="peer ... text-sm bg-white pl-6 pr-32 pt-4 pb-4 text-slate-950"
                      placeholder="Youremail@gmail.com" style="border-radius: 20px;" />
                  <p class="mt-2 invisible peer-invalid:visible text-[#B31312] text-sm">
                      Please provide a valid email address.
                  </p>
              </label>
  
              <label class="block mt-0.5 ml-40 relative">
                  <span class="block text-lg font-semibold text-[#B31312]">Password</span>
                  <div class="relative" style="width: 350px;">
                      <input type="text" id="password" class="text-sm bg-white pl-6 pr-14 pt-4 pb-4 text-slate-950" placeholder="Password" style="border-radius: 20px; width: 343px; text-decoration: none  !important;" id="password"/>
                      <div class="w-10 h-10 hover:bg-[#111827] active:bg-[#111827] focus:outline-none focus:ring focus:ring-black-300 ... absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center  style="border-radius: 5px;">
                          <img src="../public/icons/eye.png" id="eyeIcon" class="eye-icon" alt="Eye Icon">
                      </div>
                  </div>
              </label>
  
              <div class="mt-11 ml-40 relative " >
                  <button class="hover:bg-[#111827] active:bg-[#111827] focus:outline-none focus:ring focus:ring-black-300 ... text-white pb-5 pt-5 font-bold text-xl" style="border-radius: 14px; width: 345px; box-shadow: 0px 14px 10px 0px rgba(0, 0, 0, 0.25); transition: background-color 0.2s " type="submit">Masuk</button>
              </div>
              <div class="mt-11 ml-40  flex items-center ...">
                  <div>
                      // eslint-disable-next-line no-tabs
                      <button class=" hover:bg-white bg-slate-100 text-black pb-5 pt-5 font-medium text-xl flex justify-start ..." style="border-radius: 14px; width: 345px; gap: 25px;" type="submit"> 
                          <img src="../public/icons/icon-google.png" style="margin-left: 30px; transition: background-color 0.2s ease">    
                          <p>Sign Up With google</p>
                      </button>
                  </div>
              </div>
          </form>
      </div>
  </div>
          `;
  },

  // eslint-disable-next-line no-empty-function
  async afterRender() {
    // Mendapatkan referensi ke form login
    const loginForm = document.getElementById('loginForm');

    // Menggunakan event listener untuk menangani submit form
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Mencegah form dari pengiriman default

      // Mengambil nilai email dan password dari form
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
      // Melakukan permintaan login
        const response = await fetch('http://203.194.114.148:4001/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Login successful');
          console.log('Token:', data.token); // Menampilkan token ke konsol

          // Menunggu selama 3 detik (3000 milidetik)
          // eslint-disable-next-line no-promise-executor-return
          await new Promise((resolve) => setTimeout(resolve, 3000));

          // Setelah waktu jeda, lanjutkan dengan fetch data profil menggunakan token yang didapat
          const profileResponse = await fetch('http://203.194.114.148:4001/user/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${data.token}`, // Menggunakan token untuk otorisasi
              'Content-Type': 'application/json',
            },
          });

          const profileData = await profileResponse.json();

          if (profileResponse.ok) {
            console.log('Profile data:', profileData.profile);
            // Lakukan sesuatu dengan data profil yang diterima

            // Jika role adalah 'user', pindah ke halaman #/home setelah waktu jeda
            if (profileData.profile.role === 'user') {
              console.log('User role detected. Redirecting to home page...');
              window.location.href = '#/home';
            } else if (profileData.profile.role === 'admin') {
              console.log('Admin role detected. Redirecting to admin page...');
              window.location.href = '#/admin';
            }
          } else {
            console.error('Failed to fetch profile data:', profileData.message);
          // Tindakan jika gagal mengambil data profil
          }
        } else {
          console.error('Login failed:', data.message);
        // Tindakan jika login gagal
        }
      } catch (error) {
        console.error('Error:', error);
      // Tindakan jika terjadi kesalahan saat proses login atau fetch profil
      }
    });
  },

};

export default Login;
