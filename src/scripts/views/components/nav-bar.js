class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav id="navigationDrawer" class="py-10 px-4 font-Poppins" x-data="{navOpen : true}">
      <div class= "container mx-auto ">
         <div class="flex items-center justify-between  ">
            <img src="./assets/icons/nyoklapor-icon.png" class="h-12  w-21.5 order-1 sm:order-2 " >
            <img @click="navOpen = !navOpen" src="./assets/homepage/hamburger.png" class="h-12  w-21.5 lg:hidden order-2 sm:order-1" >

            
            <div class="order-2 w-96 pt-4 pb-4 rounded-full hidden lg:block bg-navBlur bg-opacity-20">
            <ul class="flex gap-16 justify-center">
              <li class="text-black  text-xs ">
                <a class="nav hover:text-black  hover:opacity-100" href="#home">HOME</a>
              </li>
              <li class="text-black text-xs ">
                <a class="nav hover:text-black  hover:opacity-100" href="#aboutus">ABOUT US</a>
              </li>
              <li class="text-black  text-xs ">
                <a class="nav hover:text-black  hover:opacity-100" href="#laporan">LAPORAN</a>
              </li>
            </ul>
          </div>
            <div class="w-52 h-10 order-3 hidden sm:block  ">
            <button class="grow bg-white px-7 py-3 font-bold text-merah text-opacity-90 rounded-l-2xl text-xs  ">LOG IN</button>
            <button class="grow bg-merah bg-opacity-90 px-7 py-3 font-bold text-white rounded-r-2xl text-xs ">SIGN UP</button>
            </div>
         </div>  
        </div>
        <div x-show="navOpen"  x-data="{open : true}" class="fixed right-0 left-0 bottom-0  p-4 lg:hidden"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 scale-90"
            x-transition:enter-end="opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-300"
            x-transition:leave-start="opacity-100 scale-100"
            x-transition:leave-end="opacity-0 scale-90"
            x-show="open">
            <ul class="flex justify-between opacity-80">
                <li >
                    <a href="#" class="flex justify-center flex-col items-center text-base gap-1"> 
                         <ion-icon name="home-outline" class="text-2xl" ></ion-icon>
                         <span class="text-base font-normal">Home</span>
                     </a>
                </li>
                <li>
                    <a href="#" class="flex justify-center flex-col items-center text-base gap-1"> 
                         <ion-icon name="business-outline" class="text-2xl"></ion-icon>
                         <span class="text-base font-normal">Abaou Us</span>
                     </a>
                </li>
                <li>
                    <a href="#" class="flex justify-center flex-col items-center text-base gap-1"> 
                         <ion-icon name="document-outline" class="text-2xl"></ion-icon>
                         <span class="text-base font-normal">Laporan</span>
                     </a>
                </li>
                <li>
                    <button @click="open = !open" class="flex justify-center flex-col items-center text-base ">  
                         <ion-icon name="ellipsis-horizontal-outline" class="text-2xl"></ion-icon>
                         <span class=" text-base font-normal">More</span>
                    </button>
                </li>
            </ul>
            <div class="absolute  bottom-24 left-1/2 -translate-x-1/2 flex  w-52 h-10 font-Poppins"  x-show="open"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 scale-90"
            x-transition:enter-end="opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-300"
            x-transition:leave-start="opacity-100 scale-100"
            x-transition:leave-end="opacity-0 scale-90"
            x-show="open ">
                <button  class="  grow bg-white px-7 py-3 font-bold text-merah text-opacity-90 rounded-l-2xl text-xs ">LOG IN</button>
                <button class="  grow bg-merah bg-opacity-90 px-7 py-3 font-bold text-white rounded-r-2xl text-xs ">SIGN UP</button>
            
            </div>
        </div>
          </nav>
        
      `;
  }
}

customElements.define('nav-bar', NavBar);
