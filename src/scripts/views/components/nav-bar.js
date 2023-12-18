class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
     <nav class="py-4 px-4 mb-12 font-Poppins shadow-lg shadow-gray-300">
    <div class="container mx-auto">
        <div class="flex items-center justify-between">
            <img src="./assets/icons/nyoklapor-icon.png" alt="logo nyok-lapor" class="h-[60px] w-[108px]  ">
            <div class=" w-96 pt-4 pb-4  rounded-full hidden lg:block lg:w-1/2">
                <ul class="flex gap-16 justify-center font-bold font-Poppins">
                    <li class="text-butungu text-sm">
                        <a class="nav hover:border-b-2" href="#/home">HOME</a>
                    </li>
                    <li class="text-butungu text-sm">
                        <a class="nav hover:border-b-2" href="#aboutMe">ABOUT US</a>
                    </li>
                    <li class="text-butungu text-sm">
                        <a class="nav hover:border-b-2" href="#/laporan">LAPORAN</a>
                    </li>
                </ul>
            </div>

            <div class="w-52 h-10 flex md:w-auto md:h-auto gap-2 sm:w-auto sm:h-auto" id="navbar-login">
            <div class="flex items-center">
                <!-- Tombol Login dan Signup -->
                <button class="grow px-7 py-3 text-sm" id="loginButton">
                    <a class="nav hover:border-b-2 hover:border-b-butungu font-bold text-butungu" href="?#/loginuser">LOG IN</a>
                </button>
                <button class="grow px-7 py-3 text-sm" id="signupButton">
                    <a class="nav hover:border-b-2 hover:border-b-butungu font-bold text-butungu" href="#/registeruser">SIGN
                    UP</a>
                </button>

                <!-- Elemen untuk Foto Profil dan Logout -->
                <div class="hidden items-center" id="userProfile">
                    <span id="userName"></span>
                    <img src="./assets/homepage/blank-profile.png" alt="Profile" class="rounded-full w-8 h-8 mx-4">
                    <button class="grow px-2 py-5 text-sm" id="logoutButton">
                        <a class="hover:border-b-2 p-3 rounded-lg hover:bg-butungu font-bold hover:text-white text-butungu">LOGOUT</a>
                    </button>
                </div>

                <!-- Tombol Hamburger -->
                <button id="hamburgerButton">
                     <ion-icon name="menu" class="text-3xl cursor-pointer lg:hidden" aria-label="hamburger"></ion-icon>
                </button>
             </div>
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
