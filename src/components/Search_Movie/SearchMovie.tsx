
import './SearchMovie.css'
import {useForm} from "react-hook-form";
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';



interface SearchFormInput {
    searchRequest: string;
}
const SearchMovie = () => {
    const { register, handleSubmit } = useForm<SearchFormInput>();
    const router = useRouter();

    const search = (searchObj: SearchFormInput) => {
        router.push(`/results?page=1&query=${searchObj.searchRequest}`);
    };

    return (
        <div>
            <form className={'movie-search'} onSubmit={handleSubmit(search)}>
                <input type="text"  placeholder="Search movies..."

                    {...register('searchRequest')}
                />
                <button onClick={handleSubmit(search)}>
                    <SearchIcon/>
                </button>
            </form>
        </div>
    );
};

export default SearchMovie;