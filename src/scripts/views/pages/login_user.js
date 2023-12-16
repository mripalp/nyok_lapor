import Swal from 'sweetalert2/dist/sweetalert2.all.min';
// eslint-disable-next-line import/no-unresolved, import/extensions
import API_ENDPOINT from '../../global/api-endpoints';

// eslint-disable-next-line no-unused-vars
const LoginUser = {

  async render() {
    return `
  <section>
    <div class="grid justify-items-center ... font-bold text-[#C2C2C2] over">
        <div class="bg-white rounded-lg shadow-2xl shadow-gray-500 mb-11" style="width: 642px; height: 700px; border-radius: 20px;">
            <div class="grid justify-items-center ... mt-16">
                <img src="./assets/icons/nyoklapor-icon.png" style="width:183px; height:102px;">
                <p class="mt-9 text-butungu font-bold text-5xl uppercase">Login</p>
            </div>
            <form id="login-form">
                <label class="block mt-5 ml-40">
                    <span class="block text-lg font-bold text-butungu">Email</span>
                    <input type="email" id="email" class="peer ... text-sm bg-gray-200 w-3/4 px-5 py-4 text-slate-950"
                        placeholder="Email" style="border-radius: 20px;" />
                    <p class="mt-2 invisible peer-invalid:visible text-[#B31312] text-sm">
                        Please provide a valid email address.
                    </p>
                </label>
                <label class="block mt-0.5 ml-40 relative">
                    <span class="block text-lg font-bold text-butungu">Password</span>
                    <div class="relative w-3/4 px-2 ">
                        <input type="password" id="password" class="text-sm bg-gray-200 pl-6 pr-14 pt-4 pb-4 text-slate-950" placeholder="Password" style="border-radius: 20px; width: 343px; text-decoration: none  !important;" id="password"/>
                        <div class="w-10 h-10 hover:bg-[#111827] active:bg-[#111827] focus:outline-none focus:ring focus:ring-black-300 ... absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center " style="border-radius: 5px;">
                            <img src="./assets/icons/icon-eye.png" id="eyeIcon" class="eye-icon" alt="Eye Icon">
                        </div>
                    </div>
                </label>

            

                <div class="mt-11 mx-44 relative">
                    <button id="login-btn" class="bg-butungu hover:bg-opacity-90 active:bg-[#111827] focus:outline-none focus:ring focus:ring-black-300 ... text-white px-5 py-5 font-bold text-xl" style="border-radius: 14px; width: 310px; box-shadow: 0px 14px 10px 0px rgba(0, 0, 0, 0.25); transition: background-color 0.2s ">Masuk</button>
                </div>
                <div class="mt-5 mx-44 flex justify-between text-butungu font-normal">
                    <p><span class="text-sky-500 font-bold"><a href="#/registeruser">Daftar sekarang</a></span></p>
                    <p class="text-right"><span class="text-sky-500 font-bold"><a href="#/loginadmin">Login Admin</a></span></p>
                </div>
            </form>
        </div>
    </div>
</section>
    `;
  },

  async afterRender() {
    const loginForm = document.getElementById('login-form');
    const eyeIconPassword = document.getElementById('eyeIcon');
    const loginBtn = document.getElementById('login-btn');
    const footerHidden = document.querySelector('footer');
    footerHidden.classList.add('hidden');

    loginForm.addEventListener('submit', this.handleLogin);
    loginForm.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.handleLogin(event);
      }
    });
    eyeIconPassword.addEventListener('click', this.togglePasswordVisibility);
    loginBtn.addEventListener('click', this.handleLogin);
  },

  async togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordInput.type === 'text') {
      passwordInput.type = 'password';
      eyeIcon.src = '../assets/icons/icon-eye.png';
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

    const storedLoginInfoUser = localStorage.getItem('loginInfoUser');

    if (storedLoginInfoUser) {
      const loginInfoUser = JSON.parse(storedLoginInfoUser);
      if (email === loginInfoUser.email && password === loginInfoUser.password) {
        console.log('Login successful from localStorage:', loginInfoUser);
      }
    }

    try {
      const response = await fetch(API_ENDPOINT.USER_LOGIN, {
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
          const loginInfoUser = {
            _id: data.userId,
            token: data.token,
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 3), // Dalam satuan menit
          };
          localStorage.setItem('loginInfoUser', JSON.stringify(loginInfoUser));
          setTimeout(() => {
            const currentPath = window.location.pathname;
            window.location.href = `${window.location.origin}${currentPath}#/home`;
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

export default LoginUser;
