import { Error, Loader, SongCard, TopPlay } from '../components';
import { useSelector } from 'react-redux';
import { useGetSongsBySearchQuery } from '../redux/api/songApi';
import { useParams } from 'react-router-dom';

function Search() {
    const { searchTerm } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

    if (isFetching) {
        return (
            <Loader title="Loading Songs"/>
        )
    }
    if (error) {
        return (
            <Error />
        )
    }
    const searchedSong = data?.tracks?.hits?.map(song => song.track);
    // console.log(searchedSong);
    // console.log(data);
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[900px] lg:order-first">
                <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                    <h1 className="font-bold text-3xl text-white text-left">Results for {searchTerm}</h1>
                </div>
                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                        {searchedSong.map((song, index) => (
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

export default Search;