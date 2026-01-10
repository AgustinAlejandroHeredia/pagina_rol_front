import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    const location = useLocation()

    const returnTo = (location.state as any)?.returnTo || "/home"

    return (
        !isAuthenticated && (
            <button
                onClick={() => loginWithRedirect({
                    appState: {returnTo},
                })}
                className="button login"
            >
                Log In    
            </button>
        )
    )
}

export default LoginButton