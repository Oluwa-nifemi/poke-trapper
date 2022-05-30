import {CaughtPokemon} from "types/pokemon";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    }
})

export const { setInitialState } = myPokemonSlice.actions

export default myPokemonSlice