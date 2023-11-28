// const DrawerInitializer = {
//   init({ button, drawer, content }) {
//     button.addEventListener('click', (event) => {
//       // eslint-disable-next-line no-underscore-dangle
//       this._toggleDrawer(event, drawer);
//     });

//     content.addEventListener('click', (event) => {
//       // eslint-disable-next-line no-underscore-dangle
//       this._closeDrawer(event, drawer);
//     });
//   },

//   // eslint-disable-next-line no-underscore-dangle
//   _toggleDrawer(event, drawer) {
//     event.stopPropagation();
//     drawer.classList.toggle('open');
//   },

//   // eslint-disable-next-line no-underscore-dangle
//   _closeDrawer(event, drawer) {
//     event.stopPropagation();
//     drawer.classList.remove('open');
//   },
// };

// export default DrawerInitializer;

const DrawerInitializer = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      // eslint-disable-next-line no-underscore-dangle
      this._toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      // eslint-disable-next-line no-underscore-dangle
      this._closeDrawer(event, drawer);
    });
  },

  // eslint-disable-next-line no-underscore-dangle
  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');

    // Mengubah class 'top' saat drawer dibuka atau ditutup
    if (drawer.classList.contains('open')) {
      drawer.classList.remove('bottom-[-100%]'); // Hapus class 'top-[-100%]'
      drawer.classList.add('bottom-[1%]'); // Tambah class 'top-0' (atau sesuai kebutuhan)
    } else {
      drawer.classList.remove('bottom-[1%]'); // Hapus class 'top-0'
      drawer.classList.add('bottom-[-100%]'); // Tambah class 'top-[-100%]'
    }
  },

  // eslint-disable-next-line no-underscore-dangle
  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
    drawer.classList.remove('bottom-[1%]'); // Pastikan class dihapus saat drawer ditutup
    drawer.classList.add('bottom-[-100%]'); // Kembalikan ke class 'top-[-100%]'
  },
};

export default DrawerInitializer;
