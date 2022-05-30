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
}

const initialState: MyPokemonState = {
    caughtPokemon: [],
    stats: {},
}

const myPokemonSlice = createSlice({
    name: "myPokemon",
    initialState,
    reducers: {
        setInitialState(state, action: PayloadAction<MyPokemonState>) {
            return action.payload;
        },
        catchPokemon: (state, action: PayloadAction<CaughtPokemon>) => {
            state.caughtPokemon.push(action.payload);

            const { name } = action.payload;

            if(state.stats[name]) {
                state.stats[name] = state.stats[name] + 1
            } else {
                state.stats[name] = 1
            }

            const { caughtPokemon, stats } = current(state);

            localforage.setItem("caughtPokemon", caughtPokemon);
            localforage.setItem("stats", stats);
        },
    }
})

export const { setInitialState, catchPokemon } = myPokemonSlice.actions

export const getCaughtPokemon = (state: RootState) => state.myPokemon.caughtPokemon;

export default myPokemonSlice