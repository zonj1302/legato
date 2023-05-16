import { useNavigate } from 'react-router-dom';

function ArtistCard({ song }) {
    const navigate = useNavigate();
    if (!song?.images?.coverart) {
        return null;
    }
    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" onClick={ () => navigate(`/artists/${ song?.artists[0].adamid }`)}>
            <img src={ song?.images?.background } className="w-full h-60 rounded-lg" />
            <p className="text-white mt-4">{ song?.subtitle }</p>
        </div>
    )
}

export default ArtistCard;