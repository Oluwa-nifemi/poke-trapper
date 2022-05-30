import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout";
import ListPokemon from "./pages/list-pokemon";
import PokemonDetails from "./pages/pokemon-details";
import MyPokemonList from "./pages/my-pokemon-list";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<ListPokemon/>}/>
                <Route path="/:id" element={<PokemonDetails/>}/>
                <Route path="/my-pokemon" element={<MyPokemonList/>}/>
            </Route>
        </Routes>
    );
}

export default App;
