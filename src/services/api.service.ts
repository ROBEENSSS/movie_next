import {IMovie, IMovieParams} from "../../IMovie";

const baseURL: string = 'https://api.themoviedb.org/3/discover/movie';
const headers = {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTZjMDAyNmU3ZDc4MjM3ZTc4MjQ0YzZjY2FkYzE3NCIsIm5iZiI6MTczMTg1MTUwMC4wMTE2MTM4LCJzdWIiOiI2NWRjOTY5YzNkYzg4NTAxOGI0MzcxYjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EMCEHeFV5bka5NFBVmp-AMZrDdTPqhQ_0tM95LfJjuo",
        "Content-Type": "application/json"
    }
};

const {moviesPageURL, movieInfo,allItems} = {
    moviesPageURL: '?page=',
    movieInfo: '/',
    allItems: (url: string) => baseURL + url,
    // singleItems: (id: string | number, url: string) => base + url + '/' + id,
}

export const movieService = {
    getMovies: async (page: string):Promise<IMovie> => {
        const pages = await fetch(allItems(moviesPageURL + `${page}`), headers)
            .then(value => value.json());
        return pages;
    },

    getMovieById: async (id: string | number): Promise<IMovieParams | null> => {
        const movie = await fetch(allItems(movieInfo + id), headers)
            .then(value => value.json());
        return movie;
    }
}