import localforage from "localforage";
import {render, screen} from "tests/utils";
import {waitFor} from "@testing-library/react";
import App from "./App";

describe("Main App Tests", () => {
    it("Renders correct stats from localforage", async () => {
        //Update local storage with data
        await localforage.setItem("caughtPokemon", [
            {
                id: "123",
                nickname: "Test Pokemon",
                sprites: {
                    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
                },
                name: "bulbasaur"
            }
        ])
        await localforage.setItem("stats", {
            bulbasaur: 1
        })

        const {container} = render(<App/>);
        await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
        expect(container).toMatchSnapshot();
    });
});