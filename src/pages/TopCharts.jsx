import { Error, Loader, SongCard, TopPlay } from '../components';
import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/api/songApi';

function TopCharts() {
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetTopChartsQuery();
    if (isFetching) {
        return (
            <Loader title="Loading Top Charts"/>
        )
    }
    if (error) {
        return (
            <Error />
        )
    }
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[900px] lg:order-first">
                <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                    <h1 className="font-bold text-3xl text-white text-left">Discover Top Charts</h1>
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

export default TopCharts;