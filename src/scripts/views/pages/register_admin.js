import API_ENDPOINT from '../../global/api-endpoints';

const AccountPage = {

  async render() {
    return `
 <section>
    <div class="grid justify-items-center ... font-semibold text-[#C2C2C2] over">
        <div class="bg-[#1F2937] rounded-lg " style="width: 642px; height: 855px; border-radius: 40px;">
            <div class="grid justify-items-center ... mt-16">
                <img src="../assets/homepage/tes.png" style="width:320px; height:220px;">
            </div>

            <form id="register-form">
                <label class="block mt-8 ml-36">
                    <span class="block text-lg font-semibold text-[#B31312]">Username</span>
                    <input type="text" id="name" class="peer ... text-sm bg-white pl-6 pr-32 pt-4 pb-4 text-slate-950"
                        placeholder="Nama Lengkap" style="border-radius: 20px; width: 416px;" />
                </label>

                <label class="block mt-4 ml-36 relative ">
                    <span class="block text-lg font-semibold text-[#B31312]">Password</span>
                    <div class="relative" style="width: 350px;">
                        <input type="password" id="password"
                            class="peer ... text-sm bg-white pl-6 pr-14 pt-4 pb-4 text-slate-950"
                            placeholder="Buat Kata Sandi" style="border-radius: 20px; width: 416px; " id="password" />
                        <div class="w-10 h-10 hover:bg-[#111827] active:bg-[#111827] focus:outline-none focus:ring focus:ring-black-300 ... absolute top-1/2 -translate-y-1/2  flex items-center justify-center"
                            style="border-radius: 5px; margin-left: 350px;">
                            <img src="../assets/icons/eye.png" id="eyeIconPassword" class="eye-icon"
                                alt="Eye Icon Password">
                        </div>
                    </div>
                    <p class="text-white text-sm font-normal">Minimal harus 8 karakter.</p>

                    <div class="relative mt-2" style="width: 350px;">
                        <input type="text" class="peer ... text-sm bg-white pl-6 pr-14 pt-4 pb-4 text-slate-950"
                            placeholder="Ulangi Kata Sandi" style="border-radius: 20px; width: 416px;"
                            id="ulangiPassword" />
                        <div class="w-10 h-10 hover:bg-[#111827] active:bg-[#111827] focus:outline-none focus:ring focus:ring-black-300 ... absolute top-1/2 -translate-y-1/2 flex items-center justify-center ml-10"
                            style="border-radius: 5px; margin-left: 350px;">
                            <img src="../assets/icons/eye.png" id="eyeIconUlangiPassword" class="eye-icon"
                                alt="Eye Icon Ulangi Password">
                        </div>
                    </div>
                </label>

                <div class="mt-11 ml-36 relative ">
                    <button
                        class=" text-white pb-5 pt-5 font-bold text-xl hover:bg-[#111827] active:bg-[#111827] focus:outline-none focus:ring focus:ring-black-300 ..."
                        style="border-radius: 14px; width: 414px ; box-shadow: 0px 14px 10px 0px rgba(0, 0, 0, 0.25); transition: background-color 0.2s ease;">Buat
                        Akun</button>
                </div>

            </form>

        </div>
    </div>
</section>
    `;
  },

  async afterRender() {
    // Add event listener for form submission
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', this.handleRegistration);
  },

  async handleRegistration(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    // const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value;

    // Make API call to register
    try {
      const response = await fetch(API_ENDPOINT.ADMIN_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name, // Assuming the server expects 'username'
          //   email,
          password,
          role: 'admin',
        }),
      });

      if (response.ok) {
        window.location.replace(`${window.location.origin}/#/loginuser`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  },

};

export default AccountPage;
