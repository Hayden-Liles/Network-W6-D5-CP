import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Profile } from "../models/Profile"

class ProfilesService{

    async getProfileById(profileId){
        const res = await api.get('/api/profiles/'+ profileId)
        AppState.curProfile = new Profile(res.data)
        this.checkLinks()
        
    }

    clearProfile(){
        AppState.curProfile = null
    }

    checkLinks(){
            if(!AppState.curProfile.github.includes("https://") && AppState.curProfile.github != ''){
                AppState.curProfile.github = ''
                logger.error(`${AppState.curProfile.name}'s Github's link is Invalid`)

            }
            if(!AppState.curProfile.linkedin.includes("https://") && AppState.curProfile.linkedin != ''){
                AppState.curProfile.linkedin = ''
                logger.error(`${AppState.curProfile.name}'s LinkedIn link is Invalid`)
            }
            if(!AppState.curProfile.resume.includes("https://") && AppState.curProfile.resume != ''){
                AppState.curProfile.resume = ''
                logger.error(`${AppState.curProfile.name}'s resume link is Invalid`)
            };
    }

}

export const profilesService = new ProfilesService()