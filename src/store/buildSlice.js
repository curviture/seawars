import { createSlice } from "@reduxjs/toolkit";

import defaultShips from "../data/defaultShips";

const buildSlice = createSlice({
  name: "build",
  initialState: {
    selectedShipSize: null,
    shipsToBuild: defaultShips,
    isVertical: true,
    currentlyBuildingCellId: "",
  },
  reducers: {
    selectShip: (state, action) => {
      state.selectedShipSize = action.payload;
    },
    fieldHoverWhenBuilding: (state, action) => {
      state.currentlyBuildingCellId = action.payload.id;
    },
    changeDirection: (state) => {
      state.isVertical = !state.isVertical;
    },
    placeShipWhenBuilding: (state, action) => {
      if (!state.selectedShipSize) return;
      if (
        state.shipsToBuild.some(
          (shipsToBuild) =>
            shipsToBuild[0] === state.selectedShipSize && shipsToBuild[1] === 0
        )
      )
        return;
      state.shipsToBuild = state.shipsToBuild.map((shipToBuild) => {
        if (shipToBuild[0] === state.selectedShipSize) {
          shipToBuild[1] = shipToBuild[1] - 1;
          return shipToBuild;
        }
        return shipToBuild;
      });
    },
    clearShips: (state, action) => {
      let ships = state.shipsToBuild;
      ships = ships.map((item) => [item[0], 0]);
      state.shipsToBuild = ships;
      state.selectedShipSize = null;
    },
    resetShips: (state) => {
      state.shipsToBuild = defaultShips;
    },
  },
});

export const {
  selectShip,
  placeShipWhenBuilding,
  fieldHoverWhenBuilding,
  changeDirection,
  resetShips,
  clearShips,
} = buildSlice.actions;

export default buildSlice.reducer;
