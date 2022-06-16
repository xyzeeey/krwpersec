import { configureStore, createSlice } from '@reduxjs/toolkit'


let spendItem = createSlice({
  name: 'spendItem',
  initialState: [],
  reducers: {
    setItem(state, action) {
      return action.payload;
    },
    addItem(state, action) {
      localStorage.setItem('spendItem', JSON.stringify([action.payload, ...state]));
      return [action.payload, ...state];
    },
    removeItem(state, action) {
      localStorage.setItem('spendItem', JSON.stringify(state.filter((item => item.id !== action.payload))));
      return state.filter((item => item.id !== action.payload));
    },
  }
})

let totalSpend = createSlice({
  name: 'totalSpend',
  initialState: 0,
  reducers: {
    setSpend(state, action) {
      return state = action.payload;
    },
    addPrice(state, action) {
      const sumPrice = state += action.payload;
      localStorage.setItem('totalSpend', parseInt(sumPrice));
      return sumPrice;
    },
    removePrice(state, action) {
      const sumPrice = state -= action.payload;
      localStorage.setItem('totalSpend', parseInt(sumPrice));
      return sumPrice;
    },
  }
})


export let { setItem, addItem, removeItem } = spendItem.actions;
export let { setSpend, addPrice, removePrice } = totalSpend.actions;


export default configureStore({
  reducer: { 
    spendItem: spendItem.reducer,
    totalSpend: totalSpend.reducer,
  }
}) 
