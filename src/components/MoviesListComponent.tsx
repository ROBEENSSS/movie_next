import React, {FC} from 'react';
import Link from "next/link";
import {IMovieParams} from "../../IMovie";
import './../css/cards.css'

interface IProps {
    movie: IMovieParams;
}

const MoviesListComponent:FC<IProps> = ({movie}) => {
    return (
        <div>
            <Link href={`/movies/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                     alt={movie.title}/>
            </Link>
            <h3>{movie.title}</h3>
        </div>
    );
};

export default MoviesListComponent;