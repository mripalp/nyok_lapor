import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import API_ENDPOINT from '../../global/api-endpoints';

const RegisAdmin = {

  async render() {
    return `
    <section>
    <div class="grid justify-items-center font-bold text-[#C2C2C2] over">
        <div class="bg-white rounded-lg shadow-2xl shadow-gray-500 mb-11" style="width: 642px; height: 900px; border-radius: 20px;">    
            <div class="grid justify-items-center mt-16">
                <img src="./assets/icons/nyoklapor-icon.png" style="width:183px; height:102px;">
                <p class="mt-9 text-butungu text-5xl uppercase">Register Admin</p>
            </div>
            <form id="register-form">
                <label class="block mt-6 ml-40">
                    <span class="block text-lg font-bold text-butungu">Email</span>
                    <input type="email" id="email" class="text-sm bg-gray-200 w-3/4 px-5 py-4 text-slate-950" placeholder="Email" style="border-radius: 20px;" />
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

                <!-- Input untuk fullName -->
                <label class="block mt-6 ml-40">
                    <span class="block text-lg font-bold text-butungu">Full Name</span>
                    <input type="text" id="fullName" class="text-sm bg-gray-200 w-3/4 px-5 py-4 text-slate-950"
                        placeholder="Full Name" style="border-radius: 20px;"/>
                </label>

                <!-- Input untuk phoneNumber -->
                <label class="block mt-6 ml-40">
                    <span class="block text-lg font-bold text-butungu">Phone Number</span>
                    <input type="text" id="phoneNumber" class="text-sm bg-gray-200 w-3/4 px-5 py-4 text-slate-950"
                        placeholder="Phone Number" style="border-radius: 20px;" />
                </label>

                <div class="mt-11 ml-40 relative " >
                    <button id="login-btn" class="bg-butungu hover:bg-opacity-90 active:bg-[#111827] focus:outline-none focus:ring focus:ring-black-300 ... text-white pb-5 pt-5 font-bold text-xl" style="border-radius: 14px; width: 345px; box-shadow: 0px 14px 10px 0px rgba(0, 0, 0, 0.25); transition: background-color 0.2s ">Daftar</button>
                </div>
                <div class="mt-5 ml-40 flex items-center text-butungu font-normal">
                    <p>Sudah punya akun? <span class="text-sky-500 font-bold"><a href="#/loginadmin">Login disini</a></span></p>
                </div>
            </form>
        </div>
    </div>
</section>
    `;
  },

  // eslint-disable-next-line no-empty-function
  async afterRender() {
    const registerForm = document.getElementById('register-form');
    const footerHidden = document.querySelector('footer');
    footerHidden.classList.add('hidden');
    const eyeIconPassword = document.getElementById('eyeIcon');
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value;
      const phoneNumber = document.getElementById('phoneNumber').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const userData = {
        fullName,
        phoneNumber,
        email,
        password,
        role: 'user',
      };

      try {
        const response = await fetch(API_ENDPOINT.ADMIN_REGISTER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          // Menampilkan SweetAlert ketika pendaftaran berhasil
          Swal.fire({
            icon: 'success',
            title: 'Pendaftaran Berhasil',
            text: 'Anda telah berhasil mendaftar!',
          }).then(() => {
            // Redirect ke halaman login jika pendaftaran berhasil
            window.location.hash = '?#/loginadmin';
          });
        } else {
          // Tampilkan pesan jika ada kesalahan saat pendaftaran
          console.error('Gagal mendaftar');
          // Tambahkan logika lainnya jika diperlukan
        }
      } catch (error) {
        console.error('Error:', error);
        // Tindakan yang sesuai jika terjadi kesalahan jaringan atau lainnya
      }
    });
    eyeIconPassword.addEventListener('click', this.togglePasswordVisibility);
  },
  async togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordInput.type === 'text') {
      passwordInput.type = 'password';
      eyeIcon.src = './assets/icons/icon-eye.png';
    } else {
      passwordInput.type = 'text';
      eyeIcon.src = './assets/icons/eye look.png';
    }
  },

};

export default RegisAdmin;
