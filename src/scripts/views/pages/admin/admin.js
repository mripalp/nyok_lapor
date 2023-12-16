/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import Chart from 'chart.js/auto';
import { createAdminTemplate, createSidebarTemplate } from '../../templates/template-creator';
import NyokLaporAPI from '../../../data/data-source';

const Admin = {
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
            <div id="dashboardView">
                
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
          window.location.replace(`${window.location.origin}/?#/loginadmin`);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.removeItem('loginInfoAdmin');
          window.location.replace(`${window.location.origin}/?#/loginadmin`);
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
          window.location.replace(`${window.location.origin}/?#/loginadmin`);
          window.location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.removeItem('loginInfoAdmin');
          window.location.replace(`${window.location.origin}/?#/loginadmin`);
          window.location.reload();
        }
      });

      return;
    }

    await NyokLaporAPI.updateActivityAndTokenInfo('Admin', 10);

    const AdminContainer = document.querySelector('#dashboardView');
    const SidebarContainer = document.querySelector('#sidebar');
    const ProfileAdmin = await NyokLaporAPI.getAdminProfile();
    const SummaryAdmin = await NyokLaporAPI.getAdminSummary();
    SidebarContainer.innerHTML = createSidebarTemplate(ProfileAdmin);
    AdminContainer.innerHTML = createAdminTemplate();

    const navbarHidden = document.querySelector('nav');
    navbarHidden.classList.add('hidden');
    const footerHidden = document.querySelector('footer');
    footerHidden.classList.add('hidden');
    // const logoutButton = document.getElementById('logout-button');
    const isAuthenticated = localStorage.getItem('loginInfoAdmin') !== null;
    if (isAuthenticated) {
      // Jika pengguna sudah login, tambahkan event listener untuk tombol logout
      const logoutButton = document.getElementById('logout-button');
      if (logoutButton) {
        logoutButton.addEventListener('click', this.handleLogout.bind(this));
      }
    }
    const accountButton = document.getElementById('account-button');
    const totalLaporanButton = document.getElementById('total-laporan-button');
    const buttonAccount = document.querySelector('#sidebar button[data-view="akun"]');
    const buttonDashboard = document.querySelector('#sidebar button[data-view="dashboard"]');
    const buttonTotalLaporan = document.querySelector('#sidebar button[data-view="totalLaporan"]');
    buttonDashboard.classList.add('active');

    accountButton.addEventListener('click', () => {
      buttonAccount.classList.add('active');
      buttonDashboard.classList.remove('active');
      buttonTotalLaporan.classList.remove('active');
    });
    totalLaporanButton.addEventListener('click', () => {
      buttonTotalLaporan.classList.add('active');
      buttonAccount.classList.remove('active');
      buttonDashboard.classList.remove('active');
    });

    // jumlahLaporan & rata-rata laporan;
    document.getElementById('jumlahLaporan').textContent = SummaryAdmin.reportsPerDay;
    document.getElementById('rataLaporan').textContent = Math.round(SummaryAdmin.averageSuccessfulReports);

    const laporanPerBulan = [
      { bulan: 'Januari' },
      { bulan: 'Februari' },
      { bulan: 'Maret' },
      { bulan: 'April' },
      { bulan: 'Mei' },
      { bulan: 'Juni' },
      { bulan: 'Juli' },
      { bulan: 'Agustus' },
      { bulan: 'September' },
    ];

    // Contoh data untuk grafik total pengguna
    const chartData = {
      labels: ['Januari', 'Februari', 'Maret'],
      values: [50, 75, 30],
    };

    // Grafik Total Laporan per Bulan (Tahun Ini)
    const ctx = await document.getElementById('horizontalBarChart').getContext('2d');
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: laporanPerBulan.map((item) => item.bulan),
        datasets: [{
          label: 'Total Laporan',
          data: [SummaryAdmin.totalReportsThisMonth],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        maintainAspectRatio: true, // Menonaktifkan aspek rasio
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Grafik Total Pengguna per Bulan
    const ctxLine = document.getElementById('waveChart').getContext('2d');
    const existingChartLine = Chart.getChart('waveChart');
    if (existingChartLine) {
      existingChartLine.destroy();
    }

    const myChartLine = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Total Pengguna',
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          data: chartData.values,
        }],
      },
      options: {
        maintainAspectRatio: true,
        scales: {
          x: {
            type: 'category',
            labels: chartData.labels,
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
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

export default Admin;
