'use client';

import React, { useEffect, useState, useRef, FC } from 'react';
import { usePathname } from 'next/navigation'; // Импорт usePathname
import '@/css/header.css';
import Link from "next/link";
import { movieService } from "@/services/api.service";
import { IGenresParams } from "../../IMovie";
import UserInfo from "@/components/UserInfo";

interface IProps {
    selectGenre: (genreId: number) => void;
}

const HeaderComponent: FC<IProps> = ({ selectGenre }) => {
    const [genres, setGenres] = useState<IGenresParams[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const pathname = usePathname(); // Получение текущего пути
    const isDetailsPage = pathname.startsWith('/movies/'); // Проверка на страницу деталей

    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        movieService.getGenres().then((data) => setGenres(data.genres));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="header-container">
            <nav>
                <Link className="a-link" href="/" onClick={() => selectGenre(0)}>
                    All movies
                </Link>

                <UserInfo/>
                <div
                    className={`genres-dropdown ${isDetailsPage ? 'hidden' : ''}`} // Скрыть на странице деталей
                    onClick={() => !isDetailsPage && setIsDropdownOpen(!isDropdownOpen)} // Не раскрывать, если на странице деталей
                >
                    <button
                        className="a-link"
                        ref={buttonRef}
                        disabled={isDetailsPage} // Дизейблим кнопку
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
                                onClick={() => selectGenre(genre.id)}
                            >
                                {genre.name}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HeaderComponent;