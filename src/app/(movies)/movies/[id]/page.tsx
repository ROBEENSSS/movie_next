import React, {FC} from 'react';
import './movie_details.css';
import {movieService} from '@/services/api.service';
import StarsRating from "@/components/Stars_rating/StarsRating";
import HotBadge from "@/components/Hot_badge/HotBadge";

type Params = {
    params: Promise<{ id: string }>;
};

const MovieDetailPage: FC<Params> = async ({params}) => {
    const {id} = await params;

    const movie = await movieService.getMovieById(id);

    const genresData = await movieService.getGenres();
    const allGenres = genresData.genres;


    const movieGenres = movie?.genres || movie?.genre_ids || [];
    const genreNames = movieGenres.map((genreIdOrObject: any) => {

        const genreId = typeof genreIdOrObject === 'object' ? genreIdOrObject.id : genreIdOrObject;
        return allGenres.find((genre) => genre.id === genreId)?.name;
    }).filter(Boolean);

    return (
        <div className='details-movie-container' style={{position: 'relative'}}>
            <div><img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie?.title}
            />
                <HotBadge rating={movie?.vote_average}/></div>
            <div className="movie-info">
                <h1 className="movie-title">{movie?.title}</h1>
                <h2>Описание</h2>
                <p>{movie?.overview || 'Описание фильма отсутствует.'}</p>
                <h2>Жанры</h2>
                <p>
                    {genreNames.length > 0
                        ? genreNames.join(', ')
                        : 'Жанры неизвестны.'}
                </p>
                <h2>Дата релиза</h2>
                <p>{movie?.release_date || 'Дата неизвестна.'}</p>
                <h2>Рейтинг</h2>
                <div><StarsRating
                    rating={movie?.vote_average || 'Нет рейтинга'}/>{movie?.vote_average} / 10
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;