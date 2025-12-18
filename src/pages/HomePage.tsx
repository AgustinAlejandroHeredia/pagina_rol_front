import LogoutButton from "../components/LogoutButton";
import { useHome } from "../hooks/useHome";

export function HomePage() {

    const { data, loading, error } = useHome()

    if(loading) return <p>Cargando...</p>
    if(error) return <p>Error al cargar datos: {error}</p>

    return (
        <div>
            <h1>Home</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <LogoutButton/>
        </div>
    )
}