import { useAuth0 } from "@auth0/auth0-react";
import type { AuthBridge } from "./auth-bridge";

type JwtPayload = {
  permissions?: string[];
};

export function useAuth0Bridge(): AuthBridge {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getPermissions = async (): Promise<string[]> => {
    if (!isAuthenticated) return [];

    const token = await getAccessTokenSilently();
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson) as JwtPayload;

    return payload.permissions ?? [];
  };

  const hasAdminPermission = async (): Promise<boolean> => {
    const permissions = await getPermissions();
    return permissions.includes("admin:page");
  };

  const hasDungeonMasterPermission = async (): Promise<boolean> => {
    const permissions = await getPermissions();
    return (
      permissions.includes("admin:page") ||
      permissions.includes("edit:campaign")
    );
  };

  const getAccessToken = async () => {
    if (!isAuthenticated) return null;
    return await getAccessTokenSilently();
  };

  return {
    getAccessToken,
    getPermissions,
    hasAdminPermission,
    hasDungeonMasterPermission,
  };
}
