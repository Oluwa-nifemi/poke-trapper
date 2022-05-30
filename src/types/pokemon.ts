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

export interface CaughtPokemon extends BasePokemon {
    sprites: {
        front_default: string;
    };
    nickname: string;
}