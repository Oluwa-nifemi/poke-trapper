type PokemonMove = {
    move: {
        name: string;
        url: string;
    }
}

type PokemonType = {
    type: {
        name: string;
        url: string;
    }
}

export type Pokemon = {
    name: string;
    moves?: Array<PokemonMove>;
    types?: Array<PokemonType>;
}