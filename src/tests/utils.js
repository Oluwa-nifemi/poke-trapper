import {render as rtlRender, screen, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {pokemonApi} from "api/pokemon";
import myPokemonSlice from "../redux/my-pokemon.slice";

const render = (ui, options) => {
  const store = configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      myPokemon: myPokemonSlice.reducer
    },
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(pokemonApi.middleware)
    }
  });

  const Wrapper = ({children}) => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    )
  }

  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

const awaitExtracting = async () => {
  await waitFor(() => expect(screen.queryByText("Extracting local database")).toBeNull());
}

export * from "@testing-library/react"
export {render, awaitExtracting}