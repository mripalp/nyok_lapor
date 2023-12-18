import CONFIG from './config';

const API_ENDPOINT = {
  USER_REGISTER: `${CONFIG.BASE_URL}/user/register`,
  USER_LOGIN: `${CONFIG.BASE_URL}/user/login`,
  USER_PROFILE: `${CONFIG.BASE_URL}/user/profile`,
  USER_REPORT: `${CONFIG.BASE_URL}/user/report`,
  ADMIN_REGISTER: `${CONFIG.BASE_URL}/admin/register`,
  ADMIN_LOGIN: `${CONFIG.BASE_URL}/admin/login`,
  ADMIN_PROFILE: `${CONFIG.BASE_URL}/admin/profile`,
  ADMIN_SUMMARY: `${CONFIG.BASE_URL}/admin/summary`,
  ADMIN_REPORT: `${CONFIG.BASE_URL}/admin/report`,
  ADMIN_IMAGE_REPORT: `${CONFIG.BASE_URL}`,
};

export default API_ENDPOINT;
