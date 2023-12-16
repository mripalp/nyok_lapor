const Home = {
  async render() {
    return `
    <section class="sm:p-4 md:p-6 lg:p-8">
    <div class="container mx-auto">
        <div class="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <div class="col-span-12 lg:col-span-6">
                <div class="p-4 sm:p-6 md:p-8 lg:p-10 items-center justify-center my-auto  "data-aos="fade-right">
                    <img src="./assets/homepage/komponen 1.png" alt="hero image nyok-lapor" class="w-[700px] h-[600px] sm:w-full  sm:h-auto md:w-full md:h-auto lg:w-full" alt="Komponen 1" >
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 items-start text-left">
                <div class="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center items-center text-left" >
                <button class="left-0 h-auto bg-butungu text-white text-[45px] font-bold shadow-md transform transition-all hover:scale-105 hover:shadow-2xl px-2 py-2 rounded-2xl sm:w-3/4 sm:text-center md:text-center lg:text-left" data-aos="zoom-in">
                 NyokLapor!?
                </button>
                    <div class="mt-4 text-center lg:text-left">
                        <h1 class="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[45px] text-butungu text-opacity-80 font-extrabold">
                            Lapor Dengan Percaya
                            <span class="text-black text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] block sm:inline">Membangun Keamanan Bersama.</span>
                        </h1>
                        <h1 class="mt-4 text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] font-normal text-black rounded-lg" style="margin-top:-18px" >
                            NyokLapor sebuah solusi inovatif untuk mengatasi
                            <span class="bg-butungu bg-opacity-70 text-white font-extrabold text-[25px] sm:text-[30px] md:text-[35px]">masalah pelaporan kejadian di sekitar kita.</span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



<section class="py-8 lg:py-12 bg-section2">
    <div class="container mx-auto">
        <!-- Baris Pertama -->
        <div class="grid grid-cols-1 lg:grid-cols-3 ">
            <!-- Kolom 1 -->
            <div class="col-span-1 lg:col-span-3 p-4 lg:p-4 text-center mb-6" >
                <h2 class="text-[50px] lg:text-[50px] font-bold text-section1">Fitur Handal</h2>
                <p class="text-[24px] lg:text-[24px] text-white font-bold mt-3 lg:mt-4">
                    Melalui penggunaan website laporan, pengguna dapat dengan mudah melaporkan masalah atau kejadian, mengikuti perkembangan status laporan, dan berkontribusi pada perbaikan atau solusi, menciptakan proses pelaporan yang transparan dan responsif.
                </p>
            </div>
        </div>

        <!-- Baris Kedua -->
        <div class="grid grid-cols-1 lg:grid-cols-3  text-section1">
            <!-- Kolom Pertama -->
            <div class="col-span-1 lg:col-span-1 border-b-2 border-black lg:border-b-0 lg:border-r-2 sm:border-b flex flex-col items-center justify-center p-2 mx-5">
                <div class="p-4 lg:p-6 text-center"  data-aos="fade-right">
                    <h3 class="text-4xl lg:text-xl font-bold mt-10 " style="font-size:35px">Upload</h3>
                    <img src="./assets/homepage/folder.png" alt="Gambar upload" class="w-[256px] h-[240px] border-none mx-auto">
                    <div class="mt-2 text-center">
                        <p>Memungkinkan pengguna untuk memberikan bukti atau dokumentasi yang mendukung laporan mereka, menjadikan proses pengaduan lebih kuat, akurat, dan memberikan kejelasan yang diperlukan untuk tindakan responsif</p>
                    </div>
                </div>
            </div>
            <!-- Kolom Kedua -->
            <div class="  col-span-1 lg:col-span-1 border-b-2 border-black lg:border-b-0 lg:border-r-2 sm:border-b flex flex-col items-center justify-center p-2 mx-5">
                <div class="p-4 lg:p-6 text-center" style="margin-top:-50px"data-aos="fade-right">
                    <h3 class="text-4xl lg:text-xl font-bold " style="font-size:35px">General Home</h3>
                    <img src="./assets/homepage/Pencarian.png" alt="Gambar Pencarian" class="w-[256px] h-[240px] border-none mx-auto" >
                    <div class="mt-2 text-center">
                        <p>Halaman on-boarding agar kamu mendapatkan informasi.</p>
                    </div>
                </div>
            </div>
            <!-- Kolom Ketiga -->
            <div class="col-span-1 lg:col-span-1 flex flex-col items-center justify-center p-2">
                <div class="p-4 lg:p-6 text-center" style="margin-top:-3px"  data-aos="fade-right">
                    <h3 class="text-4xl lg:text-xl font-bold " style="font-size:35px">Maps</h3>
                    <img src="./assets/homepage/maps.png" alt="Gambar maos" class="w-[256px] h-[240px] border-none mx-auto">
                    <div class="mt-2 text-center">
                        <p>Mempermudah pengguna dalam menunjukkan lokasi kejadian secara visual, memberikan informasi real-time untuk respons yang lebih cepat dan efektif.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-8 lg:py-12 bg-bghome">
    <div class="container mx-auto my-auto">
        <!-- Baris Pertama -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <!-- Kolom 1 -->
            <div class="col-span-1 lg:col-span-1 p-4 lg:p-4 flex flex-col justify-center items-center">
                <div class="flex flex-col justify-center items-center h-full">
                <div class="flex justify-center">
                <img src="./assets/homepage/komponen 2.png" alt="Slogan Nyok lapor" class="mx-auto w-[486px] h-[203px] sm:w-full md:w-full lg:w-full xl:w-[100%] transform translate-x-8">
            </div>            
                    <p class="text-lg lg:text-xl mt-4 text-center my-4">
                        Layanan terbaik kami untuk website pelaporan terpercaya, dan kompeten. Kami hadir untuk memberikan pengalaman
                        <span class="bg-merah text-white p-1 rounded">pelaporan yang mulus dan solusi yang cepat,</span>
                        menjadikan setiap masalah pelaporan Anda menjadi prioritas utama bagi kami.
                    </p>
                </div>
            </div>
            <!-- Kolom 2 -->
            <div class="col-span-1 lg:col-span-1 sm:flex p-4 lg:p-4 flex-col justify-center items-center">
            <div class="grid grid-cols-2 gap-8 justify-center mt-4">
                <div id="slide1" class="flex flex-col justify-center items-center" style="position: relative; top: -35px;">
                    <div class="transform translate-y-10 lg:-translate-y-28" data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="4000"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="true"
                        data-aos-once="false">
                        <img src="./assets/homepage/komen1.png" alt="Gambar komen1" class="w-full h-[243px]" style="max-width: 300px;">
                        <img src="./assets/homepage/komen2.png" alt="Gambar komen2" class="w-full h-[243px]" style="max-width: 300px;">
                        <img src="./assets/homepage/komen3.png" alt="Gambar komen3" class="w-full h-[243px]" style="max-width: 300px;">
                    </div>
                </div>
                <div id="slide2" class="flex flex-col justify-center items-center" style="position: relative; bottom: -35px;">
                    <div class="transform -translate-y-10 lg:translate-y-10" data-aos="fade-down"
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="4000"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="true"
                        data-aos-once="false">
                        <img src="./assets/homepage/komen4.png" alt="Gambar komen4" class="w-full h-[243px]" style="max-width: 300px;">
                        <img src="./assets/homepage/komen5.png" alt="Gambar komen5" class="w-full h-[243px]" style="max-width: 300px;">
                        <img src="./assets/homepage/komen6.png" alt="Gambar komen6" class="w-full h-[243px]" style="max-width: 300px;">
                    </div>
                </div>
            </div>
        </div>
        


        </div>
    </div>
</section>



<section class="bg-section2 flex justify-center items-center flex-col" id="aboutMe">
    <h1 class="text-white font-bold text-center text-[50px]">Development</h1>
    <h1 class="text-white font-bold text-center text-[35px]">Our Team</h1>

    <div class="flex flex-wrap justify-center items-center gap-4 mt-7 mb-7" data-aos="fade-right" >
        <div class="card w-60 h-96 bg-black rounded-xl p-3 flex flex-col justify-center items-center">
            <div class="img-area">
                <img src="./assets/images/Fadli.jpg" class="rounded-lg w-full h-60 object-fit" alt="Fadli Rahmat">
            </div>
            <div class="text-area mt-6 text-center  ">
                <p class="text-section1 font-bold text-lg">Fadli Rahmat</p>
                <h3 class="text-lg text-section1 font-bold text-opacity-70 ">Front End-Developer</h3>
            </div>
            <div class="flex justify-center items-center mt-2 gap-2">
         <button><a href="https://github.com/jk0623"><img src="./assets/icons/github.png" alt="logo github" class="w-[35px] h-[35px]"  ></a></button>
        <button><a  href="https://www.instagram.com/fadli.rhmt?igshid=OGQ5ZDc2ODk2ZA=="><img src="./assets/icons/ig.png" alt="logo ig" class="w-[35px] h-[35px]"></a></button> 
       <button><a href="https://www.linkedin.com/in/fadli-rahmat-011a8327a"><img src="./assets/icons/linkin.png" alt="logo linkin" class="w-[35px] h-[35px]" ></a></button> 
            </div>
        </div>

        <div class="card w-60 h-96 bg-black rounded-xl p-3 flex flex-col justify-center items-center" >
            <div class="img-area">
                <img src="./assets/images/TONNY .jpg" class="rounded-lg w-full h-60 object-cover" alt="TONNY">
            </div>
            <div class="text-area mt-6 text-center  ">
                <p class="text-section1 font-bold text-lg">Tonny Adetya Pratama</p>
                <h3 class="text-lg text-section1 font-bold text-opacity-70 ">Full stack-Developer</h3>
            </div>
            <div class="flex justify-center items-center mt-2 gap-2">
          <button><a href="https://github.com/Tonnyade27"><img src="./assets/icons/github.png" alt="logo github" class="w-[35px] h-[35px]"></a> </button>  
          <button><a href="https://www.instagram.com/tonnyadetya?igshid=NGVhN2U2NjQ0Yg=="><img src="./assets/icons/ig.png" alt="logo ig" class="w-[35px] h-[35px]"  ></a> </button>    
          <button><a href="https://www.linkedin.com/in/tonny-adetya-pratama-a3a769197/"><img src="./assets/icons/linkin.png" alt="logo linkin" class="w-[35px] h-[35px]" ></a></button>   
             </div>
        </div>

        <div class="card w-60 h-96 bg-black rounded-xl p-3 flex flex-col justify-center items-center">
            <div class="img-area">
                <img src="./assets/images/Yova.jpg" class="rounded-lg w-full h-60 object-cover" alt="Yova">
            </div>
            <div class="text-area mt-6 text-center  ">
                <p class="text-section1 font-bold text-lg">Yova Andre</p>
                <h3 class="text-lg text-section1 font-bold text-opacity-70 ">Front End-Developer</h3>
            </div>
            <div class="flex justify-center items-center mt-2 gap-2">
            <a href="https://github.com/Guardiantz" ><img src="./assets/icons/github.png" alt="logo github" class="w-[35px] h-[35px]" ></a> 
            <a href="https://www.instagram.com/yvandr?igshid=OGQ5ZDc2ODk2ZA=="><img src="./assets/icons/ig.png" alt="logo ig" class="w-[35px] h-[35px]"  ></a> 
           <a href=" https://id.linkedin.com/in/yova-andre-146988221"><img src="./assets/icons/linkin.png" alt="logo linkin" class="w-[35px] h-[35px]" ></a>
             </div>
        </div>
        <div class="card w-60 h-96 bg-black rounded-xl p-3 flex flex-col justify-center items-center">
        <div class="img-area">
            <img src="./assets/images/Ripal.jpg" class="rounded-lg w-full h-60 object-cover" alt="Ripal">
        </div>
        <div class="text-area mt-6 text-center  ">
            <p class="text-section1 font-bold text-lg">Mohamad Ripal. P</p>
            <h3 class="text-lg text-section1 font-bold text-opacity-70 ">Front End-Developer</h3>
        </div>
        <div class="flex justify-center items-center mt-2 gap-2">
        <a><img src="./assets/icons/github.png" alt="logo github" class="w-[35px] h-[35px]" href="" ></a>  
        <a><img src="./assets/icons/ig.png" alt="logo ig" class="w-[35px] h-[35px]" href="" ></a>  
       <a><img src="./assets/icons/linkin.png" alt="logo linkin" class="w-[35px] h-[35px]" href=""></a>
          </div>
    </div>

    <div class="card w-60 h-96 bg-black rounded-xl p-3 flex flex-col justify-center items-center">
        <div class="img-area">
            <img src="./assets/images/hazron.png" class="rounded-lg w-full h-60 object-cover" alt="hazron">
        </div>
        <div class="text-area mt-6 text-center  ">
            <p class="text-section1 font-bold text-lg">M.Hazron</p>
            <h3 class="text-lg text-section1 font-bold text-opacity-70 ">Front End-Developer</h3>
        </div>
        <div class="flex justify-center items-center mt-2 gap-2">
        <a><img src="./assets/icons/github.png" alt="logo github" class="w-[35px] h-[35px]" href="" ></a>  
        <a><img src="./assets/icons/ig.png" alt="logo ig" class="w-[35px] h-[35px]" href="" ></a>  
       <a><img src="./assets/icons/linkin.png" alt="logo linkin" class="w-[35px] h-[35px]" href=""></a>
          </div>
    </div>
    </div>
</section>

      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    //
  },
};

export default Home;
