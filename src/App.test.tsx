import localforage from "localforage";
import {awaitExtractingAndLoading, render, screen} from "tests/utils";
import App from "./App";
import userEvent from "@testing-library/user-event";
import calculateCatchPokemon from "utils/calculateCatchPokemon";

const mockCalculateCatchPokemon = calculateCatchPokemon as jest.Mock;

jest.mock("utils/calculateCatchPokemon", () => {
    return jest.fn()
});

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

        await awaitExtractingAndLoading();

        expect(container).toMatchSnapshot();

        await localforage.removeItem("caughtPokemon")
        await localforage.removeItem("stats")
    });

    it("Can load main app and view details and add to personal pokemon", async () => {
        //Initial setup
        const user = userEvent.setup()
        mockCalculateCatchPokemon.mockReturnValue(true)

        //Load app
        const {container} = render(<App/>);

        await awaitExtractingAndLoading();

        //Expect to see list of pokemon
        expect(container).toMatchSnapshot()

        //Click on first pokemon
        await user.click(screen.getByText("bulbasaur"));

        await awaitExtractingAndLoading();

        //Check for statistics
        expect(screen.getByText("bulbasaur")).toBeInTheDocument()
        expect(screen.getByText(/xp/i)).toBeInTheDocument()
        expect(screen.getByText(/height/i)).toBeInTheDocument()
        expect(screen.getByText(/weight/i)).toBeInTheDocument()

        //Click on catch button
        await user.click(screen.getByText(/catch/i))

        //Fill out success form
        const testNickname = "Test Nickname";

        await user.type(screen.getByLabelText("Enter Nickname"), testNickname)

        await user.click(screen.getByText("Save"))

        // Go to my pokemon
        await user.click(screen.getByText(/my pokemon/i))

        await awaitExtractingAndLoading();
        // debug()

        //Check for nickname and pokemon name
        expect(screen.getByText("bulbasaur")).toBeInTheDocument()
        expect(screen.getByText(testNickname)).toBeInTheDocument()

        //Release pokemon
        await user.click(screen.getByText("Release"))

        //Expect to see success and empty message
        expect(screen.getByTitle(`${testNickname} has been released!`)).toBeInTheDocument()
        expect(screen.getByText(`You have no saved pokemon yet.`)).toBeInTheDocument()
    })
});