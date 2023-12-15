class FootBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer class="bg-white text-black py-8 lg:py-12 mt-9 ">
    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 px-4">
        <div class="flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:gap-4">
            <p class="mr-4 mb-4 lg:mb-0 lg:mr-0">Ready to get started</p>
            <button class="bg-red-500 hover:bg-slate-800 px-4 py-2 text-white rounded-md">Get Started</button>
        </div>
        <div class="flex flex-col items-center lg:items-start lg:gap-8">
            <p class="text-sm mt-4 lg:mt-0">Services</p>
            <p class="text-sm">Email Campaign</p>
            <p class="text-sm">Branding</p>
            <p class="text-sm">Offline</p>
        </div>
        <div class="flex flex-col items-center lg:items-start lg:gap-8">
            <p class="text-sm mt-4 lg:mt-0">About Us</p>
            <p class="text-sm">Our Story</p>
            <p class="text-sm">Team</p>
            <p class="text-sm">Careers</p>
        </div>
        <div class="flex flex-col items-center lg:items-start lg:gap-8">
            <p class="text-sm mt-4 lg:mt-0">Resources</p>
            <p class="text-sm">Blog</p>
            <p class="text-sm">FAQs</p>
            <p class="text-sm">Downloads</p>
        </div>
    </div>
</footer>
        `;
  }
}
customElements.define('foot-bar', FootBar);
