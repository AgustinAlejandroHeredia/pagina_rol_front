import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// AUTH0 imports
import { Auth0Provider } from '@auth0/auth0-react'

import { api } from "./api/api";
import { setupAuthInterceptor, registerAuthBridge } from "./api/auth-interceptor";
import { useAuth0Bridge } from "./auth/auth0-bridge";

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

// se carga de primeras el Auth0Bridge
function Bootstrap() {
  console.log("BOOTSTRAP")

  const authBridge = useAuth0Bridge();

  registerAuthBridge(authBridge);
  setupAuthInterceptor(api);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/home`,
        audience: "https://rol-api/",
      }}
    >
      <Bootstrap/>
    </Auth0Provider>
  </StrictMode>,
)
