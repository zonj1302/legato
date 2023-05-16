import { Link } from 'react-router-dom';


function DetailsHeader({ artistId, artistData, songData }) {
    return (
        <div className="relative w-full flex flex-col mb-5">
            <div className="w-full bg-gradient-to-r from-transparent to-[#446789] sm:h-48 h-28"></div>
            <div className="absolute inset-0 flex items-center">
                <img 
                    alt="header-details" 
                    src={ artistId ? artistData?.data[0].attributes?.artwork?.url.replace('{w}', '500').replace('{h}', '500') : songData?.images?.coverart } 
                    className="sm:w-30 w-28 sm:h-30 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
                />
                <div className="ml-5 w-full">
                    <h1 className="font-bold text-white sm:text-2xl text-xl ">{ artistId ? artistData?.data[2].attributes?.artistName : songData?.title }</h1>
                    {!artistId && (
                        <Link to={`/artists/${songData?.artists[0].adamid}`}>
                            <p className="text-base text-gray-300 mt-2">{ songData?.subtitle }</p>
                        </Link>
                    )}
                    <p className="text-base text-gray-300 mt-2">
                        { artistId ? artistData?.data[1].attributes?.genreNames.map(genre => `${ genre } ` ) : songData?.genres?.primary }
                    </p>
                </div>
                <div className="w-full sm:h-44 h-24"></div>
            </div>
        </div>
    )
}

export default DetailsHeader;