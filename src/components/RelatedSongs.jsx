import SongBar from './SongBar';


function RelatedSongs({ data, isPlaying, activeSong, handlePause, handlePlay, artistId }) {
    console.log(data);
    return (
        <div className="flex flex-col ms-2">
            <h1 className="font-bold text-2xl text-white">Related Songs:</h1>
            <div className="mt-6 w-full flex-flex-col">
                {!artistId ? data?.tracks?.map((song, index) => (
                    <SongBar 
                        key={`${ song.key }-${ artistId }`}
                        song={ song }
                        index={ index }
                        artistId={ artistId }
                        isPlaying={ isPlaying }
                        activeSong={ activeSong }
                        handlePause={ handlePause }
                        handlePlay={ handlePlay }
                    />
                )) : data[0].map((song, index) => (
                    <div key={ index } className={ `w-full flex flex-row items-center hover:bg-[#123456] ${ activeSong?.title === song?.title ? 'bg-[#123456]' : 'bg-transparent' } py-2 p-4 rounded-lg cursor-pointer mb-2` }>
                        <p className="font-bold text-base text-white mr-3">{ index + 1 }.</p>
                        <div className="flex-1 flex flex-row justify-between items-center">
                            {/* <img
                                className="w-20 h-20 rounded-lg"
                                src={ song?.attributes?.artwork?.url }
                                alt={ song?.title }
                            /> */}
                            <div className="flex-1 flex flex-col justify-center mx-3">
                                <h1 className="text-white font-bold text-xl">{ song?.attributes?.name }</h1>
                                <p className="text-medium text-white mt-2">{ song?.attributes?.artistName }</p>              
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedSongs;