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

                <label class="block mt-6 ml-40">
                    <span class="block text-lg font-bold text-butungu">Password</span>
                    <input type="password" id="password" class="text-sm bg-gray-200 w-3/4 px-5 py-4 text-slate-950" placeholder="Password" style="border-radius: 20px;" />
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
  },

};

export default RegisAdmin;
