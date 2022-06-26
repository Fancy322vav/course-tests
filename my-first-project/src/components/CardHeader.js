import "./Card.css";
import { BsPencilSquare } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { cardsActions } from "../store/cardsSlice";
import React, { useEffect } from "react";

const CardHeader = (props) => {
  const dispatch = useDispatch();
  const viewOnly = useSelector((state) => state.cards.viewOnly);
  const { cardInfo, clickSave, setUnsavedTitle } = props;

  const cardCheckboxHandler = () => {
    dispatch(
      cardsActions.updateCard({
        ...cardInfo,
        checked: !cardInfo.checked,
      })
    );
  };

  const clickPencil = () => {
    dispatch(
      cardsActions.updateCard({
        ...cardInfo,
        isEdeting: true,
        checked: false,
      })
    );
  };

  const userInputTitle = (event) => {
    setUnsavedTitle(event.target.value);
  };

  const clickCancel = () => {
    dispatch(
      cardsActions.updateCard({
        ...cardInfo,
        isEdeting: false,
      })
    );
  };

  useEffect(() => {
    dispatch(cardsActions.updateCard({ ...cardInfo, isEdeting: false }));
  }, [viewOnly, dispatch]);

  return (
    <div data-testid="card-header" className={`card-header ${cardInfo.checked ? "checked" : ""}`}>
      {cardInfo.isEdeting ? (
        <div>
          <input
            data-testid="input-field"
            className="title-form"
            type="text"
            defaultValue={cardInfo.title}
            onChange={userInputTitle}
          />
          <button data-testid="cancel-button-edit" className="cancel-button-edit" onClick={clickCancel}>
            <FcCancel size={22} />
          </button>
          <button data-testid="save-button-edit" className="save-button-edit" onClick={clickSave}>
            <BsCheckLg size={20} />
          </button>
        </div>
      ) : (
        <div>
          <input
            className="card-checkbox"
            type="checkbox"
            onChange={cardCheckboxHandler}
          />
          {cardInfo.title}
          {!viewOnly ? (
            <div>
              <button data-testid="pencil-button" className="pencil-button" onClick={clickPencil}>
                <BsPencilSquare size={20} />
              </button>
              <button data-testid="cancel-button" className="cancel-button" onClick={clickCancel}>
                <FcCancel size={22} />
              </button>
              <button data-testid="save-button" className="save-button" onClick={clickSave}>
                <BsCheckLg size={20} />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default CardHeader;
