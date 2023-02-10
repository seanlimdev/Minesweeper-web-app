import { take, actionChannel, put, ActionPattern } from 'redux-saga/effects'
import { connect, send } from '@giantmachines/redux-websocket'
import { setGameBoardValue, setGameBoardStatus } from './gameBoardSlice'
import { Action } from 'redux'

export default function* minesweeperWebSocket() {
  yield put(
    connect(process.env.WEBSOCKET_ADDR || 'wss://hometask.eg1236.com/game1/')
  ) //THIS ONLY FOR DEMO SINCE THIS IS NOT A SECRET

  const reqChan: ActionPattern<Action<unknown>> | undefined =
    yield actionChannel('REDUX_WEBSOCKET::MESSAGE')

  while (true) {
    const { payload } = yield take(reqChan)

    if (payload?.message?.indexOf('map:') !== -1) {
      let boardState: string[] = []
      boardState = payload?.message
        .replace('map:', '')
        .split('\n')
        .filter((e: string) => e)
      yield put(setGameBoardValue(boardState))
    } else if (payload?.message?.indexOf('new:') !== -1) {
      yield put(setGameBoardStatus('idle'))
      yield put(send('map'))
    } else if (payload?.message?.indexOf('open:') !== -1) {
      if (payload?.message?.indexOf('You lose') !== -1) {
        yield put(setGameBoardStatus('lose'))
      } else if (payload?.message?.indexOf('You win') !== -1) {
        yield put(setGameBoardStatus('win'))
      } else {
        yield put(setGameBoardStatus('idle'))
      }
      yield put(send('map'))
    }
  }
}
