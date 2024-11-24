'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IMovieParams } from "../../../../IMovie";
import { movieService } from "@/services/api.service";
import { Pagination } from "@mantine/core";
import MoviesListCards from "@/components/Movies_List_Cards/MoviesListCards";
import Header from "@/components/Header/Header";

const MainPage = () => {
    const [moviesArray, setMoviesArray] = useState<IMovieParams[]>([]);
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const currentGenre = Number(searchParams.get('genre')) || null;

    useEffect(() => {

        const fetchMovies = async () => {
            try {
                const data = currentGenre
                    ? await movieService.getMoviesByGenre(currentGenre, currentPage.toString())
                    : await movieService.getMovies(currentPage.toString());
                setMoviesArray(data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, [currentPage, currentGenre]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handleGenreSelect = (genreId: number) => {

        const params = new URLSearchParams(searchParams.toString());
        params.set('genre', genreId.toString());
        params.set('page', '1');
        window.history.pushState(null, '', `/?${params.toString()}`);
    };

    return (
        <div>
            <Header selectGenre={handleGenreSelect } />
            <div className="pagination-top-container">
                <Pagination
                    className="pagination"
                    value={currentPage}
                    onChange={(page) => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('page', page.toString());
                        window.history.pushState(null, '', `/?${params.toString()}`);
                    }}
                    total={500}
                    color="rgba(170, 0, 0, 1)"
                    size="md"
                    radius="lg"
                    withEdges
                />
            </div>
            <div className="container-cards">
                {moviesArray.map((movie) => (
                    <div className="card-container" key={movie.id}>
                        <MoviesListCards movie={movie} />
                    </div>
                ))}
            </div>
            <div className="pagination-btn-container">
                <Pagination
                    className="pagination"
                    value={currentPage}
                    onChange={(page) => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('page', page.toString());
                        window.history.pushState(null, '', `/?${params.toString()}`);
                    }}
                    total={500}
                    color="rgba(170, 0, 0, 1)"
                    size="xl"
                    radius="md"
                    withEdges
                />
            </div>
        </div>
    );
};

export default MainPage;
