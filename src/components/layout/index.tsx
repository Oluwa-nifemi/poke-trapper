import React, {useCallback, useEffect} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import {CaughtPokemon} from "types/pokemon";
import localforage from "localforage";
import {PokemonStats, setInitialState} from "../../redux/my-pokemon.slice";
import {useAppDispatch} from "../../redux/hooks";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import styles from "./index.module.css"

const Layout: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const extractInitialState = useCallback(async () => {
        const caughtPokemon: CaughtPokemon[] = await localforage.getItem("caughtPokemon") || [];
        const stats: PokemonStats = await localforage.getItem("stats") || {};
        dispatch(setInitialState({caughtPokemon, stats}));
    }, [dispatch])

    useEffect(() => {
        extractInitialState()
    }, [extractInitialState])

    const renderLink = () => {
        if (location.pathname === "/my-pokemon") {
            return <Link to="/" className={styles.navLink}>Home</Link>
        }

        return <Link to="/my-pokemon" className={styles.navLink}>My Pokemon</Link>
    }

    return (
        <>
            <nav className={styles.nav}>
                <Link to="/">
                    <Logo className={styles.navLogo}/>
                </Link>
                {renderLink()}
            </nav>
            <main className={styles.main}>
                <Outlet/>
            </main>
        </>
    );
};

export default Layout;