import React, { useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/api/songApi';

function TopChartCard({ song, index, isPlaying, activeSong, handlePause, handlePlay }) {
    if (!song.images?.coverart) {
        return null;
    }
    return (
        <div className="w-full flex flex-row items-center hover:bg-[#123456] py-2 p-2 rounded-lg cursor-pointer">
            <p className="font-bold text-base text-white mr-3">{ index + 1 }.</p>
            <div className="flex-1 flex flex-row justify-between items-center">
                <img className="w-16 h-16 rounded-lg" src={ song?.images?.coverart } alt={ song.title } />
                <div className="flex-1 flex flex-col justify-center mx-3">
                    <Link to={`/songs/${ song.key }`}>
                        <p className="text-medium font-bold text-white">{ song.title }</p>
                    </Link>
                    <Link to={`/artists/${ song?.artists[0].adamid }`}>
                        <p className="text-base text-gray-400 mt-1">{ song?.subtitle }</p>
                    </Link>
                </div>
            </div>
            <PlayPause 
                isPlaying={ isPlaying }
                activeSong={ activeSong }
                song={ song }
                handlePause={ handlePause }
                handlePlay={ handlePlay }
            />
        </div>
    )
}

function TopPlay() {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data } = useGetTopChartsQuery();
    const divRef = useRef(null);
    const topPlays = data?.tracks?.slice(0,5);

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    function handlePause() {
        dispatch(playPause(false));
    }

    function handlePlay(song, index) {
        dispatch(setActiveSong({ song, data, index }));
        dispatch(playPause(true));
    }

    return (
        <div ref={ divRef } className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[450px] max-w-full flex flex-col">
            <div className="w-full flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-white font-bold text-2xl">Top Artists</h1>
                    <Link to="/top-artists" component="p" className="text-gray-400 text-base cursor-pointer">See more</Link>
                </div>
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={ 10 }
                    freeMode
                    // centeredSlides
                    modules={ [FreeMode] }
                    className="mt-4"
                >
                    {topPlays?.map((song, index) => (
                        (song.images?.coverart && 
                            <SwiperSlide
                                key={ song?.key }
                                style={{ width: '20%', height: 'auto' }}
                                className="shadow-lg rounded-full animate-slideright"
                            >
                                <Link to={`/artists/${ song?.artists[0].adamid }`}>
                                    <img className="rounded-full w-full object-cover" src={ song?.images?.background } alt={ song.subtitle }/>
                                </Link>
                            </SwiperSlide>
                        )
                    ))}
                </Swiper>
            </div>            
            <div className="w-full flex flex-col mt-8">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-white font-bold text-2xl">Top Charts</h1>
                    <Link to="/top-charts" component="p" className="text-gray-400 text-base cursor-pointer">See more</Link>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                    {topPlays?.map((song, index) => (
                        <TopChartCard 
                            key={ song.key }
                            song={ song }
                            index={ index }
                            isPlaying={ isPlaying }
                            activeSong={ activeSong }
                            handlePause={ handlePause }
                            handlePlay={ () => handlePlay(song, index) }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopPlay;