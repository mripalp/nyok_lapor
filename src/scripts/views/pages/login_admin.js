import Swal from 'sweetalert2/dist/sweetalert2.all.min';
// eslint-disable-next-line import/no-unresolved, import/extensions
import API_ENDPOINT from '../../global/api-endpoints';

const LoginAdmin = {

  async render() {
    return `
  <section>
    <div class="grid justify-items-center ... font-bold text-[#C2C2C2] over">
        <div class="bg-white rounded-lg shadow-2xl shadow-gray-500 mb-11" style="width: 642px; height: 700px; border-radius: 20px;">
            <div class="grid justify-items-center ... mt-16">
                <img src="./assets/icons/nyoklapor-icon.png" style="width:183px; height:102px;">
                <p class="mt-9 text-butungu font-bold text-5xl uppercase">Login Admin</p>
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

                <label class="block mt-0.5 ml-40">
                    <span class="block text-lg font-bold text-butungu">Password</span>
                    <input type="password" id="password" class="text-sm bg-gray-200 w-3/4 px-5 py-4 text-slate-950" placeholder="Password" style="border-radius: 20px; text-decoration:none !important;" id="password"/>
                </label>

                <div class="mt-11 ml-48 relative">
                    <button id="login-btn" class="bg-butungu hover:bg-opacity-90 active:bg-[#111827] focus:outline-none focus:ring focus:ring-black-300 ... text-white px-5 py-5 font-bold text-xl" style="border-radius: 14px; width: 300px; box-shadow: 0px 14px 10px 0px rgba(0, 0, 0, 0.25); transition: background-color 0.2s ">Masuk</button>
                </div>
                <div class="mt-11 ml-40 flex items-center text-butungu font-normal">
                    <p>Belum punya akun? <span class="text-sky-500 font-bold"><a href="#/regisadmin">Yuk, daftar sekarang</a></span></p>
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

    loginForm.addEventListener('submit', this.handleLogin);
    loginForm.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.handleLogin(event);
      }
    });
    loginBtn.addEventListener('click', this.handleLogin);
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
