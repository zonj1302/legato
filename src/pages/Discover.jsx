import { Error, Loader, SongCard, TopPlay } from '../components';
import { genres } from '../assets/constants';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetTopChartsQuery, useGetGenreDetailsQuery } from '../redux/api/songApi';
import { useDispatch, useSelector } from 'react-redux';

function Discover() {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetTopChartsQuery();
    const { data: genresData } = useGetGenreDetailsQuery(genreListId || 'pop');
    if (isFetching) {
        return (
            <Loader title="Loading"/>
        )
    }
    if (error) {
        return (
            <Error />
        )
    }
    const title = genres.find(({ value }) => value === genreListId)?.title;
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[900px] lg:order-first">
                <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                    <h1 className="font-bold text-3xl text-white text-left">Discover { title }</h1>
                    <select
                        onChange={ (event) => dispatch(selectGenreListId(event.target.value)) }
                        value={ genreListId || 'pop' }
                        className="bg-black text-gray-500 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                    >
                    {genres.map(genre => (
                        <option key={ genre.value }>{ genre.title }</option>
                    ))}
                    </select>
                </div>
                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                    {data?.tracks?.map((song, index) => (
                        <SongCard 
                            key={ song.key }
                            song={ song }
                            index={ index }
                            isPlaying={ isPlaying }
                            activeSong={ activeSong }
                            data={ data }
                        />
                    ))}
                </div>
            </div>
            <div className="xl:sticky relative top-0 h-fit sm:order-first md:order-first lg:order-last">
                <TopPlay />
            </div>
        </div>
    )
}

export default Discover;