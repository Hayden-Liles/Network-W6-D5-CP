import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Profile } from "../models/Profile"

class ProfilesService{

    async getProfileById(profileId){
        const res = await api.get('/api/profiles/'+ profileId)
        AppState.curProfile = new Profile(res.data)
        logger.log('hi')
    }

}

export const profilesService = new ProfilesService()