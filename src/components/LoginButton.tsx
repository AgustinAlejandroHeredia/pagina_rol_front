import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

type LoginButtonProps = {
  className?: string
}

const LoginButton = ({ className = "" }: LoginButtonProps) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  const location = useLocation()

  const returnTo = (location.state as any)?.returnTo || "/home"

  if (isAuthenticated) return null

  return (
    <button
      onClick={() =>
        loginWithRedirect({
          appState: { returnTo },
        })
      }
      className={`button login ${className}`}
    >
      Log In
    </button>
  )
}

export default LoginButton
