/* eslint-disable import/no-unresolved */
/* eslint-disable eol-last */
import API_ENDPOINT from '../global/api-endpoints';

class NyokLaporAPI {
  static async getAdminProfile() {
    const url = API_ENDPOINT.ADMIN_PROFILE;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getAccessTokenAdmin()}`,
      },
    };

    const response = await this.fetchData(url, options);
    return response.profile;
  }

  static async fetchData(url, options = {}) {
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => data)
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Fungsi untuk catat waktu terakhir aktivitas dan waktu kadaluwarsa token
  static async updateActivityAndTokenInfo(userType, setIdleTimeout) {
    const currentTime = Math.floor(Date.now() / 1000);
    const idleTimeoutInSeconds = setIdleTimeout * 60;
    const loginInfo = JSON.parse(localStorage.getItem(`loginInfo${userType}`));

    const tokenInfo = currentTime + idleTimeoutInSeconds;
    loginInfo.expiresIn = tokenInfo;

    localStorage.setItem(`loginInfo${userType}`, JSON.stringify(loginInfo));
  }

  // Fungsi untuk periksa waktu kadaluwarsa
  static async isTokenValid(expiresIn) {
    if (!expiresIn) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = expiresIn;

    return expirationTime < currentTime;
  }

  static async getAdminSummary() {
    const url = API_ENDPOINT.ADMIN_SUMMARY;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getAccessTokenAdmin()}`,
      },
    };

    const response = await this.fetchData(url, options);
    return response.dashboardData;
  }

  static getAccessTokenUser() {
    const loginInfoUser = JSON.parse(localStorage.getItem('loginInfoUser')) || {};
    return loginInfoUser.token || '';
  }

  static getAccessTokenAdmin() {
    const loginInfoAdmin = JSON.parse(localStorage.getItem('loginInfoAdmin')) || {};
    return loginInfoAdmin.token || '';
  }
}

export default NyokLaporAPI;