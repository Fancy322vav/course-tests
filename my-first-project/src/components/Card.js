import "./Card.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";
import withLoadingDelay from "./withLoadingDelay";
import { useDispatch } from "react-redux";
import { cardsActions } from "../store/cardsSlice";

function Card(props) {
  const { cardInfo } = props;
  const [unsavedTitle, setUnsavedTitle] = useState();
  const [unsavedText, setUnsavedText] = useState();
  const dispatch = useDispatch();

  const clickSave = () => {
    if (unsavedTitle) {
      dispatch(
        cardsActions.updateCard({
          ...cardInfo,
          isEdeting: false,
          title: unsavedTitle,
        })
      );
    }
    if (unsavedText) {
      dispatch(
        cardsActions.updateCard({
          ...cardInfo,
          isEdeting: false,
          text: unsavedText,
        })
      );
    }
    if (unsavedTitle && unsavedText) {
      dispatch(
        cardsActions.updateCard({
          ...cardInfo,
          isEdeting: false,
          title: unsavedTitle,
          text: unsavedText,
        })
      );
    }
  };
  return (
    <div data-testid="card-component" className={`card ${cardInfo.checked ? "checked" : ""}`}>
      <CardHeader
        cardInfo={cardInfo}
        clickSave={clickSave}
        setUnsavedTitle={setUnsavedTitle}
      />
      <CardBody cardInfo={cardInfo} setUnsavedText={setUnsavedText} />
    </div>
  );
}

Card.propTypes = {
  cardInfo: PropTypes.object,
};

export default Card;
//export default withLoadingDelay(Card);
