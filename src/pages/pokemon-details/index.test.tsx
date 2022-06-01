import {render, screen} from "tests/utils";
import App from "../../App";
import {waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import calculateCatchPokemon from "utils/calculateCatchPokemon";

const mockCalculateCatchPokemon = calculateCatchPokemon as jest.Mock;

jest.mock("utils/calculateCatchPokemon", () => {
    return jest.fn()
});

describe("Pokemon Details Test", () => {
    it('Renders the pokemon details', async function () {
        window.history.pushState({}, "", "/bulbasaur");

        const user = userEvent.setup()

        const {container} = render(<App/>);

        await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());

        expect(container).toMatchSnapshot();

        mockCalculateCatchPokemon.mockReturnValueOnce(false).mockReturnValueOnce(true)

        await user.click(screen.getByText(/catch/i))

        expect(mockCalculateCatchPokemon).toHaveBeenCalledTimes(1)

        expect(screen.getByTitle("bulbasaur was not caught : (")).toBeInTheDocument()

        await user.click(screen.getByText(/catch/i))

        expect(mockCalculateCatchPokemon).toHaveBeenCalledTimes(2)

        expect(screen.getByTitle("bulbasaur was caught!")).toBeInTheDocument()
    });
})