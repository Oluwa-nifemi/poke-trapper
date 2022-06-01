import {render, screen} from "tests/utils";
import App from "../../App";
import localforage from "localforage";
import {waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("My Pokemon List", () => {
    beforeEach(() => {
        window.history.pushState({}, "", "/my-pokemon");
    })

    it("Renders empty message", () => {
        render(<App/>);

        expect(screen.getByText("You have no saved pokemon yet.")).toBeInTheDocument();
    })

    it("Renders list of pokemon", async () => {
        const testPokemonNickname = "Test Pokemon";

        //Update local storage with data
        await localforage.setItem("caughtPokemon", [
            {
                id: "123",
                nickname: testPokemonNickname,
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

        await waitFor(() => {
            expect(screen.queryByText("Extracting local database...")).toBeNull();
        })

        expect(container).toMatchSnapshot()

        const user = userEvent.setup()

        await user.click(screen.getByText("Release"))

        expect(container).toMatchSnapshot()
        expect(screen.getByTitle(`${testPokemonNickname} has been released!`)).toBeInTheDocument()
    })
})