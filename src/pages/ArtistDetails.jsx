import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery  } from '../redux/api/songApi';
import { TopPlay } from '../components';

function ArtistDetails() {
    const { id: artistId } = useParams();
    // console.log(songid);
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data: artistData, isFetching: isFetchingArtistDetail, error } = useGetArtistDetailsQuery(artistId);
    
    if (isFetchingArtistDetail) {
        return (
            <Loader title="Searching song details" />
        )
    }

    if (error) {
        return (
            <Error />
        )
    }

    console.log(artistData);
    // console.log(artistData?.data?.map(detail => Object.values(detail?.attributes?.name)))
    // console.log(Object.values(artistData?.data.map(song => song.attributes.name)))

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[900px] lg:order-first">
                <div className="w-full lg:w-[900px] lg:order-first">
                    <DetailsHeader artistId={ artistId } artistData={ artistData } />
                </div>
                <div className="xl:sticky relative top-0 h-fit sm:order-last">
                    <RelatedSongs 
                        data={ Object.values(artistData) }
                        artistId={ artistId }
                        isPlaying={ isPlaying }
                        activeSong={ activeSong }
                    />
                </div>
            </div>
            <div className="xl:sticky relative top-0 h-fit">
                <TopPlay />
            </div>
        </div>
    )
}

export default ArtistDetails;