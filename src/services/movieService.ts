import {axiosInstance} from "@/services/api.service";
import {IMovie} from "../../../movieNextjs/IMovie";

export const movieService = {
    getByPage: async (page: string):Promise<IMovie> => {
        const response = await axiosInstance(`/discover/movie?page=${page}`)
        return response.data;
    }
}