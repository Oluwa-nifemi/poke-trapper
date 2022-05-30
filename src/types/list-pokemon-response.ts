import {Pokemon} from "types/pokemon";

export type ListPokemonResponse = {
    count: number;
    previous: string | null;
    next: string | null;
    results: Array<Pokemon>
}