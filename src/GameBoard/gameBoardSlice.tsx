import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

type boardStatus = 'idle' | 'loading' | 'win' | 'lose' | 'error'
export interface GameBoardState {
  value: string[]
  level: number
  status: boardStatus
  markedBombs: string[]
}

const initialState: GameBoardState = {
  value: [],
  level: 1,
  status: 'idle',
  markedBombs: [],
}

export const gameBoardSlice = createSlice({
  name: 'gameBoard',
  initialState,
  reducers: {
    setGameBoardValue: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload
    },
    setGameLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload
    },
    setGameBoardStatus: (state, action: PayloadAction<boardStatus>) => {
      state.status = action.payload
    },
    clearMarkedBombs: (state) => {
      state.markedBombs = []
    },
    markBomb: (state, action: PayloadAction<number[]>) => {
      state.markedBombs.push(`${action.payload[0]},${action.payload[1]}`)
    },
    unMarkBomb: (state, action: PayloadAction<number[]>) => {
      const value = `${action.payload[0]},${action.payload[1]}`
      const index = state.markedBombs.indexOf(value)
      if (index > -1) {
        state.markedBombs.splice(index, 1)
      }
    },
  },
})

export const {
  setGameBoardValue,
  setGameLevel,
  setGameBoardStatus,
  clearMarkedBombs,
  markBomb,
  unMarkBomb,
} = gameBoardSlice.actions

export const selectGameBoardState = (state: RootState) =>
  state.gameBoardSlice.value
export const selectGameBoardLevel = (state: RootState) =>
  state.gameBoardSlice.level
export const selectGameBoardStatus = (state: RootState) =>
  state.gameBoardSlice.status
export const selectMarkedBombs = (state: RootState) =>
  state.gameBoardSlice.markedBombs

export default gameBoardSlice.reducer
