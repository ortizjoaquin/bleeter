import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import bleetService from './bleetService'

const initialState = {
  bleets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create new bleet
export const createBleet = createAsyncThunk('bleets/create', async (bleetData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await bleetService.createBleet(bleetData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const bleetSlice = createSlice ({
  name: 'bleet',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
    extraReducers: (builder) => {
      builder
        .addCase(createBleet.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createBleet.fullfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.bleets.push(action.payload)
        })
        .addCase(createBleet.fullfilled, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    }
})

export const {reset} = bleetSlice.actions
export default bleetSlice.reducer
