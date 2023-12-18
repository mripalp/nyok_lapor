import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import API_ENDPOINT from '../../global/api-endpoints';
import NyokLaporAPIs from '../../data/data-source';

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
          <form id="reportForm" class="p-4 lg:p-8 flex flex-col items-center">
            <input type="text" placeholder="Judul Laporan * " id="judul" name="judul" class="text-black my-7 text-lg h-[74px] font-normal font-Poppins border drop-shadow-sm shadow-slate-300 placeholder-slate-400 focus:outline-none focus:border-butungu focus:ring-butungu border-gray-400 border-spacing-1 sm:text-sm focus:ring-1 px-2 py-1 w-full lg:max-w-[800px] mb-2">
            
            <input type="text" placeholder="Rincian Laporan * " id="deskripsi" name="deskripsi" class="text-black my-7 text-lg h-[222px] font-normal font-Poppins border drop-shadow-sm shadow-slate-300 placeholder-slate-400 focus:outline-none focus:border-butungu focus:ring-butungu border-gray-400 border-spacing-1 focus:ring-1 px-2 py-1 w-full lg:max-w-[800px] mb-2">
            
            <input type="date" placeholder="Tanggal Kejadian * " id="tanggalkejadian" name="tanggalkejadian" class="text-black my-7 text-lg h-[74px] font-normal font-Poppins border drop-shadow-sm shadow-slate-300 placeholder-slate-400 focus:outline-none focus:border-butungu focus:ring-butungu border-gray-400 border-spacing-1 focus:ring-1 px-2 py-1 w-full lg:max-w-[800px] mb-2">
            
            <button id="lokasi_kejadian" class="text-black my-7 text-lg h-[74px] font-normal font-Poppins border drop-shadow-sm shadow-slate-300 placeholder-slate-400 focus:outline-none focus:border-butungu focus:ring-butungu border- focus:ring-1 px-2 py-1 w-full lg:max-w-[800px] mb-2 transition duration-300 ease-in-out hover:bg-gray-200 hover:border-gray-400" type="button">
            Tampilkan Lokasi (Latitude & Longitude) *
          </button>
                     
            <input type="file" id="image" class="text-black my-7 text-2xl h-[74px] font-normal font-Poppins border drop-shadow-sm shadow-slate-300 placeholder-slate-400 focus:outline-none focus:border-butungu focus:ring-butungu border-gray-400 border-spacing-1 focus:ring-1 px-2 py-1 w-full lg:max-w-[800px] mb-2">
            <div class="text-black text-base font-normal font-['Poppins']">Upload Lampiran (Max 2 MB)</div>
            
            <button id="submitBtn" class="lg:w-96 h-16 px-36 pt-5 pb-4 hover:bg-sky-900 bg-butungu border-gray-400 border-spacing-1 shadow justify-start items-center inline-flex mt-7">
              <div class="text-center text-white text-xl font-bold font-['Poppins']" id="laporButton">NYOKLAPOR!</div>
            </button>
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

    const parsedLoginInfoUser = JSON.parse(loginInfoUser);
    const isTokenValid = await NyokLaporAPIs.isTokenValid(parsedLoginInfoUser.expiresIn);

    if (isTokenValid) {
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
      return;
    }

    const locationButton = document.getElementById('lokasi_kejadian');
    let latitude = null;
    let longititude = null;

    function showPosition(position) {
      latitude = position.coords.latitude;
      longititude = position.coords.longitude;

      const mapLink = `https://www.google.com/maps?q=${latitude},${longititude}`;
      const mapAnchor = document.createElement('a');
      mapAnchor.href = mapLink;
      mapAnchor.target = '_blank';
      mapAnchor.textContent = `Latitude: ${latitude}, Longitude: ${longititude} (View on Maps)`;

      locationButton.innerHTML = '';
      locationButton.appendChild(mapAnchor);
    }

    locationButton.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        locationButton.textContent = 'Geolocation is not supported by this browser.';
      }
    });

    const submitButton = document.getElementById('reportForm');
    submitButton.addEventListener('submit', async (evt) => {
      evt.preventDefault();

      const judul = document.getElementById('judul').value;
      const deskripsi = document.getElementById('deskripsi').value;
      const tanggalkejadian = document.getElementById('tanggalkejadian').value;
      const image = document.getElementById('image').files[0]; // Mengambil file yang diunggah

      if (!judul || !deskripsi || !tanggalkejadian || !image) {
        // eslint-disable-next-line no-alert
        alert('Semua kolom harus diisi dan file harus dipilih!');
      } else {
        const userData = new FormData(); // Membuat objek FormData

        userData.append('judul', judul);
        userData.append('deskripsi', deskripsi);
        userData.append('tanggalkejadian', tanggalkejadian);
        userData.append('longititude', longititude); // Pastikan nilai longititude sudah terisi
        userData.append('latitude', latitude); // Pastikan nilai latitude sudah terisi
        userData.append('image', image); // Menambahkan file ke FormData

        try {
          const { token } = parsedLoginInfoUser;
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await fetch(API_ENDPOINT.USER_REPORT, {
            method: 'POST',
            headers,
            body: userData, // Menggunakan objek FormData sebagai body request
          });

          if (response.ok) {
            // Penanganan jika pengiriman sukses
            Swal.fire({
              icon: 'success',
              title: 'Laporan Berhasil',
              text: 'Anda telah berhasil melaporkan!',
            }).then(() => {
              window.location.hash = '/laporan';
            });
          } else {
            // Penanganan jika terjadi kesalahan
            const responseData = await response.json();
            const errorMessage = responseData.message || response.statusText;

            console.error('Gagal melaporkan', errorMessage);
            Swal.fire({
              icon: 'error',
              title: 'Gagal Melaporkan',
              text: errorMessage,
            });
          }
        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Gagal Melaporkan',
            text: 'Terjadi kesalahan saat mengirim data.',
          });
        }
      }
    });
  },
};

export default Laporan;
