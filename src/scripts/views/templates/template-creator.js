const createSidebarTemplate = () => `
            <img src="./assets/icons/nyoklapor-icon.png" alt="Logo" class="ml-10 mb-6 w-20 h-10">

<img src="./assets/images/Ripal.jpg" alt="Admin" class="ml-10 mb-4 w-16 h-16 rounded-full">
<p class="text-sm text-black mb-4 ml-14 uppercase font-black">ripal</p>
<ul>
    <li class="mb-2">
        <button id="dashboard-button" class="flex items-center text-white rounded-full" data-view="dashboard">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7">
                </path>
            </svg>
            <a href="#/admin" id="home" class="flex items-center text-black rounded-full">Dashboard</a>
        </button>
    </li>
    <li class="mb-2">
        <button id="account-button" class="flex items-center text-white rounded-full" data-view="akun">
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <a href="#/account" id="home" class="flex items-center text-black rounded-full min-h-max">Akun</a>
        </button>
    </li>
    <li class="mb-2">
        <button id="total-laporan-button" class="flex items-center text-white rounded-full" data-view="totalLaporan">
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                <path
                    d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
            </svg>
            <a href="#/report" id="home" class="flex items-center text-black rounded-full">Total Laporan</a>
        </button>
    </li>
</ul>
`;

const createAdminTemplate = () => `
        <!-- Card 1: Jumlah Laporan per Hari -->
        <div id="card1" class="bg-gray-800 text-white p-4 rounded-md shadow-md dashboard-card">
            <h2 class="text-xl font-semibold mb-4">Jumlah Laporan per Hari</h2>
            <p class="text-4xl font-bold" id="jumlahLaporan">Loading...</p>
        </div>

        <!-- Card 2: Rata-rata Laporan Berhasil -->
        <div id="card2" class="bg-blue-900 p-4 text-white rounded-md shadow-md dashboard-card">
            <h2 class="text-xl font-semibold mb-4">Rata-rata Laporan Berhasil</h2>
            <p class="text-4xl font-bold" id="rataLaporan">Loading...</p>
        </div>

        <!-- Card 3: Tabel Total Laporan per Bulan -->
                <div id="card3" class="bg-white p-4 rounded-md shadow-md dashboard-card">
                    <h2 class="text-xl font-semibold mb-4">Total Laporan per Bulan (Tahun Ini)</h2>
                    <div style="max-height: 300px; overflow-y: auto;">
                        <!-- Dummy Horizontal Bar Chart Goes Here -->
                        <canvas id="horizontalBarChart"></canvas>
                    </div>
                </div>

                <!-- Card 4: Bagan Ombak Total Pengguna per Bulan -->
                <div id="card4" class="bg-white p-4 rounded-md shadow-md dashboard-card">
                    <h2 class="text-xl font-semibold mb-4">Total Pengguna per Bulan</h2>
                    <!-- Chart Goes Here -->
                    <canvas id="waveChart" style="height: 150px;"></canvas>
                </div>
`;

const createAccountTemplate = () => `
    <!-- Tampilan Akun -->
        <h2 class="text-xl font-semibold mb-4">Daftar User</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 border">
                <!-- Tambahkan kelas "border" pada tabel untuk menambahkan batas keseluruhan -->
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border">
                            Profil
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border">
                            Nomor Laporan
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 text-center">
                    <!-- Contoh baris data (gantilah dengan data sebenarnya) -->
                    <!-- Tambahkan baris data lainnya sesuai kebutuhan -->
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap border">1</td>
                        <td class="px-6 py-4 whitespace-nowrap border w-8"><img src="./assets/images/TONNY .jpg"
                                alt="foto tonny">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap border">S621YB444@dicoding.org</td>
                        <td class="px-6 py-4 whitespace-nowrap border">11</td>
                        <td class="px-6 py-4 whitespace-nowrap border">
                            <button class="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Setuju</button>
                            <button class="bg-red-500 text-white px-4 py-2 rounded-md">Tolak</button>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap border">2</td>
                        <td class="px-6 py-4 whitespace-nowrap border w-8"><img src="./assets/images/hazron.png"
                                alt="foto hazron">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap border">F226YB373@dicoding.org</td>
                        <td class="px-6 py-4 whitespace-nowrap border">12</td>
                        <td class="px-6 py-4 whitespace-nowrap border">
                            <button class="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Setuju</button>
                            <button class="bg-red-500 text-white px-4 py-2 rounded-md">Tolak</button>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap border">3</td>
                        <td class="px-6 py-4 whitespace-nowrap border w-8"><img src="./assets/images/Yova.jpg" alt="foto Yova">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap border">F226YB208@dicoding.org</td>
                        <td class="px-6 py-4 whitespace-nowrap border">13</td>
                        <td class="px-6 py-4 whitespace-nowrap border">
                            <button class="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Setuju</button>
                            <button class="bg-red-500 text-white px-4 py-2 rounded-md">Tolak</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
`;

const createTotalReportTemplate = () => `
    <!-- Tampilan Total Laporan -->
        <h2 class="text-xl font-semibold mb-4">Total Laporan</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 border">
                <!-- Tambahkan kelas "border" pada tabel untuk menambahkan batas keseluruhan -->
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border">
                            Lampiran
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border">
                            Judul Lampiran
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border">
                            Rincian Laporan
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border">
                            Tanggal Lokasi
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 text-center">
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap border">1</td>
                        <td class="px-2 py-2 whitespace-nowrap border w-8"><img src="./tawuran.webp" alt="tawuran"></td>
                        <td class="px-6 py-4 whitespace-nowrap border">Judul Laporan 1</td>
                        <td class="px-6 py-4 whitespace-nowrap border">Judul Laporan 1</td>
                        <td class="px-6 py-4 whitespace-nowrap border">2023-11-25</td>
                        <td class="px-6 py-4 whitespace-nowrap border">Diproses</td>
                    </tr>
                </tbody>
            </table>
        </div>
`;

export {
  createSidebarTemplate,
  createAdminTemplate,
  createAccountTemplate,
  createTotalReportTemplate,
};
