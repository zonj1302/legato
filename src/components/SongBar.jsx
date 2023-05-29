import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';

function SongBar({ song, index, artistId, isPlaying, activeSong, handlePause, handlePlay }) {
    console.log(song);
    if (!song.images?.coverart) {
        return null;
    }
    return (
        <div className={ `w-full flex flex-row items-center hover:bg-[#123456] ${ activeSong?.title === song?.title ? 'bg-[#123456]' : 'bg-transparent' } py-2 p-4 rounded-lg cursor-pointer mb-2` }>
            <p className="font-bold text-base text-white mr-3">{ index + 1 }.</p>
            <div className="flex-1 flex flex-row justify-between items-center">
                <img
                    className="w-20 h-20 rounded-lg"
                    src={ artistId ? song?.images?.coverarthq : song?.images?.coverart }
                    alt={ song?.title }
                />
                <div className="flex-1 flex flex-col justify-center mx-3">
                    {!artistId ? (
                        <Link to={`/songs/${song.key}`}>
                            <p className="text-xl font-bold text-white">{ song?.title }</p>
                        </Link>
                    ) : 
                        <p>{ song?.title }</p>
                    }
                    <p className="text-medium text-white mt-2">
                        { song?.subtitle }
                    </p>              
                </div>
                {!artistId ? (
                    <PlayPause
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        song={song}
                        handlePause={ handlePause }
                        handlePlay={ () => handlePlay(song, index) }
                    /> 
                ) : null }               
            </div>
        </div>
    )
}

export default SongBar;