import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import CardHeader from "./CardHeader";

import { render, screen } from "./customRender";

const mockCardInfoWithEditableModeOn = {
  checked: false,
  id: "001",
  isEdeting: true,
  text: "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.",
  title: "Bulbasaur"
}

const mockCardInfoWithEditableModeOff = {
    checked: false,
    id: "001",
    isEdeting: false,
    text: "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.",
    title: "Bulbasaur"
  }

describe("CardHeader component", () => {
    test("render CardHeader component", () => {
        render(
          <BrowserRouter>
            <CardHeader
            cardInfo={mockCardInfoWithEditableModeOn}
            clickSave={() => {}}
            setUnsavedTitle={() => {}}
          />
          </BrowserRouter>
        );
        const cardHeader = screen.getByTestId("card-header");
        expect(cardHeader).toBeInTheDocument();
      });

  test("render correct CardHeader component items if isEditable mode is on", () => {
    render(
      <BrowserRouter>
        <CardHeader
        cardInfo={mockCardInfoWithEditableModeOn}
        clickSave={() => {}}
        setUnsavedTitle={() => {}}
      />
      </BrowserRouter>
    );
    const inputField = screen.getByTestId("input-field");
    const saveBtn = screen.getByTestId("save-button-edit");
    const cancelBtn = screen.getByTestId("cancel-button-edit");
    expect(inputField).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
    expect(screen.queryByTestId("pencil-button")).not.toBeInTheDocument();
  });

  test("render correct CardHeader component items if isEditable mode is off", () => {
    render(
      <BrowserRouter>
        <CardHeader
        cardInfo={mockCardInfoWithEditableModeOff}
        clickSave={() => {}}
        setUnsavedTitle={() => {}}
      />
      </BrowserRouter>
    );
    const pencilIcon = screen.getByTestId("pencil-button");
    const saveIcon = screen.queryByTestId("save-button");
    const cancelIcon = screen.queryByTestId("cancel-button");
    expect(screen.queryByTestId("input-field")).not.toBeInTheDocument();
    expect(screen.queryByTestId("save-button-edit")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cancel-button-edit")).not.toBeInTheDocument();
    expect(pencilIcon).toBeInTheDocument();
    expect(saveIcon).toBeInTheDocument();
    expect(cancelIcon).toBeInTheDocument();
  });
});
