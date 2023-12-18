/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import '../styles/main.css';
import '../styles/tailwind.css';
import './views/components/nav-bar';
import './views/components/foot-bar';
import Alpine from 'alpinejs';
import AOS from 'aos';
import App from './views/app';
import 'aos/dist/aos.css';

import swRegister from './utils/sw-register';

window.Alpine = Alpine;

Alpine.start();
AOS.init({
  offset: 200,
  duration: 1000,
  delay: 50,
  mirror: true,
});

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
});
