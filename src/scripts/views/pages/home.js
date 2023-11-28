const Home = {
  async render() {
    return `
    <section class="sm:p-4 md:p-6 lg:p-8">
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <div class="col-span-12 lg:col-span-6">
          <div class="p-4 sm:p-6 md:p-8 lg:p-10">
            <img src="./assets/homepage/komponen 1.png" class="w-full h-auto">
          </div>
        </div>
        <div class="col-span-12 lg:col-span-6 container mx-auto">
          <div class="p-4 sm:p-6 md:p-8 lg:p-10 sm:text-center md:text-left justify-center items-center flex-col">  
            <div>
              <button class="h-auto bg-butungu text-white text-3xl font-bold shadow-md transform transition-all hover:scale-105 hover:shadow-2xl pl-3 pr-11 pt-2 pb-4 rounded-md w-1/2 sm:w-auto sm:transform sm:transition-all sm:hover:scale-85 sm:hover:shadow-xl sm:mx-auto">
                NyokLapor!?
              </button>
            </div>
            <div class="flex-col left-0 items-start">
              <h1 class=" p-0 text-2xl text-butungu text-opacity-80 sm:text-xl md:text-2xl lg:text-4xl font-extrabold mt-1 sm:mt-2 md:mt-2 lg:mt-2">Lapor Dengan Percaya <span class="text-black block text-sm sm:text-base md:text-lg lg:text-2xl">Membangun Keamanan Bersama</span></h1>
              <h1 class="  text-2xl  sm:text-xs md:text-xl lg:text-2xl font-normal mt-1 sm:mt-2 md:mt-3 lg:mt-4 text-black p-0 rounded-lg"> NyokLapor sebuah solusi inovatif untuk mengatasi <span class="text-butungu font-normal block text-sm sm:text-base md:text-lg lg:text-xl">masalah pelaporan kejadian di sekitar kita.</span></h1>
            </div>
            <div class=" sm:text-left mt-3 sm:mt-1 md:mt-2 lg:mt-3 right-0 bgre">
              <img src="./assets/homepage/laptop 1.png" class="w-1/2 h-auto">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default Home;
