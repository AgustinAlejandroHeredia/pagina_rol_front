import { useState, type ChangeEvent } from "react"
import { CreateCampaignService } from "../services/CreateCampaignService"

export function CreateCampaign() {
    
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        system: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [showError, setShowError] = useState(false)

    const [done, setDone] = useState(false)
    const [successful, setSuccessful] = useState(false)

    // Para el boton
    const [loading, setLoading] = useState(false)
    
    const createCampaign = async () => {

        setLoading(true)

        try{

            if(!formData.name.trim() || !formData.description.trim() || !formData.system.trim()){
                setShowError(true)
                return
            }

            const data = await CreateCampaignService.createCampaign(
                formData.name,
                formData.description,
                formData.system
            )
            console.log("Campaña creada: ", data)

            setShowError(false)
            setSuccessful(true)
            setDone(true)

            setFormData({
                name: '',
                description: '',
                system: '',
            })

        }catch (error) {
            console.log("Error al crear la campaña: ", error)
            setShowError(false)
            setSuccessful(false)
            setDone(true)
        }finally {
            setLoading(false)
        }
    }


    return (
        <div className='content-container'>
            <h5 className="page-message">Here you can create a new campaign from scratch. When it comes to invite players, once the campaign is created and you are the dungeon master, you can invite them accessing your campaign.</h5>
                <div className="create-campaign-card">

                    <div>
                        <h5 className="page-create-message">Campaign name</h5>
                        <input
                            type="text"
                            name="name"
                            placeholder="Campaign name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <h5 className="page-create-message">Description</h5>
                        <input
                            type="text"
                            name="description"
                            placeholder="A short description of the campaign"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <h5 className="page-create-message">Rol system</h5>
                        <input
                            type="text"
                            name="system"
                            placeholder="D&D"
                            value={formData.system}
                            onChange={handleChange}
                        />
                    </div>

                    {showError &&(
                        <div className="create-campaign-message-unsuccessful">
                            You have to complete all the given fields to procede
                        </div>
                    )}

                    {done && successful &&(
                        <div className="create-campaign-message-successful">
                            Campaign created successfully!
                        </div>
                    )}

                    {done && !successful &&(
                        <div className="create-campaign-message-unsuccessful">
                            Sorry, an error has occurred, please try later
                        </div>
                    )}

                    <div className={`create-campaign-button ${loading ? 'disabled' : ''}`} onClick={createCampaign}>
                        {loading && <span className="spinner"></span>}
                        {loading ? ' Creating...' : 'Create +'}
                    </div>

                </div>
        </div>
    )

}