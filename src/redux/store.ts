import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import {pokemonApi} from "api/pokemon";
import myPokemonSlice from "./my-pokemon.slice";
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        myPokemon: myPokemonSlice.reducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(pokemonApi.middleware)
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch)