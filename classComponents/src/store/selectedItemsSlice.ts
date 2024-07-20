import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Result } from '../interfaces';

export interface SelectedItemsState {
  items: Result[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Result>) => {
      const index = state.items.findIndex(item => item.name === action.payload.name);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    unselectAll: (state) => {
      state.items = [];
    },
  },
});

export const { toggleItem, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;