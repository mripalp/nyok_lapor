import { createAccountTemplate, createSidebarTemplate } from '../../templates/template-creator';

const AccountPage = {

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
    });
    totalLaporanButton.addEventListener('click', () => {
      buttonTotalLaporan.classList.add('active');
      buttonAccount.classList.remove('active');
      buttonDashboard.classList.remove('active');
    });
  },
};

export default AccountPage;
