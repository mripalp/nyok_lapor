import { createAccountTemplate, createSidebarTemplate } from '../../templates/template-creator';

// let lastView = 'dashboard';

const AccountPage = {
  // updateHorizontalBarChart(laporanPerBulan) {
  //   const ctx = document.getElementById('horizontalBarChart').getContext('2d');
  //   const existingChart = Chart.getChart(ctx);
  //   if (existingChart) {
  //     existingChart.destroy();
  //   }

  //   // eslint-disable-next-line no-unused-vars
  //   const myChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: laporanPerBulan.map((item) => item.bulan),
  //       datasets: [{
  //         label: 'Total Laporan',
  //         data: laporanPerBulan.map((item) => item.jumlah),
  //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //         borderColor: 'rgba(75, 192, 192, 1)',
  //         borderWidth: 1,
  //       }],
  //     },
  //     options: {
  //       maintainAspectRatio: true, // Menonaktifkan aspek rasio
  //       scales: {
  //         x: {
  //           beginAtZero: true,
  //         },
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // },

  // updateChart(chartData) {
  // // Hancurkan grafik sebelumnya jika sudah ada
  //   const existingChart = Chart.getChart('waveChart');
  //   if (existingChart) {
  //     existingChart.destroy();
  //   }

  //   const ctx = document.getElementById('waveChart').getContext('2d');
  //   // eslint-disable-next-line no-unused-vars
  //   const myChart = new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: chartData.labels,
  //       datasets: [{
  //         label: 'Total Pengguna',
  //         borderColor: 'rgba(75, 192, 192, 1)',
  //         backgroundColor: 'rgba(75, 192, 192, 0.2)',
  //         data: chartData.values,
  //       }],
  //     },
  //     options: {
  //       maintainAspectRatio: true, // Menonaktifkan aspek rasio
  //       scales: {
  //         x: {
  //           type: 'category',
  //           labels: chartData.labels,
  //         },
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //       plugins: {
  //         legend: {
  //           display: true,
  //           position: 'top',
  //         },
  //       },
  //     },
  //   });
  // },

  // loadDashboardData() {
  // // Contoh penggunaan fetch untuk mendapatkan data dari API
  // // Misalnya, menggunakan data statis untuk daftar bulan dan total laporan
  //   const laporanPerBulan = [
  //     { bulan: 'Januari', jumlah: 20 },
  //     { bulan: 'Februari', jumlah: 35 },
  //     { bulan: 'Maret', jumlah: 15 },
  //   // ... tambahkan bulan dan total laporan lainnya
  //   ];

  //   // Contoh data untuk grafik total pengguna
  //   const chartData = {
  //     labels: ['Januari', 'Februari', 'Maret'],
  //     values: [50, 75, 30],
  //   };

  //   // Memperbarui konten di Card 1 dan Card 2 sesuai dengan respons API
  //   document.getElementById('jumlahLaporan').textContent =
  // '100'; // Isi dengan data sesuai kebutuhan
  //   document.getElementById('rataLaporan').textContent =
  // '25'; // Isi dengan data sesuai kebutuhan

  //   // Memperbarui chart di Card 3 sesuai dengan respons API
  //   this.updateHorizontalBarChart(laporanPerBulan);

  //   // Memperbarui konten di Card 4 (grafik) sesuai dengan respons API
  //   this.updateChart(chartData);
  // },

  changeView(view) {
    // document.getElementById('dashboardView').style.display = 'none';
    // document.getElementById('akunView').style.display = 'none';
    // document.getElementById('totalLaporanView').style.display = 'none';

    document.querySelectorAll('#sidebar button').forEach((btn) => {
      btn.classList.remove('active');
    });

    const button = document.querySelector(`#sidebar button[data-view="${view}"]`);
    if (button) {
      button.classList.add('active');
    }

    // if (view === 'dashboard') {
    //   this.loadDashboardData();
    // } else if (view === 'akun') {
    // // Load data untuk tampilan Akun jika diperlukan
    // } else if (view === 'totalLaporan') {
    // // Load data untuk tampilan Total Laporan jika diperlukan
    // }

    // const selectedView = document.getElementById(`${view}View`);
    // if (selectedView) {
    //   selectedView.style.display = view === 'dashboard' ? 'grid' : 'flex';
    // }

    // if (lastView !== view) {
    //   window.scrollTo(0, 0);
    // }

    // lastView = view;
  },

  async render() {
    return `
  <section>
    <div id="admin-container" class=" bg-gray-200 font-sans flex flex-col lg:flex-row lg:h-full">
        <div id="sidebar" class="hidden lg:flex flex-col bg-white text-white p-4">
        </div>

        <div id="content" class="lg:w-3/4 w-full p-8">
            <!-- Navbar -->
            <div class="flex justify-between items-center flex-col lg:flex-row mb-8">
                <!-- Pindahkan kotak pencarian ke sini -->
                <input type="text" class="p-2 border rounded-md mr-4 lg:w-1/2 w-full" placeholder="Cari...">

                <div class="flex items-center">
                    <button class="bg-white text-black font-bold p-2 rounded-md hover:bg-blue-900">Keluar</button>
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
    const AccountPageContainer = document.querySelector('#akunView');
    const SidebarContainer = document.querySelector('#sidebar');
    SidebarContainer.innerHTML = createSidebarTemplate();
    AccountPageContainer.innerHTML = createAccountTemplate();

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
      // Admin.afterRender();
      // Admin.loadDashboardData();
    });
    totalLaporanButton.addEventListener('click', () => {
      buttonTotalLaporan.classList.add('active');
      buttonAccount.classList.remove('active');
      buttonDashboard.classList.remove('active');
    });
  },
};

export default AccountPage;
