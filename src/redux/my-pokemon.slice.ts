import {CaughtPokemon} from "types/pokemon";
import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import localforage from "localforage";
import {RootState} from "./store";

export interface PokemonStats {
    [key: string]: number;
}

export interface MyPokemonState {
    caughtPokemon: CaughtPokemon[];
    stats: PokemonStats;
    hasSetInitialState: boolean;
}

const initialState: MyPokemonState = {
    caughtPokemon: [],
    stats: {},
    hasSetInitialState: false
}

const saveStateToLocalStorage = (state: MyPokemonState) => {
    const {caughtPokemon, stats} = current(state);

    localforage.setItem("caughtPokemon", caughtPokemon);
    localforage.setItem("stats", stats);
}

interface SetInitialStateArgs {
    caughtPokemon: CaughtPokemon[];
    stats: PokemonStats;
}

const myPokemonSlice = createSlice({
    name: "myPokemon",
    initialState,
    reducers: {
        setInitialState(state, action: PayloadAction<SetInitialStateArgs>) {
            return {
                ...action.payload,
                hasSetInitialState: true
            };
        },
        catchPokemon: (state, action: PayloadAction<CaughtPokemon>) => {
            state.caughtPokemon.push(action.payload);

            const {name} = action.payload;

            if (state.stats[name]) {
                state.stats[name] = state.stats[name] + 1
            } else {
                state.stats[name] = 1
            }

            saveStateToLocalStorage(state)
        },
        releasePokemon: (state, action: PayloadAction<{ pokemonId: string, pokemonName: string }>) => {
            const {pokemonId, pokemonName} = action.payload;

            state.stats[pokemonName] = Math.max(state.stats[pokemonName] - 1, 0);

            state.caughtPokemon = state.caughtPokemon.filter(pokemon => pokemon.id !== pokemonId);

            saveStateToLocalStorage(state)
        }
    }
})

export const {setInitialState, catchPokemon, releasePokemon} = myPokemonSlice.actions

export const getCaughtPokemon = (state: RootState) => state.myPokemon.caughtPokemon;

export const getCaughtPokemonStatistics = (state: RootState) => state.myPokemon.stats;

export const getHasSetInitialState = (state: RootState) => state.myPokemon.hasSetInitialState

export default myPokemonSlice