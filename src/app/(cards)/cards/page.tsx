'use client'

import React, {useEffect, useState} from 'react';
// import {movieService} from "@/services/movieService";
import {IMovieParams} from "../../../../IMovie";
import '../../../css/cards.css'
import {Pagination} from "@mantine/core";
import {useSearchParams} from "react-router-dom";
import {movieService} from "@/services/api.service";


const Page = () => {
    const [moviesArray, setMoviesArray] = useState<IMovieParams[]>([]);
    const [query, setQuery] = useSearchParams({page: '1'});

    const currentPage = Number(query.get('page')) || 1 ;
    const pageChange = (page: number) => {
        setQuery({page: page.toString()});
    }

    useEffect(() => {
        movieService.getMovies(currentPage.toString()).then((data) => {
            setMoviesArray(data.results);
        });
    }, [currentPage]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);


    return (
        <div>
            <div className={'pagination-top-container'}>
                <Pagination className={'pagination'} value={currentPage} onChange={pageChange}
                            total={500} color="rgba(170, 0, 0, 1)" size={'md'} radius="lg"
                            withEdges/>
            </div>
            <div className={'container-cards'}>
                {
                    moviesArray.map(value =>
                        <div className={'card-container'} key={value.id}>


                            <img src={`https://image.tmdb.org/t/p/w1280${value.poster_path}`}
                                 alt={value.title}/>


                            {value.title}


                        </div>)
                }

            </div>
            <div className={'pagination-btn-container'}>
                <Pagination className={'pagination'} value={currentPage} onChange={pageChange}
                            total={500} color="rgba(170, 0, 0, 1)" size={'xl'} radius="md"
                            withEdges/>
            </div>
        </div>
    );
};

export default Page;