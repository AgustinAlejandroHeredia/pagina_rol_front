import type { AxiosInstance } from "axios";
import type { AuthBridge } from "../auth/auth-bridge";

// INSERTA EL TOKEN OBTENIDO

let authBridge: AuthBridge | null = null;

export function registerAuthBridge(bridge: AuthBridge) {
  authBridge = bridge;
}

export function setupAuthInterceptor(http: AxiosInstance) {
  http.interceptors.request.use(async (config) => {
    if (!authBridge) {
      return config;
    }

    const token = await authBridge.getAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}