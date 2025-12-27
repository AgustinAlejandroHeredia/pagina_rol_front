import LoginButton from "../components/LoginButton"
import { useAuth0 } from "@auth0/auth0-react"
import { Navigate } from "react-router-dom"
import Loading from "../components/Loading"

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <Loading/>
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }
  
  return (
    <div>
      <h1>Login temporal</h1>
      <LoginButton />
    </div>
  )
}
