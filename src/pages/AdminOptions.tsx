import Loading from "../components/Loading"
import { useAdminOptions } from "../hooks/useAdminOptions"

// MUI
import { Divider, FormControlLabel, Stack, Switch } from "@mui/material"

export function AdminOptions() {
    
    const { campaigns, invites, users, isAdmin, loading, error } = useAdminOptions()

    if(loading) return <Loading />

    if (error) return <h1>There was an error... must be the will of god... we sorry</h1>

    return (
        <div className="content-container">
            {isAdmin ? (

                <Stack spacing={5}>
                    
                    <div>
                        <h5 className="page-sub-message">Campaigns:</h5>
                        <div className="info-card">
                            asd
                        </div>
                    </div>

                    <div>
                        <h5 className="page-sub-message">Invites:</h5>
                        <div className="info-card">
                            asd
                        </div>
                        <div className="info-card">
                            asd
                        </div>
                    </div>

                    <div>
                        <h5 className="page-sub-message">Users:</h5>
                        <div className="info-card">
                            asd
                        </div>
                    </div>

                </Stack>

            ) : (
                <h1>You are not an admin, get out of here!</h1>
            )}
        </div>
    )

}