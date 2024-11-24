'use client';

import React, {useEffect, useState} from 'react';
import {IMovieParams} from "../../../../IMovie";
import {movieService} from "@/services/api.service";
import {useSearchParams, useRouter} from 'next/navigation'; // Добавлен useRouter
import MoviesListCards from "@/components/Movies_List_Cards/MoviesListCards";
import {MantineProvider, Pagination} from "@mantine/core";
import '@mantine/core/styles.css';

const ResultsPage = () => {
    const [movies, setMovies] = useState<IMovieParams[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Получение параметров из URL
    const query = searchParams.get('query') || '';
    const page = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        if (query) {
            movieService.search(query, page.toString()).then((data) => {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            });
        }
    }, [query, page]);

    const handlePageChange = (newPage: number) => {

        router.push(`/results?query=${query}&page=${newPage}`);
    };


    return (
        <MantineProvider>
        <div>
            <div className={'pagination-top-container'}>
                <Pagination
                    value={page}
                    onChange={handlePageChange}
                    total={totalPages}
                    color="rgba(170, 0, 0, 1)"
                    size="md"
                    radius="lg"
                    withEdges
                />
            </div>
            <div className={'container-cards'}>
                {movies.map(movie => (
                    <div className={'card-container'} key={movie.id}>
                        <MoviesListCards movie={movie} />
                    </div>
                ))}
            </div>
            <div className={'pagination-btn-container'}>
                <Pagination
                    value={page}
                    onChange={handlePageChange}
                    total={totalPages}
                    color="rgba(170, 0, 0, 1)"
                    size="xl"
                    radius="md"
                    withEdges
                />
            </div>
        </div>
        </MantineProvider>
    );
};

export default ResultsPage;