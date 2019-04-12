import axios from "axios";

const apiURL = process.env.REACT_APP_EVENT_API_URL;
const tokenStorageKey = "ep_session_token_storage_key";

export class Api {
  constructor() {
    const service = axios.create({
      baseURL: apiURL
    });

    this.service = service;
    this.authCallback = null;

    // recover session token from storage
    const token = localStorage.getItem(tokenStorageKey);
    if (token) {
      this.setAuthTokenHeader(token);
    }

    // setup auth interceptor
    service.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (typeof this.authCallback === "function") {
          this.authCallback(error);
        }
        if (error) return Promise.reject(error);
      }
    );
  }

  get(path, parameters, cancelToken) {
    return this.service.get(path, {
      params: parameters,
      cancelToken: cancelToken
    });
  }

  patch(path, payload) {
    return this.service.request({
      method: "PATCH",
      url: path,
      responseType: "json",
      data: payload
    });
  }

  post(path, payload, headers) {
    let params = {
      method: "POST",
      url: path,
      responseType: "json",
      data: payload,
      ...(headers ? { headers } : {})
    };

    return this.service.request(params);
  }

  delete(path, payload) {
    return this.service.request({
      method: "DELETE",
      url: path,
      responseType: "json",
      data: payload
    });
  }

  setSessionToken(token) {
    this.setAuthTokenHeader(token);
    this.saveTokenToStorage(token);
  }

  clearSessionToken() {
    delete this.service.defaults.headers.common["Authorization"];
    localStorage.removeItem(tokenStorageKey);
  }

  setAuthTokenHeader(token) {
    this.service.defaults.headers.common["Authorization"] = `Token ${token}`;
  }

  saveTokenToStorage(token) {
    localStorage.setItem(tokenStorageKey, token);
  }

  onAuthError(сallback) {
    this.authCallback = сallback;
  }
}

export default new Api();
