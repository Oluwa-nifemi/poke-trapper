import {render, screen} from "tests/utils";
import ListPokemon from "./index";
import {waitFor} from "@testing-library/react";

describe("Test List Pokemon", () => {
    it("should render correctly", async () => {
        const {container} = render(<ListPokemon/>);

        await waitFor(() => expect(screen.queryByText("Loading")).toBeNull());

        expect(container).toMatchSnapshot();

        const testPokemon = "bulbasaur"
        const element = screen.getByText(testPokemon);
        expect(element).toHaveAttribute("href", `/${testPokemon}`);
    });
});