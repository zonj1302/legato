import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const songApi = createApi({
    reducerPath: 'songApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '4da5880498msha102e2da9a96a34p1ed33djsnef46a149d3be');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: () => '/charts/track'
        }),
        getSongDetails: builder.query({
            query: ({ songid }) => `/songs/get-details?key=${ songid }`
        }),
        getArtistDetails: builder.query({
            query: (artistId) => `/artists/get-top-songs?id=${ artistId }`
        }),
        getGenreDetails: builder.query({
            query: () => `/charts/list`
        }),
        getSongsBySearch: builder.query({
            query: (searchTerm) => `/search?term=${ searchTerm }&locale=en-US`
        }),
    }),
})

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetArtistDetailsQuery,
    useGetGenreDetailsQuery,
    useGetSongsBySearchQuery,
} = songApi;