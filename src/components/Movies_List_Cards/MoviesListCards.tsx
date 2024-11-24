import React, { FC } from 'react';
import Link from "next/link";
import { IMovieParams } from "../../../IMovie";
import './MoviesListCards.css';

interface IProps {
    movie: IMovieParams;
}

const MoviesListCards: FC<IProps> = ({ movie }) => {
    const isHot = movie.vote_average > 7.5;

    return (
        <div className="card-container">
            <Link href={`/movies/${movie.id}`}>
                <div className="image-container">
                    <img
                        src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-image"
                    />
                    {isHot && (
                        <div className="hot-badge">Hot</div>
                    )}
                </div>
            </Link>
            <h3>{movie.title}</h3>
        </div>
    );
};

export default MoviesListCards;