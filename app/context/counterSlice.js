"use client"

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  info: {} ,// object store ke liye
  data:{},
 cart:[],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   setCart: (state, action) => {
      state.cart.push(action.payload); // ✅ ab ye safe hoga
    },
     removeCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    setUserInfo: (state, action) => {
      state.info = action.payload
    },
    setData:(state,action) => {
      state.data = action.payload
    }
    
  },
})

export const { increment, decrement, incrementByAmount, setUserInfo,setData ,setCart, removeCart, clearCart} = counterSlice.actions

export default counterSlice.reducer
