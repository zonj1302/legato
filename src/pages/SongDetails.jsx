import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetTopChartsQuery  } from '../redux/api/songApi';

function SongDetails() {
    const { songid } = useParams();
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data: songData , isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
    const { data, isFetching: isFetchingRelatedSong, error } = useGetTopChartsQuery();


    if (isFetchingSongDetails || isFetchingRelatedSong) {
        return (
            <Loader title="Searching song details" />
        )
    }

    if (error) {
        return (
            <Error />
        )
    }

    function handlePause() {
        dispatch(playPause(false));
    }

    function handlePlay(song, index) {
        dispatch(setActiveSong({ song, data, index }));
        dispatch(playPause(true));
    }

    console.log(songData);
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[900px] lg:order-first">
                <DetailsHeader artistId='' songData={ songData } />
                <div className="mb-8">
                    <h1 className="text-white text-3xl font-bold mb-5">Lyrics</h1>
                    <div className="mb-5">
                        {songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map((verse, i) => (
                            <p className="text-gray-400 text-base my-1">{ verse }</p>
                        )) : (
                            <p className="text-white font-bold">Sorry, No lyrics found</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="xl:sticky relative top-0 h-fit sm:order-last">
                <RelatedSongs 
                    data={ data }
                    isPlaying={ isPlaying }
                    activeSong={ activeSong }
                    handlePause={ handlePause }
                    handlePlay={ handlePlay }
                />
            </div>
        </div>
    )
}

export default SongDetails;