import React from 'react';
import {useGetPokemonByNameQuery} from "api/pokemon";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks";
import {catchPokemon} from "../../redux/my-pokemon.slice";
import {nanoid} from "nanoid";

const PokemonDetails = () => {
    const { name } = useParams();

    const dispatch = useAppDispatch();

    const { isLoading, data } = useGetPokemonByNameQuery(name as string);

    const handleClickCatch = () => {
        //Super complex algorithm to detect if the pokemon was successfully caught : )
        const caught = Math.random() > 0.5;

        if(caught){
            const nickname = prompt("Enter your nickname") || "";

            if(data){
                dispatch(catchPokemon({
                    id: nanoid(),
                    name: data.name,
                    sprites: {
                        front_default: data.sprites.front_default
                    },
                    nickname
                }))
                alert(`${name} was successfully caught!`);
            }
        }else{
            alert(`${name} was not caught!`);
        }
    }

    if(isLoading){
        return <div>Loading...</div>
    }

    if(data) {
        return (
            <div>
                <h1>
                    {data.name}
                </h1>
                <button onClick={handleClickCatch}>
                    Catch
                </button>
                <img src={data.sprites.front_default} alt=""/>
                <h3>
                    Types
                </h3>
                {
                    data.types.map((type) => (
                        <div key={type.type.name}>
                            {type.type.name}
                        </div>
                    ))
                }
                <h3>
                    Moves
                </h3>
                {
                    data.moves.map((move) => (
                        <div key={move.move.name}>
                            {move.move.name}
                        </div>
                    ))
                }
            </div>
        );
    }

    return null;
};

export default PokemonDetails;