import counterReducer, {
  GameBoardState,
  setGameBoardValue,
  setGameLevel,
  setGameBoardStatus,
} from './gameBoardSlice'

describe('gameBoard reducer', () => {
  const initialState: GameBoardState = {
    value: [],
    level: 1,
    status: 'idle',
    markedBombs: [],
  }
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: [],
      level: 1,
      status: 'idle',
      markedBombs: [],
    })
  })

  it('should handle setGameBoardValue', () => {
    const actual = counterReducer(initialState, setGameBoardValue([]))
    expect(actual.value).toEqual([])
  })

  it('should handle setGameLevel', () => {
    const actual = counterReducer(initialState, setGameLevel(1))
    expect(actual.level).toEqual(1)
  })

  it('should handle setGameBoardStatus', () => {
    const actual = counterReducer(initialState, setGameBoardStatus('win'))
    expect(actual.status).toEqual('win')
  })
})
