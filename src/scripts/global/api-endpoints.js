import CONFIG from './config';

const API_ENDPOINT = {
  USER_REGISTER: `${CONFIG.BASE_URL}/user/register`,
  USER_LOGIN: `${CONFIG.BASE_URL}/user/login`,
  USER_PROFILE: `${CONFIG.BASE_URL}/user/profile`,
  ADMIN_REGISTER: `${CONFIG.BASE_URL}/admin/register`,
  ADMIN_LOGIN: `${CONFIG.BASE_URL}/admin/login`,
  ADMIN_PROFILE: `${CONFIG.BASE_URL}/admin/profile`,
  ADMIN_SUMMARY: `${CONFIG.BASE_URL}/admin/summary`,
};

export default API_ENDPOINT;
