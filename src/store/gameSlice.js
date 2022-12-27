import { createSlice } from "@reduxjs/toolkit";

import fillShips from "../gameEngine/fillShips";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    players: [],
    aiField: [],
    winner: null,
  },
  reducers: {
    setPlayers: (state, action) => {
      let newPlayers = action.payload.players;
      state.players = newPlayers;
    },
    generateFieldForComputer: (state, action) => {
      state.aiField = fillShips({ field: action.payload.field });
    },
  },
});

export const { setPlayers, generateFieldForComputer } = gameSlice.actions;

export default gameSlice.reducer;
