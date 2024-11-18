'use client'

import React, {useEffect, useState} from 'react';
import {IMovieParams} from "../../../../../movieNextjs/IMovie";
import {movieService} from "@/services/movieService";


const Page = () => {

    const [moviesArray, setMoviesArray] = useState<IMovieParams[]>([]);
    useEffect(() => {
        movieService.getByPage('1').then((data) => {
            setMoviesArray(data.results);
        });
    }, []);
    return (
        <div>
            {moviesArray.map(value => <div key={value.id}>{value.title}</div>)}
        </div>
    );
};

export default Page;