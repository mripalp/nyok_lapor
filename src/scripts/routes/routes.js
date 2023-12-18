import Home from '../views/pages/home';
import Laporan from '../views/pages/laporan';
import AccountPage from '../views/pages/admin/account';
import Admin from '../views/pages/admin/admin';
import ReportPage from '../views/pages/admin/total-report';
import LoginUser from '../views/pages/login_user';
import Regis from '../views/pages/register_user';
import RegisAdmin from '../views/pages/register_admin';
import LoginAdmin from '../views/pages/login_admin';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/laporan': Laporan,
  '/loginuser': LoginUser,
  '/registeruser': Regis,
  '/regisadmin': RegisAdmin,
  '/loginadmin': LoginAdmin,
  '/admin': Admin,
  '/account': AccountPage,
  '/report': ReportPage,
};

export default routes;
