import React from 'react';
import {BasePokemon} from "types/pokemon";
import {Link} from "react-router-dom";

interface Props {
  pokemon: BasePokemon & { nickname?: string }
}

const PokemonItem: React.FC<Props> = ({ pokemon }) => {
  return (
    <div>
        <Link to={pokemon.name}>{pokemon.name}</Link>
        {
            pokemon.nickname && (
                <p>
                    {pokemon.nickname}
                </p>
            )
        }
    </div>
  );
};

export default PokemonItem;