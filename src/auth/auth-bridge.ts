// no conoce Auth0 ni React, solo propone una interfaz para que se implemente en un archivo que use el auth que sea (Auth0 en este caso) para obtener el token

export interface AuthBridge {
  getAccessToken(): Promise<string | null>
  getPermissions(): Promise<string[]>
  hasAdminPermission(): Promise<boolean>
  hasDungeonMasterPermission(): Promise<boolean>
}