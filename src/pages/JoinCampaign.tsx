import { useState, type ChangeEvent } from "react"
import { JoinCampaignService } from "../services/JoinCampaignService"

export function JoinCampaign() {

    const [completeToken, setCompleteToken] = useState(false)
    const [tokenFormat, setTokenFormat] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [completeAlias, setCompleteAlias] = useState(false)
    const [aliasNotAllowed, setAliasNotAllowed] = useState(false)

    const FORBIDDEN_ALIASES = [
        'gamemaster',
        'dungeonmaster',
        'maestrodemazmorras',
        'masterdemazmorras',
        'dungeonmaestro',
        'storyteller',
        'storymaster',
        'narrador',
        'referee',
        'thedm',
        'headdm',
        'maindm',
    ];

    const normalizeAlias = (alias: string): string => {
        return alias
            .toLowerCase()
            .trim()
            .replace(/[\s._-]/g, '')
    }

    const isAllowedAlias = (alias: string): boolean => {
        if(!alias){
            return false
        }
        const normalized = normalizeAlias(alias)
        return !FORBIDDEN_ALIASES.includes(normalized)
    }

    const [formData, setFormData] = useState({
        token: '',
        alias: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const joinCampaign = async () => {

        // reset
        setCompleteToken(false)
        setTokenFormat(false)
        setError(false)
        setSuccess(false)
        setCompleteAlias(false)
        setAliasNotAllowed(false)

        if(!formData.token.trim){
            setCompleteToken(true)
            return
        }

        if(formData.token.length != 6){
            setTokenFormat(true)
            return
        }

        if(formData.alias.length < 3){
            setCompleteAlias(true)
            return
        }
        
        if(!isAllowedAlias(formData.alias)){
            setAliasNotAllowed(true)
            return
        }

        try {
            await JoinCampaignService.joinCampaign(formData.token, formData.alias)
            setSuccess(true)
        } catch (error) {
            setError(true)
        }

    }
    
    return (
        <div className='content-container'>
            <h5 className="page-message">If an invite was sent to your email, you recived a code/token. Write the code here to join the campaign you were invited to.</h5>
                <div className="create-campaign-card">
                    
                    <div>
                        <h5 className="page-create-message">Invitation code</h5>
                        <input
                            type="text"
                            name="token"
                            placeholder="Example : 6TG7CB"
                            value={formData.token}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <h5 className="page-create-message">Alias you want to join with</h5>
                        <input
                            type="text"
                            name="alias"
                            placeholder="Example : Name"
                            value={formData.alias}
                            onChange={handleChange}
                        />
                    </div>

                    {completeToken &&(
                        <div className="create-campaign-message-unsuccessful">
                            You have to complete the token to procede.
                        </div>
                    )}

                    {completeAlias &&(
                        <div className="create-campaign-message-unsuccessful">
                            You have to complete the alias to procede.
                        </div>
                    )}

                    {aliasNotAllowed &&(
                        <div className="create-campaign-message-unsuccessful">
                            You can't choose that alias.
                        </div>
                    )}

                    {tokenFormat &&(
                        <div className="create-campaign-message-unsuccessful">
                            The format of the token is invalid, it has only 6 digits.
                        </div>
                    )}

                    {error &&(
                        <div className="create-campaign-message-unsuccessful">
                            Sorry, an error has ocurred, try checking the token o wrote.
                        </div>
                    )}

                    {success &&(
                        <div className="create-campaign-message-successful">
                            You successfully joined a new campaign, enjoy playing!
                        </div>
                    )}

                    <div className="create-campaign-button" onClick={joinCampaign}>
                        Join campaig !
                    </div>

                </div>
        </div>
    )

}