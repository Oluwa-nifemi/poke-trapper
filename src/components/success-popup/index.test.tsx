import {render, screen} from "tests/utils";
import SuccessPopup from "./index";
import userEvent from "@testing-library/user-event";
import {waitFor} from "@testing-library/react";

const mockCloseFunction = jest.fn();

describe("Success Popup", () => {
    it("Renders and allows submit", async () => {
        const user = userEvent.setup()

        const {container} = render(
            <SuccessPopup
                pokemonName="bulbasaur"
                handleClose={mockCloseFunction}
                imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            />
        )

        expect(container).toMatchSnapshot();

        await user.click(screen.getByText("Close"))

        expect(mockCloseFunction).toHaveBeenCalledTimes(1);

        expect(screen.getByText("Save")).toBeDisabled()

        const testNickname = "Test Nickname";

        await user.type(screen.getByLabelText("Enter Nickname"), testNickname)

        expect(screen.getByText("Save")).not.toBeDisabled()

        await user.click(screen.getByText("Save"))

        await waitFor(() => screen.findByTitle(`${testNickname} was saved!`))
        expect(container).toMatchSnapshot()
    });
});