import React, { FC } from 'react';
import './../../../../css/movie_details.css';
import { movieService } from '@/services/api.service';

type Params = {
    params: Promise<{ id: string }>;
};

const MovieDetailPage: FC<Params> = async ({ params }) => {
    const { id } = await params;

    // Получаем данные фильма
    const movie = await movieService.getMovieById(id);

    // Получаем список жанров
    const genresData = await movieService.getGenres();
    const allGenres = genresData.genres;

    // Находим названия жанров для текущего фильма
    const movieGenres = movie?.genres || movie?.genre_ids || [];
    const genreNames = movieGenres.map((genreIdOrObject: any) => {
        // Если жанры приходят как объекты, используем genre.id, иначе genreId напрямую
        const genreId = typeof genreIdOrObject === 'object' ? genreIdOrObject.id : genreIdOrObject;
        return allGenres.find((genre) => genre.id === genreId)?.name;
    }).filter(Boolean); // Убираем undefined, если id нет в списке

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
                <p>{movie?.vote_average || 'Нет рейтинга'} / 10</p>
            </div>
        </div>
    );
};

export default MovieDetailPage;