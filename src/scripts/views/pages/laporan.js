import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import NyokLaporAPI from '../../data/data-source';

const Laporan = {
  async render() {
    return `
    <section class="py-8 lg:py-12">
    <div class="container mx-auto my-auto">
      <div class="text-center mb-10">
        <h1 class="text-butungu text-opacity-90 mb-5 text-3xl lg:text-5xl font-bold font-Poppins">
          Suara Anda, Langkah Awal Perubahan
        </h1>
        <h1 class="text-butungu text-opacity-90 text-5xl lg:text-5xl font-bold font-Poppins uppercase">
          Laporkan, Dengarkan, Selesaikan!
        </h1>
      </div>
  
      <div class="flex justify-center">
        <div class=" lg:w-[1000px] relative bg-white rounded-[20px] shadow-lg shadow-slate-300 border">
          <!-- Konten atau isi yang ingin Anda masukkan ke dalam kotak ini -->
          <form class="p-4 lg:p-8 flex flex-col items-center">
            <input type="text" placeholder="Judul Laporan * " id="judul_laporan" name="judul_laporan" class="text-black my-7 text-lg h-[74px] font-normal font-Poppins border drop-shadow-sm shadow-slate-300 placeholder-slate-400 focus:outline-none focus:border-butungu focus:ring-butungu border-gray-400 border-spacing-1 sm:text-sm focus:ring-1 px-2 py-1 w-full lg:max-w-[800px] mb-2">
            
            <input type="text" placeholder="Rincian Laporan * " id="rincian_laporan" name="rincian_laporan" class="text-black my-7 text-lg h-[222px] font-normal font-Poppins border drop-shadow-sm shadow-slate-300 placeholder-slate-400 focus:outline-none focus:border-butungu focus:ring-butungu border-gray-400 border-spacing-1 focus:ring-1 px-2 py-1 w-full lg:max-w-[800px] mb-2">
            
            <input type="date" placeholder="Tanggal Kejadian * " id="tanggal_kejadian" name="tanggal_kejadian" class="text-black my-7 text-lg h-[74px] font-normal font-Poppins border drop-shadow-sm shadow-slate-300 placeholder-slate-400 focus:outline-none focus:border-butungu focus:ring-butungu border-gray-400 border-spacing-1 focus:ring-1 px-2 py-1 w-full lg:max-w-[800px] mb-2">
            
            <button id="lokasi_kejadian" class="text-black my-7 text-lg h-[74px] font-normal font-Poppins border drop-shadow-sm shadow-slate-300 placeholder-slate-400 focus:outline-none focus:border-butungu focus:ring-butungu border- focus:ring-1 px-2 py-1 w-full lg:max-w-[800px] mb-2 transition duration-300 ease-in-out hover:bg-gray-200 hover:border-gray-400" type="button">
            Tampilkan Lokasi (Latitude & Longitude) *
          </button>
                     
            <input type="file" class="text-black my-7 text-2xl h-[74px] font-normal font-Poppins border drop-shadow-sm shadow-slate-300 placeholder-slate-400 focus:outline-none focus:border-butungu focus:ring-butungu border-gray-400 border-spacing-1 focus:ring-1 px-2 py-1 w-full lg:max-w-[800px] mb-2">
            <div class="text-black text-base font-normal font-['Poppins']">Upload Lampiran (Max 2 MB)</div>
            
            <button id="submitBtn" class="lg:w-96 h-16 px-36 pt-5 pb-4 hover:bg-sky-900 bg-butungu border-gray-400 border-spacing-1 shadow justify-start items-center inline-flex mt-7">
              <div class="text-center text-white text-xl font-bold font-['Poppins']" id="laporButton">NYOKLAPOR!</div>
            </button>
            <div id="confirmationPopup" class="w-96 h-60 relative bg-gray-800" style="display: none;">
              <div class="left-[118px] top-[61px] absolute text-stone-300 text-xl font-bold font-['Poppins']">Apakah kamu yakin ?</div>
              <div class="w-96 h-px left-0 top-[132px] absolute border-2 border-black border-opacity-90"></div>
              <div class="px-5 pt-1.5 pb-2 left-[138px] top-[160px] absolute bg-butungu bg-opacity-90 rounded-lg justify-center items-center inline-flex">
                <div class="text-stone-300 text-base font-bold font-['Poppins']">TIDAK</div>
              </div>
              <div class="w-20 px-7 pt-1.5 pb-2 left-[227px] top-[160px] absolute bg-white rounded-lg justify-center items-center inline-flex">
                <div class="text-butbg-butungu text-opacity-90 text-base font-bold font-['Poppins']">IYA</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
    `;
  },

  async afterRender() {
    const loginInfoUser = localStorage.getItem('loginInfoUser');

    if (!loginInfoUser || loginInfoUser === 'undefined') {
      // Pengguna belum login
      Swal.fire({
        icon: 'info',
        title: 'Anda belum login',
        text: 'Mohon login untuk mengakses halaman User ini.',
        showCancelButton: true,
        confirmButtonText: 'Log In',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('loginInfoUser');
          window.location.href = '?#/loginuser';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.removeItem('loginInfoUser');
          window.location.href = '#/home';
        }
      });

      return;
    }

    // Parse data loginInfoUser dari local storage
    const parsedLoginInfoUser = JSON.parse(loginInfoUser);

    // Pengecekan token kadaluwarsa
    const isTokenValid = await NyokLaporAPI.isTokenValid(parsedLoginInfoUser.expiresIn);

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
          localStorage.removeItem('loginInfoUser');
          window.location.href = '?#/loginuser';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.removeItem('loginInfoUser');
          window.location.href = '#/home';
        }
      });

      // eslint-disable-next-line no-useless-return
      return;
    }

    const locationButton = document.getElementById('lokasi_kejadian');

    locationButton.addEventListener('click', () => {
      if (navigator.geolocation) {
        // eslint-disable-next-line no-use-before-define
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        locationButton.textContent = 'Geolocation is not supported by this browser.';
      }
    });

    function showPosition(position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const mapAnchor = document.createElement('a');
      mapAnchor.href = mapLink;
      mapAnchor.target = '_blank';
      mapAnchor.textContent = `Latitude: ${latitude}, Longitude: ${longitude} (Lihat di Maps)`;

      locationButton.innerHTML = '';
      locationButton.appendChild(mapAnchor);

      // Lakukan apa pun dengan nilai latitude dan longitude yang Anda dapatkan di sini
    }
  },
};

export default Laporan;
