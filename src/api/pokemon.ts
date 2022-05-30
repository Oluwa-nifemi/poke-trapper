import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ListPokemonResponse} from "types/list-pokemon-response";

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
    endpoints: (builder) => ({
        listPokemon: builder.query<ListPokemonResponse, string>({
            query: () => '/pokemon'
        })
    }),

})

export const { useListPokemonQuery } = pokemonApi