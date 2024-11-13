import axios from "axios";

export const createApiInstance = (baseURL) => {
  return axios.create({
    baseURL: baseURL + "/api",
    withCredentials: true,
  });
};

export const setupInterceptors = async (
  apiInstances,
  getAccessToken,
  updateAccessToken
) => {
  apiInstances.forEach((api, index) => {
    api.interceptors.request.use(
      (config) => {
        const token = getAccessToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            if (originalRequest.url.includes("/user/refresh_token")) {
              updateAccessToken(null);
              window.location.href = "/login";
              return Promise.reject(error);
            }

            const response = await authinc_api.post("/user/refresh_token");
            const newToken = response.data.access_token;
            updateAccessToken(newToken);
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            updateAccessToken(null);
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  });
};

const authinc_api = createApiInstance("https://authinc4-a4crdbg3eng3b5an.southeastasia-01.azurewebsites.net");

