import React, {FC} from 'react';
import './../../../../css/movie_details.css'
import {movieService} from "@/services/api.service";
import Link from "next/link";

type Params = {
    params: Promise<{ id: string }>
}


const movieDetailPage:FC<Params> = async ({params}) => {
    const {id} = await params;
   const movie = await movieService.getMovieById(id);
    return (
        <div className={'details-movie-container'}>
            <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie?.title}
            />
            <div className="movie-info">
                <h1 className="movie-title">{movie?.title}</h1>
                <h2>Описание</h2>
                <p>{movie?.overview || "Описание фильма отсутствует."}</p>
                <h2>Жанры</h2>
                <p>{movie?.genre_ids || "Жанры неизвестны."}</p>
                <h2>Дата релиза</h2>
                <p>{movie?.release_date || "Дата неизвестна."}</p>
                <h2>Рейтинг</h2>
                <p>{movie?.vote_average || "Нет рейтинга"} / 10</p>
                <Link className="back-button" href="/">
                    Home
                </Link>
            </div>

        </div>
    );
};

export default movieDetailPage;