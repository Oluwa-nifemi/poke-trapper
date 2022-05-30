import React from 'react';
import {useAppSelector} from "../../redux/hooks";
import {getCaughtPokemon} from "../../redux/my-pokemon.slice";
import {CaughtPokemon} from "types/pokemon";

const MyPokemonList = () => {
    const myPokemon = useAppSelector(getCaughtPokemon);

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
              <button>
                  Release
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPokemonList;