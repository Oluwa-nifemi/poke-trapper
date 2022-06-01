import React, {useCallback, useEffect} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import {CaughtPokemon} from "types/pokemon";
import localforage from "localforage";
import {getHasSetInitialState, PokemonStats, setInitialState} from "../../redux/my-pokemon.slice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {ReactComponent as Logo} from "assets/logo.svg";
import styles from "./index.module.css"

const Layout: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const hasSetInitialState = useAppSelector(getHasSetInitialState);

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

    const renderMain = () => {
        if (!hasSetInitialState) {
            return (
                <h3 className={styles.mainExtracting}>
                    Extracting local database...
                </h3>
            )
        }

        return <Outlet/>
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
                {renderMain()}
            </main>
        </>
    );
};

export default Layout;