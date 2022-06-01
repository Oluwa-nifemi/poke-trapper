import {render} from "tests/utils";
import Popup from "components/popup/index";
import {screen} from "@testing-library/react";

describe("Popup Tests", () => {
    it("renders without crashing", () => {
        const {rerender} = render(<Popup isVisible={false}>Content</Popup>);

        expect(screen.queryByText("Content")).not.toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveAttribute("class", "popup");

        rerender(<Popup isVisible>Content</Popup>)

        expect(screen.getByText("Content")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveAttribute("class", "popup isVisible");
    });
});