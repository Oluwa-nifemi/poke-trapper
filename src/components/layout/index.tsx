import React, {useCallback, useEffect} from 'react';
import {Link, Outlet} from "react-router-dom";
import {CaughtPokemon} from "types/pokemon";
import localforage from "localforage";
import {PokemonStats, setInitialState} from "../../redux/my-pokemon.slice";
import {useAppDispatch} from "../../redux/hooks";

const Layout: React.FC = () => {
    const dispatch = useAppDispatch();

    const extractInitialState = useCallback(async () => {
        const caughtPokemon: CaughtPokemon[] = await localforage.getItem("caughtPokemon") || [];
        const stats: PokemonStats = await localforage.getItem("stats") || {};
        dispatch(setInitialState({caughtPokemon, stats}));
    },[dispatch])

    useEffect(() => {
        extractInitialState()
    }, [extractInitialState])

    return (
        <>
            <nav>
                <h3>
                    Poke trapper
                </h3>
                <ul>
                    <li>
                        <Link to="/">List</Link>
                    </li>
                    <li>
                        <Link to="/2">Deets</Link>
                    </li>
                    <li>
                        <Link to="/my-pokemon">My precious </Link>
                    </li>
                </ul>
            </nav>
            <main>
                <Outlet/>
            </main>
        </>
    );
};

export default Layout;