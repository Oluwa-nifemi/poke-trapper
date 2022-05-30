import React from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getCaughtPokemon, releasePokemon} from "../../redux/my-pokemon.slice";
import {CaughtPokemon} from "types/pokemon";

const MyPokemonList = () => {
    const myPokemon = useAppSelector(getCaughtPokemon);
    const dispatch = useAppDispatch();

    const handleReleasePokemon = (pokemonId: string, pokemonName: string) => () => {
        dispatch(releasePokemon({pokemonId, pokemonName}));
    }

  return (
    <div>
      <h1>My Pokemon List</h1>
      <ul>
        {myPokemon.map((pokemon: CaughtPokemon) => (
          <li key={pokemon.name}>
              <h3>
                  {pokemon.nickname}
              </h3>
              <p>
                  {pokemon.name}
              </p>
              <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
              <button onClick={handleReleasePokemon(pokemon.id, pokemon.name)}>
                  Release
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPokemonList;