import LoginButton from "../components/LoginButton"
import { useAuth0 } from "@auth0/auth0-react"
import { Navigate } from "react-router-dom"
import Loading from "../components/Loading"

import logo from '../assets/dice_image_web_icon.png'

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <Loading/>
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }
  
  return (
    <div className="login-background">
      <div className="login-page">
        <div className="login-card">

          <img
            src={logo}
            alt="App logo"
            className="logo-img"
          />

          <h1 className="fantasy">
            Welcome to Rolaplay Web App
          </h1>

          <div className="page-message">
            Sign in to access your campaigns and worlds you alredy belong, or join and create your own campaign where you can invite the players you want.
          </div>

          <LoginButton className="btn-outline success lg" />

        </div>
      </div>
    </div>
  )
}
