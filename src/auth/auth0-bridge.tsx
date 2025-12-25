// OBTIENE EL TOKEN

// implementacion de la interfaz de auth-bridge, se implementa con auth0 en un tsximport { useAuth0 } from "@auth0/auth0-react";
import type { AuthBridge } from "./auth-bridge";
import { useAuth0 } from "@auth0/auth0-react";

type JwtPayload = {
  permissions?: string[];
};

export function useAuth0Bridge(): AuthBridge {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  return {

    // Pide el token y lo devuelve
    async getAccessToken() {
      if (!isAuthenticated) {
        return null;
      }

      const token = await getAccessTokenSilently()

      console.log("TOKEN OBTENIDO : ", token)

      return token;
    },

    // Pide token y devuelve los permisos
    async getPermissions(): Promise<string[]> {
      if(!isAuthenticated) {
        return []
      }

      const token = await getAccessTokenSilently()

      const payloadBase64 = token.split(".")[1]
      const payloadJson = atob(payloadBase64)
      const payload = JSON.parse(payloadJson) as JwtPayload

      return payload.permissions ?? []
    },

  };
}