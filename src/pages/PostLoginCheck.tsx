import { useEffect } from "react";
import { PostLoginCheckService } from "../services/PostLoginCheck";
import Loading from "../components/Loading"

// AUTH0
import { useAuth0 } from "@auth0/auth0-react"

// NAVIGATOR
import { useNavigate } from 'react-router-dom'

export function PostLoginCheck() {

    const { user, isAuthenticated, isLoading } = useAuth0();

    const navigate = useNavigate()

    useEffect(() => {

        if (isLoading) return;
        if (!isAuthenticated) return;
        if (!user?.email || !user?.name) return;

        const name = user.name;
        const email = user.email;

        const check = async() => {
            await PostLoginCheckService.checkUser(name, email)
            navigate("/home")
        } 
        
        check()
    }, [isLoading, isAuthenticated, user])
    
    return <Loading />

}