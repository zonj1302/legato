import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

function SongCard({ song, index, isPlaying, activeSong, data }) {
    const dispatch = useDispatch();
    if (!song.images?.coverart) {
        return null;
    }
    function handlePause() {
        dispatch(playPause(false));
    }
    function handlePlay() {
        dispatch(setActiveSong({ song, data, index }));
        dispatch(playPause(true));
    }
    return (
        <div className={`flex flex-col w-[250px] bg-white/5 p-4 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer ${ activeSong?.title === song?.title ? 'flex bg-[#5C1E00] bg-opcatiy-70' : 'bg-white/5' }`}>
            <div className="w-full relative h-56 group">
                <div className={ `absolute inset-0 justify-center items-center bg-lack bg-opacity-50 group-hover:flex ${ activeSong?.title === song?.title ? 'flex bg-black bg-opcatiy-70' : 'hidden' }` }>
                    <PlayPause 
                        song={ song }
                        isPlaying={ isPlaying }
                        activeSong={ activeSong }
                        handlePause={ handlePause }
                        handlePlay={ handlePlay }
                    />
                </div>
                <img src={ song.images?.coverart } alt="song-image" />
            </div>
            <div className="flex flex-col mt-3">
                <Link to={`/songs/${song?.key}`} component="p" className="font-bold text-lg text-white truncate">{ song.title }</Link>
                <Link to={ song?.artists ? `/artists/${ song?.artists[0]?.adamid }` : '/top-artists' } component="p" className="truncate text-gray-400 text-sm mt-1">{ song.subtitle }</Link>
            </div>
        </div>
    )
}

export default SongCard;