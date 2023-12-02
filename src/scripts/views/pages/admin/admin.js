/* eslint-disable no-unused-vars */
import Chart from 'chart.js/auto';
import { createAdminTemplate, createSidebarTemplate } from '../../templates/template-creator';

const Admin = {
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
            <div id="dashboardView">
                
            </div>
        </div>
    </div>
</section>
    `;
  },

  async afterRender() {
    const AdminContainer = document.querySelector('#dashboardView');
    const SidebarContainer = document.querySelector('#sidebar');
    SidebarContainer.innerHTML = createSidebarTemplate();
    AdminContainer.innerHTML = createAdminTemplate();

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
    document.getElementById('jumlahLaporan').textContent = '125';
    document.getElementById('rataLaporan').textContent = '225';

    const laporanPerBulan = [
      { bulan: 'Januari', jumlah: 20 },
      { bulan: 'Februari', jumlah: 35 },
      { bulan: 'Maret', jumlah: 15 },
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
          data: laporanPerBulan.map((item) => item.jumlah),
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
};

export default Admin;
