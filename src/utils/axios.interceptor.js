import axios from "axios";
import * as configs from "../config.json";
import TokenStorageHelper from "../storage/token.storage";

// Axios Interceptor
const requestHandler = (request) => {
  const token = TokenStorageHelper.getAccessToken();
  if (token) request.headers["Authorization"] = `Bearer ${token}`;
  return request;
};

const responseHandler = (response) => {
  return response;
};

/**
 * Error
 *     !sent
 *         return promise rejection error
 *     sent + !responded ?
 *         return promise rejection error
 *     sent + responded ?
 *         !401 ? return promise rejection error
 *         401 & no refresh token ? login
 *         401 & refresh token ? REFRESH
 *             !sent
 *                 return promise rejection error
 *             sent + !responded ?
 *                 return promise rejection error
 *             sent + responded ?
 *                 200 ? update token and retry original request
 *                 477 ? invalid refresh token, relogin
 *                 * ? unknown case, relogin
 *         401 on retry ? relogin
 *
 */

const UnauthorizedHandler = async (error) => {
  error.config._retry = true;
  const refreshToken = TokenStorageHelper.getRefreshToken();
  if (!refreshToken) {
    // Must login
    return Promise.reject({
      mustLogin: true,
      sent: false,
      responded: false,
      error: error,
    });
  }

  return axios
    .post(
      `${configs.apiUrl}/api/refresh`,
      { refreshToken },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((res) => {
      const token = res.data.accessToken;
      TokenStorageHelper.setAccessToken(token);
      error.config.headers.Authorization = `Bearer ${token}`;
      return axios(error.config);
    })
    .catch((err) => {
      if (!err.request) {
        // Request not sent
        return Promise.reject({
          failedRefresh: true,
          sent: false,
          responded: false,
          error: err,
        });
      } else if (!err.response) {
        // Request sent but no response
        return Promise.reject({
          failedRefresh: true,
          sent: true,
          responded: false,
          request: err.request,
          error: err,
        });
      } else {
        // Must Login

        if (err.response.status === 477) {
          // Invalid refresh token
          return Promise.reject({
            mustLogin: true,
            failedRefresh: true,
            invalidRefreshToken: true,
            sent: true,
            responded: true,
            request: err.request,
            response: err.response,
            status: err.response.status,
            error: err,
          });
        } else {
          // Unknown case
          return Promise.reject({
            mustLogin: true,
            failedRefresh: true,
            sent: true,
            responded: true,
            request: err.request,
            response: err.response,
            status: err.response.status,
            error: err,
          });
        }
      }
    });
};

const errorHandler = async (error) => {
  if (!error.response) {
    // Request sent but no response
    return Promise.reject({
      sent: true,
      responded: false,
      request: error.request,
      error: error,
    });
  } else {
    if (error.response.status !== 401) {
      // Not an 'Unauthorized' error, pass along
      return Promise.reject({
        sent: true,
        responded: true,
        request: error.request,
        response: error.response,
        status: error.response.status,
        error: error,
      });
    } else if (error.response.status === 401 && !error.config._retry) {
      // 'Unauthorized' Error (first occurance)
      return UnauthorizedHandler(error);
    } else {
      // 401 on retry
      // Must login

      return Promise.reject({
        mustLogin: true,
        failedRetry: true,
        sent: true,
        responded: true,
        request: error.request,
        response: error.response,
        status: error.response.status,
        error: error,
      });
    }
  }
};

axios.interceptors.request.use(
  config => requestHandler(config),
  error => Promise.reject({sent: false, responded: false, error})
);
axios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);
