import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import { createAccountTemplate, createSidebarTemplate } from '../../templates/template-creator';
import NyokLaporAPI from '../../../data/data-source';

const AccountPage = {

  async render() {
    return `
  <section>
    <div id="admin-container" class=" bg-gray-200 font-sans flex flex-col lg:flex-row lg:h-full">
        <div id="sidebar" class="sm:hidden lg:flex flex-col bg-white text-white p-4">
        </div>

        <div id="content" class="lg:w-3/4 w-full p-8">
            <!-- Navbar -->
            <div class="flex justify-between items-center flex-col lg:flex-row mb-8">
                <!-- Pindahkan kotak pencarian ke sini -->
                <input type="text" class="p-2 border rounded-md mr-4 lg:w-1/2 w-full" placeholder="Cari...">

                <div class="flex items-center">
                    <button id="logout-button"class="bg-white text-black font-bold p-2 rounded-md hover:bg-blue-900">Logout</button>
                </div>
            </div>

            <!-- Tampilan Dashboard -->
            <div id="akunView">
            </div>
        </div>
    </div>
</section>
    `;
  },

  async afterRender() {
    const loginInfoAdmin = localStorage.getItem('loginInfoAdmin');

    if (!loginInfoAdmin || loginInfoAdmin === 'undefined') {
      // Pengguna belum login
      Swal.fire({
        icon: 'info',
        title: 'Anda belum login',
        text: 'Mohon login untuk mengakses halaman admin ini.',
        showCancelButton: true,
        confirmButtonText: 'Log In',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('loginInfoAdmin');
          window.location.hash = '#/login';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.removeItem('loginInfoAdmin');
          window.location.hash = '#/home';
        }
      });

      return;
    }

    // Parse data loginInfoAdmin dari local storage
    const parsedLoginInfoAdmin = JSON.parse(loginInfoAdmin);

    // Pengecekan token kadaluwarsa
    const isTokenValid = await NyokLaporAPI.isTokenValid(parsedLoginInfoAdmin.expiresIn);

    if (isTokenValid) {
      // Token sudah kadaluwarsa
      Swal.fire({
        icon: 'info',
        title: 'Token Kadaluwarsa',
        text: 'Token Anda telah kadaluwarsa. Mohon login kembali.',
        showCancelButton: true,
        confirmButtonText: 'Log In',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('loginInfoAdmin');
          window.location.hash = '#/login';
          window.location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.removeItem('loginInfoAdmin');
          window.location.hash = '#/home';
          window.location.reload();
        }
      });

      return;
    }

    await NyokLaporAPI.updateActivityAndTokenInfo('Admin', 10);

    const AccountPageContainer = document.querySelector('#akunView');
    const SidebarContainer = document.querySelector('#sidebar');
    const ProfileAdmin = await NyokLaporAPI.getAdminProfile();
    SidebarContainer.innerHTML = createSidebarTemplate(ProfileAdmin);
    AccountPageContainer.innerHTML = createAccountTemplate();

    const isAuthenticated = localStorage.getItem('loginInfoAdmin') !== null;
    if (isAuthenticated) {
      // Jika pengguna sudah login, tambahkan event listener untuk tombol logout
      const logoutButton = document.getElementById('logout-button');
      if (logoutButton) {
        logoutButton.addEventListener('click', this.handleLogout.bind(this));
      }
    }

    const navbarHidden = document.querySelector('nav');
    navbarHidden.classList.add('hidden');
    const dashboardButton = document.getElementById('dashboard-button');
    const totalLaporanButton = document.getElementById('total-laporan-button');
    const buttonAccount = document.querySelector('#sidebar button[data-view="akun"]');
    const buttonDashboard = document.querySelector('#sidebar button[data-view="dashboard"]');
    const buttonTotalLaporan = document.querySelector('#sidebar button[data-view="totalLaporan"]');
    buttonAccount.classList.add('active');
    dashboardButton.addEventListener('click', () => {
      buttonDashboard.classList.add('active');
      buttonAccount.classList.remove('active');
      buttonTotalLaporan.classList.remove('active');
    });
    totalLaporanButton.addEventListener('click', () => {
      buttonTotalLaporan.classList.add('active');
      buttonAccount.classList.remove('active');
      buttonDashboard.classList.remove('active');
    });
  },

  async handleLogout() {
    // Hapus informasi login dari localStorage
    localStorage.removeItem('loginInfoAdmin');

    // Redirect ke halaman login setelah logout
    window.location.hash = '/home';
    window.location.reload();
  },
};

export default AccountPage;
