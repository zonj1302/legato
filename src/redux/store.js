import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { songApi } from './api/songApi';

export const store = configureStore({
    reducer: {
        [songApi.reducerPath]: songApi.reducer,
        player: playerReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(songApi.middleware),
});
