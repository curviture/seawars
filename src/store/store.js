import { configureStore } from "@reduxjs/toolkit";
import stageReducer from "./stageSlice";
import buildReducer from "./buildSlice";
import fieldReducer from "./fieldSlice";
import gameSlice from "./gameSlice";
import playSlice from "./playSlice";

export default configureStore({
  reducer: {
    game: gameSlice,
    stage: stageReducer,
    build: buildReducer,
    field: fieldReducer,
    play: playSlice,
  },
});
