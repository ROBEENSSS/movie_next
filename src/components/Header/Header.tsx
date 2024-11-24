'use client';

import React, { useEffect, useState, useRef, FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import '@/components/Header/header.css';
import Link from 'next/link';
import { movieService } from '@/services/api.service';
import { IGenresParams } from '../../../IMovie';
import UserInfo from '@/components/User_Info/UserInfo';
import SearchMovie from '@/components/Search_Movie/SearchMovie';

interface IProps {
    selectGenre: (genreId: number) => void;
}

const Header: FC<IProps> = ({ selectGenre }) => {
    const [genres, setGenres] = useState<IGenresParams[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isDetailsPage = pathname.startsWith('/movies/');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        movieService.getGenres().then((data) => setGenres(data.genres));
    }, []);

    const handleClick = (genreId: number) => {
        router.push(`/?genre=${genreId}`);
        selectGenre(genreId);
    };

    return (
        <div className="header-container">
            <nav>
                <div
                    className={`genres-dropdown ${isDetailsPage ? 'hidden' : ''}`}
                    onClick={() => !isDetailsPage && setIsDropdownOpen(!isDropdownOpen)}
                >
                    <button
                        className="a-link"
                        ref={buttonRef}
                        disabled={isDetailsPage}
                        style={isDetailsPage ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                    >
                        Genres
                    </button>
                    <div
                        className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                        ref={dropdownRef}
                    >
                        {genres.map((genre) => (
                            <div
                                key={genre.id}
                                className="dropdown-item"
                                onClick={() => handleClick(genre.id)}
                            >
                                {genre.name}
                            </div>
                        ))}
                    </div>
                </div>

                <Link className="a-link" href="/" onClick={() => selectGenre(0)}>
                    All movies
                </Link>

                <div>
                    <SearchMovie />
                    <UserInfo />
                </div>
            </nav>
        </div>
    );
};

export default Header;