import { AppState } from "../AppState"
import { Ad } from "../models/Ad"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AdsService{

    async getAds(){
        const res = await api.get('api/ads')
        logger.log(res.data)
        AppState.ads = res.data.map(e => new Ad(e))
    }

}

export const adsService = new AdsService()