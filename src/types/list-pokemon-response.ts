import {BasePokemon} from "types/pokemon";

export type ListPokemonResponse = {
    count: number;
    previous: string | null;
    next: string | null;
    results: Array<BasePokemon>
}