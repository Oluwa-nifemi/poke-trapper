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

export interface BasePokemon {
    name: string;
    url: string;
}

export interface PokemonWithDetails extends BasePokemon {
    types: PokemonType[];
    moves: PokemonMove[];
    sprites: {
        front_default: string;
    };
}