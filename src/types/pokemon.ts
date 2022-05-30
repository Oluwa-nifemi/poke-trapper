interface PokemonMove {
    move: {
        name: string;
        url: string;
    }
}

interface PokemonType {
    type: {
        name: string;
        url: string;
    }
}

export interface Pokemon {
    name: string;
    moves?: Array<PokemonMove>;
    types?: Array<PokemonType>;
}