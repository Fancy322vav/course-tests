import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCardsData = () => async (dispatch) => {
  const url =
    "https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json";
  const res = await axios.get(url);
  const cardsData = res.data.slice(0, 15);
  const transformedCardsData = cardsData.map((data) => {
    return {
      id: data.Number,
      title: data.Name,
      text: data.About,
      isEdeting: false,
      checked: false,
    };
  });
  dispatch(cardsActions.setCardsData(transformedCardsData));
};

const initialState = { cards: [], viewOnly: false };

const cardsSlice = createSlice({
  name: "cards",
  initialState: initialState,
  reducers: {
    setCardsData: (state, action) => {
      state.cards = action.payload;
    },
    setViewOnly: (state) => {
      state.viewOnly = !state.viewOnly;
    },
    addCard: (state) => {
      state.cards.push({
        text: "New Card",
        title: "New Card",
        id: Math.random().toString(),
      });
    },
    deleteCard: (state) => {
      state.cards = state.cards.filter((card) => !card.checked);
    },

    updateCard: (state, action) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.id) {
          return action.payload;
        }
        return card;
      });
    },
  },
});

export const cardsActions = cardsSlice.actions;
export default cardsSlice.reducer;
