class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
     <nav class="py-10 px-4 font-Poppins ">
    <div class="container mx-auto">
        <div class="flex items-center justify-between">
            <img src="./assets/icons/nyoklapor-icon.png" alt="logo nyok-lapor" class="h-[60px] w-[108px]  ">
            <div class=" w-96 pt-4 pb-4  rounded-full hidden lg:block bg-navBlur bg-opacity-5 lg:w-1/2">
                <ul class="flex gap-16 justify-center font-medium  font-Poppins">
                    <li class="text-black text-xs">
                        <a class="nav hover:text-red-700 hover:opacity-100" href="#/home">HOME</a>
                    </li>
                    <li class="text-black text-xs">
                        <a class="nav hover:text-red-700 hover:opacity-100" href="#aboutMe">ABOUT US</a>
                    </li>
                    <li class="text-black text-xs">
                        <a class="nav hover:text-red-700 hover:opacity-100" href="#/laporan">LAPORAN</a>
                    </li>
                </ul>
            </div>

            <div class="w-52 h-10 flex md:w-auto md:h-auto gap-2  sm:w-auto sm:h-auto">
                <div class="flex ">
                <button class="grow bg-white px-7 py-3 font-bold text-merah text-opacity-90 rounded-l-2xl text-xs"><a href="?#/loginuser">LOG IN</a></button>
                <button class="grow bg-merah bg-opacity-90 px-7 py-3 font-bold text-white rounded-r-2xl text-xs"><a href="#/registeruser">SIG UP</a></button>
                </div>
                <button  id="hamburgerButton"><ion-icon name="menu" class="text-3xl cursor-pointer  lg:hidden" arial-label="hamburger"></ion-icon></button>
            </div>
        </div>
    </div>

    <div id="navigationDrawer" class="fixed right-0 left-0 bottom-[-100%] p-4 bg-navBlur bg-opacity-5 lg:hidden">
        <ul class="flex justify-between ">
            <li>
                <a href="#/home" class="flex justify-center flex-col items-center text-base gap-1">
                    <ion-icon name="home-outline" class="text-2xl"></ion-icon>
                    <span class="text-base font-normal">Home</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex justify-center flex-col items-center text-base gap-1">
                    <ion-icon name="business-outline" class="text-2xl"></ion-icon>
                    <span class="text-base font-normal">About Us</span>
                </a>
            </li>
            <li>
                <a href="#/laporan" class="flex justify-center flex-col items-center text-base gap-1">
                    <ion-icon name="document-outline" class="text-2xl"></ion-icon>
                    <span class="text-base font-normal">Laporan</span>
                </a>
            </li>
        </ul>
    </div>
</nav>


      `;
  }
}

customElements.define('nav-bar', NavBar);
