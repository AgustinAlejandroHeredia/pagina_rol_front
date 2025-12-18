// OBTIENE EL TOKEN

// implementacion de la interfaz de auth-bridge, se implementa con auth0 en un tsximport { useAuth0 } from "@auth0/auth0-react";
import type { AuthBridge } from "./auth-bridge";
import { useAuth0 } from "@auth0/auth0-react";

export function useAuth0Bridge(): AuthBridge {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  console.log("Obteniendo token...");

  return {
    async getAccessToken() {
      if (!isAuthenticated) {
        return null;
      }

      const token = await getAccessTokenSilently()

      console.log("TOKEN OBTENIDO:", token);

      return token;
    },
  };
}