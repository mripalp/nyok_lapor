import Swal from 'sweetalert2/dist/sweetalert2.all.min';
// eslint-disable-next-line import/no-unresolved, import/extensions
import API_ENDPOINT from '../../global/api-endpoints';

const LoginAdmin = {

  async render() {
    return `
  <section>
    <div class="grid justify-items-center ... font-semibold text-[#C2C2C2] over">
        <div class="bg-[#1F2937] rounded-lg " style="width: 642px; height: 855px; border-radius: 40px;">
            <div class="grid justify-items-center ... mt-16">
                <img src="./assets/icons/nyoklapor-icon.png" style="width:183px; height:102px;">
                <p class="mt-7 text-5xl">Hai, Admin</p>
                <img src="./assets/icons/lines.png" class="mt-1.5">
            </div>
            <form id="login-form">
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
                        <input type="password" id="password" class="text-sm bg-white pl-6 pr-14 pt-4 pb-4 text-slate-950" placeholder="Password" style="border-radius: 20px; width: 343px; text-decoration: none  !important;" id="password"/>
                        <div class="w-10 h-10 hover:bg-[#111827] active:bg-[#111827] focus:outline-none focus:ring focus:ring-black-300 ... absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center" style="border-radius: 5px;">
                            <img src="./assets/icons/icon-eye.png" id="eyeIcon" class="eye-icon" alt="Eye Icon">
                        </div>
                    </div>
                </label>

                <div class="mt-11 ml-40 relative " >
                    <button id="login-btn" class="hover:bg-[#111827] active:bg-[#111827] focus:outline-none focus:ring focus:ring-black-300 ... text-white pb-5 pt-5 font-bold text-xl" style="border-radius: 14px; width: 345px; box-shadow: 0px 14px 10px 0px rgba(0, 0, 0, 0.25); transition: background-color 0.2s ">Masuk</button>
                </div>
                <div class="mt-11 ml-40  flex items-center ...">
                    <div>
                        <button class=" hover:bg-white bg-slate-100 text-black pb-5 pt-5 font-medium text-xl flex justify-start ..." style="border-radius: 14px; width: 345px; gap: 25px;"> 
                            <img src="../assets/icons/icon-google.png" style="margin-left: 30px; transition: background-color 0.2s ease">    
                            <p>Sign Up With google</p>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</section>
    `;
  },

  async afterRender() {
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const eyeIconPassword = document.getElementById('eyeIcon');

    loginForm.addEventListener('submit', this.handleLogin);
    loginForm.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.handleLogin(event);
      }
    });
    loginBtn.addEventListener('click', this.handleLogin);
    eyeIconPassword.addEventListener('click', this.togglePasswordVisibility);
  },

  async togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordInput.type === 'text') {
      passwordInput.type = 'password';
      eyeIcon.src = '../assets/icons/eye.png';
    } else {
      passwordInput.type = 'text';
      eyeIcon.src = '../assets/icons/eye look.png';
    }
  },

  async handleLogin() {
    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Silakan masukkan email dan kata sandi.',
      });
      return;
    }

    const storedLoginInfoAdmin = localStorage.getItem('loginInfoAdmin');

    if (storedLoginInfoAdmin) {
      const loginInfoAdmin = JSON.parse(storedLoginInfoAdmin);
      if (email === loginInfoAdmin.email && password === loginInfoAdmin.password) {
        console.log('Login successful from localStorage:', loginInfoAdmin);
      }
    }

    try {
      const response = await fetch(API_ENDPOINT.ADMIN_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Selamat datang kembali',
        }).then(() => {
          const loginInfoAdmin = {
            _id: data.userId,
            token: data.token,
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 3), // Dalam satuan menit
          };
          localStorage.setItem('loginInfoAdmin', JSON.stringify(loginInfoAdmin));
          setTimeout(() => {
            const currentPath = window.location.pathname;
            window.location.href = `${window.location.origin}${currentPath}#/admin`;
          }, 1000);
        });
      } else {
        console.error('Login failed:', data);

        let errorMessage = 'Email atau kata sandi salah. Silakan coba lagi.';
        if (data.status === 'failed') {
          if (data.message === 'Email not found') {
            errorMessage = 'Email tidak ditemukan. Silakan daftar akun baru.';
          } else if (data.message === 'Password is wrong') {
            errorMessage = 'Kata sandi salah. Silakan coba lagi.';
          }
        }

        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          text: errorMessage,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  },
};

export default LoginAdmin;
