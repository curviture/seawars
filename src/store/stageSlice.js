import { createSlice } from "@reduxjs/toolkit";

const stageSlice = createSlice({
  name: "stage",
  initialState: { round: "start" },
  reducers: {
    roundStart: (state) => {
      state.round = "roundStart";
    },
    start: (state) => {
      state.round = "start";
    },
    build: (state) => {
      state.round = "build";
    },
    play: (state) => {
      state.round = "play";
    },
    final: (state) => {
      state.round = "final";
    },
  },
});

export const { roundStart, start, build, play, final } = stageSlice.actions;

export default stageSlice.reducer;
