import UrlHandler from '../routes/url-handler';
import DrawerInitializer from '../utils/drawer';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    // eslint-disable-next-line no-underscore-dangle
    this._button = button;
    // eslint-disable-next-line no-underscore-dangle
    this._drawer = drawer;
    // eslint-disable-next-line no-underscore-dangle
    this._content = content;

    // eslint-disable-next-line no-underscore-dangle
    this._initialAppShell();
  }

  // eslint-disable-next-line no-underscore-dangle
  _initialAppShell() {
    DrawerInitializer.init({
      // eslint-disable-next-line no-underscore-dangle
      button: this._button,
      // eslint-disable-next-line no-underscore-dangle
      drawer: this._drawer,
      // eslint-disable-next-line no-underscore-dangle
      content: this._content,
    }); // kita bisa menginisiasikan komponen lain bila ada
  }

  async renderPage() {
    // eslint-disable-next-line no-undef
    const url = UrlHandler.parseActiveUrlWithCombiner();
    // eslint-disable-next-line no-undef
    const page = routes[url];
    // eslint-disable-next-line no-underscore-dangle
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
